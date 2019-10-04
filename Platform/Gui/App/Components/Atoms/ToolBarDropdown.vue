<template>
  <div ref="container" v-if="options.length" @mouseover="handleHover" :class="`ToolBarDropdown ${dFocus && 'ToolBarDropdown--focus'}`">
    <div
      class="ToolBarDropdown__title"
      ref="title"
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
export default {
  name: 'ToolBarDropdown',
  props: {
    options: { type: Array, default: () => ([]) },
    canHover: { type: Boolean, default: false }
  },
  data() {
    /* Map passed options to apply local scope */
    const dOptions = this.options.map((opt) => {
      opt.action = opt.action.bind(this);
      return opt;
    });
    
    return {
      dFocus: false,
      dOptions
    }
  },
  mounted() {
    
    /* loop through each option, if it contains a key add it to the input registry */
    const len = this.dOptions.length;
    let x = 0, opt, lKey;
    
    for(x;x<len;x++)
    {
      opt = this.dOptions[x];
      if(opt.key !== undefined)
      {
        /* each item should be toggle type key, meaning the action happens once on keypress,
           environment is gui which takes special precedence over all other environments */
        lKey = opt.key.toLowerCase();
        this.$register(opt.text, 'gui', {
          key: lKey.replace(/(ctrl)|(alt)|(shift)|[\s+]/g, ''),
          toggle: true,
          action: opt.action,
          shiftKey: lKey.indexOf('shift') !== -1,
          ctrlKey: lKey.indexOf('ctrl') !== -1,
          altKey: lKey.indexOf('alt') !== -1
        })
      }
    }
  },
  methods: {
    toggleOpen(toggle) {
      /* turns off the ability to hover open dropdowns if we reclicked an active item */
      if(this.dFocus && !(typeof toggle === 'boolean' ? toggle : !this.dFocus)) this.$alert('toolbar_active', false);
      
      /* set focus, if not focused remove document blur event */
      this.dFocus = (typeof toggle === 'boolean' ? toggle : !this.dFocus);
      if(!this.dFocus) document.removeEventListener('click', this.handleBlur);
      
      /* if focused add document blur listener, alert to parent to close all */
      if(this.dFocus)
      {
        document.addEventListener('click', this.handleBlur);
        this.$alert('toolbar_active', true);
      }
    },
    handleHover() {
      /* If the dropdown can open simply from hover, click to handle blur of other dropdowns and then open */
      if(this.canHover)
      {
        document.dispatchEvent(new MouseEvent('click'));
        this.toggleOpen(true);
      }
    },
    handleBlur(e) {
      /* if the current item clicked is not in the dropdown we close the dropdown */
      if(!this.$refs.container.contains(e.target)) this.toggleOpen(false);
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
    font-family: "Open Sans";
    font-size: 11px;
    font-weight: 600;
    color: #bdc2c7;
    &__title {
      padding: 0px 8px;
      cursor: pointer;
      letter-spacing: 0.2px;
    }
    &__list {
      width: 200px;
      top: 100%;
      position: absolute;
      background: #333;
      box-shadow: 0px 2px 6px -5px #000;
      overflow-y: auto;
      &-item {
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
