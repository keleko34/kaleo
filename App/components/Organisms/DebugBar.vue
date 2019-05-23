<template>
  <div class="DebugBar">
    <debug-keys />
  </div>
</template>

<script>
import DebugKeys from 'molecules/DebugKeys'

export default {
  name: 'DebugBar',
  components: { DebugKeys }
}
</script>

<style lang="scss">
  .DebugBar {
    position: absolute;
    z-index: 1;
    height: 24px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
</style>
