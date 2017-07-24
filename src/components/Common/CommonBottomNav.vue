<template>
  <div>
    <div class="common-bottom-nav__top"></div>
    <div class="common-bottom-nav">
      <div class="common-bottom-nav__item" :class="{ current: isMain }" @click="goHome">首页</div>
      <div class="common-bottom-nav__item" :class="{ current: isIncome }" @click="goIncome">收入管理</div>
      <div class="common-bottom-nav__item" :class="{ current: isCustomer }" @click="goCustomer">客户管理</div>
      <div class="common-bottom-nav__item" :class="{ current: isCenter }" @click="goCenter">展业中心</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['current'],
    computed: {
      isMain: function () {
        return this.current === 'main'
      },
      isIncome: function () {
        return this.current === 'income'
      },
      isCustomer: function () {
        return this.current === 'customer'
      },
      isCenter: function () {
        return this.current === 'center'
      }
    },
    methods: {
      goHome: function () {
        this.$router.push('/Home')
      },
      goIncome: function () {
        this.$router.push('/IncomeManage')
      },
      goCustomer: function () {
        this.$router.push('/Customer')
      },
      goCenter: function () {
        this.$router.push('/ZhanyeCenter/InfoSet')
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .common-bottom-nav {
    position: fixed;
    bottom: 0;
    display: table;
    width: 100%;
    height: 3.7rem;
    border-top: 1px solid @line-color;
    background-color: @bg-white;
    z-index: 2;

    &__item {
      display: table-cell;
      width: 25%;
      text-align: center;
      vertical-align: middle;
      border-right: 1px solid @line-color;
      font-size: @font-size-medium;

      &:last-child {
        border: none;
      }

      &.current {
        color: @font-color-red;
      }
    }

    &__top {
      height: 3.7rem;
      width: 100%;
    }
  }
</style>
