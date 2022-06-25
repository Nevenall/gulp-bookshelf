<script>
   export let open = false;
</script>

{#if open}
   <nav class="drawer">
      <ul>
         <li><a href="/">Cover</a></li>
         <li><a href="ghosting-the-edge">Ghosting the Edge</a></li>
         <li><a href="the-usual-supects">The Usual Suspects</a></li>
         <li><a href="gearing-up">Gearing Up</a></li>
         <li><a href="rules-to-break">Rules to Break</a></li>
         <li><a href="running-the-edge">Running the Edge</a></li>
         <li><a href="afterwards">Afterwards</a></li>
      </ul>
   </nav>
{/if}

<style lang="postcss">
   nav {
      background-color: aliceblue;
      position: sticky;
      float: left;
      top: calc(var(--header-spacing) + 2rem);
      left: 0;

      width: 20%;
      height: 100%;
   }
</style>
