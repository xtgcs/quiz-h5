module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: loader => [
          require('postcss-pxtorem')({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
}
