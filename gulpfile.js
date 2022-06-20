import gulp from 'gulp'
let { parallel, series, src, dest, watch } = gulp

import through from 'through2'
import replace from 'gulp-replace'

import sourcemaps from 'gulp-sourcemaps'

import concat from "gulp-concat"
import gulpif from 'gulp-if'
import del from 'delete'
import { dirname } from 'path'

import { compile, preprocess } from 'svelte/compiler'


import gulppostcss from 'gulp-postcss'
import postcss from 'postcss'
import postcssloadconfig from 'postcss-load-config'

import browserSync from 'browser-sync'


let svelteOptions = {
   sveltePath: './svelte'
}

let devServer = browserSync.create()

function clean(done) {
   // clean up the dist directory before we start building
   del('dist/**', done)
}

function html() {
   return src('src/index.html')
      .pipe(dest('dist'))
}

function js() {
   return src('src/**/*.js')
      .pipe(dest('dist'))
}

async function styles() {
   // manually load the postcss config
   // let config = await postcssloadconfig({ env: process.env || 'development' }, './postcss.config.js')
   return src('src/styles/**/*.css')
      // plugins configured in ./postcss.config.cjs
      .pipe(gulppostcss())
      .pipe(dest('dist/styles'))
}

async function components() {
   // manually load the postcss config
   let config = await postcssloadconfig({ env: process.env || 'development' }, './postcss.config.js')

   return src("src/**/*.svelte")
      .pipe(through.obj(function (file, encoding, done) {
         let source = file.contents.toString()

         preprocess(source, {
            style: async ({ content, markup, attributes, filename }) => {
               // only preprocessing postcss <style> elements
               if (attributes.lang !== 'postcss') return
               let processed = await postcss(config.plugins).process(content, config.options)
               return { code: processed.css.toString() }
            }
         })
            .then(preprocessed => {
               let compiled = compile(preprocessed.code, { filename: file.path, ...svelteOptions })
               // default components import internals from "./svelte/internal"
               // but the service-worker will then provide that file under each component directory
               // which, i believe, breaks some of the internals of component compiling
               // therefore, we replace that import path with a static one
               var content = compiled.js.code.replace("./svelte/internal", "/svelte/internal")
               file.contents = Buffer.from(content)
               done(null, file)
            })
            .catch(err => {
               done(err, null)
            })
      }))
      .pipe(dest('dist'))
}

function internals() {
   return src('node_modules/svelte/internal/index.mjs')
      .pipe(dest('dist/svelte/internal'))
}

function assets() {
   // copy static files
   return src('static/**')
      .pipe(dest('dist'))
}

function dev(done) {
   devServer.init({
      server: './dist',
      single: true,
      port: 8080,
      files: ['dist/**'],
      open: false,
      notify: false,
      // middleware for http2
   })

   // watch each type of file seperately so we can more efficently run just that pipeline 
   watch('static/**', assets)
   watch('src/**/*.svelte', components)
   watch('src/index.html', html)
   watch('src/**/*.js', js)
   watch('src/styles/**', styles)
   watch('src/icons/**', icons)

   done()
}

function icons() {
   return src('src/icons/**/*.svg')
      .pipe(through.obj(function (file, enc, done) {
         let source = file.contents.toString()

         try {
            let compiled = compile(source, { filename: file.path, ...svelteOptions })
            // default components import internals from "./svelte/internal"
            // but the service-worker will then provide that file under each component directory
            // which, i believe, breaks some of the internals of component compiling
            // therefore, we replace that import path with a static one
            var content = compiled.js.code.replace("./svelte/internal", "/svelte/internal")
            file.contents = Buffer.from(content)
            file.extname = ".svg"
            done(null, file)
         } catch (error) {
            done(error, null)
         }
      }))
      .pipe(dest('dist/icons'))
}

// build processes files, 
// currently in parallel, but there may be some parts we want to serialize because, of sass and svelte stuff
let compileBookShelf = parallel(
   assets,
   components,
   html,
   internals,
   js,
   styles,
   icons
)

// default task is to clean and run build
let build = series(
   clean,
   compileBookShelf
)

let develop = series(build, dev)

export {
   build as default,
   build as build,
   develop as develop,
   clean as clean,
   styles as styles,
   components as components
}