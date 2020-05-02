<template>
  <div>
    <loading :active.sync="isLoading"></loading>
		<div class="text-right mt-3">
			<button class="btn btn-primary" @click="openModal(true)">建立新的優惠券</button><!-- @click="openModal(true)"-->
		</div>
    <table class="table mt-4">
			<thead>
					<th>名稱</th>
					<th>折扣百分比</th>
					<th width="100">到期日</th>
					<th width="120">是否啟用</th>
					<th width="120">編輯</th>
			</thead>
				<tbody>
					<tr v-for="item in coupons" :key="item.id">
						<td>{{item.title}}</td>
						<td>{{item.percent}}</td>
						<td>{{item.due_date}}</td>
						<td>
							<span v-if="item.is_enabled == 1" class="text-success">啟用</span>
							<span v-else>未啟用</span>
						</td>
							<td>
								<button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
								<button class="btn btn-outline-danger btn-sm" @click="openRemoveModal(item)">刪除</button>
							</td>
					</tr>
				</tbody>
		</table>
    <Pagination :child-paginations="pagination" @changePage="getCoupons"></Pagination>
    <!-- couponModal -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" v-if="isNew === false">修改 {{temCoupon.title}}</h5>
            <h5 class="modal-title" id="exampleModalLabel" v-if="isNew === true">新增優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title"
                placeholder="請輸入標題" v-model="temCoupon.title">
            </div>
            <div class="form-group">
              <label for="code">優惠碼</label>
              <input type="text" class="form-control" id="code"
                placeholder="請輸入優惠碼" v-model="temCoupon.code">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="text" class="form-control" id="due_date"
                placeholder="請輸入到期日" v-model="temCoupon.due_date">
            </div>
            <div class="form-group">
              <label for="percent">折扣百分比</label>
              <input type="number" class="form-control" id="percent"
                placeholder="請輸入折扣" v-model="temCoupon.percent">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="is_enabled" v-model="temCoupon.is_enabled" :true-value="1" :false-value="0">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
						<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-primary" @click="updateCoupon">更新優惠券</button>
					</div>
          
        </div>
      </div>
    </div>

    <!-- removeCouponModal -->
    <div class="modal fade" id="removeCouponModal" tabindex="-1" role="dialog"
			aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content border-0">
					<div class="modal-header bg-danger text-white">
						<h5 class="modal-title" id="exampleModalLabel">
							<span>刪除優惠券</span>
						</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						是否刪除 <strong class="text-danger">{{ temCoupon.title }}</strong> (刪除後將無法恢復)。
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
						<button type="button" class="btn btn-danger" @click="removeCoupon">確認刪除</button>
					</div>
				</div>
			</div>
		</div>

  </div>
</template>

<script> 
import $ from 'jquery';

export default {
  name: 'Coupons_backEnd',
  data(){
    return{
      temCoupon:{},//modal使用
      coupons:[],//畫面呈現
      pagination:{},
      isNew:false,
      isLoading:false,
    };
  },
  methods:{
    openModal(isNew, item){
      if(isNew){
        this.temCoupon = {};
        this.isNew = true;
      }else{
        this.temCoupon = Object.assign({}, item);
        this.isNew = false;
      }
      $('#couponModal').modal('show');
    },
    updateCoupon(){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      let httpMethods = 'post';
      if(!this.isNew){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${this.temCoupon.id}`;
        httpMethods = 'put';
      }
      this.$http[httpMethods](api, {data:this.temCoupon}).then((response) => {
        if(response.data.success){
          $('#couponModal').modal('hide');
          this.getCoupons();
        }else{
          console.log('re.data.message');
          $('#couponModal').modal('hide');
          this.getCoupons();
        }
      });
    },
    getCoupons(page = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log('取得優惠券', response.data);
        this.isLoading = false;
        if(response.data.success){
          this.coupons = response.data.coupons;
          this.pagination = response.data.pagination;
        }else{
          console.log(response.data.message);
        }
      });
    },
    openRemoveModal(item){
      this.temCoupon = Object.assign({}, item);
      $('#removeCouponModal').modal('show');
    },
    removeCoupon(){
      //openModal之前，item已傳入temCoupon，所以點擊時不用傳入id
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${this.temCoupon.id}`;
      this.$http.delete(api).then((response) => {
        console.log('刪除優惠券', response.data);
        if(response.data.success){
          $('#removeCouponModal').modal('hide');
          this.getCoupons();
        }else{
          console.log(data.re.message);
          $('#removeCouponModal').modal('hide');
          this.getCoupons();
        }
      })
    }
  },
  created(){
    this.getCoupons();
  }
}
</script>
