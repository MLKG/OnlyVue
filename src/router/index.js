import Vue from 'vue'
import Router from 'vue-router'
import Login from 'components/Login/index'
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
      component: Home
    },
    {
      path: '/Login',
      name: '登录',
      component: Login
    }
  ]
})
