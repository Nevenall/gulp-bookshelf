

self.addEventListener('install', event => {
   event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', event => {
   // Grab all pages
   event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
   // check if requested resource is an import.
   console.log(event.request.url)

   if (event.request.url.endsWith('.svelte')) {
      // console.log('Got a component')

      event.respondWith(fetch(event.request).then(response => {
         // console.log(response)
         // return .svelte components with correct content type
         let ret = new Response(response.body, { headers: { 'Content-Type': 'application/javascript' } })
         return ret
      }))
   }
   else if (event.request.url.endsWith('/svelte/internal')) {

      event.respondWith(fetch('/svelte/internal/index.mjs').then(response => {
         let ret = new Response(response.body, { headers: { 'Content-Type': 'application/javascript' } })
         return ret
      }))
   }
   else {
      // console.log('just a regular request')
      event.respondWith(fetch(event.request))
   }
})