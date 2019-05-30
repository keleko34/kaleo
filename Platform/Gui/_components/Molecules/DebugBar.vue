<template>
  <div class="DebugBar">
    <debug-fps class="FPS" />
    <debug-aa class="AA" />
    <debug-keys />
  </div>
</template>

<script>
import DebugFps from 'atoms/DebugFPS';
import DebugAa from 'atoms/DebugAA';
import DebugKeys from 'atoms/DebugKeys';

export default {
  name: 'DebugBar',
  components: { DebugKeys, DebugFps, DebugAa }
}
</script>

<style lang="scss">
  .DebugBar {
    height: 24px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    
    .FPS {
      margin-left: 8px;
    }
    .AA {
      margin-left: 8px;
    }
  }
  
  .DebugBar :nth-last-child(2) {
    flex: 1 1;
  }
</style>
