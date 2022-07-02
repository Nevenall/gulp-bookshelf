if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('/service-worker.js', { type: 'module' })
      .then(registration => {
         return registration.active
      })
      .then(async registration => {
         console.log(`main - activated? I think`)
         // when the service worker is activated, dynamically import the root svelte component.
         // this prevents the browser from attempting to load files before the service-worker fetch is available
         const App = await import('/App.svelte')

         new App.default({
            target: document.body,
            props: {
               name: 'world'
            }
         })
      })



   // console.log(`main - ${registration}`)






}