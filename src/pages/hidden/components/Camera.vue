<template>
  <div class="camera_outer">

    <video id="videoCamera" :width="videoWidth" :height="videoHeight" autoplay></video>
    <canvas style="display:none;" id="canvasCamera" :width="videoWidth" :height="videoHeight" ></canvas>

    <div class="t-progress-domo-margin">{{ this.resMsg }}</div>
    <t-progress style="width: 20%" theme="line" :color="{ from: '#0052D9', to: '#00A870' }" :percentage="this.msg" :status="'active'" />
    <t-button theme="default" variant="base" @click="stopNavigator()">关闭摄像头</t-button>

  </div>
</template>
<script>
import {uploadFileOne} from '@utils/api.js';

export default {

  name: "Camera",
  data () {
    return {
      msg:0,// 识别进度值
      resMsg:'',// 识别结果信息
      videoWidth: 200,
      videoHeight: 200,
      imgSrc: '',
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      // ifOpen:false
      timer:null,
      timerNum:0,
    }
  },
  // watch:{
  //   // '$route':'getCompetence'
  // },
  mounted() {
    this.getCompetence();
    this.uploadToSever();
  },

  methods: {
    // 调用权限（打开摄像头功能）
    getCompetence () {
      const _this = this
      this.thisCancas = document.getElementById('canvasCamera')
      this.thisContext = this.thisCancas.getContext('2d')
      this.thisVideo = document.getElementById('videoCamera')
      // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          const getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise((resolve, reject) => {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      const constraints = { audio: false, video: { width: this.videoWidth, height: this.videoHeight, transform: 'scaleX(-1)' } }
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        // 旧的浏览器可能没有srcObject
        if ('srcObject' in _this.thisVideo) {
          _this.thisVideo.srcObject = stream
        } else {
          // 避免在新的浏览器中使用它，因为它正在被弃用。
          _this.thisVideo.src = window.URL.createObjectURL(stream)
        }
        _this.thisVideo.onloadedmetadata = function (e) {
          _this.thisVideo.play()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 绘制图片（拍照功能）

    setImage () {
      this.ifOpen = true
      const _this = this
      // 点击，canvas画图
      _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
      // 获取图片base64链接
      const image = this.thisCancas.toDataURL('image/jpeg')

      // console.log('image',image)
      _this.imgSrc = image
      this.$emit('refreshDataList', this.imgSrc)
      // this.uploadToSever(image)
      const image1 = this.dataURLtoFile(image)
      // this.imageDownload(image)

      return this.dataURLtoFile(image)
      // return image

    },
    // imageDownload(image){
    //   let aLink = document.createElement('a');
    //   aLink.href = image.src;
    //   aLink.download = 'test.png';
    //   document.body.appendChild(aLink);
    //   aLink.click();
    //   document.body.removeChild(aLink)
    //
    // },

    uploadToSever(imgSrc){

      const that = this
      that.timer = setInterval(()=>{

        setTimeout(()=>{
          console.log('status',this.ifOpen)
          const image = this.setImage()
          const uid = localStorage.getItem('uid')
          // const datas = {uid,file:image}
          const formData = new FormData();
          formData.append("uid",uid)
          formData.append("file",image)


          uploadFileOne(formData).then((res=>{
            if (res.data.code==="200"){
              that.msg=res.data.result
              that.resMsg="正在上传中..."
            }
            if (res.data.code==="506")
            {
              that.msg=res.data.result
              that.resMsg="未检测到您的人脸"
            }
            if (res.data.code==="-1")
            {
              that.msg=res.data.result
              that.resMsg="未检测到您的人脸"
            }
            console.log('图片上传',that.timerNum,res,that.msg)
          }))
          // this.$request.post('api/uploadFile',formData).then((res)=>{
          //
          //
          //
          // })

        },0)
      },1*1000)

    },

    // base64转文件
    // dataURLtoFile (dataurl, filename) {
    //   const arr = dataurl.split(',')
    //   const mime = arr[0].match(/:(.*?);/)[1]
    //   const bstr = atob(arr[1])
    //   let n = bstr.length
    //   const u8arr = new Uint8Array(n)
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n)
    //   }
    //   return new File([u8arr], filename, { type: mime })
    // },
    dataURLtoFile (dataurl) {
      const arr = dataurl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], { type: mime })
    },
    // 关闭摄像头

    stopNavigator () {
      // this.ifOpen = false
      if(this.timer){
        clearInterval(this.timer)
        this.timer = null
        this.timerNum = 0
      }
      this.thisVideo.srcObject.getTracks()[0].stop()
    }

  },


}

</script>
<style lang="less" scoped>
  .camera_outer{
    position: relative;
    overflow: hidden;
    /*background: url("../../assets/img/user_0608_04.jpg") no-repeat center;*/
    background-size: 100%;
    video,canvas,.tx_img{
      -moz-transform:scaleX(-1);
      -webkit-transform:scaleX(-1);
      -o-transform:scaleX(-1);
      transform:scaleX(-1);
    }
    video{
      border-radius: 50%;
    }
    img{
      border-radius: 50%;

    }
    .btn_camera{
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      height: 50px;
      background-color: rgba(0,0,0,0.3);
      line-height: 50px;
      text-align: center;
      color: #ffffff;
    }
    .bg_r_img{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
    .img_bg_camera{
      border-radius: 50%;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      img{
        /*width: 100%;*/  //注释掉的
        height: 100%;
        margin-left: 500px; //另外加的
      }
      .img_btn_camera{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background-color: rgba(0,0,0,0.3);
        color: #ffffff;
        .loding_img{
          width: 50px;
          height: 50px;
        }
      }
    }
  }
</style>
