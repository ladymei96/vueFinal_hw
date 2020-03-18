<template>
  <div>
    <NavbarWhite></NavbarWhite>
    <div class="bg-coupon bg-cover d-flex flex-column justify-content-center"><!--over是防止父層吃子層的margin-->
      <div class="container border"> <!--固定寬度容器-->
        <swiper :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide class="swiper-slide-bg">
            <div class="card text-center h-100 bg-transparent p-5">
              <div class="card-body text-white">
                <p class="card-text">Shoot everyday</p>
                <h5 class="card-title">會帶出門才是好相機</h5>
                <p class="card-text">周末限定</p>
                <div class="percent">
                  <p class="card-text display-3">50% OFF</p>
                </div>
              </div>
              <div class="py-2 text-dark bg-white">
                lucky777
              </div>
            </div>
          </swiper-slide>

          <swiper-slide class="swiper-slide-bg">
          </swiper-slide>
          <swiper-slide class="swiper-slide-bg">
          </swiper-slide>
          <!-- Optional controls -->
          <!-- 上一頁 -->
          <div class="swiper-button-prev" slot="button-prev"></div>
          <!-- 下一頁 -->
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
        <div>
          <button class="btn btn-secondary">SHOP NOW</button>
        </div>
      </div>
    </div>
    <Footer class="footer"></Footer>
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
        // direction: 'horizontal',
        autoplay:false,//自行滑動
        loop:true,
        speed:1000,
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: true,
        mousewheel: true,//鼠標滾輪控制swiper
        navigation:{
          nextEl:'.swiper-button-next',
          prevEl:'.swiper-button-prev',
        },
      },
    }
  },
  components: {
    swiper,
    swiperSlide
  },
}
</script>

<style>
  .bg-coupon{
    background-image: url(../../assets/image/coupons_bg.jpg);
    width: 100%;
    height: 100vh;
  }
  .swiper-container {
    width: 100%;
    /* height: 100%; 會吃掉btn區塊的高*/
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: rgb(121, 34, 34);

    /* Center slide text vertically */
    /* display: flex;
    justify-content: center;
    align-items: center; */
    transition:transform 300ms;
    transform: scale(0.8);
  }
  .swiper-slide-active,.swiper-slide-duplicate-active{
    transform: scale(1);
  }

  .swiper-slide-bg{
    background-image: url(../../assets/image/coupon_card.jpg);
    height: 450px;
    background-position: center center;
    background-size:cover;
  }
  .percent p{
    position: relative;/*偽元素使用*/
  }
/*折扣碼旋轉色塊*/
  .percent p:after{
    content:'';
    display:block;
    background-color:#10161e;/*整合時記得改*/
    height: 60px;
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: -1;
    transform: rotate(-5deg);
  }
  .footer{
    position: fixed;
    bottom: 0;
    z-index: 2;
    width: 100%;
  }
</style>
