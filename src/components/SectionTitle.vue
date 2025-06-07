<template>
  <div 
    class="section-title-container"
    :class="className"
    :style="{ marginBottom: marginBottom }"
  >
    <!-- 左侧装饰方块 -->
    <div class="left-decorations">
      <div class="square yellow"></div>
      <div class="square red"></div>
    </div>

    <!-- 标题文本 -->
    <h2 class="title-text" :style="{ color: fontColor }">
      {{ title }}
    </h2>

    <!-- 右侧装饰方块 -->
    <div class="right-decorations">
      <div class="square orange"></div>
      <div class="square blue"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    fontColor: {
      type: String,
      default: '#2E4057'
    },
    marginBottom: {
      type: String,
      default: '30px'
    }
  }
}
</script>

<style lang="less" scoped>
/* Section Title Container */
.section-title-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 60px;
  max-width: fit-content;
}

/* Title Text */
.title-text {
  font-size: 27px;
  font-weight: 700;
  color: #2E4057;
  text-align: center;
  margin: 0;
  padding: 0 32px 0 40px;
  line-height: 1.2;
  letter-spacing: normal;
  font-family: "AlibabaPuHuiTiBold";
}

/* Decorative Squares */
.square {
  width: 10.5px;
  height: 10.5px;
}

/* Left Decorations */
.left-decorations {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Right Decorations */
.right-decorations {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Square Colors */
.yellow {
  width: 18px;
  height: 18px;
  background-color: #FFD255;
  transform: rotate(-6.14deg);
  margin-top: 9px;
}

.red {
  width: 14px;
  height: 14px;
  background-color: #D10022;
  transform: rotate(-29.38deg);
  margin-top: -30px;
}

.orange {
  width: 13.5px;
  height: 13.5px;
  margin-top: -30px;
  background-color: #FF9757;
  transform: rotate(75.01deg);
}

.blue {
  width: 10.5px;
  height: 10.5px;
  margin-top: 7px;
  margin-left: 4px;
  background-color: #3BABBE;
  transform: rotate(18.97deg);
}

/* Responsive Design */
@media (max-width: 768px) {
  .title-text {
    font-size: 24px;
    padding: 0 16px;
  }
  
  .square {
    width: 10px;
    height: 10px;
  }
  
  .left-decorations,
  .right-decorations {
    gap: 6px;
  }
}

@media (max-width: 480px) {
  .section-title-container {
    margin-bottom: 32px;
  }
  
  .title-text {
    font-size: 20px;
    padding: 0 12px;
  }
  
  .square {
    width: 8px;
    height: 8px;
  }
  
  .left-decorations,
  .right-decorations {
    gap: 4px;
  }
}
</style> 