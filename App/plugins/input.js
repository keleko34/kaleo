import Input from 'engine/Input/input';

export default {
  install(vue) {
    
    const input = new Input();
    
    vue.prototype.$input = input;
    
    vue.prototype.$bind = input.setBinding.bind(input);
    vue.prototype.$unbind = input.clearBinding.bind(input);
  },
  created() {
    this.$listen('viewport_created', () => {
      this.$input.keyboard.toggleListeners(true);
      this.$input.mouse.toggleListeners(true, this.$data.engine.viewport);
      this.$input.toggleDebug(true);
    })
    
    this.$listen('add_binding', (e) => {
      this.$bind(e.name, e.key, e.func, e.environment, e.type);
    })
    
    this.$listen('remove_binding', (e) => {
      this.$unbind(e.name, e.environment);
    })
    
    this.$listen('render', this.$input.update.bind(this.$input));
    
    /* stops windows default functionality */
    document.addEventListener('keydown', (e) => { e.preventDefault(); })
  },
  extend() {
    this.$input.$alert = this.$alert.bind(this);
  }
}
