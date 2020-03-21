<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <NavbarDark :current-page="isProductsPage"></NavbarDark>
<!-- 輪播 -->
    <div id="carouselExampleIndicators" class="carousel slide mb-5" data-ride="carousel" data-pause="false" data-interval="3500">
      <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active carousel-bg-1 carousel-item-height bg-cover">
        </div>
        <div class="carousel-item carousel-bg-2 carousel-item-height bg-cover">
        </div>
        <div class="carousel-item carousel-bg-3 carousel-item-height bg-cover">
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>
<!-- 產品分類-選單 -->
    <div class="container text-center mb-md-5 mb-3">
      <div class="list-group list-group-horizontal-md" id="list-tab" role="tablist">
        <a v-for="(listItem, index) in category" :key="index" class="list-group-item list-group-item-action" @click.prevent="selectCategory(index)" :class="{'active':index == categoryIndex}" href="#">{{listItem}}</a>
      </div>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade" :class="{'active': categoryIndex == 0, 'show': categoryIndex == 0}">
          <ul class="nav justify-content-center nav-option option-opacity">
            <li class="nav-item"><a class="nav-link" href="#">all</a></li>
          </ul>
        </div>
        <div class="tab-pane fade" :class="{'active': categoryIndex == 1, 'show': categoryIndex == 1}">
          <ul class="nav justify-content-center nav-option">
            <li class="nav-item"><!--想想如何優化active-->
              <a class="nav-link" href="#" :class="{'active':brand == 'Canon'}" @click.prevent="brand = 'Canon'">Canon</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="brand = 'Nikon'">Nikon</a>
            </li>
          </ul>
        </div>
        <div class="tab-pane fade" :class="{'active': categoryIndex == 2, 'show': categoryIndex == 2}">
          <ul class="nav justify-content-center nav-option">
            <li class="nav-item">
              <a class="nav-link" @click.prevent="brand = 'Canon'" href="#">Canon</a><!-- active-->
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="brand = 'Nikon'" href="#">Nikon</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="brand = 'Tamron'" href="#">Tamron</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="brand = 'Sigma'" href="#">Sigma</a>
            </li>
          </ul>
        </div>
        <div class="tab-pane fade" :class="{'active': categoryIndex == 3, 'show': categoryIndex == 3}">
          <ul class="nav justify-content-center nav-option">
            <li class="nav-item">
              <a class="nav-link" @click.prevent="brand = 'Canon'" href="#" >Canon</a><!-- active-->
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="brand = 'Nikon'" href="#">Nikon</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="brand = 'Sony'" href="#">Sony</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="brand = 'Fujifilm'" href="#">Fujifilm</a>
            </li>
          </ul>
        </div>
        <div class="tab-pane fade" :class="{'active': categoryIndex == 4, 'show': categoryIndex == 4}">
          <ul class="nav justify-content-center nav-option">
            <li class="nav-item">
              <a class="nav-link" @click.prevent="brand = 'Canon'" href="#">Canon</a><!-- active-->
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="brand = 'Nikon'" href="#">Nikon</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="brand = 'Sony'" href="#">Sony</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click.prevent="brand = 'Fujifilm'" href="#">Fujifilm</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
<!-- 卡片項目 -->
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-5" v-for="item in pageData" :key="item.id">
          <div class="card h-100 shadow">
            <div class="card-body pb-0">
              <img :src="item.imageUrl" class="card-img-top" alt="product-image">
              <h5 class="card-title">{{item.title}}</h5>
            </div>
            <div class="card-footer pt-0 pb-4">
              <p class="text-right text-muted mb-0"><del>{{item.origin_price | currency}}</del></p>
              <p class="h5 text-right mb-0">{{item.price | currency}}</p>              
            </div>

            <div class="card card-content bg-primary text-white">
              <div class="card-header h-25 pt-4">
                <h5 class="card-title">{{item.title}}</h5>
              </div>
              <div class="card-body">
                <p>{{item.description}}</p>
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

    <!-- <Pagination :child-paginations="pagination" @changePage="getProducts"></Pagination> -->
    <nav class="d-flex justify-content-center" aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item changePageIcon" :class="{'disabled':!has_pre}">
          <a class="page-link" href="#" aria-label="Previous" @click.prevent="pagination(currentPage-2)">
            <span aria-hidden="true">&laquo;</span><!--上一頁-->
          </a>
        </li>
        <li class="page-item" v-for="(page, index) in newData.length" :key="page" :class="{'active': currentPage == page}">
          <a class="page-link" @click.prevent="pagination(index)" href="#">{{page}}</a>
        </li>
        <li class="page-item changePageIcon" :class="{'disabled':!has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="pagination(currentPage)">
            <span aria-hidden="true">&raquo;</span><!--下一頁-->
          </a>
        </li>
      </ul>
    </nav>

    <Footer></Footer>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Products',
  data () {
    return {
      products:[],
      isLoading:false,
      currentCategory:'全部商品',
      brand:'',
      category:['全部商品', 'DSLR單反相機', 'DSLR單反鏡頭', 'EVIL無反相機', 'EVIL無反鏡頭'],
      categoryIndex:0,
      isProductsPage:true,

      newData:[],
      pageData:[],
      currentPage:1,
      has_pre:false,
      has_next:true,
    }
  },
  methods:{
    getProducts(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.$http.get(api).then((re) => {
        vm.products = re.data.products;
      })
    },
    productDetail(id){
      this.$router.push(`/product/${id}`);
    },
    addtoCart(id, qty = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cart = {
        product_id:id,
        qty,
      };
      this.isLoading = true;
      this.$http.post(api, {data:cart}).then((re) => {
        if(re.data.success){
          this.$bus.$emit('Navbar:updateCart');
          this.isLoading = false;
        }
      })
    },
    selectCategory(index){
      this.categoryIndex = index;
      this.currentCategory = this.category[index];
      this.brand = '';
    },
    pagination(index = 0){
      this.pageData = this.newData[index];
      this.currentPage = index + 1;
    }
  },
  computed:{
    filterData:{
      get(){
        if(this.currentCategory == '全部商品'){
          return this.products;
        }
        let pageContent = this.products.filter((item) => {
          if(this.brand == ''){
            return item.category == this.currentCategory;
          }else{
            return item.category == this.currentCategory && item.title.indexOf(this.brand) != -1;
          } 
        });
        return pageContent;
      },
      set(newValue){
        console.log(newValue.length);
      }
    }
  },
  watch:{
    filterData(){
      const pageContent = [];
      this.filterData.forEach(function(item, i){
      //有幾頁
        if(i % 9 === 0){
          pageContent.push([])
        }
      //每頁資料內容  
        const page = parseInt(i/9)
        pageContent[page].push(item);
      })
      this.newData = pageContent;//全部分頁內容
      //取出特定頁內容
      this.pagination();
    },
    currentPage(){//再優化
      if(this.currentPage == 1 && this.newData.length>1){
        this.has_pre = false;
        this.has_next = true;
      }else if(this.currentPage>1 && this.currentPage< this.newData.length){
        this.has_pre = true;
        this.has_next = true;
      }else if(this.currentPage == 1 && this.newData.length == 1){
        this.has_pre = false;
        this.has_next = false;
      }else{
        this.has_pre = true;
        this.has_next = false;
      }
    }
  },
  created(){
    const vm = this;
    this.getProducts();
    this.$bus.$on('filterData:postIndex', (index) => {
      vm.selectCategory(index);
    });
  },
}
</script>

<style>
.carousel-item-height{
  height: 200px;  
  transition: .5s;
}
@media (min-width: 576px) { 
  .carousel-item-height{
    height: 250px;
  }
}
@media (min-width: 768px) {
  .carousel-item-height{
    height: 300px;
  }
}
@media (min-width: 992px) { 
  .carousel-item-height{
    height: 400px;
  }
}
/*vue back寫在template上-未解決*/
.carousel-bg-1{
  background-image: url(../../assets/image/products_carousel_1.jpg);
}
.carousel-bg-2{
  background-image: url(../../assets/image/products_carousel_2.jpg);
}
.carousel-bg-3{
  background-image: url(../../assets/image/products_carousel_3.jpg);
}
.card-header,.card-footer{
  background-color:transparent;
  border:none;
}
.card-content{
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right:0;
  opacity: 0;
  transition: opacity .3s;
}
.card:hover .card-content{
  opacity: 1;
}
.nav-option li{
  position: relative;
}

.list-group>a{
  color:#10161e
}
/*整合到scss內，用變數寫*/ 
.nav-option li a{
  color:#575b61;
  font-size: 1.3rem;
}
.nav-option li:hover a{
  color:#10161e;
}
.nav-option li + li ::before{
  content:'/';
  position:absolute;
  left:0;
}
.option-opacity{
  opacity: 0;
  pointer-events: none;
}
</style>
