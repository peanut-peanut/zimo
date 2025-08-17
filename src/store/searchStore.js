import { ref } from 'vue';

// 从sessionStorage获取初始值（如果有）
const getInitialQuery = () => {
  const savedQuery = sessionStorage.getItem('zimoSearchQuery');
  return savedQuery || '';
};

// 从sessionStorage获取初始筛选参数
const getInitialFilters = () => {
  const savedFilters = sessionStorage.getItem('zimoFilterParams');
  return savedFilters ? JSON.parse(savedFilters) : {};
};

// 创建一个简单的状态存储，用于在组件间共享搜索查询
const searchQuery = ref(getInitialQuery());
const filterParams = ref(getInitialFilters());

// 导出状态和方法
export const searchStore = {
  // 响应式状态
  searchQuery,
  filterParams,
  
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
  },

  // 设置筛选参数
  setFilterParams(filters) {
    filterParams.value = filters;
    // 保存到sessionStorage
    sessionStorage.setItem('zimoFilterParams', JSON.stringify(filters));
  },
  
  // 获取筛选参数
  getFilterParams() {
    // 从sessionStorage获取最新值
    const savedFilters = sessionStorage.getItem('zimoFilterParams');
    return savedFilters ? JSON.parse(savedFilters) : {};
  },
  
  // 清除筛选参数
  clearFilterParams() {
    filterParams.value = {};
    // 从sessionStorage中移除
    sessionStorage.removeItem('zimoFilterParams');
  },

  // 设置搜索查询和筛选参数（组合方法）
  setSearchWithFilters(query, filters) {
    this.setSearchQuery(query);
    this.setFilterParams(filters);
  },

  // 清除所有搜索和筛选数据
  clearAll() {
    this.clearSearchQuery();
    this.clearFilterParams();
  }
}; 