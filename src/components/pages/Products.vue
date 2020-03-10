<template>
  <div>
<!-- 輪播 -->
    <loading :active.sync="isLoading"></loading>
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
    <div class="container text-center mb-5">
      <div class="list-group list-group-horizontal-md" id="list-tab" role="tablist">
        <a class="list-group-item list-group-item-action active" @click.prevent="category = '', brand = ''"  data-toggle="list" href="#products" role="tab">全部商品</a>
        <a class="list-group-item list-group-item-action" @click.prevent="category = 'DSLR單反相機', brand = ''" data-toggle="list" href="#dslr-body" role="tab" aria-controls="dslr-body">DSLR單反相機</a>
        <a class="list-group-item list-group-item-action" @click.prevent="category = 'DSLR單反鏡頭', brand = ''" data-toggle="list" href="#dslr-lens" role="tab" aria-controls="dslr-lens">DSLR單反鏡頭</a>
        <a class="list-group-item list-group-item-action" @click.prevent="category = 'EVIL無反相機', brand = ''" data-toggle="list" href="#evil-body" role="tab" aria-controls="evil-body">EVIL無反相機</a>
        <a class="list-group-item list-group-item-action" @click.prevent="category = 'EVIL無反鏡頭', brand = ''" data-toggle="list" href="#evil-lens" role="tab" aria-controls="evil-lens">EVIL無反鏡頭</a>
      </div>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="products">
          <ul class="nav justify-content-center nav-option option-opacity">
            <li class="nav-item"><a class="nav-link" href="#">all</a></li>
          </ul>
        </div>
        <div class="tab-pane fade" id="dslr-body" role="tabpanel" aria-labelledby="list-home-list">
          <ul class="nav justify-content-center nav-option">
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="brand = 'Canon'">Canon</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="brand = 'Nikon'">Nikon</a>
            </li>
          </ul>
        </div>
        <div class="tab-pane fade" id="dslr-lens" role="tabpanel" aria-labelledby="list-profile-list">
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
        <div class="tab-pane fade" id="evil-body" role="tabpanel" aria-labelledby="list-messages-list">
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
        <div class="tab-pane fade" id="evil-lens" role="tabpanel" aria-labelledby="list-settings-list">
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
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Products',
  data () {
    return {
      products:[],
      cart:{},
      //pagination:{},
      isLoading:false,
      category:'',
      brand:'',
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
      this.$router.push(`products/product/${id}`);
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
          this.$parent.$emit('callFa:getCart');
          vm.isLoading = false;
          // vm.getCart();
        }
      })
    },
    // getCart(){
    //   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
    //   const vm = this;
    //   this.$http.get(api).then((re) => {
    //     console.log('購物車列表', re.data);
    //     vm.cart = re.data.data;
    //     this.$bus.$emit('cart-list', re.data.data.carts);
    //   });
    // }
  },
  computed:{
    filterData(){
      const vm = this;
      if(vm.category == ''){
        return vm.products;
      }
      let filtered = vm.products.filter((item) => {
        if(vm.brand == ''){
          return item.category == vm.category;
        }else{
          return item.category == vm.category && item.title.indexOf(vm.brand) != -1;
        } 
      });
      return filtered;
    }
  },
  created(){
    this.getProducts();
    // this.getCart();
  }
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
