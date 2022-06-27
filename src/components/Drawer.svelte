<script>
   import { Logo } from "/icons/index.js";
   import pages from "/book/book.js";
   export let open = false;
</script>

<nav class="drawer" class:open>
   <Logo  />
   <ul>
      {#each pages as page}
         <li><a href={page.path}>{page.name}</a></li>
      {/each}
   </ul>
</nav>

<style lang="postcss">
   nav {
      position: fixed;
      float: left;
      padding-top: calc(var(--header-spacing) + 2rem);
      top: 0;
      left: 0;
      width: 15rem;
      height: 100vh;
      transform: translate3d(-15rem, 0, 0);
      transition: transform var(--transition);
      box-shadow: var(--elevation-4);
      background: var(--color-background);

      &.open {
         transform: translate3d(0, 0, 0);
         transition: transform var(--transition);
      }
   }

   nav svg {
      height: 15rem;
      width: auto;
   }

   ul {
      list-style: none;
      margin: 0;
      margin-top: 2rem;

      & li {
         margin-bottom: 1rem;
      }

      & a {
         color: var(--color-text);
      }
   }
</style>
