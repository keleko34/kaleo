const __alerts = {},
      __eventbus = {};

export default {
  install(vue) {
    
    /* Allows listening to emitted events */
    vue.prototype.$listen = function listen(key, func) {
      if(!__eventbus[key]) __eventbus[key] = [];
      __eventbus[key].push(func.bind(this));
      if(__alerts[key])
      {
        func(__alerts[key]);
        if(this.$data.console) this.$emit(`listen__${key}`, func, __alerts[key]);
      }
      return this;
    };
    
    /* Allows to stop listening to emitted events */
    vue.prototype.$unlisten = function unlisten(key, func) {
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
      if(this.$data.console) this.$emit(`alert__${key}`, value);
      if(event)
      {
        var len = event.length,
            x = 0;
        for(x;x<len;x++)
        {
          event[x](value);
          if(this.$data.console) this.$emit(`listen__${key}`, event[x], value);
        }
      }
      __alerts[key] = value;
      return this;
    };
    
    /* vue.mixin({
      methods: {
        $listen: vue.prototype.$listen,
        $unlisten: vue.prototype.$unlisten,
        $alert: vue.prototype.$alert
      }
    }) */
  },
  created() {
    nw.global.$listen = this.$listen;
    nw.global.$unlisten = this.$unlisten;
    nw.global.$alert = this.$alert;
  }
}
