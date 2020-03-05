<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-white navbar-light py-0 px-5">
<!--把漢堡icon跟logo換位置，達到RWD時logo置中-->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <router-link class="navbar-brand" to="/">
        <img src="../assets/image/logo_black.png" width="100px" alt="webLogo">
      </router-link>

<!-- order改變排列順序 -->
      <ul class="navbar-nav order-md-1">
        <li class="nav-tiem d-none d-lg-inline">
          <a href="#" class="nav-link text-dark">
            <i class="fas fa-user-circle fa-lg"></i>
          </a>
        </li>
        <li class="nav-tiem">
          <a href="#" class="nav-link text-dark">
            <i class="fas fa-heart fa-lg"></i>
          </a>
        </li>
        <li class="nav-tiem">
          <a href="#" class="nav-link text-dark btn-cart">
            <i class="fas fa-shopping-bag fa-lg"></i>
            <span class="badge badge-danger badge-pill">2</span>
          </a>
        </li>
      </ul>

      <div class="collapse navbar-collapse" id="navbarSupportedContent"><!--這裡放的是會被收闔的內容-->
        <ul class="navbar-nav mr-auto">
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
  name: 'Home',
  data () {
    return {
      
    }
  }
}
</script>

<style>
/* .d-icon-flex{
  display: flex;
  flex-direction: row;
} */
.btn-cart{
  position: relative;
}
.btn-cart .badge{
    position: absolute;
    bottom:-1px;
    right:-3px;
}
</style>
