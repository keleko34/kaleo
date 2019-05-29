import Keycodes from 'helpers/keycodes';
import Keyboard from './keyboard';
import Mouse from './mouse';

function checkEvent(e, store)
{
  if(store.ctrlKey && !e.ctrlKey) return false;
  if(store.shiftKey && !e.shiftKey) return false;
  if(store.altKey && !e.altKey) return false;
  return true;
}

function update(e, store)
{
  if(['mouseup', 'keyup'].indexOf(e.type) !== -1)
  {
    store.dict.active = false;
  }
  else
  {
    store.dict.active = checkEvent(e, store);
  }
}

class Input {
  constructor() {
    this.keys = Keycodes.codes;
    this.environments = ['*', 'default'];
    this.environment = 'default';
    /* controls telling if the designated event is currently pressed */
    this.dictionary = {
      keys: []
    };
    this.store = {
      '*': {},
      default: {}
    }
    this.mouse = new Mouse();
    this.keyboard = new Keyboard();
    
    this.mouse.relay = this.event.bind(this);
    this.keyboard.relay = this.event.bind(this);
  }
  
  setEnvironment(env) {
    if(env !== '*' && this.environments.indexOf(env) !== -1) 
    {
      this.environment = env;
      this.$broadcast('environment', env);
    }
  }
  
  addEnvironment(env) {
    if(this.environments.indexOf(env) === -1)
    {
      this.environments.push(env);
      this.store[env] = {};
    }
  }
  
  deleteEnvironment(env) {
    if(['*', 'default'].indexOf(env) === -1)
    {
      if(this.environment === env)
      {
        this.environment = 'default';
        this.$broadcast('environment', env);
      }
      this.environments.splice(this.environments.indexOf(env), 1);
      this.store[env] = null;
    }
  }
  
  bind(name, environment, key, options) {
    if(this.environments.indexOf(environment) !== -1)
    {
      options = (options || {});
      
      const store = this.store[environment];
      const keyCode = (typeof key === 'number' ? key : this.keys.indexOf(key.toLowerCase()));
      
      if(!this.dictionary[name])
      {
        /* Create */
        if(!store[keyCode]) store[keyCode] = [];
        
        this.dictionary[name] = { keyCode, environment, index: store[keyCode].length, active: false };
        store[keyCode].push({
          name,
          action: (options.action || update.bind(this)),
          dict: this.dictionary[name],
          ...options
        })
      }
      else
      {
        if(!store[keyCode]) store[keyCode] = [];
        
        /* Remove old index */
        const dict = this.dictionary[name],
              oldEnv = this.store[dict.environment],
              oldKeyCode = oldEnv[dict.keyCode];
        
        oldKeyCode.splice(dict.index, 1);
        
        /* Add new index */
        this.dictionary[name] = { keyCode, environment, index: store[keyCode].length, active: false };
        store[keyCode].push({
          name,
          action: (options.action || update.bind(this)),
          dict: this.dictionary[name],
          ...options
        })
      }
    }
  }
  
  unbind(name) {
    if(this.dictionary[name])
    {
      const dict = this.dictionary[name],
            store = this.store[dict.environment],
            oldKeyCode = store[dict.keyCode];

      oldKeyCode.splice(dict.index, 1);
    }
  }
  
  event(e) {
    const env = this.store[this.environment][e.inputCode],
          envLen = (env && env.length),
          global = this.store['*'][e.inputCode],
          globalLen = (global && global.length),
          down = (['keydown', 'mousedown'].indexOf(e.type) !== -1),
          up = (['keyup', 'mouseup'].indexOf(e.type) !== -1);
    
    let x;
    
    if(envLen)
    {
      x = 0;
      for(x;x<envLen;x++)
      {
        if(env[x].once)
        {
          if(down && checkEvent(e, env[x])) env[x].action(e, env[x]);
        }
        else
        {
          env[x].action(e, env[x]);
        }
      }
    }
    
    if(globalLen)
    {
      x = 0;
      for(x;x<globalLen;x++)
      {
        if(global[x].once)
        {
          if(down && checkEvent(e, global[x])) global[x].action(e, global[x]);
        }
        else
        {
          global[x].action(e, global[x]);
        }
      }
    }
    
    if(down)
    {
      this.dictionary.keys.push(e.inputKey);
    }
    else if(up)
    {
      this.dictionary.keys.splice(this.dictionary.keys.indexOf(e.inputKey), 1);
    }
  }
  
  install(vue) {
    vue.prototype.$input = this;
    vue.prototype.$bind = this.bind.bind(this);
    vue.prototype.$unbind = this.unbind.bind(this);
    vue.prototype.$mouse = this.mouse;
    vue.prototype.$keyboard = this.keyboard;
  }
  
  created() {
    nw.global.keys = this.$input.dictionary.keys;
    nw.global.readInput = (name) => {
      return this.$input.dictionary[name].active; 
    };
    
    this.$keyboard.attach(document);
    
    this.$listen('bind', (opts) => {
      this.$bind(opts.name, opts.environment, opts.key, opts.options);
    })
    
    this.$listen('unbind', (name) => {
      this.$unbind(name);
    })
    
    window.addEventListener('blur', () => {
      this.$input.dictionary.keys.splice(0, this.$input.dictionary.keys.length);
    }, false)
  }
}

export default new Input();
