<script>
  import GitHub from "/icons/GitHub.svelte";
  import ChevronRight from "/icons/chevron-right.svelte";
  import ChevronLeft from "/icons/chevron-left.svelte";
  import DarkMode from "/icons/dark-mode.svelte";
  let collapsed = false;
</script>

<style lang="scss">
  header {
    height: var(--header-spacing);
    width: 100vw;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 1rem;
  }

  header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  header {
    transition: all var(--transition);
    box-shadow: var(--elevation-4);
    background: var(--primary-theme-color);
  }

  header.collapsed {
    width: 10rem;
    box-shadow: var(--elevation-8);
    border-bottom-right-radius: calc(var(--header-spacing) / 2);
  }

  .end {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    * {
      margin-right: 1rem;
    }
    *:last-child {
      margin-right: 0;
    }
  }

  button,a {
    background: transparent;
    border: none;

    height: 2rem;
    width: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50vh;

    outline: none;
    cursor: pointer;
    transition: background var(--transition);
  }

  :global(svg) {
    height: 1.5rem;
    width: auto;
  }

  a:hover, button:hover {
   background: var(--primary-hover-color);
  }

  // at narrow widths we automatically collapse
</style>

<svelte:window on:scroll={() => (collapsed = window.scrollY > 5)} />
<header class:collapsed>
  <!-- open drawer button, hamburger with ripple effect, and transform  -->
  <button>Menu</button>
  <div class="end">
    {#if !collapsed}
      <button class="ripple" title="toggle dark/light modes">
        <DarkMode />
      </button>
      <a target="_blank" href="https://github.com/Nevenall/gulp-bookshelf" title="visit the github repository">
        <GitHub />
      </a>
    {/if}
    <button on:click={() => (collapsed = !collapsed)}>
      {#if !collapsed}
        <ChevronLeft />
      {:else}
        <ChevronRight />
      {/if}
    </button>
  </div>
</header>
