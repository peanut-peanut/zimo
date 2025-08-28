# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue.js 3 SPA for ZIMO Club (留学咨询平台) - a Chinese study abroad consulting service platform. It's built with modern web technologies and optimized for both desktop and mobile experiences.

## Development Commands

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Building
npm run build            # Production build
npm run build:test       # Test environment build
npm run preview          # Preview production build

# Code Quality
npm run lint             # Run ESLint and auto-fix issues

# Deployment
npm run deploy           # Build and deploy to Alibaba Cloud OSS
npm run upload           # Upload to OSS without building
```

## Architecture Overview

### Tech Stack
- **Framework**: Vue.js 3 with Composition API
- **Build Tool**: Vite 5 with modern ES modules
- **Styling**: Less preprocessor with responsive design (px to rem conversion)
- **Routing**: Vue Router 4 with History mode (fallback to Hash mode for static hosting)
- **UI Components**: Ant Design Vue 4
- **State Management**: Simple store pattern (searchStore.js)

### Project Structure
```
src/
├── pages/              # Route-based page components
│   ├── home/          # Landing page with marketing sections
│   ├── about-us/      # Company information
│   ├── program/       # Study programs catalog
│   ├── guides/        # Educational content by city/topic  
│   ├── documents/     # Legal/policy pages
│   └── successful-cases/ # Success stories
├── components/         # Reusable UI components
├── router/            # Vue Router configuration
├── store/             # Simple state management
├── utils/             # Utilities (API, analytics, SEO)
└── styles/            # Global styles and fonts
```

### Key Features
- **Responsive Design**: Mobile-first with amfe-flexible and postcss-pxtorem
- **SEO Optimized**: Dynamic meta tags via utils/seo.js
- **Analytics**: Baidu Analytics integration with page tracking
- **Performance**: Code splitting, compression (Gzip/Brotli), asset optimization
- **Deployment**: Automated OSS deployment with CDN optimization

## Development Guidelines

### Styling System
- Uses Less preprocessor with 1920px design baseline (192px = 1rem)
- Responsive breakpoints handled via flexible.js
- Global styles in styles/globals.less
- Component-specific styles in .vue files

### Routing Configuration
- Centralized routes in router/routes.js
- SEO metadata in route meta fields
- Automatic scroll-to-top on navigation
- 404 redirects to home page

### API Integration
- Development: Vite proxy to https://www.zimo.club
- Production: Direct API calls
- Centralized API configuration in utils/api.js

### Performance Optimizations
- Manual chunk splitting (vendor, antd, utils)
- Asset categorization (images, fonts, media)
- Terser minification with console removal
- 4KB asset inline threshold

## Deployment Process

### OSS Static Hosting Setup
The project deploys to Alibaba Cloud OSS with static website configuration:
- Index page: `index.html`
- Error page: `index.html` (enables SPA routing)
- HTTPS support with custom domain

### Build Configuration
- Vite handles modern bundling with ES modules
- Compression plugins generate .gz and .br files
- Asset hashing for cache busting
- Source maps disabled in production

### Environment-Specific Builds
- `npm run build`: Production build
- `npm run build:test`: Test environment build
- Development uses Vite dev server with HMR

## Common Development Tasks

### Adding New Pages
1. Create component in `src/pages/[section]/`
2. Add route to `src/router/routes.js`
3. Import component in `src/router/index.js`
4. Add SEO metadata to router beforeEach guard

### Styling Components
- Use Less syntax with nested selectors
- Follow BEM naming convention
- Utilize rem units for responsive design
- Test on both desktop and mobile viewports

### API Integration
- Use `buildApiUrl()` from utils/api.js for environment-aware URLs
- Development requests proxy through Vite
- Production requests go directly to zimo.club

### Performance Monitoring
- Baidu Analytics automatically tracks page views
- Route changes trigger analytics events
- Check PERFORMANCE_OPTIMIZATION.md for detailed metrics

## Troubleshooting

### Routing Issues on OSS
If direct URL access fails:
1. Verify OSS bucket static website settings
2. Switch to Hash routing mode in router/index.js
3. Clear CDN cache after deployment

### Build Failures
- Run `npm run lint` to check code quality
- Verify all imports and dependencies
- Check Vite console for specific error details

### Development Server Issues
- Ensure Node.js >= 16.0.0
- Clear node_modules and reinstall if needed
- Check port 3000 availability