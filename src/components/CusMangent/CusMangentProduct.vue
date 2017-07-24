<template>
  <div>
    <div class="cus-mangent-product" v-for="product in productsData">
      <div class="cus-mangent-product__title">
        <div class="cus-mangent-product__title_name">
          {{product.productName}}
        </div>
        <span class="cus-mangent-product__title_amount">{{product.investAmount | currency}}</span>
      </div>
      <div class="cus-mangent-product__content">
        <div class="cus-mangent-product__content_name">
          <span class="font-color-gray">到期时间：</span><span>{{product.productDate}}</span>
        </div>
        <div class="cus-mangent-product__content_name">
          <span class="font-color-gray">卡券使用：</span>
          <span v-if="product.cardType == 6">
            <span class="cus-mangent-product__content_weight">{{product.cardName}}</span>
            <span>{{product.cardInterestRate}}%</span>
          </span>
          <span v-else>
            <span class="cus-mangent-product__content_weight">{{product.cardName}}</span>
            <span>{{product.cardAmount}}元</span>
          </span>
        </div>
      </div>
    </div>
    <div class="load-more font-size-large">{{tip}}</div>
  </div>

</template>

<script>
  export default {
    data () {
      return {
        productsData: [],            // 产品信息
        rows: 10,
        page: 1,
        tip: '',
        isScroll: false               // 石是否可以继续滑动
      }
    },
    mounted () {
      // 获取第一页用户持有的产品列表
      this.getProductList(1)
    },
    methods: {
      getProductList (page) {
        this._post(this, {SERVERID: 'SHOP0006', TYPE: 1, rows: this.rows, page, user_id: this.$route.params.userId}, (response) => {
          // console.log(response)
          let productLength = response.rows.length
          let productTotal = response.total
          if (productLength > 0) {
            let products = []
            for (let product of response.rows) {
              let item = {
                productName: product.PRODUCT_NAME,
                investAmount: product.INVEST_AMOUNT,
                productDate: product.PLAN_PAYBACK_DATE,
                cardType: product.CARDTYPE,
                cardName: product.CardName,
                cardAmount: product.CARD_AMOUNT,
                cardInterestRate: product.RISE_INTEREST_RATE * 100
              }
              products.push(item)
            }
            if (productLength === this.rows) {
              this.tip = '上拉加载更多'
              this.isScroll = true
            } else {
              this.tip = '没有更多了'
              this.isScroll = false
            }
            this.productsData = this.productsData.concat(products)
          } else {
            this.tip = '没有更多了'
            this.isScroll = false
          }

          // 无持有产品
          if (productTotal === 0) {
            this.tip = '无产品信息'
            this.isScroll = false
          }

          this.$emit('productCount', productTotal)
        })
      },
      handleScroll () {
        if (this.isScroll) {
          if (this._getScrollTop() + this._getClientHeight() >= this._getScrollHeight()) {
            // console.log('end')
            this.page ++
            this.getProductList(this.page)
          }
        }
      }
    },
    created () {
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .cus-mangent-product {
    background-color: @bg-white;
    border-bottom: 1px solid @line-color;

    &__title {
      font-size: @font-size-larger;
      position: relative;
      padding: 1rem;
      font-weight: 500;

      &_amount {
        position: absolute;
        right: 1rem;
        top: 1rem;
      }
    }

    &__content {
      padding: 0 1rem 1rem;

      &_name {
        padding-bottom: 0.3rem;
      }

      &_weight {
        font-weight: 500;
      }
    }
  }
</style>
