const path = require('path');

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        /* Standard */
        'atoms': path.join(__dirname, '/App/components/Atoms'),
        'molecules': path.join(__dirname, '/App/components/Molecules'),
        'organisms': path.join(__dirname, '/App/components/Organisms'),
        'globals': path.join(__dirname, '/App/globals'),
        'plugins': path.join(__dirname, '/App/plugins'),
        'assets': path.join(__dirname, '/App/assets'),

        /* Fancy */
        '~': path.join(__dirname, '/node_modules'),
        '@': path.join(__dirname, '/App')
      }
    }
  },
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
