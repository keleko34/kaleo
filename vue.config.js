const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'App')
  },
  pages: {
    index: {
      entry: path.join(__dirname, 'App/main.js'),
      template: path.join(__dirname, 'App/index.html')
    }
  },
  outputDir: 'Distribution'
}
