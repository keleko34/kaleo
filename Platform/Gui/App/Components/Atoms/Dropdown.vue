<template>
  <div ref="container" v-if="options.length" @mouseover="handleHover" :class="`Dropdown ${dFocus && 'Dropdown--focus'}`">
    <div
      class="Dropdown__title"
      ref="title"
      @click.prevent="toggleOpen"
    >
      {{dValue}}
    </div>
    <div class="Dropdown__list" :style="`display: ${(dFocus ? '' : 'none')}`">
      <div
        v-for="item in dOptions"
        class="Dropdown__list-item"
        @click.prevent="handleChoice(item)"
      >
        {{item.text}}<span>{{item.key}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    options: { type: Array, default: () => ([]) },
    canHover: { type: Boolean, default: false },
    value: { type: String, default: '' }
  },
  data() {
    
    /* Map passed options to apply local scope */
    const dOptions = this.options.map((opt) => {
      opt.action = opt.action.bind(this);
      return opt;
    });
    
    return {
      dFocus: false,
      dOptions,
      
      /* if a value was passed that is found in the options, we set the data to it */
      dValue: (dOptions.find(v => (v.text === this.value)) ? this.value : dOptions[0].text)
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
        });
      }
    }
  },
  methods: {
    handleChoice(item) {
      /* when an item is clicked we: set the text value, run associated action, toggle dropdown closed */
      this.dValue = (item.text || 'Please Select An Item');
      this.$emit('value', this.dValue);
      if(item.action) item.action();
      this.toggleOpen(false);
    },
    toggleOpen(toggle) {
      /* turns off the ability to hover open dropdowns if we reclicked an active item */
      if(this.dFocus && !(typeof toggle === 'boolean' ? toggle : !this.dFocus)) this.$alert('toolbar_active', false);
      
      /* set focus, if not focused remove document blur event */
      this.dFocus = (typeof toggle === 'boolean' ? toggle : !this.dFocus);
      if(!this.dFocus) document.removeEventListener('click', this.handleBlur);
      
      /* if focused add document blur listener */
      if(this.dFocus) document.addEventListener('click', this.handleBlur);
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
  },
  watch: {
    value(val) {
        this.dValue = (this.dOptions.find(v => (v.text === val)) ? val : this.dOptions[0].text);
    }
  }
}
</script>

<style lang="scss">
  .Dropdown {
    position: relative;
    font-family: "Open Sans";
    font-size: 11px;
    font-weight: 600;
    color: #bdc2c7;
    background: #3c3c3c;
    height: 24px;
    line-height: 24px;
    &__title {
      padding: 0px 8px;
      cursor: pointer;
      letter-spacing: 0.2px;
    }
    &__list {
      width: 100%;
      top: 100%;
      position: absolute;
      background: #333;
      box-shadow: 0px 2px 6px -5px #000;
      overflow-y: auto;
      z-index: 1;
      &-item {
        padding: 0px 8px;
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
