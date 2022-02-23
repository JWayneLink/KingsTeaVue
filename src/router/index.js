import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
  path: "/",
  name: "MainPageView",
  component: () => import('../views/MainPageView.vue')
  },
  {
    path: "/account/login",
    name: "Login Account",
    component: () => import('../views/Account/LoginAccount.vue')
  },
  {
    path: "/account/new",
    name: "New Account",
    component: () => import('../views/Account/NewAccountValid.vue')
  },
  {
    path: "/mainpage",
    name: "MainPageView",
    component: () => import('../views/MainPageView.vue')
  },
  {
    path: "/product/new",
    name: "New Product",
    component: () => import('../views/Product/NewProductValid.vue')
  },
  {
    path: "/product/maintenance",
    name: "Maintenance Product",
    component: () => import('../views/Product/MaintenanceProduct.vue')
  },
  {
    path: "/customer/new",
    name: "New Customer",
    component: () => import('../views/Customer/NewCustomerValid.vue')
  },
  {
    path: "/customer/maintenance",
    name: "Maintenance Customer",
    component: () => import('../views/Customer/MaintenanceCustomer.vue')
  },
  {
    path: "/salesorder",
    name: "SalesOrder",
    component: () => import('../views/SalesOrder/SalesOrder.vue')
  },
  {
    path: '/user/:userId',
    name: 'User',
    component: () => import('../views/User.vue'),
    meta: {
      requiredsAuth: false
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.requiredsAuth) {
        // need to login
      } else {
        next();
      }
    }
  },
  {
    path: "/error",
    name: "Error",
    component: () => import('../views/Error.vue')
  },
  {
    path: "/404",
    name: "404Error",
    component: () => import('../views/404Error.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next)=>{

// })

export default router