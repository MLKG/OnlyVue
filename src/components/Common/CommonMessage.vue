<template>
  <div class="common-loading">
    <div class="common-loading_cell">
      <span class="common-loading_text">{{ message }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['message']
  }
</script>

<style lang="less" scoped>
  .common-loading {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    bottom: 0;
    right: 0;

    &_cell {
      position: fixed;
      text-align: center;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 3rem;
    }

    &_text {
      background: rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      color: #fff;
      padding: .2rem .4rem;
    }
  }
</style>
