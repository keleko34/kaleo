<template>
  <div class="ToolBar">
    <tool-bar-logo>Kaleo</tool-bar-logo>
    <tool-bar-actions></tool-bar-actions>
    <div class="ToolBar__project-title">
      {{applicationTitle}}
    </div>
    <tool-bar-window-controls></tool-bar-window-controls>
  </div>
</template>

<script>
import ToolBarLogo from 'molecules/ToolBarLogo'
import ToolBarActions from 'molecules/ToolBarActions'
import ToolBarWindowControls from 'molecules/ToolBarWindowControls'

export default {
  name: 'ToolBar',
  components: { ToolBarLogo, ToolBarActions, ToolBarWindowControls },
  data() {
    /* TODO: get from project settings when that is implemented */
    return {
      applicationTitle: 'Untitled'
    }
  }
}
</script>

<style lang="scss">
  .ToolBar {
    width: 100%;
    height: 26px;
    background: #3c3c3c;
    -webkit-app-region: drag;
    display: flex;
    flex-direction: row;
    position: relative;
    line-height: 26px;
    z-index: 1;
    &__project-title {
      position: absolute;
      width: 100%;
      height: 26px;
      font-family: 'Open Sans';
      color: #bdc2c7;
      font-size: 12px;
      flex: 1 1 100%;
      text-align: center;
      z-index: 0;
      font-weight: 600;
      font-style: italic;
    }
    .ToolBarLogo {
      margin-left: 8px;
      z-index: 1;
    }
    .ToolBarActions {
      margin-left: 8px;
      z-index: 1;
    }
    .ToolBarWindowControls {
      flex: 1 1 100%;
      z-index: 1;
    }
  }
</style>
