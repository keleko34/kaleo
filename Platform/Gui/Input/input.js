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
  
  register(name, environment, options)
  {
    const { input } = nw.global.settings;
    
    if(this.environments.indexOf(environment) !== -1)
    {
      options.environment = environment;
      options.name = name;
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
        if(!input.I_REGISTRY[environment]) input.I_REGISTRY[environment] = {};
        
        const saved = input.I_REGISTRY[environment][name];
        
        options = (options || {});
        options.active = false;
        
        if(saved)
        {
          options.key = saved.key;
          options.index = saved.index;
          options.toggle = saved.toggle;
          options.shiftKey = saved.shiftKey;
          options.ctrlKey = saved.ctrlKey;
          options.altKey = saved.altKey;
        }
        else
        {
          options.key = -1;
          options.index = -1;
          
          input.I_REGISTRY[environment][name] = {
            name: options.name,
            key: options.key,
            index: options.index,
            toggle: options.toggle,
            shiftKey: options.shiftKey,
            ctrlKey: options.ctrlKey,
            altKey: options.altKey
          }
          input.save();
        }

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
    const { input } = nw.global.settings;

    if(this.registry[environment])
    {
      const registry = this.registry[environment][name];
      if(registry)
      {
        if(environment !== 'gui')
        {
          input.I_REGISTRY[environment][name] = undefined;
          input.save();
        }
        
        if(registry.key) this.unbind(registry, registry.key);
        this.registry[environment][name] = undefined;
        if(['*', this.environment].indexOf(environment) !== -1) this.active[name] = undefined;
      }
    }
  }
  
  bind(registry, key, options) {
    /* import saved keys for a bind */
    const { input } = nw.global.settings;
    const sRegistry = (input.I_REGISTRY[registry.environment] && input.I_REGISTRY[registry.environment][registry.name]);
    const sKey = (sRegistry && sRegistry.key);
    
    if(options.update)
    {
      sRegistry.key = key;
      sRegistry.name = options.name;
      sRegistry.key = options.key;
      sRegistry.index = options.index;
      sRegistry.toggle = options.toggle;
      sRegistry.shiftKey = options.shiftKey;
      sRegistry.ctrlKey = options.ctrlKey;
      sRegistry.altKey = options.altKey;
      input.save();
    }
    
    key = ((sKey !== undefined && !options.update) ? sKey : key);
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
    const { input } = nw.global.settings;
    const sRegistry = (input.I_REGISTRY[registry.environment] && input.I_REGISTRY[registry.environment][registry.name]);
    const keyCode = (typeof key === 'number' ? key : this.keys.indexOf(key.toLowerCase()));
    this.inputs[keyCode].splice(registry.index, 1);
    registry.key = -1;
    registry.index = -1;
    
    if(sRegistry)
    {
      sRegistry.key = -1;
      sRegistry.index = -1;
    }
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
    const { input } = nw.global.settings;
    
    input.I_CURRENT = this.$input.pressed;
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
