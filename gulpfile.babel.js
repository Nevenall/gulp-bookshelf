import { series, parallel, src, dest } from "gulp"
import { init, write } from "gulp-sourcemaps"
import babel from "gulp-babel"
import concat from "gulp-concat"
import through2 from 'through2'

import {compile, preprocess} from 'svelte/compiler'


// task("default", function () {
//    return src("src/**/*.js")
//       .pipe(init())
//       .pipe(babel())
//       .pipe(concat("all.js"))
//       .pipe(write("."))
//       .pipe(dest("dist"))
// })

function svelteTask(done) {

   return src("src/App.svelte")
      .pipe(through2.obj(function (vinyl, _, callback) {

         let ret = compile(vinyl.contents.toString(), {})

         let s = ''
      }))
      .pipe(dest('dist'))
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

let build = series(cleanTask, assetsTask, svelteTask)


export default build