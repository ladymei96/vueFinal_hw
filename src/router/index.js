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
      name:'Home',
      path:'/',
      component:Home,
    },
    {
      name:'Products',
      path:'/products',
      component:Products,
    },
    {
      name:'Product',
      path:'/product/:productId',
      component:Product,
    },
    {
      path:'/customer-order',
      component:CreateOrder,
      children:[
        {
          name:'CustomerOrder',
          path:'',
          component:CustomerOrder,
        },
        {
          name:'CustomerOrderCheckout',
          path:':orderId',
          component:CustomerOrderCheckout,
        },
      ]
    },
    {
      name:'Coupons',
      path:'/coupons',
      component:Coupons,
    },
    {
      name:'Login',
      path:'/login',
      component:Login,
    },
    {
      name:'Dashboard',
      path:'/admin',
      component:Dashboard,
      children:[
        {
          name:'ProductsBackEnd',
          path:'products',
          component:ProductsBackEnd,
          meta: { requiresAuth: true },
        },
        {
          name:'OrdersBackEnd',
          path:'orders',
          component:OrdersBackEnd,
          meta: { requiresAuth: true },
        },
        {
          name:'CouponsBackEnd',
          path:'coupons',
          component:CouponsBackEnd,
          meta: { requiresAuth: true },
        }
      ],
    },
    {
      path:'/simulation',
      name:'DashboardVirtual',
      component:Dashboard,
      children:[
        {
          name:'CustomOrdersBackEnd',
          path:'custom-order',
          component:CustomOrdersBackEnd,
        },
        {
          name:'CustomerOrderCheckBackEnd',
          path:'customer-order-checkout/:orderId',
          component:CustomerOrderCheckBackEnd,
        }
      ]
    },
  ]
});