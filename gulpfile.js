import gulp from 'gulp'
let { parallel, series, src, dest, watch } = gulp

import through from 'through2'
import replace from 'gulp-replace'

import sourcemaps from 'gulp-sourcemaps'

import concat from "gulp-concat"
import rename from 'gulp-rename'
import gulpif from 'gulp-if'
import del from 'delete'
import { dirname } from 'path'

import { compile, preprocess } from 'svelte/compiler'


import gulppostcss from 'gulp-postcss'
import postcss from 'postcss'
import postcssloadconfig from 'postcss-load-config'

import browserSync from 'browser-sync'
import history from 'connect-history-api-fallback'


let svelteOptions = {
   sveltePath: './svelte'
}

// default components import internals from "./svelte/internal"
// but the service-worker will then provide that file under each component directory
// which breaks some of the internals of component compiling
// therefore, we replace that import path with a static one
// const fixInternals = replace('./svelte/internal', '/dependencies/svelte/index.mjs')
function fixInternals() {
   return replace('./svelte/internal', '/dependencies/svelte/index.mjs')
}

let devServer = browserSync.create()

function clean(done) {
   // clean up the dist directory before we start building
   del('dist/**', done)
}

function index() {
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

function chapters() {
   return src('src/book/**/*.html')
      .pipe(through.obj(function (file, encoding, done) {
         let source = file.contents.toString()
         let compiled = compile(source, { filename: file.path, ...svelteOptions })
         var content = compiled.js.code
         file.contents = Buffer.from(content)
         file.extname = ".html"
         done(null, file)
      }))
      .pipe(fixInternals())
      .pipe(dest('dist/book'))
}

function assets() {
   return src('src/book/assets/**')
      .pipe(dest('dist/assets'))
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
               var content = compiled.js.code
               file.contents = Buffer.from(content)
               done(null, file)
            })
            .catch(err => {
               console.log(err)
            })
      }))
      .pipe(fixInternals())
      .pipe(dest('dist'))
}

// copy client dependencies and do some renaming
function dependencies() {
   return src('node_modules/svelte/internal/index.mjs')
      // Svelte internals 
      .pipe(rename(function (path) {
         path.dirname = 'svelte'
         path.basename = 'index'
      }))
      .pipe(dest('dist/dependencies'))

      // // svelte transitions
      // .pipe(src('node_modules/svelte/transition/index.mjs'))
      // .pipe(rename(function (path) {
      //    path.basename = 'transition'
      // }))
      // .pipe(dest('dist/dependencies'))


      // pagejs client router
      .pipe(src('node_modules/page/page.mjs'))
      .pipe(rename(function (path) {
         path.dirname = 'page'
         path.basename = 'index'
      }))
      .pipe(dest('dist/dependencies'))
}

function staticFiles() {
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
      // middleware: [history]
   })

   // watch each type of file seperately so we can more efficently run just that pipeline 
   watch('src/index.html', index)
   watch('static/**', staticFiles)
   watch('src/icons/**', icons)
   watch('src/styles/**', styles)
   watch('src/**/*.js', js)
   watch('src/**/*.svelte', components)
   watch('src/book/**/*.html', chapters)

   done()
}

function icons() {
   return src('src/icons/**/*.svg')
      .pipe(through.obj(function (file, enc, done) {
         let source = file.contents.toString()
         let compiled = compile(source, { filename: file.path, ...svelteOptions })

         var content = compiled.js.code
         file.contents = Buffer.from(content)
         file.extname = ".svg"
         done(null, file)
      }))
      .pipe(fixInternals())
      .pipe(dest('dist/icons'))
}

// build processes files, 
// currently in parallel, but there may be some parts we want to serialize because, of sass and svelte stuff
let compileBookShelf = parallel(
   staticFiles,
   components,
   index,
   dependencies,
   js,
   styles,
   icons,
   chapters,
   assets
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
   dependencies as dependencies
}