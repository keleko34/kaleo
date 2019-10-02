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
  data() {
    return {
      maximized: this.$window.maximized
    }
  },
  mounted() {
    this.$listen('maximized', () => {
      this.maximized = true;
    })
    this.$listen('restored', () => {
      this.maximized = false;
    })
  },
  methods: {
    handleClose() {
        this.$alert('close');
    },
    handleMaximize() {
        this.$alert('maximize');
    },
    handleMinimize() {
      this.$alert('minimize');
    }
  },
  computed: {
    cMaximizedClass() {
      const icon = (this.maximized ? 'duplicate' : 'media-stop')
      return `ToolBarWindowControls__action-icon ToolBarWindowControls__action-maximize dripicons dripicons-${icon}`;
    }
  }
}
</script>

<style lang="scss">
  .ToolBarWindowControls {
    display: flex;
    flex-direction: row;
    height: 26px;
    justify-content: flex-end;
    &__action {
      color: #bdc2c7;
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
      &-minimize {
        font-size:18px;
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
