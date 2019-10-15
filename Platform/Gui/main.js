import Vue from 'vue'
import App from './App.vue'

/* GLOBALS */
import eventbus from '_plugins/eventbus';
import window from '@/Core/Window';
import viewport from '@/Core/Viewport';
import input from '@/Core/Input/Input';

Vue.config.productionTip = false;
/* TODO: TOGGLE FOR BUILD */
Vue.config.devtools = true;

/* vue plugins */
Vue.use(eventbus);
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
    
    /* run associated plugin methods and add root */
    Vue._installedPlugins.forEach((plugin) => {
      plugin.$root = this;
      
      if(plugin.extend) plugin.extend.call(this);
      if(plugin.created) plugin.created.call(this);
    })
  }
}).$mount('#app')
