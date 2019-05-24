import Mouse from 'globals/input/mouse';
import Keyboard from 'globals/input/keyboard';

export default {
  install(vue) {
    
    vue.prototype.$keyboard = new Keyboard();
    vue.prototype.$mouse = new Mouse();
    
  },
  create() {
    this.$keyboard.toggleListeners(true);
    this.$mouse.toggleListeners(true, this.$data.engine.viewport);
    
    /* stops windows default functionality */
    document.addEventListener('keydown', (e) => { e.preventDefault(); })
  }
}
