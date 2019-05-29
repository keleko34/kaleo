<template>
  <div class="Window">
    <tool-bar />
    <viewport class="Viewport"></viewport>
  </div>
</template>

<script>
import ToolBar from 'organisms/ToolBar'
import Viewport from 'organisms/Viewport'

export default {
  name: 'app',
  components: { ToolBar, Viewport }
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
