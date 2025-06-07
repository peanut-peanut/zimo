<template>
  <section class="hero-section">
    <!-- Background Image -->
    <div class="background-container">
      <img
        src="/assets/image/HeaderBackground.png"
        alt="Students studying together"
        class="background-image"
      />
      <div class="overlay"></div>
    </div>

    <!-- Content Container -->
    <div class="content-container">
      <div class="left-content">
        <!-- Main Title -->
        <div class="main-title">
          FIND THE UNIVERSITY
          <br />
          THAT SUITS YOU
        </div>

        <!-- Subtitle -->
        <div class="subtitle">
          UNLOCK YOUR LIFE ANSWER IN CHINA
        </div>

        <!-- Search Form -->
        <form @submit="handleSearch" class="search-form">
          <div class="search-container">
            <input
              type="text"
              placeholder="Enter the name of a university"
              class="search-input"
              v-model="searchTerm"
            />
            <button
              type="submit"
              class="search-button"
            >
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                class="search-icon"
              >
                <path 
                  d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                />
              </svg>
              Search
            </button>
          </div>
        </form>

        <!-- Popular Content -->
        <div class="popular-content">
          <span class="popular-label">POPULAR CONTENT:</span>
          <div class="popular-tags">
            <button
              v-for="(tag, index) in popularTags"
              :key="index"
              class="popular-tag"
              @click="setSearchTerm(tag)"
            >
              {{ tag }}
            </button>
          </div>
        </div>
      </div>

      <!-- Right side background image area -->
      <div class="right-content">
        <!-- This area shows the background image -->
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Hero',
  setup() {
    const searchTerm = ref('')

    const handleSearch = (e) => {
      e.preventDefault()
      console.log('Searching for:', searchTerm.value)
    }

    const setSearchTerm = (tag) => {
      searchTerm.value = tag
    }

    const popularTags = [
      'peking university',
      'tsinghua university'
    ]

    return {
      searchTerm,
      handleSearch,
      setSearchTerm,
      popularTags
    }
  }
}
</script>

<style lang="less" scoped>
/* Hero Section Styles */
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
}

/* Background Container */
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.7) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
  z-index: 2;
}

/* Content Container */
.content-container {
  position: relative;
  z-index: 10;
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0px 120px;
}

/* Left Content Area */
.left-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 40px;
  padding-top: 140px;
  max-width: 480px;
}

/* Right Content Area */
.right-content {
  flex: 1;
  position: relative;
}

/* Typography */
.main-title {
  font-size: 42px;
  font-weight: 800;
  color: #fff;
  line-height: 50px;
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: normal;
  font-family: "AlibabaPuHuiTiBold";
}

.subtitle {
  font-size: 21px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: normal;
  font-family: "AlibabaPuHuiTiMedium";
}

/* Search Form */
.search-form {
  margin-bottom: 30px;
}

.search-container {
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: #fff;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  width: 480px;
  height: 50px;
}

.search-input {
  flex: 1;
  padding: 18px 24px;
  border: none;
  outline: none;
  font-size: 1rem;
  color: #333;
  background: transparent;

  &::placeholder {
    color: #999;
    font-weight: 400;
  }
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 110px;
  height: 38px;
  gap: 4px;
  border-radius: 160px;
  background: #ff6b35;
  color: #fff;
  border: none;
  font-size: 16.5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: #e55529;
  }
}

.search-icon {
  width: 18px;
  height: 18px;
}

/* Popular Content */
.popular-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.popular-label {
  font-size: 16.5px;
  font-weight: 500;
  color: #fff;
  letter-spacing: normal;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.popular-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.popular-tag {
  padding: 8px 16px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  font-size: 16.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  background: transparent;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-1px);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-container {
    flex-direction: column;
    padding: 80px 20px 40px;
  }

  .left-content {
    padding-right: 0;
    padding-top: 80px;
    max-width: none;
  }

  .right-content {
    display: none;
  }

  .main-title {
    font-size: 36px;
    line-height: 42px;
  }

  .subtitle {
    font-size: 18px;
    margin-bottom: 25px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 500px;
  }

  .main-title {
    font-size: 28px;
    line-height: 34px;
    margin-bottom: 15px;
  }

  .subtitle {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .search-container {
    width: 100%;
    max-width: 400px;
  }

  .search-input {
    font-size: 14px;
  }

  .search-button {
    width: 90px;
    font-size: 14px;
  }

  .popular-tags {
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .content-container {
    padding: 60px 15px 30px;
  }

  .main-title {
    font-size: 24px;
    line-height: 30px;
  }

  .subtitle {
    font-size: 14px;
  }

  .popular-tag {
    font-size: 14px;
    padding: 6px 12px;
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-title,
.subtitle,
.search-form,
.popular-content {
  animation: fadeInUp 0.8s ease-out;
}

.subtitle {
  animation-delay: 0.2s;
}

.search-form {
  animation-delay: 0.4s;
}

.popular-content {
  animation-delay: 0.6s;
}
</style> 