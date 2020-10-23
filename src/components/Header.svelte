<script>
  import {
    ChevronLeft,
    ChevronRight,
    DarkMode,
    GitHub,
    Menu
  } from "/icons/index.js";

  let title = "Ghosting the Edge";

  let collapsed = false;
  let open = false;
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
    // note - there are performance implications in transitioning width
    transition: width var(--transition-fast);
    box-shadow: var(--elevation-4);
    background: var(--app-color-primary);
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

  button,
  a {
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
    fill: var(--app-color-text);
  }

  a:hover,
  button:hover {
    background: var(--app-color-hover);
  }

  span {
    margin-left: 2rem;
    margin-right: auto;
    color: var(--app-color-text);

    display: flex;
    align-items: center;
    font-size: var(--font-size-2);
    font-weight: 500;
  }
</style>

<svelte:window on:scroll={() => (collapsed = window.scrollY > 5)} />

<header class:collapsed>
  <button
    class="ripple"
    type="button"
    class:is-active={open}
    on:click={() => (open = !open)}>
    <Menu />
  </button>
  {#if !collapsed}
    <span>
      BookShelf
      <ChevronRight />
      {title}
    </span>
  {/if}
  <div class="end">
    {#if !collapsed}
      <button
        class="ripple"
        title="toggle dark/light modes"
        on:click={() => document.documentElement.classList.add('light')}>
        <DarkMode />
      </button>
      <a
        class="ripple"
        target="_blank"
        href="https://github.com/Nevenall/gulp-bookshelf"
        title="visit the github repository">
        <GitHub />
      </a>
    {/if}
    <button class="ripple" on:click={() => (collapsed = !collapsed)}>
      {#if !collapsed}
        <ChevronLeft />
      {:else}
        <ChevronRight />
      {/if}
    </button>
  </div>
</header>
