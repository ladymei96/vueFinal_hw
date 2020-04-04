<template>
  <div class="goTop">
    <a href="#" @click.prevent="goTop" class="h1 goTop-animated" :class="{'goTop-fade':scrollPos}"><i class="fas fa-chevron-circle-up"></i></a>
  </div>
</template>

<script>
//別的頁面還沒加上
export default {
  name:'Gotop',
  props:['windowScroll'],
  data(){
    return{
      
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
  computed:{
    scrollPos(){ //滾動軸位置超過200，就讓top顯示；反之，隱藏
      return this.windowScroll > 200 ? true : false
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
/*滑到指定位置，才出現*/
.goTop-animated{
  opacity: 0;
  transition:.3s;
}
.goTop-fade{
  opacity: 1;
}
</style>