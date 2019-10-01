import Vue from 'vue'
import App from './App.vue'

/* GLOBALS */
import eventbus from '_plugins/eventbus';
import rendergui from '_plugins/rendergui';
import window from '@/Window/window';
import input from '@/Input/input';
import viewport from '@/Viewport/viewport';

Vue.config.productionTip = false;
/* TODO: TOGGLE FOR BUILD */
Vue.config.devtools = true;

Vue.use(eventbus);
Vue.use(rendergui);
Vue.use(window);
Vue.use(viewport);
Vue.use(input);

new Vue({
  render: h => h(App),
  data: {
    console: false,
    debug: false
  },
  created() {
    Vue._installedPlugins.forEach((plugin) => {
      plugin.$root = this;
      
      if(plugin.extend) plugin.extend.call(this);
      if(plugin.created) plugin.created.call(this);
    })
  }
}).$mount('#app')
