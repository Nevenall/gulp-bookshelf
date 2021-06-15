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

## 1.13.2020

question, can we use a service worker to fake module resolution for svelte components?
https://medium.com/chialab-open-source/a-study-about-how-to-improve-frontend-dev-experience-without-a-bundler-1b4c3a461a35

yes, we darn well can!


## 1.14.2020

Having some issues with watching code. I think it's the gulp-replace. Need to test that though. 
If it is, we can skip the replacement and get the service-worker working. 
I wonder if browser-sync can pickup service worker updates? I guess yes if it's watching the dist folder. 

## 1.16.2020

Yes, we can use a service worker to intercept requests to imports and resolve them ourselfs. 
That is amazing. 


## 1.19.2020

The service worker handles the module imports now!
did a special rebuild task that doesn't include the slow assets task. 
We can now start building our site!

## 1.20.2020

so, turns out there is nothing we can do about shift refresh. As dictated by the spec, it skips the service worker. the best we can do is detect when we can't resolve one of things, and do a 404 I guess. 


If we are doing a single page app, then we'll want to do a manual 404 with whatever routing we need. 
Which does beg the question about routing. 

## 1.21.2020

Alright, get sass integrated for global styles and for svelte styles


## 1.23.2020

setting up the style task to run sass and postcss, will want to do sourcemaps some day
https://github.com/postcss/postcss#gulp
may also want to use https://preset-env.cssdb.org/ at some point 

We could do assets by extension, which would allow up to place assets through out the src, close to where they are used, and then organize them when we copy. 

So, will that work for imports? 

if we import ./ relatively then we'll be expecting that asset to be in the same dir which we can do, if we make the dist pretty flat. But also, we could run into name collisions that way. 
though, for this proj we won't have that many assets. The bulk of them will probably end up being book assets that we can place in their own dir. 

I wonder if we can find a way to get gulp to build only what changed? 
Like, I bet we can send through just the watched files right? 
Ah! What want is a special watch for each type of file that will run only that pipeline!
That will make it all so much faster. 

## 1.25.2020

we now have a real site ready for stuff. 

## 1.26.2020

definately need to add error handling to the components task so errors in parsing don't crash the server. 

Ok, we want inline svg so we can style and color it, cool thing is, we can compile it as a component. 

SO, we can create components for the svg icons and have an icon component that can pick them by name. 

the svelte docs site has a component with symbols, referenced by id. that's a pretty cool idea. 

icon, we could use a module script to fetch all the icon svg and then reference it. 

## 1.27.2020

that sounds like such a good idea, but the <use> element clones the svg <symbol> into a dang shadowDOM, which negates the entire point of using inline svg, for me. It's still stylable, but not easily. So, honestly the savings of non-duplication is not worth it for me. 

We'll make an icons folder that's a sibling of static and create a task for them to compile them as svelte components. 

## 2.23.2020

got lots of stuff working. 
thinking about parameterizing meta theme color, have gulp do a replace

header is doing pretty good. maybe time to clean up the color theming and implement the dark/light mode toggle. 

then we can do the slide out drawer. 

## 3.5.2020

app shell styling
what's the most effective way to do so? 
maybe have a specific style sheet for the appshell
if we put it in the app as a global, it would affect page components
it would be nice to put it in one place
maybe if the app styles were imported in the compoent itself, that would work, right?


## 4.4.2020
 
separate the app colors and the page colors
here's an accessible way to hide the focus outline for buttons https://jmperezperez.com/outline-focus-ring-a11y/


## 6.11.2021, danb

Be a while, but I was trying out snowpack and I find myself liking this better. Snowpack doesn't really support inline svg fragments or anything. I suppose there could be a plugin for it, but I'm not 