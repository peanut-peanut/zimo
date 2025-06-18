<template>
  <div class="lazy-image-container" :style="{ paddingBottom: aspectRatio }">
    <img
      v-if="loaded"
      :src="src"
      :alt="alt"
      :class="['lazy-image', { 'fade-in': showImage }]"
      @load="onImageLoad"
      @error="onImageError"
    />
    <div v-else class="image-placeholder">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LazyImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    aspectRatio: {
      type: String,
      default: '56.25%' // 16:9 比例
    }
  },
  data() {
    return {
      loaded: false,
      showImage: false,
      observer: null
    }
  },
  mounted() {
    this.createObserver()
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    createObserver() {
      const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
      }
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage()
            this.observer.unobserve(entry.target)
          }
        })
      }, options)
      
      this.observer.observe(this.$el)
    },
    loadImage() {
      this.loaded = true
    },
    onImageLoad() {
      this.showImage = true
    },
    onImageError() {
      console.error('图片加载失败:', this.src)
    }
  }
}
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
}

.lazy-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lazy-image.fade-in {
  opacity: 1;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 