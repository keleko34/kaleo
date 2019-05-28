export default {
  install(vue) {
    
    vue.prototype.$pause = function pause() {
      this.$data.engine.isRunning = false;
    }
    
    vue.prototype.$play = function play() {
      this.$data.engine.isRunning = true;
    }
    
    vue.prototype.$main = function main() {
      const { engine } = this.$data;
      
      if(engine.isRunning)
      {
        engine.renderer.render();
        engine.ctx.drawImage(engine.renderer.renderer, 0, 0, engine.viewport.clientWidth, engine.viewport.clientHeight);
      }
      this.$alert('render');
      engine.timer = requestAnimationFrame(this.$main);
    }
  },
  created() {
    /* BACKEND CONTEXT */
    const BACKEND_RENDERER = window.require(`Engine/init.js`);
    
    this.$main = this.$main.bind(this);
    
    this.$listen('pause', () => {
      this.$pause();
    })
    
    this.$listen('play', () => {
      this.$play();
    })
    
    this.$listen('viewport_created', (viewport) => {
      this.$data.engine.viewport = viewport;
      this.$data.engine.ctx = viewport.getContext('2d');
      this.$data.engine.renderer = new BACKEND_RENDERER();
    })
  }
}
