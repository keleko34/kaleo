import Keycodes from '_helpers/keycodes';
import Keyboard from './keyboard';
import Mouse from './mouse';

function checkEvent(e, store)
{
  if(store.ctrlKey !== e.ctrlKey) return false;
  if(store.shiftKey !== e.shiftKey) return false;
  if(store.altKey !== e.altKey) return false;
  return true;
}

function update(e, registry, store)
{
  if(registry.toggle)
  {
    registry.active = (!registry.active);
  }
  else
  {
    if(['mouseup', 'keyup'].indexOf(e.type) !== -1)
    {
      registry.active = false;
    }
    else
    {
      registry.active = checkEvent(e, store);
    }
  }
}

class Input {
  constructor() {
    this.keys = Keycodes.codes;
    this.environments = ['*', 'default', 'gui'];
    this.environment = 'default';
    /* controls telling if the designated event is currently pressed */
    this.registry = {
      gui: {},
      '*': {},
      default: {}
    }
    this.pressed = [];
    this.active = {};
    this.inputs = [];
    this.mouse = new Mouse();
    this.keyboard = new Keyboard();
    
    this.mouse.relay = this.event.bind(this);
    this.keyboard.relay = this.event.bind(this);
  }
  
  setEnvironment(env) {
    if(['*', 'gui'].indexOf(env) === -1 && this.environments.indexOf(env) !== -1) 
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
    if(['*', 'default', 'gui'].indexOf(env) === -1)
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
  
  register(name, environment, options) {
    if(this.environments.indexOf(environment) !== -1)
    {
      if(environment === 'gui' && (options && options.key))
      {
        if(this.registry[environment][name]) this.unregister(name, environment);
        const key = options.key;
        options.active = false;
        options.key = -1;
        options.index = -1;
        this.registry[environment][name] = options;
        this.bind(this.registry[environment][name], key, options);
      }
      else
      {
        options = (options || {});
        options.active = false;
        options.key = -1;
        options.index = -1;

        if(this.active[name]) this.unregister(name, this.active[name].environment);

        if(!this.registry[environment]) this.registry[environment] = {};
        this.registry[environment][name] = options;

        /* This creates a method for the engine to run to check for if a registered input is active or not */
        const registry = this.registry[environment][name];
        this.active[name] = () => {
          return registry.active;
        }
        this.active[name].environment = environment;
      }
    }
  }
  
  unregister(name, environment) {
    if(this.registry[environment])
    {
      const registry = this.registry[environment][name];
      if(registry)
      {
        if(registry.key) this.unbind(registry, registry.key);
        this.registry[environment][name] = undefined;
        if(['*', this.environment].indexOf(environment) !== -1) this.active[name] = undefined;
      }
    }
  }
  
  bind(registry, key, options) {
    const keyCode = (typeof key === 'number' ? key : this.keys.indexOf(key.toLowerCase()));
    
    if(registry.key !== -1) this.unbind(registry, keyCode);
    if(!this.inputs[keyCode]) this.inputs[keyCode] = [];
    registry.key = keyCode;
    registry.index = this.inputs[keyCode].length;

    this.inputs[keyCode].push({
      registry,
      action: (registry.action || update.bind(this)),
      ...options
    })
  }
  
  unbind(registry, key) {
    const keyCode = (typeof key === 'number' ? key : this.keys.indexOf(key.toLowerCase()));
    this.inputs[keyCode].splice(registry.index, 1);
    registry.key = -1;
    registry.index = -1;
  }
  
  event(e) {
    const store = this.inputs[e.inputCode],
          storelen = (store && store.length),
          down = (['keydown', 'mousedown'].indexOf(e.type) !== -1),
          up = (['keyup', 'mouseup'].indexOf(e.type) !== -1);
    
    if(storelen)
    {
      let x = 0,
          registry;
      
      for(x;x<storelen;x++)
      {
        registry = store[x].registry;
        if(['*', 'gui', this.environment].indexOf(registry.environment) !== -1)
        {
          if(registry.toggle)
          {
            if(up && checkEvent(e, store[x])) store[x].action(e, registry, store[x]);
          }
          else
          {
            store[x].action(e, registry, store[x]);
          }
        }
      }
    }
    
    if(down)
    {
      this.pressed.push(e.inputKey);
    }
    else if(up)
    {
      this.pressed.splice(this.pressed.indexOf(e.inputKey), 1);
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
    nw.global.keys = this.$input.pressed;
    nw.global.registerInput = this.$input.register;
    nw.global.unregisterInput = this.$input.register;
    nw.global.InputRegistry = this.$input.active;
    
    this.$keyboard.attach(document);
    
    this.$listen('register_input', (opts) => {
      this.$input.register(opts.name, opts.environment, opts);
    })
    
    this.$listen('unregister_input', (opts) => {
      this.$input.unregister(opts.name, opts.environment);
    })
    
    this.$listen('bind_input', (opts) => {
      this.$input.bind(opts.registry, opts.key, opts);
    });
    
    this.$listen('unbind_input', (opts) => {
      this.$input.unbind(opts.registry, opts.key);
    });
    
    window.addEventListener('blur', () => {
      this.$input.pressed.splice(0, this.$input.pressed.length);
    }, false)
  }
}

export default new Input();
