<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <router-link to="/admin/products" class="navbar-brand col-sm-3 col-md-2 mr-0">後台_Dashboard</router-link>
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
              <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
          </li>
        </ul>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Navbar_backEnd',
    data () {
      return {
        
      }
    },
    methods:{
      signout(){
        const api = `${process.env.APIPATH}/logout`;
        this.$http.post(api).then((re)=>{
          this.$router.push('/login');
        })
      }
    }
  }
</script>

<style>

</style>
