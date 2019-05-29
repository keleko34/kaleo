import Debug from 'helpers/debug';

const __alerts = {},
      __eventbus = {};

export default {
  install(vue) {
    
    /* Allows listening to emitted events */
    vue.prototype.$listen = function listen(key, func) {
      /* TODO: REMOVE DEBUG CODE ON BUILD */
      Debug.addToEventsList(key, func);
      if(!__eventbus[key]) __eventbus[key] = [];
      __eventbus[key].push(func.bind(this));
      if(__alerts[key])
      {
        func(__alerts[key]);
      }
      return this;
    };
    
    /* Allows to stop listening to emitted events */
    vue.prototype.$unlisten = function unlisten(key, func) {
      /* TODO: REMOVE DEBUG CODE ON BUILD */
      Debug.removeFromEventsList(key, func);
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
    vue.prototype.$alert = function alert(key, value) {
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
    
    vue.prototype.$broadcast = function broadcast(key, value) {
      this.$alert(key, value);
      this.$engine.$alert(key, value);
    }
    
    vue.prototype.$fetch = function fetch(key) {
      return __alerts[key]
    }
  },
  created() {
    nw.global.$alert = this.$alert;
  }
}
