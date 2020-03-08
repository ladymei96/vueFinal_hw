<template>
  <div>
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
<!-- 卡片項目 -->
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-5" v-for="item in products" :key="item.id">
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
                <!-- <router-link class="text-white align-self-end h3" to="/products/product">more_</router-link> -->
                <a href="#" @click.prevent="productDetail(item.id)" class="text-white align-self-end h3">more_</a>
                <a href="#" class="align-self-start"><img src="@/assets/image/plus_white.png" width="50px"></a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

    <Pagination :child-paginations="pagination" @changePage="getProducts"></Pagination>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      products:[],
      pagination:{},
    }
  },
  methods:{
    getProducts(page = 1){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      this.$http.get(api).then((re) => {
        vm.products = re.data.products;
        vm.pagination = re.data.pagination;
        // console.log(re.data.products);
      })
    },
    productDetail(id){
      this.$router.push(`products/product/${id}`);
    }
  },
  created(){
    //this.$bus.$emit('addCount');
    this.getProducts();
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
</style>
