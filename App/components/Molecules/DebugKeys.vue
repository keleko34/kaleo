<template>
  <div class="DebugKeys">
    {{keys}}
  </div>
</template>

<script>
export default {
  name: 'DebugKeys',
  data() {
    return {
      keys: ''
    }
  },
  mounted() {
    this.$listen('debug_keys', (v) => {
      this.keys = v;
    })
  }
}
</script>

<style lang="scss">
  .DebugKeys {
    max-width: 200px;
    text-align: right;
    padding-right: 8px;
    height: 100%;
    line-height: 24px;
    font-family: 'Open Sans';
    color: rgba(240, 248, 255, 0.4);
    font-weight: 700;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
