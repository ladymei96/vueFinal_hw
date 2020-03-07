<template>
  <div>
    <Navbar class="sticky-top"></Navbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './Navbar';
import Footer from'./Footer';

export default {
  name: 'PageFram',
  data () {
    return {

    }
  },
  components:{
    Navbar,
    Footer,
  },

}
</script>

<style>

</style>
