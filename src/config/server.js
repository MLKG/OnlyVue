// 引入
import Vue from 'vue'
import router from '../router'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.emulateJSON = true
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

// 接口请求URL
let vuePrototype = Vue.prototype
let httpOrigin = window.location.origin
let httpUrl = 'https://wwww.puyitou.com/wechat/'
vuePrototype.systemUrl = 'https://www.puyitou.com/'    // systemUrl

if (httpOrigin.indexOf('localhost:8888') > -1) { // 本地调试URL
  httpUrl = 'http://localhost:8888/api/'
  // systemUrl
  vuePrototype.systemUrl = 'https://www.puyitou.com/'
}

// 存储用户信息
window._userInfoData = null

Vue.http.interceptors.push((request, next) => {
  // 解决跨域传递cookie问题
  // request.credentials = true

  // emulateJSON为true时设置字符编码
  let body = request.body
  if (body) {
    let array = []
    for (var key in body) {
      array.push(key + '=' + body[key])
    }
    request.body = array.join('&')
  }
  next()
})

// 通用的接口请求
vuePrototype._post = function (vm, json, callback, way = 'service.do') {
  if (vm instanceof Vue !== true) {
    return
  }

  vm.$http.post(httpUrl + way, json).then(function (response) {
    if (typeof callback === 'function') {
      if (response.body.SESSION_TIMEOUT) {
        router.push('/login')
      } else {
        callback(response.body.RETURN)
      }
    }
  })
}

vuePrototype._initWeixin = function (vm, callback) {
  if (vm instanceof Vue !== true) {
    return
  }
  vm.$http.post(httpUrl + 'weixin/initShare.do', {URL: location.href.split('#')[0]}).then(function (response) {
    if (typeof callback === 'function') {
      callback(response.body)
    }
  })
}

// 获取用户信息
vuePrototype._getUserInfo = function (vm, callback) {
  if (vm instanceof Vue !== true) {
    return
  }
  if (window._userInfoData) {
    typeof callback === 'function' && callback(window._userInfoData)
  } else {
    vm.$http.post(httpUrl + 'service.do', {SERVERID: '999999', KEY: 'Y'}, {emulateJSON: true}).then(function (response) {
      if (typeof callback === 'function') {
        let userInfo = response.body.RETURN
        let newData = {}
        if (userInfo && userInfo.STATUS !== '4') {
          newData.isNotLogin = false   // 已登录
          if (userInfo.REALNAME) {
            newData.userNameTitle = userInfo.REALNAME
          } else if (userInfo.USER_NAME) {
            newData.userNameTitle = userInfo.USER_NAME
          } else {
            newData.userNameTitle = userInfo.PHONENUM  // 显示的用户名称
          }
          newData.userBankNo = userInfo.BANK_NO   // 用户银行卡卡号
          newData.bankName = userInfo.BANK_NAME    // 银行名称
          newData.bankSimpleName = userInfo.BANK_SIMPLE_NAME // 银行简称
          newData.userIdCardNo = userInfo.IDCARD_NO  // 用户身份证号
          newData.userPhoneNo = userInfo.PHONENUM   // 用户绑定手机号
          newData.loginName = userInfo.LOGIN_NAME   // 用户登录手机号
          newData.realPhoneNo = userInfo.REALPHONENUM  // 绑定的真实手机号
          newData.openBank = userInfo.OPEN_BANK      // 开户行
          newData.openBankCity = userInfo.OPEN_BANK_CITY   // 开户城市
          newData.openBankProvince = userInfo.OPEN_BANK_PROVINCE  // 开户省份
          newData.realName = userInfo.REALNAME          // 用户真实姓名
          newData.shopManager = userInfo.SHOP_MANAGER   // 是否为店长  0 是店长  1 非店长
          newData.transPassword = userInfo.TRANS_PASSWORD  // 交易密码
          newData.userId = userInfo.USER_ID       // 用户ID
          newData.userIdForActivity = userInfo.USER_RCODE  // 用户加密ID
          newData.riskType = userInfo.FUND_RESK // 基金的风险等级
        } else {
          newData.isNotLogin = true   // 未登录
          newData.MSG = userInfo.MSG
        }
        window._userInfoData = newData
        callback(newData)
      }
    })
  }
}
