var webpack = require('webpack');
module.exports = {
  filenameHashing: false,
  configureWebpack: {
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },
  css: {
    extract: false
  },
  "transpileDependencies": [
    "vuetify"
  ],
  lintOnSave: false
}