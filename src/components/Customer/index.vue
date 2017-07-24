<template>
  <div>
    <customer-search-filter
    :amount="amount"
    @getCurrentMonthPayUsers="getCurrentMonthPayUsers"
    @getCurrentMonthRegUsers="getCurrentMonthRegUsers"
    @getThirtyExpireUsers="getThirtyExpireUsers"
    @getPastThirtyCashUsers="getPastThirtyCashUsers"
    @getAllUsers="getAllUsers">
  </customer-search-filter>
  <common-user-item
    :type="itemType"
    :users="users"
    :is-more="isMore">
  </common-user-item>
  <common-bottom-nav :current="bottomNav"></common-bottom-nav>
</div>
</template>

<script>
  import CommonBottomNav from '../Common/CommonBottomNav'
  import CommonUserItem from '../Common/CommonUserItem'
  import CustomerSearchFilter from './CustomerSearchFilter'

  export default {
    data () {
      return {
        bottomNav: 'customer',
        users: [],
        page: 1,
        amount: {},
        currentTab: 0,
        isMore: false,
        itemType: 0 // 3
      }
    },
    methods: {
      getAllUsers (page) {
        // 查找全部客户
        this.currentTab = 0
        this.page = page
        this.getUsers(page, 5, (data) => {
          this.isMore = data.users.length >= 10
          this.itemType = 0
          if (page === 1) {
            this.users = data.users
          } else {
            this.users = this.users.concat(data.users)
          }
          this.amount = data.amount
        })
      },
      getCurrentMonthPayUsers (page) {
        // 查找本月新增投资客户
        this.currentTab = 1
        this.page = page
        this.getUsers(page, 2, (data) => {
          this.isMore = data.users.length >= 10
          this.itemType = 0
          if (page === 1) {
            this.users = data.users
          } else {
            this.users = this.users.concat(data.users)
          }
        })
      },
      getCurrentMonthRegUsers (page) {
        // 查找本月新增注册用户
        this.currentTab = 2
        this.page = page
        this.getUsers(page, 1, (data) => {
          this.isMore = data.users.length >= 10
          this.itemType = 0
          if (page === 1) {
            this.users = data.users
          } else {
            this.users = this.users.concat(data.users)
          }
        })
      },
      getThirtyExpireUsers (page) {
        // 查找未来30天到期用户
        this.currentTab = 3
        this.page = page
        this.getUsers(page, 4, (data) => {
          this.isMore = data.users.length >= 10
          this.itemType = 4
          if (page === 1) {
            this.users = data.users
          } else {
            this.users = this.users.concat(data.users)
          }
        })
      },
      getPastThirtyCashUsers (page) {
        // 查找过去30天已兑付或转让用户
        this.currentTab = 4
        this.page = page
        this.getUsers(page, 3, (data) => {
          this.isMore = data.users.length >= 10
          this.itemType = 3
          if (page === 1) {
            this.users = data.users
          } else {
            this.users = this.users.concat(data.users)
          }
        })
      },
      getUsers (page, type, callback) {
        this._post(this, {
          SERVERID: 'SHOP0007',
          TYPE: type,
          rows: 10,
          page: page
        }, (data) => {
          let users = []
          for (let user of data.rows) {
            let item = {
              userLink: 'CusMangent/' + user.USER_ID,
              userName: user.REALNAME ? user.REALNAME : '- -',
              phoneNum: user.PHONENUM,
              investAmount: user.SUMINVEST ? user.SUMINVEST : 0,  // 投资
              idleAmount: user.USEABLE_AMOUNT ? user.USEABLE_AMOUNT : 0,  // 闲置
              investDht: user.ZX_SUMAMOUNT ? user.ZX_SUMAMOUNT : 0, // 定活通
              investPs: user.PS_SUMAMOUNT ? user.PS_SUMAMOUNT : 0, // 磐石
              exchangeAmount: user.DUIHUANAMOUNT ? user.DUIHUANAMOUNT : 0, // 兑付金额
              expireAmount: user.ENDAMOUNT ? user.ENDAMOUNT : 0 // 到期金额
            }

            if (!user.SUMINVEST && !user.USEABLE_AMOUNT && !user.ZX_SUMAMOUNT && !user.PS_SUMAMOUNT) {
              item.isPay = 0
            } else {
              item.isPay = 1
            }
            users.push(item)
          }

          if (typeof callback === 'function') {
            callback({
              users: users,
              amount: {
                total: data.total, // 全部客户数
                invest: data.addInvestCustomerCount,  // 本月新增投资客户数
                regist: data.addRegisterCustomer, // 本月新增注册客户数
                future: data.futureCount, // 未来30天到期客户数
                past: data.pastcount  // 过去30天到期客户数
              }
            })
          }
        })
      },
      handleScroll () {
        if (this._getScrollTop() + this._getClientHeight() >= this._getScrollHeight()) {
          if (this.isMore) {
            let page = this.page + 1
            switch (this.currentTab) {
              case 0:
                this.getAllUsers(page)
                break
              case 1:
                this.getCurrentMonthPayUsers(page)
                break
              case 2:
                this.getCurrentMonthRegUsers(page)
                break
              case 3:
                this.getThirtyExpireUsers(page)
                break
              case 4:
                this.getPastThirtyCashUsers(page)
                break
            }
          }
        }
      }
    },
    components: {
      CommonBottomNav,
      CommonUserItem,
      CustomerSearchFilter
    },
    mounted () {
      // 查找全部客户，第一页数据
      this.getAllUsers(1)
    },
    created () {
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style lang="less">

</style>

