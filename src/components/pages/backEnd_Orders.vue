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
						<td>{{item.create_at}}</td>
						<td>{{item.user.email}}</td>
						<td>
              <p v-for="productItem in item.products" :key="productItem.id">{{productItem.product.title}} 數量: {{productItem.qty}} {{productItem.product.unit}}</p>
            </td>
            <td class="text-right">{{item.total | currency}}</td>
						<td>
							<span v-if="item.is_paid" class="text-success">已付款</span>
							<span v-else>尚未付款</span>
						</td>
							<!-- <td>
								<button class="btn btn-outline-primary btn-sm">編輯</button>
							</td> -->
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
        const vm = this;                          //admin/orders?page=:page
        const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${page}`;
        vm.isLoading = true;
        this.$http.get(api).then((response) => {
          console.log('取得訂單列表', response.data);
          vm.isLoading = false;
          vm.orders = response.data.orders;
          vm.pagination = response.data.pagination;
          vm.orders.forEach((item) => {
            item.create_at = `${(new Date(item.create_at *1000)).getFullYear()}/${(new Date(item.create_at *1000)).getMonth()+1}/${(new Date(item.create_at *1000)).getDate()}`;
          });
        })                                  
      },
    },
    created(){
      this.getOrders();
    },
  }
</script>
