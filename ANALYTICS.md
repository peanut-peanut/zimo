# 百度统计埋点接入说明

## 概述

本项目已完成百度统计的埋点接入，实现了全面的用户行为追踪和数据分析。

## 已实现功能

### 1. 基础配置

- ✅ 百度统计代码已添加到 `index.html`
- ✅ 统计ID: `d6a3fc6c84bf577e061b8a239b2f0aa7`
- ✅ 自动页面访问统计 (PV/UV)

### 2. 路由级别统计

**文件**: `src/router/index.js`

- ✅ 自动页面访问上报
- ✅ 路由切换事件追踪
- ✅ 页面标题信息上报

**支持的页面**:
- 首页 (/)
- 项目页面 (/program)
- 关于我们 (/about-us)
- 成功案例 (/successful-cases)
- 申请页面 (/apply-now)
- 指南页面 (/guides/*)

### 3. 表单统计

**文件**: `src/pages/apply-now/index.vue`

- ✅ 表单提交开始事件
- ✅ 表单验证失败事件
- ✅ 表单提交成功事件
- ✅ API调用失败事件
- ✅ 用户画像数据（国家、学位、专业兴趣）
- ✅ 错误信息上报

### 4. 导航统计

**文件**: `src/pages/home/components/Header/index.vue`

- ✅ 主导航点击统计
- ✅ Guides子菜单点击统计
- ✅ 外部链接跳转统计
- ✅ 内部页面跳转统计

### 5. 社交媒体统计

**文件**: `src/pages/about-us/components/Footer/index.vue`

- ✅ 社交媒体图标悬停统计
- ✅ 外部社交平台跳转统计
- ✅ 联系方式展示统计

## 工具类

### 百度统计工具类

**文件**: `src/utils/baidu-analytics.js`

提供统一的埋点上报方法：

```javascript
import baiduAnalytics from '@/utils/baidu-analytics'

// 页面访问上报
baiduAnalytics.trackPageView('/page-path')

// 事件上报
baiduAnalytics.trackEvent('category', 'action', 'label', value)

// 表单提交上报
baiduAnalytics.trackFormSubmit('formName', 'result')

// 链接点击上报
baiduAnalytics.trackLinkClick('linkType', 'url', 'text')

// 用户行为上报
baiduAnalytics.trackUserAction('action', 'page', extraData)
```

### 配置文件

**文件**: `src/utils/analytics-config.js`

统一管理所有埋点事件配置：

```javascript
import { EVENT_CATEGORIES, FORM_EVENTS } from '@/utils/analytics-config'

// 使用预定义的事件类别
baiduAnalytics.trackEvent(
  EVENT_CATEGORIES.FORM_INTERACTION,
  FORM_EVENTS.APPLICATION_FORM.SUBMIT_SUCCESS,
  'application_form',
  1
)
```

## 统计数据类型

### 1. 页面访问统计
- **PV (Page View)**: 页面浏览量
- **UV (Unique Visitor)**: 独立访客数
- **页面停留时间**: 用户在页面的停留时长
- **跳出率**: 单页面访问后离开的比例

### 2. 用户行为统计
- **导航点击**: 主菜单和子菜单点击
- **表单交互**: 表单提交、验证、字段操作
- **社交媒体**: 社交平台图标交互
- **链接跳转**: 内部和外部链接点击

### 3. 业务数据统计
- **用户画像**: 国家、年龄、学历兴趣
- **转化漏斗**: 浏览→申请→提交的转化路径
- **错误追踪**: API错误、表单错误等

### 4. 技术统计
- **性能监控**: 页面加载时间、API响应时间
- **错误监控**: JavaScript错误、资源加载失败

## 如何查看数据

1. 登录百度统计后台: https://tongji.baidu.com
2. 选择对应的网站
3. 查看以下报表：
   - **概况**: PV、UV、跳出率等基础数据
   - **实时访客**: 当前在线用户行为
   - **来源分析**: 用户来源渠道
   - **页面分析**: 各页面访问情况
   - **事件分析**: 自定义事件统计
   - **转化分析**: 业务转化数据

## 数据分析建议

### 1. 关键指标监控
- **日活跃用户数** (DAU)
- **申请表单转化率**
- **页面平均停留时间**
- **主要流量来源**

### 2. 用户行为分析
- **热门页面排行**
- **用户访问路径**
- **表单放弃率**
- **社交媒体点击率**

### 3. 业务优化方向
- **高跳出率页面优化**
- **表单流程简化**
- **内容质量提升**
- **用户体验改进**

## 扩展功能

### 1. 自定义事件添加

```javascript
// 在任何组件中添加自定义埋点
import baiduAnalytics from '@/utils/baidu-analytics'

// 示例：视频播放统计
const handleVideoPlay = () => {
  baiduAnalytics.trackVideo('宣传视频', 'play')
}

// 示例：文件下载统计
const handleDownload = (fileName) => {
  baiduAnalytics.trackDownload(fileName, 'pdf')
}
```

### 2. 滚动深度统计

```javascript
// 可添加滚动深度统计
const trackScrollDepth = (depth) => {
  baiduAnalytics.trackEvent('user_behavior', 'scroll_depth', `${depth}%`, depth)
}
```

### 3. 页面停留时间统计

```javascript
// 在页面卸载时统计停留时间
onUnmounted(() => {
  const duration = Math.floor((Date.now() - pageStartTime) / 1000)
  baiduAnalytics.trackPageDuration(pageName, duration)
})
```

## 注意事项

1. **隐私保护**: 不上报用户敏感信息（手机号、邮箱等）
2. **性能影响**: 埋点代码已优化，对页面性能影响最小
3. **调试模式**: 开发环境下会在控制台显示上报日志
4. **数据准确性**: 确保埋点逻辑正确，避免重复上报

## 故障排除

### 1. 数据不显示
- 检查百度统计代码是否正确加载
- 确认统计ID是否正确
- 查看浏览器控制台是否有错误

### 2. 事件不触发
- 检查事件绑定是否正确
- 确认埋点代码是否执行
- 查看网络请求是否发送成功

### 3. 数据异常
- 检查埋点逻辑是否有重复上报
- 确认事件参数是否正确
- 查看百度统计后台设置

## 联系支持

如有技术问题或需要添加新的埋点需求，请联系开发团队。 