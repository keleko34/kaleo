<template>
  <div ref="viewport" class="Viewport">
    <debug-bar class="Viewport__debug"></debug-bar>
    <settings v-if="settings"></settings>
    <canvas class="Viewport__view" ref="canvas"></canvas>
  </div>
</template>

<script>
import DebugBar from 'molecules/DebugBar'
import Settings from 'organisms/Settings'

export default {
  name: 'Viewport',
  components: { DebugBar, Settings },
  data() {
    return {
      settings: false
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
      this.$alert(this.settings ? 'stop' : 'start');
    }
  },
  mounted() {
    const { graphics } = nw.global.settings;
    this.$mouse.attach(this.$refs.viewport);
    this.$listen('togglefullscreen', this.toggleFullscreen);
    this.$listen('togglesettings', this.toggleSettings);
    this.$renderer.canvas = this.$refs.viewport;
    
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
      flex: 1 1 100%;
    }
  }
</style>
