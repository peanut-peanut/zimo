<template>
  <div class="device-info-debug" v-if="showDebug">
    <div class="debug-header">
      <h3>设备信息调试 🔍</h3>
      <button @click="toggleDebug" class="close-btn">×</button>
    </div>
    
    <div class="debug-content">
      <div class="info-section">
        <h4>设备类型</h4>
        <div class="info-item">
          <span class="label">设备类型:</span>
          <span class="value" :class="deviceInfo.deviceType">{{ deviceInfo.deviceType }}</span>
        </div>
        <div class="info-item">
          <span class="label">是否移动端:</span>
          <span class="value" :class="{ 'mobile': deviceInfo.isMobile }">
            {{ deviceInfo.isMobile ? '是' : '否' }}
          </span>
        </div>
        <div class="info-item">
          <span class="label">操作系统:</span>
          <span class="value">{{ deviceInfo.os }}</span>
        </div>
      </div>

      <div class="info-section">
        <h4>屏幕信息</h4>
        <div class="info-item">
          <span class="label">屏幕分辨率:</span>
          <span class="value">{{ deviceInfo.screenWidth }} × {{ deviceInfo.screenHeight }}</span>
        </div>
        <div class="info-item">
          <span class="label">视口大小:</span>
          <span class="value">{{ deviceInfo.viewportWidth }} × {{ deviceInfo.viewportHeight }}</span>
        </div>
        <div class="info-item">
          <span class="label">屏幕分类:</span>
          <span class="value">{{ screenCategory }}</span>
        </div>
        <div class="info-item">
          <span class="label">视口分类:</span>
          <span class="value">{{ viewportCategory }}</span>
        </div>
      </div>

      <div class="info-section">
        <h4>百度统计上报</h4>
        <div class="info-item">
          <span class="label">设备事件:</span>
          <span class="value">device_info.device_type.{{ deviceInfo.deviceType }}</span>
        </div>
        <div class="info-item">
          <span class="label">系统事件:</span>
          <span class="value">device_info.operating_system.{{ deviceInfo.os }}</span>
        </div>
        <div class="info-item">
          <span class="label">页面设备组合:</span>
          <span class="value">page_device.page_view_by_device.{{ currentPath }}_{{ deviceInfo.deviceType }}</span>
        </div>
      </div>

      <div class="info-section">
        <h4>User Agent</h4>
        <div class="user-agent">{{ deviceInfo.userAgent }}</div>
      </div>

      <div class="action-buttons">
        <button @click="refreshInfo" class="refresh-btn">刷新信息</button>
        <button @click="reportDeviceInfo" class="report-btn">手动上报</button>
      </div>
    </div>
  </div>

  <!-- 悬浮按钮 -->
  <div class="debug-toggle" v-if="!showDebug" @click="toggleDebug">
    📱
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import baiduAnalytics, { getDeviceInfo } from '@/utils/baidu-analytics'

export default {
  name: 'DeviceInfoDebug',
  setup() {
    const showDebug = ref(false)
    const deviceInfo = ref({})
    const route = useRoute()

    const currentPath = computed(() => route.fullPath)

    // 获取屏幕分类
    const screenCategory = computed(() => {
      const width = deviceInfo.value.screenWidth
      if (width <= 480) return 'mobile_small'
      if (width <= 768) return 'mobile_large'
      if (width <= 1024) return 'tablet'
      if (width <= 1366) return 'laptop'
      if (width <= 1920) return 'desktop'
      return 'large_screen'
    })

    // 获取视口分类
    const viewportCategory = computed(() => {
      const width = deviceInfo.value.viewportWidth
      if (width <= 480) return 'narrow'
      if (width <= 768) return 'medium'
      if (width <= 1024) return 'wide'
      if (width <= 1366) return 'extra_wide'
      return 'ultra_wide'
    })

    const toggleDebug = () => {
      showDebug.value = !showDebug.value
    }

    const refreshInfo = () => {
      deviceInfo.value = getDeviceInfo()
      console.log('设备信息已刷新:', deviceInfo.value)
    }

    const reportDeviceInfo = () => {
      baiduAnalytics.trackDeviceInfo(currentPath.value)
      console.log('已手动上报设备信息')
    }

    onMounted(() => {
      refreshInfo()
    })

    return {
      showDebug,
      deviceInfo,
      currentPath,
      screenCategory,
      viewportCategory,
      toggleDebug,
      refreshInfo,
      reportDeviceInfo
    }
  }
}
</script>

<style lang="less" scoped>
.device-info-debug {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 400px;
  max-height: 80vh;
  background: rgba(0, 0, 0, 0.95);
  color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 9999;
  font-size: 12px;
  backdrop-filter: blur(10px);
}

.debug-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255, 107, 53, 0.9);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
  }

  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}

.debug-content {
  max-height: calc(80vh - 60px);
  overflow-y: auto;
  padding: 16px;
}

.info-section {
  margin-bottom: 16px;

  h4 {
    margin: 0 0 8px 0;
    font-size: 12px;
    color: #ffd255;
    border-bottom: 1px solid rgba(255, 210, 85, 0.3);
    padding-bottom: 4px;
  }
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  padding: 4px 0;

  .label {
    font-weight: 500;
    color: #ccc;
  }

  .value {
    font-family: 'Monaco', 'Courier New', monospace;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.1);
    
    &.mobile {
      background: rgba(76, 175, 80, 0.8);
      color: white;
    }

    &.desktop {
      background: rgba(33, 150, 243, 0.8);
      color: white;
    }

    &.tablet {
      background: rgba(156, 39, 176, 0.8);
      color: white;
    }
  }
}

.user-agent {
  background: rgba(255, 255, 255, 0.1);
  padding: 8px;
  border-radius: 6px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 10px;
  line-height: 1.4;
  word-break: break-all;
}

.action-buttons {
  display: flex;
  gap: 8px;
  margin-top: 12px;

  button {
    flex: 1;
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .refresh-btn {
    background: rgba(33, 150, 243, 0.8);
    color: white;

    &:hover {
      background: rgba(33, 150, 243, 1);
    }
  }

  .report-btn {
    background: rgba(76, 175, 80, 0.8);
    color: white;

    &:hover {
      background: rgba(76, 175, 80, 1);
    }
  }
}

.debug-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  background: rgba(255, 107, 53, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  z-index: 9998;
  transition: all 0.3s;
  backdrop-filter: blur(10px);

  &:hover {
    transform: scale(1.1);
    background: rgba(255, 107, 53, 1);
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .device-info-debug {
    width: calc(100vw - 40px);
    right: 20px;
    left: 20px;
    max-height: 70vh;
  }
  
  .debug-toggle {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}
</style> 