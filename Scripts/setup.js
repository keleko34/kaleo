const fs = require('fs');
const copyFrom = './Scripts/InstallationFiles'
const copyTo = './node_modules/nw/nwjs'

fs.createReadStream(`${copyFrom}/D3DCompiler_43.dll`).pipe(fs.createWriteStream(`${copyTo}/D3DCompiler_43.dll`));
fs.createReadStream(`${copyFrom}/d3dx9_43.dll`).pipe(fs.createWriteStream(`${copyTo}/d3dx9_43.dll`));
