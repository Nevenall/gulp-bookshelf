/**
 * Unchained ServiceWorker sample.
 */

// promptly activate the ServiceWorker.
self.addEventListener('install', (event) => {
   event.waitUntil(self.skipWaiting()) // Activate worker immediately
})

self.addEventListener('activate', (event) => {``
   event.waitUntil(self.clients.claim()) // Become available to all pages
})

// intercept fetch events.
self.addEventListener('fetch', (event) => {
   // check if requested resource is an import.
   console.log(event.request.url)

   // todo - if the url is for a .svelte component, respond with that component with js content-type
   // if the request is for a svelte/internal then hopefully we can resolve to the correct index.mjs
      //https://serviceworke.rs/strategy-cache-update-and-refresh_service-worker_doc.html
})