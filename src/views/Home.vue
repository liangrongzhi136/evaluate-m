<template>
  <div class="home">
    <img src="../assets/img/p.jpg" class="index_img">
    <div v-if="isShow" class="model_wrap">
      <div class="model_cont">
        <div class="top_cont">
          <img src="../assets/img/logo.png" alt="logo" class="logo">
          <div class="upload_btn">立即下载</div>
        </div>
        <div class="head_box">
          <img src="../assets/img/p.jpg" class="head_img">
        </div>
        <div class="show_name">雷霆佳佳小姐和打爷爷的组合</div>
        <div class="evaluate_box">
          <template v-for="(item, idx) in btnArr" :key="idx">
            <div :class="!item.isLike?'evaluate_btn':'evaluate_btn_ed'" @click="tap(idx)">
              <img :src="item.url" class="xx_img">
              <span>{{item.val}}</span>
            </div>
          </template>
        </div>
        <div class="to_request_btn" @click="showShare">去给Ta打分</div>
      </div>
    </div>
    <div v-if="isShare" class="share_model_wrap" @click="close">
      <img src="../assets/img/share.png" class="share_img">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive, ref } from 'vue'
export default {
  setup () {
    const isShow = ref(true)
    const isShare = ref(false)
    const btnArr = reactive([
      { id: 1, val: '5', isLike: false, url: require('../assets/img/xx.png') },
      { id: 2, val: '6', isLike: false, url: require('../assets/img/xx.png') },
      { id: 3, val: '7', isLike: false, url: require('../assets/img/xx.png') },
      { id: 4, val: '8', isLike: false, url: require('../assets/img/xx.png') },
      { id: 5, val: '9', isLike: false, url: require('../assets/img/xx.png') }
    ])
    function tap (i) {
      console.log(i)
      btnArr[i].isLike = !btnArr[i].isLike
      if (btnArr[i].isLike) {
        btnArr[i].url = require('../assets/img/xx_ed.png')
      } else {
        btnArr[i].url = require('../assets/img/xx.png')
      }
    }
    function showShare () {
      isShare.value = !isShare.value
    }
    function close () {
      isShare.value = !isShare.value
    }
    return {
      isShow,
      btnArr,
      isShare,
      showShare,
      close,
      tap
    }
  }
}
</script>
<style lang="scss" scoped>
.index_img{
  width: 100%;
  height: 100%;
}
.share_model_wrap{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10010;
  background: rgba(0, 0, 0, .82);
  filter: blur(0px);
  overflow: hidden;
  .share_img{
    margin: 38px 80px 0 0;
    width: 434px;
    height: 136px;
    float: right;
  }
}
.model_wrap{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  background: rgba(0, 0, 0, .82);
  filter: blur(0px);
  .model_cont{
    padding-top: 8px;
    min-height: 100vh;
    .top_cont{
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 228px;
      .upload_btn{
        width: 206px;
        height: 72px;
        background: #FD4428;
        border-radius: 46px;
        margin: 12px 40px 0 0;
        font-size: 32px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 72px;
        text-align: center;
      }
      .logo{
        width: 210px;
        height: 84px;
        margin-left: 28px;
      }
    }
    .head_box{
      width: 400px;
      height: 400px;
      border-radius: 428px;
      border: 4px solid #FFFFFF;
      margin: 0 auto;
      background: #FFFFFF;
      overflow: hidden;
      .head_img{
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .show_name{
      width: 534px;
      height: 84px;
      font-size: 60px;
      font-weight: bold;
      color: #FFFFFF;
      line-height: 84px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 38px auto 196px;
    }
    .evaluate_box{
      width: 590px;
      height: 94px;
      margin: 0 auto 60px;
      display: flex;
      justify-content: space-between;
      .evaluate_btn{
        width: 94px;
        height: 94px;
        position: relative;
        font-size: 0;
        .xx_img{
          width: 94px;
          height: 94px;
        }
        span{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          color: #FFFFFF;
          font-size: 24px;
          margin: 0 auto;
          line-height: 96px;
          text-align: center;
        }
      }
      .evaluate_btn_ed{
        width: 94px;
        height: 94px;
        position: relative;
        font-size: 0;
        .xx_img{
          width: 94px;
          height: 94px;
        }
        span{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          color: #000;
          font-size: 24px;
          margin: 0 auto;
          line-height: 96px;
          text-align: center;
        }
      }
    }
    .to_request_btn{
      width: 590px;
      height: 96px;
      background: #FD4428;
      border-radius: 10px;
      font-size: 32px;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 96px;
      text-align: center;
      margin: 0 auto 30px;
    }
  }
}
</style>
