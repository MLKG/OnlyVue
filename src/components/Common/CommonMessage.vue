<template>
  <div class="common-message">
    <div class="common-message__cell">
      <span class="common-message__text">{{ message }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['message']
  }
</script>

<style lang="less">
  .common-message {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: table;

    &__cell {
      display: table-cell;
      vertical-align: middle;
      text-align: center;
    }

    &__text {
      background: rgba(0, 0, 0, 0.5);
      border-radius: 5px;
      color: #fff;
      padding: .7rem 1.4rem;
    }
  }
</style>
