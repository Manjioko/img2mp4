<template>
  <div id="app" ref="app" ondragstart="return false">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'img2mp4',
    mounted: function() {
      this.$refs.app.ondragenter = (e) => {
      e.preventDefault(); // 阻止拖入时的浏览器默认行为
      // this.$refs.select_frame.border = "2px dashed red";
    };
    this.$refs.app.ondragover = (e) => {
      e.preventDefault(); // 阻止拖来拖去的浏览器默认行为
    };
    this.$refs.app.ondragleave = (e) => {
      e.preventDefault(); // 阻止离开时的浏览器默认行为
    };
    this.$refs.app.ondrop = (e) => {
      e.preventDefault(); // 阻止拖放后的浏览器默认行为
      // }
    };
    }
  }
</script>

<style>
  /* CSS */
</style>
