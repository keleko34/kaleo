import Keycodes from 'helpers/keycodes';

export default class Keyboard {
  constructor() {
    this.keys = Keycodes.codes;
    this.attached = null;
    this.hold = {};
    this.relay = () => {};
    
    this.event = this.event.bind(this);
  }
  
  event(e) {
    e.preventDefault();
    e.inputCode = e.keyCode;
    e.inputKey = this.keys[e.keyCode];
    if(this.hold[e.keyCode])
    {
      if(e.type === 'keyup')
      {
        this.hold[e.keyCode] = false;
        this.relay(e);
      }
    }
    else if(e.type === 'keydown')
    {
      this.relay(e);
      this.hold[e.keyCode] = true;
    }
  }
  
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
  
  detach() {
    this.attached.removeEventListener('keydown', this.event);
    this.attached.removeEventListener('keyup', this.event);
    
    this.attached = null;
  }
}
