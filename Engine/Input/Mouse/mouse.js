function loopevent(e, events)
{
  const len = events.length;
  
  let x = 0;
  for(x;x<len;x++) { events[x](e); }
}

export default class Mouse {
  constructor() {
    this.codes = ['left', 'middle', 'right'];
    this.events = [];
    this.holding = [];
    
    /* toggle on the key listeners */
    this.toggledListeners = false;
    
    this.event = this.event.bind(this);
  }
  
  event(e) {
    e.preventDefault();
    e.inputCode = e.button;
    if(this.holding[e.button] === undefined) this.holding[e.button] = {};
    
    if(this.holding[e.button].hold)
    {
      if(e.type === 'mouseup')
      {
        this.holding[e.button].hold = false;
        loopevent.call(this, e, this.events);
      }
    }
    else
    {
      if(e.type === 'mousedown')
      {
        loopevent.call(this, e, this.events);
        this.holding[e.button].hold = true;
      }
      else
      {
        loopevent.call(this, e, this.events);
      }
    }
  }
  
  toggleListeners(toggle, viewport) {
    if(typeof toggle !== 'undefined') toggle = !toggle;
    if(this.viewport || viewport) {
      this.viewport = (viewport || this.viewport);
      this.viewport.removeEventListener('mousedown', this.event);
      this.viewport.removeEventListener('mouseup', this.event);
      this.viewport.removeEventListener('click', this.event);
      this.viewport.removeEventListener('dblclick', this.event);

      if(!toggle)
      {
        this.viewport.addEventListener('mousedown', this.event);
        this.viewport.addEventListener('mouseup', this.event);
        this.viewport.addEventListener('click', this.event);
        this.viewport.addEventListener('dblclick', this.event);  
      }
      this.toggledListeners = !this.toggledListeners;
    }
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
