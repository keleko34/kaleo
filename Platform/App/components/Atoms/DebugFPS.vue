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
    return {
      avg: 0,
      current: 0
    }
  },
  mounted() {
    this.$listen('fps', (e) => {
      this.avg = e.avg;
      this.current = e.current;
    })
  }
}
</script>

<style lang="scss">
  .DebugFps {
    display: flex;
    flex-direction: row;
    height: 100%;
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
