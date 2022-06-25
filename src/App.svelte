<script>
   import Header from "./components/Header.svelte";
   import Drawer from "./components/Drawer.svelte";
   import Pager from "./components/Pager.svelte";
   let drawer = false;
</script>

<Header bind:open={drawer} />
<Drawer bind:open={drawer} />

<main>
   <div id="page">
      <Pager />
   </div>
</main>

<style>
   main {
      margin-top: calc(var(--header-spacing) + 2rem);
   }
</style>
