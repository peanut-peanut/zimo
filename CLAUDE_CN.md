# CLAUDE_CN.md

此文件为中文开发者提供ZIMO项目代码库的指导说明。

## 项目概述

这是一个为ZIMO Club（留学咨询平台）开发的Vue.js 3单页应用。项目采用现代Web技术构建，针对桌面端和移动端体验进行了优化。

## 开发命令

```bash
# 开发环境
npm run dev              # 启动开发服务器（端口3000）

# 构建
npm run build            # 生产环境构建
npm run build:test       # 测试环境构建
npm run preview          # 预览生产构建

# 代码质量
npm run lint             # 运行ESLint并自动修复问题

# 部署
npm run deploy           # 构建并部署到阿里云OSS
npm run upload           # 不重新构建，直接上传到OSS
```

## 架构概览

### 技术栈
- **框架**: Vue.js 3 (使用Composition API)
- **构建工具**: Vite 5 (支持现代ES模块)
- **样式处理**: Less预处理器（响应式设计，px到rem的转换）
- **路由**: Vue Router 4 (History模式，静态托管时回退到Hash模式)
- **UI组件**: Ant Design Vue 4
- **状态管理**: 简单的store模式 (searchStore.js)

### 项目结构
```
src/
├── pages/              # 基于路由的页面组件
│   ├── home/          # 首页（营销部分）
│   ├── about-us/      # 公司信息
│   ├── program/       # 学习项目目录
│   ├── guides/        # 按城市/主题分类的教育内容  
│   ├── documents/     # 法律/政策页面
│   └── successful-cases/ # 成功案例
├── components/         # 可复用UI组件
├── router/            # Vue Router配置
├── store/             # 简单状态管理
├── utils/             # 实用工具（API、分析、SEO）
└── styles/            # 全局样式和字体
```

### 核心功能
- **响应式设计**: 移动优先，使用amfe-flexible和postcss-pxtorem
- **SEO优化**: 通过utils/seo.js实现动态meta标签
- **数据分析**: 集成百度统计，支持页面跟踪
- **性能优化**: 代码分割、压缩(Gzip/Brotli)、资源优化
- **部署**: 自动化OSS部署，CDN优化

## 开发指南

### 样式系统
- 使用Less预处理器，基于1920px设计基线（192px = 1rem）
- 通过flexible.js处理响应式断点
- 全局样式在styles/globals.less
- 组件特定样式在.vue文件中

### 路由配置
- 路由集中在router/routes.js
- SEO元数据在路由meta字段中
- 导航时自动滚动到顶部
- 404重定向到首页

### API集成
- 开发环境: Vite代理到https://www.zimo.club
- 生产环境: 直接API调用
- API配置集中在utils/api.js

### 性能优化
- 手动分块（vendor、antd、utils）
- 资源分类（图片、字体、媒体）
- Terser压缩（移除console）
- 4KB资源内联阈值

## 部署流程

### OSS静态托管设置
项目部署到阿里云OSS，静态网站配置:
- 索引页: `index.html`
- 错误页: `index.html`（启用SPA路由）
- 支持HTTPS和自定义域名

### 构建配置
- Vite处理现代打包，支持ES模块
- 压缩插件生成.gz和.br文件
- 资源哈希用于缓存控制
- 生产环境禁用源映射

### 环境特定构建
- `npm run build`: 生产环境构建
- `npm run build:test`: 测试环境构建
- 开发环境使用Vite开发服务器，支持热模块替换

## 常见开发任务

### 添加新页面
1. 在`src/pages/[section]/`创建组件
2. 在`src/router/routes.js`添加路由
3. 在`src/router/index.js`导入组件
4. 在router beforeEach守卫中添加SEO元数据

### 组件样式
- 使用Less语法和嵌套选择器
- 遵循BEM命名约定
- 使用rem单位实现响应式设计
- 在桌面和移动视口上测试

### API集成
- 使用utils/api.js中的`buildApiUrl()`获取环境感知URL
- 开发请求通过Vite代理
- 生产请求直接发送到zimo.club

### 性能监控
- 百度统计自动跟踪页面浏览
- 路由变化触发分析事件
- 查看PERFORMANCE_OPTIMIZATION.md获取详细指标

## 故障排除

### OSS上的路由问题
如果直接URL访问失败:
1. 验证OSS桶静态网站设置
2. 在router/index.js中切换到Hash路由模式
3. 部署后清除CDN缓存

### 构建失败
- 运行`npm run lint`检查代码质量
- 验证所有导入和依赖
- 查看Vite控制台获取具体错误详情

### 开发服务器问题
- 确保Node.js >= 16.0.0
- 如有需要，清除node_modules并重新安装
- 检查端口3000是否可用

## 中文开发者特别说明

### 常见问题解决
- 如遇到样式问题，检查px到rem的转换配置
- API请求失败时，检查跨域配置和代理设置
- 页面路由问题可能与History模式有关，考虑使用Hash模式

### 本地化提示
- 项目中的文本内容主要面向国际学生，请保持英文为主
- UI组件库使用的是Ant Design Vue，可参考其中文文档
- 代码注释可使用中文，但变量名和函数名请使用英文

### 开发工作流
- 建议使用VS Code + Volar插件获得最佳Vue开发体验
- 提交代码前运行lint检查，确保代码质量
- 测试时注意同时检查移动端和桌面端视图
