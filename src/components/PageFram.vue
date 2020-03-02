<template>
  <div>
    <Navbar class="sticky-top"></Navbar>
    <router-view></router-view>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Navbar from './Navbar';

export default {
  name: 'Products',
  data () {
    return {
      
    }
  },
  components:{
    Navbar,
  }
}
</script>

<style>

</style>
