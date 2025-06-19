/**
 * 路由路径常量
 * 统一管理应用中所有路由路径
 */
export const ROUTES = {
  HOME: '/',
  PROGRAM: '/program',
  ABOUT: '/about',
  SUCCESSFULCASES: '/successful-cases',
  GUIDES: '/guides',
  GUIDES_STUDY_IN_CHINA: '/guides/study-in-china',
  GUIDES_CITIES: '/guides/cities',
  GUIDES_UNIVERSITIES: '/guides/universities',
  GUIDES_SCHOLARSHIPS: '/guides/scholarships',
  APPLYNOW: '/apply-now',
}

/**
 * 主路由配置
 */
export const mainRoutes = [
  {
    path: ROUTES.HOME,
    exact: true,
    title: 'Home',
  },
  {
    path: ROUTES.PROGRAM,
    exact: true,
    title: 'Program',
  },
 
  {
    path: ROUTES.SUCCESSFULCASES,
    exact: true,
    title: 'Successful Cases',
  },
  {
    path: ROUTES.GUIDES,
    exact: true,
    title: 'Guides',
  },
  {
    path: ROUTES.ABOUT,
    exact: true,
    title: 'About Us',
  },
  {
    path: ROUTES.APPLYNOW,
    exact: true,
    title: 'Apply Now',
  },
]

/**
 * 获取路由详情页面链接
 * @param {string|number} id 项目ID
 * @returns {string} 格式化后的路径
 */
export const getProgramDetailPath = (id) => {
  return ROUTES.PROGRAM.DETAIL.replace(':id', id.toString())
} 