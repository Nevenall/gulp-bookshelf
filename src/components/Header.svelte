<script>
  import Icon from "./Icon.svelte";
  let collapsed = false;
</script>

<style lang="scss">
  // this is just a comment dude
  header {
    height: var(--header-spacing);
    width: 100vw;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: all var(--transition);

    padding: 0 2rem;
  }

  header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  header {
    box-shadow: var(--elevation-4);
    background: var(--primary-theme-color);
  }

  header.collapsed {
    width: 20rem;
    box-shadow: var(--elevation-8);
  }

  .end {
    display: flex;
    flex-flow: row nowrap;
    //  justify-content: flex-start;
    align-items: center;
  }

  // top app bar and Drawer have elevation 12.

  // at narrow widths we automatically collapse
</style>

<svelte:window on:scroll={() => (collapsed = window.scrollY > 5)} />
<header class:collapsed>
  <!-- open drawer button, hamburger with ripple effect, and transform  -->
  <button>Menu</button>
  <!-- end aligned - dark/light style toggle button, github button, manual collapse/expand chevron -->
  <div class="end">
    {#if !collapsed}
      <button>Dark/Light</button>
      <button>
        <Icon src={"src/assets/icons/github.svg"} />
      </button>
    {/if}
    <button on:click={() => (collapsed = !collapsed)}>collapse/expand</button>
  </div>
</header>
