<template>
  <div class="coupon-bg bg-cover d-flex flex-column">
    <NavbarWhite class="coupon-nav"></NavbarWhite>

    <div class="container my-5 coupon-main d-flex flex-column justify-content-center">
      <swiper :options="swiperOption" ref="mySwiper" class="mb-4">
        <!-- slides -->
        <swiper-slide class="swiper-slide-bg bg-cover d-flex flex-column text-white p-3 col-lg-4 col-md-6">
          <div class="slide-item-title">
            <p>Shoot everyday</p>
            <h2>璀璨世界由心發現</h2>
            <p>周末限定</p>
          </div>
          <div class="slide-item-discount align-self-center">
            <p><strong>50%</strong> OFF</p>
          </div>
          <div class="slide-item-coupon bg-white text-dark align-self-center px-2">
              <p class="mb-0 slide-item-coupon-use" :class="{'slide-item-coupon-opacity':weekend}">
                NOT TODAY
              </p>
              <p class="mb-0">shoot_everyday</p>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide-bg bg-cover text-white p-3 col-lg-4 col-md-6">
          <div class="d-flex flex-column p-3">
            <div class="slide-item-title border">
              <h2>培養攝影眼</h2>
              <p>專屬星期一</p>
            </div>
            <div class="slide-item-discount align-self-center">
              <p><strong>30%</strong> OFF</p>
            </div>
            <div class="slide-item-coupon bg-white text-dark align-self-center w-50">
              <p class="mb-0 slide-item-coupon-use" :class="{'slide-item-coupon-opacity':OnlyMonday}">
                NOT TODAY
              </p>
              <p class="mb-0">niceEye</p>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-slide-bg bg-cover text-white p-3 col-lg-4 col-md-6">
          <div class="d-flex flex-column p-3 slide-border">
            <div class="slide-item-title">
              <h2>一日一構圖</h2>
              <p>常態性優惠</p>
            </div>
            <div class="slide-item-discount align-self-center">
              <p><strong>20%</strong> OFF</p>
            </div>
            <div class="slide-item-coupon bg-white text-dark align-self-center w-50">
              <p class="mb-0 slide-item-coupon-use" :class="{'slide-item-coupon-opacity':normal}">
                NOT TODAY
              </p>
              <p class="mb-0">dayday1</p>
            </div>
          </div>
        </swiper-slide>
        <!-- Optional controls -->
        <!-- 上一頁 -->
        <div class="swiper-button-prev" slot="button-prev"></div>
        <!-- 下一頁 -->
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <div class="text-center">
        <router-link class="btn btn-primary" to="/products">SHOP NOW</router-link>
      </div>
    </div>

    <Footer class="coupon-footer"></Footer>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  name: 'Coupons',
  data () {
    return {
      swiperOption: {
        autoplay:true,//自行滑動
        loop:true,
        speed:1000,
        slidesPerView: 'auto',
        loopedSlides :3,
        centeredSlides: true,
        mousewheel: true,//鼠標滾輪控制swiper
        navigation:{
          nextEl:'.swiper-button-next',
          prevEl:'.swiper-button-prev',
        },
      },
      today : new Date().getDay(),
      weekend:false,
      normal:false,
      OnlyMonday:false,
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods:{
    judgeDay(){
      if(this.today == 1){
        this.OnlyMonday = true;
      }else if([0, 6].indexOf(this.today) != -1){
        this.weekend = true;
      }else{
        this.normal = true;
      }
    }
  },
  created(){
    this.judgeDay();
  },
}
</script>

<style>
  .coupon-nav{
    flex:0 0 auto;
  }
  .coupon-main{
    flex:1 0 auto;
  }
  .coupon-footer{
    flex: 0 0 auto;
  }
  .swiper-container {
    width: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 20px;
    transition:transform 300ms;
    transform: scale(0.8);
  }
  .swiper-slide-active,.swiper-slide-duplicate-active{
    transform: scale(1);
  }
  .slide-item-discount p{
    font-size: 42px;
    position: relative;/*偽元素使用*/
  }
  .slide-item-discount p strong{
    font-size: 50px;
  }
/*折扣碼旋轉色塊*/
  .slide-item-discount p:after{
    content:'';
    display:block;
    background-color:#10161e;
    height: 40px;
    position: absolute;
    width: 100%;
    bottom: 20%;
    z-index: -1;
    transform: rotate(-8deg);
  }
  .slide-border{
    border:3px solid #fff;
    box-shadow:inset 2px 5px 15px #000;
  }
  .slide-item-coupon{
    position: relative;
  }
  .slide-item-coupon-use{
    position: absolute;
    top:0;
    left:0;
    background-color: #fff;
    width: 100%;
  }
  .slide-item-coupon-opacity{
    opacity: 0;
  }

</style>
