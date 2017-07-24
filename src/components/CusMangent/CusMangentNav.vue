<template>
  <div class="cus-mangent-nav">
    <div class="cus-mangent-nav_item" :class="{'current': current === 'product'}" @click="selectedType('product')">持有产品({{productCount}})</div>
    <div class="cus-mangent-nav_item" :class="{'current': current === 'coupon'}" @click="selectedType('coupon')">持有卡券({{couponCount}})</div>
    <div class="cus-mangent-nav_item" :class="{'current': current === 'login'}" @click="selectedType('login')">登录信息</div>
  </div>
</template>

<script>
  export default {
    props: ['productCount', 'couponCount'],
    data () {
      return {
        current: 'product'
      }
    },
    methods: {
      selectedType: function (type) {
        this.current = type
        this.$emit('currentType', type)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .cus-mangent-nav {
    display: table;
    width: 100%;
    font-size: @font-size-medium;
    height: 3.7rem;
    background-color: @bg-white;

    &_item {
      display: table-cell;
      width: 100%/3;
      text-align: center;
      vertical-align: middle;
      border-bottom: 1px solid @line-color;

      &.current {
        border-bottom: 1px solid @font-color-red;
        color: @font-color-red;
      }
    }
  }
</style>
