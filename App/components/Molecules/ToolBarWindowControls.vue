<template>
  <div class="ToolBarWindowControls">
    <div
       class="ToolBarWindowControls__action"
       @click.prevent="handleMinimize"
    >
      <div class="ToolBarWindowControls__action-icon ToolBarWindowControls__action-minimize dripicons dripicons-minus"></div>
    </div>
    <div
       class="ToolBarWindowControls__action"
       @click.prevent="handleMaximize"
    >
      <div :class="cMaximizedClass"></div>
    </div>
    <div
       class="ToolBarWindowControls__action ToolBarWindowControls__action--red"
       @click.prevent="handleClose"
    >
      <div class="ToolBarWindowControls__action-icon ToolBarWindowControls__action-exit dripicons dripicons-cross"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBarWindowControls',
  methods: {
    handleClose() {
        this.$root.$alert('close');
    },
    handleMaximize() {
        this.$root.$alert('maximize');
    },
    handleMinimize() {
      this.$root.$alert('minimize');
    }
  },
  computed: {
    cMaximizedClass() {
      const icon = (this.$root.$data.win.maximized ? 'duplicate' : 'media-stop')
      return `ToolBarWindowControls__action-icon ToolBarWindowControls__action-maximize dripicons dripicons-${icon}`;
    }
  }
}
</script>

<style lang="scss">
  .ToolBarWindowControls {
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: flex-end;
    &__action {
      color: aliceblue;
      width: 26px;
      text-align: center;
      height: 100%;
      font-size: 16px;
      line-height: inherit;
      cursor: pointer;
      -webkit-app-region: no-drag;
      &-icon {
        line-height: inherit;
      }
      &-maximize {
        font-size: 12px;
      }
    }
    &__action:hover {
      background: #555;
    }
    &__action--red:hover {
      background: #672c2c;
    }
  }
</style>
