<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <NavbarDark :current-page="isProductsPage"></NavbarDark>
<!-- 輪播 -->
    <div id="productsCarouse" class="carousel slide mb-5">
      <ol class="carousel-indicators">
        <li data-target="#productsCarouse" data-slide-to="0" class="active"></li>
        <li data-target="#productsCarouse" data-slide-to="1"></li>
        <li data-target="#productsCarouse" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item carousel-bg-1 carousel-item-height bg-cover active ">
        </div>
        <div class="carousel-item carousel-bg-2 carousel-item-height bg-cover">
        </div>
        <div class="carousel-item carousel-bg-3 carousel-item-height bg-cover">
        </div>
      </div>
      <a class="carousel-control-prev" href="#productsCarouse" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#productsCarouse" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
<!-- 產品分類-選單 -->
    <div class="container text-center mb-md-5 mb-3">
      <div class="list-group list-group-horizontal-md" id="list-tab" role="tablist">
        <a v-for="(listItem, index) in category" :key="listItem" class="list-group-item list-group-item-action" @click.prevent="selectCategory(index)" :class="{'active':index == categoryIndex}" href="#">{{ listItem }} <i class="fas fa-caret-down" v-show="index != 0"></i></a>
      </div>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade" :class="{'active': categoryIndex == 0, 'show': categoryIndex == 0}">
          <ul class="nav justify-content-center nav-option option-visibility">
            <li class="nav-item"><a class="nav-link" href="#">all</a></li>
          </ul>
        </div>
        <div class="tab-pane fade" :class="{'active': categoryIndex == 1, 'show': categoryIndex == 1}">
          <ul class="nav justify-content-center nav-option">
            <li class="nav-item">
              <a class="nav-link" href="#" :class="{'active':brand == 'Canon'}" @click.prevent="brand = 'Canon'">Canon</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" :class="{'active':brand == 'Nikon'}" @click.prevent="brand = 'Nikon'">Nikon</a>
            </li>
          </ul>
        </div>
        <div class="tab-pane fade" :class="{'active': categoryIndex == 2, 'show': categoryIndex == 2}">
          <ul class="nav justify-content-center nav-option">
            <li class="nav-item">
              <a class="nav-link" :class="{'active':brand == 'Canon'}" @click.prevent="brand = 'Canon'" href="#">Canon</a><!-- active-->
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active':brand == 'Nikon'}" @click.prevent="brand = 'Nikon'" href="#">Nikon</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active':brand == 'Tamron'}" @click.prevent="brand = 'Tamron'" href="#">Tamron</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active':brand == 'Sigma'}" @click.prevent="brand = 'Sigma'" href="#">Sigma</a>
            </li>
          </ul>
        </div>
        <div class="tab-pane fade" :class="{'active': categoryIndex == 3, 'show': categoryIndex == 3}">
          <ul class="nav justify-content-center nav-option">
            <li class="nav-item">
              <a class="nav-link" :class="{'active':brand == 'Canon'}" @click.prevent="brand = 'Canon'" href="#" >Canon</a><!-- active-->
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active':brand == 'Nikon'}" @click.prevent="brand = 'Nikon'" href="#">Nikon</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active':brand == 'Sony'}" @click.prevent="brand = 'Sony'" href="#">Sony</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active':brand == 'Fujifilm'}" @click.prevent="brand = 'Fujifilm'" href="#">Fujifilm</a>
            </li>
          </ul>
        </div>
        <div class="tab-pane fade" :class="{'active': categoryIndex == 4, 'show': categoryIndex == 4}">
          <ul class="nav justify-content-center nav-option">
            <li class="nav-item">
              <a class="nav-link" :class="{'active':brand == 'Canon'}" @click.prevent="brand = 'Canon'" href="#">Canon</a><!-- active-->
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active':brand == 'Nikon'}" @click.prevent="brand = 'Nikon'" href="#">Nikon</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active':brand == 'Sony'}" @click.prevent="brand = 'Sony'" href="#">Sony</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="{'active':brand == 'Fujifilm'}" @click.prevent="brand = 'Fujifilm'" href="#">Fujifilm</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
<!-- 卡片項目 -->
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-5" v-for="item in singlePageData" :key="item.id">
          <div class="card h-100 shadow">
            <div class="card-body pb-0">
              <img :src="item.imageUrl" class="card-img-top" alt="product-image">
              <h5 class="card-title">{{item.title}}</h5>
            </div>
            <div class="card-footer pt-0 pb-4">
              <p class="text-right text-muted mb-0"><del>{{ item.origin_price | currency }}</del></p>
              <p class="h5 text-right mb-0">{{ item.price | currency }}</p>              
            </div>

            <div class="card card-content card-fadeIn bg-primary text-white">
              <div class="card-header h-25 pt-4">
                <h5 class="card-title">{{ item.title }}</h5>
              </div>
              <div class="card-body">
                <p>{{ item.description }}</p>
              </div>
              <div class="card-footer d-flex flex-column">
                <a href="#" @click.prevent="productDetail(item.id)" class="text-white align-self-end h3">more_</a>
                <a href="#" class="align-self-start" @click.prevent="addtoCart(item.id)"><img src="@/assets/image/plus_white.png" width="50px"></a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
<!-- pagination -->
    <nav class="d-flex justify-content-center" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item changePageIcon" :class="{'disabled':!has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="pagination(currentPage-2)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item" v-for="(page, index) in totalPageData.length" :key="page" :class="{'active': currentPage == page}">
          <a class="page-link" @click.prevent="pagination(index)" href="#">{{ page }}</a>
        </li>
        <li class="page-item changePageIcon" :class="{'disabled':!has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="pagination(currentPage)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
    <Message :cart-message="cartSuccessMessage"></Message>
    <Gotop :window-scroll="scrollPos" />
    <Footer></Footer>
  </div>
</template>

<script>
import $ from 'jquery';
import Message from '../ScreenFull_message';

export default {
  name: 'Products',
  components:{
    Message,
  },
  data () {
    return {
      products:[],
      isLoading:false,
      currentCategory:'全部商品',
      brand:'',
      category:['全部商品', 'DSLR單反相機', 'DSLR單反鏡頭', 'EVIL無反相機', 'EVIL無反鏡頭'],
      categoryIndex:0,//show出狀態為active的分類列表項目
      isProductsPage:true,
      totalPageData:[],
      singlePageData:[],
      currentPage:1,
      has_pre:false,
      has_next:true,
      scrollPos:0,
      cartSuccessMessage:'',
    }
  },
  computed:{
    typeData(){
      if(this.currentCategory !== '全部商品'){
        return this.products.filter((item) => {
          return item.category === this.currentCategory
        })
      }else{
        return this.products;
      }
    },
    brandData(){
    //如果brand不等於''，就回傳資料內同品牌的項目
      if(this.brand !== ''){
        return this.typeData.filter((item) => {
          return item.title.indexOf(this.brand) !== -1
        })
      }else{
        return this.typeData//不然就回傳分類列表內的項目
      }
    }
  },
  watch:{
    brandData(){
      const pageContent = [];
      this.brandData.forEach(function(item, i){
      //每頁9筆資料，總共幾頁
        if(i % 9 === 0){
          pageContent.push([])
        }
      //每頁資料內容  
        const page = parseInt(i/9)//第幾筆資料歸屬於第幾頁
        pageContent[page].push(item);
      })
      this.totalPageData = pageContent;//全部分頁內容
      //取出特定頁內容
      this.pagination();
    },
    singlePageData(){//判斷是否有上/下頁，決定其按鈕可點擊狀態
      if(this.currentPage == 1 && this.totalPageData.length > 1){
        this.has_pre = false;
        this.has_next = true;
      }else if(this.currentPage>1 && this.currentPage< this.totalPageData.length){
        this.has_pre = true;
        this.has_next = true;
      }else if(this.totalPageData.length == 1){
        this.has_pre = false;
        this.has_next = false;
      }else if(this.currentPage == this.totalPageData.length){
        this.has_pre = true;
        this.has_next = false;
      }
    },
  },
  methods:{
    getProducts(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        this.products = response.data.products;
        this.isLoading = false;
      }).catch((err) => {
        console.log(err);
      });
    },
    productDetail(id){
      this.$router.push(`/product/${id}`);
    },
    addtoCart(id, qty = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const cart = {
        product_id:id,
        qty,
      };
      this.isLoading = true;
      this.$http.post(api, {data:cart}).then((response) => {
        if(response.data.success){
          this.$bus.$emit('Navbar:updateCart');
          this.isLoading = false;
          this.cartSuccessMessage = '已加入購物車';
        }
        setTimeout(() => {
          this.cartSuccessMessage = '';
        }, 2000)
      }).catch((err) => {
        console.log(err);
      });
    },
    selectCategory(index){
      this.categoryIndex = index;
      this.currentCategory = this.category[index];//點擊後，取出相對應分類列表名稱
      this.brand = '';
    },
    pagination(index = 0){//預設取出第一頁內容(陣列索引為0的資料內容)
      this.singlePageData = this.totalPageData[index];//由傳入的索引位置，取出對應頁面資料
      this.currentPage = index + 1;//目前頁面為索引位置+1
    }
  },
  created(){
    this.getProducts();
  //註冊事件：點擊下拉選單項目，跳轉產品列表頁並顯示對應選項
    this.$bus.$on('filterData:postIndex', (index) => {
      this.selectCategory(index);
    });
  },
  mounted(){
    $(window).scroll(() => {
      let scrollPos = $(window).scrollTop();
      this.scrollPos = scrollPos;
    });
    $('.carousel').carousel({
      interval: 2000,
      ride:'carousel',
      pause:false,
    })
  },
  beforeDestroy(){
    this.$bus.$off('filterData:postIndex');
    $(window).unbind('scroll');
  }
}
</script>

<style>

</style>
