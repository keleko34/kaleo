<template>
  <div ref="toolbar" class="ToolBarActions">
    <tool-bar-dropdown :canHover="active" :options="file">File</tool-bar-dropdown>
    <tool-bar-dropdown :canHover="active">Edit</tool-bar-dropdown>
    <tool-bar-dropdown :canHover="active" :options="view">View</tool-bar-dropdown>
    <tool-bar-dropdown :canHover="active" :options="engine">Engine</tool-bar-dropdown>
    <tool-bar-dropdown :canHover="active" :options="debug">Debug</tool-bar-dropdown>
    <tool-bar-dropdown :canHover="active">Help</tool-bar-dropdown>
  </div>
</template>

<script>
import ToolBarDropdown from 'atoms/ToolBarDropdown'

export default {
  name: 'ToolBarActions',
  components: { ToolBarDropdown },
  mounted() {
    /* Prevents the dropdown from just opening on hover without previously being clicked */
    document.addEventListener('click', (e) => {
      if(!this.$refs.toolbar.contains(e.target)) this.active = false;
    })
    
    /* listens for toggling dropdown hover can open state */
    this.$listen('toolbar_active', (toggle) => { this.active = toggle; })
  },
  data() {
    /* dropdown options, console.log means no associated action. just there to look pretty till its implemented :) */
    return {
      active: false,
      file: [
        { text: 'Save Project', action: console.log, key: 'CTRL + S' },
        { text: 'Project Settings', action: console.log },
        { text: 'Exit', action: () => { this.$alert('close'); } }
      ],
      debug: [
        { text: 'Dev Console', action: () => { this.$alert('console'); }, key: 'F12' },
        { text: 'Dev Backend Console', action: () => { this.$alert('console_background'); }, key: 'CTRL + F12' },
        { text: 'Reload', action: () => { this.$alert('reload'); } },
        { text: 'Hard Reload (Clears Cache)', action: () => { this.$alert('hard_reload'); } }
      ],
      view: [
        { text: 'Fullscreen', action: () => { this.$alert('togglefullscreen') }, key: 'F11' }
      ],
      engine: [
        { text: 'Pause', action: () => { this.$alert('stop') } },
        { text: 'Play', action: () => { this.$alert('start') } },
        { text: 'Toggle Camera', action: console.log, key: 'F5' },
        { text: 'Toggle Settings', action: () => { this.$alert('togglesettings') }, key: 'ESC' },
        { text: 'Show Debug Menu', action: console.log, key: 'F3' },
        { text: 'Show Debug Info', action: console.log }
      ]
    }
  }
}
</script>

<style lang="scss">
  .ToolBarActions {
    display: flex;
    flex-direction: row;
    line-height: inherit;
    .ToolBarDropdown {
      -webkit-app-region: no-drag;
      line-height: inherit;
    }
  }
</style>
