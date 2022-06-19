module.exports = (ctx) => ({
   parser: 'postcss-scss',
   syntax: 'postcss-scss',
   map: ctx.env === 'development' ? ctx.map : false,
   plugins: {
      'postcss-strip-inline-comments': {},
      'autoprefixer': { overrideBrowserslist: ['last 1 version'] },
      'postcss-import': {},
      'postcss-nested': {},
      'cssnano': ctx.env === 'production' ? {} : false
   }
})