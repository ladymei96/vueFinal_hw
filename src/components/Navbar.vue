<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-white navbar-light py-0 px-sm-5">
      <div class="d-flex">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <a href="#" class="nav-link text-dark d-lg-none logo-size mb-0">
          <i class="fas fa-user-circle fa-lg"></i>
        </a>
      </div>

      <router-link class="navbar-brand" to="/">
        <img class="d-none d-lg-block" src="../assets/image/logo_black.png" width="100px" alt="webLogo">
        <img class="d-block d-lg-none" src="../assets/image/logo_black.png" width="80px" alt="webLogo">
      </router-link>

      <ul class="navbar-nav navbar-nav-row order-lg-1">
        <li class="nav-tiem d-none d-lg-inline">
          <router-link to="/login" class="nav-link text-dark logo-size mb-0">
            <i class="fas fa-user-circle fa-lg"></i>
          </router-link>
        </li>
        <li class="nav-tiem">
          <a href="#" class="nav-link text-dark logo-size mb-0">
            <i class="fas fa-heart fa-lg"></i>
          </a>
        </li>
        <li class="nav-tiem dropdown">
          <a href="#" class="nav-link text-dark btn-cart logo-size mb-0" data-toggle="dropdown" data-flip="false">
            <i class="fas fa-shopping-bag fa-lg"></i>
            <span v-if="cart.carts.length != 0" class="badge badge-danger rounded-circle">{{cart.carts.length}}</span>
          </a>
          <div class="dropdown-menu dropdown-menu-right p-3" style="min-width: 400px" data-offset="400">
            <h6>已選擇商品</h6>
            <table class="table table-sm">
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle text-center">
                    <a href="#" class="text-muted">
                      <i class="fa fa-trash-o"></i>
                    </a>
                  </td>
                  <td width="200px" class="align-middle">{{item.product.title}}</td>
                  <td class="align-middle">{{item.qty}}{{item.product.unit}}</td>
                  <td width="80px" class="align-middle text-right">{{item.total | currency}}</td>
                </tr>
              </tbody>
            </table>
            <router-link class="btn btn-primary btn-block" to="/products/customer-order">
              <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
            </router-link>
          </div>
        </li>
      </ul>

      <div class="collapse navbar-collapse" id="navbarSupportedContent"><!--這裡放的是會被收闔的內容-->     
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home<span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item dropdown active"><!--active-->
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Products
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">單反相機</a>
              <a class="dropdown-item" href="#">單反鏡頭</a>
              <a class="dropdown-item" href="#">無反相機</a>
              <a class="dropdown-item" href="#">無反鏡頭</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Coupons</a>
          </li>
        </ul>
      </div>
    </nav>


  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      cart:{
        carts:[],
        },
    }
  },
  methods:{
    getCart(){
      const api =  `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then((re) => {
        console.log('Navbar取得購物車列表', re.data);
        vm.cart = re.data.data;
        // this.$bus.$emit('cartList:get', re.data.data);
      });
    }
  },
  created(){
    this.getCart();//畫面初始，取得購物車列表
    this.$bus.$on('Navbar:updateCart', this.getCart);
  }
}
</script>
<style>

</style>

