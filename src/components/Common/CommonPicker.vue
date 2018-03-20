<template>
  <div>
    <transition name="translate-slide">
      <div class="v-picker" v-show="shadow">
        <div class="v-picker__toolbar v-hairline--top-bottom" v-if="showToolbar">
          <slot>
            <div class="v-picker_cancel" @click="emit('cancel')">{{ cancelButtonText}}</div>
            <div class="v-picker_confirm" @click="emit('confirm')">{{ confirmButtonText}}</div>
            <div class="v-picker_title" v-if="title" v-text="title"></div>
          </slot>
        </div>
        <div class="v-picker_columns" @touchmove.prevent>
          <picker-column
            v-for="(item, index) in currentColumns"
            :key="index"
            :value-key="valueKey"
            :options="item.values"
            :class-name="item.className"
            :default-index="item.defaultIndex"
            :item-height="itemHeight"
            :visible-item-count="visibleItemCount"
            :multi-level="multiLevel"
            @change="onChange(index)"
            @click="onClick(index)"
          />
          <div class="v-picker_frame v-hairline--top-bottom" :style="frameStyle"></div>
        </div>
      </div>
    </transition>
    <transition name="shadow-fade">
      <div class="shadow" v-show="shadow"></div>
    </transition>
  </div>
</template>

<script>
  import PickerColumn from './CommonPickerColumn'

  export default {
    name: 'picker',
    components: {
      PickerColumn
    },
    props: {
      title: String,
      showToolbar: Boolean,
      shadow: {
        type: Boolean,
        default: false
      },
      confirmButtonText: {
        type: String,
        default: '完成'
      },
      cancelButtonText: {
        type: String,
        default: '取消'
      },
      visibleItemCount: Number,
      valueKey: {
        type: String,
        default: 'text'
      },
      // itemHeight: {
      //   type: Number,
      //   default: 44
      // },
      columns: {
        type: Array,
        default: () => []
      },
      multiLevel: Boolean
    },

    data () {
      return {
        children: [],
        currentColumns: []
      }
    },
    // 初始化
    created () {
      this.initColumns()
    },
    watch: {
      columns: {
        handler () {
          this.initColumns()
        },
        deep: true
      }
    },
    computed: {
      itemHeight () {
        const width = document.documentElement.clientWidth
        return 0.88 * (width < 1080 ? width / 7.5 : 144)
      },
      frameStyle () {
        return {
          height: this.itemHeight + 'px'
        }
      }
    },
    methods: {
      initColumns () {
        const columns = this.columns
        this.isSimpleColumn = columns.length && !columns[0].values
        this.currentColumns = this.isSimpleColumn ? [{ values: columns }] : columns
      },
      emit (event) {
        if (this.isSimpleColumn) {
          this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0))
        } else {
          this.$emit(event, this.getValues(), this.getIndexes())
        }
      },
      onChange (columnIndex) {
        if (this.isSimpleColumn) {
          this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0))
        } else {
          this.$emit('change', this, this.getValues(), columnIndex)
        }
      },
      onClick (columnIndex) {
        if (this.isSimpleColumn) {
          this.$emit('click', this, this.getColumnValue(0), this.getColumnIndex(0))
        } else {
          this.$emit('click', this, this.getValues(), columnIndex)
        }
      },
      // get column instance by index
      getColumn (index) {
        return this.children[index]
      },
      // get column value by index
      getColumnValue (index) {
        return (this.getColumn(index) || {}).currentValue
      },
      // set column value by index
      setColumnValue (index, value) {
        const column = this.getColumn(index)
        column && column.setValue(value)
      },
      // get column option index by column index
      getColumnIndex (columnIndex) {
        return (this.getColumn(columnIndex) || {}).currentIndex
      },
      // set column option index by column index
      setColumnIndex (columnIndex, optionIndex) {
        const column = this.getColumn(columnIndex)
        column && column.setIndex(optionIndex)
      },
      // get options of column by index
      getColumnValues (index) {
        return (this.currentColumns[index] || {}).values
      },
      // set options of column by index
      setColumnValues (index, options) {
        const column = this.currentColumns[index]
        if (column) {
          column.values = options
        }
      },
      // get values of all columns
      getValues () {
        return this.children.map(child => child.currentValue)
      },
      // set values of all columns
      setValues (values) {
        values.forEach((value, index) => {
          this.setColumnValue(index, value)
        })
      },
      // get indexes of all columns
      getIndexes () {
        return this.children.map(child => child.currentIndex)
      },
      // set indexes of all columns
      setIndexes (indexes) {
        indexes.forEach((optionIndex, columnIndex) => {
          this.setColumnIndex(columnIndex, optionIndex)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/variables";

  .v-hairline {
    &--top-bottom {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        -webkit-transform: scale(.5);
        transform: scale(.5);
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        pointer-events: none;
        box-sizing: border-box;
        border-top: 1px solid #e5e5e5;
        border-bottom: 1px solid #e5e5e5;
      }
    }
  }

  .v-picker {
    overflow: hidden;
    user-select: none;
    background-color: white;
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 2;

    &__toolbar {
      height: .88rem;
      line-height: .88rem;
    }

    &_cancel, &_confirm {
      color: #42AEF6;
      padding: 0 .2rem;
    }

    &_cancel {
      float: left;
    }

    &_confirm {
      float: right;
    }

    &_title {
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &_columns {
      display: flex;
      position: relative;
    }

    &_frame {
      top: 50%;
      left: 0;
      width: 100%;
      z-index: 1;
      position: absolute;
      pointer-events: none;
      transform: translateY(-50%);
    }
  }
</style>
