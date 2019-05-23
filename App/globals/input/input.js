import Keyboard from './keyboard';
import Mouse from './mouse'

function loop(e) {
  const maps = this.currentMapSet[e.type],
        mapsGlobal = this.globalMapSet[e.type],
        len = maps.length,
        lenGlobal = mapsGlobal.length;
  let x = 0,
      item;
  
  for(x;x<len;x++)
  {
    item = maps[x];
    if(item.keyCode === e.keyCode && item.shift === e.shiftKey && item.ctrl === e.ctrlKey && item.alt === e.altKey)
    {
      e.name = item.name;
      e.readable = item.readable;
      item(e);
      break;
    }
  }
  
  for(x = 0;x<lenGlobal;x++)
  {
    item = mapsGlobal[x];
    if(item.keyCode === e.keyCode && item.shift === e.shiftKey && item.ctrl === e.ctrlKey && item.alt === e.altKey)
    {
      e.name = item.name;
      e.readable = item.readable;
      item(e);
      break;
    }
  }
}

export default class Input {
  constructor() {
    this.keyboard = new Keyboard();
    this.mouse = new Mouse();
    this.environment = 'default';
    this.environments = ['default'];
    this.events = {
      '*': {
        click: [],
        dblclick: [],
        mousedown: [],
        mouseup: [],
        mousemove: [],
        keyup: [],
        keydown: []
      },
      default: {
        click: [],
        dblclick: [],
        mousedown: [],
        mouseup: [],
        mousemove: [],
        keyup: [],
        keydown: []
      }
    };
    this.currentMapSet = this.events[this.environment];
    this.globalMapSet = this.events['*'];
  }
  
  event(e) {
    
  }
  
  setEnvironment(env) {
    if(this.environments.indexOf(env) !== 1) this.environment = env;
    return this;
  }
  
  addEnvironment() {
    
  }
  
  removeEnvironment() {
    
  }
  
  addBinding() {
    
  }
  
  removeBinding() {
    
  }
}
