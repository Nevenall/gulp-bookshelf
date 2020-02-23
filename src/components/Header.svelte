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
  }

  button {
    background: transparent;
    border: none;

    height: 3rem;
    width: 3rem;

    display: flex;
    justify-content: center;
    align-content: center;

    border-radius: 50vh;

    outline: none;
    cursor: pointer;
  }

  :global(svg) {
    height: 1.5rem;
    width: auto;
  }

  button:hover {
    //  background: blanchedalmond;
  }

  // at narrow widths we automatically collapse
</style>

<svelte:window on:scroll={() => (collapsed = window.scrollY > 5)} />
<header class:collapsed>
  <!-- open drawer button, hamburger with ripple effect, and transform  -->
  <button>Menu</button>
  <!-- end aligned - dark/light style toggle button, github button, manual collapse/expand chevron -->
  <div class="end">
    {#if !collapsed}
      <button>
        <DarkMode />
      </button>
      <a target="_blank" href="https://github.com/Nevenall/gulp-bookshelf">
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
