<template>
  <div class="Window">
    <tool-bar />
    <canvas ref="viewport" class="Viewport"></canvas>
  </div>
</template>

<script>
import ToolBar from 'organisms/ToolBar'

export default {
  name: 'app',
  components: { ToolBar },
  mounted() {
    this.$root.$alert('viewport', this.$refs.viewport)
    this.$root.$data.engine.timer = requestAnimationFrame(this.$root.$main);
  }
}
</script>

<style lang="scss">
  .Window {
    height: inherit;
    .Viewport {
      width: 100%;
      height: calc(100% - 30px);
    }
  }
</style>
