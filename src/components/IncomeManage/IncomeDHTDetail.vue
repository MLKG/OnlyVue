<template>
  <div class="IncomeDHTDetail">
    <div class="income-dht-detail" v-for="item in lists">
      <div class="income-dht-detail_time">{{item.investTime}}</div>
      <div class="income-dht-detail_block">
        <div class="income-dht-detail_item">
          <div class="item">
            <div class="income-dht-detail_item_name">{{item.userName}} <span class="font-color-gray font-size-litter">{{item.phone}}</span></div>
            <p class="font-color-gray">归属时未结算余额：{{item.unPay | currency}}</p>
          </div>
          <div class="item text-right">
            <div class="income-dht-detail_item_name">{{item.productName}}</div>
            <p class="font-color-gray">到期日：{{item.endTime}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="load-more font-size-large font-color-gray">{{tip}}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        lists: [],
        page: 1,
        rows: 10,
        tip: '',
        isScroll: false
      }
    },
    mounted: function () {
      this.getDetail(this.$route.query.time, this.page, this.rows)
    },
    methods: {
      getDetail (time, page, rows) {
        this._post(this, {SERVERID: '60000023', 'DATA_DATESTR': time, page: page, rows: rows}, (response) => {
          let total = response.total
          if (total > 0) {
            let listData = []
            for (let list of response.rows) {
              let item = {
                investTime: list.INVEST_TIME,
                userName: list.CUSTOMER_USER_NAME,
                phone: list.CUSTOMER_PHONENUM,
                unPay: list.UNPAY_BACK_AMOUNT,
                productName: list.PRODUCT_NAME,
                endTime: list.ENDTIME
              }
              listData.push(item)
            }
            this.lists = this.lists.concat(listData)
            if (response.rows.length === this.rows) {
              this.tip = '上拉加载更多'
              this.isScroll = true
            } else {
              this.tip = '没有更多了'
              this.isScroll = false
            }
          } else {
            this.tip = '无产品信息'
            this.isScroll = false
          }
        })
      },
      handleScroll () {
        if (this.isScroll) {
          if (this._getScrollTop() + this._getClientHeight() >= this._getScrollHeight()) {
            this.page++
            this.getDetail(this.$route.query.time, this.page, this.rows)
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

  .income-dht-detail {
    &_time {
      height: 2.5rem;
      line-height: 2.5rem;
      padding-left: 1.2rem;
    }

    &_item {
      display: table;
      width: 100%;

      &_name {
          font-size: @font-size-medium;
          margin-bottom: 0.5rem;
        }
    }

    &_block {
      background-color: @bg-white;
      padding:1rem;
      border-top: 1px solid @line-color;
      border-bottom: 1px solid @line-color;

      .item {
        display: table-cell;
      }
    }

    p {
      margin: 0;
      padding: 0;
    }
  }
</style>
