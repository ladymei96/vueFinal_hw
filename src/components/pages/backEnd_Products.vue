<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-3">
      <button class="btn btn-primary" @click="openModal(true)">建立新的產品</button>
    </div>
    <table class="table mt-4">
      <thead>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="100">原價</th>
          <th width="100">售價</th>
          <th width="120">是否啟用</th>
          <th width="120">編輯</th>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
              {{ item.origin_price | currency }}
          </td>
          <td class="text-right">
              {{ item.price | currency }}
          </td>
          <td>
            <span v-if="item.is_enabled == 1" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
            <td>
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="removeProductModal(item)">刪除</button>
            </td>
        </tr>
      </tbody>
    </table>
    <Pagination :child-paginations="pagination" @changePage="getProducts"></Pagination>
    <!-- Add/Edit modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ modalTitle }}</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="url" class="form-control" id="image"
                    placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <!--顯示-->
                <img class="img-fluid" alt="" :src="tempProduct.imageUrl">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempProduct.title">
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input type="text" class="form-control" id="category"
                      placeholder="請輸入分類" v-model="tempProduct.category">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="unit">單位</label>
                    <input type="text" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="tempProduct.unit" autocomplete="off">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model="tempProduct.price">
                  </div>
                </div>
                <hr>

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="is_enabled" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0">
                    <label class="form-check-label" for="is_enabled">
                      是否啟用
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- remove modal -->
    <div class="modal fade" id="removeProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger"> {{ tempProduct.title }}</strong> (刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="removeProduct">確認刪除</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Products_backEnd',
  data () {
    return {
      products:[],
      tempProduct:{},
      isNew:false,
      isLoading:false,
      status:{
        fileUploading:false,
      },
      modalTitle:'',
      pagination:{},
    }
  },
  methods:{
    getProducts(page = 1){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        if(response.data.success){
          this.isLoading = false;
          this.products = response.data.products;
          this.pagination = response.data.pagination;
        }
      })
    },
    openModal(isNew, item){
      if(isNew){
        this.tempProduct = {},
        this.isNew = true;//updateProduct會用來判斷要執行新增/編輯
        this.modalTitle = '新增產品';
      }else{
        this.tempProduct = Object.assign({}, item);
        this.isNew = false;
        this.modalTitle = `編輯 ${this.tempProduct.title}`;
      }
      $('#productModal').modal('show');
    },
    updateProduct(){
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      if(!this.isNew){
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
      }
      this.$http[httpMethod](api, {data:this.tempProduct}).then((response)=>{
        if(response.data.success){
          $('#productModal').modal('hide');
          this.getProducts(this.pagination.current_page);
        }
      }).catch((err) => {
        console.log(err)
        })
    },
    removeProductModal(item){
      this.tempProduct = Object.assign({}, item);
      $('#removeProductModal').modal('show');
    },
    removeProduct(){
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(api).then((response)=>{
        if(response.data.success){
          $('#removeProductModal').modal('hide');
          this.getProducts();
        }
      });
    },
    uploadFile(){
      this.status.fileUploading = true;
      const uploadFile = this.$refs.files.files[0];
      const formData = new FormData();
      formData.append('file-to-upload', uploadFile);
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      this.$http.post(api, formData, {
        headers:{
          'Content-Type':'multipart/form-data',
        }
      }).then((response) => {
        if(response.data.success){
          this.$set(this.tempProduct, 'imageUrl', response.data.imageUrl);
          this.status.fileUploading = false;//關閉loading效果
        }else{
          this.status.fileUploading = false;
          this.$bus.$emit('message:push', response.data.message, 'danger');
        }
      })
    },
  },
  created(){
    this.getProducts();
  }
}
</script>

<style>

</style>
