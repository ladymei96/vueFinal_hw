<template>
  <div class="login-bg bg-cover">
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal text-center">登入</h1>
      <label for="inputEmail" class="sr-only">userName</label>
      <input type="email" id="inputEmail" v-model="user.username" class="form-control" placeholder="Email address" required><!--autofocus-->
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" v-model="user.password" class="form-control" placeholder="Password" required>
      <div class="checkbox mb-3">
          <label>
          <input type="checkbox" value="remember-me"> Remember me
          </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block mb-5" type="submit">Sign in</button>
      <div class="d-flex justify-content-between">
        <a href="#" @click.prevent="goHome">回到首頁</a>
        <p class="text-muted">&copy; {{ years }} by mei 僅供學習使用</p>
      </div>
    </form>
  </div>
</template>

<script>


export default {
  name: 'Login',
  data () {
    return {
      user:{
        username: '',
        password: '',
      },
      years: new Date().getFullYear(),
    }
  },
  methods:{
    signin(){
      const api = `${process.env.APIPATH}/admin/signin`;
      this.$http.post(api, this.user).then((response) => {
        if(response.data.success){
          this.$router.push('/admin/products');
        }else{
          alert(`${response.data.message} 請重新登入`);
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    goHome(){
      this.$router.push('/');
    }
  },
}
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
