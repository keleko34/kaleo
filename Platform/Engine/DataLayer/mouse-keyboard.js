const fs = require('fs');
const settings = require('../../Settings/mouse-keyboard.json');
const local = process.cwd().replace(/\\/g, '/');

const MOUSEKEYBOARD = Object.assign({
  I_CURRENT: [],
  I_ENVIRONMENT: 'default',
  save
}, settings);

function save() {
  
  const content = JSON.stringify(MOUSEKEYBOARD, (key, value) => {
    if(['I_CURRENT', 'save', 'update'].indexOf(key) !== -1) return undefined;
    return value;
  }, 2);
  
  fs.writeFile(`${local}/Platform/Settings/mouse-keyboard.json`, content, (err) => {
    if(err) console.error('alert error')
  })
}

module.exports = MOUSEKEYBOARD;
