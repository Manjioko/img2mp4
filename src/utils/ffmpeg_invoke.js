const path = require('path');
const { spawn, exec } = window.require("child_process");
import store from '../renderer/store/index.js';

// let ffmpegPath = ffmpegStatic.path;
// ffmpeg.setFfmpegPath(ffmpegPath);

var ffmpeg_path = ''
if (!__dirname.includes('.asar')) { // If dev
  // import ffmpegStatic from "ffmpeg-static";
  ffmpeg_path = require('ffmpeg-static');
} else { // if compiled
  let ext = ''
  if (process.platform === 'win32') ext = '.exe' // if windows
  ffmpeg_path = path.join(process.resourcesPath + '/ffmpeg' + ext)
}

// let that = this;
class ffmpegHandleClass {
  constructor() {
    this.handle = function(dataArr) {
      store.commit('HundleWork',false);
      let ff = spawn(ffmpeg_path, [...dataArr]);
        ff.stdout.on("data", (data) => {
          console.log(`stdout: ${data}`);
        });
  
        ff.stderr.on("data", (data) => {
          // console.error(`stderr: ${data}`);
          let msg = data.toString();
          if(msg.includes("Input") || msg.includes("Output"))
            console.log(msg);
        });
  
        ff.on("close", (code) => {
          console.log(`子进程退出，退出码 ${code}`);
          store.commit('HundleWork',true);
        });
  
    }
  }
  
  // 点击剪切视频后触发该函数
  img2mp4(videoPath,time,frame) {
    let dataArr = ["-r",frame,"-f","image2","-loop","1","-i",videoPath,"-t",time,videoPath + "_cov.mp4","-y"];
    this.handle(dataArr);
  }

  // 图片转换格式
  imgConvert(imgPath,convertFormat) {
    // console.log(imgPath,convertFormat)
    let dataArr = ["-i",imgPath,imgPath+"_image_convert."+convertFormat,"-y"];
    this.handle(dataArr);
  }
  videoConvert(videoPath,convertFormat) {
    let dataArr
    if(convertFormat == "gif") {
      console.log("ddddd")
      dataArr = ["-i",videoPath,"-r","10",videoPath+"_video_convert."+convertFormat,"-y"];
    } else {
      dataArr = ["-i",videoPath,videoPath+"_video_convert."+convertFormat,"-y"];
    }
    this.handle(dataArr);
  }
}

export default ffmpegHandleClass;