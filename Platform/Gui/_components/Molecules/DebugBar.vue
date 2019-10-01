<template>
  <div v-if="dDebug" class="DebugBar">
    <debug-fps class="FPS" />
    <debug-keys />
  </div>
</template>

<script>
import DebugFps from 'atoms/DebugFPS';
import DebugKeys from 'atoms/DebugKeys';

export default {
  name: 'DebugBar',
  components: { DebugKeys, DebugFps },
  mounted() {
    this.$listen('toggledebug', toggle => (this.toggleDebug(toggle)));
  },
  data() {
    const { engine } = nw.global.settings;
    return {
      dDebug: (!!engine.D_DEBUG)
    };
  },
  methods: {
    toggleDebug(toggle) {
      const { engine } = nw.global.settings;
      this.dDebug = (toggle !== undefined ? toggle : !this.dDebug);
      engine.D_DEBUG = (this.dDebug ? 1 : 0);
      engine.save();
    }
  }
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
      flex: 1 1;
    }
  }
</style>
