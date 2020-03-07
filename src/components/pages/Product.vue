<template>
  <div class="text-center">
     <p class="color-primary h1">{{id}}</p>
     
     <router-link to="/products">back</router-link>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      id:'',
      product:{},
    }
  },
  methods:{
    getProduct(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.id}`;
      this.$http.get(api).then((re) => {
        console.log(re);
      })
    }
  },
  created(){
    const vm = this;
    this.$bus.$on('postProduct', (id) => {
      vm.id = id;
      console.log('ID', id);
    });
  },
  mounted() {
    this.getProduct();
  },
}
</script>

<style>

</style>
