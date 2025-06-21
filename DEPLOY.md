# 部署指南

## OSS静态网站部署问题解决方案

### 问题描述
Vue SPA项目在阿里云OSS上部署时，所有GET请求都被当作OSS资源访问，导致路由无法正常工作。

### 解决方案

#### 方案1: OSS静态网站配置（推荐）
部署脚本已自动配置OSS的静态网站托管设置：
- 索引页面：`index.html`
- 错误页面：`index.html` （关键设置）

这样当用户访问不存在的路径时，OSS会返回 `index.html`，让Vue Router处理路由。

#### 方案2: 使用Hash路由模式
如果方案1不生效，可以修改路由配置：

1. 打开 `src/router/index.js`
2. 注释掉当前的import和history设置
3. 取消注释Hash路由相关代码：

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // ...
})
```

### 部署步骤

1. **配置OSS信息**
   ```bash
   cp oss-config.example.js oss-config.js
   # 编辑 oss-config.js 填入您的OSS配置
   ```

2. **执行部署**
   ```bash
   node deploy.js
   ```

3. **仅上传（不构建）**
   ```bash
   node deploy.js upload
   ```

### 验证部署

1. 访问网站首页：`https://your-domain.com`
2. 直接访问子路由：`https://your-domain.com/guides/study-in-china`
3. 在子路由页面刷新浏览器，确认不会出现404错误

### 故障排除

如果仍然出现路由问题：

1. **检查OSS Bucket设置**
   - 登录阿里云OSS控制台
   - 进入您的Bucket
   - 查看"基础设置" > "静态页面"
   - 确认"默认首页"和"默认404页"都设置为 `index.html`

2. **使用Hash路由模式**
   - 按照上述方案2修改路由配置
   - 重新构建和部署

3. **清理CDN缓存**
   - 如果使用了CDN，记得清理缓存

### 注意事项

- OSS静态网站配置需要Bucket有相应权限
- 如果使用自定义域名，需要配置域名解析
- 建议开启HTTPS访问 