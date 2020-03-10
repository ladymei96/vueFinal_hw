<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="container">
      <div>
        <div class="text-center mb-4">
          <h1 class="h2 title-border-bottom d-inline-block pb-2">{{product.title}}</h1>
        </div>
        <div class="row">
          <div class="col-lg-6 text-center">
            <img :src="product.imageUrl" class="img-fluid" alt="">
          </div>
          <div class="col-lg-6">
            <p>{{product.description}}</p>
            <span class="h3 font-weight-bolder">{{product.price | currency}}</span>
            <span class="h5 text-muted"><del>{{product.origin_price  | currency}}</del></span>
            <div class="input-group">
              <div class="input-group-prepend">
                <button class="btn btn-outline-secondary px-5" type="button" @click.prevent="nomoreZero">-</button>
              </div>
              <input type="number" class="form-control text-center border-1px" v-model.number="productNum" aria-label="Recipient's username with two button addons" aria-describedby="button-addon4">
              <div class="input-group-append" id="button-addon4">
                <button class="btn btn-outline-secondary px-5" type="button" @click.prevent="productNum++">+</button>
                <button class="btn btn-secondary font-weight-bolder" type="button" @click.prevent="addtoCart(productNum)">加到購物車</button>
              </div>
            </div>   
          </div>
        </div>
      </div>
      
  <router-link to="/products" class="h3">back</router-link>

      <div class="row mb-3">
        <div class="col-md-6 p-3">
          <h2>極致操控性能</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ea itaque sunt dignissimos deserunt, illo, velit dolor atque aspernatur repellat cupiditate vitae. Alias, cupiditate illum veritatis qui possimus, deserunt, excepturi labore quae assumenda aut inventore placeat velit? Possimus, fuga quo?</p>
        </div>
        <div class="col-md-6">
          <div class="h-md-100 h-260 description-bg-1 bg-cover" ></div>
        </div>

      </div>
      <div class="description-bg-2 bg-cover text-white mb-5">
          <div class="row h-100 align-items-center">
            <div class="col-lg-5 col-md-6 mx-3">
              <div class="bg-none bg-sm-white text-sm-black p-3">
                <h2>細膩超乎想像</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore illo vero adipisci maxime eligendi omnis quia, natus quae fugiat officiis reiciendis rem perspiciatis recusandae eaque laborum voluptatibus, porro tempore a.</p>
              </div>
            </div>
          </div>
      </div>

      <div class="description-bg-3 bg-cover  text-white mb-5">
        <div class="row h-100 justify-content-end align-items-center">
          <div class="col-lg-5 col-md-6 mx-3">
            <div class="bg-none bg-sm-white text-sm-black p-3">
              <h2>成像無以倫比</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quas illo mollitia vel dolores dicta modi adipisci perspiciatis, amet placeat.</p>
            </div>
          </div>
        </div>
      </div>

    </div><!--container-->
 
  </div>
</template>

<script>
export default {
  name: 'Products',
  data () {
    return {
      productId:'',
      product:{},
      productNum: 1,
      isLoading:false,
    }
  },
  methods:{
    getProduct(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${vm.productId}`;
      this.$http.get(api).then((re) => {
        // console.log(re);
        vm.product = re.data.product;
      })
    },
    addtoCart(qty){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      const vm = this;
      const cart = {
        product_id:vm.productId,
        qty,
      };
      this.isLoading = true;
      this.$http.post(api, {data:cart}).then((re) => {
        if(re.data.success){
          this.$parent.$emit('callFa:getCart');
          vm.isLoading = false;
        }
      })
    },
    nomoreZero(){
      if(this.productNum < 2){
        this.productNum = 1;
      }else{
        this.productNum-=1;
      }
    }
  },
  created(){
    this.productId = this.$route.params.id;
    this.getProduct();
  },
}
</script>

<style>
@media (min-width: 576px) {
  .bg-sm-white{
    background-color: #fff;
  }
  .text-sm-black{
    color:#000;
  }
}
@media (min-width: 768px) {
  .h-md-100{
    height:100%;
  }
}
.h-260{
  height:260px;
}
.title-border-bottom{
  border-bottom: 3px solid #000;
}
.border-1px{
  border: 1px solid #000;
}

/* .btn:hover{
  background-color: rgb(90, 90, 90);
} */
</style>
