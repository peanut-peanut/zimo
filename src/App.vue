<template>
  <div id="app">
    <router-view />
    <!-- 开发环境下显示设备信息调试组件 -->
    <DeviceInfoDebug v-if="isDevelopment" />
  </div>
</template>

<script>
import DeviceInfoDebug from '@/components/DeviceInfoDebug.vue'

export default {
  name: 'App',
  components: {
    DeviceInfoDebug
  },
  data() {
    return {
      isDevelopment: import.meta.env.DEV
    }
  }
}
</script>

<style lang="less">
// 全局样式已在main.js中引入
</style> 