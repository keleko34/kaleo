const fs = require('fs'),
      pkg = require('../package.json');

pkg.scripts = undefined;
pkg.dependencies = undefined;
pkg.devDependencies = undefined;
pkg.eslintConfig = undefined;
pkg.postcss = undefined;
pkg.browserslist = undefined;
pkg.babel = undefined;
pkg['node-remote'] = undefined;
pkg.main = 'index.html';

fs.writeFileSync('./Build/package.json', JSON.stringify(pkg, null, 2))
