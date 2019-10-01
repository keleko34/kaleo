const DataLayer = require('./DataLayer/init'),
      Engine = require('./Engine'),
      Renderer = require('./Renderer/Renderer');

/* GLOBALS */
const eventbus = require('./_plugins/eventbus'),
      /* TODO: Need to remove on build */
      fps = require('./Debug/fps');

const Vec2 = require('./Core/Math/Vec2');

Engine.use(eventbus);
Engine.use(fps);

global.main = new Engine({
  /* TODO: Need to remove on build */
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
