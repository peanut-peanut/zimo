/**
 * 埋点事件配置
 * 统一管理所有埋点事件的配置信息
 */

// 页面访问事件
export const PAGE_EVENTS = {
  HOME: 'home_page_view',
  ABOUT_US: 'about_us_page_view',
  PROGRAM: 'program_page_view',
  SUCCESSFUL_CASES: 'successful_cases_page_view',
  APPLY_NOW: 'apply_now_page_view',
  GUIDES: 'guides_page_view',
  GUIDES_STUDY_IN_CHINA: 'guides_study_in_china_page_view',
  GUIDES_CITIES: 'guides_cities_page_view',
  GUIDES_UNIVERSITIES: 'guides_universities_page_view',
  GUIDES_SCHOLARSHIPS: 'guides_scholarships_page_view',
}

// 导航事件
export const NAVIGATION_EVENTS = {
  NAV_CLICK: 'navigation_click',
  GUIDES_SUBMENU_CLICK: 'guides_submenu_click',
  LOGO_CLICK: 'logo_click',
  BACK_TO_TOP: 'back_to_top_click',
}

// 表单事件
export const FORM_EVENTS = {
  APPLICATION_FORM: {
    SUBMIT_ATTEMPT: 'application_form_submit_attempt',
    SUBMIT_SUCCESS: 'application_form_submit_success',
    SUBMIT_FAILED: 'application_form_submit_failed',
    VALIDATION_FAILED: 'application_form_validation_failed',
    FIELD_FOCUS: 'application_form_field_focus',
    FIELD_BLUR: 'application_form_field_blur',
    DROPDOWN_OPEN: 'application_form_dropdown_open',
    COUNTRY_SELECT: 'application_form_country_select',
    GPA_SELECT: 'application_form_gpa_select',
    DEGREE_SELECT: 'application_form_degree_select',
  },
  SEARCH_FORM: {
    SEARCH_SUBMIT: 'search_form_submit',
    FILTER_CHANGE: 'search_form_filter_change',
    KEYWORD_INPUT: 'search_form_keyword_input',
  }
}

// 设备信息事件
export const DEVICE_EVENTS = {
  DEVICE_TYPE: 'device_type',
  OPERATING_SYSTEM: 'operating_system', 
  SCREEN_RESOLUTION: 'screen_resolution',
  VIEWPORT_SIZE: 'viewport_size',
  PAGE_VIEW_BY_DEVICE: 'page_view_by_device',
  ORIENTATION_CHANGE: 'orientation_change',
  TOUCH_CAPABILITY: 'touch_capability',
}

// 用户交互事件
export const INTERACTION_EVENTS = {
  SOCIAL_MEDIA: {
    WHATSAPP_HOVER: 'social_whatsapp_hover',
    TELEGRAM_HOVER: 'social_telegram_hover',
    WECHAT_HOVER: 'social_wechat_hover',
    TIKTOK_CLICK: 'social_tiktok_click',
    YOUTUBE_CLICK: 'social_youtube_click',
  },
  CONTENT: {
    VIDEO_PLAY: 'content_video_play',
    VIDEO_PAUSE: 'content_video_pause',
    VIDEO_END: 'content_video_end',
    IMAGE_CLICK: 'content_image_click',
    DOWNLOAD_CLICK: 'content_download_click',
  },
  PROGRAM: {
    PROGRAM_CARD_CLICK: 'program_card_click',
    PROGRAM_DETAIL_VIEW: 'program_detail_view',
    PROGRAM_APPLY_CLICK: 'program_apply_click',
    PROGRAM_FILTER: 'program_filter_change',
    PROGRAM_SEARCH: 'program_search',
  }
}

// 业务数据事件
export const BUSINESS_EVENTS = {
  USER_PROFILE: {
    COUNTRY_INTEREST: 'user_country_interest',
    DEGREE_INTEREST: 'user_degree_interest',
    MAJOR_INTEREST: 'user_major_interest',
    GPA_LEVEL: 'user_gpa_level',
    AGE_GROUP: 'user_age_group',
  },
  CONVERSION: {
    LEAD_GENERATED: 'lead_generated',
    APPLICATION_STARTED: 'application_started',
    APPLICATION_COMPLETED: 'application_completed',
    CONSULTATION_REQUESTED: 'consultation_requested',
  }
}

// 错误事件
export const ERROR_EVENTS = {
  API_ERROR: 'api_error',
  FORM_ERROR: 'form_error',
  NETWORK_ERROR: 'network_error',
  JAVASCRIPT_ERROR: 'javascript_error',
  RESOURCE_LOAD_ERROR: 'resource_load_error',
}

// 性能事件
export const PERFORMANCE_EVENTS = {
  PAGE_LOAD_TIME: 'page_load_time',
  API_RESPONSE_TIME: 'api_response_time',
  COMPONENT_RENDER_TIME: 'component_render_time',
  IMAGE_LOAD_TIME: 'image_load_time',
}

// 事件类别常量
export const EVENT_CATEGORIES = {
  NAVIGATION: 'navigation',
  FORM_INTERACTION: 'form_interaction',
  USER_ACTION: 'user_action',
  CONTENT_INTERACTION: 'content_interaction',
  BUSINESS_CONVERSION: 'business_conversion',
  ERROR_TRACKING: 'error_tracking',
  PERFORMANCE: 'performance',
  SOCIAL_MEDIA: 'social_media',
  PAGE_INFO: 'page_info',
  DEVICE_INFO: 'device_info',
  PAGE_DEVICE: 'page_device',
}

// 常用事件动作
export const EVENT_ACTIONS = {
  CLICK: 'click',
  HOVER: 'hover',
  FOCUS: 'focus',
  BLUR: 'blur',
  SUBMIT: 'submit',
  CHANGE: 'change',
  VIEW: 'view',
  LOAD: 'load',
  ERROR: 'error',
  SUCCESS: 'success',
  FAILED: 'failed',
}

// 页面停留时间阈值（秒）
export const PAGE_DURATION_THRESHOLDS = {
  QUICK_VIEW: 5,      // 快速浏览
  NORMAL_VIEW: 30,    // 正常浏览
  ENGAGED_VIEW: 120,  // 深度浏览
  LONG_VIEW: 300,     // 长时间浏览
}

// 用户行为分析配置
export const USER_BEHAVIOR_CONFIG = {
  // 滚动深度阈值
  SCROLL_DEPTH_THRESHOLDS: [25, 50, 75, 100],
  
  // 点击热力图配置
  HEATMAP_CONFIG: {
    enabled: true,
    sampleRate: 0.1, // 10%采样率
  },
  
  // 用户会话配置
  SESSION_CONFIG: {
    timeout: 30 * 60 * 1000, // 30分钟会话超时
    trackIdleTime: true,
  }
}

// 埋点上报配置
export const TRACKING_CONFIG = {
  // 是否启用调试模式
  DEBUG_MODE: process.env.NODE_ENV === 'development',
  
  // 批量上报配置
  BATCH_CONFIG: {
    enabled: false,
    maxEvents: 10,
    maxWaitTime: 5000, // 5秒
  },
  
  // 重试配置
  RETRY_CONFIG: {
    maxRetries: 3,
    retryDelay: 1000, // 1秒
  }
}

// 导出所有配置的默认对象
export default {
  PAGE_EVENTS,
  NAVIGATION_EVENTS,
  FORM_EVENTS,
  INTERACTION_EVENTS,
  BUSINESS_EVENTS,
  ERROR_EVENTS,
  PERFORMANCE_EVENTS,
  EVENT_CATEGORIES,
  EVENT_ACTIONS,
  PAGE_DURATION_THRESHOLDS,
  USER_BEHAVIOR_CONFIG,
  TRACKING_CONFIG,
} 