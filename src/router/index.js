import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from './routes'

// 页面组件导入
import Home from '../pages/home/index.vue'
import About from '../pages/about/index.vue'
import Program from '../pages/program/index.vue'

/**
 * 路由配置
 * 定义了应用的路由结构，包括：
 * 1. /home - 首页
 * 2. /program - 项目页面
 * 3. /about - 关于我们页面
 * 4. 重定向：任何未匹配路由自动转到/home
 */
const routes = [
  {
    path: ROUTES.HOME,
    name: 'Home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: ROUTES.ABOUT,
    name: 'About',
    component: About,
    meta: { title: '关于我们' }
  },
  {
    path: ROUTES.PROGRAM.LIST,
    name: 'Program',
    component: Program,
    meta: { title: '项目列表' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: ROUTES.HOME
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 页面切换时滚动到顶部
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫 - 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - ZIMO`
  }
  next()
})

export default router 