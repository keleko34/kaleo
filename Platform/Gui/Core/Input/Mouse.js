import Keycodes from './Keycodes';

export default class Mouse {
  constructor() {
    
    /* Holds all the keycodes and their respective names */
    this.keys = Keycodes.codes;
    
    /* The dom element that the events are attached to */
    this.attached = null;
    
    /* what items are currently pressed */
    this.hold = {};
    
    /* the method to run when a keyboard event happens */
    this.relay = () => {}
    
    /* main method */
    this.event = this.event.bind(this);
  }
  
  /* runs for each event of mouseup or mousedown */
  event(e) {
    e.preventDefault();
    
    /* extend event object */
    e.inputCode = e.button;
    e.inputKey = this.keys[e.button];
    
    /* if the key is held and the event is mouseup we remove the hold, this debounces the multiple mousedown calls */
    if(this.hold[e.button])
    {
      if(e.type === 'mouseup')
      {
        this.hold[e.button] = false;
        this.relay(e);
      }
    }
    else
    {
      /* run on initial mousedown, activate hold for this key */
      if(e.type === 'mousedown')
      {
        this.relay(e);
        this.hold[e.button] = true;
      }
      
      /* mouse click or dblclick event */
      else
      {
        this.relay(e);
      }
    }
  }
  
  /* overwrite and attach mouse events to the dom element specified */
  attach(el) {
    if(this.attached)
    {
      this.attached.removeEventListener('mousedown', this.event);
      this.attached.removeEventListener('mouseup', this.event);
      this.attached.removeEventListener('click', this.event);
      this.attached.removeEventListener('dblclick', this.event);
    }
    
    this.attached = el;
    
    el.addEventListener('mousedown', this.event);
    el.addEventListener('mouseup', this.event);
    el.addEventListener('click', this.event);
    el.addEventListener('dblclick', this.event);
  }
  
  /* remove event listeners from the dom */
  detach() {
    this.attached.removeEventListener('mousedown', this.event);
    this.attached.removeEventListener('mouseup', this.event);
    this.attached.removeEventListener('click', this.event);
    this.attached.removeEventListener('dblclick', this.event);
    
    this.attached = null;
  }
}
