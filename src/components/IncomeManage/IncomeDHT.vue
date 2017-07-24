<template>
  <div class="IncomeDHT">
    <div class="income-dht">
      <div class="income-dht_block" v-for="item in lists">
        <div>
         <span class="font-color-gray">{{item.time.slice(0,4)}}年{{item.time.slice(5,7)}}月</span>
         <span class="income-dht_block_link" v-show="item.investAmount !== 0"><router-link :to="'/IncomeDHTDetail?time='+item.dataStr">查看详情</router-link></span>
        </div>
        <div class="income-dht_block_item">
          <div class="income-dht_block_item_con">
            <p class="font-size-big">{{item.investAmount | currency}}</p>
            <P class="font-color-gray">当月新增投资额</P>
          </div>
          <div class="income-dht_block_item_con">
            <p class="font-size-big">{{item.avgInvestBalance | currency}}</p>
            <P class="font-color-gray">日均余额</P>
          </div>
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
        total: '',
        lists: [],
        page: 1,
        rows: 6,
        tip: '',
        isScroll: false
      }
    },
    mounted: function () {
      this.getDHTList(this.page, this.rows)
    },
    methods: {
      getDHTList: function (page, rows) {
        this._post(this, {SERVERID: '60000021', page: page, rows: rows}, (response) => {
          this.total = response.total
          if (this.total > 0) {
            let listData = []
            for (let list of response.rows) {
              let item = {
                time: list.DATA_TIME,
                investAmount: list.INVEST_AMOUNT_ZX,
                avgInvestBalance: list.AVG_INVEST_BALANCE_ZX,
                dataStr: list.DATA_DATESTR
              }
              listData.push(item)
              console.log(listData)
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
            this.getDHTList(this.page, this.rows)
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

  .income-dht {
    p {
      margin: 0;
      padding: 0;
    }

    &_block {
      padding:1rem;
      border-top: 1px solid @line-color;
      background-color: @bg-white;

      &:first-child {
        margin-top: 4.5rem;
      }

      &_item {
        display: table;
        width: 100%;
        margin-top: 0.4rem;

        &_con {
          display: table-cell;
          width: 35%;
        }
      }

      &_link {
        text-decoration: underline;
        color:@font-color-blue;
        float: right;
      }

      a {
        color: @font-color-blue;
      }
    }
  }

  .income-tip{
    margin-top: 4.5rem;
  }
</style>

