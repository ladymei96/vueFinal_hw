<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container-md mt-3 mb-5">
      <div class="customerOrder-box-shadow p-4 text-center customerOrder-warn-fz">
        <h3><strong>詐騙猖獗</strong></h3>
        <p>會員折扣、提款機操作</p>
        <p>經銷商、12期分期等任何說詞</p>
        <p class="text-danger"><strong>皆為詐騙</strong></p>
        <p>切勿提供對方任何個資及卡號</p>
      </div>
      <form @submit.prevent="payOrder">
        <div class="customerOrder-box-shadow p-2 p-sm-4">
          <h2>ORDER</h2>
          <table class="table">
            <thead>
              <tr>
                <th>品名</th>
                <th width="15%">數量</th>
                <th width="15%">總價</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="align-middle text-right">{{ item.final_total | currency}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-md-right">總計</td>
                <td class="text-right">{{ order.total | currency}}</td>
              </tr>
            </tfoot>
          </table>
          <table class="table">
            <tbody>
              <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span v-else class="text-success">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-right" v-show="!order.is_paid">
          <button class="btn btn-primary" type="submit">確認付款去</button>
        </div>
      </form>
    </div>
    <div class="mb-5 text-center" v-show="order.is_paid">
      <a class="btn btn-primary btn-lg px-4" href="#" @click.prevent="goHome">回首頁</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerOrder_Checkout',
  data () {
    return {
      isLoading:false,
      orderId:'',
      order:{
        user:{},
      },
    }
  },
  methods:{
    getOrder(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${this.orderId}`;
      const vm = this;
      this.isLoading = true;
      this.$http.get(api).then((re) => {
        vm.isLoading = false;
        vm.order = re.data.order;
      })
    },
    payOrder(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${this.orderId}`;
      const vm = this;
      this.isLoading = true;
      this.$http.post(api).then((re) => {
        if(re.data.success){
          vm.getOrder();
        }
      })
    },
    goHome(){
      this.$router.push('/');
    }
  },
  created(){
    // -M2CbVv7W8yV-jYUyfkG
    this.orderId = this.$route.params.orderId;
    this.getOrder();
    this.$bus.$emit('Navbar:updateCart');//訂單建立，購物車會清空
  }
}
</script>
<style>
.customerOrder-warn-fz{
  font-size: 1.5rem;
}
</style>

