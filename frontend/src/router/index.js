import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/customer/HomeView.vue'),
      meta: { title: '首页' }
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
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/customer/ProfileView.vue'),
      meta: { title: '个人中心' }
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