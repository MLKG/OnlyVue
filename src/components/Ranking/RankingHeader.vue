<template>
  <div>
    <div class="ranking-header">
      <div class="ranking-header__name" @click="clickRanking()" :class="{'active': selectedShow}">
        {{selectedTitle}}<span class="ranking-header__name_caret"></span>
      </div>
      <div class="ranking-header__list" v-if="selectedShow">
        <div class="ranking-header__list_name" v-for="select in selectedList" @click="selectedRanking(select.typeCode, select.typeName)">
          {{select.typeName}}<img class="ranking-header__list_img" v-if="selectedType == select.typeCode" src="../../assets/images/ranking-select.png" />
        </div>
      </div>
    </div>
    <div class="ranking-header_placeholder"></div>
    <div class="ranking-header_count">单位：元</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        selectedList: [],       // 排行榜维度
        selectedType: '1',      // 维度类型
        selectedShow: false,    // 控制变量
        selectedTitle: ''        // 标题
      }
    },
    mounted () {
      this._post(this, {SERVERID: 'SHOP0008'}, (response) => {
        // console.log(response)
        let secletData = []
        for (let select of response.rows) {
          let item = {
            typeCode: select.TYPECODE,
            typeName: select.TYPENAME
          }
          secletData.push(item)
        }
        // 保存维度的列表
        this.selectedList = secletData
        this.selectedType = secletData[0].typeCode
        this.selectedTitle = secletData[0].typeName
      })
      this.getRankingList(this.selectedType)
    },
    methods: {
      selectedRanking (typeCode, typeName) {
        this.selectedShow = false
        this.selectedType = typeCode
        this.selectedTitle = typeName
        this.getRankingList(typeCode)
      },
      clickRanking () {
        this.selectedShow = !this.selectedShow
      },
      getRankingList (typeCode) {
        // 获取机构及新增投资客户数
        this._post(this, {SERVERID: 'SHOP0005', TYPE: typeCode, rows: 10, page: 1}, (response) => {
          // console.log(response)
          let rankingData = []
          if (response.rank_List) {
            for (let ranking of response.rank_List) {
              // console.log(ranking)
              let item = {
                rowNumber: ranking.rownumber,
                mangerName: ranking.manager_name,
                amount: ranking.Amount
              }
              if (ranking.MANAGER_USER_ID === response.userMap.MANAGER_USER_ID) {
                item.isMyself = true
                item.mangerName = '我'
              } else {
                item.isMyself = false
              }
              rankingData.push(item)
            }
            // 如果我的排名大于10 则显示11条数据
            if (response.userMap.rownumber > 10) {
              let myItem = {
                rowNumber: response.userMap.rownumber,
                mangerName: '我',                                // response.userMap.manager_name,
                amount: response.userMap.Amount,
                isMyself: true
              }
              rankingData.push(myItem)
            }
          }
          this.$emit('rankingList', rankingData)    // 传递数据到列表
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .ranking-header {
    text-align: center;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;

    &_placeholder {
      width: 100%;
      height: 3.7rem;
    }

    &_count {
      text-align: right;
      padding-right: 1rem;
      padding-top: 0.5rem;
      font-size: @font-size-smaller;
    }

    &__name {
      background-color: @bg-white;
      display: table;
      width: 100%;
      height: 3.7rem;
      line-height: 3.7rem;
      font-size: @font-size-medium;
      border-bottom: 1px solid @line-color;
      padding-left: 0.5rem;

      &_caret {
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 2px;
        vertical-align: middle;
        border-top: 0.6rem dashed ;
        border-right: 0.6rem solid transparent;
        border-left: 0.6rem solid transparent;
      }

      &.active {
        .ranking-header__name_caret{
          .transform-rotate(180deg);
        }
      }
    }

    &__list {
      position: fixed;
      left: 0;
      right: 0;
      font-size: @font-size-medium;
      z-index: 1;

      &_name {
        height: 3.7rem;
        line-height: 3.7rem;
        background-color: @bg-white;
        border-bottom: 1px solid @line-color;
        position: relative;
      }

      &_img {
        // display: none;
        width: 1.8rem;
        position: absolute;
        top: 0.85rem;
        right: 1rem;
      }
    }
  }
</style>
