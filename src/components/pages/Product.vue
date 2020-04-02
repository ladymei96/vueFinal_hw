<template>
  <div>
    <NavbarDark></NavbarDark>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div><!--資料更動區-->
        <div class="text-center mb-4">
          <h1 class="h2 title-border-bottom d-inline-block pb-2">{{product.title}}</h1>
        </div>
        <div class="row">
          <div class="col-lg-6 text-center">
            <a href="#" @click.prevent="judgeFavorite"><i class="fa-heart fa-2x position-absolute" :class="heartIcon"></i></a>
            <img :src="product.imageUrl" class="img-fluid" alt="">
          </div>
          <div class="col-lg-6 product-item">
            <div class="product-text">
              <p>{{product.description}}</p>
            </div>
            
            <div class="product-price">
              <div class="text-right mb-3">
                <span class="h3 font-weight-bolder">{{product.price | currency}}</span>
                <span class="h5 text-muted ml-2"><del>{{product.origin_price  | currency}}</del></span>
              </div>

              <div class="input-group">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary px-sm-5" type="button" @click.prevent="minNum">-</button>
                </div>
                <input type="tel" class="form-control text-center border-1px" v-model.number="productNum" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4">
                <div class="input-group-append" id="button-addon4">
                  <button class="btn btn-outline-secondary px-sm-5" type="button" @click.prevent="productNum++">+</button>
                  <button class="btn btn-secondary font-weight-bolder" type="button" @click.prevent="addtoCart(productNum)">加到購物車</button>
                </div>
              </div>  
            </div>

          </div>
        </div>
      </div>
      
      <a class="h3 d-inline-block" href="#" @click.prevent="goBack">back</a>
<!--內容固定區-->
      <div class="row product-technology">
        <div class="col-lg-4">
          <h2>追求巔峰的工程設計</h2>
          <p>
            在追求卓越的影像品質上，讓影像解析度及邊緣達到全所未有的提升。搭載最新且強大的影像處理引擎，讓功能全面升級，從解析度道色彩重現到降低造點，遠比前幾代機種優秀許多。
          </p>
        </div>
        <div class="col-8">
          <div class="row no-gutters">
            <div class="col-4 d-flex flex-column">
              <div class="product-item-num">
                01
              </div>
              <div class="product-item-title">
                最新影像處理
              </div>
              <div class="product-item-text">
                EXPEED影像處理器搭配前端大型積體電路晶片，可將高解析度感光元件的性能提升到極致。
              </div>
              <img src="" class="product-item-text-pic" alt="">
            </div>
            <div class="col-4 d-flex flex-column">
              <div class="product-item-num">
                02
              </div>
              <div class="product-item-title">
                內建五軸穩定系統
              </div>
              <div class="product-item-text">
                機身內建五軸影像穩定器，演算法經過最佳化，可讓高解析度感光元件帶來最佳性能表現。
              </div>
              <img src="" class="product-item-text-pic" alt="">
            </div>
            <div class="col-4 d-flex flex-column">
              <div class="product-item-num">
                03
              </div>
              <div class="product-item-title">
                背罩式感光元件
              </div>
              <div class="product-item-text">
                全新開發的Exmor R CMOS感光元件具有無可匹敵的高解析度。
              </div>
              <img src="" class="product-item-text-pic" alt="">
            </div>

          </div>
        </div>
      </div>
<!-- 極致操控性能 -->
      <div class="row mb-3">
        <div class="col-md-6 p-3">
          <h2>極致操控性能</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ea itaque sunt dignissimos deserunt, illo, velit dolor atque aspernatur repellat cupiditate vitae. Alias, cupiditate illum veritatis qui possimus, deserunt, excepturi labore quae assumenda aut inventore placeat velit? Possimus, fuga quo?</p>
        </div>
        <div class="col-md-6">
          <div class="h-md-100 h-260 description-bg-1 bg-cover" ></div>
        </div>
      </div>
<!-- 細膩超乎想像 -->
      <div class="description-bg-2 bg-cover text-white mb-5">
          <div class="row h-100 align-items-center">
            <div class="col-lg-5 col-md-6 mx-3">
              <div class="bg-none bg-sm-white text-sm-black p-3">
                <h2>細膩超乎想像</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore illo vero adipisci maxime eligendi omnis quia, natus quae fugiat officiis reiciendis rem perspiciatis recusandae eaque laborum voluptatibus, porro tempore a.</p>
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
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quas illo mollitia vel dolores dicta modi adipisci perspiciatis, amet placeat.</p>
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
          <div class="card h-100" v-for="item in filterData" :key="item.id">
            <div class="card-body pb-0">
              <img :src="item.imageUrl" class="card-img-top" alt="product-image">
              <h5 class="card-title">{{item.title}}</h5>
            </div>
          </div>
          <!-- <div class="card h-100">
            <div class="card-body pb-0">
              <img :src="filterData[0].imageUrl" class="card-img-top" alt="product-image">
              <h5 class="card-title">{{filterData[0].title}}</h5>
            </div>
          </div>
          <div class="card h-100">
            <div class="card-body pb-0">
              <img :src="filterData[1].imageUrl" class="card-img-top" alt="product-image">
              <h5 class="card-title">{{filterData[1].title}}</h5>
            </div>
          </div>
          <div class="card h-100">
            <div class="card-body pb-0">
              <img :src="filterData[2].imageUrl" class="card-img-top" alt="product-image">
              <h5 class="card-title">{{filterData[2].title}}</h5>
            </div>
          </div> -->

          <!-- <img src="https://picsum.photos/500/200?random=1" alt="">
          <img src="https://picsum.photos/500/200?random=2" alt="">
          <img src="https://picsum.photos/500/200?random=3" alt="">
          <img src="https://picsum.photos/500/200?random=4" alt="">
          <img src="https://picsum.photos/500/200?random=5" alt=""> -->
        </slick>
      </div>
    </div><!--container-->
    <Gotop :window-scroll="scrollPos" />
    <Footer></Footer>
  </div>
</template>

<script>
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
import $ from 'jquery';
export default {
  name: 'Product',
  data () {
    return {
      productId:'',
      product:{},
      products:[],
      favoriteItem:JSON.parse(localStorage.getItem('favoriteItemId')) || [],
      productNum: 1,
      isLoading:false,
      scrollPos:0,
    // 相關產品-輪播
      slickOptions: {
        slidesToShow: 4,//一次顯示幾個
        slidesToScroll: 1,//切換下一頁時移動幾個
        //基本設定
        //dots: true, //項目點點，預設為false
        arrows: true, //上下箭頭，預設為true
        autoplay: true, //自動撥放
        // autoplaySpeed: 500, //自動撥放的切換速率，單位毫秒
        // speed: 500, //切換速率，單位毫秒
        // easing: 'linear', //滑動效果頻率，和animate設定值一樣，預設為linear
        // fade: true, //切換改為fadeIn方式，預設為false
        // infinite: true, //是否要loop，預設為true
        //RWD設定
        // responsive: [
        //   {
        //     breakpoint: 1024, // RWD在1024寬度時切換顯示數量
        //     settings: {
        //       slidesToShow: 3, //一次顯示3個
        //       slidesToScroll: 3,//切換下一頁時移動3個
        //     }
        //  },{
        //     breakpoint: 600,// RWD在600寬度時切換顯示數量
        //     settings: {
        //       slidesToShow: 2,//一次顯示2個
        //       slidesToScroll: 2,//切換下一頁時移動2個
        //     }
        //  },
        // ]
      },
    }
  },
  components:{
    Slick,
  },
  methods:{
    next() {
      this.$refs.slick.next();
    },
    prev() {
      this.$refs.slick.prev();
    },
    reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
    getProduct(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`;
      this.isLoading = true;
      this.$http.get(api).then((re) => {
        // console.log(re);
        vm.isLoading = false;
        vm.product = re.data.product;
        vm.getProducts();
      })
    },
    getProducts(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.$http.get(api).then((re) => {
        vm.products = re.data.products;
      })
    },
    addtoCart(qty){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cart = {
        product_id:vm.productId,
        qty,
      };
      this.isLoading = true;
      this.$http.post(api, {data:cart}).then((re) => {
        if(re.data.success){
          this.$bus.$emit('Navbar:updateCart');
          vm.isLoading = false;
        }
      })
    },
    judgeFavorite(){
      const vm = this;
      if(this.favoriteItem.indexOf(this.productId) == -1){
        this.favoriteItem.push(this.productId);
      }else{
        this.favoriteItem.splice(this.favoriteItem.indexOf(this.productId), 1);
      }
      //將更新過的favoriteItem存到localStorage內，並傳給navbar
      localStorage.setItem('favoriteItemId', JSON.stringify(this.favoriteItem));
      this.$bus.$emit('Navbar:updateFavoriteItem', this.favoriteItem);
    },
    minNum(){
      if(this.productNum < 2){
        this.productNum = 1;
      }else{
        this.productNum-=1;
      }
    },
    goBack(){
      this.$router.push('/products');
    },
    productDetail(id){
      this.$router.push(`/product/${id}`);
    },
  },
  computed:{
    heartIcon(){
      return this.favoriteItem.indexOf(this.productId) != -1 ? 'fas' : 'far'
    },
    filterData(){
      const vm = this;
      let filtered = this.products.filter((item) => {
        return item.category == vm.product.category
      })
      return filtered
    }
  },
  // watch:{
  //   filterData(){
  //     if(this.filterData.length>0){
  //       $('.slick').slick({
  //         infinite: true,
  //         slidesToShow: 3,
  //         slidesToScroll: 1
  //       })
  //     }
  //   }
  // },
  created(){
    const vm = this;
    this.productId = this.$route.params.productId;
    this.getProduct();
    this.$bus.$on('Product:updateFavoriteItem',(newFavoriteItem)=>{
      vm.favoriteItem = newFavoriteItem;
    })
  },
  mounted(){
    const vm = this;
    $(window).scroll(function(){
      let scrollPos = $(window).scrollTop();
      vm.scrollPos = scrollPos;
    });
  },
  beforeDestroy(){
    this.$bus.$off('Product:updateFavoriteItem');
  }
}
</script>

<style>
@media (min-width: 576px) {
  .bg-sm-white{
    background-color: #fff;
  }
  .text-sm-black{
    color:#000;
  }
}
@media (min-width: 768px) {
  .h-md-100{
    height:100%;
  }
}
.h-260{
  height:260px;
}
.title-border-bottom{
  border-bottom: 3px solid #000;
}
.border-1px{
  border: 1px solid #000;
}

.product-item{
  display: flex;
  flex-direction: column;
}
.product-text{
  flex:1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.product-text p{
  font-size: 20px;
  text-indent:2em;
  text-align: justify;
  line-height: 2rem;
}
.product-price{
  flex:0 0 auto;
}
/* .btn:hover{
  background-color: rgb(90, 90, 90);
} */

</style>
