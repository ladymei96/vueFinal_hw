<template>
  <div class="goTop">
    <a href="#" @click.prevent="goTop" class="h1"><i class="fas fa-chevron-circle-up"></i></a>    
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  name:'Gotop',
  methods:{
    goTop(){
      let doc = document.documentElement;
      $(doc).animate({
        scrollTop:0
      },500)
    }
  },
}
</script>

<style>
.goTop{
  position: fixed;
  bottom:10px;
  right:10px;
  z-index: 100;
}
.goTop a{
  color:#575b6169;
}
.goTop:hover a{
  color:#575b61;
}
</style>