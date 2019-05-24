import Keyboard from './keyboard';
import Mouse from './mouse'

/* INPUT ADDS THE BINDS, IF THE DESIGNATED INPUT EVENT HAPPENS IT IS ADDED TO AN INPUT CHAIN AND WHEN THE NEXT FRAME IS CALLED THIS INPUT CHAIN IS CHECKED AND METHODS ARE THEN RAN */

export default class Input {
  constructor() {
    this.keyboard = new Keyboard();
    this.mouse = new Mouse();
    this.environment = 'default';
    this.environments = ['default'];
    /* maybe change this to use string names for checking so we do not loop? ex 'CTRL + V'
      ['CTRL', 'V']
    */
    this.events = {
      '*': {},
      default: {}
    };
    this.currentMapSet = this.events[this.environment];
    this.globalMapSet = this.events['*'];
    this.eventChain = [];
  }
  
  /* ran on every frame, checks the current actions */
  update() {
    const chain = this.eventChain,
          len = chain.length;
    let x = 0;
    for(x;x<len;x++)
    {
      chain[x].func(chain[x].event);
    }
    this.eventChain = [];
  }
  
  event(e) {
    
  }
  
  setEnvironment(env) {
    if(this.environments.indexOf(env) !== 1)
    {
      this.environment = env;
      this.currentMapSet = this.events[env];
    }
    return this;
  }
  
  addEnvironment(env) {
    if(this.environments.indexOf(env) === -1)
    {
      this.environments.push(env);
      this.events[env] = {};
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
    ''
  */
  addBinding(e) {
    
  }
  
  removeBinding(e) {
    
  }
}
