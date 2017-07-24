<template>
  <div class="user-search-result">共 {{ total }} 条搜索结果</div>
</template>

<script>
  export default {
    props: ['total']
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .user-search-result {
    padding: 1rem;
  }
</style>
