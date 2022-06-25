<script>
   // this is a client dependency so right now it has to reference the dist path
   import router from "/dependencies/page/index.mjs";
   import pages from "/book/book.js";
   // start on the first page, the README
   let page = pages[0].page;

   pages.forEach((r) => {
      router(r.path, (ctx, next) => {
         page = r.page;
         next();
      });
   });

   router("*", (ctx, next) => {
      console.log("page not found");
      // page = 404 comp
      next();
   });
   
   router.start();
</script>

<svelte:component this={page} />
