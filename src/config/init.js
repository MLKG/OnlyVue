import Vue from 'vue'
import router from '../router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import wx from 'weixin-js-sdk'
// use vue-awesome-swiper
Vue.use(VueAwesomeSwiper)

// 判断是否为微信
let isWechat = /MicroMessenger/i.test(navigator.userAgent.toLowerCase())

document.addEventListener('DOMContentLoaded', function () {
  let width = document.documentElement.clientWidth
  document.documentElement.style.fontSize = width < 1080 ? width / 7.5 + 'px' : '144px'
  document.documentElement.setAttribute('data-dpr', window.devicePixelRatio)

  // 微信分享
  if (isWechat) {
    this._initWeixin(this, function (data) {
      wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        // 分别是分享到朋友圈、分享给朋友、分享到QQ、分享到腾讯微博、分享到QQ空间、隐藏右上角菜单接口、显示右上角菜单接口、批量隐藏功能按钮接口、批量显示功能按钮接口
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
      })
    })

    let apiList = ['onMenuShareTimeline', 'onMenuShareAppMessage']
    apiList.forEach(name => {
      wx[name]({
        title: 'Dalin是最棒的！',
        desc: '世界上最棒的男人的成功之路！',
        imgUrl: '',
        link: window.location.href
      })
    })
  }
})

window.addEventListener('resize', function () {
  let width = document.documentElement.clientWidth
  document.documentElement.style.fontSize = width < 1080 ? width / 7.5 + 'px' : '144px'
})

router.afterEach(function (transition) {
  // console.log(transition.name)
  if (transition.name) {
    document.title = transition.name
  } else {
    document.title = 'Dalin'
  }

  // 微信的默认分享
  if (isWechat) {
    let shareList = ['onMenuShareTimeline', 'onMenuShareAppMessage']
    shareList.forEach(function (value) {
      wx[value]({
        title: transition.name || '普益投，越投越快乐！',            // 分享标题
        desc: '普益投，是普益财富旗下的金融信息科技平台。',              // 分享描述
        imgUrl: '',                              // 分享图标
        link: window.location.href               // 分享链接
      })
    })
  }
})
