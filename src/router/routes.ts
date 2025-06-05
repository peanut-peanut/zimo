/**
 * 路由路径常量
 * 统一管理应用中所有路由路径
 */
export const ROUTES = {
  HOME: '/home',
  PROGRAM: {
    LIST: '/program',
    DETAIL: '/program/:id',
  },
  ABOUT: '/about',
};

/**
 * 路由类型定义
 */
export type RouteType = {
  path: string;
  exact?: boolean;
  title?: string;
  requiresAuth?: boolean;
};

/**
 * 主路由配置
 */
export const mainRoutes: RouteType[] = [
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
    path: ROUTES.ABOUT,
    exact: true,
    title: '关于我们',
  },
];

/**
 * 获取路由详情页面链接
 * @param id 项目ID
 * @returns 格式化后的路径
 */
export const getProgramDetailPath = (id: string | number): string => {
  return ROUTES.PROGRAM.DETAIL.replace(':id', id.toString());
}; 