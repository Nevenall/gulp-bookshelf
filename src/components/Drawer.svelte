<script>
   import { Logo } from "/icons/index.js";
   import chapters from "/book/book.js";
   export let open = false;

   function keydown(event) {
      if (event.code === "Escape") {
         open = false;
      }
   }
</script>

<svelte:window on:keydown={keydown} />

<nav class="drawer" class:open>
   <Logo />
   <ul>
      {#each chapters as chapter}
         <li class="ripple"><a href={chapter.path}>{chapter.title}</a></li>
      {/each}
   </ul>
</nav>

<style lang="postcss">
   nav {
      position: fixed;
      float: inline-start;
      padding-block-start: calc(var(--header-spacing) + 2rem);
      block-start: 0;
      inline-start: 0;
      width: 15rem;
      height: 100vh;
      overflow-y: auto;
      transform: translate3d(-15rem, 0, 0);
      transition: transform var(--transition);
      box-shadow: var(--elevation-4);
      background: var(--color-background);

      &.open {
         transform: translate3d(0, 0, 0);
         transition: transform var(--transition);
      }
   }

   ul {
      list-style: none;
      margin: 0;
      margin-block-start: 2rem;
      padding-inline-start: 1rem;

      & li {
         margin-block-end: 1rem;
         width: 100%;
      }

      & a:hover {
         text-decoration: underline;
      }

      & a {
         display: inline-block;
         color: var(--color-text);
         text-decoration: none;
         height: 100%;
         width: 100%;
      }
   }
</style>
