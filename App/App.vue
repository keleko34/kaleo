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
    this.$root.$alert('viewport_created', this.$refs.viewport)
    this.$root.$data.engine.timer = requestAnimationFrame(this.$root.$main);
  }
}
</script>

<style lang="scss">
  .Window {
    height: inherit;
    position: relative;
    display: flex;
    flex-direction: column;
    .Debug {
      top: 26px;
    }
    .Viewport {
      width: 100%;
      flex: 1 1 100%;
    }
  }
</style>
