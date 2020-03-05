// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';//運用到BS內互動元件時，需載入(會跳提示要安裝jq與popper.js)
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
//套件內容

import App from './App';
import router from './router';
import CurrencyFilter from './filters/currency';
import './bus';
import Pagination from './components/Pagination';
//自定義內容

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.component('Pagination', Pagination);
Vue.filter('currency', CurrencyFilter);
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