<script>
   import Header from "./components/Header.svelte";
   import Pager from "./components/Pager.svelte";
</script>

<Header />

<main>
   <nav>
      <a href="/">Cover</a>
      <a href="ghosting-the-edge">Ghosting the Edge</a>
      <a href="the-usual-supects">The Usual Suspects</a>
      <a href="gearing-up">Gearing Up</a>
      <a href="rules-to-break">Rules to Break</a>
      <a href="running-the-edge">Running the Edge</a>
      <a href="afterwards">Afterwards</a>
   </nav>
   <div id="page">
       <Pager/>
   </div>
</main>

<style>
   main {
      margin-top: calc(var(--header-spacing) + 2rem);
   }
</style>
