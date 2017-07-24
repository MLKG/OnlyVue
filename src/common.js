// 引入
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.options.emulateJSON = true
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

// 接口请求URL
let vuePrototype = Vue.prototype
let httpOrigin = window.location.origin
let httpPathName = window.location.pathname.replace('vue/', '')
let httpUrl = 'https://wwww.puyitou.com/wechat/'
vuePrototype.systemUrl = 'https://www.puyitou.com/'    // systemUrl

if (httpOrigin.indexOf('localhost:8080') > -1 || httpOrigin.indexOf('localhost:8081') > -1) { // 本地调试URL
  httpUrl = 'http://localhost:8080/api/'
  // systemUrl
  vuePrototype.systemUrl = 'https://www.puyitou.com/'
} else if (httpOrigin.indexOf('test2016.puyitou.com') > -1) {  // 58环境
  httpUrl = 'http://test2016.puyitou.com/wechat/'
  // systemUrl
  vuePrototype.systemUrl = 'http://10.88.2.58:1337/'
} else if (httpOrigin.indexOf('t.puyitou.com') > -1) {  // 同构环境
  httpUrl = 'http://t.puyitou.com/wechat/'
  // systemUrl
  vuePrototype.systemUrl = 'http://139.199.148.127:1337/'
} else if (httpOrigin.indexOf('10.88.2.61') > -1) {
  httpUrl = 'http://10.88.2.61/wechat/'
  // systemUrl
  vuePrototype.systemUrl = 'http://10.88.2.61:1337/'
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
      // if (response.body.EXCEPTION) {
      //   console.log('%c ' + json.SERVERID + '接口报错：', 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:16px;color:#ff0600;')
      //   console.log(response.body.EXCEPTION)
      // }
      if (response.body.SESSION_TIMEOUT) {
        window.location.href = httpOrigin + httpPathName + '#/login'
      } else {
        // console.log('%c ' + json.SERVERID + '：', 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size:16px;color:#ff0600;')
        // console.log(response.body.RETURN)
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

// 存储Cookie
vuePrototype._setCookie = function (name, value, iDay, iMinutes) {
  let oDate = new Date()

  if (!iDay && !iMinutes) {
    document.cookie = name + '=' + value
    return
  } else if (iDay) {
    oDate.setDate(oDate.getDate() + iDay)
  } else if (iMinutes) {
    oDate.setMinutes(oDate.getMinutes() + iMinutes)
  }
  document.cookie = name + '=' + value + ';expires=' + oDate
}
// 获取Cookie
vuePrototype._getCookie = function (name) {
  let aCookie = document.cookie.split('; ')
  let i

  for (i = 0; i < aCookie.length; i++) {
    let aCookie2 = aCookie[i].split('=')

    if (aCookie2[0] === name) {
      return aCookie2[1]
    }
  }
  return null
}
// 移除Cookie
vuePrototype._removeCookie = function (name) {
  this._setCookie(name, '', -1)
  return ''
}

// 获取滚动条当前的位置
vuePrototype._getScrollTop = function () {
  let scrollTop = 0
  if (document.documentElement && document.documentElement.scrollTop) {   // 判断浏览器支持
    scrollTop = document.documentElement.scrollTop  // 拿到高度赋值给高度变量
  } else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}

// 获取当前可是视范围的高度
vuePrototype._getClientHeight = function () {
  let clientHeight = 0 // 定义可视范围变量
  if (document.body.clientHeight && document.documentElement.clientHeight) {   // 判断浏览器支持类型
    clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)  // 给可视范围变量赋值
  } else {
    clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
  }
  return clientHeight
}

// 获取文档完整的高度
vuePrototype._getScrollHeight = function () {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}

vuePrototype._showMessage = function (msg) {
  this.$emit('setMessage', msg)
}
