class Window {
  constructor() {
    /* TODO: LOAD PARAMS FROM A FILE */
    this.gui = window.require('nw.gui');
    this.window = this.gui.Window.get();
    this.maximized = false;
    this.minimized = false;
    this.locked = false;
    this.fullscreen = false;
    this.width = 1280;
    this.height = 720;
    
    this.window.on('restore', () => {
      this.maximized = false;
      this.minimized = false;
      this.$root.$alert('restored');
    })
    
    this.window.on('maximize', () => {
      this.maximized = true;
      this.minimized = false;
      this.$root.$alert('maximized');
    })
    
    this.window.on('minimize', () => {
      this.maximized = false;
      this.minimized = true;
      this.$root.$alert('minimized');
    })
  }
  
  toggleLock(toggle) {
    this.locked = (toggle !== undefined ? toggle : !this.locked);
  }
  
  restore() {
    this.maximized = false;
    this.minimized = false;
    this.window.restore();
  }
  
  toggleMaximize(toggle) {
    if(this.locked) return;
    if(toggle !== undefined) this.maximized = !toggle;

    if(!this.maximized)
    {
      this.window.maximize();
    }
    else
    {
      this.window.restore();
    }
    this.maximized = !this.maximized;
  }
  
  toggleMinimize(toggle) {
    if(this.locked) return;
    if(toggle !== undefined) this.minimized = !toggle;

    if(!this.minimized)
    {
      this.window.minimize();
    }
    else
    {
      this.window.restore();
    }
    this.minimized = !this.minimized;
  }
  
  install(vue) {
    vue.prototype.$window = this;
  }
  
  created() {
    this.$listen('lock', (toggle) => (this.$window.toggleLock(toggle)));
    this.$listen('restore', () => (this.$window.restore()));
    this.$listen('maximize', (toggle) => (this.$window.toggleMaximize(toggle)));
    this.$listen('minimize', (toggle) => (this.$window.toggleMinimize(toggle)));
    this.$listen('close', () => (this.$window.window.close(true)));
    this.$listen('reload', () => (this.$window.window.reload()));
    this.$listen('hard_reload', () => (chrome.runtime.reload()));
    this.$listen('console', () => (this.$window.window.showDevTools()));
    this.$listen('console_background', () => {
      chrome.developerPrivate.openDevTools({
          renderViewId: -1,
          renderProcessId: -1,
          extensionId: chrome.runtime.id
      })
    })
    
    document.addEventListener('contextmenu', (e) => { e.preventDefault(); })
  }
}

export default new Window();
