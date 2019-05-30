const __alerts = {},
      __eventbus = {};

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
      global.$alert(key, value);
    }
    
    engine.prototype.$fetch = function fetch(key) {
      return __alerts[key]
    }
  }
}
