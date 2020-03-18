<template>
  <div>
    <NavbarWhite class="fixed-top"></NavbarWhite>
    <section class="container-fluid position-relative">
      <div class="row">
        <div class="col-lg-10 jumbotron-bg-image bg-cover w-100 vh-100">
          <div class="txt text-white" :class="{'txt-move':delaySec}">
            SHOOT 
            <br>
            EVERY DAY
          </div>
        </div><!--RWD這個區塊在行動版要拿掉-->
        <div class="col-lg-2 d-none d-lg-flex flex-column font-weight-bolder pr-2 pb-3">
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
      delaySec:false,
    }
  },
  created(){
    const vm = this;
    setTimeout(function(){
      vm.delaySec = true
    }, 500);
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
  background-image: url(../../assets/image/index_section.jpg);
  position: fixed;
  bottom:50px;
  right:12%;
}
/*再決定+不+*/
.txt{
  font-size: 80px;
  position: absolute;
  top:60%;
  left:20%;
  opacity: 1;
  transition: opacity 1s,top 1s;
}
.txt-move{
  opacity: 1; 
  top:50%;
}

</style>
