import gulp from 'gulp'
let { parallel, series, src, dest } = gulp

import through from 'through2'
import replace from 'gulp-replace'

import sourcemaps from 'gulp-sourcemaps'
let { init, write } = sourcemaps

import babel from "gulp-babel"
import concat from "gulp-concat"
import gulpif from 'gulp-if'
import del from 'delete'
import { dirname } from 'path'

import { compile, preprocess } from 'svelte/compiler'

import sassCompiler from 'sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'

import gulpSass from 'gulp-sass'

const sass = gulpSass(sassCompiler)

import browserSync from 'browser-sync'


// task("default", function () {
//    return src("src/**/*.js")
//       .pipe(init())
//       .pipe(babel())
//       .pipe(concat("all.js"))
//       .pipe(write("."))
//       .pipe(dest("dist"))
// })


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

function styles() {
   return src('src/styles/global.scss')
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(postcss([require('autoprefixer')]))
      .pipe(dest('dist'))
}

function components() {
   return src("src/**/*.svelte")
      .pipe(through.obj(function (file, encoding, done) {

         let source = file.contents.toString()

         preprocess(source, {
            style: ({ content, attributes, filename }) => {
               if (attributes.lang !== 'scss') return

               const { css, stats } = sassCompiler.renderSync({
                  file: filename,
                  data: content,
                  includePaths: ['src/styles'],
               })

               return {
                  code: css.toString(),
                  dependencies: stats.includedFiles
               }
            }
         }).then(preprocessed => {
            try {
               let compiled = compile(preprocessed.toString(), { filename: file.path, ...svelteOptions })
               file.contents = Buffer.from(compiled.js.code)
               done(null, file)
            } catch (error) {
               done(error, null)
            }
         }).catch(error => done(error, null))
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

function watch(done) {
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
   return src('src/icons/**')
      .pipe(through.obj(function (file, enc, done) {
         if (file.extname === '.svg') {
            let source = file.contents.toString()

            try {
               let compiled = compile(source, { filename: file.path, ...svelteOptions })
               file.contents = Buffer.from(compiled.js.code)
               file.extname = ".svg"
               done(null, file)
            } catch (error) {
               done(error, null)
            }
         } else {
            // todo - for now copy the js file without svelte compiling. 
            //someday we might just create it dynamically
            done(null, file)
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

let develop = series(compileBookShelf, watch)

export {
   build as default,
   build as build,
   develop as develop,
   clean as clean,
   styles as styles,
   components as components
}