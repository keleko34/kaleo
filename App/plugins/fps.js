import FPS from 'engine/FPS/fps';

export default {
  install(vue) {
    vue.prototype.$fps = new FPS();
  },
  created() {
    this.$listen('render', this.$fps.update.bind(this.$fps));
  },
  extend() {
    this.$fps.$alert = this.$alert.bind(this);
  }
}
