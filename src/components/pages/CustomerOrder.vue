<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container-md mt-3 mb-5">
      <div class="customerOrder-box-shadow p-2 p-sm-4">
        <h2>MY BAG</h2>
        <p class="text-center h2" v-if="cart.carts.length == 0">清單內已無商品</p>
        <div class="order-grid mb-3" v-if="cart.carts.length > 0">
          <div class="order-header-grid">
            <p class="order-header-item-grid">刪除</p>
            <p class="order-header-item-grid">品名</p>
            <p class="order-header-item-grid">單價</p>
            <p class="order-header-item-grid">數量</p>
            <p class="order-header-item-grid">總價</p>
          </div>
          <div class="order-product-grid" v-for="item in cart.carts" :key="item.id">
            <div class="order-product-item order-product-del">
              <button type="button" class="btn btn-sm" @click="removeCartItem(item.id)">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="order-product-item order-product-title">
              <a href="#" @click.prevent="goProductPage(item.product.id)">{{ item.product.title }}</a>
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </div>
            <div class="order-product-item order-product-price">{{ item.product.price | currency}}</div>
            <div class="order-product-item order-product-qty">{{ item.qty }}/{{ item.product.unit }}</div>
            <div class="order-product-item order-product-total">{{ cart.final_total | currency}}</div>
          </div>
          <div class="order-total-grid">
            <p class="total-price-title">總計</p>
            <p class="total-price-num">{{ cart.total  | currency }}</p>
            <p class="total-discount-title text-success" v-show="cart.total !== cart.final_total">折扣價</p>
            <p class="total-discount-num text-success" v-show="cart.total !== cart.final_total">{{ cart.final_total | currency }}</p>
          </div>
        </div>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model.trim="coupon_code"  @keyup.enter="addCouponCode">
          <div class="input-group-append">
            <button class="btn btn-secondary" type="button" @click.prevent="addCouponCode">
              套用優惠碼
            </button>
          </div>
        </div>
        <p class="text-danger mb-0" v-if="coupon_message != ''">{{ coupon_message }}</p>
      </div>

      <ValidationObserver tag="div" ref="form" >
        <form @submit.prevent="createOrder">
          <div class="customerOrder-box-shadow p-2 p-sm-4">
            <h2>INFORMATION</h2>
            <ValidationProvider tag="div" class="form-group" v-slot="{failed, errors}" name="姓名" rules="required">
              <label for="username">姓名Name*</label>
              <input type="text" class="form-control" :class="{'is-invalid': failed}" id="username" name="name" placeholder="請輸入姓名" v-model="form.user.name">
              <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
  
            <ValidationProvider tag="div" class="form-group" v-slot="{failed, errors}" name="電話" rules="required">
              <label for="usertel">電話Tel*</label>
              <input type="tel" class="form-control" :class="{'is-invalid': failed}" id="usertel" name="tel" placeholder="請輸入電話" v-model="form.user.tel">
              <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
  
            <ValidationProvider tag="div" class="form-group" v-slot="{failed, errors}" name="信箱" rules="required">
              <label for="useremail">信箱Email*</label>
              <input type="email" class="form-control" :class="{'is-invalid': failed}" id="useremail" name="email" placeholder="請輸入email" v-model="form.user.email">
              <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
  
            <ValidationProvider tag="div" class="form-group" v-slot="{failed, errors}" name="地址" rules="required">
              <label for="useraddress">地址Address*</label>
              <input type="text" class="form-control" :class="{'is-invalid': failed}" id="useraddress" name="address" placeholder="請輸入地址" v-model="form.user.address">
              <span v-if="failed" class="text-danger">{{ errors[0] }}</span>
            </ValidationProvider>
  
            <div class="form-group">
              <label for="comment">留言</label>
              <textarea type="message" class="form-control" id="comment" cols="30" rows="10" v-model="form.message"></textarea>
            </div>
          </div>
          <div class="d-flex justify-content-between">
            <button class="btn btn-primary" type="button" @click.prevent="goBack">繼續購物</button>
            <button type="submit" class="btn btn-primary">建立訂單</button>
          </div>
        </form>
      </ValidationObserver>

    </div><!--container-->
  </div>
</template>

<script>
import {ValidationObserver, ValidationProvider} from 'vee-validate';

export default {
  name: 'customerOrder-box-shadow',
  components:{
    ValidationObserver,
    ValidationProvider,
  },
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
      coupon_message:'',
    }
  },
  methods:{
    getCart(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        this.isLoading = false;
        this.cart = response.data.data;
      }).catch((error) => {
        console.log(error);
      });
    },
    removeCartItem(id){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(api).then((response) => {
        this.isLoading = false;
        this.getCart();
        this.$bus.$emit('Navbar:updateCart');
      }).catch((error) => {
        console.log(error);
      });
    },
    addCouponCode(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code:this.coupon_code,
      };
      if(!this.coupon_code){
        return;
      }
      this.isLoading = true;
      this.$http.post(api, {data:coupon}).then((response) => {
        this.isLoading = false;
        if(response.data.success){
          this.getCart();
          this.coupon_message = '';
          this.coupon_code = '';
        }else{
          this.coupon_message = response.data.message;
        }
      }).catch((error) => {
        console.log(error);
      });
    },
    createOrder(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      this.$refs.form.validate().then((success) => {
        if(success){
          this.$http.post(api, {data:this.form}).then((response) => {
            if(response.data.success){
              this.$router.push(`/customer-order/${response.data.orderId}`);
            }else{//失敗跳訊息
              console.log(response.data.message || response.data.messages);
            }
          })
        }else{
          console.log('驗證失敗');
        }
      }).catch((error) => {
        console.log(error);
      });
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
    this.$bus.$on('customerOrder-box-shadow:getCart', this.getCart);
  },
  beforeDestroy(){
    this.$bus.$off('customerOrder-box-shadow:getCart');
  }
}
</script>
<style>

</style>

