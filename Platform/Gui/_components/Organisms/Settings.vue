<template>
  <div class="Settings">
    <div class="Settings__Modal">
      <div class="nav-bar">
        <div class="nav-bar__item">Video</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings'
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
      
      .nav-bar {
        width: 20%;
        height: 100%;
        
        &__item {
          margin: 5%;
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
        }
        
        &__item:hover {
          color: #9a9fa2;
          border-bottom-color: #9a9fa2;
        }
      }
    }
  }
</style>
