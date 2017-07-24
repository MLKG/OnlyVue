<template>
  <div class="IncomeTab">
    <div class="income-tab">
      <div class="income-tab_item" :class="{'current': current === 'all'}" @click="selectedTab('all')">
        网店收入
      </div>
      <div class="income-tab_item" :class="{'current': current === 'dht'}" @click="selectedTab('dht')">
        广金定活通
      </div>
      <div class="income-tab_item" :class="{'current': current === 'ps'}" @click="selectedTab('ps')">
        广金磐石
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        current: 'all'
      }
    },
    methods: {
      selectedTab: function (tab) {
        this.current = tab
        this.$emit('currentTab', tab)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .income-tab {
    display: flex;
    width: 100%;
    font-size: @font-size-medium;
    height: 3.7rem;
    line-height: 3.7rem;
    background-color: @bg-white;
    position: fixed;
    top: 0;

    &_item {
      flex:1;
      text-align: center;
      border-bottom: 1px solid @line-color;

      &.current {
        border-bottom: 1px solid @font-color-red;
        color: @font-color-red;
      }
    }
  }
</style>
