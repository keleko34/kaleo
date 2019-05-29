<template>
  <div class="DebugBar">
    <debug-fps class="FPS" />
    <debug-keys />
  </div>
</template>

<script>
import DebugFps from 'atoms/DebugFPS';
import DebugKeys from 'atoms/DebugKeys';

export default {
  name: 'DebugBar',
  components: { DebugKeys, DebugFps }
}
</script>

<style lang="scss">
  .DebugBar {
    height: 24px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .FPS {
      flex: 1 1;
      margin-left: 8px;
    }
  }
</style>
