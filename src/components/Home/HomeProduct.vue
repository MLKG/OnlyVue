<template>
  <div class="home-product">
    <div class="home-product__nav">
      <div class="item" @click="goProduct('2018')">
        <img src="../../assets/images/sites_01.png"/>
        <div class="title">查报价</div>
      </div>
      <div class="item" @click="goProduct('2018')">
        <img src="../../assets/images/sites_03.png"/>
        <div class="title">问答</div>
      </div>
      <div class="item" @click="goProduct('2018')">
        <img src="../../assets/images/sites_05.png"/>
        <div class="title">排行榜</div>
      </div>
      <div class="item" @click="goProduct('2018')">
        <img src="../../assets/images/sites_07.png"/>
        <div class="title">视频</div>
      </div>
      <div class="item" @click="goProduct('2018')">
        <img src="../../assets/images/sites_09.png"/>
        <div class="title">商城</div>
      </div>
    </div>
    <div class="home-product__list" v-for="n in 8">
      <div class="left">
        <div class="title">锤子员工爆料坚果Pro销量 和官方差的不少</div>
        <div class="font-color-gray"><span>评论18</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>2小时前</span></div>
      </div>
      <div class="right">
        <img src="../../assets/images/phone.jpg"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      goProduct (productId) {
        this.$router.push({path: '/product', query: {productId: productId}})
      }
    },
    mounted () {
      let paramList = [{'SERVERID': 22110001, 'isUsed': 0, 'isOverDate': 0, 'CardType': '4'}, {'SERVERID': 50000001}]
      this._allPost(this, paramList, (data) => {
        console.log(data)
      })
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/variables";

  .home-product {
    background-color: @bg-white;

    &__nav {
      display: flex;
      justify-content: space-around;
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      text-align: center;

      & .item {
        img {
          width: 0.86rem;
          margin-bottom: 0.15rem;
        }
      }
    }

    &__list {
      padding: 0.2rem 0;
      margin: 0 0.2rem;
      border-bottom: 1px solid @line-color;
      display: flex;

      &:last-child {
        border-bottom: none;
      }

      & .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & .title {
          font-size: @font-size-medium;
        }
      }

      & .right {
        padding-left: 0.1rem;

        img {
          width: 2.2rem;
          height: 100%;
        }
      }
    }
  }
</style>
