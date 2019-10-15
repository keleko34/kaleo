const { F_FPS } = global.settings.engine;

class FPS {
  constructor() {
    this.avg = 0;
    this.last = 0;
    this.history = [];
    this.maxhistory = 25;
  }
  
  update() {
    const now = Date.now(),
          last = this.last,
          history = this.history;
    let avg = this.avg = 0;
    if(last !== 0)
    {
      if(last !== now)
      {
        /* get current fps rate */
        F_FPS.current = Math.round(1000 / (now - last));
        
        /* keep a history of the fps for getting the avg fps */
        history.push(F_FPS.current);
        
        /* continually remove from the history if it has reached max storage */
        if(history.length >= this.maxhistory) history.shift();
        
        const len = history.length;
        let x = 0;
        
        /* add all history number together to get the avg */
        for(x;x<len;x++)
        {
          avg += history[x];
        }
        
        /* update logged avg fps */
        F_FPS.avg = this.avg = Math.round(avg / history.length);
        
        /* update min max fps amounts */
        if(F_FPS.current < F_FPS.min) F_FPS.min = F_FPS.current;
        if(F_FPS.current > F_FPS.max) F_FPS.max = F_FPS.current;
      }
    }
    this.last = now;
  }
  
  /* extend global engine */
  install(engine) {
    engine.prototype.$fps = this;
  }
}

module.exports = new FPS();
