<template>
  <div class="home-header">
    <swiper :options="swiperOptionHeader">
      <swiper-slide>
        <img src="http://i0.article.fd.zol-img.com.cn/t_s800x400/g5/M00/08/02/ChMkJlll-haIaK2LAADnGb2bt00AAeb7wOieE4AAOcx943.jpg" class="home-header_img" />
      </swiper-slide>
      <swiper-slide>
        <img src="http://i0.article.fd.zol-img.com.cn/t_s800x400/g5/M00/08/03/ChMkJ1lmEKSIEknRAADAKkKMEFoAAecIgGROVsAAMBC070.jpg" class="home-header_img" />
      </swiper-slide>
      <swiper-slide>
        <img src="http://i0.article.fd.zol-img.com.cn/t_s800x400/g5/M00/06/0F/ChMkJ1lkn6qIKAiBAAMxxb5hnywAAeXGwJJ8LAAAzHd569.jpg" class="home-header_img" />
      </swiper-slide>
      <swiper-slide>
        <img src="http://i0.article.fd.zol-img.com.cn/t_s800x400/g5/M00/06/0F/ChMkJ1lkoACIBW7EAAMcCcH_adkAAeXHAEghhIAAxwh224.jpg" class="home-header_img" />
      </swiper-slide>
      <swiper-slide>
        <img src="http://pic.zol-img.com.cn/201707/chinajoy_0712.jpg" class="home-header_img" />
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-color" slot="pagination"></div>
    </swiper>
    <div class="hide">{{userName}}</div>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOptionHeader: {
          autoplay: 3000,
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          paginationClickable: true,
          paginationType: 'fraction',
          loop: true
        },
        userName: ''
      }
    },
    mounted () {
      setTimeout(() => {
        this.userName = 'dalin'
      }, 0)
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/less/variables";

  .swiper-slide {
    height: 3.76rem;
    color: white;
  }

  .swiper-pagination-color {
    color: @bg-white;
    text-align: right !important;
    width: 98% !important;
    font-size: 16px;
  }

  .home-header {
    &_img {
      width: 100%;
    }

    &__notice {
      height: 0.9rem;
      display: flex;
      align-items: center;
      background-color: @bg-white;

      &_img {
        flex: 0 0 1.1rem;

        img {
          width: 0.6rem;
          padding-left: 0.2rem;
          padding-top: 0.05rem;
        }
      }

      &_text {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      &_time {
        flex: 0 0 1.6rem;
        padding-right: 0.2rem;
        text-align: right;
      }
    }
  }
</style>
