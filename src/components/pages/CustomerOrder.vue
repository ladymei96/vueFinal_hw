<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container mb-5">
      <div>
        <h2>MY BAG</h2>
        <p class="text-center h2" v-if="cart.carts.length == 0">清單內已無商品</p>
        <table class="table" v-if="cart.carts.length > 0">
          <thead>
            <tr>
              <th></th>
              <th>品名</th>
              <th class="d-none d-md-table-cell">數量</th>
              <th width="100" class="d-none d-sm-table-cell">總價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id">
              <td class="align-middle">
                <button type="button" class="btn btn-sm" @click="removeCartItem(item.id)">
                  <i class="fas fa-times"></i>
                </button>
              </td>
              <td class="align-middle">
                <a href="#" @click.prevent="goProductPage(item.product.id)">
                  {{ item.product.title }}
                </a>
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle d-none d-md-table-cell">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right d-none d-sm-table-cell">{{ item.total | currency}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="d-none d-sm-table-cell"></td>
              <td class="d-none d-md-table-cell"></td>
              <td class="text-right">總計</td> <!-- colspan="3" -->
              <td class="text-right">{{ cart.total | currency }}</td>
            </tr>
            <tr v-if="cart.final_total != cart.total">
              <td class="d-none d-sm-table-cell"></td>
              <td class="d-none d-md-table-cell"></td>
              <td class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total | currency}}</td>
            </tr>
          </tfoot>
        </table>

        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model.trim="coupon_code">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" @click.prevent="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
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
            <button type="submit" class="btn btn-primary">建立訂單</button>
          </div>
        </form>
      </ValidationObserver>

      <button class="btn btn-primary" type="button" @click.prevent="goBack">繼續購物</button>
    </div>
  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';

export default {
  name: 'CustomerOrder',
  data () {
    return {
      isLoading:false,
      cart:{
        carts:[],
      },
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
    getCart(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.isLoading = true;
      this.$http.get(api).then((re) => {
        vm.isLoading = false;
        console.log('購物車列表取得資料', re.data);
        vm.cart = re.data.data;
      })
    },
    removeCartItem(id){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      this.isLoading = true;
      this.$http.delete(api).then((re) => {
        this.isLoading = false;
        vm.getCart();
        this.$bus.$emit('Navbar:updateCart');
      })
    },
    addCouponCode(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const vm = this;
      const coupon = {
        code:this.coupon_code,
        };
      if(!this.coupon_code){
        return;
      }
      this.isLoading = true;
      this.$http.post(api, {data:coupon}).then((re) => {
        this.isLoading = false;
        if(re.data.success){
          vm.getCart();
        }else{
          console.log(re.data.message);
        }
      })
    },
    createOrder(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      const vm = this;
      this.$refs.form.validate().then((success) => {
        if(success){
          this.$http.post(api, {data:vm.form}).then((re) => {
            if(re.data.success){
              this.$router.push(`/customer-order/${re.data.orderId}`);
            }else{
        //失敗跳訊息
              console.log(re.data.message || re.data.messages);
            }
          })

        }else{
          console.log('驗證失敗');
        }
      })
    },
    goBack(){
      this.$router.push('/products');
    },
    goProductPage(productId){
      this.$router.push(`/product/${productId}`);      
    },
  },
  created(){
    this.getCart();
    this.$bus.$on('customerOrder:getCart', this.getCart);
  }
}
</script>
<style>
@media (max-width: 575px){
  .td-xs-none{
    display: none;
  }
}
</style>

