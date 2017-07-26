<template>
  <div id="loadingPopup" class="popup load hide">
    <div class="popup_content">
      <div class="popup_text">
        <div class="loading"></div>
        <div class="text">正在处理中...</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @browserlist: webkit, moz, o;
  .loop(@counter) when (@counter > 0) {
    .loop((@counter - 1));    // next iteration
    .loading-mixin(extract(@browserlist, @counter));
  }
  .loading-mixin(@browser) {
    -@{browser}-transform: rotate(0deg) translateZ(0);
    -@{browser}-transition-duration: 0ms;
    -@{browser}-animation-name: loading;
    -@{browser}-animation-duration: 2s;
    -@{browser}-animation-iteration-count: infinite;
    -@{browser}-animation-timing-function: linear;
    -@{browser}-background-size: 40px 40px;
    -@{browser}-transition-property: -webkit-transform;
  }

  /* http请求加载中效果 */
  .loading {
    display: block;
    width: 40px;
    height: 40px;
    background-position: 0 100%;
    background: url(../../assets/images/loading.png) 0 0 no-repeat;
    background-size: 40px 40px;
    .loop(3);
  }
  /*chrome*/
  @-webkit-keyframes loading {
    from {
      -webkit-transform: rotate(0deg) translateZ(0);
    }
    to {
      -webkit-transform: rotate(360deg) translateZ(0);
    }
  }
  @-webkit-keyframes idle {
    from {
      -webkit-transform: rotate(0deg) translateZ(0);
    }
    to {
      -webkit-transform: rotate(0deg) translateZ(0);
    }
  }
  /*ff*/
  @-moz-keyframes loading {
    from {
      -moz-transform: rotate(0deg) translateZ(0);
    }
    to {
      -moz-transform: rotate(360deg) translateZ(0);
    }
  }
  @-moz-keyframes idle {
    from {
      -moz-transform: rotate(0deg) translateZ(0);
    }
    to {
      -moz-transform: rotate(0deg) translateZ(0);
    }
  }
  /*opera*/
  @-o-keyframes loading {
    from {
      -o-transform: rotate(0deg) translateZ(0);
    }
    to {
      -o-transform: rotate(360deg) translateZ(0);
    }
  }
  @-o-keyframes idle {
    from {
      -o-transform: rotate(0deg) translateZ(0);
    }
    to {
      -o-transform: rotate(0deg) translateZ(0);
    }
  }
  @keyframes loading {
    from {
      -webkit-transform: rotate(0deg) translateZ(0);
    }
    to {
      -webkit-transform: rotate(360deg) translateZ(0);
    }
  }
  @keyframes idle {
    from {
      -webkit-transform: rotate(0deg) translateZ(0);
    }
    to {
      -webkit-transform: rotate(0deg) translateZ(0);
    }
  }
  .popup {
    position: fixed;
    width: 100%;
    height: 100%;
    background:rgba( 0, 0, 0, 0.5);
    top:0;
    left:0;
    z-index: 9997;
    .popup_content {
      background-color: #fff;
      border-radius:5px;
      -moz-border-radius:5px;
      margin: auto;
      max-height: 90%;
      max-width: 90%;
      overflow-y: auto;
    }

    &.load {
      background:rgba( 0, 0, 0, 0);
      .popup_content {
        background:rgba( 45, 45, 46, 0.8);
        width: 155px; height: 125px;
        border-radius:10px;
        -moz-border-radius:10px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
      .popup_text {
        padding-top: 30px;
      }
      .loading {
       margin:0 auto 20px;
     }
     .text{
      font-size: 11pt;
      text-align: center;
      color: #fff;
    }
  }

  &.hide {
    display: none;
  }
}
</style>
