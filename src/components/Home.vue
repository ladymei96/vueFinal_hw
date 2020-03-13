<template>
  <div>
    <!-- Navbar 先寫，再分成元件-->
      <nav class="navbar navbar-expand-lg navbar-dark py-0 px-5 fixed-top"><!--py-0取消Navbar預設padding-->
        <router-link class="navbar-brand" to="/">
          <img src="../assets/image/logo_white.png" width="100px" alt="webLogo">
        </router-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">Home<span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link class="nav-link dropdown-toggle" to="/client/products" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Products
              </router-link>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">單反相機</a>
                <a class="dropdown-item" href="#">單反鏡頭</a>
                <a class="dropdown-item" href="#">無反相機</a>
                <a class="dropdown-item" href="#">無反鏡頭</a>
              </div>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/coupons">Coupons</router-link>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-tiem">
              <!-- <a href="#" class="nav-link text-dark">
                <i class="fas fa-user-circle fa-lg"></i>
              </a> -->
              <router-link to="/login" class="nav-link text-dark">
                <i class="fas fa-user-circle fa-lg"></i>
              </router-link>
            </li>
            <li class="nav-tiem">
              <a href="#" class="nav-link text-dark">
                <i class="fas fa-heart fa-lg"></i>
              </a>
            </li>
            <li class="nav-tiem">
              <a href="#" class="nav-link text-dark">
                <i class="fas fa-shopping-bag fa-lg"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>

    <section class="container-fluid position-relative">
      <div class="row">
        <div class="col-10 jumbotron-bg-image bg-cover w-100 vh-100">
        </div>
        <div class="col-2 d-flex flex-column font-weight-bolder pr-2 pb-3">
          <p class="text-vertical mt-80 mb-auto h5">shopping Camera</p>
          <p class="text-vertical h5">What's HOT</p>
        </div>
      </div>
      <div class="bg-primary block-bg bg-cover"></div>
    </section>

  </div><!---->
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      
    }
  }
}
</script>

<style>
/* 背景圖片寫在style內暫時無解 */
/* .jumbotron-bg-image{
  background-image: url(../assets/image/index_banner.jpg);
} */
.block-bg{
  width: 135px;
  height: 180px;
  background-image: url(../assets/image/index_section.jpg);
  position: fixed;
  bottom:50px;
  right:12%;
}
</style>
