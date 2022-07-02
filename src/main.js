if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('/service-worker.js', { type: 'module' })
      .then(registration => {
         console.log(`main - ready`)
         return navigator.serviceWorker.ready
      })
      .then(sw => {
         console.log(`main - activated? = ${sw.active}`)
         // when the service worker is activated, dynamically import the root svelte component.
         // this prevents the browser from attempting to load files before the service-worker fetch is available
         import('/App.svelte').then(App => {
            new App.default({
               target: document.body,
               props: {
                  name: 'world'
               }
            })
         })
      })


}