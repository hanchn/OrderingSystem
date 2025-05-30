import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: to => {
        // 如果有完整的参数，重定向到菜单页面并保持参数
        const { brandId, companyId, shopId, desk } = to.query
        if (shopId && desk) {
          return { 
            path: '/menu', 
            query: { brandId, companyId, shopId, desk } 
          }
        }
        return '/menu'
      }
    },
    {
      path: '/menu',
      name: 'Menu',
      component: () => import('@/views/customer/MenuView.vue'),
      meta: { title: '菜单' }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/customer/CartView.vue'),
      meta: { title: '购物车' }
    },
    {
      path: '/orders',
      name: 'Orders',
      component: () => import('@/views/customer/OrdersView.vue'),
      meta: { title: '我的订单' }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('@/views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, requiresAdmin: true },
      children: [
        {
          path: '',
          redirect: '/admin/dashboard'
        },
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          component: () => import('@/views/admin/DashboardView.vue'),
          meta: { title: '仪表盘' }
        },
        {
          path: 'dishes',
          name: 'AdminDishes',
          component: () => import('@/views/admin/DishesView.vue'),
          meta: { title: '菜品管理' }
        },
        {
          path: 'orders',
          name: 'AdminOrders',
          component: () => import('@/views/admin/OrdersView.vue'),
          meta: { title: '订单管理' }
        },
        {
          path: 'tables',
          name: 'AdminTables',
          component: () => import('@/views/admin/TablesView.vue'),
          meta: { title: '餐桌管理' }
        }
      ]
    }
  ]
})

// 路由守卫 - 确保桌号信息传递
router.beforeEach((to, from, next) => {
  NProgress.start()
  
  // 如果当前路由有桌号信息，但目标路由没有，则传递过去
  const fromParams = from.query
  const toParams = to.query
  
  if (fromParams.shopId && fromParams.desk && !toParams.shopId && !toParams.desk) {
    next({
      ...to,
      query: {
        ...to.query,
        brandId: fromParams.brandId,
        companyId: fromParams.companyId,
        shopId: fromParams.shopId,
        desk: fromParams.desk
      }
    })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router