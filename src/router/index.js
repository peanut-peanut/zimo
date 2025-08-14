import { createRouter, createWebHistory } from 'vue-router'
// 如果OSS静态网站配置无法正常工作，可以改用Hash路由模式
// import { createRouter, createWebHashHistory } from 'vue-router'
import { ROUTES } from './routes'
import baiduAnalytics from '../utils/baidu-analytics'
import { setSEO } from '../utils/seo.js'

// 页面组件导入
import Home from '../pages/home/index.vue'
import AboutUs from '../pages/about-us/index.vue'
import Program from '../pages/program/index.vue'
import ProgramDetail from '../pages/program/detail.vue'
import SuccessfulCases from '../pages/successful-cases/index.vue'
import ApplyNow from '../pages/apply-now/index.vue'
import Guides from '../pages/guides/index.vue'
import StudyInChina from '../pages/guides/studyInChina.vue'
import Cities from '../pages/guides/cities.vue'
import Universities from '../pages/guides/Universities.vue'
import Scholarships from '../pages/guides/Scholarships.vue'
import Beijing from '../pages/guides/Beijing.vue'
import Shanghai from '../pages/guides/Shanghai.vue'
import Hangzhou from '../pages/guides/Hangzhou.vue'
import Shenzhen from '../pages/guides/Shenzhen.vue'
import Wuhan from '../pages/guides/Wuhan.vue'
import GuangDong from '../pages/guides/GuangDong.vue'

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
    path: ROUTES.PROGRAM_DETAIL,
    name: 'ProgramDetail',
    component: ProgramDetail,
    meta: { title: 'program-detail' }
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
    path: ROUTES.POPULAR_CITIES_BEIJING,
    name: 'PopularCitiesBeijing',
    component: Beijing,
    meta: { title: 'beijing' }
  },
  {
    path: ROUTES.POPULAR_CITIES_SHANGHAI,
    name: 'PopularCitiesShanghai',
    component: Shanghai,
    meta: { title: 'shanghai' }
  },
  {
    path: ROUTES.POPULAR_CITIES_HANGZHOU,
    name: 'PopularCitiesHangzhou',
    component: Hangzhou,
    meta: { title: 'hangzhou' }
  },
  {
    path: ROUTES.POPULAR_CITIES_SHENZHEN,
    name: 'PopularCitiesShenzhen',
    component: Shenzhen,
    meta: { title: 'shenzhen' }
  },
  {
    path: ROUTES.POPULAR_CITIES_WUHAN,
    name: 'PopularCitiesWuhan',
    component: Wuhan,
    meta: { title: 'wuhan' }
  },
  {
    path: ROUTES.POPULAR_CITIES_GUANGDONG,
    name: 'PopularCitiesGuangDong',
    component: GuangDong,
    meta: { title: 'guangdong' }
  },
  {
    path: ROUTES.APPLYNOW,
    name: 'ApplyNow',
    component: ApplyNow,
    meta: { title: 'Start Your Application' }
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

// 路由守卫 - 设置页面SEO和百度统计上报
router.beforeEach((to, from, next) => {
  // 根据路由名称设置SEO
  const seoPageMap = {
    'Home': 'home',
    'AboutUs': 'aboutUs',
    'Program': 'program',
    'ProgramDetail': 'programDetail',
    'SuccessfulCases': 'successfulCases',
    'Guides': 'guides',
    'StudyInChina': 'studyInChina',
    'GuidesCities': 'cities',
    'GuidesUniversities': 'universities',
    'GuidesScholarships': 'scholarships',
    'PopularCitiesBeijing': 'beijing',
    'PopularCitiesShanghai': 'shanghai',
    'PopularCitiesHangzhou': 'hangzhou',
    'PopularCitiesShenzhen': 'shenzhen',
    'PopularCitiesWuhan': 'wuhan',
    'PopularCitiesGuangDong': 'guangdong',
    'ApplyNow': 'applyNow'
  }
  
  const seoPage = seoPageMap[to.name]
  if (seoPage) {
    // 延迟执行，确保DOM已经加载
    setTimeout(() => {
      setSEO(seoPage)
    }, 100)
  }
  
  next()
})

// 路由后置守卫 - 百度统计PV上报
router.afterEach((to, from) => {
  // 使用百度统计工具类进行上报
  baiduAnalytics.trackPageView(to.fullPath)
  
  // 上报路由切换事件
  baiduAnalytics.trackEvent('navigation', 'route_change', to.name || to.path, 1)
  
  // 上报页面信息
  if (to.meta.title) {
    baiduAnalytics.trackEvent('page_info', 'page_title', to.meta.title, 1)
  }
  
  console.log('页面访问上报:', {
    path: to.fullPath,
    name: to.name,
    title: to.meta.title,
    from: from.fullPath
  })
})

export default router 