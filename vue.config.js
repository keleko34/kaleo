const path = require('path'),
      Copy = require('copy-webpack-plugin');

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        /* Standard */
        'atoms': path.join(__dirname, 'Platform/Gui/App/Components/Atoms'),
        'molecules': path.join(__dirname, 'Platform/Gui/App/Components/Molecules'),
        'organisms': path.join(__dirname, 'Platform/Gui/App/Components/Organisms'),
        '_plugins': path.join(__dirname, 'Platform/Gui/_plugins'),
        'assets': path.join(__dirname, 'Platform/Gui/App/Assets'),
        'engine': path.join(__dirname, 'Platform/Engine'),
        'settings': path.join(__dirname, 'Platform/Settings'),
        /* Fancy */
        '~': path.join(__dirname, 'node_modules'),
        '@': path.join(__dirname, 'Platform/Gui/')
      }
    },
    plugins: (process.env.NODE_ENV === 'production' ? [new Copy([
      { from: 'Platform/Gui/App/Assets', to: 'App/Assets' },
      { from: 'Platform/Engine', to: 'Platform/Engine' }
    ])] : [])
  },
  devServer: {
    contentBase: path.join(__dirname, 'Platform/Gui')
  },
  pages: {
    index: {
      entry: path.join(__dirname, 'Platform/Gui/main.js'),
      template: path.join(__dirname, 'Platform/Gui/index.html')
    }
  },
  outputDir: 'Build'
}
