class Viewport {
  constructor() {
    
    /* whether the animationFrame is running the 60fps loop */
    this.isRunning = false;
    
    /* the actual animationFrame object */
    this.timer = null;
    
    /* array of methods that get ran on each frame */
    this.pipeline = [];
    
    this.engine = window.require('Platform/Engine/main.js');
    this.main = this.main.bind(this);
  }
  
  /* the main animationFrame method that runs every frame at 60fps */
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
  
  /* add methods to the render chain */
  pipe(func, options = {}) {
    
    /* sets current delay count to 0 */
    options.curr = 0;
    
    /* attach options to the method and bind it to the viewport */
    this.pipeline.push(Object.assign(func, options).bind(this));
    return func;
  }
  
  /* remove methods from the render frame */
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
  
  /* the update loop for each frame */
  update() {
    
    /* Run update piped methods on the corresponding frame */
    const { pipeline } = this;
    let x = 0, len = pipeline.length, item;
    
    for(x;x<len;x++)
    {
      item = pipeline[x];
      
      /* run frame delayed methods based on frame delay count */
      if(item.delay)
      {
        item.curr += 1;
        if(item.curr === item.delay)
        {
          item.curr = 0; item();
        }
      }
      
      /* run time based delayed methods based on the amount of time passed */
      else if(item.time)
      {
        const now = Date.now();
        if(now - item.curr >= item.time)
        {
          item.curr = now; item();
        }
      }
      
      /* run the item on each frame */
      else
      {
        item();
        
        /* remove items marked for single use */
        if(item.once) { pipeline.splice(x, 1); len = pipeline.length; x -= 1; }
      }
    }
  }
  
  /* starts the animationFrame loop to run */
  start() {
    this.isRunning = true;
    if(this.timer) cancelAnimationFrame(this.timer);
    this.timer = requestAnimationFrame(this.main);
  }
  
  /* stops the animationFrame loop from running */
  stop() {
    this.isRunning = false;
  }
  
  /* ran when the dom constructs the main canvas, webgl setup happens here, then engine loop is started */
  setup(canvas) {
    this.engine.renderer.setup(canvas);
    this.start();
  }
  
  /* extend the vue globals */
  install(vue) {
    
    vue.prototype.$renderer = this;
    vue.prototype.$engine = this.engine;
    
    vue.prototype.$start = this.start.bind(this);
    vue.prototype.$stop = this.stop.bind(this);
    vue.prototype.$pipe = this.pipe.bind(this);
    vue.prototype.$unpipe = this.unpipe.bind(this);
  }
  
  /* activates methods and listeners on the global vue object */
  created() {
    this.$listen('start', this.$start);
    this.$listen('stop', this.$stop);
    this.$listen('pipe', this.$pipe);
    this.$listen('unpipe', this.$unpipe);
    
    if(this.$renderer.isRunning) this.$start();
  }
}

export default new Viewport();
