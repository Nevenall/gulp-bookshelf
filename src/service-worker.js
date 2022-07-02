// we are triggering a refresh of tabs when there is a new verison which is ok for us because we don't have data to lose
var refreshing
self.addEventListener('controllerchange', event => {
   console.log('sw controllerchange')
   if (refreshing) return
   refreshing = true
   window.location.reload()
})



self.addEventListener('install', event => {
   console.log('sw install')
   // tell the worker to activate immediately
   self.skipWaiting()
   //todo - fetch and cache pages locally
   //event.waitUntil(self.skipWaiting())
})



self.addEventListener('activate',  event => {
   console.log('sw activated')

   // import('/App.svelte').then(App => {
   //    new App.default({
   //       target: document.body,
   //       props: {
   //          name: 'world'
   //       }
   //    })
   // })

   // // when the service worker is activated, dynamically import the root svelte component.
   // // this prevents the browser from attempting to load files before the service-worker fetch is available
   // const App = await import('/App.svelte')

   // new App.default({
   //    target: document.body,
   //    props: {
   //       name: 'world'
   //    }
   // })



   // Grab all pages
   event.waitUntil(self.clients.claim())


})



self.addEventListener('fetch', event => {
   // check if requested resource is an import.
   console.log(event.request.url)

   if (event.request.url.endsWith('.svelte')) {
      event.respondWith(fetch(event.request).then(response => {
         // return .svelte chromecomponents with correct content type
         return new Response(response.body, { headers: { 'Content-Type': 'application/javascript' } })
      }))
   } else if (event.request.url.endsWith('.svg')) {
      event.respondWith(fetch(event.request).then(response => {
         // return .svg components with correct content type
         return new Response(response.body, { headers: { 'Content-Type': 'application/javascript' } })
      }))
   } else if (event.request.url.endsWith('.html')) {
      event.respondWith(fetch(event.request).then(response => {
         return new Response(response.body, { headers: { 'Content-Type': 'application/javascript' } })
      }))
   } else {
      event.respondWith(fetch(event.request).catch(err => console.log(err)))
   }
})