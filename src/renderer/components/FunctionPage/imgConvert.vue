<template>
  <div id="imgConvert">
    <div class="goToHome" @click="goToHome">
      <p>返回首页</p>
    </div>
    <div class="img2mp4Content">
      <!-- 左侧内容区 -->
      <div ref="select_frame" ondragstart="return false" class="imgselect">
        <span class="textSetting" v-if="showImgMsg">+</span>
        <span class="textSetting" v-if="!showImgMsg">...</span>
      </div>
      <!-- center  -->
      <div>
        <span
          ><img
            src="../../assets/convert.png"
            alt="Convert to"
            class="convertImg"
        /></span>
      </div>
      <!-- 右侧内容区 -->
      <div>

        <div class="imgCheckBox">
          <span>
          <input type="checkbox" name="jpg" @click="checked($event)" /> JPG
        </span>
        </div>

        <div class="imgCheckBox">
          <span>
          <input type="checkbox" name="jpeg" @click="checked($event)" /> JPEG
        </span>
        </div>

        <div class="imgCheckBox">
          <span>
          <input type="checkbox" name="png" @click="checked($event)" /> PNG
        </span>
        </div>

        <div class="imgCheckBox">
          <span>
          <input type="checkbox" name="bmp" @click="checked($event)" /> BMP
        </span>
        </div>

        <div class="imgCheckBox">
          <span>
          <input type="checkbox" name="webp" @click="checked($event)" /> WEBP
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
  name: "imgConvert",
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
          console.log(dataIndex.type.includes("image"));
          if(dataIndex.type.includes("image"))
            ffmpeg.imgConvert(dataIndex.path,this.imgFormat[formatIndex]);
        }
      }
    };
  },
};
</script>

<style>
.img2mp4Content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 80vh;
}
.imgselect {
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
.imgselect:hover {
  border: 4px dashed rgb(75, 158, 197);
}
.textSetting {
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
.convertImg {
  width: 100px;
  height: 100px;
}
.imgCheckBox {
  margin-top: 20px;
}
</style>
