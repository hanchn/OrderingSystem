import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/menu'
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

// 路由守卫
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - 扫码点餐系统`
  }
  
  // 检查是否需要登录
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next('/login')
    return
  }
  
  // 检查是否需要管理员权限
  const userRole = localStorage.getItem('userRole')
  if (to.meta.requiresAdmin && userRole !== 'admin') {
    next('/')
    return
  }
  
  // 如果已登录且访问登录页，重定向到首页
  if (to.name === 'Login' && token) {
    next('/')
    return
  }
  
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router