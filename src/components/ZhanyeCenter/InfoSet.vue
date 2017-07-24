<template>
  <div class="info-set" v-if="initShow">
    <div class="info-set_gray">
      客户动态微信推送
    </div>
    <div class="info-set_block">
      <div class="info-set_block_item">
        <div class="line">
          <div class="float-left">用新用户注册</div>
          <div class="info-set_btn">
            <label class="switch-btn circle-style">
              <input class="checked-switch" type="checkbox" v-model="info.ZC_FLAG" @click="modifyInfo(info.ZC_FLAG, 'zc')" />
              <span class="text-switch"></span>
              <span class="toggle-btn"></span>
            </label>
          </div>
        </div>
        <div class="line">
          <div class="float-left">客户首次投资</div>
          <div class="info-set_btn">
            <label class="switch-btn circle-style">
              <input class="checked-switch" type="checkbox" v-model="info.TZ_FLAG" @click="modifyInfo(info.TZ_FLAG, 'tz')"/>
              <span class="text-switch"></span>
              <span class="toggle-btn"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="info-set_gray">
      客户动态微信推送
    </div>
    <div class="info-set_block">
      <div class="info-set_block_item">
        <div class="line">
          <div class="float-left">每月佣金到账</div>
          <div class="info-set_btn">
            <label class="switch-btn circle-style">
              <input class="checked-switch" type="checkbox" v-model="info.YJ_FLAG" @click="modifyInfo(info.YJ_FLAG, 'yj')"/>
              <span class="text-switch"></span>
              <span class="toggle-btn"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        info: {},
        initShow: false
      }
    },
    mounted: function () {
      this.getInfo()
    },
    methods: {
      getInfo: function () {
        this._post(this, {SERVERID: 'SHOP0002'}, (response) => {
          if (response.FLAG === 'T') {
            this.info = response
            this.initShow = true
          }
        })
      },
      modifyInfo: function (flag, type) {
        if (flag) {
          flag = 1
        } else {
          flag = 0
        }
        if (type === 'zc') {
          this.info.ZC_FLAG = flag
        } else if (type === 'tz') {
          this.info.TZ_FLAG = flag
        } else if (type === 'yj') {
          this.info.YJ_FLAG = flag
        }
        this._post(this, {SERVERID: 'SHOP0003', ZC_FLAG: this.info.ZC_FLAG, TZ_FLAG: this.info.TZ_FLAG, YJ_FLAG: this.info.YJ_FLAG}, (response) => {
          console.log(response.MSG)
        })
      }
    }
  }
</script>

<style lang="less">
  @import "../../assets/less/variables";

  .info-set {
    margin-top: 4rem;

    &_gray {
      height: 3rem;
      line-height: 3rem;
      padding-left: 1rem;
      font-size: @font-size-litter;
    }

    &_block {
      background-color: @bg-white;
      font-size: @font-size-medium;
      border-top: 1px solid @line-color;
      border-bottom:1px solid @line-color;

      &_item {
        padding-left:1rem;

        .line {
          border-bottom: 1px solid @line-color;
          height: 3.5rem;
          line-height: 3.5rem;

          &:last-child {
            border-bottom: none;
          }
        }
      }

      & .switch-btn {
        position: relative;
        display: block;
        vertical-align: top;
        width: 3.6rem;
        height: 2rem;
        border-radius: 2rem;
      }

      & .checked-switch {
        position: absolute;
        top: 0.3rem;
        left: 0.9rem;
        opacity: 0;

        &:checked ~ .text-switch {
          background-color: #ed5b49;
          border: 1px solid #d2402e;
        }

        &:checked ~ .toggle-btn {
          left: 1.4rem;
        }
      }

      & .text-switch {
        background-color: #fff;
        border: 1px solid #DDD;
        border-radius: inherit;
        color: #fff;
        display: block;
        height: inherit;
        position: relative;
        text-transform: uppercase;
      }

      & .toggle-btn {
        background: linear-gradient(#fff, #fafafa);
         border-radius: 100%;
         height: 1.9rem;
         left: 0;
         position: absolute;
         top: 0.05rem;
         width: 1.9rem;
         border:1px solid #DDD;
       }

      & .text-switch, .toggle-btn {
        transition: All 0.3s ease;
        -webkit-transition: All 0.3s ease;
         -moz-transition: All 0.3s ease;
         -o-transition: All 0.3s ease;
       }
    }

    &_btn {
      padding-right: 1rem;
      padding-top: 0.7rem;
      float: right;
    }
  }
</style>
