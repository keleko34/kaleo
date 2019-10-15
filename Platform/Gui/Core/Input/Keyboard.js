import Keycodes from './Keycodes';

export default class Keyboard {
  constructor() {
    
    /* Holds all the keycodes and their respective names */
    this.keys = Keycodes.codes;
    
    /* The dom element that the events are attached to */
    this.attached = null;
    
    /* what items are currently pressed */
    this.hold = {};
    
    /* the method to run when a keyboard event happens */
    this.relay = () => {};
    
    /* main method */
    this.event = this.event.bind(this);
  }
  
  /* runs for each event of keyup or keydown */
  event(e) {
    e.preventDefault();
    
    /* extend event object */
    e.inputCode = e.keyCode;
    e.inputKey = this.keys[e.keyCode];
    
    /* if the key is held and the event is keyup we remove the hold, this debounces the multiple keydown calls */
    if(this.hold[e.keyCode])
    {
      if(e.type === 'keyup')
      {
        this.hold[e.keyCode] = false;
        this.relay(e);
      }
    }
    /* run on initial keydown, activate hold for this key */
    else if(e.type === 'keydown')
    {
      this.relay(e);
      this.hold[e.keyCode] = true;
    }
  }
  
  /* overwrite and attach keyboard events to the dom element specified */
  attach(el) {
    if(this.attached)
    {
      this.attached.removeEventListener('keydown', this.event);
      this.attached.removeEventListener('keyup', this.event);
    }
    
    this.attached = el;
    el.addEventListener('keydown', this.event);
    el.addEventListener('keyup', this.event);
  }
  
  /* remove event listeners from the dom */
  detach() {
    this.attached.removeEventListener('keydown', this.event);
    this.attached.removeEventListener('keyup', this.event);
    
    this.attached = null;
  }
}
