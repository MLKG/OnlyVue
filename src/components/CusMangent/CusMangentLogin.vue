<template>
  <div>
    <div class="cus-mangent-login" v-for="login in loginData">
      <div class="cus-mangent-login__item">
        {{login.loginTime}}&nbsp;&nbsp;&nbsp;&nbsp;{{login.loginDate}}
      </div>
      <div class="cus-mangent-login__item text-right">
        <img class="cus-mangent-login__item_way" v-if="login.loginFrom === 'APP'" src="../../assets/images/login-app.png" />
        <img class="cus-mangent-login__item_way" v-if="login.loginFrom === 'PC'" src="../../assets/images/login-pc.png" />
        <img class="cus-mangent-login__item_way" v-if="login.loginFrom === 'WECHAT'" src="../../assets/images/login-wechat.png" />
      </div>
    </div>
    <div class="load-more font-size-litter">{{tip}}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loginData: [],           // 登录信息
        tip: ''                   // 提示信息
      }
    },
    mounted () {
      // 获取用户的登录信息
      this._post(this, {SERVERID: 'SHOP0006', TYPE: 3, rows: 10, page: 1, user_id: this.$route.params.userId}, (response) => {
        // console.log(response)
        let loginLength = response.rows.length
        if (loginLength > 0) {
          this.tip = '以上是该用户近' + loginLength + '次登录情况'
          let users = []
          for (let user of response.rows) {
            let item = {
              loginTime: user.LOGIN_TIME.slice(0, 10),
              loginDate: user.LOGIN_TIME.slice(11, 16)
            }
            if (user.LOGIN_FROM === 'PC') {
              item.loginFrom = 'PC'
            } else if (user.LOGIN_FROM === 'PYT_MOBLIE') {
              item.loginFrom = 'APP'
            } else if (user.LOGIN_FROM === 'PYT_WECHAT') {
              item.loginFrom = 'WECHAT'
            }
            users.push(item)
          }
          this.loginData = users
        } else {
          this.tip = '无最近登录信息'
        }
      })
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .cus-mangent-login {
    display: table;
    width: 100%;
    height: 3.7rem;
    background-color: @bg-white;
    border-bottom: 1px solid @line-color;
    font-size: @font-size-medium;

    &__item {
      display: table-cell;
      width: 50%;
      vertical-align: middle;
      padding: 0 1rem;

      &_way {
        width: 2.8rem;
      }
    }
  }
</style>
