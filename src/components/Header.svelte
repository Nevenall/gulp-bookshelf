<script>
  import GitHub from "/icons/GitHub.svg";
  import ChevronRight from "/icons/chevron-right.svg";
  import ChevronLeft from "/icons/chevron-left.svg";
  import DarkMode from "/icons/dark-mode.svg";
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
    transition: width var(--transition);
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

  button:not(.hamburger),
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
  }

  a:hover,
  button:hover {
    background: var(--primary-hover-color);
  }

  h2 {
    margin-left: 2rem;
    margin-right: auto;
    color: black;
  }
  /*!
 * Hamburgers
 * @description Tasty CSS-animated hamburgers
 * @author Jonathan Suh @jonsuh
 * @site https://jonsuh.com/hamburgers
 * @link https://github.com/jonsuh/hamburgers
 */
  .hamburger {
    padding: 15px 15px;
    display: inline-block;
    cursor: pointer;
    transition-property: opacity, filter;
    transition-duration: 0.15s;
    transition-timing-function: linear;
    font: inherit;
    color: inherit;
    text-transform: none;
    background-color: transparent;
    border: 0;
    margin: 0;
    overflow: visible;
  }
  .hamburger:hover {
    opacity: 0.7;
  }
  .hamburger.is-active:hover {
    opacity: 0.7;
  }
  .hamburger.is-active .hamburger-inner,
  .hamburger.is-active .hamburger-inner::before,
  .hamburger.is-active .hamburger-inner::after {
    background-color: #000;
  }

  .hamburger-box {
    width: 40px;
    height: 24px;
    display: inline-block;
    position: relative;
  }

  .hamburger-inner {
    display: block;
    top: 50%;
    margin-top: -2px;
  }
  .hamburger-inner,
  .hamburger-inner::before,
  .hamburger-inner::after {
    width: 40px;
    height: 4px;
    background-color: #000;
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
  .hamburger-inner::before,
  .hamburger-inner::after {
    content: "";
    display: block;
  }
  .hamburger-inner::before {
    top: -10px;
  }
  .hamburger-inner::after {
    bottom: -10px;
  }

  /*
   * Squeeze
   */
  .hamburger--squeeze .hamburger-inner {
    transition-duration: 0.075s;
    transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  .hamburger--squeeze .hamburger-inner::before {
    transition: top 0.075s 0.12s ease, opacity 0.075s ease;
  }
  .hamburger--squeeze .hamburger-inner::after {
    transition: bottom 0.075s 0.12s ease,
      transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  .hamburger--squeeze.is-active .hamburger-inner {
    transform: rotate(45deg);
    transition-delay: 0.12s;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  .hamburger--squeeze.is-active .hamburger-inner::before {
    top: 0;
    opacity: 0;
    transition: top 0.075s ease, opacity 0.075s 0.12s ease;
  }
  .hamburger--squeeze.is-active .hamburger-inner::after {
    bottom: 0;
    transform: rotate(-90deg);
    transition: bottom 0.075s ease,
      transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
</style>

<svelte:window on:scroll={() => (collapsed = window.scrollY > 5)} />
<header class:collapsed>
  <button
    class="hamburger hamburger--squeeze"
    type="button"
    class:is-active={open}
    on:click={() => (open = !open)}>
    <span class="hamburger-box">
      <span class="hamburger-inner" />
    </span>
  </button>
  {#if !collapsed}
    <h2>BookShelf</h2>
  {/if}
  <div class="end">
    {#if !collapsed}
      <button class="ripple" title="toggle dark/light modes">
        <DarkMode />
      </button>
      <a
        target="_blank"
        href="https://github.com/Nevenall/gulp-bookshelf"
        title="visit the github repository">
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
