<template>
  <div class="sticky-top">
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar navbar-expand-lg bg-white navbar-light py-0 px-sm-5">
      <div class="d-flex">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <a href="#" class="nav-link text-dark d-lg-none navbar--icon-size mb-0">
          <i class="fas fa-user-circle fa-lg"></i>
        </a>
      </div>

      <router-link class="navbar-brand" to="/">
        <img class="logo-lg-width logo-width" src="../assets/image/logo_black.png" alt="webLogo">
      </router-link>

      <ul class="navbar-nav navbar-nav-row order-lg-1">
        <li class="nav-item d-none d-lg-inline">
          <router-link to="/login" class="nav-link text-dark navbar--icon-size mb-0">
            <i class="fas fa-user-circle fa-lg"></i>
          </router-link>
        </li>

        <li class="nav-item dropdown">
          <a href="#" class="nav-link text-dark navbar-icon-badge navbar-icon-size mb-0" data-toggle="dropdown">
            <i class="fas fa-heart fa-lg"></i>
            <span class="badge badge-danger rounded-circle" v-if="favoriteData.length != 0">{{favoriteData.length}}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-right p-3 position-absolute" style="min-width: 280px" data-offset="400">
            <h6>最愛商品列表</h6>
            <p class="empty" v-if="favoriteData.length == 0">清單內已無商品</p>
            <table class="table table-sm">
              <tbody>
                <tr v-for="item in favoriteData" :key="item.id">
                  <td class="align-middle text-center">
                    <a href="#" class="text-muted" @click.prevent="removeFavoriteItem(item.id)">
                      <i class="fa fa-trash-o"></i>
                    </a>
                  </td>
                  <td width="200px" class="align-middle">{{item.title}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </li>

        <li class="nav-item dropdown">
          <a href="#" class="nav-link text-dark navbar-icon-badge navbar-icon-size mb-0" data-toggle="dropdown" data-flip="false">
            <i class="fas fa-shopping-bag fa-lg"></i>
            <span v-if="cart.carts.length != 0" class="badge badge-danger rounded-circle">{{cart.carts.length}}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-right p-3 position-absolute" style="min-width: 400px" data-offset="400">
            <h6>已選擇商品</h6>
            <p class="empty" v-if="cart.carts.length == 0">清單內已無商品</p>
            <table class="table table-sm">
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle text-center">
                    <a href="#" class="text-muted" @click.prevent="removeCartItem(item.id)">
                      <i class="fa fa-trash-o"></i>
                    </a>
                  </td>
                  <td width="200px" class="align-middle">{{item.product.title}}</td>
                  <td class="align-middle">{{item.qty}}{{item.product.unit}}</td>
                  <td width="80px" class="align-middle text-right">{{item.total | currency}}</td>
                </tr>
              </tbody>
            </table>
            <router-link class="btn btn-primary btn-block" to="/customer-order">
              <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
            </router-link>
          </div>
        </li>
      </ul>

      <div class="collapse navbar-collapse" id="navbarSupportedContent"><!--這裡放的是會被收闔的內容-->     
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item dropdown d-flex">
            <router-link to="/products" class="nav-link" role="button" aria-haspopup="true">
              Products
            </router-link>
            <a href="#" class="dropdown-toggle align-self-center nav-link pl-0 toggle--underline" id="navbarDropdown" data-toggle="dropdown"></a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="#" @click.prevent="filterData(1)">單反相機</a>
              <a class="dropdown-item" href="#" @click.prevent="filterData(2)">單反鏡頭</a>
              <a class="dropdown-item" href="#" @click.prevent="filterData(3)">無反相機</a>
              <a class="dropdown-item" href="#" @click.prevent="filterData(4)">無反鏡頭</a>
            </div>
          </li>
          <li class="nav-item">
            <!-- <a class="nav-link" href="#">Coupons</a> -->
            <router-link class="nav-link" to="/coupons">Coupons</router-link>
          </li>
        </ul>
      </div>
    </nav>


  </div>
</template>

<script>
export default {
  name: 'Navbar_dark',
  data () {
    return {
      cart:{
        carts:[],
      },
      products:[],
      isLoading:false,
      categoryIndex:0,
      isProductsPage:this.currentPage,
      favoriteItem:JSON.parse(localStorage.getItem('favoriteItemId')) || [],
    }
  },
  props:['currentPage'],
  methods:{
    getCart(){
      const api =  `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;

      this.$http.get(api).then((re) => {
        console.log('Navbar取得購物車列表', re.data);
        vm.cart = re.data.data;

      });
    },
    getProducts(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      this.$http.get(api).then((re) => {
        vm.products = re.data.products;
      })
    },
    removeCartItem(id){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      this.isLoading = true;
      this.$http.delete(api).then((re) => {
        vm.getCart();
        vm.isLoading = false;
      })
    },
    removeFavoriteItem(itemId){
      this.favoriteItem.splice(this.favoriteItem.indexOf(itemId), 1);
      //更新localStorage的favoriteItem資料
      localStorage.setItem('favoriteItemId', JSON.stringify(this.favoriteItem));
      //更新product的favoriteItem資料
      this.$bus.$emit('Product:updateFavoriteItem', this.favoriteItem);
    },
    filterData(index){
      //判斷在哪頁
      if(this.isProductsPage){
        this.$bus.$emit('filterData:postIndex', index);
      }else{
        this.categoryIndex = index;
        this.$router.push('/products');
      }
    },
  },
  computed:{
    favoriteData(){
      const vm = this;
      let filtered = this.products.filter(function(item){
        return vm.favoriteItem.indexOf(item.id) != -1
      })
      return filtered
    }
  },
  created(){
    const vm = this;
    this.getCart();//畫面初始，取得購物車列表
    this.getProducts();
    this.$bus.$on('Navbar:updateCart', this.getCart);
    this.$bus.$on('Navbar:updateFavoriteItem',(newFavoriteItem) =>{
      vm.favoriteItem = newFavoriteItem;
    });
  },
  beforeDestroy(){
    this.$bus.$emit('filterData:postIndex', this.categoryIndex);
  },
}
</script>
<style>
.empty{
  padding:.3rem;
  margin-bottom: 0;
  border-top:1px solid #dee2e6;
  text-align: center;
}
.logo-width{
  width: 80px;
}
@media (min-width:992px){
  .logo-lg-width{
    width:100px;
  }
}
</style>

