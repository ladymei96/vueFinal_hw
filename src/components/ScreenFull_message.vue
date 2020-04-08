<template>
  <div class="full-screen" v-show="isSubs">
    <p class="text" v-show="subsText">
      感謝訂閱
      <br>
      我們將不定期寄送相關資訊給您
    </p>
    <p class="text" v-show="cartText">{{cartMessage}}</p>
  </div>
</template>

<script>
  export default {
    name:'screenFull_message',
    props:['cartMessage'],
    data(){
      return {
        isSubs:false,
        subsText:false,
        cartText:false,
      }
    },
    watch:{
      cartMessage(){
        const vm = this;//如果this.cartMessage有內容就...
        if(this.cartMessage){
          this.isSubs = true;
          this.cartText = true;
          setTimeout(() => {
            vm.isSubs = false;
            vm.cartText = false;
          },2000);
        }
      }
    },
    created(){
      const vm = this;
      this.$bus.$on('message:show',() => {
        vm.isSubs = true;
        vm.subsText = true;
        setTimeout(() => {
          vm.isSubs = false;
          vm.subsText = false;
        },2000);
      })
    },
    beforeDestroy(){
      this.$bus.$off('message:show');
    }
  }
</script>

<style>
.full-screen{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .2);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.full-screen .text{
  padding: 10px 0;
  color:#fff;
  background-color: #1f2733;
  border-radius: 10px;
  width:90%;
  max-width:300px;
  font-size: 1rem;
}
</style>