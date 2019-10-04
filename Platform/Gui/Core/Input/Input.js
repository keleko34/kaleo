/** 
 * INPUT CLASS
 *
 * The input class is by far the most complete Core element,
 * but also a heavy logical element, So some concepts need explained
 *
 * LOGIC:
 * When a key is pressed the associated action must be ran on the render loop
 * so it is cached to be ran when the next frame is called. we do not run them
 * immediately. This is due to the javascript event loop being async and not
 * synced with the render loop so executing actions straight away has adverse side
 * effects for movement in the render loop expecially when a key is required to be held
 * ex. walking, or running
 *
 * ENVIRONMENTS:
 * Environments were added so that multiple registries containing the same keybinds
 * but for different actions could exist. In one environment your character could have
 * some actions such as walk or run, while in another your character is in a car and
 * instead the actions will be drive or brake for the same keys.
 *
 * REGISTER VS BIND:
 * Register and bind were seperated so that users could rebind actions for the keyboard and mouse
 * settings. A action can be registered without an associated keybind thus allowing the action
 * to be binded later but still existing in the input registry.
 */

import Keycodes from './Keycodes';
import Keyboard from './Keyboard';
import Mouse from './Mouse';

/* Checks if the secondary important keys: ctrl, alt, shift match the bind being checked */
function checkEvent(e, store)
{
  if(store.ctrlKey !== e.ctrlKey) return false;
  if(store.shiftKey !== e.shiftKey) return false;
  if(store.altKey !== e.altKey) return false;
  return true;
}

/* This activates the registry to be ran on the next render frame */
function update(e, registry, store)
{
  /* If its a toggled action we set it once, user must click the key again to deactivate,
   * an example would be allowing the user to toggle a gun scope for zoom */
  if(registry.toggle)
  {
    registry.active = (!registry.active);
  }
  
  /* Action is ran a single time and user must release the key or button to run it again,
   * an example would be jumping, or manual fire */
  else if(registry.once)
  {
    if(['mouseup', 'keyup'].indexOf(e.type) !== -1)
    {
      registry.deactivated = true;
    }
    else
    {
      if(registry.deactivated)
      {
        registry.deactivated = false;
        registry.active = true;
      }
    }
  }
  
  /* This is a standard action, that requires the user to hold the button, deactivates on mouseup or keyup,
   * an example would be running/walking, full auto*/
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
    
    /* gets the keycodes {Number} associated with each key */
    this.keys = Keycodes.codes;
    
    /* `*` environments are binds that work in all environments, default is the base environment,
     * gui is special as it does not follow the standard input rules and instead fires when the key
     * has been activated by the user, they are outside the render loop and only control UI,
     * such as activating the settings menu */
    this.environments = ['*', 'default', 'gui'];
    this.environment = 'default';
    
    /* controls telling if the designated event is currently pressed */
    this.registry = {
      gui: {},
      '*': {},
      default: {}
    }

    /* Holds the keys that are currently pressed */
    this.pressed = [];
    
    /* Holds methods for checking if an action is active or not */
    this.active = {};
    
    
    this.inputs = [];
    
    /* Maps events from the Mouse and Keyboard */
    this.mouse = new Mouse();
    this.keyboard = new Keyboard();
    
    /* Extends the mouse and keyboard to be able to run the event */
    this.mouse.relay = this.event.bind(this);
    this.keyboard.relay = this.event.bind(this);
  }
  
  setEnvironment(env) {
    const INPUT_SETTINGS = global.settings.input;
    if(['*', 'gui'].indexOf(env) === -1 && this.environments.indexOf(env) !== -1) 
    {
      INPUT_SETTINGS.I_ENVIRONMENT = this.environment = env;
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
      const INPUT_SETTINGS = global.settings.input;
      if(this.environment === env) INPUT_SETTINGS.I_ENVIRONMENT = this.environment = 'default';
      this.environments.splice(this.environments.indexOf(env), 1);
      this.store[env] = null;
    }
  }
  
  /**
  * Registers an action to the registry and environment
  *
  * @param {String} name the name of the action ex. jump
  * @param {String} environment the name of the environment this action can occur ex. vehicle, plane etc
  * @param {Object} options a series of optional requirements
  * @param options {Boolean} toggle action can be toggled by a key or only active while a key is pressed
  * @returns {Input}
  */
  register(name, environment, options)
  {
    const { input } = nw.global.settings;
    
    if(this.environments.indexOf(environment) !== -1)
    {
      /* Add the name and environment to options, options will be saved to the registry */
      options.name = name;
      options.environment = environment;
      
      /* GUI has highest priority, it can also add keys directly using options */
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
        
        /* active is used by the engine loop, when active is true it gets added to an action render list, 
           the engine on next frame will loop through this run the action and remove the active status */
        options = (options || {});
        options.active = false;
        
        /* if the registry already exists, we simply update the options */
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
          
          /* update the registry with the action */
          input.I_REGISTRY[environment][name] = {
            name: options.name,
            key: options.key,
            index: options.index,
            toggle: options.toggle,
            shiftKey: options.shiftKey,
            ctrlKey: options.ctrlKey,
            altKey: options.altKey
          }
          /* saves the action to json file */
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
    return this;
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
  
  /**
  * Binds a key to a registry
  *
  * @param {Registry Object} registry the registry to bind to
  * @param {Number|String} key the key that can be pressed to activate this registry
  * @param {Object} options a series of optional requirements
  * @param options {Boolean} update tells the registry to update itself using the passed options
  * @param options {Boolean} toggle action can be toggled by a key or only active while a key is pressed
  * @returns {Input}
  */
  bind(registry, key, options) {
    /* import saved keys for a bind */
    const { input } = nw.global.settings;
    const sRegistry = (input.I_REGISTRY[registry.environment] && input.I_REGISTRY[registry.environment][registry.name]);
    const sKey = (sRegistry && sRegistry.key);
    
    /* TODO: shiftKey, altKey, ctrlKey should happen here and not in registry */
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
    return this;
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
          registry,
          reg;
      
      for(x;x<storelen;x++)
      {
        reg = store[x];
        registry = reg.registry;
        if(['*', 'gui', this.environment].indexOf(registry.environment) !== -1)
        {
          if(registry.toggle)
          {
            if(up && checkEvent(e, reg)) reg.action(e, registry, reg);
          }
          else
          {
            reg.action(e, registry, reg);
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
    vue.prototype.$register = this.register.bind(this);
    vue.prototype.$unregister = this.unregister.bind(this);
    vue.prototype.$bind = this.bind.bind(this);
    vue.prototype.$unbind = this.unbind.bind(this);
    vue.prototype.$mouse = this.mouse;
    vue.prototype.$keyboard = this.keyboard;
  }
  
  created() {
    const { input } = nw.global.settings;
    
    input.I_CURRENT = this.$input.pressed;
    
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
