class Engine {
  constructor(props) {
    this.renderer = props.renderer;
    this.debug = props.debug;
    
    /* extend engine props */
    if(props.data) Object.keys(props.data).forEach((key) => { this[key] = props.data[key]; });
    
    /* call props created method if passed */
    if(props.created) props.created.call(this);
  }
  
  /* holds engine plugins */
  static use(module) {
    Engine._installedPlugins.push(module);
    if(module.install) module.install(Engine);
  }
}

Engine._installedPlugins = [];

module.exports = Engine;
