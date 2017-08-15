import Vue from 'vue'
import Router from 'vue-router'
// 登陆页面
import Login from 'components/Login/index'
// 风格指南
import Javascript from 'components/Javascript/index'
// 首页
import Home from 'components/Home/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'Dalin',
      component: Home,
      meta: {
        requiresLogin: false
      }
    },
    {
      path: '/javascript',
      name: 'Javascript',
      component: Javascript
    },
    {
      path: '/Login',
      name: '登录',
      component: Login
    }
  ]
})
