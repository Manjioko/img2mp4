<template>
  <div id="Home">
    <div class="list">
      <div class="listCard" @click="goToimg2mp4">
        <p>图片转视频</p>
      </div>
      <div class="listCard" @click="goToimgConvert">
        <p>图片转格式</p>
      </div>
      <div class="listCard" @click="goTovideoConvert">
        <p>视频转格式</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    goToimg2mp4() {
        this.$router.push({name:"img2mp4"})
    },
    goToimgConvert() {
        this.$router.push({name:"imgConvert"})
    },
    goTovideoConvert() {
        this.$router.push({name:"videoConvert"})
    },
  },
  mounted: function () {},
};
</script>

<style>
.list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-start;
  /* align-items: center; */
  height: 95vh;
}
.listCard {
  /* flex布局 */
  width: 100px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 其它设置 */
  margin: 2%;
  background: rgb(56, 189, 230);
  border-radius: 5px;
  color: aliceblue;
  box-shadow: 3px 2px 5px gray;
  user-select: none;
  cursor: pointer;
}
.listCard:hover {
  background: rgb(85, 170, 156);
}
</style>
