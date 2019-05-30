class Viewport {
  constructor() {
    this._viewport = undefined;
    this.ctx = undefined;
    this.isRunning = true;
    this.timer = null;
    this.engine = window.require('Platform/Engine/main.js');
    this.main = this.main.bind(this);
  }
  
  get viewport() {
    return this._viewport;
  }
  
  set viewport(v) {
    this._viewport = v;
    this.ctx = v.getContext('2d');
  }
  
  main() {
    if(this.isRunning)
    {
      this.engine.renderer.render();
      if(this.viewport) this.ctx.drawImage(this.engine.renderer.canvas, 0, 0, this.viewport.clientWidth, this.viewport.clientHeight);
      this.timer = requestAnimationFrame(this.main);
    }
  }
  
  start() {
    this.isRunning = true;
    if(this.timer) cancelAnimationFrame(this.timer);
    this.timer = requestAnimationFrame(this.main);
  }
  
  stop() {
    this.isRunning = false;
  }
  
  install(vue) {
    
    vue.prototype.$renderer = this;
    vue.prototype.$engine = this.engine;
    
    vue.prototype.$start = this.start.bind(this);
    vue.prototype.$stop = this.stop.bind(this);
  }
  
  created() {
    this.$listen('start', this.$start);
    this.$listen('stop', this.$stop);
    
    if(this.$renderer.isRunning) this.$start();
  }
}

export default new Viewport();
