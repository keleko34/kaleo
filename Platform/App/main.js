import Vue from 'vue'
import App from './App.vue'

/* GLOBALS */
import eventbus from 'plugins/eventbus'
import window from '@/Window/window'
import input from '@/Input/input'
import engine from 'plugins/engine'

Vue.config.productionTip = false;
/* TODO: TOGGLE FOR BUILD */
Vue.config.devtools = true;

Vue.use(eventbus);
Vue.use(window);
Vue.use(engine);
Vue.use(input);

new Vue({
  render: h => h(App),
  data: {
    console: false,
    debug: false,
    win: {
      maximized: false,
      minimized: false,
      locked: false,
      fullscreen: false
    },
    engine: {
      timer: undefined,
      isRunning: true,
      viewport: undefined,
      ctx: undefined
    }
  },
  created() {
    Vue._installedPlugins.forEach((plugin) => {
      plugin.$root = this;
      
      if(plugin.extend) plugin.extend.call(this);
      if(plugin.created) plugin.created.call(this);
    })
  }
}).$mount('#app')
