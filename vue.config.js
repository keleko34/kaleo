const path = require('path'),
      Copy = require('copy-webpack-plugin');

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      alias: {
        /* Standard */
        'atoms': path.join(__dirname, 'Platform/App/components/Atoms'),
        'molecules': path.join(__dirname, 'Platform/App/components/Molecules'),
        'organisms': path.join(__dirname, 'Platform/App/components/Organisms'),
        'helpers': path.join(__dirname, 'Platform/App/helpers'),
        'plugins': path.join(__dirname, 'Platform/App/plugins'),
        'assets': path.join(__dirname, 'Platform/App/assets'),
        'css': path.join(__dirname, 'Platform/App/css'),
        'engine': path.join(__dirname, 'Platform/Engine'),

        /* Fancy */
        '~': path.join(__dirname, 'node_modules'),
        '@': path.join(__dirname, 'Platform/App')
      }
    },
    plugins: (process.env.NODE_ENV === 'production' ? [new Copy([
      { from: 'Platform/App/css', to: 'css' },
      { from: 'Platform/Engine', to: 'Engine' }
    ])] : [])
  },
  devServer: {
    contentBase: path.join(__dirname, 'Platform/App')
  },
  pages: {
    index: {
      entry: path.join(__dirname, 'Platform/App/main.js'),
      template: path.join(__dirname, 'Platform/App/index.html')
    }
  },
  outputDir: 'Build'
}
