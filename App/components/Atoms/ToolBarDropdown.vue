<template>
  <div ref="container" v-if="options.length" :class="`ToolBarDropdown ${dFocus && 'ToolBarDropdown--focus'}`">
    <div
      class="ToolBarDropdown__title"
      @click.prevent="toggleOpen"
    >
      <slot></slot>
    </div>
    <div class="ToolBarDropdown__list" :style="`display: ${(dFocus ? '' : 'none')}`">
      <div
        v-for="item in dOptions"
        class="ToolBarDropdown__list-item"
        @click.prevent="item.action"
      >
        {{item.text}}<span>{{item.key}}</span>
      </div>
    </div>
  </div>
</template>

<script>

function mapOptions(options)
{
  return options.map((opt) => {
    const { action, text, key } = opt;
    return {
      key,
      text,
      action: () => {
        action.apply(this, arguments);
        this.toggleOpen();
      }
    };
  })
}
  
export default {
  name: 'ToolBarDropdown',
  props: {
    options: { type: Array, default: () => ([]) }
  },
  data() {
    return {
      dFocus: false,
      dOptions: mapOptions.call(this, this.options)
    }
  },
  methods: {
    toggleOpen() {
      this.dFocus = !this.dFocus;
      if(!this.dFocus) document.removeEventListener('click', this.handleBlur);
      if(this.dFocus) document.addEventListener('click', this.handleBlur);
    },
    handleBlur(e) {
      if(!this.$refs.container.contains(e.target)) this.toggleOpen();
    }
  },
  computed: {
    cListStyle() {
      const display = (this.dFocus ? '' : 'none');
      const height = Math.min((window.innerHeight * 0.5), this.options.length * 24)
      return `display: ${display};height: ${height}px;`
    }
  }
}
</script>

<style lang="scss">
  .ToolBarDropdown {
    position: relative;
    &__title {
      font-family: 'futura-pt';
      font-size: 13px;
      color: aliceblue;
      padding: 0px 8px;
      font-weight: 400;
      cursor: pointer;
    }
    &__list {
      width: 200px;
      top: 100%;
      position: absolute;
      background: #333;
      box-shadow: 0px 2px 6px -5px #000;
      overflow-y: auto;
      &-item {
        font-family: 'futura-pt';
        font-size: 13px;
        color: aliceblue;
        padding-left: 8px;
        cursor: pointer;
        
        span {
          float: right;
          margin-right: 8px;
        }
      }
      &-item:hover {
        background: #555;
      }
    }
  }
  .ToolBarDropdown:hover {
    background: #555;
  }
  .ToolBarDropdown--focus {
    background: #555;
  }
</style>
