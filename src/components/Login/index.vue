<template>
  <div>
    <button @click="login">登录</button>
    <br/>
    <br/>
    <button @click="loginOut">注销</button>
    <br/>
    <br/>
    <button @click="getData">查看</button>
    <br/>
    <p>{{result}}</p>
  </div>
</template>

<script>
  export default {
    name: 'User',
    data () {
      return {
        result: ''
      }
    },
    methods: {
      login () {
        let param = {
          SERVERID: '3000001',
          LOGIN_INFO: '15818150000',
          LOGPWD: 'pyt000000'
        }
        this._post(this, param, (response) => {
          if (response.FLAG === 'T') {
            console.log('登录成功')
            window._userInfoData = null
            window.history.go(-1)
          } else {
            console.log('登录失败')
          }
        }, 'login.do')
      },
      loginOut () {
        this._removeCookie('JSESSIONID')
        this._removeCookie('PJSESSIONID')
        window._userInfoData = null
        console.log('注销成功')
      },
      getData () {
        this._getUserInfo(this, (data) => {
          this.result = data
        })
      }
    }
  }
</script>
