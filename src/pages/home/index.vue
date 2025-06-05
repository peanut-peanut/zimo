<template>
  <main class="min-h-screen">
    <!-- 首屏关键组件 -->
    <Header />
    <Hero />
    
    <!-- 懒加载的非首屏组件 -->
    <Suspense>
      <template #default>
        <WhyChooseChina />
      </template>
      <template #fallback>
        <LoadingComponent height="300px" />
      </template>
    </Suspense>
    
    <Suspense>
      <template #default>
        <WhyChooseZimo />
      </template>
      <template #fallback>
        <LoadingComponent height="400px" />
      </template>
    </Suspense>
    
    <Suspense>
      <template #default>
        <StarReviews />
      </template>
      <template #fallback>
        <LoadingComponent height="350px" />
      </template>
    </Suspense>
    
    <Suspense>
      <template #default>
        <OutstandingPrograms />
      </template>
      <template #fallback>
        <LoadingComponent height="500px" />
      </template>
    </Suspense>
    
    <Suspense>
      <template #default>
        <ApplicationProcess />
      </template>
      <template #fallback>
        <LoadingComponent height="300px" />
      </template>
    </Suspense>
    
    <Suspense>
      <template #default>
        <AboutUs />
      </template>
      <template #fallback>
        <LoadingComponent height="400px" />
      </template>
    </Suspense>
    
    <Suspense>
      <template #default>
        <Footer />
      </template>
      <template #fallback>
        <LoadingComponent />
      </template>
    </Suspense>
  </main>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import Header from './components/Header/index.vue'
import Hero from './components/Hero/index.vue'

// 懒加载非首屏组件
const WhyChooseChina = defineAsyncComponent(() => import('./components/WhyChooseChina/index.vue'))
const WhyChooseZimo = defineAsyncComponent(() => import('./components/WhyChooseZimo/index.vue'))
const StarReviews = defineAsyncComponent(() => import('./components/StarReviews/index.vue'))
const OutstandingPrograms = defineAsyncComponent(() => import('./components/OutstandingPrograms/index.vue'))
const ApplicationProcess = defineAsyncComponent(() => import('./components/ApplicationProcess/index.vue'))
const AboutUs = defineAsyncComponent(() => import('./components/AboutUs/index.vue'))
const Footer = defineAsyncComponent(() => import('./components/Footer/index.vue'))

// 加载占位组件
const LoadingComponent = {
  props: {
    height: {
      type: String,
      default: '200px'
    }
  },
  template: `
    <div class="flex items-center justify-center" :style="{ height }">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
    </div>
  `
}

export default {
  name: 'Home',
  components: {
    Header,
    Hero,
    WhyChooseChina,
    WhyChooseZimo,
    StarReviews,
    OutstandingPrograms,
    ApplicationProcess,
    AboutUs,
    Footer,
    LoadingComponent
  },
  mounted() {
    // 设置页面标题和meta信息
    document.title = 'ZIMO - 您的中国留学伙伴'
    
    // 设置meta描述
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'ZIMO帮助国际学生找到完美的中国大学，并提供全方位的支持服务。')
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = 'ZIMO帮助国际学生找到完美的中国大学，并提供全方位的支持服务。'
      document.head.appendChild(meta)
    }
  }
}
</script>

<style lang="less" scoped>
</style> 