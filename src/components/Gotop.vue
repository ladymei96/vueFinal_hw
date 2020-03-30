<template>
  <div class="goTop">
    <a href="#" @click.prevent="goTop" class="h1 goTop-animated" :class="{'goTop-fadein':!isTop}"><i class="fas fa-chevron-circle-up"></i></a>
  </div>
</template>

<script>
//別的頁面還沒加上
export default {
  name:'Gotop',
  props:['windowScroll'],
  data(){
    return{
      isTop:true,
    }
  },
  methods:{
    goTop(){
      let doc = document.documentElement;
      $(doc).animate({
        scrollTop:0
      },500)
    }
  },
  watch:{
    windowScroll(){
      if(this.windowScroll > 200){
        this.isTop = false;
      }else{
        this.isTop = true;
      }
    }
  }
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