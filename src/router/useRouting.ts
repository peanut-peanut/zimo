import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES, getProgramDetailPath } from './routes';

/**
 * 自定义路由导航钩子
 * 提供简化的路由导航功能
 */
export const useRouting = () => {
  const navigate = useNavigate();

  // 导航到首页
  const goToHome = useCallback(() => {
    navigate(ROUTES.HOME);
  }, [navigate]);

  // 导航到项目列表页
  const goToPrograms = useCallback(() => {
    navigate(ROUTES.PROGRAM.LIST);
  }, [navigate]);

  // 导航到项目详情页
  const goToProgramDetail = useCallback((id: string | number) => {
    navigate(getProgramDetailPath(id));
  }, [navigate]);

  // 导航到关于我们页
  const goToAbout = useCallback(() => {
    navigate(ROUTES.ABOUT);
  }, [navigate]);

  // 返回上一页
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    goToHome,
    goToPrograms,
    goToProgramDetail,
    goToAbout,
    goBack,
  };
}; 