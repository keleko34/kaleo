<template>
  <div ref="viewport" class="Viewport">
    <debug-bar class="Viewport__debug"></debug-bar>
    <settings v-if="settings"></settings>
    <canvas class="Viewport__view" ref="canvas" :width="rWidth" :height="rHeight"></canvas>
  </div>
</template>

<script>
import DebugBar from 'molecules/DebugBar'
import Settings from 'organisms/Settings'

export default {
  name: 'Viewport',
  components: { DebugBar, Settings },
  data() {
    const { graphics } = nw.global.settings;
    
    return {
      settings: false,
      locked: false,
      rWidth: graphics.R_WIDTH,
      rHeight: graphics.R_HEIGHT
    }
  },
  methods: {
    toggleFullscreen(toggle) {
      if(this.$window.locked) return;

      if(toggle !== undefined) this.$window.fullscreen = !toggle;
      if(!this.$window.fullscreen)
      {
        this.$refs.viewport.requestFullscreen();
      }
      else
      {
        if(document.fullscreenElement) document.exitFullscreen();
      }
      this.$window.fullscreen = !this.$window.fullscreen;
    },
    toggleSettings(toggle) {
      this.settings = (typeof toggle === 'boolean' ? toggle : !this.settings);
      if(this.settings) this.togglePointerLock(false);
      this.$alert(this.settings ? 'stop' : 'start');
    },
    togglePointerLock(toggle) {
      this.locked = (typeof toggle === 'boolean' ? toggle : !this.locked);
      if(this.locked) { this.$refs.canvas.requestPointerLock(); }
      else { document.exitPointerLock(); }
      this.$alert('pointerlocked', this.locked);
    },
    updateResolution(size) {
      this.rWidth = size[0];
      this.rHeight = size[1];
    },
  },
  mounted() {
    const { graphics } = nw.global.settings,
          { canvas, viewport } = this.$refs;
    
    this.$mouse.attach(viewport);
    this.$renderer.setup(canvas);
    this.$listen('togglefullscreen', this.toggleFullscreen);
    this.$listen('togglesettings', this.toggleSettings);
    this.$listen('togglepointerlock', this.togglePointerLock);
    this.$listen('resolution', this.updateResolution);
    
    canvas.ondblclick = () => { this.togglePointerLock(true); }
    
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
