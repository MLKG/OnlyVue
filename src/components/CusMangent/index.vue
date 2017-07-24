<template>
  <div>
    <cus-mangent-header></cus-mangent-header>
    <cus-mangent-nav @currentType='getCurrentType' :productCount="productCount" :couponCount="couponCount"></cus-mangent-nav>
    <cus-mangent-product v-if="current ==='product'" @productCount="getProductCount"></cus-mangent-product>
    <cus-mangent-coupon v-show="current ==='coupon'" @couponCount="getCouponCount"></cus-mangent-coupon>
    <cus-mangent-login v-show="current ==='login'"></cus-mangent-login>
  </div>
</template>

<script>
  import CusMangentHeader from './CusMangentHeader'
  import CusMangentNav from './CusMangentNav'
  import CusMangentProduct from './CusMangentProduct'
  import CusMangentCoupon from './CusMangentCoupon'
  import CusMangentLogin from './CusMangentLogin'

  export default {
    data () {
      return {
        current: 'product',
        productCount: 0,
        couponCount: 0
      }
    },
    methods: {
      getCurrentType (current) {
        this.current = current
      },
      getProductCount (count) {
        this.productCount = count
        // console.log(count)
      },
      getCouponCount (count) {
        this.couponCount = count
        // console.log(count)
      }
    },
    components: {CusMangentHeader, CusMangentNav, CusMangentProduct, CusMangentCoupon, CusMangentLogin}
  }
</script>
