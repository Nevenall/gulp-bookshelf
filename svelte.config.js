const sveltePreprocess = require('svelte-preprocess')

// this file is for the vscode svelte lang server
module.exports = {
   preprocess: sveltePreprocess({
      scss: true
   })
};