const fs = require('fs');
const copyFrom = './Scripts/InstallationFiles'
const copyTo = './node_modules/nw/nwjs'
const settings = './../Platform/Settings'

fs.createReadStream(`${copyFrom}/D3DCompiler_43.dll`).pipe(fs.createWriteStream(`${copyTo}/D3DCompiler_43.dll`));
fs.createReadStream(`${copyFrom}/d3dx9_43.dll`).pipe(fs.createWriteStream(`${copyTo}/d3dx9_43.dll`));

fs.writeFileSync(`${settings}/graphics.json`, JSON.stringify({
  R_WIDTH: 0,
  R_HEIGHT: 0,
  A_ALIAS: true,
  W_MODE: 0,
  W_FULLSCREEN: 1,
  W_WINDOWFULLSCREEN: 2,
  B_MODE: 0,
  B_ALPHA: 0,
  B_ADDITIVE: 1,
  B_ALPHA_ADDITIVE: 2,
  B_OVERRIDE: 3
}, null, 2));

fs.writeFileSync(`${settings}/engine.json`, JSON.stringify({
  D_DEBUG: 1
}, null, 2));

fs.writeFileSync(`${settings}/mouse-keyboard.json`, JSON.stringify({

}, null, 2));
