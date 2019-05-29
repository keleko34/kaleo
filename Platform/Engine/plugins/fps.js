class FPS {
  constructor() {
    this.min = 100;
    this.max = 0;
    this.avg = 0;
    this.last = 0;
    this.current = 0;
    this.history = [];
    this.maxhistory = 50;
  }
  
  update() {
    const now = Date.now(),
          last = this.last,
          history = this.history;
    
    this.avg = 0;
    if(last !== 0)
    {
      if(last !== now)
      {
        this.current = Math.round(1000 / (now - last));
        
        history.push(this.current);
        if(history.length >= this.maxhistory) history.shift();
        
        const len = history.length;
        
        let x = 0;
        for(x;x<len;x++)
        {
          this.avg += history[x];
        }
        this.avg = Math.round(this.avg / history.length);
        
        if(this.current < this.min) this.min = this.current;
        if(this.current > this.max) this.max = this.current;
      }
    }
    this.last = now;
    this.$broadcast('fps', this);
  }
  
  install(engine) {
    engine.prototype.$fps = this;
  }
  
  extend(engine) {
    this.$broadcast = engine.$broadcast.bind(engine);
  }
}

module.exports = new FPS();
