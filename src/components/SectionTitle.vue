<template>
  <div class="section-title" :style="{ color: fontColor }">
    <div class="colored-square left-square" :style="{ backgroundColor: '#FF6B35' }"></div>
    <h2>{{ title }}</h2>
    <div class="colored-square right-square" :style="{ backgroundColor: '#4A90E2' }"></div>
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
    fontColor: {
      type: String,
      default: '#2E4057'
    }
  }
}
</script>

<style lang="less" scoped>
.section-title {
  position: relative;
  text-align: center;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;

  h2 {
    margin: 0;
    font-size: 2rem;
    font-weight: bold;
  }
}

.colored-square {
  width: 15px;
  height: 15px;
  position: absolute;
  transform: rotate(12deg);
}

.left-square {
  left: -30px;
}

.right-square {
  right: -30px;
}
</style> 