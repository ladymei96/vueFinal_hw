// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';//運用到BS內互動元件時，需載入(會跳提示要安裝jq與popper.js)
import router from './router';
//套件內容

import App from './App';
//自定義內容


Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
//啟用區



/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})
