<template>
  <div id="imgConvert">
    <div class="goToHome" @click="goToHome">
      <p>返回首页</p>
    </div>
    <div class="img2mp4Content">
    <!--左侧内容区  -->
      <div ref="select_frame" ondragstart="return false" class="vidoSelect">
        <span class="videoTextSetting" v-if="showImgMsg">+</span>
        <span class="videoTextSetting" v-if="!showImgMsg">...</span>
      </div>
      <!-- center  -->
      <div>
        <span
          ><img
            src="../../assets/convert.png"
            alt="Convert to"
            class="convertVideo"
        /></span>
      </div>
      <!-- 右侧内容区 -->
      <div>

        <div class="videoCheckBox">
          <span>
          <input type="checkbox" name="mp4" @click="checked($event)" /> MP4
        </span>
        </div>

        <div class="videoCheckBox">
          <span>
          <input type="checkbox" name="gif" @click="checked($event)" /> GIF
        </span>
        </div>

        <div class="videoCheckBox">
          <span>
          <input type="checkbox" name="webm" @click="checked($event)" /> WEBM
        </span>
        </div>

        <div class="videoCheckBox">
          <span>
          <input type="checkbox" name="mov" @click="checked($event)" /> MOV
        </span>
        </div>

        <div class="videoCheckBox">
          <span>
          <input type="checkbox" name="avi" @click="checked($event)" /> AVI
        </span>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import ffm from "../../../utils/ffmpeg_invoke";
const ffmpeg = new ffm();
export default {
  name: "videoConvert",
  components: {},
  data() {
    return {
      imgFormat: []
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
    checked(e) {
      if(e.target.checked) {
        this.imgFormat.push(e.target.name)
      } else {
        let index = this.imgFormat.indexOf(e.target.name);
        index > -1 ? this.imgFormat.splice(index,1) : '';
      }
    }
  },
  mounted: function () {
    this.$refs.select_frame.ondrop = (e) => {
      e.preventDefault(); // 阻止拖放后的浏览器默认行为
      const data = e.dataTransfer.files; // 获取文件对象
      // console.log(e.dataTransfer.files);
      for (let formatIndex = 0; formatIndex < this.imgFormat.length; formatIndex++) {
        for (const dataIndex of data) {
          console.log(dataIndex.type.includes("video"));
          if(dataIndex.type.includes("video"))
            ffmpeg.videoConvert(dataIndex.path,this.imgFormat[formatIndex]);
        }
      }
    };
  },
};
</script>

<style>
.videoConvert4Content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 80vh;
}
.vidoSelect:hover {
  border: 4px dashed rgb(75, 158, 197);
}
.vidoSelect {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  border: 5px dashed rgb(211, 206, 206);
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.videoTextSetting {
  /* padding-top: 26%; */
  font-size: 50px;
  color: rgb(209, 203, 203);
}
.goToHome {
  height: 20px;
  width: 70px;
  font-size: 12px;
  color: rgb(170, 167, 167);
  cursor: pointer;
}
.convertVideo {
  width: 100px;
  height: 100px;
}
.videoCheckBox {
  margin-top: 20px;
}
</style>
