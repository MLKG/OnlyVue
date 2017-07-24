<template>
  <div>
    <user-search-bar
      @getSuggestList="getSuggestList"
      @getSearchResult="getSearchResult"
      @clearSuggestList="clearSuggestList">
    </user-search-bar>
    <user-search-item :users="users"></user-search-item>
    <div class="user-search-modal" v-show="showModal"></div>
    <div v-if="totalResult > 0">
      <user-search-result :total="totalResult"></user-search-result>
      <common-user-item :users="resultUsers" :is-more="isMore"></common-user-item>
    </div>
    <div v-if="totalResult === 0">
      <user-search-nothing></user-search-nothing>
    </div>
  </div>
</template>

<script>
  import CommonUserItem from '../Common/CommonUserItem'
  import UserSearchBar from './UserSearchBar'
  import UserSearchItem from './UserSearchItem'
  import UserSearchResult from './UserSearchResult'
  import UserSearchNothing from './UserSearchNothing'

  export default {
    data () {
      return {
        page: 1,
        users: [],
        resultUsers: [],
        totalResult: -1,
        keyword: '',
        isMore: false,
        isEnter: false,
        showModal: false
      }
    },
    methods: {
      getSuggestList (keyword) {
        this.keyword = keyword

        if (keyword === '' || this.isEnter) {
          this.showModal = false
          this.isEnter = false
          this.users = []
          return
        }

        this._post(this, {
          SERVERID: '60000013',
          page: 1,
          rows: 5,
          CUST_NAME: keyword
        }, (data) => {
          let users = []
          for (let user of data.rows) {
            let item = {
              name: user.USER_CNAME ? user.USER_CNAME : '- -',
              phone: user.PHONENUM,
              userid: user.USER_ID
            }
            users.push(item)
          }
          this.users = users

          if (data.rows.length && this.resultUsers.length) {
            this.showModal = true
          }
        })
      },
      getSearchResult (page, keyword) {
        this.showModal = false
        this.isEnter = true
        this.page = page
        this.keyword = keyword
        this.users = []

        this._post(this, {
          SERVERID: '60000013',
          page: page,
          rows: 10,
          CUST_NAME: keyword
        }, (data) => {
          this.users = []
          this.totalResult = data.total
          this.isMore = data.rows.length >= 10
          let users = []
          for (let user of data.rows) {
            let item = {
              userLink: 'CusMangent/' + user.USER_ID,
              userName: user.USER_CNAME ? user.USER_CNAME : '- -',
              phoneNum: user.PHONENUM,
              investAmount: user.SUMINVEST,
              idleAmount: user.USEABLE_AMOUNT,
              investDht: user.ZX_SUMAMOUNT,
              investPs: user.PS_SUMAMOUNT
            }

            if (!user.SUMINVEST && !user.USEABLE_AMOUNT && !user.ZX_SUMAMOUNT && !user.PS_SUMAMOUNT) {
              item.isPay = 0
            } else {
              item.isPay = 1
            }
            users.push(item)
          }

          if (this.resultUsers.length) {
            this.resultUsers = this.resultUsers.concat(users)
          } else {
            this.resultUsers = users
          }
        })
      },
      handleScroll () {
        if (this._getScrollTop() + this._getClientHeight() >= this._getScrollHeight()) {
          if (this.isMore) {
            this.getSearchResult(this.page + 1, this.keyword)
          }
        }
      },
      clearSuggestList () {
        this.users = []
        this.showModal = false
      }
    },
    components: {
      CommonUserItem,
      UserSearchBar,
      UserSearchItem,
      UserSearchResult,
      UserSearchNothing
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
  .user-search-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.1;
  }
</style>

