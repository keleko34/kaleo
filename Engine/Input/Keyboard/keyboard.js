import Keycodes from '../Keycodes/keycodes.js'

function loopevent(e)
{
  const { events } = this,
        len = events.length;
  
  let x = 0;
  for(x;x<len;x++) { events[x](e); }
}

export default class Keyboard {
  constructor() {
    
    /* Holds all the events */
    this.events = [];
    
    /* these are all the js keycodes mapped to their corresponding key string name */
    this.keys = new Keycodes();
    
    /* These say which keys are being held down */
    this.holding = [];
    
    /* toggle on the key listeners */
    this.toggledListeners = false;
    
    this.event = this.event.bind(this);
  }
  
  event(e) {
    e.preventDefault();
    e.inputCode = e.keyCode;
    e.inputKey = this.keys.codes[e.keyCode];
    if(this.holding[e.keyCode] === undefined) this.holding[e.keyCode] = {};
    if(this.holding[e.keyCode].hold)
    {
      if(e.type === 'keyup')
      {
        this.holding[e.keyCode].hold = false;
        loopevent.call(this, e);
      }
    }
    else if(e.type === 'keydown')
    {
      loopevent.call(this, e);
      this.holding[e.keyCode].hold = true;
    }
  }
  
  toggleListeners(toggle) {
    if(typeof toggle !== 'undefined') toggle = !toggle;
    
    window.removeEventListener('keydown', this.event);
    window.removeEventListener('keyup', this.event);
    
    if(!this.toggledListeners)
    {
      window.addEventListener('keydown', this.event);
      window.addEventListener('keyup', this.event);
    }
    this.toggledListeners = !this.toggledListeners;
    return this;
  }
  
  addListener(func) {
    if(typeof func === 'function') this.events.push(func);
    return this;
  }
  
  removeListener(func) {
    if(typeof func === 'function') {
      const { events } = this,
            stringFunc = func.toString(),
            len = events.length;
      let x = 0;
      for(x;x<len;x++)
      {
        if(stringFunc === events[x].toString())
        {
          events.splice(x, 1);
          break;
        }
      }
    }
    return this;
  }
}
