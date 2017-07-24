<template>
  <div class="IncomePS">
    <div class="income-ps" v-for="item in lists">
      <div class="income-ps_block">
        <div>
         <span class="font-color-gray">{{item.time.slice(0,4)}}年{{item.time.slice(5,7)}}月</span>
         <span class="income-ps_link" v-show="item.totalAmount !== 0"><router-link :to="'/IncomePSDetail?time='+item.dataStr">查看详情</router-link></span>
        </div>
        <div class="income-ps_block_item">
          <div class="font-size-big">{{item.totalAmount | currency}}</div>
          <div class="font-color-gray">当月新增投资额</div>
        </div>
      </div>
    </div>
    <div class="load-more font-size-large font-color-gray" :class="{'income-tip': total===0}">{{tip}}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        lists: [],
        page: 1,
        rows: 6,
        tip: '',
        isScroll: false,
        total: ''
      }
    },
    mounted: function () {
      this.getPSList(this.page, this.rows)
    },
    methods: {
      getPSList: function (page, rows) {
        this._post(this, {SERVERID: '60000022', page: page, rows: rows}, (response) => {
          this.total = response.total
          if (this.total > 0) {
            let listData = []
            for (let list of response.rows) {
              let item = {
                time: list.DATA_TIME,
                totalAmount: list.TOTAL_AMOUNT_PS,
                dataStr: list.DATA_DATESTR
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
            this.getPSList(this.page, this.rows)
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

  .income-ps {
    background-color: @bg-white;
    padding: 1rem;
    border-top: 1px solid @line-color;

    &:first-child {
      margin-top: 4.5rem;
    }

    &:last-child {
      border-bottom: 1px solid @line-color;
    }

    p {
      margin:0;
      padding: 0;
    }

    &_block {

      &_item {
        margin-top:0.8rem;
      }

      a {
        color: @font-color-blue;
      }
    }

    &_link {
      text-decoration: underline;
      color: @font-color-blue;
      float: right;
    }
  }
  .income-tip{
    margin-top: 4.5rem;
  }
</style>
