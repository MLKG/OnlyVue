<template>
  <div class="user-search-bar">
    <div class="user-search-bar__content">
      <div class="user-search-bar__input">
        <span class="user-search-bar__input_icon">
          <img src="../../assets/images/user-search-icon.png">
        </span>
        <div class="user-search-bar__input_bar">
          <input type="text" v-model="searchVal" placeholder="客户姓名/手机号码" @keyup="keyup($event, searchVal)" @keyup.enter="search(searchVal)">
          <span @click="clearVal" class="user-search-bar__input_clear"><img src="../../assets/images/user-search-clear.png"></span>
        </div>
      </div>
    </div>
    <div class="user-search-bar__button" @click="search(searchVal)">搜索</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchVal: ''
      }
    },
    methods: {
      keyup (event, val) {
        if (event.keyCode !== 13) {
          setTimeout(() => {
            if (val === this.searchVal) {
              this.$emit('getSuggestList', val.trim())
            }
          }, 800)
        }
      },
      search (val) {
        if (val.trim() !== '') {
          this.$emit('getSearchResult', 1, val.trim())
        }
      },
      clearVal () {
        this.searchVal = ''
        this.$emit('clearSuggestList')
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .user-search-bar {
    display: table;
    width: 100%;
    background-color: @bg-white;
    border-bottom: 1px solid @line-color;

    &__content {
      display: table-cell;
      width: 80%;
      padding: .8rem 0 .8rem .8rem;
    }

    &__input {
      display: table;
      width: 100%;

      &_icon {
        width: 12%;
        display: table-cell;
        background-color: @bg-color;
        text-align: center;
        vertical-align: middle;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;

        img {
          width: 1.2rem;
          padding-top: 0.3rem;
        }
      }

      &_bar {
        width: 88%;
        display: table-cell;
        height: 2rem;
        position: relative;

        input {
          width: 100%;
          height: 100%;
          background-color: @bg-color;
          border-radius: 4px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          font-size: @font-size-base;
          border: 0;
          outline: none;
        }
      }

      &_clear {
        position: absolute;
        right: 3%;
        top: 22%;

        img {
          width: 1rem;
        }
      }
    }

    &__button {
      display: table-cell;
      width: 20%;
      text-align: center;
      vertical-align: middle;
      font-size: @font-size-large;
    }
  }
</style>
