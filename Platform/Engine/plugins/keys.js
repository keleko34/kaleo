class Keys {
  update() {
    this.$broadcast('keys', global.keys);
  }
  
  install(engine) {
    engine.prototype.$input = global.readInput;
  }
  
  extend(engine) {
    this.$broadcast = engine.$broadcast.bind(engine);
  }
}

module.exports = new Keys();
