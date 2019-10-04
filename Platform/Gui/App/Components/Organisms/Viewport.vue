<template>
  <div ref="viewport" class="Viewport">
    <debug-bar class="Viewport__debug"></debug-bar>
    <settings v-if="settings"></settings>
    <canvas ref="canvas" class="Viewport__view" :width="rWidth" :height="rHeight"></canvas>
  </div>
</template>

<script>
import DebugBar from 'molecules/DebugBar'
import Settings from 'organisms/Settings'

export default {
  name: 'Viewport',
  components: { DebugBar, Settings },
  data() {
    /* sets local data. rWidth and rHeight control the resolution of the canvas,
     * the actual size is controlled by css */
    const { graphics } = nw.global.settings;
    
    return {
      settings: false,
      locked: false,
      rWidth: graphics.R_WIDTH,
      rHeight: graphics.R_HEIGHT
    }
  },
  methods: {
    
    /* toggles the viewport into fullscreen */
    toggleFullscreen(toggle) {
      const win = this.$window;
      
      /* if the window is locked we do not allow this */
      if(win.locked) return;

      if(toggle !== undefined) win.fullscreen = !toggle;
      
      /* fullscreen activates from an element you want to fullscreen, but deactivates from the document */
      if(!win.fullscreen) { this.$refs.viewport.requestFullscreen(); }
      else { if(document.fullscreenElement) document.exitFullscreen(); }
      
      win.fullscreen = !this.$window.fullscreen;
    },
    
    /* toggles the settings window open or closed */
    toggleSettings(toggle) {
      this.settings = (typeof toggle === 'boolean' ? toggle : !this.settings);
      
      /* If the pointer lock on the canvas is active we need to deactivate it */
      if(this.settings) this.togglePointerLock(false);
      
      /* we also pause the render loop when settings is active */
      this.$alert(this.settings ? 'stop' : 'start');
    },
    
    /* locks and unlcoks the cursor to the canvas */
    togglePointerLock(toggle) {
      this.locked = (typeof toggle === 'boolean' ? toggle : !this.locked);
      
      /* pointerlock activates from an element to lock to, but deactivates from document */
      if(this.locked) { this.$refs.canvas.requestPointerLock(); }
      else { document.exitPointerLock(); }
      
      /* Tell the engine we have locked the cursor */
      this.$alert('pointerlocked', this.locked);
    },
    
    /* Updates the actual canvas resolution when changed. see listener */
    updateResolution(size) {
      this.rWidth = size[0];
      this.rHeight = size[1];
    }
  },
  mounted() {
    const { graphics } = nw.global.settings,
          { canvas, viewport } = this.$refs;
    /* attach the viewport as the area for input mouse events to happen */
    this.$mouse.attach(viewport);
    
    /* Pass the canvas to the engine to use */
    this.$renderer.setup(canvas);
    
    /* listen for events to run the associated methods */
    this.$listen('togglefullscreen', this.toggleFullscreen);
    this.$listen('togglesettings', this.toggleSettings);
    this.$listen('togglepointerlock', this.togglePointerLock);
    this.$listen('resolution', this.updateResolution);
    
    /* Pointer lock only on dbl click of the mouse */
    canvas.ondblclick = () => { this.togglePointerLock(true); }
    
    /* based on the saved graphics settings determine if we should change the window mode from default `windowed` */
    switch(graphics.W_MODE)
    {
      case graphics.W_FULLSCREEN:
        this.toggleFullscreen(true);
        this.$alert('lock', true);
        break;
      case graphics.W_WINDOWFULLSCREEN:
        this.$alert('maximize');
        this.$alert('lock', true);
        break;
    }
  }
}
</script>

<style lang="scss">
  .Viewport {
    position: relative;
    display: flex;
    background: #1d1d1d;
    &__debug {
      position: absolute;
      top: 0px;
      z-index: 0;
    }
    &__view {
      width: 100%;
      flex: 1 1 auto;
    }
  }
</style>
