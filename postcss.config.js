module.exports = (ctx) => ({
  map: ctx.env === 'development' ? ctx.webpack.sourceMap : false,
  plugins: [
    require('autoprefixer'),
  ],
});
