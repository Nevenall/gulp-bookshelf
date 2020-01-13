import { series, parallel, src, dest } from "gulp"
import { init, write } from "gulp-sourcemaps"
import babel from "gulp-babel"
import concat from "gulp-concat"
import through2 from 'through2'
import gulpif from 'gulp-if'

import { compile, preprocess } from 'svelte/compiler'


// task("default", function () {
//    return src("src/**/*.js")
//       .pipe(init())
//       .pipe(babel())
//       .pipe(concat("all.js"))
//       .pipe(write("."))
//       .pipe(dest("dist"))
// })

let svelteOptions = {
    sveltePath: "svelte"
}



function svelteTask(done) {

   return src("src/App.svelte")
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
      // .pipe(babel())
      .pipe(dest('dist'))
}

function devTask(done) {
   return src('src/main.js')
      // .pipe(concat('main.js'))
      // .pipe(babel())
      .pipe(dest('dist'))
}

function staticTask(done) {
   return src('src/index.html')
      .pipe(dest('dist'))
}


function vendorTask(done) {
   return src('node_modules/svelte/internal/index.mjs')
      // .pipe(babel())
      .pipe(dest('dist/svelte/internal'))
}

/* 
so, do we run babel first? or on the svelte output? we might have 1 bigish task for building things. 
becuase we are doing a fair bit of processing . 

So, who does 
also, not sure I like running svelte on my index page. 

*/


function assetsTask(done) {
   // copy static files

   done()
}

function cleanTask(done) {

   // clean up the dist directory before we start building
   done()
}

let build = series(cleanTask, assetsTask, svelteTask, devTask, staticTask, vendorTask)

// todo - make a watch task for development mode
let dev = series(assetsTask, svelteTask)


export default build