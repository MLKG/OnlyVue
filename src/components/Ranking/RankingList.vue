<template>
  <div class="ranking-list">
    <div class="ranking-list__item" v-for="ranking in rankingList">
      <div class="ranking-list__item_ranking gray" :class="{'red': ranking.isMyself || ranking.rowNumber == 1, 'orange': ranking.rowNumber == 2, 'yellowish': ranking.rowNumber == 3}">
        {{ranking.rowNumber}}
      </div>
      <div class="ranking-list__item_name">{{ranking.mangerName}}</div>
      <div class="ranking-list__item_amount">{{ranking.amount | currency}}</div>
      <div class="ranking-list__item_shadow" v-if="ranking.isMyself"></div>
    </div>
    <div class="ranking-list_background"></div>
    <div class="ranking-list_background load-more font-size-large">{{tip}}</div>
  </div>
</template>

<script>
  export default {
    props: ['rankingList'],
    data () {
      return {
        tip: ''   // 无数据的时候的提示
      }
    },
    mounted () {
      if (this.rankingList && this.rankingList.length === 0) {
        this.tip = '无相关数据'
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .ranking-list {
    margin-top: 1rem;
    border-top: 1px solid @line-color;
    font-size: @font-size-medium;

    &__item {
      background-color: @bg-white;
      position: relative;
      z-index: 1;
      padding: 1rem 1rem;

      &_ranking {
        color: @font-color-white;
        min-width: 1.5rem;
        height: 1.6rem;
        display: inline-block;
        text-align: center;
        border-radius: 0.2rem;
        padding: 0 0.1rem;

        &.red {
          background-color: @bg-red !important;
        }

        &.orange {
          background-color: @bg-orange !important;
        }

        &.yellowish {
          background-color: @bg-yellowish !important;
        }

        &.gray {
          background-color: @bg-gray;
        }
      }

      &_name {
        display: inline-block;
        margin-left: 0.4rem;
      }

      &_amount {
        position: absolute;
        right: 1rem;
        top: 1rem;
      }

      &_shadow {
        position: absolute;
        left: 0.5rem;
        right: 0.5rem;
        top: 0.25rem;
        bottom: 0.5rem;
        -webkit-box-shadow: 0 0.2rem 0.5rem 0.2rem @bg-gray;
        -moz-box-shadow: 0 0.2rem 0.5rem 0.2rem @bg-gray;
        box-shadow: 0 0.2rem 0.5rem 0.2rem @bg-gray;
      }
    }

    &_background {
      background-color: white;
      position: absolute;
      bottom: 0;
      top: 6.0rem;
      left: 0;
      right: 0;
      z-index: 0;
    }
  }
</style>
