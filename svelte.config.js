import sveltePreprocess from 'svelte-preprocess'

// this file is for the vscode svelte lang server
let config = {
   preprocess: sveltePreprocess({
      postcss: true
   })
}

export default config