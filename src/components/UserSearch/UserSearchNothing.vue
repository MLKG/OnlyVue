<template>
  <div class="user-search-nothing">
    <div class="user-search-nothing__image-wrapper">
      <img src="../../assets/images/no-result.png" class="user-search-nothing__image">
    </div>
    <div class="user-search-nothing__text-wrapper">
      <div class="font-size-big">无符合条件的结果</div>
      <div>请尝试其他关键词</div>
      <p class="font-size-small">提示：只能通过<span class="font-color-red">用户名</span>或<span class="font-color-red">手机号</span>查找</p>
    </div>
  </div>
</template>

<style lang="less">
  @import "../../assets/less/variables";

  .user-search-nothing {
    text-align: center;
    padding-top: 25%;

    &__image-wrapper {
      margin-bottom: 3rem;
    }

    &__image {
      width: 10rem;
    }

    &__text-wrapper {
      color: @font-color-gray;
    }
  }
</style>
