import { series, parallel, src, dest, watch } from "gulp"
import through2 from 'through2'
import replace from 'gulp-replace'
import { init, write } from "gulp-sourcemaps"
import babel from "gulp-babel"
import concat from "gulp-concat"
import gulpif from 'gulp-if'
import browserSync from 'browser-sync'
import { compile, preprocess } from 'svelte/compiler'


// task("default", function () {
//    return src("src/**/*.js")
//       .pipe(init())
//       .pipe(babel())
//       .pipe(concat("all.js"))
//       .pipe(write("."))
//       .pipe(dest("dist"))
// })

let fixComponentImports = replace(new RegExp('(\w*).svelte', 'i'), '$1.js')
let fixSvelteInternalReferences = replace(new RegExp('svelte/internal', 'i'), './svelte/internal/index.mjs')

let svelteOptions = {
}


let devServer = browserSync.create()

function cleanTask(done) {

   // clean up the dist directory before we start building
   done()
}


function staticTask(done) {
   return src('src/index.html')
      .pipe(dest('dist'))
}

function applicationJavascriptTask(done) {
   return src('src/main.js')
      .pipe(fixComponentImports)
      .pipe(dest('dist'))
}


function svelteTask(done) {
   return src("src/**/*.svelte")
      .pipe(through2.obj(function (file, encoding, done) {

         let content = file.contents.toString()
         // preprocess specially for sass
         preprocess(content, {}).then(preprocessed => {
            // compile svelte components
            let compiled = compile(preprocessed.toString(), { filename: file.path, ...svelteOptions })

            file.contents = Buffer.from(compiled.js.code)
            file.extname = '.js'

            done(null, file)
         })

      }))
      .pipe(fixSvelteInternalReferences)
      .pipe(dest('dist'))
}


function svelteInternalsTask(done) {
   return src('node_modules/svelte/internal/index.mjs')
      .pipe(dest('dist/svelte/internal'))
}


function assetsTask(done) {
   // copy static files

   done()
}

function devTask(done) {
   devServer.init({
      server: './dist',
      single: true,
      port: 8080,
      // middleware for http2
      browser: '',
   })



}

// build processes files, 
// currently in parallel, but there may be some parts we want to serialize because, of sass and svelte stuff

let build = parallel(
   staticTask,
   applicationJavascriptTask,
   svelteTask,
   svelteInternalsTask,
   assetsTask
)

// todo - make a watch task for development mode
// export { dev } series(assetsTask, svelteTask)



// dev is a task that runs a build, starts a browser-sync server, and watches src/**
// also 

let dev = watch('src/**', build)

// default task is to clean and run build
let defaultTask = series(
   cleanTask,
   build
)

export { dev }

export default defaultTask