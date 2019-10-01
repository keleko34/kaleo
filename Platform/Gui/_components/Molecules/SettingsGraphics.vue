<template>
  <div class="Settings-Graphics">
    <div class="Settings-Graphics__Item">
      <h3 class="Settings-Graphics__Title">WINDOW:</h3>
      <dropdown class="Settings-Graphics__Dropdown long" :options="windowModes" :value="win" @value="win = $event"></dropdown>
    </div>
    <div class="Settings-Graphics__Item">
      <h3 class="Settings-Graphics__Title">RESOLUTION:</h3>
      <dropdown class="Settings-Graphics__Dropdown" :options="resolutions" :value="res" @value="res = $event"></dropdown>
    </div>
    <div class="Settings-Graphics__Item">
      <h3 class="Settings-Graphics__Title">ANTI-ALIASING:</h3>
      <dropdown class="Settings-Graphics__Dropdown" :options="antialiasing" :value="aa" @value="aa = $event"></dropdown>
    </div>
  </div>
</template>

<script>
import Dropdown from 'atoms/Dropdown';

export default {
  name: 'SettingsGraphics',
  components: { Dropdown },
  data() {
    const { graphics } = nw.global.settings;

    return {
      win: (graphics.W_MODE === 0 ? 'Windowed' : (graphics.W_MODE === 1 ? 'Fullscreen' : 'Windowed Fullscreen')),
      res: `${graphics.R_WIDTH}x${graphics.R_HEIGHT}`,
      aa: (graphics.A_ALIAS ? 'ON' : 'OFF'),
      windowModes: [
        {
          text: 'Windowed',
          action: () => {
            this.win = 'Windowed';
            graphics.W_MODE = 0;
            graphics.save();
            this.$alert('lock', false);
            this.$alert('togglefullscreen', false);
            this.$alert('restore');
          }
        },
        {
          text: 'Windowed Fullscreen',
          action: () => {
            this.win = 'Windowed Fullscreen';
            graphics.W_MODE = 2;
            graphics.save();
            this.$alert('lock', false);
            this.$alert('togglefullscreen', false);
            this.$alert('maximize', true);
            this.$alert('lock', true);
          }
        },
        {
          text: 'Fullscreen',
          action: () => {
            this.win = 'Fullscreen';
            graphics.W_MODE = 1;
            graphics.save();
            this.$alert('lock', false);
            this.$alert('togglefullscreen', true);
            this.$alert('lock', true);
          }
        }
      ],
      resolutions: graphics.R_LIST.map(v => {
        v.text = `${v.w}x${v.h}`;
        v.action = () => {
          this.res = `${v.w}x${v.h}`;
          graphics.R_WIDTH = v.w;
          graphics.R_HEIGHT = v.h;
          graphics.save();
          graphics.update();
        }
        return v;
      }),
      antialiasing: [
        { text: 'ON',
          action: () => {
            this.aa = 'ON';
            graphics.A_ALIAS = true;
            graphics.save();
            graphics.update();
          }
        },
        { text: 'OFF',
          action: () => {
            this.aa = 'OFF';
            graphics.A_ALIAS = false;
            graphics.save();
            graphics.update();
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .Settings-Graphics {
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
