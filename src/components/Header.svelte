<script>
  import GitHub from "/icons/GitHub.svelte";
  import ChevronRight from "/icons/chevron-right.svelte";
  import ChevronLeft from "/icons/chevron-left.svelte";
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

  button:hover {
     background: blanchedalmond;
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
      <button>D/L</button>
      <button>
        <GitHub class="icon" />
      </button>
    {/if}
    <button on:click={() => (collapsed = !collapsed)}>
      <ChevronRight class="icon" />
    </button>
  </div>
</header>
