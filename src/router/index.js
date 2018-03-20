import Vue from 'vue'
import Router from 'vue-router'
// 登陆页面
import Login from 'components/Login/index'
// 首页
import Home from 'components/Home/index'
// 测试
import Test from 'components/Test/index'

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
      path: '/login',
      name: '登录',
      component: Login
    },
    {
      path: '/test',
      name: '测试',
      component: Test
    }
  ]
})
