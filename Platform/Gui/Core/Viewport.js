class Viewport {
  constructor() {
    this.isRunning = false;
    this.timer = null;
    this.pipeline = [];
    
    this.engine = window.require('Platform/Engine/main.js');
    this.main = this.main.bind(this);
  }
  
  main() {
    if(this.isRunning)
    {
      /* ENGINE RENDER CHAIN */
      this.engine.renderer.render();
      
      /* UI UPDATES */
      this.update();
      
      /* NEXT FRAME */
      this.timer = requestAnimationFrame(this.main);
    }
  }
  
  pipe(func, options = {}) {
    options.curr = 0;
    this.pipeline.push(Object.assign(func, options));
    return func;
  }
  
  unpipe(func) {
    const { pipeline } = this,
          len = pipeline.length;
    let x = 0;
    for(x;x<len;x++)
    {
      if(pipeline[x] === func) { pipeline.splice(x, 1); break; }
    }
    return this;
  }
  
  update() {
    const { pipeline } = this;
    let x = 0, len = pipeline.length, item;
    
    for(x;x<len;x++)
    {
      item = pipeline[x];
      if(item.delay)
      {
        item.curr += 1;
        if(item.curr === item.delay)
        {
          item.curr = 0; item.call(this);
        }
      }
      else if(item.time)
      {
        const now = Date.now();
        if(now - item.curr >= item.time)
        {
          item.curr = now; item.call(this);
        }
      }
      else
      {
        item.call(this);
        if(item.once) { pipeline.splice(x, 1); len = pipeline.length; x -= 1; }
      }
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
    vue.prototype.$pipe = this.pipe.bind(this);
    vue.prototype.$unpipe = this.unpipe.bind(this);
  }
  
  created() {
    this.$listen('start', this.$start);
    this.$listen('stop', this.$stop);
    this.$listen('pipe', this.$pipe);
    this.$listen('unpipe', this.$unpipe);
    
    if(this.$renderer.isRunning) this.$start();
  }
}

export default new Viewport();
