<template>
  <div class="Settings">
    <div class="Settings__Modal">
      <div class="nav-bar">
        <div class="nav-bar__item" @click="toggleSection('video')" :class="nav === 'video' ? 'active' : ''">Video</div>
        <div class="nav-bar__item" @click="toggleSection('engine')" :class="nav === 'engine' ? 'active' : ''">Engine</div>
        <div class="nav-bar__item" @click="toggleSection('input')" :class="nav === 'input' ? 'active' : ''">Keyboard/Mouse</div>
      </div>
      <div class="Settings__Content">
        <div class="Settings__Item" :class="nav === 'video' ? 'active' : ''">
          <settings-graphics v-if="nav === 'video'"></settings-graphics>
        </div>
        <div class="Settings__Item" :class="nav === 'engine' ? 'active' : ''">
          <settings-engine v-if="nav === 'engine'"></settings-engine>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsGraphics from 'molecules/SettingsGraphics';
import SettingsEngine from 'molecules/SettingsEngine';

export default {
  name: 'Settings',
  components: { SettingsGraphics, SettingsEngine },
  data() {
    return {
      nav: ''
    }
  },
  methods: {
    toggleSection(v) {
      this.nav = (this.nav === v ? '' : v);
    }
  }
}
</script>

<style lang="scss">
  .Settings {
    position: absolute;
    z-index: 0;
    height: 100%;
    width: 100%;
    /* background: linear-gradient(to top, rgba(84, 81, 81, 0.30) 50%, rgba(179, 174, 174, 0.30) 100%); */
    &__Modal {
      width: 94%;
      position: absolute;
      z-index: 1;
      height: 90%;
      background: rgba(60, 60, 60, 0.4);
      left: 50%;
      top: 50%;
      margin-left: -47%;
      margin-top: -24%;
      box-shadow: 0px 1px 6px 0px #222;
      display: flex;
      flex-direction: row;
      
      .nav-bar {
        width: 20%;
        height: 100%;
        
        &__item {
          margin: 6% 5%;
          width: 70%;
          height: 40px;
          font-family: "Open Sans";
          font-style: italic;
          color: aliceblue;
          font-size: 20px;
          border-bottom: 1px solid aliceblue;
          text-align: left;
          line-height: 40px;
          padding-left: 50px;
          cursor: pointer;
          transition: margin 180ms;
        }
        
        &__item.active {
          margin-left: 16%;
          color: #9a9fa2;
          border-bottom-color: #9a9fa2;
        }
        
        &__item:hover {
          color: #9a9fa2;
          border-bottom-color: #9a9fa2;
        }
      }
    }
    
    &__Content {
      padding: 24px;
      font-family: "Open Sans";
      color: white;
      margin-left: 32px;
    }
    &__Item {
      opacity: 0;
      transition: opacity 500ms;
    }
    &__Item.active {
      opacity: 1;
    }
  }
</style>
