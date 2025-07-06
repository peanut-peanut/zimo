/**
 * 公共工具方法
 */

/**
 * 检测是否为移动端设备
 * @returns {boolean} 如果是移动端返回 true，否则返回 false
 */
export const isMobileDevice = () => {
    // 检测用户代理字符串
    const userAgent = navigator.userAgent.toLowerCase();
    const mobileKeywords = [
        'android', 'iphone', 'ipad', 'ipod', 'blackberry', 
        'windows phone', 'mobile', 'webos', 'opera mini'
    ];
    
    // 检查是否包含移动端关键词
    const isMobileUserAgent = mobileKeywords.some(keyword => 
        userAgent.includes(keyword)
    );
    
    // 检测屏幕宽度（小于768px认为是移动端）
    const isMobileScreen = window.innerWidth <= 768;
    
    // 检测触摸支持
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // 综合判断：满足任意两个条件即认为是移动端
    const conditions = [isMobileUserAgent, isMobileScreen, hasTouchSupport];
    const trueCount = conditions.filter(Boolean).length;
    
    return trueCount >= 2 || isMobileUserAgent;
};

/**
 * 获取设备类型
 * @returns {string} 'mobile' | 'tablet' | 'desktop'
 */
export const getDeviceType = () => {
    const width = window.innerWidth;
    const userAgent = navigator.userAgent.toLowerCase();
    
    if (userAgent.includes('ipad') || (width >= 768 && width <= 1024)) {
        return 'tablet';
    } else if (isMobileDevice()) {
        return 'mobile';
    } else {
        return 'desktop';
    }
};

/**
 * 检测是否为iOS设备
 * @returns {boolean}
 */
export const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

/**
 * 检测是否为Android设备
 * @returns {boolean}
 */
export const isAndroid = () => {
    return /Android/.test(navigator.userAgent);
}; 