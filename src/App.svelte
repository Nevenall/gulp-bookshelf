<script>
  import Header from "./components/Header.svelte";
  import Drawer from "./components/Drawer.svelte";
  // header has an event for clicking the menu button
  // which we can use to tell the drawer to toggle.
</script>

<style>
  main {
    margin-top: calc(var(--header-spacing) + 2rem);
  }
</style>

<Header />
<main>
  <h1>Big Header & Stuff</h1>
</main>
