import Vue from 'vue'
import Router from 'vue-router'
// import Login from 'components/Login/index'
import Home from 'components/Home/index'
// import Customer from 'components/Customer/index'
// import IncomeManage from 'components/IncomeManage/index'
// import IncomeDHTDetail from 'components/IncomeManage/IncomeDHTDetail'
// import IncomePSDetail from 'components/IncomeManage/IncomePSDetail'
// import CusMangent from 'components/CusMangent/index'
// import Ranking from 'components/Ranking/index'
// import UserSearch from 'components/UserSearch/index'
// import ZhanyeCenter from 'components/ZhanyeCenter/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: '我的网店',
      component: Home
    }
    // ,
    // {
    //   path: '/Login',
    //   name: '登录',
    //   component: Login
    // },
    // {
    //   path: '/Customer',
    //   name: '客户管理',
    //   component: Customer
    // },
    // {
    //   path: '/IncomeManage',
    //   name: '收入管理',
    //   component: IncomeManage
    // },
    // {
    //   path: '/IncomeDHTDetail',
    //   name: '广金定活通收入详情',
    //   component: IncomeDHTDetail
    // },
    // {
    //   path: '/IncomePSDetail',
    //   name: '广金磐石收入详情',
    //   component: IncomePSDetail
    // },
    // {
    //   path: '/CusMangent/:userId',
    //   name: '客户详情',
    //   component: CusMangent
    // },
    // {
    //   path: '/Ranking',
    //   name: '排行榜',
    //   component: Ranking
    // },
    // {
    //   path: '/UserSearch',
    //   name: '查找客户',
    //   component: UserSearch
    // },
    // {
    //   path: '/ZhanyeCenter/:fromWhere',
    //   name: '展业中心',
    //   component: ZhanyeCenter
    // },
    // {
    //   path: '/',
    //   component: Home
    // }
  ]
})
