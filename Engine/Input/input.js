import Keyboard from './Keyboard/keyboard';
import Mouse from './Mouse/mouse'

/* INPUT ADDS THE BINDS, IF THE DESIGNATED INPUT EVENT HAPPENS IT IS ADDED TO AN INPUT CHAIN AND WHEN THE NEXT FRAME IS CALLED THIS INPUT CHAIN IS CHECKED AND METHODS ARE THEN RAN */

export default class Input {
  constructor() {
    this.keyboard = new Keyboard();
    this.mouse = new Mouse();
    
    /* environments */
    this.environment = 'default';
    this.environments = ['default'];
    
    /* Holds all bindings */
    this.events = {
      '*': {
        dictionary: {}
      },
      default: {
        dictionary: {}
      }
    };
    
    /* event bindings and render chain */
    this.currentMapSet = this.events[this.environment];
    this.globalMapSet = this.events['*'];
    this.render = [];
    
    /* Main events */
    this.event = this.event.bind(this);
    this.keyboard.addListener(this.event);
    this.mouse.addListener(this.event);
    
    /* debugging */
    this.debug = false;
    this.debugKeys = '';
    
    /* extra listeners */
    this.onenvironmentchange = () => {};
    this.ondebugkey = () => {};
  }
  
  /* Runs on every frame */
  update() {
    const chain = this.render,
          len = chain.length;
    if(len) console.log('Running commands for: ', chain);
    let x = 0;
    for(x;x<len;x++) { chain[x](); }
  }
  
  event(e) {
    const current = (this.currentMapSet[e.type] && this.currentMapSet[e.type][e.inputCode]),
          global = (this.globalMapSet[e.type] && this.globalMapSet[e.type][e.inputCode]),
          key = e.inputKey.toUpperCase();
    
    if(['keyup', 'mouseup'].indexOf(e.type) !== -1)
    {
      if(this.debug)
      {
        const arr = this.debugKeys.split(' + ');
        switch(arr.length)
        {
          case 1:
            this.debugKeys = '';
            break;
          case 2:
            arr.splice(arr.indexOf(key), 1);
            this.debugKeys = arr.join('');
            break;
          default:
            arr.splice(arr.indexOf(key), 1);
            this.debugKeys = arr.join(' + ');
        }
        this.$alert('debugkeys', this.debugKeys);
      }
      
      if(current)
      {
        if(current.immediate)
        {
          current.action(e);
        }
        else if(this.render.indexOf(current.action) !== -1)
        {
          this.render.splice(this.render.indexOf(current.action), 1);
        }
      }
      if(global)
      {
        if(global.immediate)
        {
          global.action(e);
        }
        else if(this.render.indexOf(global.action) !== -1)
        {
          this.render.splice(this.render.indexOf(global.action), 1);
        }
      }
    }
    else
    {
      if(['keydown', 'mousedown'].indexOf(e.type) !== -1 && this.debug && this.debugKeys.indexOf(key) === -1)
      {
        this.debugKeys = (!this.debugKeys ? key : this.debugKeys + ' + ' + key);
        this.$alert('debugkeys', this.debugKeys);
      }
      if(current)
      {
        if(current.immediate)
        {
          current.action(e);
        }
        else
        {
          this.render.push(current.action);
        }
      }
      if(global)
      {
        if(global.immediate)
        {
          global.action(e);
        }
        else
        {
          this.render.push(global.action);
        }
      }
    }
  }
  
  toggleDebug(toggle) {
    this.debug = (typeof toggle === 'boolean' ? toggle : !this.debug);
  }
  
  setEnvironment(env) {
    if(this.environments.indexOf(env) !== 1)
    {
      this.environment = env;
      this.currentMapSet = this.events[env];
      this.$alert('environment', env);
    }
    return this;
  }
  
  addEnvironment(env) {
    if(this.environments.indexOf(env) === -1)
    {
      this.environments.push(env);
      this.events[env] = {
        dictionary: {}
      };
    }
    return this;
  }
  
  removeEnvironment(env) {
    if(['*', 'default'].indexOf(env) === -1 && this.environments.indexOf(env) !== -1)
    {
      this.environments.splice(this.environments.indexOf(env), 1);
      this.events[env] = null;
      if(this.environment === env) this.environment = 'default';
    }
    return this;
  }
  
  /* Add a input binding, props are: 
    'name': name mapping, eg. `walk`, `crouch`
    'type': type of event eg `mousedown` `click`
    'key || keyCode || sequence': the name or keyCode of the key to use or sequence of keys required for execution
    'ctrl': Boolean
    'shift': Boolean
    'alt': Boolean
  */
  setBinding(name, key, func, environment, type, immediate) {
    environment = (environment || this.environment);
    type = (type || (key.indexOf('mouse') !== -1 ? 'mousedown' : 'keydown'))
    if(this.environments[environment] || environment === '*')
    {
      const env = this.events[environment];
      const keyCode = this.keyboard.keys.codes.indexOf(key.toLowerCase());
      
      if(env.dictionary[name]) this.clearBinding(name, environment);
      
      if(!env[type]) env[type] = {};
      if(!env[type][keyCode]) env[type][keyCode] = { action: func, immediate, name };
      env.dictionary[name] = { type, keyCode };
    }
  }
  
  clearBinding(name, environment) {
    if(this.environments[environment])
    {
      const env = this.environments[environment],
            dict = env.dictionary[name];
      if(dict) env[dict.type][dict.keyCode] = null;
    }
  }
}
