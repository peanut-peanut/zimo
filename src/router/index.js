import { createRouter, createWebHistory } from 'vue-router'
// 如果OSS静态网站配置无法正常工作，可以改用Hash路由模式
// import { createRouter, createWebHashHistory } from 'vue-router'
import { ROUTES } from './routes'

// 页面组件导入
import Home from '../pages/home/index.vue'
import AboutUs from '../pages/about-us/index.vue'
import Program from '../pages/program/index.vue'
import SuccessfulCases from '../pages/successful-cases/index.vue'
import ApplyNow from '../pages/apply-now/index.vue'
import Guides from '../pages/guides/index.vue'
import StudyInChina from '../pages/guides/studyInChina.vue'
import Cities from '../pages/guides/cities.vue'
import Universities from '../pages/guides/Universities.vue'
import Scholarships from '../pages/guides/Scholarships.vue'

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
    meta: { title: 'home' }
  },
  {
    path: ROUTES.ABOUT_US,
    name: 'AboutUs',
    component: AboutUs,
    meta: { title: 'about-us' }
  },
  {
    path: ROUTES.PROGRAM,
    name: 'Program',
    component: Program,
    meta: { title: 'program' }
  },
  {
    path: ROUTES.SUCCESSFULCASES,
    name: 'SuccessfulCases',
    component: SuccessfulCases,
    meta: { title: 'successful-cases' }
  },
  {
    path: ROUTES.GUIDES,
    name: 'Guides',
    component: Guides,
    meta: { title: 'guides' }
  },
  {
    path: ROUTES.GUIDES_STUDY_IN_CHINA,
    name: 'StudyInChina',
    component: StudyInChina,
    meta: { title: 'study-in-china' }
  },
  {
    path: ROUTES.GUIDES_CITIES,
    name: 'GuidesCities',
    component: Cities,
    meta: { title: 'cities' }
  },
  {
    path: ROUTES.GUIDES_UNIVERSITIES,
    name: 'GuidesUniversities',
    component: Universities,
    meta: { title: 'universities' }
  },
  {
    path: ROUTES.GUIDES_SCHOLARSHIPS,
    name: 'GuidesScholarships',
    component: Scholarships,
    meta: { title: 'scholarships' }
  },
  {
    path: ROUTES.APPLYNOW,
    name: 'ApplyNow',
    component: ApplyNow,
    meta: { title: 'apply-now' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: ROUTES.HOME
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 如果OSS部署有问题，可以切换到Hash模式：
  // history: createWebHashHistory(import.meta.env.BASE_URL),
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