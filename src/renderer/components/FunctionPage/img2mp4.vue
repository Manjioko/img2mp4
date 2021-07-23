<template>
  <div id="img2mp4">
    <div class="goToHome" @click="goToHome">
      <p>返回首页</p>
    </div>
    <div class="img2mp4Content">
      <div ref="select_frame" class="imgframeClass" >
        <div class="dragTipClass" v-if="showImgMsg">
          +
        </div>
        <div class="dragTipClass" v-if="!showImgMsg">
          <span>...</span>
        </div>
      </div>
    </div>
    <div class="setting">
      <div class="videoSetting">
        <span style="margin-left:25%">
          <span class="tipMsg">视频时长</span>
          <span class="plus" @click="plusTime">+</span>
          <span class="timeShow">{{ videoTime }}</span>
          <span class="down" @click="downTime">-</span>
        </span>

        <span style="margin-left:30px">
          <span class="tipMsg">帧幅</span>
          <span class="plus" @click="plusFrame">+</span>
          <span class="timeShow">{{ frame }}</span>
          <span class="down" @click="downFrame">-</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ffm from "../../../utils/ffmpeg_invoke";
const ffmpeg = new ffm();
// import ffmpegStatic from "ffmpeg-static";
// var ffmpegPath = ffmpegStatic.path;
export default {
  name: "img2mp4",
  components: {},
  data() {
    return {
      videoTime: 10,
      frame: 1,
    };
  },
  computed: {
    showImgMsg: function () {
      return this.$store.state.Counter.showImgMsg;
    },
  },
  methods: {
    goToHome() {
      this.$router.push({ name: "HomePage" });
    },
    plusTime() {
      this.videoTime++;
    },
    downTime() {
      if (this.videoTime > 1) {
        this.videoTime--;
      }
    },
    plusFrame() {
      this.frame++;
    },
    downFrame() {
      if (this.frame > 1) {
        this.frame--;
      }
    },
  },
  mounted: function () {
    // this.$refs.select_frame.ondragleave = (e) => {
    //   e.preventDefault(); // 阻止离开时的浏览器默认行为
    // };
    this.$refs.select_frame.ondrop = (e) => {
      e.preventDefault(); // 阻止拖放后的浏览器默认行为
      const data = e.dataTransfer.files; // 获取文件对象
      console.log(e.dataTransfer.files);
      // console.log(data.type == "image/jpeg" || data.type == "image/png");
      // if (data.type == "image/jpeg" || data.type == "image/png") {
      for (const elem of data) {
        // console.log(elem.path)
        if (elem.type.includes("image"))
          ffmpeg.img2mp4(elem.path,this.videoTime,this.frame);
      }
      // }
    };
    // this.$refs.select_frame.ondragenter = (e) => {
    //   e.preventDefault(); // 阻止拖入时的浏览器默认行为
    //   // this.$refs.select_frame.border = "2px dashed red";
    // };
    // this.$refs.select_frame.ondragover = (e) => {
    //   e.preventDefault(); // 阻止拖来拖去的浏览器默认行为
    // };

  },
};
</script>

<style>
.img2mp4Content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
.imgframeClass {
  /* width: 375px;
  height: 260px;
  background-color: rgb(130, 199, 195);
  border-radius: 10px;
  box-shadow: 3px 3px 5px gray;
  user-select: none; */
  width: 200px;
  height: 200px;
  border-radius: 10px;
  border: 5px dashed rgb(211, 206, 206);
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.imgframeClass:hover {
  border: 4px dashed rgb(75, 158, 197);
}
.dragTipClass {
  /* padding-top: 26%;
  font-size: 50px;
  color: white; */
  font-size: 50px;
  color: rgb(209, 203, 203);
}
/* .dragTipClass:hover {
  color: rgb(75, 158, 197);
} */
.goToHome {
  height: 20px;
  width: 70px;
  font-size: 12px;
  color: rgb(170, 167, 167);
  cursor: pointer;
}
.plus {
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  user-select: none;
}
.plus:hover {
  color: aquamarine;
}
.down {
  padding: 10px;
  font-size: 30px;
  cursor: pointer;
  user-select: none;
}
.down:hover {
  color: aquamarine;
}
.tipMsg {
  font-size: 13px;
  color: rgb(138, 124, 124);
}
.timeShow {
  user-select: none;
  color: rgb(180, 175, 175);
}
</style>
