export default {
  install(vue) {
    vue.prototype.$gui = window.require('nw.gui');
    vue.prototype.$window = vue.prototype.$gui.Window.get();
    
    /* toggles the window minimized state */
    vue.prototype.$toggleMinimize = function toggleMinimize(toggle)
    {
      if(this.$data.win.locked) return;
      
      const { win } = this.$data;
      if(toggle !== undefined) win.minimized = toggle;
      
      if(!win.minimized)
      {
        this.$window.minimize();
      }
      else
      {
        this.$window.restore();
      }
      win.minimized = !win.minimized;
    }
    
    /* toggles the window maximized state */
    vue.prototype.$toggleMaximize = function toggleMaximize(toggle)
    {
      if(this.$data.win.locked) return;
      
      const { win } = this.$data;
      if(toggle !== undefined) win.maximized = toggle;
      
      if(!win.maximized)
      {
        this.$window.maximize();
      }
      else
      {
        this.$window.restore();
      }
      win.maximized = !win.maximized;
    }
  },
  created() {
    this.$window.on('restore', () => {
      const { win } = this.$data;
      
      win.maximized = false;
      win.minimized = false;
    });
    
    this.$window.on('maximize', () => {
      const { win } = this.$data;
      
      win.maximized = true;
      win.minimized = false;
    });
    
    this.$window.on('minimize', () => {
      const { win } = this.$data;
      
      win.maximized = false;
      win.minimized = true;
    });
    
    this.$listen('close', () => {
      this.$window.close(true);
    })
    
    this.$listen('minimize', () => {
      this.$toggleMinimize();
    })
    
    this.$listen('maximize', () => {
      this.$toggleMaximize();
    })
  }
}