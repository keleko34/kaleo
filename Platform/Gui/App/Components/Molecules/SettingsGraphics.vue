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
      /* Initial dropdown values fetched from the graphics settings */
      win: (graphics.W_MODE === 0 ? 'Windowed' : (graphics.W_MODE === 1 ? 'Fullscreen' : 'Windowed Fullscreen')),
      res: `${graphics.R_WIDTH}x${graphics.R_HEIGHT}`,
      aa: (graphics.A_ALIAS ? 'ON' : 'OFF'),
      
      /* Window mode dropdown choices */
      windowModes: [
        {
          text: 'Windowed',
          action: () => {
            /* Set settings and save to json */
            this.win = 'Windowed';
            graphics.W_MODE = 0;
            graphics.save();
            
            /* unlock the window, undo fullscreen and restore window to original location */
            this.$alert('lock', false);
            this.$alert('togglefullscreen', false);
            this.$alert('restore');
          }
        },
        {
          text: 'Windowed Fullscreen',
          action: () => {
            /* Set settings and save to json */
            this.win = 'Windowed Fullscreen';
            graphics.W_MODE = 2;
            graphics.save();
            
            /* maximize and lock window in place */
            this.$alert('lock', false);
            this.$alert('togglefullscreen', false);
            this.$alert('maximize', true);
            this.$alert('lock', true);
          }
        },
        {
          text: 'Fullscreen',
          action: () => {
            /* Set settings and save to json */
            this.win = 'Fullscreen';
            graphics.W_MODE = 1;
            graphics.save();
            
            /* fullscreen canvas and lock window in place */
            this.$alert('lock', false);
            this.$alert('togglefullscreen', true);
            this.$alert('lock', true);
          }
        }
      ],
      
      /* Resolution dropdown choices, mapped from graphics settings resolution list */
      resolutions: graphics.R_LIST.map(v => {
        v.text = `${v.w}x${v.h}`;
        v.action = () => {
          /* Set settings and save to json */
          this.res = `${v.w}x${v.h}`;
          graphics.R_WIDTH = v.w;
          graphics.R_HEIGHT = v.h;
          graphics.save();
          
          /* update engine and application with new resolution */
          this.$alert('resolution', [v.w, v.h]);
          graphics.update();
        }
        return v;
      }),
      
      /* Anti Aliasing dropdown choices */
      antialiasing: [
        { text: 'ON',
          action: () => {
            /* Set settings and save to json */
            this.aa = 'ON';
            graphics.A_ALIAS = true;
            graphics.save();
            
            /* update engine */
            graphics.update();
          }
        },
        { text: 'OFF',
          action: () => {
            /* Set settings and save to json */
            this.aa = 'OFF';
            graphics.A_ALIAS = false;
            graphics.save();
            
            /* update engine */
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
