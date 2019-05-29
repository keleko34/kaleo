const Engine = require('./Engine'),
      Renderer = require('./Renderer');

/* GLOBALS */
const eventbus = require('./plugins/eventbus'),
      fps = require('./plugins/fps'),
      keys = require('./plugins/keys');

Engine.use(eventbus);
Engine.use(fps);
Engine.use(keys);

global.main = new Engine({
  /* Need to remove on build */
  debug: true,
  renderer: new Renderer(),
  data: {},
  created() {
    Engine._installedPlugins.forEach((plugin) => {
      if(plugin.extend) plugin.extend(this);
      if(plugin.created) plugin.created(this);
      if(plugin.update) this.renderer.pipe(plugin.update.bind(plugin));
    })
  }
})

module.exports = global.main;
