<template>
  <div id="app">
    <router-view @setMessage="showMessage"></router-view>
    <common-loading></common-loading>
    <transition name="fade">
      <common-message :message="msg" v-show="msgShow"></common-message>
    </transition>
  </div>
</template>

<script>
  import CommonLoading from 'components/Common/CommonLoading'
  import CommonMessage from 'components/Common/CommonMessage'

  export default {
    components: {
      CommonLoading,
      CommonMessage
    },
    data () {
      return {
        msg: '',
        msgShow: false
      }
    },
    methods: {
      showMessage (msg) {
        this.msg = msg
        this.msgShow = true
        setTimeout(() => {
          this.msgShow = false
        }, 2000)
      }
    }
  }
</script>

<style lang="less">
  @import "assets/less/base.less";

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0
  }
</style>
