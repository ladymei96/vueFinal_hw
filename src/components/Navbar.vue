<template>
  <div>
      <nav class="navbar navbar-expand-lg bg-white navbar-light py-0 px-5">
        <router-link class="navbar-brand" to="/">
          <img src="../assets/image/logo_black.png" width="100px" alt="webLogo">
        </router-link>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
          <ul class="navbar-nav">
            <li class="nav-tiem">
              <a href="#" class="nav-link text-dark">
                <i class="fa fa-user-circle" aria-hidden="true"></i>
              </a>
            </li>
            <li class="nav-tiem">
              <a href="#" class="nav-link text-dark">
              <i class="fa fa-heart" aria-hidden="true"></i>
              </a>
            </li>
            <li class="nav-tiem">
              <a href="#" class="nav-link text-dark">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
              </a>
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

</style>
