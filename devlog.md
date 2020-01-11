# Development log for this custom build version of bookshelf. 

## 2020-11-01

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

- [ ] test kimportin