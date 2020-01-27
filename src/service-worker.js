

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
      event.respondWith(fetch(event.request).then(response => {
         // return .svelte components with correct content type
         return new Response(response.body, { headers: { 'Content-Type': 'application/javascript' } })
      }))
   }
   else if (event.request.url.endsWith('/svelte/internal')) {
      event.respondWith(fetch('/svelte/internal/index.mjs').then(response => {
         return new Response(response.body, { headers: { 'Content-Type': 'application/javascript' } })
      }))
   }
   else {
      event.respondWith(fetch(event.request))
   }
})