<template>
  <div class="ZhanyeCenter">
    <zhanye-nav @currentTab='getTab'></zhanye-nav>
    <info-set v-if="current === 'InfoSet'"></info-set>
    <share-link v-if="current === 'ShareLink'"></share-link>
    <common-bottom-nav :current="bottomNav"></common-bottom-nav>
  </div>
</template>

<script>
  import CommonBottomNav from '../Common/CommonBottomNav'
  import ZhanyeNav from './ZhanyeNav'
  import InfoSet from './InfoSet'
  import ShareLink from './ShareLink'

  export default {
    name: 'ZhanyeCenter',
    data () {
      return {
        current: '',
        bottomNav: 'center'
      }
    },
    mounted () {
      this.current = this.$route.params.fromWhere
    },
    methods: {
      getTab (tab) {
        this.current = tab
      }
    },
    components: {
      CommonBottomNav,
      ZhanyeNav,
      InfoSet,
      ShareLink
    }
  }
</script>

