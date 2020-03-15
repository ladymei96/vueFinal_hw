<template>
  <div>
    <NavbarWhite></NavbarWhite>
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
  },
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
  background-image: url(../../assets/image/index_section.jpg);
  position: fixed;
  bottom:50px;
  right:12%;
}
</style>
