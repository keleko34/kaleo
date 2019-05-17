const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'App')
  },
  pages: {
    index: {
      entry: path.join(__dirname, 'App/main.js')
    }
  },
  outputDir: 'Distribution'
}