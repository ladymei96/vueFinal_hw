<template>
  <div class="container mb-5">
    <div class="h1 text-center">
      my bag
    </div>
    <ValidationObserver tag="div" ref="form">  
      <h2>INFORMATION</h2>
      <form @submit.prevent="createOrder">
        <ValidationProvider tag="div" class="form-group" v-slot="{failed, errors}" name="姓名" rules="required">  
          <label for="username">姓名Name</label>
          <input type="text" class="form-control" :class="{'is-invalid': failed}" id="username" name="name" placeholder="請輸入姓名" v-model="form.user.name">
          <span v-if="failed" class="text-danger">{{errors[0]}}</span>
        </ValidationProvider>

        <ValidationProvider tag="div" class="form-group" v-slot="{failed, errors}" name="電話" rules="required">  
          <label for="usertel">電話Tel</label>
          <input type="tel" class="form-control" :class="{'is-invalid': failed}" id="usertel" name="tel" placeholder="請輸入電話" v-model="form.user.tel">
          <span v-if="failed" class="text-danger">{{errors[0]}}</span>
        </ValidationProvider>

        <ValidationProvider tag="div" class="form-group" v-slot="{failed, errors}" name="信箱" rules="required">  
          <label for="useremail">信箱Email</label>
          <input type="email" class="form-control" :class="{'is-invalid': failed}" id="useremail" name="email" placeholder="請輸入email" v-model="form.user.email">
          <span v-if="failed" class="text-danger">{{errors[0]}}</span>
        </ValidationProvider>
        
        <ValidationProvider tag="div" class="form-group" v-slot="{failed, errors}" name="地址" rules="required">  
          <label for="useraddress">地址Address</label>
          <input type="text" class="form-control" :class="{'is-invalid': failed}" id="useraddress" name="address" placeholder="請輸入地址" v-model="form.user.address">
          <span v-if="failed" class="text-danger">{{errors[0]}}</span>
        </ValidationProvider>

        <div class="form-group">
          <label for="comment">留言</label>
          <textarea type="message" class="form-control" id="comment" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </ValidationObserver>

  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';

export default {
  name: 'Navbar',
  data () {
    return {
      isLoading:false,
      cart:{},
      coupon_code:'',
      form:{
        user:{
          name:'',
          email:'',
          tel:'',
          address:'',
        },
        message:'',
      },
    }
  },
  components:{
    ValidationObserver,
    ValidationProvider,
  },
  methods:{
    createOrder(){
      this.$refs.form.validate().then((success) => {
        if(success){
          console.log('驗證成功');
        }else{
          console.log('驗證失敗');
        }
      })
    }
  },
  created(){

  }
}
</script>
<style>

</style>

