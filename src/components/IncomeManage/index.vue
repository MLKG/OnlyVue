<template>
	<div class="IncomeManage">
    <income-nav @currentTab='getTab'></income-nav>
    <income-all v-if="current === 'all'"></income-all>
    <income-dht v-if="current === 'dht'"></income-dht>
    <income-ps v-if="current === 'ps'"></income-ps>
    <common-bottom-nav :current="bottomNav"></common-bottom-nav>
	</div>
</template>

<script>
  import CommonBottomNav from '../Common/CommonBottomNav'
  import IncomeNav from './IncomeNav'
  import IncomeAll from './IncomeAll'
  import IncomeDht from './IncomeDHT'
  import IncomePs from './IncomePS'

  export default {
    name: 'IncomeManage',
    data () {
      return {
        current: 'all',
        bottomNav: 'income'
      }
    },
    components: {
      CommonBottomNav,
      IncomeNav,
      IncomeAll,
      IncomeDht,
      IncomePs
    },
    methods: {
      getTab: function (tab) {
        this.current = tab
      }
    }
  }
</script>
