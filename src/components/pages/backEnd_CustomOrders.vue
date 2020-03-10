<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm h-100">
          <div style="height: 150px; background-size: cover; background-position: center"
          :style="{backgroundImage:`url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text" v-if="item.description">{{item.description}}</p>
            <p class="card-text" v-if="!item.description">沒有描述</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">終身價 {{item.origin_price}} 元</div>
              <del class="h6" v-if="item.price">原價 {{item.origin_price}} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{item.price}} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button type="button" class="btn btn-outline-secondary btn-sm" @click.prevent="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click.prevent="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <pagination :child-paginations="pagination" @changePage="getProducts"></pagination>
<!--Cart-->
    <div class="container" v-if="cart.total != 0">
      <div class="row justify-content-center">
        <div class="col-10">
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

          <div class="input-group mb-3 input-group-sm">
            <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" @click.prevent="addCouponCode">
                套用優惠碼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!-- productModal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-left">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="productNum">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ productNum * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(product.id, productNum)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'CustomOrders_backEnd',
  data () {
    return {
      products:[],
      product:{},
      pagination:{},
      isLoading:false,
      status:{
        loadingItem:'',
      },
      productNum:1,
      cart:{},
      coupon_code:'',
    }
  },
  methods:{
    getProducts(page = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((re) => {
        vm.isLoading = false;
        if(re.data.success){
          vm.products = re.data.products;
          vm.pagination = re.data.pagination;
        }
      })
    },
    getProduct(id){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then((re) => {
        vm.status.loadingItem = '';
        if(re.data.success){
          vm.product = re.data.product;
          console.log(vm.product);
        }else{
          console.log(re.data.message);
        }
      });
      $('#productModal').modal('show');
    },
    addtoCart(id, qty = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cart = {
        product_id : id,
        qty,
        };
      vm.status.loadingItem = id;
      this.$http.post(api, {data:cart}).then((re) => {
        vm.status.loadingItem = '';
        vm.getCart();
        $('#productModal').modal('hide');
      });
    },
    getCart(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      this.$http.get(api).then((re) => {
        vm.cart = re.data.data;
        console.log(re);
      });
    },
    removeCartItem(id){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      const vm = this;
      this.$http.delete(api).then((re) => {
        vm.getCart();
      })
    },
    addCouponCode(){},
  },
  created(){
    this.getProducts();
    this.getCart();
  }
}
</script>

<style>

</style>
