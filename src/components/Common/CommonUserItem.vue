<template>
  <div>
    <div v-for="user in users" class="common-user-item__wrapper">
      <div class="common-user-item">
        <div>
          <span class="common-user-item__name">{{ user.userName }}</span>
          <router-link :to="user.userLink"><span class="common-user-item__view">查看详情</span></router-link>
          <div class="common-user-item__phone">{{ user.phoneNum }}</div>
        </div>
        <div v-show="user.isPay" class="common-user-item__infos">
          <div class="common-user-item__info">
            <div class="common-user-item__info-left">
              <div>投资：{{ user.investAmount | currency }}</div>
              <div>闲置：{{ user.idleAmount | currency }}</div>
            </div>
          </div>
          <div class="common-user-item__info">
            <div class="common-user-item__info-right">
              <div v-if="type === 3">
                <div>兑付金额：{{ user.exchangeAmount | currency }}</div>
                <div></div>
              </div>
              <div v-else-if="type === 4">
                <div>到期金额：{{ user.expireAmount | currency }}</div>
                <div></div>
              </div>
              <div v-else>
                <div>定活通：{{ user.investDht | currency }}</div>
                <div>磐石：{{ user.investPs | currency }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isMore" class="load-more font-size-large font-color-gray">
      <span>上拉加载更多</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['users', 'isMore', 'type']
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .common-user-item {
    background-color: @bg-white;
    padding: 1rem;

    &__wrapper {
      border-bottom: 1px solid @line-color;
    }

    &__view {
      float: right;
      text-decoration: underline;
      color: @font-color-blue;
    }

    &__phone {
      font-size: @font-size-smaller;
      color: @font-color-gray;
    }

    &__infos {
      margin-top: .5rem;

      &::after {
        content: '';
        clear: both;
        display: table;
      }
    }

    &__info {
      float: left;
      width: 50%;

      &:first-child {
        margin-right: -1px;
        border-right: 1px solid @line-color;
      }
    }

    &__info-right {
      padding-left: 1rem;
    }
  }
</style>
