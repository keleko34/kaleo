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

/* TODO: look into once vs toggle vs active, finish event changes, update gui listeners */
import Keycodes from './Keycodes';
import Keyboard from './Keyboard';
import Mouse from './Mouse';

/* Checks if the secondary important keys: ctrl, alt, shift match the bind being checked */
function checkEvent(e, registry)
{
  if(registry.ctrlKey !== e.ctrlKey) return false;
  if(registry.shiftKey !== e.shiftKey) return false;
  if(registry.altKey !== e.altKey) return false;
  return true;
}

class Input {
  constructor() {
    
    /* gets the keycodes {Number} associated with each key */
    this.keys = Keycodes.codes;
    
    /* `*` environments are binds that work in all environments, default is the base environment,
     * gui is special as it does not follow the standard input rules and instead fires when the key
     * has been activated by the user, they are outside the render loop and only control UI,
     * such as activating the settings menu */
    this.environments = ['*', 'default'];
    this.environment = 'default';
    
    /* controls telling if the designated event is currently pressed */
    this.registry = {
      gui: {},
      '*': {},
      default: {}
    }

    /* Holds each keys associated actions */
    this.inputs = [];
    
    /* Holds the keys that are currently pressed */
    this.pressed = [];
    
    /* Holds methods that will be ran on the next frame call */
    this.active = [];
    
    /* Maps events from the Mouse and Keyboard */
    this.mouse = new Mouse();
    this.keyboard = new Keyboard();
    
    /* Extends the mouse and keyboard to be able to run the event */
    this.mouse.relay = this.event.bind(this);
    this.keyboard.relay = this.event.bind(this);
  }
  
  /* REGION ENVIRONMENTS */
  
  /* Sets the current active environment, determines which key mappings are active */
  setEnvironment(env) {
    const INPUT_SETTINGS = global.settings.input;
    if(['*', 'gui'].indexOf(env) === -1 && this.environments.indexOf(env) !== -1) 
    {
      INPUT_SETTINGS.I_ENVIRONMENT = this.environment = env;
    }
  }
  
  /* adds an environment that can be used */
  addEnvironment(env) {
    if(this.environments.indexOf(env) === -1)
    {
      this.environments.push(env);
      this.registry[env] = {};
    }
  }
  
  /* deletes an environment and all associated registries */
  deleteEnvironment(env) {
    if(['*', 'default', 'gui'].indexOf(env) === -1)
    {
      const INPUT_SETTINGS = global.settings.input;
      if(this.environment === env) INPUT_SETTINGS.I_ENVIRONMENT = this.environment = 'default';
      this.environments.splice(this.environments.indexOf(env), 1);
      this.registry[env] = null;
    }
  }
  
  /* ENDREGION ENVIRONMENTS */
  
  /**
  * Registers an action to the registry and environment
  *
  * @param {String} name the name of the action ex. jump
  * @param {String} environment the name of the environment this action can occur ex. vehicle, plane etc
  * @param {Function} action The method that will be run for the input
  * @param {Object} options a series of optional requirements
  * @param options {Boolean} toggle action can be toggled by a key or only active while a key is pressed
  * @param options {Boolean} once action is run once and not repeated until user releases key and presses again
  * @returns {Input}
  */
  register(name, environment, action, options)
  {
    const { input } = nw.global.settings,
          opts = options || {};
    if(this.environments.indexOf(environment) !== -1)
    {
      const saved = input.I_REGISTRY[environment][name];
      
      opts.name = name;
      opts.environment = environment;
      opts.action = action;
      opts.immediate = false;
      opts.key = saved ? saved.key : -1;
      opts.index = saved ? saved.index : -1;
      
      /* If the registry was saved in the json we load the data */
      if(saved)
      {
        opts.mode = saved.mode;
        opts.shiftKey = saved.shiftKey;
        opts.ctrlKey = saved.ctrlKey;
        opts.altKey = saved.altKey;
      }
      else
      {
        /* save the registry item to the json */
        input.I_REGISTRY[environment][name] = {
          name: opts.name,
          key: opts.key,
          index: opts.index,
          mode: opts.mode,
          shiftKey: opts.shiftKey,
          ctrlKey: opts.ctrlKey,
          altKey: opts.altKey
        }
        
        input.save();
      }
      
      this.registry[environment][name] = opts;
      
      /* bind saved registry key */
      if(saved) this.bind(opts, opts.key, opts);
    }
    return this;
  }
  
  /**
  * Registers an action to the registry for gui related items and immediately binds it
  *
  * @param {String} name the name of the action ex. dev_console
  * @param {Function} action The method that will be run for the input
  * @param {Object} options a series of optional requirements
  * @param options {Boolean} key the key name, can be string or index ex: 'space' or 13
  * @returns {Input}
  */
  registerGuiAction(name, action, options)
  {
    const opts = options || {},
          registry = this.registry.gui,
          key = opts.key;
    if(key)
    {
      /* If the gui action exists, deregister it */
      if(registry[name]) this.unregisterGuiAction(name);
      opts.name = name;
      opts.environment = 'gui';
      opts.mode = 1;
      opts.action = action;
      opts.immediate = true;
      opts.key = -1;
      opts.index = -1;
      registry[name] = opts;
      this.bind(registry[name], key, opts);
    }
    return this;
  }
  
  /**
  * unregistered a registered action as well as removes the bind
  *
  * @param {String} name the name of the action ex. jump
  * @param {String} environment the name of the environment this action can occur ex. vehicle, plane etc
  * @returns {Input}
  */
  unregister(name, environment) {
    const { input } = nw.global.settings;

    if(this.registry[environment])
    {
      const registry = this.registry[environment][name];
      if(registry)
      {
        if(registry.key) this.unbind(registry, registry.key);
        this.registry[environment][name] = undefined;
        input.I_REGISTRY[environment][name] = undefined;
        input.save();
      }
    }
  }
  
  /**
  * unregistered a registered action from the gui registry
  *
  * @param {String} name the name of the action ex. jump
  * @returns {Input}
  */
  unregisterGuiAction(name)
  {
    const registry = this.registry.gui[name];
    if(registry)
    {
      this.unbind(registry, registry.key);
      this.registry.gui[name] = undefined;
    }
    return this;
  }
  
  /**
  * returns the registry object
  *
  * @param {String} name the name of the action ex. jump
  * @param {String} environment the name of the environment this action can occur ex. vehicle, plane etc
  * @returns {Object} registry object
  */
  getRegistry(name, environment)
  {
    return this.registry[environment] && this.registry[environment][name];
  }
  
  /**
  * Binds a key to a registry
  *
  * @param {Registry Object} registry the registry to bind to
  * @param {Number|String} key the key that can be pressed to activate this registry
  * @param {Object} options a series of optional requirements
  * @param options {Boolean} shiftKey whether the shift key is required to be pressed also
  * @param options {Boolean} ctrlKey whether the ctrl key is required to be pressed also
  * @param options {Boolean} altKey whether the alt key is required to be pressed also
  * @returns {Input}
  */
  bind(registry, key, options) {
    /* import saved keys for a bind */
    const { input } = nw.global.settings,
          env = registry.environment,
          keyCode = this.keys.indexOf(key.toLowerCase()),
          opts = options || {};
    
    if(registry.bound) this.unbind(registry, keyCode);
    if(!this.inputs[keyCode]) this.inputs[keyCode] = [];
    
    registry.key = keyCode;
    registry.index = this.inputs[keyCode].length;
    registry.shiftKey = opts.shiftKey;
    registry.ctrlKey = opts.ctrlKey;
    registry.altKey = opts.altKey;
    
    /* add to inputs array for checking during the key event */
    this.inputs[keyCode].push({
      action: (registry.action || update.bind(this)),
      ...registry
    });
    
    if(env !== 'gui')
    {
      /* update the saved registry */
      input.I_REGISTRY[env][registry.name] = {
        name: registry.name,
        key: registry.key,
        index: registry.index,
        mode: registry.mode,
        shiftKey: registry.shiftKey,
        ctrlKey: registry.ctrlKey,
        altKey: registry.altKey
      }

      input.save();
    }
    
    return this;
  }
  
  /**
  * unbinds an attached key from a registry
  *
  * @param {Registry Object} registry the registry to bind to
  * @param {Number|String} key the key that can be pressed to activate this registry
  * @returns {Input}
  */
  unbind(registry, key) {
    const { input } = nw.global.settings,
          keyCode = typeof key === 'number' ? key : this.keys.indexOf(key.toLowerCase()),
          env = registry.environment;
    
    this.inputs[keyCode].splice(registry.index, 1);
    
    registry.key = -1;
    registry.index = -1;
    registry.shiftKey = false;
    registry.ctrlKey = false;
    registry.altKey = false;
    
    if(env !== 'gui')
    {
      /* update the saved registry */
      input.I_REGISTRY[env][registry.name] = {
        name: registry.name,
        key: registry.key,
        index: registry.index,
        mode: registry.mode,
        shiftKey: registry.shiftKey,
        ctrlKey: registry.ctrlKey,
        altKey: registry.altKey
      }

      input.save();
    }
  }
  
  /* The event that is ran for any mouse or keydown event */
  event(e) {
    
    /* Get the associated registry for the key */
    const registry = this.inputs[e.inputCode],
          registrylen = (registry && registry.length),
          
          /* Type of the event that happened */
          down = (['keydown', 'mousedown'].indexOf(e.type) !== -1),
          up = (['keyup', 'mouseup'].indexOf(e.type) !== -1);

    if(registrylen)
    {
      let x = 0,
          reg;
      
      for(x;x<registrylen;x++)
      {
        reg = registry[x];
        
        /* if the environment is gui related, then it fires immediately acting as a toggle */
        if(reg.environment === 'gui')
        {
          if(up && checkEvent(e, reg)) reg.action(e, reg);
        }
        
        /* If the environment is current the action can be performed */
        else if(['*', this.environment].indexOf(reg.environment) !== -1)
        {
          switch(reg.mode)
          {
            /* Requires user to hold the key for this action to be active */
            case 0:
              if(down && checkEvent(e, reg))
              {
                this.active.push(reg.action);
              }
              else if(up)
              {
                this.active.splice(this.active.indexOf(reg.action), 1);
              }
              break;
            /* acts as a toggle, fires on keyup */
            case 1:
              if(up && checkEvent(e, reg))
              {
                /* overwrite method to remove itself after being ran */
                let act = () => {
                  this.active.splice(this.active.indexOf(act), 1);
                  return reg.action.apply(this, arguments);
                }
                this.active.push(act);
              }
              break;
          }
        }
      }
    }
    
    /* add and remove key names from the pressed array */
    if(down)
    {
      this.pressed.push(e.inputKey);
    }
    else if(up)
    {
      this.pressed.splice(this.pressed.indexOf(e.inputKey), 1);
    }
  }
  
  /* extends the global vue object */
  install(vue) {
    /* globalize class */
    vue.prototype.$input = this;
    vue.prototype.$mouse = this.mouse;
    vue.prototype.$keyboard = this.keyboard;
  }
  
  /* activates methods and listeners on the global vue object */
  created() {
    const { input } = nw.global.settings;
    
    /* point I_CURRENT global to pressed array */
    input.I_CURRENT = this.$input.pressed;
    
    /* attach keyboard events to the document */
    this.$keyboard.attach(document);
    
    /* listen on the event bus for input registry calls */
    this.$listen('register_input', (opts) => {
      this.$input.register(opts.name, opts.environment, opts.action, opts);
    })
    
    /* listen on the event bus for gui input registry calls */
    this.$listen('register_gui_input', (opts) => {
      this.$input.registerGuiAction(opts.name, opts.action, opts);
    })
    
    /* listen on the event bus for input deregister calls */
    this.$listen('unregister_input', (opts) => {
      this.$input.unregister(opts.name, opts.environment);
    })
    
    /* listen on the event bus for gui input deregister calls */
    this.$listen('unregister_gui_input', (opts) => {
      this.$input.unregister(opts.name, opts.environment);
    })
    
    /* listen on the event bus for key binds */
    this.$listen('bind_input', (opts) => {
      this.$input.bind(opts.registry, opts.key, opts);
    });
    
    /* listen on the event bus for key unbinds */
    this.$listen('unbind_input', (opts) => {
      this.$input.unbind(opts.registry, opts.key);
    });
    
    /* In case of a application blur, remove all pressed keys */
    window.addEventListener('blur', () => {
      this.$input.pressed.splice(0, this.$input.pressed.length);
    }, false);
    
    /* runs on the update loop for each frame */
    this.$pipe(() => {
      const { active } = this.$input,
            len = active.length;

      let x = 0;
      for(x;x<len;x++)
      {
        /* run active key methods, pass the engine to them */
        active[x](this.$engine);
      }
    })
  }
}

export default new Input();
