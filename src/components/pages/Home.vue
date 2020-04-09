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
    <div class="index-hot p-5"><!--區塊架構：帶背景色-->
    	<div class="container text-center">
    	  <div class="index-title mt-3">
    	    <h3 class="wow slideInUp">熱賣商品</h3>
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
    	                <button type="button" class="btn btn-outline-light align-self-center" @click.prevent="productDetail(item.id)">點擊前往</button>
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
        <a href="#" class="wow pulse index-couponIntro-link" @click.prevent="goCoupons"><i class="fas fa-angle-double-right"></i> 每天都有小確幸，點我查看詳情</a>
    </div>
<!-- 最新消息 -->
    <div class="container text-center p-5"><!--區塊架構：沒有背景色-->
      <div class="index-title mt-3">
        <h3 class="wow slideInUp">最新消息</h3>
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
<!-- 購買流程-排版還要再優化 -->
    <div class="index-buyflow p-5">
      <div class="container text-center">
        <div class="index-title mt-3">
          <h3 class="wow slideInUp">購買流程</h3>
        </div>
        <div class="row index-buyflow-content mb-3"><!-- no-gutters-->
          <div class="col-4 item">
            <img src="../../assets/image/index_process_bag.png" alt="bagIcon">
            <!-- <p class="item-num item-doc">1</p> -->
            <p class="item-text item-text-1">加入購物車</p>
          </div>
          <div class="col-4 item">
            <img src="../../assets/image/index_process_order.png" alt="orderIcon">
            <!-- <p class="item-num item-doc">2</p> -->
            <p class="item-text item-text-2">建立訂單</p>
          </div>
          <div class="col-4 item">
            <img src="../../assets/image/index_process_pay.png" alt="creditcardIcon">
            <!-- <p class="item-num item-doc">3</p> -->
            <p class="item-text item-text-3">確認付款</p>
          </div>
        </div>
      </div>
    </div>
<!-- 相片庫 -->
    <div class="container-lg p-5 index-photoLibarary"><!--RWD p-5-->
      <div class="item item-pic1"></div>
      <div class="item item-pic2"></div>
      <div class="item item-pic3"></div>
      <div class="item item-pic4"></div>
      <div class="item item-pic5"></div>
      <div class="item item-pic6"></div>
      <div class="item item-pic7"></div>
      <div class="item item-pic8"></div>
      <div class="item item-pic9"></div>
    </div>
<!-- 訂閱電子報 -->
    <div class="index-subscribe py-5">
      <div class="container text-center">
        <div class="index-title mt-3">
          <h3 class="wow slideInUp">訂閱電子報</h3>
        </div>
        <div class="row justify-content-center mb-1">
          <div class="col-lg-8">
            <form class="index-subs">
              <input type="email" placeholder="your@email.com" v-model="customerEmail">
              <input type="submit" @click.prevent="subsUs" value="訂閱電子報">
            </form >
            <p class="index-subs-message" :class="{'index-subs-message-visibility':errorMessage}">錯誤，須為有效的電子信箱</p><!--v-show="errorMessage"-->
          </div>
        </div>
      </div>
    </div>
<!-- footer -->
    <Message></Message>
    <Gotop :window-scroll="scrollPos" />
    <Footer></Footer>
  </div>
</template>

<script>
import WOW from 'wow.js';
import Message from '../ScreenFull_message';
import latestNews from '../../lastestNews.json';
import topProducts from '../../topProducts.json';

export default {
  name: 'Home',
  components:{
    Message,
  },
  data () {
    return {
      topProducts,
      latestNews,
      scrollPos:0,
      customerEmail:'',
      errorMessage:false,
    }
  },
  computed:{
    judgeEmail(){//判斷客戶輸入字串，是否符合信箱格式
      let isMail =  /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      return isMail.test(this.customerEmail) ? this.customerEmail : null
    },
  },
  watch:{
    customerEmail(){
      if(this.judgeEmail == null && this.customerEmail != ''){
        this.errorMessage = true;
      }else{
        this.errorMessage = false;
      }
    }
  },
  methods:{
    productDetail(id){
      this.$router.push(`/product/${id}`);
    },
    goCoupons(){
      this.$router.push('/coupons');
    },
    subsUs(){
      if(this.judgeEmail !== null){
        this.$bus.$emit('message:show');
        this.customerEmail = '';
      }
    }
  },
  created(){ 

  },
  mounted(){
    const vm = this;
    $(window).scroll(function(){
      let scrollPos = $(window).scrollTop();
      vm.scrollPos = scrollPos;
    });
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
  animation-name:move;
  animation-duration: 1.5s;
  animation-iteration-count:infinite;
  animation-timing-function: linear;
}
@keyframes move{
  0%{
    bottom:0;
    opacity: .5;
  }
  50%{
    bottom:10px;
    opacity: 1;
  }
  100%{
    bottom:0;
    opacity: .5;
  }
}
</style>
