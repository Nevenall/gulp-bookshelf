<script>
   // this is a client dependency so right now it has to reference the dist path
   import router from "/dependencies/page/index.mjs";
   import pages from "/book/book.js";
   let page = pages[0].page;

   // todo - configure routes from book.
   console.log(pages);

   pages.forEach((r) => {
      router(r.path, (ctx, next) => {
         page = r.page;
         next();
      });
   });

   router("*", (ctx, next) => {
      console.log("page not found");
      debugger;
      next();
   });
   router.start();
</script>

<svelte:component this={page} />
