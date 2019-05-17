const path = require("path");

module.exports = {
  devServer: {
    clientLogLevel: "info"
  },
  configureWebpack: {
    // webpack
    resolve: {
      alias: {
        vue$: path.join(__dirname, "../node_modules/vue/dist/vue.common.js")
      }
    }
  }
};
