# 网站性能优化指南

## 当前问题分析
- 字体文件过大：3个阿里巴巴普惠体字体文件总共约20MB+
- 图片资源未优化：Home目录下图片资源达到11MB
- 新加坡到中国大陆的网络延迟
- 首次加载需要下载所有资源

## 已实施的优化方案

### 1. 构建优化
- ✅ 启用Terser压缩，移除console和debugger
- ✅ 启用Gzip和Brotli压缩
- ✅ 代码分割和懒加载
- ✅ 静态资源分类管理

### 2. 字体优化
- ✅ 添加`font-display: swap`提升字体加载性能
- ✅ 提供系统字体回退方案
- 📝 **建议**: 考虑使用Web字体子集化工具减小字体文件大小

### 3. 图片优化
- ✅ 创建懒加载组件`LazyImage.vue`
- 📝 **建议**: 使用图片压缩工具压缩现有图片
- 📝 **建议**: 考虑使用WebP格式

### 4. 缓存策略
- ✅ HTML文件不缓存(`no-cache`)
- ✅ 静态资源缓存1年(`max-age=31536000`)
- ✅ 支持压缩文件的正确Content-Encoding

## 使用方法

### 1. 安装依赖
```bash
npm install
```

### 2. 使用懒加载图片组件
```vue
<template>
  <LazyImage 
    src="/assets/image/Home/OutstandingPrograms/OutstandingPrograms1.png"
    alt="优秀项目1"
    aspect-ratio="56.25%"
  />
</template>

<script>
import LazyImage from '@/components/LazyImage.vue'
export default {
  components: { LazyImage }
}
</script>
```

### 3. 使用优化字体
在组件中使用字体类：
```vue
<template>
  <div class="font-alibaba-regular">常规文本</div>
  <div class="font-alibaba-medium">中等粗细文本</div>
  <div class="font-alibaba-bold">粗体文本</div>
</template>
```

### 4. 构建和部署
```bash
# 构建项目（会自动生成压缩文件）
npm run build

# 部署到OSS
npm run deploy
```

## 进一步优化建议

### 1. 图片优化
```bash
# 安装图片压缩工具
npm install -g imagemin-cli

# 压缩PNG图片
imagemin public/assets/image/**/*.png --out-dir=public/assets/image-optimized --plugin=pngquant

# 压缩JPG图片
imagemin public/assets/image/**/*.jpg --out-dir=public/assets/image-optimized --plugin=mozjpeg
```

### 2. 字体子集化
使用在线工具或命令行工具对字体进行子集化，只保留网站使用的字符：
- 中文常用字符（约3000-4000个）
- 英文字母和数字
- 常用标点符号

### 3. CDN加速
考虑使用以下CDN服务来加速中国大陆用户的访问：
- 阿里云CDN
- 腾讯云CDN
- 七牛云CDN

### 4. 预加载关键资源
在HTML中添加关键资源的预加载：
```html
<link rel="preload" href="/assets/font/AlibabaPuHuiTi-2-55-Regular.otf" as="font" type="font/otf" crossorigin>
<link rel="preload" href="/assets/css/main.css" as="style">
```

### 5. 服务端配置
如果可能，在服务端配置：
- 启用HTTP/2
- 启用服务端压缩
- 设置合适的缓存头

## 性能监测
建议使用以下工具监测性能：
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Chrome DevTools

## 预期效果
通过这些优化，预期可以获得：
- 首次加载时间减少60-80%
- 资源文件大小减少40-60%
- 用户体验显著提升 