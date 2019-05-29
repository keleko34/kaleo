class Engine {
  constructor(props) {
    this.renderer = props.renderer;
    this.debug = props.debug;
    if(props.data) Object.keys(props.data).forEach((key) => { this[key] = props.data[key]; })
    if(props.created) props.created.call(this);
  }
  
  static use(module) {
    Engine._installedPlugins.push(module);
    if(module.install) module.install(Engine);
  }
}

Engine._installedPlugins = [];

module.exports = Engine;
