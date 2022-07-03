<script>
   import Header from "./components/Header.svelte";
   import Drawer from "./components/Drawer.svelte";
   import Error from "./components/Error.svelte";
   // this is a client dependency so right now it has to reference the dist path
   import router from "/dependencies/page/index.mjs";
   import pages from "/book/book.js";
   // start on the first page, the README
   let page = pages[0].page;
   let pageName = "Ghosting the Edge";
   let pageElement;

   pages.forEach((r) => {
      router(r.path, () => {
         page = r.page;
         pageName = r.name;
      });
   });

   router("*", () => {
      console.log("page not found");
      page = Error;
   });

   router.start();

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
      <svelte:component this={page} />
   </div>
</main>

<style>
   main {
      margin-top: calc(var(--header-spacing) + 2rem);
   }
</style>
