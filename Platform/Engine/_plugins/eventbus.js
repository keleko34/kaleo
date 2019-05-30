const __alerts = {},
      __eventbus = {},
      __pre = [];

module.exports = {
  install(engine) {
    
    /* Allows listening to emitted events */
    engine.prototype.$listen = function listen(key, func) {
      if(!__eventbus[key]) __eventbus[key] = [];
      __eventbus[key].push(func.bind(this));
      if(__alerts[key])
      {
        func(__alerts[key]);
      }
      return this;
    };
    
    /* Allows to stop listening to emitted events */
    engine.prototype.$unlisten = function unlisten(key, func) {
      var event = __eventbus[key]
      if(event)
      {
        var len = event.length,
            x = 0;

        for(x;x<len;x++)
        {
          if(event[x] === func)
          {
            event.splice(x, 1);
            break;
          }
        }
      }
      return this;
    };
    
    /* Alerts all attached listeners of new value */
    engine.prototype.$alert = function alert(key, value) {
      var event = __eventbus[key];
      
      if(event)
      {
        var len = event.length,
            x = 0;
        for(x;x<len;x++)
        {
          event[x](value);
        }
      }
      __alerts[key] = value;
      return this;
    };
    
    engine.prototype.$broadcast = function broadcast(key, value) {
      this.$alert(key, value);
      if(global.$alert)
      {
        global.$alert(key, value);
      }
      else
      {
        __pre.push([key, value]);
      }
    }
    
    engine.prototype.$fetch = function fetch(key) {
      return __alerts[key]
    }
  },
  update() {
    if(__pre.length && global.$alert)
    {
      __pre.forEach((alert) => {
        global.$alert(alert[0], alert[1]);
      })
      __pre.splice(0, __pre.length);
    }
  }
}
