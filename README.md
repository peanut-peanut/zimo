# 🎓 ZIMO Club - 留学咨询平台

<div align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.4.21-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue.js">
  <img src="https://img.shields.io/badge/Vite-5.2.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Less-4.2.0-1D365D?style=for-the-badge&logo=less&logoColor=white" alt="Less">
  <img src="https://img.shields.io/badge/Vue_Router-4.3.0-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue Router">
</div>

<div align="center">
  <h3>中国留学咨询服务平台</h3>
  <p>为海外华人和国际学生提供全方位的中国留学咨询和服务</p>
</div>

---

## ✨ 项目特性

### 🎨 现代化UI设计
- **响应式布局** - 完美适配桌面端和移动端
- **Apple风格动画** - 流畅的渐入动画效果
- **现代化配色** - 橙色主题 (#FF6B35) 搭配简洁设计
- **交互式组件** - 丰富的hover效果和过渡动画

### 🚀 技术亮点
- **Vue 3 Composition API** - 最新的Vue 3特性
- **Vite构建工具** - 极速的开发体验
- **Less预处理器** - 强大的CSS扩展
- **ESLint代码规范** - 保证代码质量
- **一键部署OSS** - 自动化部署到阿里云OSS

### 📱 核心功能
- **品牌展示** - 专业的品牌形象展示
- **服务介绍** - 详细的留学服务说明
- **优秀项目** - 成功案例展示
- **关于我们** - 团队和公司介绍
- **联系方式** - 多渠道联系方式

## 🏗️ 技术栈

| 技术 | 版本 | 描述 |
|------|------|------|
| Vue.js | 3.4.21 | 渐进式JavaScript框架 |
| Vite | 5.2.0 | 下一代前端构建工具 |
| Vue Router | 4.3.0 | Vue.js官方路由管理器 |
| Less | 4.2.0 | CSS预处理器 |
| ESLint | 8.57.0 | JavaScript代码检查工具 |
| Ali-OSS | 6.20.0 | 阿里云对象存储SDK |

## 🚀 快速开始

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
# 克隆项目
git clone git@github.com:peanut-peanut/zimo.git

# 进入项目目录
cd zimo

# 安装依赖
npm install
```

### 开发环境
```bash
# 启动开发服务器
npm run dev

# 项目将在 http://localhost:5173 运行
```

### 构建部署
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 一键部署到OSS
npm run deploy
```

## 📁 项目结构

```
zimo/
├── public/                  # 静态资源
├── src/                     # 源代码
│   ├── components/          # 公共组件
│   │   └── SectionTitle.vue # 章节标题组件
│   │       └── ...
│   ├── pages/              # 页面组件
│   │   └── home/           # 首页相关
│   │       ├── index.vue   # 首页主组件
│   │       └── components/ # 首页子组件
│   │           ├── Header/         # 头部导航
│   │           ├── Hero/           # 英雄区域
│   │           ├── WhyChooseChina/ # 选择中国原因
│   │           ├── WhyChooseZimo/  # 选择ZIMO原因
│   │           ├── OutstandingPrograms/ # 优秀项目
│   │           ├── AboutUs/        # 关于我们
│   │           └── Footer/         # 页脚
│   ├── router/             # 路由配置
│   ├── style.css          # 全局样式
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── upload-to-oss.js       # OSS上传脚本
├── oss-config.example.js  # OSS配置示例
├── vite.config.js         # Vite配置
├── package.json           # 项目配置
└── README.md              # 项目文档
```

## 🎨 核心组件介绍

### 🏠 Header 头部导航
- 滚动时背景色动态变化
- 响应式导航菜单
- 平滑滚动到指定章节

### 🌟 Hero 英雄区域
- 品牌标语展示
- 渐变背景效果
- 行动号召按钮

### 🇨🇳 WhyChooseChina 选择中国
- Apple风格渐入动画
- 卡片式布局
- 图文并茂展示

### 🏆 WhyChooseZimo 选择ZIMO
- 鼠标悬停效果
- 图片缩放动画
- 立体阴影效果

### 📊 OutstandingPrograms 优秀项目
- 项目卡片展示  
- 统一的悬停效果
- 响应式网格布局

### 👥 AboutUs 关于我们
- 团队介绍
- 公司愿景
- 联系信息

## 🎬 动画效果

### Apple风格渐入动画
- 基于Intersection Observer API
- 文本从下方30px淡入
- 卡片元素200ms延迟效果
- 使用Apple风格缓动函数 `cubic-bezier(0.25, 0.46, 0.45, 0.94)`

### 悬停交互效果
- 盒阴影增强
- Y轴位移效果
- 图片缩放动画
- 平滑过渡动画

## 🔧 开发指南

### 代码规范
```bash
# 代码检查
npm run lint

# 自动修复
npm run lint -- --fix
```

### 样式开发
- 使用Less预处理器
- 遵循BEM命名规范
- 响应式设计优先

### 组件开发
- 使用Vue 3 Composition API
- 单文件组件(.vue)
- Props类型检查

## 🚀 部署指南

### OSS部署配置

1. **复制配置文件**
```bash
cp oss-config.example.js oss-config.js
```

2. **编辑配置信息**
```javascript
export default {
  region: 'oss-ap-southeast-1',
  accessKeyId: 'YOUR_ACCESS_KEY_ID', //联系开发者获取
  accessKeySecret: 'YOUR_ACCESS_KEY_SECRET',//联系开发者获取
   bucket: 'zimo-club',
}
```

3. **执行部署**
```bash
npm run deploy
```

详细部署说明请参考 [DEPLOY.md](./DEPLOY.md)

### 可用脚本

| 命令 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览构建结果 |
| `npm run lint` | 代码检查 |
| `npm run deploy` | 构建并部署到OSS |
| `npm run upload` | 仅上传到OSS |

## 🌐 浏览器支持

| 浏览器 | 版本 |
|---------|------|
| Chrome | >= 87 |
| Firefox | >= 78 |
| Safari | >= 14 |
| Edge | >= 88 |

## 📈 性能优化

### 构建优化
- Vite的ES模块热更新
- 代码分割和懒加载
- 静态资源压缩

### 缓存策略
- HTML文件：no-cache
- 静态资源：缓存1年
- 其他文件：缓存1小时

### 加载优化
- 图片懒加载
- 关键CSS内联
- 资源预加载

## 🐛 故障排除

### 常见问题

**Q: 开发服务器启动失败**
```bash
# 清除依赖重新安装
rm -rf node_modules package-lock.json
npm install
```

**Q: 构建失败**
```bash
# 检查代码规范
npm run lint
```

**Q: OSS部署失败**
```bash
# 检查配置文件
cat oss-config.js
# 检查网络连接
ping oss-cn-hongkong.aliyuncs.com
```

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

### 提交规范
```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式化
refactor: 代码重构
test: 测试相关
chore: 构建过程或辅助工具的变动
```

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系我们

- **官网**: [https://zimo-club.com](https://zimo-club.com)
- **邮箱**: contact@zimo-club.com
- **微信**: zimo-club-official

---

<div align="center">
  <p>Made with ❤️ by ZIMO Club Team</p>
  <p>© 2024 ZIMO Club. All rights reserved.</p>
</div>
