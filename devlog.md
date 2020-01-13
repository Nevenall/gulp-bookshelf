# Development log for this custom build version of bookshelf. 

## 2020-01-11

created the initial project. 

first objective is to setup a gulp build pipeline for all the nonsense. 
does it help to have a static assets folder outside the src structure? 

we would just copy it directly, right?
more or less, we could always do some extra transformation on the static assets folder

use es2015 modules. 

got the svelte compiler working
wondering though, we want to compile the svelte into js which the rest of the app can run
each compoent into a separate file? 

then index and main.js are like static files that reference main. main imports .svelte

which won't work by default right? we need to rewrite that import so it uses js? 

or, can we import the module from something named .svelte? as long as it's js?

cuz javascript

- [ ] test importing .svelte


strict MIME type checking is enforced for module scripts per HTML spec. 

So, no, cannot import a .svelte file, which means we will have to rewrite .svelte imports. 

so, we also need some svelte internals to go along with the components. 

which makes sense. Wonder if snowpack would work for that? 


Ok, this is kinda where we run into roadblocks. 
we need to bundle the svelte internals


gulp-rev – a plugin that revisions assets.
gulp-rev-rewrite might help with taht

so, browser modules don't really have a resolver. they require a path 
which means that the default behavior of svelte compiler won't work for us.
it will build {what we specify}/internal 

though, we can concatinate it in our main.js



so, if we then run babel on the file?

### note on http2

https://www.browsersync.io/docs/options#option-httpModule


more dev log

so, we can concatinate, but that doesn't help the browser to resolve the svelte internal module. 

So, best to copy it as an external dependency

and then we have to figure out how to rewrite the components


So, can we just compile index and run it? 

What if we did compile index.html? into a js component? 
what then, how do we serve it? 
it's a module, we need something to import and run it. 

We could 

## 2020-01-12

so, a couple selective rewrites of imports and we'll have a functioning svelte site. 

rewrite svelte components to import svelte.mjs locally
rewite imports of svelte components to use Name.js

and we'll have a fair number of components, but less than 50 I think. And if we can get http2 to work...

so, we can compile pages as components because we can compile html. because that's all that svelte is. 

then we can use a dynamic component to show whichever page is asked for. 


