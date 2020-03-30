<template>
  <div>
    <NavbarWhite class="fixed-top"></NavbarWhite>
<!-- 形象首頁 -->
    <div class="container-fluid position-relative">
      <div class="row">
        <!-- 左 -->
        <div class="col-lg-10 index-jumbotrom-bg bg-cover w-100 vh-100">
        </div>
        <!-- 右 -->
        <div class="col-lg-2 d-none d-lg-flex flex-column font-weight-bolder pr-2 pb-3">
          <p class="text-vertical mt-80 mb-auto h5 wow fadeIn index-animated-duration">Delighting You Always</p>
          <p class="text-vertical h5 wow fadeIn">Life's good!</p>
        </div>
      </div>
      <div class="d-none d-lg-block bg-primary index-block-bg bg-cover wow fadeInRight">
      </div>
      <img class="index-mouse" src="../../assets/image/index_mouse.png" alt="">
    </div>
<!-- 熱賣商品 -->
    <div class="index-hot p-5">
    	<div class="container text-center">
    	  <div class="index-title mt-3">
    	    <h3 class="wow slideInUp mb-0">熱賣商品</h3>
    	  </div>
    	  <div class="row  justify-content-center mb-4">
    	    <div class="col-md-10">
    	      <div class="row">
    	        <div class="col-lg-4 col-sm-6 mb-3" v-for="item in topProducts" :key="item.id">
    	          <div class="card h-100">
                  <span class="badge badge-danger index-hot-badge">{{`Top ${item.top}`}}</span>
    	            <div class="card-body pb-0">
    	              <img :src="item.imageUrl" class="card-img-top" alt="product-image">
    	              <h5 class="card-title">{{item.title}}</h5>
    	            </div>
    
    	            <div class="card card-content bg-primary-opacity text-white card-slideInUp"><!--父-->
    	              <div class="card-body d-flex justify-content-center"><!--子-->
    	                <button type="button" class="btn btn-outline-light align-self-center">點擊前往</button>
    	              </div>
    	            </div>
    	          </div>
    	        </div>
    	      </div>
    	    </div>
    	  </div>
    	</div>
    </div>
<!-- 優惠券介紹 -->
    <div class="index-couponIntro-bg d-flex justify-content-center align-items-center position-relative">
      <div class="wow rotateIn index-couponIntro text-center text-white" data-wow-delay=".2s">
        <h3 class="index-couponIntro-title">周末限定折扣</h3>
        <p class="index-couponIntro-rebate">
          <strong>50%</strong> OFF
        </p>
        <p class="index-couponIntro-text">
          不論天氣好壞，老闆期許
          <br>
          大家能帶著相機寶貝出門踏踏青、拍拍照
        </p>
      </div>
        <a href="#" class="wow pulse index-couponIntro-link"><i class="fas fa-angle-double-right"></i> 每天都有小確幸，點我查看詳情</a>
    </div>
<!-- 最新消息 -->
    <div class="container text-center p-5">
      <div class="index-title mt-3">
        <h3 class="wow slideInUp mb-0">最新消息</h3>
      </div>
      <div class="row mb-3">
        <div class="col-12 index-news">
          <ul>
            <li v-for="(item, index) in latestNews" :key="index" class="text-left">
              <p class="d-block d-md-inline-block">{{item.date}}</p>
              <p class="d-block d-md-inline-block">{{item.content}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
<!-- 購買流程-重新規劃 -->
  <div class="index-buyflow p-5">
    <div class="container text-center">
      <div class="index-title mt-3">
        <h3 class="wow slideInUp mb-0">購買流程</h3>
      </div>
      <div class="row index-buyflow-content border"><!-- no-gutters-->
        <div class="col-4 item">
          <img src="../../assets/image/index_process_bag.png" alt="bagIcon">
          <p class="item-num">1</p>
          <p class="item-text">加入購物車</p>
        </div>
        <div class="col-4 item">
          <img src="../../assets/image/index_process_order.png" alt="orderIcon">
          <p class="item-num">2</p>
          <p class="item-text">建立訂單</p>
        </div>
        <div class="col-4 item">
          <img src="../../assets/image/index_process_pay.png" alt="creditcardIcon">
          <p class="item-num">3</p>
          <p class="item-text">確認付款</p>
        </div>
      </div>
    </div>
  </div>
<!-- 相片庫 -->
  <div class="container-lg p-5 index-photoLibarary">
    <div class="row mb-3">
      <div class="col-6">
        <div class="item-pic1 bg-cover"></div>
      </div>
      <div class="col-6">
        <div class="row">
          <div class="col-6 pl-0">
            <div class="item-pic2 bg-cover"></div>
          </div>
          <div class="col-6 d-flex flex-column pl-0">
            <div class="item-pic3 bg-cover"></div>
            <div class="item-pic4 bg-cover"></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-3">
        <div class="item-pic5 bg-cover"></div>
      </div>
      <div class="col-9">
        <div class="row">
          <div class="col-4">
            <div class="item-pic6 bg-cover"></div>
          </div>
          <div class="col-8">
            <div class="item-pic7 bg-cover"></div>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="item-pic8 bg-cover"></div>
          </div>
          <div class="col-4">
            <div class="item-pic9 bg-cover"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
<!-- 訂閱電子報 -->
<!-- footer -->
  </div>
</template>

<script>
import WOW from 'wow.js';

export default {
  name: 'Home',
  data () {
    return {
      topProducts:[],
      latestNews:[],
    }
  },
  methods:{
    getTopProducts(){
      const vm = this;
      this.$http.get('../../../static/topProducts.json').then((re) => {
        vm.topProducts = re.data;
      })
    },
    getLatestNews(){
      const vm = this;
      this.$http.get('../../../static/lastestNews.json').then((re) => {
        vm.latestNews = re.data;
      })
    }
  },
  created(){ 
    this.getTopProducts();
    this.getLatestNews();
  },
  mounted(){
    new WOW().init();
}
}
</script>

<style>
.index-mouse{
  width: 50px;
  height: 50px;
  position: absolute;
  bottom:0;
  left:50%;
  transform: translateX(-50%);
  opacity: .5;
}
.index-mouse:hover{
  opacity: 1;
}
/* animate.css 客製化 */
/* .index-animated-duration{
  animation-duration: 1s;
} */
</style>
