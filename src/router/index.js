import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
  path: "/",
  name: "Login Account",
  component: () => import('../views/Account/LoginAccount.vue')
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
    path: "/account/setting",
    name: "Setting Account",
    component: () => import('../views/Account/SettingAccount.vue')
  },
  {
    path: "/account/forgotpassword",
    name: "Forgot Password",
    component: () => import('../views/Account/ForgotPassword.vue')
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
    path: "/product/information",
    name: "Information Product",
    component: () => import('../views/Product/InformationProduct.vue')
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
    component: () => import('../views/SalesOrder/NewSalesOrderValid.vue')
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


router.beforeEach((to, from, next)=>{

  let isAuthenticated = localStorage.getItem('access_token')
  if(
    to.name == 'Login Account'||
    to.name == 'New Account' ||
    to.name == 'Forgot Password'
    )
  {
    next();
  }
  else{
    if(isAuthenticated == null)
    {
      if(
        to.name == 'Error' ||
        to.name == '404Error'
      )
      {
        next({
          redirect:to.fullPath
        })
      }
      else{
        // There is no token, re authentication is required
        next({ name: 'Login Account' })
      }      
    }
    else{
      if(
        to.name == 'Error' ||
        to.name == '404Error'
      )
      {
        next({
          redirect:to.fullPath
        })
      }
      else{
        // Get token and verified OK
        next();
      } 
      
    }
  }
})



export default router