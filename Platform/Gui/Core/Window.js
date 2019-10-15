class Window {
  constructor() {
    /* TODO: LOAD PARAMS FROM A FILE */
    
    /* Get the main nwjs window object */
    this.gui = window.require('nw.gui');
    this.window = this.gui.Window.get();
    
    /* local booleans for the window state */
    this.maximized = false;
    this.minimized = false;
    this.locked = false;
    this.fullscreen = false;
    
    /* current window size */
    this.width = 1280;
    this.height = 720;
    
    /* nwjs listeners to update the boolean states and alert the app of the change */
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
  
  /* locks the window from being resized */
  toggleLock(toggle) {
    this.locked = (toggle !== undefined ? toggle : !this.locked);
  }
  
  /* TODO: window restores on toolbar dblclick, if we are in window fullscreen this functionality should be disabled */
  
  /* restores the window to its previous state */
  restore() {
    this.maximized = false;
    this.minimized = false;
    this.window.restore();
  }
  
  toggleMaximize(toggle) {
    
    /* if locked we do not change the state of the window */
    if(this.locked) return;
    
    /* toggle maximized state */
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
    
    /* if locked we do not change the state of the window */
    if(this.locked) return;
    
    /* toggle minimized state */
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
  
  /* extend global vue object */
  install(vue) {
    vue.prototype.$window = this;
  }
  
  /* activates methods and listeners on the global vue object */
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
    });
    
    /* stop the right click context menu so we can add ours later */
    document.addEventListener('contextmenu', (e) => { e.preventDefault(); });
  }
}

export default new Window();
