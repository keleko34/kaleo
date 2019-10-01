const fs = require('fs');
const settings = require('../../Settings/engine.json');
const local = process.cwd().replace(/\\/g, '/');

const F_FPS = {
  min: 100,
  max: 0,
  avg: 0,
  current: 0
}

const ENGINE = Object.assign({
  F_FPS,
  save
}, settings)

function save() {
  
  const content = JSON.stringify(ENGINE, (key, value) => {
    if(['F_FPS', 'save', 'update'].indexOf(key) !== -1) return undefined;
    return value;
  }, 2);
  
  fs.writeFile(`${local}/Platform/Settings/engine.json`, content, (err) => {
    if(err) console.error('alert error')
  })
}

module.exports = ENGINE;
