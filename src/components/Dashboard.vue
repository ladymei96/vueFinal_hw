<template>
  <div>
    <NavbarBackEnd></NavbarBackEnd>
    <AlertMessage></AlertMessage>
    <div class="container-fluid">
      <div class="row">
        <SidebarBackEnd/>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>

    </div>
  </div>
</template>

<script>
import NavbarBackEnd from './backEnd_Navbar';
import SidebarBackEnd from './backEnd_Sidebar';
import AlertMessage from './AlertMessage';

export default {
  name: 'Dashboard',
  data () {
    return {
      
    }
  },
  //元件區域註冊
  components:{
    NavbarBackEnd,
    SidebarBackEnd,
    AlertMessage,
  }
}
</script>

<style>

</style>
