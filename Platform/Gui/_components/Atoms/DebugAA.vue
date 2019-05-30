<template>
  <div class="DebugAa">AA: {{antialias}}</div>
</template>

<script>
export default {
  name: 'DebugAa',
  data() {
    return {
      antialias: 'off'
    }
  },
  mounted() {
    this.$listen('antialias', (v) => {
      this.antialias = v;
    })
  }
}
</script>

<style lang="scss">
  .DebugAa {
    display: flex;
    flex-direction: row;
    height: 100%;
    line-height: 24px;
    font-family: 'Open Sans';
    color: rgba(240, 248, 255, 0.6);
    font-weight: 500;
    font-size: 14px;
  }
</style>
