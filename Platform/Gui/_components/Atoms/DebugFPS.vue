<template>
  <div class="DebugFps">
    <div class="DebugFps__item">Avg: {{avg}}</div>
    <div class="DebugFps__item">Current: {{current}}</div>
  </div>
</template>

<script>
export default {
  name: 'DebugFps',
  data() {
    const { F_FPS } = nw.global.settings.engine;
    return {
      avg: (F_FPS.avg || 0),
      current: (F_FPS.current || 0)
    }
  },
  mounted() {
    const { F_FPS } = nw.global.settings.engine;
    this.$delay(() => {
      this.avg = F_FPS.avg;
      this.current = F_FPS.current;
    }, 5);
  }
}
</script>

<style lang="scss">
  .DebugFps {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 150px;
    line-height: 24px;
    font-family: 'Open Sans';
    color: rgba(240, 248, 255, 0.6);
    font-weight: 500;
    font-size: 14px;
    &__item {
      margin-right: 8px;
    }
  }
</style>
