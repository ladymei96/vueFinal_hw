<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <table class="table mt-4">
      <thead>
        <th width="150">購買時間</th>
        <th>Email</th>
        <th width="400">購買款項</th>
        <th width="120">應付金額</th>
        <th width="120">是否付款</th>
      </thead>
        <tbody>
          <tr v-for="item in orders" :key="item.id">
            <td>{{ item.create_at | date }}</td>
            <td>{{ item.user.email }}</td>
            <td>
              <p v-for="productItem in item.products" :key="productItem.id">{{ productItem.product.title }} 數量: { {productItem.qty }} {{ productItem.product.unit }}</p>
            </td>
            <td class="text-right">{{ item.total | currency }}</td>
            <td>
              <span v-if="item.is_paid" class="text-success">已付款</span>
              <span v-else>尚未付款</span>
            </td>
          </tr>
        </tbody>
    </table>
    <Pagination :child-paginations="pagination" @changePage="getOrders"></Pagination>
  </div>
</template>

<script>
  export default {
    name: 'Orders_backEnd',
    data(){
      return {
        orders:[],
        pagination:{},
        isLoading:false,
      }
    },
    methods:{
      getOrders(page = 1){
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
        this.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log('取得訂單列表', response.data);
          this.isLoading = false;
          this.orders = response.data.orders;
          this.pagination = response.data.pagination;
        }).catch((err) => {
          console.log(err);
        })
      },
    },
    created(){
      this.getOrders();
    },
  }
</script>
