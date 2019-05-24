import Keycodes from './keycodes.js'

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
    this.codes = new Keycodes();
    
    /* These say which keys are being held down */
    this.holding = {};
    
    /* toggle on the key listeners */
    this.toggledListeners = false;
  }
  
  event(e) {
    e.preventDefault();
    e.stopPropagation();
    if(this.holding[e.keyCode] === undefined) this.holding[e.keyCode] = {};
    if(this.holding[e.keyCode].hold)
    {
      if(e.type === 'keyup')
      {
        this.holding[e.keyCode].hold = false;
        if(this.holding[e.keyCode].timer) clearTimeout(this.holding[e.keyCode].timer);
        this.holding.splice(e.keyCode, 1);
        loopevent.call(this, e);
      }
      else if(e.type === 'keydown')
      {
        if(this.holding[e.keyCode].timer)
        {
          clearTimeout(this.holding[e.keyCode].timer);
          e.holding = true;
          loopevent.call(this, e);
          this.holding[e.keyCode].timer = setTimeout(this.event.bind(this), 1);
        }
      }
    }
    else if(e.type === 'keydown')
    {
      e.holding = true;
      loopevent.call(this, e);
      this.holding[e.keyCode].hold = true;
      this.holding[e.keyCode].timer = setTimeout(this.event.bind(this), 1);
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
  
  addKeyListener(func) {
    if(typeof func === 'function') this.events.push(func);
    return this;
  }
  
  removeKeyListener(func) {
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
