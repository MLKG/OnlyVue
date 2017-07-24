<template>
  <div>
    <ranking-header @rankingList="getRankingList"></ranking-header>
    <ranking-list :rankingList="rankingList"></ranking-list>
  </div>
</template>

<script>
  import RankingHeader from './RankingHeader'
  import RankingList from './RankingList'

  export default {
    data () {
      return {
        rankingList: null
      }
    },
    methods: {
      getRankingList (list) {
        // console.log(list)
        this.rankingList = list
      }
    },
    components: {
      RankingHeader,
      RankingList
    }
  }
</script>
