import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';//運用到BS內互動元件時，需載入(會跳提示要安裝jq與popper.js)
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
        //表單驗證
import {extend, localize} from 'vee-validate';
import {required, email} from 'vee-validate/dist/rules';
import TW from 'vee-validate/dist/locale/zh_TW';
// import VueAwesomeSwiper from 'vue-awesome-swiper';
// import 'swiper/dist/css/swiper.css';
//套件內容

import App from './App';
import router from './router';
import CurrencyFilter from './filters/currency';
import DateFilter from './filters/date';
import './bus';
import NavbarWhite from './components/Navbar_white';
import NavbarDark from './components/Navbar_dark';
import Footer from './components/Footer';
import Pagination from './components/backEnd_Pagination';
//自定義內容

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
  //元件全域註冊
Vue.component('Loading', Loading);
Vue.component('NavbarWhite', NavbarWhite);
Vue.component('NavbarDark', NavbarDark);
Vue.component('Footer', Footer);
Vue.component('Pagination', Pagination);
Vue.filter('currency', CurrencyFilter);
Vue.filter('date', DateFilter);
extend('required', required);
extend('email', email);
localize('zh_TW', TW);
// Vue.use(VueAwesomeSwiper);
//啟用區



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((re)=>{
      if(re.data.success){
        next();
      }else{
        next({path:'/login'});
      }
    });
  }else{
    next();
  }
})