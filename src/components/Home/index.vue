<template>
  <div>
    <home-header></home-header>
    <home-content></home-content>
    <common-bottom-nav :current="home"></common-bottom-nav>
  </div>
</template>

<script>
  import HomeHeader from './HomeHeader'
  import HomeContent from './HomeContent'
  import CommonBottomNav from '../Common/CommonBottomNav'

  export default {
    data () {
      return {
        home: 'main'
      }
    },
    components: {
      HomeHeader,
      HomeContent,
      CommonBottomNav
    }
  }
</script>
