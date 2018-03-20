<template>
  <div>
    <div class="my-date" @click="selectDate">
      选择日期
    </div>
    <div class="my-date" @click="selectCity">
      选择省市
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
    <common-picker
      show-toolbar
      multi-level
      title="选择省市"
      :shadow="shadowCity"
      :columns="proviceList"
      confirmButtonText='下一步'
      @change="onProvicePicker"
      @cancel="selectCity"
      @confirm="handleNextStep">
    </common-picker>
  </div>
</template>

<script>
  import CommonPicker from '../Common/CommonPicker'

  export default {
    data () {
      return {
        shadow: false,
        shadowCity: false,
        list: [
          {id: 1, relationName: '配偶'},
          {id: 2, relationName: '父母'},
          {id: 3, relationName: '子女'},
          {id: 4, relationName: '家人'},
          {id: 5, relationName: '其他'}
        ],
        provinces: ['安徽省', '澳门', '北京市', '福建省', '甘肃省', '广东省', '广西壮族自治区', '贵州省'],
        cities: [
          ['安庆市', '蚌埠市', '巢湖市', '池州市', '滁州市', '阜阳市', '合肥市', '淮北市'],
          ['澳门'],
          ['北京市'],
          ['福州市', '龙岩市', '南平市', '宁德市', '莆田市', '泉州市', '三明市', '厦门市', '漳州市'],
          ['白银市', '定西市', '甘南市', '嘉裕关市', '金昌市', '酒泉市', '兰州市', '临夏市', '陇南市', '平凉市', '庆阳市', '天水市', '武威市', '张掖市'],
          ['潮州市', '东莞市', '佛山市', '广州市', '河源市', '惠州市', '江门市', '揭阳市', '茂名市', '梅州市', '清远市', '汕头市', '汕尾市', '韶关市', '深圳市', '阳江市', '云浮市', '湛江市', '肇庆市', '中山市', '珠海市'],
          ['百色市', '北海市', '崇左市', '防城港市', '桂林市', '贵港市', '河池市', '贺州市', '来宾市', '柳州市', '南宁市', '钦州市', '梧州市', '玉林市'],
          ['安顺市', '毕节市', '贵阳市', '六盘水市', '黔东南州', '黔南州', '黔西南州', '铜仁市', '遵义市']
        ],
        cityList: {}
      }
    },
    computed: {
      proviceList () {
        let proviceList = [{
          values: []
        }, {
          values: this.cities[0],
          defaultIndex: 1
        }]
        this.provinces.map((item, index) => {
          proviceList[0].values.push(item)
          this.cityList[item] = this.cities[index]
        })
        console.log(this.cityList)
        console.log(proviceList)
        return proviceList
      }
    },
    methods: {
      selectDate () {
        this.shadow = !this.shadow
      },
      selectCity () {
        this.shadowCity = !this.shadowCity
      },
      onProvicePicker (picker, values) {
        picker.setColumnValues(1, this.cityList[values[0]])
      },
      handleConfirm (value, index) {
        this.selectDate()
        console.log(`当前值：${JSON.stringify(value)}, 当前索引：${index}`)
      },
      handleNextStep (value) {
        this.selectCity()
        console.log(value)
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
    margin-bottom: 0.3rem;
  }
</style>
