# 环境配置说明

本项目支持多环境配置，根据不同环境自动调整资源路径和构建输出。

## 环境类型

### 开发环境 (development)
- **启动命令**: `npm run dev`
- **特点**: 
  - 热重载开发服务器
  - 不使用资源前缀
  - 图片优化开启
  - 不进行静态导出

### 生产环境 (production)
- **启动命令**: `npm run build`
- **特点**:
  - 静态导出到 `out` 目录
  - 图片优化关闭（适合静态导出）
  - 生成可部署的静态文件

### 测试环境 (test)
- **启动命令**: `npm run build:test`
- **特点**:
  - 类似生产环境但可以有不同配置
  - 可用于预生产测试

## 文件结构

```
src/
  utils/
    env.ts          # 环境配置工具函数
  components/
    EnvironmentInfo.tsx  # 环境信息显示组件（仅开发环境）
```

## 关键配置文件

### next.config.mjs
- 根据 `NODE_ENV` 自动调整配置
- 开发环境：正常Next.js应用
- 生产环境：静态导出 + 资源前缀

### package.json scripts
```json
{
  "dev": "NODE_ENV=development next dev",     // 开发环境
  "build": "NODE_ENV=production next build", // 生产环境
  "build:test": "NODE_ENV=test next build"   // 测试环境
}
```

## 使用资源路径

在组件中使用 `getAssetPath` 函数来获取正确的资源路径：

```tsx
import { getAssetPath } from "../utils/env";

// 使用方式
<Image src={getAssetPath("/assets/image/logo.png")} alt="logo" />
```

## 环境检查

可以使用环境工具函数进行环境判断：

```tsx
import { isDevelopment, isProduction, envConfig } from "../utils/env";

if (isDevelopment()) {
  // 开发环境特定逻辑
}

if (isProduction()) {
  // 生产环境特定逻辑
}

// 或使用配置对象
console.log(envConfig.environment); // 'development' | 'test' | 'production'
```

## 调试环境信息

在开发环境中，可以添加 `EnvironmentInfo` 组件来显示当前环境信息：

```tsx
import EnvironmentInfo from "../components/EnvironmentInfo";

// 在布局或页面中使用
<EnvironmentInfo show={true} />
```

## 部署说明

### 开发环境
```bash
npm run dev
# 访问 http://localhost:3000
```

### 生产环境构建
```bash
npm run build
```

## 注意事项

1. **资源路径**: 所有静态资源都应该使用 `getAssetPath()` 函数
2. **环境变量**: 通过 `envConfig` 对象访问环境相关配置
3. **构建输出**: 生产环境会输出到 `out` 目录，包含所有静态文件
4. **路径前缀**: 生产环境使用 `/zimo` 前缀，确保部署时路径正确 