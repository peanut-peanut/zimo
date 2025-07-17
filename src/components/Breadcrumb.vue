<template>
  <nav class="breadcrumb" aria-label="breadcrumb">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <router-link to="/" class="breadcrumb-link">
          <span>Home</span>
        </router-link>
      </li>
      <li 
        v-for="(crumb, index) in breadcrumbs" 
        :key="index" 
        class="breadcrumb-item"
        :class="{ 'active': index === breadcrumbs.length - 1 }"
      >
        <span class="breadcrumb-separator">/</span>
        <router-link 
          v-if="crumb.path && index !== breadcrumbs.length - 1" 
          :to="crumb.path" 
          class="breadcrumb-link"
        >
          <span>{{ crumb.name }}</span>
        </router-link>
        <span v-else class="breadcrumb-current">{{ crumb.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Breadcrumb',
  setup() {
    const route = useRoute()
    
    const breadcrumbs = computed(() => {
      const pathArray = route.path.split('/').filter(path => path)
      const breadcrumbArray = []
      
      // 根据路径生成面包屑
      let currentPath = ''
      
      pathArray.forEach((segment) => {
        currentPath += `/${segment}`
        
        // 根据路径段生成友好的名称
        let name = segment
        switch (segment) {
          case 'about-us':
            name = 'About Us'
            break
          case 'program':
            name = 'Programs'
            break
          case 'successful-cases':
            name = 'Success Stories'
            break
          case 'guides':
            name = 'Guides'
            break
          case 'study-in-china':
            name = 'Study in China'
            break
          case 'cities':
            name = 'Cities'
            break
          case 'universities':
            name = 'Universities'
            break
          case 'scholarships':
            name = 'Scholarships'
            break
          case 'apply-now':
            name = 'Apply Now'
            break
          default:
            // 首字母大写
            name = segment.charAt(0).toUpperCase() + segment.slice(1)
        }
        
        breadcrumbArray.push({
          name,
          path: currentPath
        })
      })
      
      return breadcrumbArray
    })
    
    return {
      breadcrumbs
    }
  }
}
</script>

<style lang="less" scoped>
.breadcrumb {
  padding: 12px 0;
  font-size: 14px;
  color: #666;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: #ff6b35;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #e55a2b;
    text-decoration: underline;
  }
}

.breadcrumb-separator {
  margin: 0 8px;
  color: #ccc;
}

.breadcrumb-current {
  color: #333;
  font-weight: 500;
}

.breadcrumb-item.active .breadcrumb-current {
  color: #666;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .breadcrumb {
    font-size: 12px;
    padding: 8px 0;
  }
  
  .breadcrumb-separator {
    margin: 0 6px;
  }
}
</style> 