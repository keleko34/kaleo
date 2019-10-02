const DataLayer = require('./DataLayer/init'),
      Engine = require('./Engine'),
      Renderer = require('./Core/Renderer');

/* GLOBALS */
const eventbus = require('./_plugins/eventbus'),
      fps = require('./Debug/fps');

Engine.use(eventbus);
Engine.use(fps);

global.gl = null;
global.main = new Engine({
  /* TODO: Need to remove debug on prod build */
  debug: true,
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
