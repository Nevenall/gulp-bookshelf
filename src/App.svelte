<script>
   import { onMount } from "/dependencies/svelte/index.mjs";
   import Header from "./components/Header.svelte";
   import Drawer from "./components/Drawer.svelte";
   import Error from "./components/Error.svelte";
   // this is a client dependency so right now it has to reference the dist path
   import router from "/dependencies/page/index.mjs";
   import chapters from "/book/book.js";
   // start on the first chapter, the README
   let pageText = chapters[0].chapter();
   let pageName = "Ghosting the Edge";
   let pageElement;
   let header;
   let scrollY = 0;

   chapters.forEach((r) => {
      r.scrollY = 0;

      router(r.path, (ctx) => {
         pageText = r.chapter();
         pageName = r.title;
         header = ctx.hash;
         console.log(`set scrollY to ${r.scrollY}`);
         window.scrollTo({ left: 0, top: r.scrollY });
      });

      router.exit(r.path, (ctx, next) => {
         console.log(`save scrollY ${scrollY} for ${r.path}`);
         r.scrollY = scrollY;
         next();
      });
   });

   router("*", () => {
      console.log("page not found");
      pageText = Error;
   });

   router.start();

   function scrollTo(header) {
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

   onMount(() => {
      scrollTo(header);
   });
</script>

<svelte:window on:click={click} bind:scrollY />

<svelte:head>
   <title>{pageName}</title>
</svelte:head>

<Header bind:open={drawer} />
<Drawer bind:open={drawer} />

<main>
   <div id="page" bind:this={pageElement}>
      {@html pageText}
   </div>
</main>

<style>
   main {
      margin-block-start: calc(var(--header-spacing) + 2rem);
   }
</style>
