<template>
  <div class="Window">
    <tool-bar />
    <debug-bar class="Debug" />
    <canvas ref="viewport" class="Viewport"></canvas>
  </div>
</template>

<script>
import ToolBar from 'organisms/ToolBar'
import DebugBar from 'organisms/DebugBar'

export default {
  name: 'app',
  components: { ToolBar, DebugBar },
  mounted() {
    this.$root.$alert('viewport', this.$refs.viewport)
    this.$root.$data.engine.timer = requestAnimationFrame(this.$root.$main);
  }
}
</script>

<style lang="scss">
  .Window {
    height: inherit;
    position: relative;
    .Viewport {
      width: 100%;
      height: calc(100% - 30px);
    }
  }
</style>
