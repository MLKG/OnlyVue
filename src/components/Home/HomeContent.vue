<template>
  <div >
    <div class="home-content">
      <router-link to="/IncomeManage">
        <div class="home-content__item">
          <img class="home-content__item_img" src="../../assets/images/home-detail.png" />
          <div class="home-content__item_title">佣金明细</div>
        </div>
      </router-link>
      <router-link to="/UserSearch">
        <div class="home-content__item">
          <img class="home-content__item_img" src="../../assets/images/home-find.png" />
          <div class="home-content__item_title">查找客户</div>
        </div>
      </router-link>
      <router-link to="/ZhanyeCenter/InfoSet">
        <div class="home-content__item">
          <img class="home-content__item_img" src="../../assets/images/home-setting.png" />
          <div class="home-content__item_title">消息设置</div>
        </div>
      </router-link>
      <router-link to="/Ranking">
        <div class="home-content__item">
          <img class="home-content__item_img" src="../../assets/images/home-ranking.png" />
          <div class="home-content__item_title">排行榜</div>
        </div>
      </router-link>
      <router-link to="/ZhanyeCenter/ShareLink">
        <div class="home-content__item">
          <img class="home-content__item_img" src="../../assets/images/home-extension.png" />
          <div class="home-content__item_title">推广链接</div>
        </div>
      </router-link>
    </div>
    <div class="home-content_background"></div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .home-content {
    width: 100%;
    padding-top: 1.5rem;
    background-color: @bg-white;
    display: table;
    position: relative;
    z-index: 1;

    &__item {
      display: inline-block;
      width: 100%/3;
      text-align: center;
      padding: 1.5rem 0;

      &_img {
        width: 5rem;
      }

      &_title {
        padding-top: 0.2rem;
        font-size: @font-size-litter;
      }
    }

    &_background {
      background-color: white;
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      z-index: 0;
    }
  }
</style>
