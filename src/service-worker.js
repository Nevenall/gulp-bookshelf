

self.addEventListener('install', event => {
   console.log('sw - install')
   // tell the worker to activate immediately
   // we don't really have data to be inconsistant
   //todo - fetch and cache pages locally
   event.waitUntil(self.skipWaiting())
})



self.addEventListener('activate', event => {
   console.log('sw - activated')

   // Grab all pages
   // important for initial installation to work
   event.waitUntil(self.clients.claim())
})


self.addEventListener('fetch', event => {
   // check if requested resource is an import.
   console.log(`sw - ${event.request.url}`)

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