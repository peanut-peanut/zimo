<template>
  <section class="related-links" v-if="links.length > 0">
    <div class="container">
      <h3 class="related-links-title">{{ title }}</h3>
      <div class="links-grid">
        <router-link 
          v-for="link in links" 
          :key="link.path"
          :to="link.path" 
          class="link-card"
          :aria-label="link.description"
        >
          <div class="link-icon" v-if="link.icon">
            <img :src="link.icon" :alt="link.title + ' icon'" />
          </div>
          <div class="link-content">
            <h4 class="link-title">{{ link.title }}</h4>
            <p class="link-description">{{ link.description }}</p>
          </div>
          <div class="link-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RelatedLinks',
  props: {
    title: {
      type: String,
      default: 'Related Pages'
    },
    links: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.related-links {
  padding: 60px 0;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.related-links-title {
  font-size: 28px;
  font-weight: 700;
  color: #2e4057;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #ff6b35;
  }
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.link-card {
  display: flex;
  align-items: center;
  padding: 24px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #ff6b35;
    
    .link-arrow {
      color: #ff6b35;
      transform: translateX(4px);
    }
    
    .link-title {
      color: #ff6b35;
    }
  }
}

.link-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  margin-right: 16px;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.link-content {
  flex: 1;
}

.link-title {
  font-size: 18px;
  font-weight: 600;
  color: #2e4057;
  margin: 0 0 8px 0;
  transition: color 0.3s ease;
}

.link-description {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
}

.link-arrow {
  flex-shrink: 0;
  color: #ccc;
  transition: all 0.3s ease;
  margin-left: 16px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .related-links {
    padding: 40px 0;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .related-links-title {
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .links-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .link-card {
    padding: 20px;
  }
  
  .link-title {
    font-size: 16px;
  }
  
  .link-description {
    font-size: 13px;
  }
}
</style> 