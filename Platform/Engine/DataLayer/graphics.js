const fs = require('fs');
const settings = require('../../Settings/graphics.json');
const local = process.cwd().replace(/\\/g, '/');

nw.Screen.Init();

const { screens } = nw.Screen;

/* POSSIBLE RESOLUTIONS */
const R_LIST = [
  { w: 800, h: 600 },
  { w: 1280, h: 720 },
  { w: 1600, h: 900 },
  { w: 1920, h: 1080 },
  { w: 2560, h: 1440 },
  { w: 3840, h: 2160 }
]

const R_INDEX = (R_LIST.findIndex(v => (v.w === settings.R_WIDTH && v.h === settings.R_HEIGHT)) || 0)

const GRAPHICS = Object.assign({
  R_LIST,
  R_INDEX,
  save,
  update
}, settings)

if(!settings.R_WIDTH || !settings.R_HEIGHT)
{
  /* we can use this later to add multiple monitor setup */
  const monitor1 = screens[0];
  
  /* get the dimensions from the main monitor */
  GRAPHICS.R_WIDTH = (monitor1.bounds.width * monitor1.scaleFactor);
  GRAPHICS.R_HEIGHT = (monitor1.bounds.height * monitor1.scaleFactor);
  
  /* set resolution index */
  GRAPHICS.R_INDEX = (R_LIST.findIndex(v => (v.w === settings.R_WIDTH && v.h === settings.R_HEIGHT)) || 0);
  save();
}

/* Saves the associated settings object to the json file */
function save() {
  
  const content = JSON.stringify(GRAPHICS, (key, value) => {
    if(['R_LIST', 'R_INDEX', 'save', 'update'].indexOf(key) !== -1) return undefined;
    return value;
  }, 2);
  
  fs.writeFile(`${local}/Platform/Settings/graphics.json`, content, (err) => {
    if(err) console.error('alert error')
  })
}

/* reruns the renderers setup when the resolution updates */
function update() { global.main.renderer.setup(); }

module.exports = GRAPHICS;
