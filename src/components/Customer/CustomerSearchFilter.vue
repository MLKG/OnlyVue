<template>
  <div>
    <div class="customer-search-bar">
      <div class="customer-search-bar__user" @click="showAll">全部客户 {{ amount.total }}</div>
      <div class="customer-search-bar__search" @click="goUserSearch"><img src="../../assets/images/search-icon.png"></div>
    </div>
    <div class="customer-search-filter">
      <div class="customer-search-filter__content">
        <div class="customer-search-filter__item-wrapper" :class="{current: currents[0]}" @click="filterUsers(0)">
          <div class="customer-search-filter__item">
            <div class="customer-search-filter__desc">
              <div>本月新增</div>
              <div>投资客户</div>
            </div>
            <p class="customer-search-filter__amount">{{ amount.invest }}</p>
          </div>
        </div>
        <div class="customer-search-filter__item-wrapper" :class="{current: currents[1]}" @click="filterUsers(1)">
          <div class="customer-search-filter__item">
            <div class="customer-search-filter__desc">
              <div>本月新增</div>
              <div>注册客户</div>
            </div>
            <p class="customer-search-filter__amount">{{ amount.regist }}</p>
          </div>
        </div>
        <div class="customer-search-filter__item-wrapper" :class="{current: currents[2]}" @click="filterUsers(2)">
          <div class="customer-search-filter__item">
            <div class="customer-search-filter__desc">
              <div>未来30天</div>
              <div>到期客户</div>
            </div>
            <p class="customer-search-filter__amount">{{ amount.future }}</p>
          </div>
        </div>
        <div class="customer-search-filter__item-wrapper" :class="{current: currents[3]}" @click="filterUsers(3)">
          <div class="customer-search-filter__item">
            <div class="customer-search-filter__desc">
              <div>过去30天已兑</div>
              <div>付或转让客户</div>
            </div>
            <p class="customer-search-filter__amount">{{ amount.past }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['amount'],
    data () {
      return {
        currents: [false, false, false, false]
      }
    },
    methods: {
      filterUsers (index) {
        this.currents = [false, false, false, false]
        this.currents[index] = true

        switch (index) {
          case 0:
            this.$emit('getCurrentMonthPayUsers', 1)
            break
          case 1:
            this.$emit('getCurrentMonthRegUsers', 1)
            break
          case 2:
            this.$emit('getThirtyExpireUsers', 1)
            break
          case 3:
            this.$emit('getPastThirtyCashUsers', 1)
            break
        }
      },
      goUserSearch () {
        this.$router.push('/UserSearch')
      },
      showAll () {
        this.currents = [false, false, false, false]
        this.$emit('getAllUsers', 1)
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .customer-search-bar {
    display: table;
    width: 100%;
    margin-top: 1rem;
    height: 3rem;
    color: @font-color-gray;
    border-top: 1px solid @line-color;
    border-bottom: 1px solid @line-color;
    background-color: @bg-white;

    &__user {
      display: table-cell;
      vertical-align: middle;
      width: 88%;
      padding-left: 5%;
    }

    &__search {
      display: table-cell;
      width: 12%;
      vertical-align: middle;
      text-align: center;

      img {
        width: 1.4rem;
        padding-top: 0.3rem;
      }
    }
  }

  .customer-search-filter {
    background-color: @bg-white;
    padding: .7rem;
    border-bottom: 1px solid @line-color;

    &__content {
      &::after {
        content: '';
        clear: both;
        display: table;
      }
    }

    &__item-wrapper {
      float: left;
      width: 25%;

      &.current {
        color: @font-color-red;
        background-color: @bg-pink;

        .customer-search-filter__desc {
          color: @font-color-red;
        }
      }
    }

    &__item {
      padding: .5rem;
    }

    &__desc {
      font-size: @font-size-small;
      color: @font-color-gray;
      white-space: nowrap;
    }

    &__amount {
      font-size: @font-size-large;
      margin: .6rem 0;
    }

  }
</style>
