<template>
  <div class="home-header">
    <div class="home-header__table">
      <div class="home-header__table_name">欢迎回来，{{userNameTitle}}</div>
      <div class="home-header__table_address">所在机构 {{userAddress}}</div>
    </div>
    <div class="home-header__income">
      <div class="home-header__income_item" v-if="userMonth !== 0">
        <div><span class="home-header__income_month">{{userMonth}}月</span>佣金收入</div>
        <div class="home-header__income_money"><span class="font-size-big">&yen;</span>{{userMonthTotal | currency}}</div>
      </div>
      <div class="home-header__income_item" v-else>
        <div class="home-header__income_none">暂无收入</div>
      </div>
      <div class="home-header__income_item">
        <div>本月新增投资客户</div>
        <div class="home-header__income_money">{{userAddCustomer}}</div>
      </div>
    </div>
    <div class="home-header__income">
      <div class="home-header__income_item">
        <div>广金定活通新增投资额</div>
        <div class="home-header__income_add">&yen;{{userZXAmount | currency}}</div>
      </div>
      <div class="home-header__income_item">
        <div>广金磐石新增投资额</div>
        <div class="home-header__income_add">&yen;{{userPSAmount | currency}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        userNameTitle: '曾桂林',
        userAddress: '江西赣州',
        userAddCustomer: '100',
        userMonth: '6',
        userMonthTotal: '666',
        userZXAmount: '5218',
        userPSAmount: '521818'
      }
    },
    mounted () {
      // // 获取用户信息
      // this._getUserInfo(this, (response) => {
      //   this.userNameTitle = response.userNameTitle  // 用户姓名
      // })

      // // 获取机构及新增投资客户数
      // this._post(this, {SERVERID: 60000012}, (response) => {
      //   this.userAddress = response.result.MECHANISM  // 获取机构
      //   this.userAddCustomer = response.result.INVEST_COUNT_MONTH   // 本月新增投资客户数
      // })

      // // 新增投资额
      // this._post(this, {SERVERID: 60000015}, (response) => {
      //   this.userMonth = response.result.MONTH // response.result.COMMISSON_MONTH        // 获取新增投资额
      //   this.userMonthTotal = response.result.COMMISSON_MONTH        // 本月佣金收入
      //   this.userZXAmount = response.result.ZX_INVEST_INFO.INVEST_AMOUNT_ZX_MONTH       // 定活通新增投资额
      //   this.userPSAmount = response.result.PS_INVEST_INFO.INVEST_AMOUNT_PS_MONTH       // 磐石新增投资额
      // })
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .home-header {
    background-color: @bg-red;
    color: @font-color-white;
    padding: 1.2rem 1rem 0;
    position: relative;
    z-index: 1;

    &__table {
      display: table;
      width: 100%;
      border-bottom: 1px solid @font-color-white;
      padding-bottom: 1.2rem;
      font-size: @font-size-litter;

      &_name {
        display: table-cell;
        width: 50%;
      }

      &_address {
        display: table-cell;
        width: 50%;
        text-align: right;
      }
    }

    &__income {
      display: table;
      width: 100%;
      padding-top: 1.3rem;

      &_item {
        display: table-cell;
        width: 50%;
        position: relative;
      }

      &_month {
        background-color: @bg-white;
        color: @font-color-red;
      }

      &_money {
        font-size: @font-size-bigger;
        padding-top: 0.3rem;
      }

      &_add {
        padding-top: 0.5rem;
        font-size: @font-size-largest;
        padding-bottom: 1.2rem;
      }

      &_none {
        position: absolute;
        top: 1.2rem;
        left: 0;
      }
    }
  }
</style>
