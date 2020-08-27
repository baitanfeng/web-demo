module.exports = {
  outputDir: 'dist',
  publicPath: process.env.NODE_ENV === 'production' ? '/vant-demo/' : '/',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'font-size-sm': '13px',
          'font-size-md': '15px',
          'font-size-lg': '17px',
          'nav-bar-background-color': '#212228',
          'goods-action-button-warning-color': '#3eaf7c'
        }
      }
    }
  }
};