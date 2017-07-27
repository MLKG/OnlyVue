import fetch from './server'

fetch('auth/isLogin').then((res) => {
  let isLogin = res.data.login
  if (isLogin) {
    if (!window.userInfoData) {
      fetch('auth/me').then((res) => {
        window.userInfoData = res.data.user
      })
    }
  } else {
    window.userInfoData = {
      login: false
    }
  }
})
