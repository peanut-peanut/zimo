/**
 * 路由路径常量
 * 统一管理应用中所有路由路径
 */
export const ROUTES = {
  HOME: '/',
  PROGRAM: {
    LIST: '/program',
    DETAIL: '/program/:id',
  },
  ABOUT: '/about',
  SUCCESSFULCASES: '/successful-cases',
  GUIDES: '/guides',
}

/**
 * 主路由配置
 */
export const mainRoutes = [
  {
    path: ROUTES.HOME,
    exact: true,
    title: '首页',
  },
  {
    path: ROUTES.PROGRAM.LIST,
    exact: true,
    title: '项目列表',
  },
  {
    path: ROUTES.PROGRAM.DETAIL,
    exact: true,
    title: '项目详情',
  },
  {
    path: ROUTES.SUCCESSFULCASES,
    exact: true,
    title: '成功案例',
  },
  {
    path: ROUTES.GUIDES,
    exact: true,
    title: '留学指引',
  },
  {
    path: ROUTES.ABOUT,
    exact: true,
    title: '关于我们',
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