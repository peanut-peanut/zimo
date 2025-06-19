/**
 * API配置模块
 * 在开发环境使用代理，生产环境直接调用目标域名
 */

// 获取当前环境
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// API基础URL配置
export const API_BASE_URL = isDevelopment 
  ? '' // 开发环境使用代理，不需要基础URL
  : 'https://www.zimo.club'; // 生产环境直接指向目标域名

/**
 * 构建完整的API URL
 * @param {string} path API路径，如 '/api/citys'
 * @returns {string} 完整的API URL
 */
export const buildApiUrl = (path) => {
  // 确保path以/开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  if (isDevelopment) {
    // 开发环境：返回相对路径，让Vite代理处理
    return normalizedPath;
  } else {
    // 生产环境：返回完整URL
    return `${API_BASE_URL}${normalizedPath}`;
  }
};

/**
 * 通用的API请求函数
 * @param {string} path API路径
 * @param {object} options fetch选项
 * @returns {Promise} fetch promise
 */
export const apiRequest = async (path, options = {}) => {
  const url = buildApiUrl(path);
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);
    
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error(`API请求错误 [${path}]:`, error);
    throw error;
  }
};

/**
 * GET请求的快捷方法
 * @param {string} path API路径
 * @param {object} options 额外的fetch选项
 * @returns {Promise} 响应数据
 */
export const apiGet = async (path, options = {}) => {
  const response = await apiRequest(path, {
    method: 'GET',
    ...options,
  });
  return response.json();
};

/**
 * POST请求的快捷方法
 * @param {string} path API路径
 * @param {object} data 请求数据
 * @param {object} options 额外的fetch选项
 * @returns {Promise} 响应数据
 */
export const apiPost = async (path, data = {}, options = {}) => {
  const response = await apiRequest(path, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  });
  return response.json();
};

// 输出环境信息，用于调试
console.log('API配置:', {
  environment: isDevelopment ? 'development' : 'production',
  baseUrl: API_BASE_URL,
  sample: buildApiUrl('/api/citys')
}); 