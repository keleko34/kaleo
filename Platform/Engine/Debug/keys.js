class Keys {
  update() {
    this.$broadcast('keys', global.keys);
  }
  
  install(engine) {
    engine.prototype.$keys = this;
    engine.prototype.$InputRegistry = global.InputRegistry;
    engine.prototype.$registerInput = global.registerInput;
    engine.prototype.$unregisterInput = global.unregisterInput;
  }
  
  extend() {
    this.$keys.$broadcast = this.$broadcast.bind(this);
  }
}

module.exports = new Keys();
