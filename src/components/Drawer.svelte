<script>
   export let open = false;
</script>

<nav class="drawer" class:open>
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

<style lang="postcss">
   nav {
      box-shadow: var(--elevation-4);
      background: var(--app-color-primary);

      position: fixed;
      float: left;
      padding-top: calc(var(--header-spacing) + 2rem);
      top: 0;
      left: 0;
      width: 15rem;
      height: 100vh;
      transform: translate3d(-15rem, 0, 0);
      transition: transform var(--transition);

      &.open {
         transform: translate3d(0, 0, 0);
         transition: transform var(--transition);
      }
   }
</style>
