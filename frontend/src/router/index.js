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
    }
    // Removed all other routes that reference non-existent files
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