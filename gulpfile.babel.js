import { series, parallel, src, dest, watch } from "gulp"
import through2 from 'through2'
import replace from 'gulp-replace'
import { init, write } from "gulp-sourcemaps"
import babel from "gulp-babel"
import concat from "gulp-concat"
import gulpif from 'gulp-if'
import del from 'delete'

import { compile, preprocess } from 'svelte/compiler'
import sass from 'node-sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import gulpSass from 'gulp-sass'

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
      .pipe(through2.obj(function (file, encoding, done) {

         let content = file.contents.toString()
         // preprocess specially for sass
         preprocess(content, {}).then(preprocessed => {
            // compile svelte components
            let compiled = compile(preprocessed.toString(), { filename: file.path, ...svelteOptions })

            file.contents = Buffer.from(compiled.js.code)

            done(null, file)
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


function develop(done) {
   devServer.init({
      server: './dist',
      single: true,
      port: 8080,
      files: ['dist/**'],
      open: false
      // middleware for http2
   })

   // watch each type of file seperately so we can more efficently run just that pipeline 
   watch('static/**', assets)
   watch('src/**/*.svelte', components)
   watch('src/index.html', html)
   watch('src/**/*.js', js)
   watch('styles/**', styles)
   
   done()
}

// build processes files, 
// currently in parallel, but there may be some parts we want to serialize because, of sass and svelte stuff
let build = parallel(
   assets,
   components,
   html,
   internals,
   js,
   styles,
)

// default task is to clean and run build
let defaultTask = series(
   clean,
   build
)

let devTask = series(build, develop)

export {
   defaultTask as default,
   defaultTask as build,
   devTask as watch,
   clean as clean,
   styles as styles
}