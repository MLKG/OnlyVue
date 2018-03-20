<template>
  <div
    class="v-picker-column"
    :class="className"
    :style="columnStyle"
    @touchstart="onTouchStart"
    @touchmove.prevent="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd">
    <ul :style="wrapperStyle">
      <li v-for="(option, index) in options"
          v-text="getOptionText(option)"
          :key="index"
          :class="{'v-picker-column--disabled': isDisabled(option), 'v-picker-column--selected': index === currentIndex}"
          @click="setIndex(index, true, option)"></li>
    </ul>
  </div>
</template>

<script>
  const DEFAULT_DURATION = 200
  const range = (num, arr) => Math.min(Math.max(num, arr[0]), arr[1])

  export default {
    name: 'picker-column',
    props: {
      valueKey: String,
      className: String,
      itemHeight: Number,
      options: {
        type: Array,
        default: () => []
      },
      visibleItemCount: {
        type: Number,
        default: 5
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      multiLevel: Boolean
    },
    data () {
      return {
        startY: 0,
        offset: 0,
        duration: 0,
        startOffset: 0,
        currentIndex: this.defaultIndex
      }
    },
    created () {
      this.$parent && this.$parent.children.push(this)
    },
    mounted () {
      this.setIndex(this.currentIndex)
    },
    destroyed () {
      this.$parent && this.$parent.children.splice(this.$parent.children.indexOf(this), 1)
    },
    watch: {
      defaultIndex () {
        this.setIndex(this.defaultIndex)
      },
      options (next, prev) {
        if (JSON.stringify(next) !== JSON.stringify(prev)) {
          this.setIndex(0)
        }
      }
    },
    computed: {
      count () {
        return this.options.length
      },
      baseOffset () {
        return this.itemHeight * (this.visibleItemCount - 1) / 2
      },
      columnStyle () {
        return {
          height: (this.itemHeight * this.visibleItemCount) + 'px'
        }
      },
      wrapperStyle () {
        return {
          transition: `${this.duration}ms`,
          transform: `translate3d(0, ${this.offset + this.baseOffset}px, 0)`,
          lineHeight: this.itemHeight + 'px'
        }
      },
      currentValue () {
        return this.options[this.currentIndex]
      }
    },
    methods: {
      onTouchStart (event) {
        this.startY = event.touches[0].clientY
        this.startOffset = this.offset
        this.duration = 0
      },
      onTouchMove (event) {
        const deltaY = event.touches[0].clientY - this.startY
        this.offset = range(this.startOffset + deltaY, [
          -(this.count * this.itemHeight),
          this.itemHeight
        ])
      },
      onTouchEnd () {
        if (this.offset !== this.startOffset) {
          this.duration = DEFAULT_DURATION
          const index = range(Math.round(-this.offset / this.itemHeight), [
            0,
            this.count - 1
          ])
          if (this.multiLevel) {
            this.setIndex(index, true)
          }
          let _index = this.adjustIndex(index)
          this.currentIndex = _index
          this.offset = -_index * this.itemHeight
        }
      },
      adjustIndex (index) {
        index = range(index, [0, this.count])
        for (let i = index; i < this.count; i++) {
          if (!this.isDisabled(this.options[i])) return i
        }
        for (let i = index - 1; i >= 0; i--) {
          if (!this.isDisabled(this.options[i])) return i
        }
      },
      isDisabled (option) {
        return typeof option === 'object' && option.disabled
      },
      getOptionText (option) {
        return typeof option === 'object' && this.valueKey in option ? option[this.valueKey] : option
      },
      setIndex (index, userAction) {
        index = this.adjustIndex(index)
        this.offset = -index * this.itemHeight

        if (this.multiLevel) {
          if (index !== this.currentIndex) {
            this.currentIndex = index
            userAction && this.$emit('change', index)
          }
        } else {
          this.currentIndex = index
          userAction && this.$emit('click', index)
        }
      },
      setValue (value) {
        const { options } = this
        for (let i = 0; i < options.length; i++) {
          if (this.getOptionText(options[i]) === value) {
            this.setIndex(i)
            return
          }
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/variables";

  ul {
    margin: 0;
    padding: 0;
  }

  .v-picker {
    &-column {
      flex: 1;
      overflow: hidden;
      .font-size-medium;
      text-align: center;

      li {
        padding: 0 10px;
        color: #666;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .font-size-small;
      }

      li&--selected {
        color: #000;
        .font-size-medium;
      }

      li&--disabled {
        opacity: .3;
      }
    }
  }
</style>
