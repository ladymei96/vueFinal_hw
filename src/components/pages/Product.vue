<template>
  <div>
    <NavbarDark></NavbarDark>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div class="mb-5"><!--資料更動區-->
        <div class="text-center mb-4">
          <h1 class="h2 title-border-bottom d-inline-block pb-2">{{ product.title }}</h1>
        </div>
        <div class="row">
          <div class="col-lg-6 text-center">
            <a href="#" @click.prevent="judgeFavorite"><i class="fa-heart fa-2x position-absolute" :class="heartIcon"></i></a>
            <img :src="product.imageUrl" class="img-fluid" alt="">
          </div>
          <div class="col-lg-6 product-item">
            <div class="product-text">
              <p>{{ product.description }}</p>
            </div>
            
            <div class="product-price">
              <div class="text-right mb-3">
                <span class="h3 font-weight-bolder">{{ product.price | currency }}</span>
                <span class="h5 text-muted ml-2"><del>{{ product.origin_price | currency }}</del></span>
              </div>

              <div class="input-group">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary px-sm-5" type="button" @click.prevent="changeNum(-1)">-</button>
                </div>
                <input type="tel" class="form-control text-center border-1px" v-model.number="productNum" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4">
                <div class="input-group-append" id="button-addon4">
                  <button class="btn btn-outline-secondary px-sm-5" type="button" @click.prevent="changeNum(1)">+</button>
                  <button class="btn btn-secondary font-weight-bolder" type="button" @click.prevent="addtoCart">加到購物車</button>
                </div>
              </div>  
            </div>

          </div>
        </div>
      </div>
      
      <a class="h3 d-inline-block" href="#" @click.prevent="goBack">back</a>
<!--內容固定區-->
      <div class="row product-technology mb-5">
        <div class="col-lg-4 align-self-center">
          <h2 class="text-center">追求巔峰的工程設計</h2>
          <p>
            在追求卓越的影像品質上，讓影像解析度及邊緣達到全所未有的提升。搭載最新且強大的影像處理引擎，讓功能全面升級，從解析度道色彩重現到降低造點，遠比前幾代機種優秀許多。
          </p>
        </div>
        <div class="col-lg-8">
          <div class="row no-gutters">
            <div class="col-md-4" v-for="item in productIntro" :key="item.title">
              <div class="card h-100 border-0">
                <div class="card-header">
                  <p class="item-num text-center text-lg-left">{{ item.num }}</p>
                  <h5 class="card-title item-title text-center text-lg-left">{{ item.title }}</h5>
                </div>
                <div class="card-body">
                  <p class="h5 mb-0">
                    {{ item.description }}
                  </p>              
                </div>
                <div class="card-footer">
                  <img :src="item.imageUrl" class="product-item-text-pic img-fluid" alt="">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<!-- 極致操控性能 -->
      <div class="row mb-5">
        <div class="col-md-6 p-3 align-self-center">
          <h2>極致操控性能</h2>
          <p>您可透過檢視播放顯示，當場給予影像星等評分或是設定影像保護。還有每 10/100 張相片跳出顯示功能，以及群組檢視連拍相片功能，為您帶來額外便利性。獲得 提升的選單介面
          選單畫面上的自訂按紐設定示意圖能讓您更容易瞭解使用方式。此外，只需單手撥動前轉盤或是按下 Fn 按鈕，就能在選單標籤之間切換。</p>
        </div>
        <div class="col-md-6">
          <div class="description-height description-bg-1 bg-cover" ></div>
        </div>
      </div>
<!-- 細膩超乎想像 -->
      <div class="description-bg-2 bg-cover text-white mb-5">
          <div class="row h-100 align-items-center">
            <div class="col-lg-5 col-md-6 mx-3">
              <div class="bg-none bg-sm-white text-sm-black p-3">
                <h2>細膩超乎想像</h2>
                <p>6,100 萬像素全片幅 Exmor R™ CMOS 感光元件搭配 BIONZ X™ 影像處理引擎，達成前所未有的解析度、精細的階調與低雜訊，開啟細節的全新境界，滿足專業攝影師的期待。α7R IV 能捕捉每個場景的情緒，以及主體的紋理。</p>
              </div>
            </div>
          </div>
      </div>
<!-- 成像無與倫比 -->
      <div class="description-bg-3 bg-cover text-white mb-5">
        <div class="row h-100 justify-content-end align-items-center">
          <div class="col-lg-5 col-md-6 mx-3">
            <div class="bg-none bg-sm-white text-sm-black p-3">
              <h2>成像無以倫比</h2>
              <p>高達 ISO 51200 的高感光度性能與演算法革新，能夠呈現更流暢的影像表現效果，包含自然的肌膚顏色、在天空等區域呈現柔和色調等。支援 14 位元 RAW 輸出。 </p>
            </div>
          </div>
        </div>
      </div>
<!-- 相關商品 -->
      <div class="text-center py-5">
        <div class="product-intro-title mt-3">
          <h3>猜您也喜歡</h3>
        </div>
        <slick ref="slick" :options="slickOptions" v-if="filterData.length">
          <div class="card border-0" v-for="item in filterData" :key="item.id">
            <div class="card-body card-padding-bottom">
              <img :src="item.imageUrl" class="card-img-top" alt="product-image">
            </div>
            <div class="card card-content bg-primary-opacity text-white card-slideInUp">
              <div class="card-body d-flex flex-column justify-content-center">
                <h5 class="card-title">{{ item.title }}</h5>
                <button type="button" class="btn btn-outline-light align-self-center" @click.prevent="anotherProduct(item.id)">點擊前往</button>
              </div>
            </div>
          </div>
        </slick>
      </div>
    </div><!--container-->
    <Message :cart-message="cartSuccessMessage"></Message>
    <Gotop :window-scroll="scrollPos" />
    <Footer></Footer>
  </div>
</template>

<script>
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
import Message from '../ScreenFull_message';
import productIntro from '../../productIntro.json';
export default {
  name: 'Product',
  components:{
    Slick,
    Message,
  },
  data () {
    return {
      productIntro,
      productId:'',
      product:{},
      products:[],
      favoriteItem:JSON.parse(localStorage.getItem('favoriteItemId')) || [],
      productNum: 1,
      cartSuccessMessage:'',
      isLoading:false,
      scrollPos:0,
    // 相關產品-輪播
      slickOptions: {
        // 基本設定
        slidesToShow: 4,// 一次顯示幾個
        slidesToScroll: 2,// 切換下一頁時移動幾個
        dots: true, // 項目點點，預設為false
        arrows: false, // 上下箭頭，預設為true
        autoplay: false, // 自動撥放
        autoplaySpeed: 500, // 自動撥放的切換速率，單位毫秒
        speed: 1500, // 切換速率，單位毫秒
        infinite: false, // 是否要loop，預設為true
        // RWD設定
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 2,
            }
         },{
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
         },
        ]
      },
    }
  },
  computed:{
    heartIcon(){
      return this.favoriteItem.indexOf(this.productId) != -1 ? 'fas' : 'far'
    },
    filterData(){
      return this.products.filter((item) => {
        return item.category == this.product.category
      })
    },
  },
  methods:{
    next() {
      this.$refs.slick.next();
    },
    prev() {
      this.$refs.slick.prev();
    },
    getProduct(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${this.productId}`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        this.isLoading = false;
        this.product = response.data.product;
      }).catch((err) => {
        console.log(err);
      })
    },
    getProducts(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.$http.get(api).then((response) => {
        this.products = response.data.products;
      })
    },
    addtoCart(){
      if(this.productNum < 1) {
        this.productNum = 1;
        return false;
      }
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id: this.productId,
        qty: this.productNum,
      };
      this.isLoading = true;
      this.$http.post(api, {data:cart}).then((response) => {
        if(response.data.success){
          this.$bus.$emit('Navbar:updateCart');
          this.isLoading = false;
          this.cartSuccessMessage = '已加入購物車';
          this.productNum = 1;
        }
        setTimeout(() => {
          this.cartSuccessMessage = '';
        }, 2000)
      }).catch((err) => {
        console.log(err);
      });
    },
    judgeFavorite(){
      if(this.favoriteItem.indexOf(this.productId) === -1){
        this.favoriteItem.push(this.productId);
      }else{
        this.favoriteItem.splice(this.favoriteItem.indexOf(this.productId), 1);
      }
      //將更新過的favoriteItem存到localStorage內，並傳給navbar
      localStorage.setItem('favoriteItemId', JSON.stringify(this.favoriteItem));
      this.$bus.$emit('Navbar:updateFavoriteItem', this.favoriteItem);
    },
    changeNum(num){
      let qty = this.productNum + num;
      if(qty < 1){
        this.productNum = 1;
      }else{
        this.productNum = qty;
      }
    },
    goBack(){
      this.$router.push('/products');
    },
    anotherProduct(id){
      this.$router.push(`/product/${id}`);
      let doc = document.documentElement;
      this.productId = id;
      this.getProduct();
      $(doc).animate({scrollTop: 0}, 800);
    },
  },
  created(){
    this.productId = this.$route.params.productId;
    this.getProduct();
    this.getProducts();
    this.$bus.$on('Product:updateFavoriteItem',(newFavoriteItem)=>{
      this.favoriteItem = newFavoriteItem;
    })
  },
  mounted(){
    $(window).scroll(() => {
      let scrollPos = $(window).scrollTop();
      this.scrollPos = scrollPos;
    });
  },
  beforeDestroy(){
    this.$bus.$off('Product:updateFavoriteItem');
  }
}
</script>

<style>

</style>
