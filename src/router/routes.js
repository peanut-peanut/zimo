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
  APPLYNOW: '/apply-now',
}

/**
 * 主路由配置
 */
export const mainRoutes = [
  {
    path: ROUTES.HOME,
    exact: true,
    title: 'home',
  },
  {
    path: ROUTES.PROGRAM,
    exact: true,
    title: 'program',
  },
 
  {
    path: ROUTES.SUCCESSFULCASES,
    exact: true,
    title: 'successful-cases',
  },
  {
    path: ROUTES.GUIDES,
    exact: true,
    title: 'guides',
  },
  {
    path: ROUTES.ABOUT,
    exact: true,
    title: 'about-us',
  },
  {
    path: ROUTES.APPLYNOW,
    exact: true,
    title: 'apply-now',
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