<template>
  <div class="zhanye-center">
    <div class="tab-item" :class="{'current': current === 'InfoSet'}"  @click="selectedTab('InfoSet')">消息设置</div>
    <div class="tab-item" :class="{'current': current === 'ShareLink'}"  @click="selectedTab('ShareLink')">推广链接</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        current: ''
      }
    },
    mounted () {
      this.current = this.$route.params.fromWhere
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

  .zhanye-center {
    display: flex;
    width: 100%;
    height: 3.7rem;
    line-height: 3.7rem;
    position: fixed;
    top: 0;

    .tab-item {
      flex:1;
      text-align: center;
      width: 50%;

      display: inline-block;
      background-color: @bg-white;
      font-size: @font-size-medium;
      border-bottom: 1px solid @line-color;

      &.current {
        border-bottom: 1px solid @font-color-red;
        color: @font-color-red;
      }
    }
  }
</style>
