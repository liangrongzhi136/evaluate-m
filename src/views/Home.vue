<template>
  <div class="home">
    <img :src="avatar" class="index_img">
    <div v-if="isShow" class="model_wrap">
      <div class="model_cont">
        <div class="top_cont">
          <img src="../assets/img/logo.png" alt="logo" class="logo">
          <div class="upload_btn" @click="download">立即下载</div>
        </div>
        <div class="head_box">
          <img :src="avatar" class="head_img">
        </div>
        <div class="show_name">{{nickname}}</div>
        <div :class="`evaluate_box ${startNum>0?'evaluate_box_ed':''}`">
          <template v-for="(item, idx) in btnArr" :key="idx">
            <div :class="!item.isLike?'evaluate_btn':'evaluate_btn_ed'" @click="tap(idx)">
              <img :src="!item.isLike?require('../assets/img/xx.png'):require('../assets/img/xx_ed.png')" class="xx_img">
              <span :class="`${nowSpan == idx?'nowspan':''}`">{{item.val}}</span>
            </div>
          </template>
        </div>
        <!-- <div class="to_request_btn" data-clipboard-text="复制内容" @click="showShare">去给Ta打分</div> -->
        <div class="to_request_btn" data-clipboard-text="复制内容" @click="showShare">去给Ta打分</div>
      </div>
    </div>
    <div v-if="isShare" class="share_model_wrap" >
      <img src="../assets/img/share.png" class="share_img">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
// import Clipboard from 'clipboard'
export default {
  components: {
    // Clipboard
  },
  setup () {
    const avatar = ref('')
    const nickname = ref('')
    const isShow = ref(true)
    const isShare = ref(false)
    const isWeixin = navigator.userAgent.indexOf('MicroMessenger') > -1
    const btnArr = reactive([
      { id: 1, val: '≤5', isLike: false },
      { id: 2, val: '6', isLike: false },
      { id: 3, val: '7', isLike: false },
      { id: 4, val: '8', isLike: false },
      { id: 5, val: '9', isLike: false }
    ])
    // 解析url参数
    const router = useRouter()
    avatar.value = router.currentRoute.value.query.avatar
    nickname.value = router.currentRoute.value.query.nickname
    console.log(router.currentRoute.value.query)

    onMounted(() => {
      // console.log('isWeixin!', isWeixin)
      if (isWeixin) {
        isShare.value = !isShare.value
      } else {
        location.href = `signal://user.scorepage?user_id=${router.currentRoute.value.query.userId}`
      }
    })
    const startNum = ref(0)
    const nowSpan = ref(null)
    function tap (index) {
      nowSpan.value = index
      const total = btnArr.length
      const idx = index + 1
      // 判断
      if (startNum.value === 0) {
        startNum.value = idx
        for (let i = 0; i < idx; i++) {
          btnArr[i].isLike = true
        }
      } else {
        for (let i = 0; i < total; i++) {
          btnArr[i].isLike = false
        }
        setTimeout(() => {
          for (let i = 0; i < idx; i++) {
            btnArr[i].isLike = true
          }
        }, 1)
        /**
         * 另一种方式，可以点没了评价状态
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
         */
      }
    }
    function showShare () {
      // isShare.value = !isShare.value
      if (isWeixin) {
        isShare.value = !isShare.value
      } else {
        // const clipboard = new Clipboard('.to_request_btn')
        // clipboard.on('success', (e) => {
        //     console.log('复制成功', e)
        //     // 释放内存
        //     clipboard.destroy()
        // })
        // clipboard.on('error', (e) => {
        //     // 不支持复制
        //     console.log('该浏览器不支持自动复制', e)
        //     // 释放内存
        //     clipboard.destroy()
        // })
        location.href = `signal://user.scorepage?user_id=${router.currentRoute.value.query.userId}`
      }
    }
    function close () {
      isShare.value = !isShare.value
    }
    function download () {
      if (isWeixin) {
        isShare.value = !isShare.value
      } else {
        location.href = 'https://itunes.apple.com/cn/app/id1523591723?mt=8'
      }
    }
    return {
      avatar,
      nickname,
      isShow,
      btnArr,
      startNum,
      isShare,
      nowSpan,
      showShare,
      close,
      download,
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
      text-align: center;
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
          font-weight: 600;
          margin: 0 auto;
          line-height: 104px;
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
          color: transparent;
          font-weight: 600;
          font-size: 24px;
          margin: 0 auto;
          line-height:104px;
          text-align: center;
        }
        span.nowspan{
          color: #3C485C;
        }
      }
    }
    .evaluate_box_ed{
      .evaluate_btn{
        span{
          color: transparent;
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
