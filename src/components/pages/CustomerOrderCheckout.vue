<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container mb-5 border">
      <h2>ORDER</h2>
      <form @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <tr>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.total }}</td>
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
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-primary" type="submit">確認付款去</button>
        </div>
      </form>
    </div>
    <div class="mb-5 text-center" v-if="order.is_paid"><!--還要調整-->
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

</style>

