import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from './routes';

/**
 * 备用页面组件
 * 当无法加载实际页面组件时显示
 */
const FallbackPage: React.FC = () => {
  return (
    <div className="fallback-page min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">页面不可用</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        抱歉，我们无法加载您请求的页面。这可能是因为页面正在开发中或暂时不可用。
      </p>
      <div className="flex gap-4">
        <Link 
          to={ROUTES.HOME}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-colors"
        >
          返回首页
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="border border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-2 rounded-md transition-colors"
        >
          刷新页面
        </button>
      </div>
    </div>
  );
};

export default FallbackPage; 