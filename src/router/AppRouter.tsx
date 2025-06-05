import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import FallbackPage from "./FallbackPage";

// 页面组件导入
import Home from "../pages/home";
import About from "../pages/about";

/**
 * 路由配置组件
 * 定义了应用的路由结构，包括：
 * 1. /home - 首页
 * 2. /program - 项目页面
 * 3. /about - 关于我们页面
 * 4. 重定向：任何未匹配路由自动转到/home
 */
const AppRouter: React.FC = () => {
    return (
        <Routes>
            {/* 基本路由 */}
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.ABOUT} element={<About />} />

            {/* 重定向: 当路径为'/'或任何未匹配路由时重定向到/home */}
            <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
};

export default AppRouter;
