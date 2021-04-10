module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        prependData: '@import "@/index.scss";'
      }
    }
  }
}
