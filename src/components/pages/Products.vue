<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <NavbarDark :current-page="isProductsPage"></NavbarDark>
<!-- 輪播 -->
    <div id="carouselExampleIndicators" class="carousel slide mb-5" data-ride="carousel">
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
        <!-- <a class="list-group-item list-group-item-action active" @click.prevent="category = '', brand = ''"  data-toggle="list" href="#products" role="tab">全部商品</a>
        <a class="list-group-item list-group-item-action" @click.prevent="category = 'DSLR單反相機', brand = ''" data-toggle="list" href="#dslr-body" role="tab" aria-controls="dslr-body">DSLR單反相機</a>
        <a class="list-group-item list-group-item-action" @click.prevent="category = 'DSLR單反鏡頭', brand = ''" data-toggle="list" href="#dslr-lens" role="tab" aria-controls="dslr-lens">DSLR單反鏡頭</a>
        <a class="list-group-item list-group-item-action" @click.prevent="category = 'EVIL無反相機', brand = ''" data-toggle="list" href="#evil-body" role="tab" aria-controls="evil-body">EVIL無反相機</a>
        <a class="list-group-item list-group-item-action" @click.prevent="category = 'EVIL無反鏡頭', brand = ''" data-toggle="list" href="#evil-lens" role="tab" aria-controls="evil-lens">EVIL無反鏡頭</a> -->
      </div>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade" :class="{'active': categoryIndex == 0, 'show': categoryIndex == 0}">
          <ul class="nav justify-content-center nav-option option-opacity">
            <li class="nav-item"><a class="nav-link" href="#">all</a></li>
          </ul>
        </div>
        <div class="tab-pane fade" :class="{'active': categoryIndex == 1, 'show': categoryIndex == 1}">
          <ul class="nav justify-content-center nav-option">
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="brand = 'Canon'">Canon</a>
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
        <div class="col-lg-4 col-md-6 mb-5" v-for="item in filterData" :key="item.id">
          <div class="card h-100 shadow">
            <div class="card-body">
              <img :src="item.imageUrl" class="card-img-top" alt="product-image">
              <h5 class="card-title">{{item.title}}</h5>
              <p class="text-right text-muted mb-0"><del>{{item.origin_price | currency}}</del></p>
              <p class="h5 text-right mb-0">{{item.price | currency}}</p>
            </div>

            <div class="card h-100 position-absolute card-content bg-primary text-white">
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
      //pagination:{},
      isLoading:false,
      currentCategory:'全部商品',
      brand:'',
      category:['全部商品', 'DSLR單反相機', 'DSLR單反鏡頭', 'EVIL無反相機', 'EVIL無反鏡頭'],
      categoryIndex:0,
      isProductsPage:true,
    }
  },
  methods:{
    getProducts(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.$http.get(api).then((re) => {
        vm.products = re.data.products;
        //vm.pagination = re.data.pagination;
        // console.log(re.data.products);
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
  },
  computed:{
    filterData(){
      if(this.currentCategory == '全部商品'){
        return this.products;
      }
      let filtered = this.products.filter((item) => {
        if(this.brand == ''){
          return item.category == this.currentCategory;
        }else{
          return item.category == this.currentCategory && item.title.indexOf(this.brand) != -1;
        } 
      });
      return filtered;
    }
  },
  created(){
    const vm = this;
    this.getProducts();
    this.$bus.$on('filterData:postIndex', (index) => {
      vm.selectCategory(index);
    })
  },
}
</script>

<style>
/* 先智障寫法，再優化 */
.carousel-item-height{
  height: 200px;
  
  /* transition: height .5s .3s;會影響輪播效果 */
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
