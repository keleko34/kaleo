<template>
  <div class="Settings-Engine">
    <div class="Settings-Engine__Item">
      <h3 class="Settings-Engine__Title">DEBUG:</h3>
      <dropdown class="Settings-Engine__Dropdown" :options="debug" :value="dDebug" @value="dDebug = $event"></dropdown>
    </div>
  </div>
</template>

<script>
import Dropdown from 'atoms/Dropdown';

export default {
  name: 'SettingsEngine',
  components: { Dropdown },
  data() {
    const { engine } = nw.global.settings;
    
    return {
      /* Initial dropdown value from the engine settings */
      dDebug: (engine.D_DEBUG ? 'ON' : 'OFF'),
      
      /* Dropdown params */
      debug: [
        { text: 'ON',
          action: () => {
            this.dDebug = 'ON';
            this.$alert('toggledebug', true);
          }
        },
        { text: 'OFF',
          action: () => {
            this.dDebug = 'OFF';
            this.$alert('toggledebug', false);
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .Settings-Engine {
    font-family: "Open Sans";
    color: white;
    &__Item {
      margin-top: 16px;
      display: flex;
      flex-direction: row;
      line-height: 24px;
    }
    &__Item:first-child {
      margin-top: 0px;
    }
    &__Title {
      font-size: 14px;
      width: 120px;
      border-right: 1px solid grey;
    }
    &__Dropdown {
      white-space: nowrap;
      margin-left: 8px;
      width: 80px;
    }
    &__Dropdown.long {
      width: 140px;
    }
  }
</style>
