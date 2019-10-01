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
  name: 'Dropdown',
  props: {
    options: { type: Array, default: () => ([]) },
    canHover: { type: Boolean, default: false },
    value: { type: String, default: '' }
  },
  data() {
    const dOptions = mapOptions.call(this, this.options);
    return {
      dFocus: false,
      dOptions,
      dValue: (dOptions.find(v => (v.text === this.value)) ? this.value : dOptions[0].text)
    }
  },
  mounted() {
    this.options.forEach((opt) => {
      if(opt.key)
      {
        this.$alert('register_input', {
          name: opt.text,
          environment: 'gui',
          key: opt.key.toLowerCase().replace(/(ctrl)|(alt)|(shift)|[\s+]/g, ''),
          toggle: true,
          action: opt.action,
          shiftKey: (opt.key.toLowerCase().indexOf('shift') !== -1),
          ctrlKey: (opt.key.toLowerCase().indexOf('ctrl') !== -1),
          altKey: (opt.key.toLowerCase().indexOf('alt') !== -1)
        })
      }
    })
  },
  methods: {
    handleChoice(item) {
      this.dValue = (item.text || 'Please Select An Item');
      this.$emit('value', this.dValue);
      if(item.action) item.action();
    },
    toggleOpen(toggle) {
      if(this.dFocus && !(typeof toggle === 'boolean' ? toggle : !this.dFocus))
      {
        this.$alert('toolbar_active', false);
      }
      this.dFocus = (typeof toggle === 'boolean' ? toggle : !this.dFocus);
      if(!this.dFocus) document.removeEventListener('click', this.handleBlur);
      if(this.dFocus)
      {
        document.addEventListener('click', this.handleBlur);
        this.$alert('toolbar_active', true);
      }
    },
    handleHover() {
      if(this.canHover)
      {
        document.dispatchEvent(new MouseEvent('click'));
        this.toggleOpen(true);
      }
    },
    handleBlur(e) {
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
