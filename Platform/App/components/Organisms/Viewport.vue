<template>
  <div ref="viewport" class="Viewport">
    <debug-bar class="Viewport__debug"></debug-bar>
    <canvas class="Viewport__view" ref="canvas"></canvas>
  </div>
</template>

<script>
import DebugBar from 'molecules/DebugBar'

export default {
  name: 'Viewport',
  components: { DebugBar },
  methods: {
    toggleFullscreen(toggle) {
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
    }
  },
  mounted() {
    this.$mouse.attach(this.$refs.viewport);
    this.$listen('togglefullscreen', this.toggleFullscreen);
    
    this.$alert('viewport_created', this.$refs.canvas);
    this.$root.$data.engine.timer = requestAnimationFrame(this.$root.$main);
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
