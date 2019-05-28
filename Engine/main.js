const Engine = require('./Engine'),
      Renderer = require('./Renderer');

/* GLOBALS
const Input = require('./Input/input'),
      FPS = require('./FPS/fps');

//Engine.use(Input);
//Engine.use(FPS); */

global.main = new Engine({
  renderer: new Renderer(),
  data: {},
  created() {
    Engine._installedPlugins.forEach((plugin) => {
      if(plugin.extend) plugin.extend.call(this);
      if(plugin.created) plugin.created.call(this);
      if(plugin.update) this.renderer.pipe(plugin.update.bind(plugin));
    })
  }
})

module.exports = global.main;
