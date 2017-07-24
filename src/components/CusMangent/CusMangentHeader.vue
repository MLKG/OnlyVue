<template>
  <div>
    <div class="cus-mangent-header" :class="{'cus-mangent-header_gray': unRealImg}">  <!-- cus-mangent-header_gray -->
      <div class="cus-mangent-header_table">
        <div class="cus-mangent-header__info" :class="{'cus-mangent-header__info_gray': unRealImg}">   <!-- cus-mangent-header__info_gray -->
          <div class="cus-mangent-header__info_person" v-if="!unRealImg">
            <div class="cus-mangent-header__info_name">{{realName}}</div>
            <div :class="{'cus-mangent-header__info_man':gender, 'cus-mangent-header__info_women':!gender}"></div>
            <div class="cus-mangent-header__info_age">{{age}}岁</div>
          </div>
          <div class="cus-mangent-header__info_phone">{{phoneNum}}</div>
        </div>
        <div class="cus-mangent-header__real">
          <img class="cus-mangent-header__real_img" v-if="!unRealImg" src="../../assets/images/real.png" />
          <img class="cus-mangent-header__real_img" v-if="unRealImg" src="../../assets/images/unreal.png" />
        </div>
      </div>
    </div>
    <div class="cus-mangent-header__amount" v-if="!unRealImg">
      <div class="font-color-gray">
        本月新增投资额
      </div>
      <div class="font-size-bigger">
        <span class="font-size-big">&yen;</span>{{addPurchaseAmount | currency}}
      </div>
      <div class="cus-mangent-header_table">
        <div class="cus-mangent-header__amount_item">
          <div class="font-color-gray">
            闲置资金
          </div>
          <div class="cus-mangent-header__amount_dollor">
            &yen;{{userAbleAmount | currency}}
          </div>
        </div>
        <div class="cus-mangent-header__amount_item">
          <div class="font-color-gray">
            累计投资额
          </div>
          <div class="cus-mangent-header__amount_dollor">
            &yen;{{investSum | currency}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        unRealImg: true,       // 是否实名认证
        realName: '',          // 姓名
        gender: true,          // 是男是女
        age: '',                 // 用户年龄
        phoneNum: '',                 // 手机
        addPurchaseAmount: '',                 // 本月新增投资额
        investSum: '',                 // 累计投资额
        userAbleAmount: ''                 // 闲置资金
      }
    },
    mounted () {
      console.log(this.$route.params.userId)
      // 获取用户的头部信息
      this._post(this, {SERVERID: 'SHOP0004', user_id: this.$route.params.userId}, (response) => {
        // console.log(response)
        if (response.rows.REALNAMEMARK === '1') {
          this.unRealImg = false  // 1已认证
          this.realName = response.rows.REALNAME   // 用户姓名
          if (response.rows.GENDER === '男') {     // 是男是女
            this.gender = true
          } else {
            this.gender = false
          }
          this.age = response.rows.AGE   // 用户年龄
          this.addPurchaseAmount = response.rows.ADDITIONALCAPITAL   // 本月新增投资额
          this.investSum = response.rows.INVEST_SUM   // 累计投资额
          this.userAbleAmount = response.rows.USEABLE_AMOUNT   // 闲置资金
        } else {
          this.unRealImg = true  // 0 未认证
        }
        this.phoneNum = response.rows.PHONENUM   // 用户年龄
      })
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .cus-mangent-header {
    background-color: @bg-white;
    padding: 1.2rem 1rem;

    &_gray {
      background-color: @bg-gray;
    }

    &_table {
      width: 100%;
      display: table;
    }

    &__info {
      display: table-cell;
      width: 70%;

      &_gray {
        padding-top: 0.6rem;
        padding-bottom: 0.8rem;
      }

      &_person {
        display: flex;
      }

      &_name {
        font-size: @font-size-large;
        font-weight: 500;
      }

      &_man {
        background: url("../../assets/images/man.png");
        background-repeat: no-repeat;
        width: 1.5rem;
        background-size: 100% 100%;
        background-position-y: 0.1rem;
        margin-right: 1rem;
      }

      &_women {
        background: url("../../assets/images/women.png");
        background-repeat: no-repeat;
        width: 1.5rem;
        background-size: 100% 100%;
        background-position-y: 0.1rem;
        margin-right: 1rem;
      }

      &_age {
        font-size: @font-size-large;
        color: @font-color-gray;
      }

      &_phone {
        padding-top: 0.5rem;
        font-size: @font-size-litter;
      }
    }

    &__real {
      display: table-cell;
      width: 30%;
      position: relative;

      &_img {
        width: 2rem;
        position: absolute;
        right: 0;
        top: 0.8rem;
      }
    }

    &__amount {
      background-color: @bg-yellow;
      padding: 1.2rem 1rem;

      &_item {
        display: table-cell;
        width: 50%;
        padding-top: 0.8rem;
      }

      &_dollor {
        font-size: @font-size-largest;
      }
    }
  }

</style>
