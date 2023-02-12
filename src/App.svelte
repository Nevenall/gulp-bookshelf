<script>
   import Header from "./components/Header.svelte";
   import Drawer from "./components/Drawer.svelte";
   import Capter from "./components/Chapter.svelte";
   import Error from "./components/Error.svelte";
   // this is a client dependency so right now it has to reference the dist path
   import router from "/dependencies/page/index.mjs";
   import chapters from "/book/book.js";
   import Chapter from "./components/Chapter.svelte";
   // start on the first chapter, the README
   let pageText = chapters[0].chapter();
   let pageName = "Ghosting the Edge";
   let pageElement;
   let header;
   let scrollY = 0;

   chapters.forEach((r) => {
      // r.scrollY = 0;

      router(r.path, (ctx) => {
         pageText = r.chapter();
         pageName = r.title;
         header = ctx.hash;

         // // todo - this is overriding the anchor scrolling
         // console.log(`set scrollY to ${r.scrollY}`);
         // window.scrollTo({ left: 0, top: r.scrollY });
         // // next();
      });

      // router.exit(r.path, (ctx, next) => {
      //    console.log(`save scrollY ${scrollY} for ${r.path}`);
      //    r.scrollY = scrollY;
      //    next();
      // });
   });

   // router("*", () => {
   //    console.log("page not found");
   //    pageText = Error;
   // });

   router.start();

   

   let drawer = false;

   // if nav is open and we click on the page, close the drawer
   function click(event) {
      if (pageElement.contains(event.target)) {
         drawer = false;
      }
   }

   // onMount(() => {
   //    scrollTo(header);
   //    console.log("Scrolled!");
   // });
</script>

<svelte:window on:click={click} bind:scrollY />

<svelte:head>
   <title>{pageName}</title>
</svelte:head>

<Header bind:open={drawer} />
<Drawer bind:open={drawer} />

<main>
   <div id="page" bind:this={pageElement}>
      <Chapter bind:text={pageText} bind:header />
   </div>
</main>

<style>
   main {
      margin-block-start: calc(var(--header-spacing) + 2rem);
   }
</style>
