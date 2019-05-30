class Antialias {
  constructor() {
    this.renderer = null;
  }
  
  toggleAntialias(toggle) {
    this.renderer.antialias = (typeof toggle === 'boolean' ? toggle : !this.renderer.antialias);
    this.renderer.setup();
  }
  
  install(engine) {
    engine.prototype.$antialias = this;
  }
  created() {
    this.$antialias.renderer = this.renderer;
    this.$antialias.$broadcast = this.$broadcast.bind(this);
    this.$listen('toggle_antialias', this.$antialias.toggleAntialias.bind(this.$antialias));
  }
  update() {
    this.$broadcast('antialias', this.renderer.antialias);
  }
}

module.exports = new Antialias();
