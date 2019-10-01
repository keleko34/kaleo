const { F_FPS } = global.settings.engine;

class FPS {
  constructor() {
    this.avg = 0;
    this.last = 0;
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
        F_FPS.current = Math.round(1000 / (now - last));
        
        history.push(F_FPS.current);
        if(history.length >= this.maxhistory) history.shift();
        
        const len = history.length;
        
        let x = 0;
        for(x;x<len;x++)
        {
          this.avg += history[x];
        }
        F_FPS.avg = this.avg = Math.round(this.avg / history.length);
        
        if(F_FPS.current < F_FPS.min) F_FPS.min = F_FPS.current;
        if(F_FPS.current > F_FPS.max) F_FPS.max = F_FPS.current;
      }
    }
    this.last = now;
  }
  
  install(engine) {
    engine.prototype.$fps = this;
  }
  
  extend() {
    this.$fps.$broadcast = this.$broadcast.bind(this);
  }
}

module.exports = new FPS();
