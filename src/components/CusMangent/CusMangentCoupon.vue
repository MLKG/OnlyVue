<template>
  <div>
    <div class="cus-mangent-coupon">
      <div class="cus-mangent-coupon_repeat" v-for="coupon in couponsData">
        <span class="cus-mangent-coupon_name">{{coupon.couponName}}</span>
        <span class="cus-mangent-coupon_date">到期时间：{{coupon.couponDate}}</span>
        <div class="cus-mangent-coupon_amount" v-if="coupon.couponType == 6">{{coupon.couponRiseRate}}<span class="font-size-large">%</span></div>
        <div class="cus-mangent-coupon_amount" v-else>{{coupon.couponAmount}}<span class="font-size-large">元</span></div>
        <span class="cus-mangent-coupon_count">x {{coupon.couponCount}}</span>
      </div>
      <div class="load-more font-size-litter" v-if="tip">{{tip}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        couponsData: [],            // 卡券信息
        tip: ''                    // 提示信息
      }
    },
    mounted () {
      // 获取持有卡券
      this._post(this, {SERVERID: 'SHOP0006', TYPE: 2, user_id: this.$route.params.userId}, (response) => {
        // console.log(response)
        let couponLength = response.rows.length
        if (couponLength > 0) {
          let coupons = []
          for (let coupon of response.rows) {
            let item = {
              couponName: coupon.CardName,
              couponDate: coupon.INVALID_DATE_END,
              couponType: coupon.CardType,
              couponCount: coupon.CARD_NUM,
              couponAmount: coupon.Amount_RATE,
              couponRiseRate: coupon.RISE_INTEREST_RATE * 100
            }
            coupons.push(item)
          }
          this.couponsData = coupons
        } else {
          this.tip = '无卡券信息'
        }
        this.$emit('couponCount', couponLength)
      })
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .cus-mangent-coupon {
    padding: 0.8rem 1rem 0;

    &_repeat {
      background-color: @bg-white;
      border: 1px solid @line-color;
      border-radius: 0.6rem;
      margin-bottom: 0.8rem;
      position: relative;
      padding-left: 1rem;
      padding-bottom: 1rem;
    }

    &_name {
      position: absolute;
      background-color: @bg-red;
      color: @font-color-white;
      padding: 0.4rem;
      left: 1rem;
      top: 0;
    }

    &_date {
      position: absolute;
      right: 1rem;
      top: 0.6rem;
      color: @font-color-gray;
    }

    &_amount {
      padding-top: 3rem;
      font-size: @font-size-bigger;
      color: @font-color-red;
    }

    &_count {
      position: absolute;
      right: 1rem;
      top: 3.25rem;
      font-size: @font-size-largest;
      // font-weight: 500;
    }
  }
</style>
