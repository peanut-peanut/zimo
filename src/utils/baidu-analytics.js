/**
 * 百度统计工具类
 * 提供统一的埋点上报方法
 */

class BaiduAnalytics {
  constructor() {
    this.isReady = false
    this.checkReady()
  }

  /**
   * 检查百度统计是否准备就绪
   */
  checkReady() {
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
    if (this.isReady) {
      _hmt.push(['_trackPageview', path])
      console.log('百度统计 - 页面访问上报:', path)
    } else {
      console.warn('百度统计未就绪，无法上报页面访问:', path)
    }
  }

  /**
   * 事件上报
   * @param {string} category - 事件类别
   * @param {string} action - 事件动作
   * @param {string} label - 事件标签
   * @param {number} value - 事件值
   */
  trackEvent(category, action, label = '', value = 0) {
    if (this.isReady) {
      _hmt.push(['_trackEvent', category, action, label, value])
      console.log('百度统计 - 事件上报:', { category, action, label, value })
    } else {
      console.warn('百度统计未就绪，无法上报事件:', { category, action, label, value })
    }
  }

  /**
   * 用户行为上报
   * @param {string} action - 行为动作
   * @param {string} page - 页面名称
   * @param {object} extra - 额外信息
   */
  trackUserAction(action, page, extra = {}) {
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
    this.trackEvent('page_duration', 'stay_time', page, duration)
  }

  /**
   * 表单提交上报
   * @param {string} formName - 表单名称
   * @param {string} result - 提交结果 (success/fail)
   */
  trackFormSubmit(formName, result) {
    this.trackEvent('form_submit', result, formName, 1)
  }

  /**
   * 链接点击上报
   * @param {string} linkType - 链接类型
   * @param {string} linkUrl - 链接地址
   * @param {string} linkText - 链接文本
   */
  trackLinkClick(linkType, linkUrl, linkText = '') {
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
    this.trackEvent('download', fileType, fileName, 1)
  }

  /**
   * 搜索行为上报
   * @param {string} keyword - 搜索关键词
   * @param {number} resultCount - 搜索结果数量
   */
  trackSearch(keyword, resultCount = 0) {
    this.trackEvent('search', 'keyword', keyword, resultCount)
  }

  /**
   * 视频播放上报
   * @param {string} videoTitle - 视频标题
   * @param {string} action - 播放动作 (play/pause/end)
   */
  trackVideo(videoTitle, action) {
    this.trackEvent('video', action, videoTitle, 1)
  }

  /**
   * 社交分享上报
   * @param {string} platform - 分享平台
   * @param {string} content - 分享内容
   */
  trackShare(platform, content) {
    this.trackEvent('share', platform, content, 1)
  }

  /**
   * 错误上报
   * @param {string} errorType - 错误类型
   * @param {string} errorMessage - 错误信息
   */
  trackError(errorType, errorMessage) {
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