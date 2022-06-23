<script>
   import Header from "./components/Header.svelte";
   import Page1 from "./book/01 Ghosting the Edge.html";
   // import Drawer from "./components/Drawer.svelte";
   // header has an event for clicking the menu button
   // which we can use to tell the drawer to toggle.
</script>

<Header />

<main>
   <div id="page">
      <Page1 />
   </div>
</main>

<style>
   main {
      margin-top: calc(var(--header-spacing) + 2rem);
   }
</style>
