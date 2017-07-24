// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import wx from 'weixin-js-sdk'

require('common')
require('filters')

/* eslint-disable no-new */
let isWechat = /MicroMessenger/i.test(navigator.userAgent.toLowerCase())
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    // 这里做一些初始化 针对微信
    if (isWechat) {
      this._initWeixin(this, function (data) {
        wx.config({
          debug: false,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          // 分别是分享到朋友圈、分享给朋友、分享到QQ、分享到腾讯微博、分享到QQ空间、隐藏右上角菜单接口、显示右上角菜单接口、批量隐藏功能按钮接口、批量显示功能按钮接口
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems']
        })
      })
    }
  }
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
    let shareList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone']
    shareList.forEach(function (value) {
      wx[value]({
        title: transition.name || '普益投，越投越快乐！',            // 分享标题
        desc: '普益投，是普益财富旗下的金融信息科技平台。',              // 分享描述
        imgUrl: window.location.origin + '/wechat/vue/static/images/wechat-share.png',                              // 分享图标
        link: window.location.href               // 分享链接
      })
    })
  }
})
