<template>
  <div>
    <NavbarWhite class="fixed-top"></NavbarWhite>
<!-- 形象首頁 -->
    <div class="container-fluid position-relative">
      <div class="row">
        <!-- 左 -->
        <div class="col-lg-10 index-jumbotrom-bg bg-cover w-100 vh-100">
        </div>
        <!-- 右 -->
        <div class="col-lg-2 d-none d-lg-flex flex-column font-weight-bolder pr-2 pb-3">
          <p class="text-vertical mt-80 mb-auto h5 wow fadeIn index-animated-duration">Delighting You Always</p>
          <p class="text-vertical h5 wow fadeIn">Life's good!</p>
        </div>
      </div>
      <div class="d-none d-lg-block bg-primary index-block-bg bg-cover wow fadeInRight">
      </div>
      <img class="index-mouse" src="../../assets/image/index_mouse.png" alt="">
    </div>
<!-- 熱賣商品 -->
    <div class="index-hot p-5">
    	<div class="container text-center">
    	  <div class="index-title mt-3">
    	    <h3 class="wow slideInUp mb-0">熱賣商品</h3>
    	  </div>
    	  <div class="row  justify-content-center mb-4">
    	    <div class="col-10">
    	      <div class="row">
    	        <div class="col-lg-4 col-md-6" v-for="item in topProducts" :key="item.id">
    	          <div class="card h-100">
                  <span class="badge badge-danger index-hot-badge">{{`Top ${item.top}`}}</span>
    	            <div class="card-body pb-0">
    	              <img :src="item.imageUrl" class="card-img-top" alt="product-image">
    	              <h5 class="card-title">{{item.title}}</h5>
    	            </div>
    
    	            <div class="card card-content bg-primary-opacity text-white card-slideInUp"><!--父-->
    	              <div class="card-body d-flex justify-content-center"><!--子-->
    	                <button type="button" class="btn btn-outline-light align-self-center">點擊前往</button>
    	              </div>
    	            </div>
    	          </div>
    	        </div>
    	      </div>
    	    </div>
    
    	  </div>
    	</div>
    </div>
<!-- 優惠券介紹 -->
    <div class="index-couponIntro-bg d-flex justify-content-center align-items-center position-relative">
      <div class="wow rotateIn index-couponIntro text-center text-white" data-wow-delay=".2s">
        <h3 class="index-couponIntro-title">周末限定折扣</h3>
        <p class="index-couponIntro-rebate">
          <strong>50%</strong> OFF
        </p>
        <p class="index-couponIntro-text">
          不論天氣好壞，老闆期許
          <br>
          大家能帶著相機寶貝出門踏踏青、拍拍照
        </p>
      </div>
        <a href="#" class="wow pulse index-couponIntro-link">每天都有小確幸，點我查看詳情</a>
    </div>
<!-- 最新消息 -->
    <div class="container text-center p-5">
      <div class="index-title mt-3">
        <h3 class="wow slideInUp mb-0">最新消息</h3>
      </div>
      <div class="row">
        <div class="col-12 index-news p-5"><!--p-5&text-left暫時排版-->
          <ul>
            <li v-for="(item, index) in latestNews" :key="index" class="text-left">
              <span>{{item.date}}</span>
              <span>{{item.content}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
<!-- 購買流程 -->
<!-- 相片庫 -->
<!-- 訂閱電子報 -->
<!-- footer -->
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      topProducts:[
        {
          title:'Sony A7 III',    
          imageUrl:'https://storage.googleapis.com/vue-course-api.appspot.com/ladymei%2F1583325614391.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hJ3rN7uJ3KBcCXgbd6pD5EsvhfT2t%2F8YwoD5ap%2FsNDnsZhSCkfxD%2B2%2BcziK7gzuyV5LTomfC8jCTQ3chijbB%2BHwloh3GMfwbdVO8fT7w18RNHIUYyh5Ri4Y21E6uAqmSITdNV0552O5PvLdDSuFmcgLKdek959vI5HIq5gfOZHU9hTbk2aNaSxNQ0baYulYeNv%2BT08jzW8TmpqV0nlMvssfN00b7SXRbinZmfbYpCDd6Xmkh9ktrQEdEqwhTvOTubNhcAZeMHWJCvXxrUYUcAS5il%2BNencev5lNo2yK8VV57rljue1vIiY%2Ft3hysHHonj3V6zXTdcsEfDzrpieCHNw%3D%3D',
          id:'-M1_Z0EZ5xnUlbMegcai',
          top:1,
        },
        {
          title:'Fujifilm X-3 銀',    
          imageUrl:'https://storage.googleapis.com/vue-course-api.appspot.com/ladymei%2F1583325850623.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=lEcJIY8cAp8KfNu0gwSgpKSkmMv6NJJhguJYSmDF8tnEbeFEnLs0qadwINJTgFhXnZ46Vc1wcQOUGVYy3YKmsLmVY3qVp%2BiSWFdLDJBQPuMKqYjuIpaPNTZ9%2FY5Zjw3x139tdsLbPCkAa015%2BphzO%2B3zk%2Bx%2BYJWfHHFrlMIB2uSoywyypeOEeDRaJ4NEN7TyELevLoOALhBrQFToy%2FZuEUjCeMlYqsDEp9t6AVgxY6NFfFjLYFn8IK6TzzfffGUWCnVIDNQYN5u730jttRXcSVnuO55nesKc6VyhPLuBRV%2Bz0v%2FqSuwOFQ0hhGQ4Bj3gH4qBK7RAORbBP6NYqFYDMg%3D%3D',
          id:'-M1_ZvRd0XmA5Sgx9oCR',
          top:2,
        },
        {
          title:'Canon EOS R',    
          imageUrl:'https://storage.googleapis.com/vue-course-api.appspot.com/ladymei%2F1584790676800.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fgi2Ygv4hFlV5IpG7H2wtSZ7fbaW%2BIDE4ddD2Gv7qmTcb3ykQbZxNcPNw%2F%2BJZSJUt1drw94Si%2BNo3zb0iMWryGeKyxlLxeIAeOreYF%2FLni%2B00DGtXmnIBTx6ianQJjYpjItLiZTH70i%2BsDiiYbKO%2BbAGcucXogIC8Jyqsf%2Ba6d57NOtgbmFRhboyVlGsC%2B5a%2BhZAIzrDrZl3e3IVqOtoINYQ1gGtMZjGMIu96TB9fpvZrbmmtO%2BMA1tDT5fd5kg%2Bj8%2BBWswzkMdhXCY4nQ0iUF%2FBUyYH9top3PzvhatU9CjnrjtW6tbsbjb0BhZJlqP6ylnbFIa0BY8%2FioHS6YatPg%3D%3D',
          id:'-M2wsqWeKEjDRiwPSizI',
          top:3
        },
      ],
      latestNews:[],
    }
  },
  methods:{
    getLatestNews(){
      const vm = this;
      this.$http.get('../../../static/lastestNews.json').then((re) => {
        vm.latestNews = re.data;
      })
    }
  },
  created(){ 
    this.getLatestNews();
  },
}
</script>

<style>
.index-mouse{
  width: 50px;
  height: 50px;
  position: absolute;
  bottom:0;
  left:50%;
  transform: translateX(-50%);
  opacity: .5;
}
.index-mouse:hover{
  opacity: 1;
}
/* animate.css 客製化 */
/* .index-animated-duration{
  animation-duration: 1s;
} */
</style>
