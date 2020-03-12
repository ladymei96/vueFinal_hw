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
      // carts:[],
    }
  },
  components:{
    Navbar,
    Footer,
  },
  methods:{
    // getCart(){
    //   const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
    //   const vm = this;
    //   this.$http.get(api).then((re) => {
    //     console.log('fram取得購物車列表', re.data);
    //     vm.carts = re.data.data.carts;
    //   });
    // }
  },
  created(){
    // this.getCart();
    // this.$on('callFa:getCart', this.getCart);
  }

}
</script>

<style>

</style>
