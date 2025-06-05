<template>
  <section id="why-zimo" class="section-container-horizontal" :style="{ backgroundColor: '#F6F6F6', padding: '4rem 0' }">
    <SectionTitle title="Why choose zimo" marginBottom="0px" />
    <p class="subtitle">
      Most importantly, we are a Chinese institution!
    </p>

    <div class="features-grid" :style="{ gap: gap }">
      <div
        v-for="feature in features"
        :key="feature.id"
        class="feature-card"
        :style="{ 
          width: cardWidth,
          height: cardHeight
        }"
      >
        <div 
          class="feature-image" 
          :style="{ 
            width: '100%', 
            height: imageHeight
          }"
        >
          <img
            :src="feature.image"
            :alt="feature.title"
            class="image"
          />
        </div>
        <div class="feature-content" :style="{ height: `calc(${cardHeight} - ${imageHeight})` }">
          <div 
            class="feature-title alibaba-font-medium"
            :style="{ 
              fontSize: titleFontSize,
              lineHeight: titleLineHeight,
              color: hoveredElements[`title-${feature.id}`] ? '#FF6B35' : '#2E4057'
            }"
            @mouseenter="handleMouseEnter(`title-${feature.id}`)"
            @mouseleave="handleMouseLeave(`title-${feature.id}`)"
          >
            {{ feature.title }}
          </div>
          <div 
            class="feature-description alibaba-font-regular"
            :style="{ 
              fontSize: descFontSize,
              lineHeight: descLineHeight,
              color: hoveredElements[`desc-${feature.id}`] ? '#FF6B35' : '#3A3E48'
            }"
            @mouseenter="handleMouseEnter(`desc-${feature.id}`)"
            @mouseleave="handleMouseLeave(`desc-${feature.id}`)"
          >
            {{ feature.description }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import SectionTitle from '../../../../components/SectionTitle.vue'

export default {
  name: 'WhyChooseZimo',
  components: {
    SectionTitle
  },
  setup() {
    // 分别为每个文本元素添加悬停状态
    const hoveredElements = ref({})

    // 计算参考值：屏幕宽1440px时的尺寸比例
    const cardWidth = "max(230px, 17.75vw)"
    const cardHeight = "max(270px, 22.83vw)"
    const imageHeight = "max(110px, 8.89vw)"
    const gap = "max(10px, 1.24vw)"
    const titleFontSize = "max(14px, 0.9975vw)"
    const descFontSize = "max(13px, 0.83vw)"
    const titleLineHeight = "max(18px, 1.25vw)"
    const descLineHeight = "max(16px, 1.04vw)"

    // 处理悬停状态
    const handleMouseEnter = (elementId) => {
      hoveredElements.value = { ...hoveredElements.value, [elementId]: true }
    }

    const handleMouseLeave = (elementId) => {
      hoveredElements.value = { ...hoveredElements.value, [elementId]: false }
    }

    const features = [
      {
        id: 1,
        title: "Have a better understanding of Chinese universities",
        description:
          "We can directly connect with schools and have a better understanding of the school's competitiveness and requirements. Our prices are more affordable.",
        image: "/assets/image/WhyChooseZimo1.png",
      },
      {
        id: 2,
        title: "more convenient than applying on your own",
        description:
          "We provide real-time services and help you solve problems such as language, translation, text optimization, and cross-border payments.",
        image: "/assets/image/WhyChooseZimo2.png",
      },
      {
        id: 3,
        title: "one-stop services",
        description:
          "After you successfully apply to a school, we provide one-stop services including visa agency, flight ticket booking, airport pick-up upon arrival, dormitory reservation, and school registration.",
        image: "/assets/image/WhyChooseZimo3.png",
      },
      {
        id: 4,
        title: "A vast network of partners",
        description:
          "As a strategic partner of the China Education Association for International Exchange (CEAIE), ZIMO collaborates with over 400 universities and more than 100 partners, offering more than 30,000 programs and scholarships, opening up unlimited possibilities for you to realize your Chinese dream.",
        image: "/assets/image/WhyChooseZimo4.png",
      },
    ]

    return {
      hoveredElements,
      cardWidth,
      cardHeight,
      imageHeight,
      gap,
      titleFontSize,
      descFontSize,
      titleLineHeight,
      descLineHeight,
      handleMouseEnter,
      handleMouseLeave,
      features
    }
  }
}
</script>

<style lang="less" scoped>
.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 2.5rem;
  font-family: "AlibabaPuHuiTiRegular";
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.feature-card {
  background-color: white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    transform: translateY(-0.25rem);
  }
}

.feature-image {
  position: relative;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.feature-content {
  padding: 0.5rem;

  @media (min-width: 1024px) {
    padding: 0 1rem;
  }
}

.feature-title {
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
  transition: color 0.3s ease;
  letter-spacing: normal;
  cursor: pointer;
}

.feature-description {
  transition: color 0.3s ease;
  letter-spacing: normal;
  cursor: pointer;
}

// 字体类
.alibaba-font-medium {
  font-family: "AlibabaPuHuiTiMedium", sans-serif;
}

.alibaba-font-regular {
  font-family: "AlibabaPuHuiTiRegular", sans-serif;
}
</style> 