<template>
  <div class="container">
    <swiper :options="swiperOption" ref="mySwiper" class="mt-5">
      <!-- slides -->
      <swiper-slide>
        <img src="https://picsum.photos/450/300?random=1" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="https://picsum.photos/450/300?random=2" alt="">
      </swiper-slide>
      <swiper-slide>
        <img src="https://picsum.photos/450/300?random=3" alt="">
      </swiper-slide>
      <!-- Optional controls -->
      <!-- 標示碼 -->
      <div class="swiper-pagination"  slot="pagination"></div>
      <!-- 上一頁 -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <!-- 下一頁 -->
      <div class="swiper-button-next" slot="button-next"></div>
      <!-- 滾動條 -->
      <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          // direction: 'horizontal',
          autoplay:true,//自行滑動
          loop:true,
          speed:1000,
          // effect:'slide',
          slidesPerView: 3,
          spaceBetween: 400,
          centeredSlides: true,
          mousewheel: true,//鼠標滾輪控制swiper
          navigation:{
            nextEl:'.swiper-button-next',
            prevEl:'.swiper-button-prev',
          },
          // pagination: {
          //   el: '.swiper-pagination',
          //   clickable: true,
          // },
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    },
    computed: {
      // swiper() {
      //   return this.$refs.mySwiper.swiper
      // }
    },
    mounted() {
      // current swiper instance
      // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
      console.log('this is current swiper instance object', this.swiper);
    }
  }
</script>
<style scoped>
  html, body {
    position: relative;
    height: 100%;
  }
  body {
    background: #000;
    font-size: 14px;
    color:#000;
    margin: 0;
    padding: 0;
  }
  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 300ms;
    transform: scale(0.8);
  }
	.swiper-slide-active,.swiper-slide-duplicate-active{
      transform: scale(1);
	}
</style>