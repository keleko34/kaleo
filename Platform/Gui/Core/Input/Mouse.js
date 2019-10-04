import Keycodes from './Keycodes';

export default class Mouse {
  constructor() {
    this.keys = Keycodes.codes;
    this.attached = null;
    this.hold = {};
    
    this.relay = () => {}
    
    this.event = this.event.bind(this);
  }
  
  event(e) {
    e.preventDefault();
    e.inputCode = e.button;
    e.inputKey = this.keys[e.button];
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
      if(e.type === 'mousedown')
      {
        this.relay(e);
        this.hold[e.button] = true;
      }
      else
      {
        this.relay(e);
      }
    }
  }
  
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
  
  detach() {
    this.attached.removeEventListener('mousedown', this.event);
    this.attached.removeEventListener('mouseup', this.event);
    this.attached.removeEventListener('click', this.event);
    this.attached.removeEventListener('dblclick', this.event);
    
    this.attached = null;
  }
}
