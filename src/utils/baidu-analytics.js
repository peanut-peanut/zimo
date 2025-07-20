/**
 * 百度统计工具类
 * 提供统一的埋点上报方法
 */

// 导入设备检测函数
import { getDeviceType, isMobileDevice, isIOS, isAndroid } from './common.js'

class BaiduAnalytics {
  constructor() {
    this.isReady = false
    this.isLocalhost = this.checkIsLocalhost()
    this.deviceInfo = this.getDeviceInfo()
    this.checkReady()
  }

  /**
   * 获取设备信息
   */
  getDeviceInfo() {
    if (typeof window === 'undefined') {
      return {
        deviceType: 'unknown',
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        os: 'unknown',
        screenWidth: 0,
        screenHeight: 0,
        userAgent: ''
      }
    }

    const deviceType = getDeviceType()
    const userAgent = navigator.userAgent

    return {
      deviceType: deviceType, // mobile, tablet, desktop
      isMobile: deviceType === 'mobile',
      isTablet: deviceType === 'tablet', 
      isDesktop: deviceType === 'desktop',
      os: isIOS() ? 'ios' : isAndroid() ? 'android' : 'other',
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      userAgent: userAgent
    }
  }

  /**
   * 检查是否为本地环境
   */
  checkIsLocalhost() {
    if (typeof window === 'undefined') return false
    
    const hostname = window.location.hostname
    const isLocalhost = hostname === 'localhost' || 
                       hostname === '127.0.0.1' || 
                       hostname === '0.0.0.0' ||
                       hostname.startsWith('192.168.') ||
                       hostname.startsWith('10.') ||
                       hostname.endsWith('.local')
    
    if (isLocalhost) {
      console.log('🚫 检测到本地环境，百度统计已禁用:', hostname)
    }
    
    return isLocalhost
  }

  /**
   * 检查百度统计是否准备就绪
   */
  checkReady() {
    if (this.isLocalhost) {
      this.isReady = false
      return
    }
    
    if (typeof window !== 'undefined' && typeof _hmt !== 'undefined') {
      this.isReady = true
    } else {
      // 延迟检查
      setTimeout(() => {
        this.checkReady()
      }, 500)
    }
  }

  /**
   * 页面访问上报 (PV)
   * @param {string} path - 页面路径
   */
  trackPageView(path) {
    if (this.isLocalhost) {
      console.log('🏠 本地环境 - 页面访问上报 (未发送):', path, this.deviceInfo)
      return
    }
    
    if (this.isReady) {
      // 基础页面访问上报
      _hmt.push(['_trackPageview', path])
      
      // 上报设备类型信息
      this.trackDeviceInfo(path)
      
      console.log('📊 百度统计 - 页面访问上报:', {
        path: path,
        deviceType: this.deviceInfo.deviceType,
        screenSize: `${this.deviceInfo.screenWidth}x${this.deviceInfo.screenHeight}`,
        viewport: `${this.deviceInfo.viewportWidth}x${this.deviceInfo.viewportHeight}`
      })
    } else {
      console.warn('⚠️ 百度统计未就绪，无法上报页面访问:', path)
    }
  }

  /**
   * 设备信息上报
   * @param {string} currentPage - 当前页面路径
   */
  trackDeviceInfo(currentPage = '') {
    if (this.isLocalhost) {
      console.log('🏠 本地环境 - 设备信息上报 (未发送):', this.deviceInfo)
      return
    }

    // 上报设备类型
    this.trackEvent('device_info', 'device_type', this.deviceInfo.deviceType, 1)
    
    // 上报操作系统
    this.trackEvent('device_info', 'operating_system', this.deviceInfo.os, 1)
    
    // 上报屏幕分辨率范围
    const screenCategory = this.getScreenCategory(this.deviceInfo.screenWidth)
    this.trackEvent('device_info', 'screen_resolution', screenCategory, 1)
    
    // 上报视口大小范围
    const viewportCategory = this.getViewportCategory(this.deviceInfo.viewportWidth)
    this.trackEvent('device_info', 'viewport_size', viewportCategory, 1)
    
    // 上报页面和设备类型的组合信息
    if (currentPage) {
      const pageDevice = `${currentPage}_${this.deviceInfo.deviceType}`
      this.trackEvent('page_device', 'page_view_by_device', pageDevice, 1)
    }
  }

  /**
   * 获取屏幕分辨率分类
   * @param {number} width - 屏幕宽度
   * @returns {string} 分辨率分类
   */
  getScreenCategory(width) {
    if (width <= 480) return 'mobile_small'      // ≤480px
    if (width <= 768) return 'mobile_large'      // 481-768px  
    if (width <= 1024) return 'tablet'           // 769-1024px
    if (width <= 1366) return 'laptop'           // 1025-1366px
    if (width <= 1920) return 'desktop'          // 1367-1920px
    return 'large_screen'                        // >1920px
  }

  /**
   * 获取视口大小分类
   * @param {number} width - 视口宽度
   * @returns {string} 视口分类
   */
  getViewportCategory(width) {
    if (width <= 480) return 'narrow'            // ≤480px
    if (width <= 768) return 'medium'            // 481-768px
    if (width <= 1024) return 'wide'             // 769-1024px
    if (width <= 1366) return 'extra_wide'       // 1025-1366px
    return 'ultra_wide'                          // >1366px
  }

  /**
   * 事件上报
   * @param {string} category - 事件类别
   * @param {string} action - 事件动作
   * @param {string} label - 事件标签
   * @param {number} value - 事件值
   */
  trackEvent(category, action, label = '', value = 0) {
    if (this.isLocalhost) {
      console.log('🏠 本地环境 - 事件上报 (未发送):', { category, action, label, value })
      return
    }
    
    if (this.isReady) {
      _hmt.push(['_trackEvent', category, action, label, value])
      console.log('📊 百度统计 - 事件上报:', { category, action, label, value })
    } else {
      console.warn('⚠️ 百度统计未就绪，无法上报事件:', { category, action, label, value })
    }
  }

  /**
   * 用户行为上报
   * @param {string} action - 行为动作
   * @param {string} page - 页面名称
   * @param {object} extra - 额外信息
   */
  trackUserAction(action, page, extra = {}) {
    if (this.isLocalhost) {
      console.log('🏠 本地环境 - 用户行为上报 (未发送):', { action, page, extra })
      return
    }
    
    this.trackEvent('user_action', action, page, 1)
    
    // 如果有额外信息，也上报
    if (Object.keys(extra).length > 0) {
      this.trackEvent('user_action_detail', action, JSON.stringify(extra), 1)
    }
  }

  /**
   * 页面停留时间上报
   * @param {string} page - 页面名称
   * @param {number} duration - 停留时间（秒）
   */
  trackPageDuration(page, duration) {
    if (this.isLocalhost) {
      console.log('🏠 本地环境 - 页面停留时间上报 (未发送):', { page, duration })
      return
    }
    this.trackEvent('page_duration', 'stay_time', page, duration)
  }

  /**
   * 表单提交上报
   * @param {string} formName - 表单名称
   * @param {string} result - 提交结果 (success/fail)
   */
  trackFormSubmit(formName, result) {
    if (this.isLocalhost) {
      console.log('🏠 本地环境 - 表单提交上报 (未发送):', { formName, result })
      return
    }
    this.trackEvent('form_submit', result, formName, 1)
  }

  /**
   * 链接点击上报
   * @param {string} linkType - 链接类型
   * @param {string} linkUrl - 链接地址
   * @param {string} linkText - 链接文本
   */
  trackLinkClick(linkType, linkUrl, linkText = '') {
    if (this.isLocalhost) {
      console.log('🏠 本地环境 - 链接点击上报 (未发送):', { linkType, linkUrl, linkText })
      return
    }
    this.trackEvent('link_click', linkType, linkUrl, 1)
    if (linkText) {
      this.trackEvent('link_click_text', linkType, linkText, 1)
    }
  }

  /**
   * 文件下载上报
   * @param {string} fileName - 文件名
   * @param {string} fileType - 文件类型
   */
  trackDownload(fileName, fileType) {
    if (this.isLocalhost) {
      console.log('🏠 本地环境 - 文件下载上报 (未发送):', { fileName, fileType })
      return
    }
    this.trackEvent('download', fileType, fileName, 1)
  }

  /**
   * 搜索行为上报
   * @param {string} keyword - 搜索关键词
   * @param {number} resultCount - 搜索结果数量
   */
  trackSearch(keyword, resultCount = 0) {
    if (this.isLocalhost) {
      console.log('🏠 本地环境 - 搜索行为上报 (未发送):', { keyword, resultCount })
      return
    }
    this.trackEvent('search', 'keyword', keyword, resultCount)
  }

  /**
   * 视频播放上报
   * @param {string} videoTitle - 视频标题
   * @param {string} action - 播放动作 (play/pause/end)
   */
  trackVideo(videoTitle, action) {
    if (this.isLocalhost) {
      console.log('🏠 本地环境 - 视频播放上报 (未发送):', { videoTitle, action })
      return
    }
    this.trackEvent('video', action, videoTitle, 1)
  }

  /**
   * 社交分享上报
   * @param {string} platform - 分享平台
   * @param {string} content - 分享内容
   */
  trackShare(platform, content) {
    if (this.isLocalhost) {
      console.log('🏠 本地环境 - 社交分享上报 (未发送):', { platform, content })
      return
    }
    this.trackEvent('share', platform, content, 1)
  }

  /**
   * 错误上报
   * @param {string} errorType - 错误类型
   * @param {string} errorMessage - 错误信息
   */
  trackError(errorType, errorMessage) {
    if (this.isLocalhost) {
      console.log('🏠 本地环境 - 错误上报 (未发送):', { errorType, errorMessage })
      return
    }
    this.trackEvent('error', errorType, errorMessage, 1)
  }
}

// 创建单例实例
const baiduAnalytics = new BaiduAnalytics()

export default baiduAnalytics

// 导出常用方法的简化版本
export const trackPageView = (path) => baiduAnalytics.trackPageView(path)
export const trackEvent = (category, action, label, value) => baiduAnalytics.trackEvent(category, action, label, value)
export const trackUserAction = (action, page, extra) => baiduAnalytics.trackUserAction(action, page, extra)
export const trackFormSubmit = (formName, result) => baiduAnalytics.trackFormSubmit(formName, result)
export const trackLinkClick = (linkType, linkUrl, linkText) => baiduAnalytics.trackLinkClick(linkType, linkUrl, linkText)
export const trackDownload = (fileName, fileType) => baiduAnalytics.trackDownload(fileName, fileType)
export const trackSearch = (keyword, resultCount) => baiduAnalytics.trackSearch(keyword, resultCount)
export const trackVideo = (videoTitle, action) => baiduAnalytics.trackVideo(videoTitle, action)
export const trackShare = (platform, content) => baiduAnalytics.trackShare(platform, content)
export const trackError = (errorType, errorMessage) => baiduAnalytics.trackError(errorType, errorMessage)
export const trackDeviceInfo = (currentPage) => baiduAnalytics.trackDeviceInfo(currentPage)

// 导出设备信息获取方法
export const getDeviceInfo = () => baiduAnalytics.deviceInfo 