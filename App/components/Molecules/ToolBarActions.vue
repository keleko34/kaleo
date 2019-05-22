<template>
  <div class="ToolBarActions">
    <tool-bar-dropdown :options="file">File</tool-bar-dropdown>
    <tool-bar-dropdown>Edit</tool-bar-dropdown>
    <tool-bar-dropdown :options="view">View</tool-bar-dropdown>
    <tool-bar-dropdown :options="engine">Engine</tool-bar-dropdown>
    <tool-bar-dropdown>Debug</tool-bar-dropdown>
    <tool-bar-dropdown>Help</tool-bar-dropdown>
  </div>
</template>

<script>
import ToolBarDropdown from 'atoms/ToolBarDropdown'

export default {
  name: 'ToolBarActions',
  components: { ToolBarDropdown },
  data() {
    return {
      file: [
        { text: 'Save Project', action: console.log, key: 'CTRL + S' },
        { text: 'Project Settings', action: console.log },
        { text: 'Exit', action: () => { this.$root.$alert('close'); } }
      ],
      view: [
        { text: 'Fullscreen', action: () => { this.$root.engine.viewport.requestFullscreen(); }, key: 'F11' }
      ],
      engine: [
        { text: 'Pause', action: () => { this.$root.$alert('pause') } },
        { text: 'Play', action: () => { this.$root.$alert('play') } },
        { text: 'Toggle Camera', action: console.log, key: 'F5' },
        { text: 'Toggle Settings', action: console.log, key: 'ESC' },
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
