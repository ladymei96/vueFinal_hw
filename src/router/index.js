import Vue from 'vue';
import VueRouter from 'vue-router';
//官方元件


import Home from'../components/Home';
import pageFram from '../components/PageFram';
import Products from'../components/pages/Products';
import Product from'../components/pages/Product';
import Coupons from'../components/pages/Coupons';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import ProductsBackEnd from '../components/pages/backEnd_Products';
import OrdersBackEnd from '../components/pages/backEnd_Orders';
import CouponsBackEnd from '../components/pages/backEnd_Coupons';
import CustomOrdersBackEnd from '../components/pages/backEnd_CustomOrders';
import CustomerOrderCheckBackEnd from '../components/pages/backEnd_CustomerOrderCheck';
import CustomerOrder from '../components/pages/CustomerOrder';
import CustomerOrderCheckout from '../components/pages/CustomerOrderCheckout';
import Test from '../components/pages/Swiper';
//自定義頁面元件

Vue.use(VueRouter);

export default new VueRouter({
  //動態路由間切換，讓頁面回到視窗頂部
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes:[
    {
      path:'*',
      redirect:'/',
    },
    {
      name:'首頁',
      path:'/',
      component:Home,
    },
    {
      name:'產品頁',
      path:'/client',
      component:pageFram,
      children:[
        {
          name:'產品列表',
          path:'products',
          component:Products,
        },
        {
          name:'單一產品頁',
          path:'product/:id',
          component:Product,
        },
        {
          name:'購物車列表',
          path:'customer-order',
          component:CustomerOrder,
        },
        {
          name:'訂單資訊頁',
          path:'customer-order-checkout/:orderId',
          component:CustomerOrderCheckout,
        },
      ],
    },
    {
      path:'/test',
      name:'測試頁',
      component:Test,
    },    
    {
      // name:'優惠券',
      path:'/coupons',
      component:pageFram,
      children:[
        {
          name:'優惠券',
          path:'',
          component:Coupons,
        }
      ],
    },
    {
      path:'/login',
      name:'登入頁',
      component:Login,
    },
    {
      path:'/admin',
      name:'後台',
      component:Dashboard,
      children:[
        {
          path:'products',
          name:'後台產品列表',
          component:ProductsBackEnd,
          meta: { requiresAuth: true },
        },
        {
          path:'orders',
          name:'後台訂單列表',
          component:OrdersBackEnd,
          meta: { requiresAuth: true },
        },
        {
          path:'coupons',
          name:'後台優惠券',
          component:CouponsBackEnd,
          meta: { requiresAuth: true },
        }
      ],
    },
    {
      path:'/simulation',
      name:'後台模擬功能',
      component:Dashboard,
      children:[
        {
          path:'custom-order',
          name:'模擬訂單',
          component:CustomOrdersBackEnd,
        },
        {
          path:'customer-order-checkout/:orderId',
          name:'模擬訂單結帳頁面',
          component:CustomerOrderCheckBackEnd,
        }
      ]
    },
  ]
});