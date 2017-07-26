<template>
  <div>
    <home-header></home-header>
    <home-product></home-product>
  </div>
</template>

<script>
  import HomeHeader from './HomeHeader'
  import HomeProduct from './HomeProduct'

  export default {
    components: {
      HomeHeader,
      HomeProduct
    }
  }
</script>
