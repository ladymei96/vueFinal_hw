import Vue from 'vue';
import VueRouter from 'vue-router';
//官方元件

import Home from'../components/pages/Home';
import Products from'../components/pages/Products';
import Product from'../components/pages/Product';
import Coupons from'../components/pages/Coupons';
import CreateOrder from '../components/CreateOrder';
import CustomerOrder from '../components/pages/CustomerOrder';
import CustomerOrderCheckout from '../components/pages/CustomerOrderCheckout';
//import Test from '../components/pages/Swiper';//整合進coupons
import Login from '../components/pages/Login';
import Dashboard from '../components/Dashboard';
import ProductsBackEnd from '../components/pages/backEnd_Products';
import OrdersBackEnd from '../components/pages/backEnd_Orders';
import CouponsBackEnd from '../components/pages/backEnd_Coupons';
import CustomOrdersBackEnd from '../components/pages/backEnd_CustomOrders';
import CustomerOrderCheckBackEnd from '../components/pages/backEnd_CustomerOrderCheck';
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
      name:'產品列表',
      path:'/products',
      component:Products,
    },
    {
      name:'單一產品頁',
      path:'/product/:productId',
      component:Product,
    },
    {
      path:'/customer-order',
      component:CreateOrder,
      children:[
        {
          name:'購物車清單',
          path:'',
          component:CustomerOrder,
        },
        {
          name:'訂單資訊頁',
          path:':orderId',
          component:CustomerOrderCheckout,
        },
      ]
    },
    {
      name:'優惠券',
      path:'/coupons',
      component:Coupons,
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