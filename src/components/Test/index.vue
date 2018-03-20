<template>
  <div>
    <div class="my-date" @click="selectDate">
      选择日期
    </div>
    <common-picker
      show-toolbar
      title="联系人关系"
      :shadow="shadow"
      :columns="list"
      value-key="relationName"
      @cancel="selectDate"
      @confirm="handleConfirm">
    </common-picker>
  </div>
</template>

<script>
  import CommonPicker from '../Common/CommonPicker'

  export default {
    data () {
      return {
        shadow: false,
        list: [
          {id: 1, relationName: '配偶'},
          {id: 2, relationName: '父母'},
          {id: 3, relationName: '子女'},
          {id: 4, relationName: '家人'},
          {id: 5, relationName: '其他'}
        ]
      }
    },
    methods: {
      selectDate () {
        this.shadow = !this.shadow
      },
      handleConfirm (value, index) {
        this.selectDate()
        console.log(`当前值：${JSON.stringify(value)}, 当前索引：${index}`)
      }
    },
    components: {
      CommonPicker
    }
  }
</script>

<style lang="less" scoped>

  .my-date {
    margin-top: 0.3rem;
    background-color: white;
    height: 0.88rem;
    line-height: 0.88rem;
    text-align: center;
  }
</style>
