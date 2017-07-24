<template>
  <div class="IncomeContent">
    <div class="income-content">
      <div class="income-content_header">
        <div class="income-content_header_item">
          <div class="item">
            <div class="item-title">本月新增投资额</div>
            <div>&yen; <span class="font-size-big">{{investAmount | currency}}</span></div>
          </div>
          <div class="item" v-if="userMonth">
            <div class="item-title"><span class="font-size-medium">{{userMonth}}</span>月佣金收入</div>
            <div>&yen; <span class="font-size-big">{{commisionMonth | currency}}</span></div>
          </div>
        </div>
        <div class="income-content_header_item">
          <div class="item">
            <div class="item-title item-title_margin">投资总金额</div>
            <div class="item-amount">&yen; <span class="font-size-largest">{{sumInvestAmount | currency}}</span></div>
          </div>
          <div class="item">
            <div class="item-title item-title_margin">佣金总收入</div>
            <div class="item-amount">&yen; <span class="font-size-largest">{{commissonSum | currency}}</span></div>
          </div>
        </div>

      </div>
    </div>
    <div class="income-content_list" v-if="count">
        <div class="income-content_list-title">
          佣金收入详情
        </div>
        <div class="income-content_list-con">
          <div class="list-item" v-for="item in lists">
            <div class="list-item_left">
              <div class="font-color-gray">{{item.transTime}}</div>
              <div class="list-item_text">{{item.transName}}</div>
            </div>
            <div class="list-item_right">
              + {{item.transAmount}}
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
        investAmount: '',
        commisionMonth: '',
        sumInvestAmount: '',
        commissonSum: '',
        userMonth: '',
        lists: [],
        tip: '',
        total: '',
        page: 1,
        rows: 10,
        count: '',
        isScroll: false
      }
    },
    mounted: function () {
      this.getIncomeAll(this.page, this.rows) // 总收入数据
    },
    methods: {
      getIncomeAll: function (page, rows) {
        this._post(this, {SERVERID: '60000015', page: page, rows: rows}, (response) => {
          this.investAmount = response.result.INVESTAMOUNT
          this.commisionMonth = response.result.COMMISSON_MONTH
          this.sumInvestAmount = response.result.SUMINVESTAMOUNT
          this.commissonSum = response.result.COMMISSON_SUM
          this.userMonth = response.result.MONTH
          this.total = response.result.COMMISSIONDETAILS.length
          this.count = response.result.COMMISSIONDETAILS_COUNT
          if (this.total > 0) {
            let listData = []
            for (let list of response.result.COMMISSIONDETAILS) {
              let item = {
                transTime: list.TRANS_TIME,
                transName: list.TRANS_TYPE_NAME,
                transAmount: list.TRADE_AMOUNT
              }
              listData.push(item)
            }
            this.lists = this.lists.concat(listData)
            if (this.total === this.rows) {
              this.tip = '上拉加载更多'
              this.isScroll = true
            } else {
              this.tip = '没有更多了'
              this.isScroll = false
            }
          } else {
            this.isScroll = false
          }
        })
      },
      handleScroll () {
        if (this.isScroll) {
          if (this._getScrollTop() + this._getClientHeight() >= this._getScrollHeight()) {
            this.page++
            this.getIncomeAll(this.page, this.rows)
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

  .income-content {
      background-color: @bg-white;
      padding: 1.6rem 1.2rem 1.3rem;
      border-top: 1px solid @line-color;
      border-bottom: 1px solid @line-color;
      margin-top: 4.5rem;

    &_header {
      &_item {
        display: table;
        width: 100%;

        .item {
          display: table-cell;
          float: left;
          width: 50%;
        }
      }

      .item-title {
        color:@font-color-gray;
        margin-bottom: 0.3rem;

        &_margin {
          margin-top: 0.9rem;
        }
      }

      .item-amount {
        font-size: @font-size-largest;
        color:@font-color-gray;
      }
    }

    &_list {
      background-color: @bg-white;
      margin-top: 1.2rem;

      &-title {
        font-size: @font-size-large;
        padding: 1rem 1.2rem;
        border-bottom: 1px solid @line-color;
        border-top: 1px solid @line-color;
      }

      &-con {
        .list-item{
          padding-top: 1.5rem;
          clear:both;
          border-bottom: 1px solid @line-color;
          display: table;
          width: 100%;

          &_left {
            display: inline-block;
            width: 60%;
            padding-left: 1.2rem;
          }

          &_right {
            display: inline-block;
            float: right;
            color: @font-color-red;
            font-size: @font-size-larger;
            line-height: 3rem;
            padding-right: 1.2rem;
          }

          &_text {
            margin: 0.7rem 0;
            font-size: @font-size-medium;
          }
        }
      }
    }
  }

</style>
