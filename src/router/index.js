import Vue from 'vue';
import VueRouter from 'vue-router';
//官方元件

import Home from'../components/Home';
import pageFram from '../components/PageFram';
import Products from'../components/Products';
// import Coupons from'../components/Coupons';
//自定義頁面元件

Vue.use(VueRouter);

export default new VueRouter({
  routes:[
    {
      name:'首頁',
      path:'/',
      component:Home,
    },
    {
      name:'框架',
      path:'/fram',
      component:pageFram,
      children:[
        {
          name:'產品頁',
          path:'/products',
          component:Products,
        }
      ],
    },
    // {
    //   name:'Coupons',
    //   path:'/coupons',
    //   component:Coupons,
    // },
  ]
});