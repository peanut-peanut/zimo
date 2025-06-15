import { ref } from 'vue';

// 从sessionStorage获取初始值（如果有）
const getInitialQuery = () => {
  const savedQuery = sessionStorage.getItem('zimoSearchQuery');
  return savedQuery || '';
};

// 创建一个简单的状态存储，用于在组件间共享搜索查询
const searchQuery = ref(getInitialQuery());

// 导出状态和方法
export const searchStore = {
  // 响应式状态
  searchQuery,
  
  // 设置搜索查询
  setSearchQuery(query) {
    searchQuery.value = query;
    // 保存到sessionStorage
    sessionStorage.setItem('zimoSearchQuery', query);
  },
  
  // 获取搜索查询
  getSearchQuery() {
    // 从sessionStorage获取最新值
    return sessionStorage.getItem('zimoSearchQuery') || '';
  },
  
  // 清除搜索查询
  clearSearchQuery() {
    searchQuery.value = '';
    // 从sessionStorage中移除
    sessionStorage.removeItem('zimoSearchQuery');
  }
}; 