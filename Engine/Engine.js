var _installedPlugins = [];

class Engine {
  constructor(props) {
    
    this.renderer = props.renderer;
    this._installedPlugins = _installedPlugins;
    
    /* Handle Installing Plugins */
    const len = _installedPlugins.length;
    let x = 0;
    
    for(x;x<len;x++)
    {
      this[_installedPlugins[x].name] = new _installedPlugins[x]();
      if(this[_installedPlugins[x].name].install) this[_installedPlugins[x].name].install(this);
    }
  }
  
  static use(module) {
    _installedPlugins.push(module);
  }
}

module.exports = Engine;
