class Viewport {
  constructor() {
    this._viewport = undefined;
    this.ctx = undefined;
    this.isRunning = false;
    this.timer = null;
    this.engine = window.require('Platform/Engine/main.js');
    this.main = this.main.bind(this);
  }
  
  main() {
    if(this.isRunning)
    {
      /* UI UPDATES */
      nw.global.guiUpdate();
      nw.global.guiDelay();
      
      /* ENGINE RENDER CHAIN */
      this.engine.renderer.render();
      
      /* NEXT FRAME */
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
  
  setup(canvas) {
    this.engine.renderer.setup(canvas);
    this.start();
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
