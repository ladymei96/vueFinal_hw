<template>
  <div class="createOrder-container">
    <NavbarDark class="createOrder-nav"></NavbarDark>
    <router-view class="createOrder-main"></router-view>
    <Gotop />
    <Footer class="createOrder-footer"></Footer>
  </div>
</template>

<script>
export default {
  name: 'CreateOrder',
  data () {
    return {

    }
  },
}
</script>

<style>
.createOrder-container{
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.createOrder-nav{
  flex-grow:0;
}
.createOrder-main{
  flex-grow:1;
}
.createOrder-footer{
  flex-grow:0;
}
</style>
