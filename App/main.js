import Vue from 'vue'
import App from './App.vue'

/* GLOBALS */
import eventbus from 'plugins/eventbus'
import win from 'plugins/window'
import engine from 'plugins/engine'

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(eventbus);
Vue.use(win);
Vue.use(engine);

new Vue({
  render: h => h(App),
  data: {
    debug: false,
    win: {
      maximized: false,
      minimized: false,
      locked: false
    },
    engine: {
      timer: undefined,
      isRunning: true,
      fps: {
        current: 0,
        avg: 0,
        best: 0,
        worst: 0
      },
      viewport: undefined,
      ctx: undefined
    }
  },
  created() {
    Vue._installedPlugins.forEach((plugin) => {
      if(plugin.created) plugin.created.call(this);
    })
  }
}).$mount('#app')
