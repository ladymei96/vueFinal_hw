<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container mb-5">
      <div>
        <h2>MY BAG</h2>
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th width="150">總價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.total | currency}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total | currency }}</td>
            </tr>
            <tr v-if="cart.final_total != cart.total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total | currency}}</td>
            </tr>
          </tfoot>
        </table>
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
    removeCartItem(){},
    createOrder(){
      this.$refs.form.validate().then((success) => {
        if(success){
          console.log('驗證成功');
          //轉頁
        }else{
          console.log('驗證失敗');
        }
      })
    }
  },
  created(){
    const vm = this;
    this.$bus.$on('cartList:get', (cart) => {
      vm.cart = cart;
    })
  }
}
</script>
<style>

</style>

