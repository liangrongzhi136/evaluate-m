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
              <img :src="!item.isLike?require('../assets/img/xx.png'):require('../assets/img/xx_ed.png')" class="xx_img">
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
      { id: 1, val: '≤5', isLike: false },
      { id: 2, val: '6', isLike: false },
      { id: 3, val: '7', isLike: false },
      { id: 4, val: '8', isLike: false },
      { id: 5, val: '9', isLike: false }
    ])
    const startNum = ref(0)
    function tap (index) {
      const total = btnArr.length
      const idx = index + 1
      // 判断
      if (startNum.value === 0) {
        startNum.value = idx
        for (let i = 0; i < idx; i++) {
          btnArr[i].isLike = true
        }
      } else {
        // 如果再次点击当前选中的星级-仅取消掉当前星级，保留之前的
        if (idx === startNum.value) {
          for (let i = index; i < total; i++) {
            btnArr[i].isLike = false
          }
        }
        // 如果小于当前最高星级，则直接保留当前星级
        if (idx < startNum.value) {
          for (let i = idx; i < startNum.value; i++) {
            btnArr[i].isLike = false
          }
        }
        // 如果大于当前星级，则直接选到该星级
        if (idx > startNum.value) {
          for (let i = 0; i < idx; i++) {
            btnArr[i].isLike = true
          }
        }
        const count = ref(0)
        for (let i = 0; i < total; i++) {
          if (btnArr[i].isLike) {
            count.value++
          }
        }
        startNum.value = count.value
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
      startNum,
      isShare,
      showShare,
      close,
      tap
    }
  }
}
</script>
<style lang="scss" scoped>
.home{
  min-height: 100vh;
  .index_img{
    width: 100vw;
    height: 100vh;
  }
}
@keyframes bigger{
  0% {
    transform:scale(1)
  }
  50% {
    transform:scale(1.2)
  }
  100% {
    transform:scale(1)
  }
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
    padding-top: 320px;
    min-height: 100vh;
    .top_cont{
      display: flex;
      justify-content: space-between;
      width: 100%;
      position: fixed;
      z-index: 10001;
      background-color: #000;
      left: 0;
      top: 0;
      right: 0;
      padding: 8px 0 18px;
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
          color: #3C485C;
          font-size: 24px;
          font-weight: 600;
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
          animation: bigger 1s;
        }
        span{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          color: #3C485C;
          font-weight: 600;
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
      margin: 0 auto 50px;
    }
  }
}
</style>
