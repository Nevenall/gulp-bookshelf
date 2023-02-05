<script>
   import { afterUpdate } from "/dependencies/svelte/index.mjs";
   import Header from "./components/Header.svelte";
   import Drawer from "./components/Drawer.svelte";
   import Error from "./components/Error.svelte";
   // this is a client dependency so right now it has to reference the dist path
   import router from "/dependencies/page/index.mjs";
   import chapters from "/book/book.js";
   // start on the first chapter, the README
   let page = chapters[0].chapter;
   let pageName = "Ghosting the Edge";
   let pageElement;
   let header;

   chapters.forEach((r) => {
      router(r.path, (ctx) => {
         page = r.chapter;
         pageName = r.title;
         header = ctx.hash;
         debugger;
      });
   });

   router("*", () => {
      console.log("page not found");
      page = Error;
   });

   router.exit("*", (ctx, next) => {
      // todo - track the current scroll location for each page separately
      console.log(window.scrollY);
      next();
   });

   router.start();

   function scrollToHeader(header) {
      if (!header) return;
      let el = document.getElementById(header);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth" });
   }

 

   let drawer = false;

   // if nav is open and we click on the page, close the drawer
   function click(event) {
      if (pageElement.contains(event.target)) {
         drawer = false;
      }
   }
</script>

<svelte:window on:click={click} />

<svelte:head>
   <title>{pageName}</title>
</svelte:head>

<Header bind:open={drawer} />
<Drawer bind:open={drawer} />

<main>
   <div id="page" bind:this={pageElement}>
      <svelte:component this={page}  />
   </div>
</main>

<style>
   main {
      margin-block-start: calc(var(--header-spacing) + 2rem);
   }
</style>
