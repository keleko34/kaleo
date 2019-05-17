const fs = require('fs'),
      pkg = require('../package.json');

pkg.scripts = undefined;
pkg.dependencies = undefined;
pkg.devDependencies = undefined;
pkg.eslintConfig = undefined;
pkg.postcss = undefined;
pkg.browserlist = undefined;
pkg.main = 'index.html';

fs.writeFileSync('./Distribution/package.json', JSON.stringify(pkg, null, 2))
