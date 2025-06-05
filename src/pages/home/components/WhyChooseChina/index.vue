<template>
  <section
    id="why-china"
    class="section-container-horizontal"
    :style="{ backgroundColor: '#FFFFFF', padding: '4rem 0' }"
  >
    <div class="container mx-auto">
      <SectionTitle title="Why choose China" />

      <div class="content-grid">
        <!-- 左侧视频播放器 -->
        <div
          ref="videoContainerRef"
          class="video-container"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
        >
          <div
            class="video-wrapper"
            @click="handleVideoPlay"
          >
            <!-- 视频元素 -->
            <video
              ref="videoRef"
              :class="[
                'video-element',
                { 'opacity-0': shouldShowCover, 'opacity-100': !shouldShowCover }
              ]"
              src="https://zimo.club/assets/video/zimo.mp4"
              preload="metadata"
            />

            <!-- 封面图 -->
            <div v-if="shouldShowCover" class="video-cover">
              <img
                src="/assets/image/VideoThumb.jpg"
                alt="Video cover"
                class="cover-image"
              />
            </div>

            <!-- 播放按钮覆盖层 -->
            <div v-if="!isPlaying" class="play-overlay">
              <div class="play-button">
                <img
                  src="/assets/image/VideoPlayIcon.png"
                  alt="Play"
                  class="play-icon"
                />
              </div>
            </div>

            <!-- 视频控制条 -->
            <div
              v-if="!shouldShowCover"
              :class="[
                'video-controls',
                { 'opacity-100': showControls, 'opacity-0': !showControls }
              ]"
              @click.stop
            >
              <!-- 进度条 -->
              <div
                ref="progressRef"
                class="progress-bar"
                @click="handleProgressClick"
                @mousedown="handleProgressMouseDown"
              >
                <div
                  class="progress-fill"
                  :style="{ width: `${progress}%` }"
                >
                  <!-- 拖拽手柄 -->
                  <div
                    :class="[
                      'progress-handle',
                      { 'scale-150': isDragging }
                    ]"
                  />
                </div>
              </div>

              <!-- 控制按钮和时间显示 -->
              <div class="controls-row">
                <button
                  @click.stop="handleVideoPlay"
                  class="control-button"
                >
                  <!-- 暂停图标 -->
                  <svg
                    v-if="isPlaying"
                    xmlns="http://www.w3.org/2000/svg"
                    class="control-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <!-- 播放图标 -->
                  <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    class="control-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>

                <div class="time-display">
                  {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧文案 -->
        <div class="text-container">
          <div class="text-item">
            <div class="bullet-point">•</div>
            <p class="text-content">
              Experience the world's fastest-growing economy, where innovation meets opportunity in a dynamic global hub.
            </p>
          </div>

          <div class="text-item">
            <div class="bullet-point">•</div>
            <p class="text-content">
              Discover a civilization with 5000 years of culture, offering profound learning beyond the classroom.
            </p>
          </div>

          <div class="text-item">
            <div class="bullet-point">•</div>
            <p class="text-content">
              Study at internationally ranked universities with generous scholarships and lower costs than Western institutions!
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import SectionTitle from '../../../../components/SectionTitle.vue'

export default {
  name: 'WhyChooseChina',
  components: {
    SectionTitle
  },
  setup() {
    const videoRef = ref(null)
    const progressRef = ref(null)
    const videoContainerRef = ref(null)
    const hideControlsTimerRef = ref(null)
    
    const isPlaying = ref(false)
    const progress = ref(0)
    const duration = ref(0)
    const currentTime = ref(0)
    const showControls = ref(false)
    const hasStartedPlaying = ref(false)
    const hasEnded = ref(false)
    const isDragging = ref(false)
    const wasPlayingBeforeDrag = ref(false)

    // 判断是否应该显示封面
    const shouldShowCover = computed(() => !hasStartedPlaying.value || hasEnded.value)

    // 格式化时间为 MM:SS 格式
    const formatTime = (timeInSeconds) => {
      const minutes = Math.floor(timeInSeconds / 60)
      const seconds = Math.floor(timeInSeconds % 60)
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }

    // 清除计时器的函数
    const clearHideControlsTimer = () => {
      if (hideControlsTimerRef.value) {
        clearTimeout(hideControlsTimerRef.value)
        hideControlsTimerRef.value = null
      }
    }

    // 设置计时器隐藏控制栏
    const startHideControlsTimer = () => {
      clearHideControlsTimer()
      hideControlsTimerRef.value = setTimeout(() => {
        showControls.value = false
      }, 2000)
    }

    // 视频播放控制
    const handleVideoPlay = () => {
      if (videoRef.value) {
        if (isPlaying.value) {
          videoRef.value.pause()
        } else {
          videoRef.value.play()
          hasStartedPlaying.value = true
          hasEnded.value = false
        }
        isPlaying.value = !isPlaying.value
      }
    }

    // 处理进度条点击
    const handleProgressClick = (e) => {
      e.stopPropagation()
      if (!progressRef.value || !videoRef.value) return

      const progressRect = progressRef.value.getBoundingClientRect()
      const clickPosition = e.clientX - progressRect.left
      const percentClicked = (clickPosition / progressRect.width) * 100

      // 确保百分比在0-100范围内
      const boundedPercent = Math.max(0, Math.min(100, percentClicked))

      // 设置视频时间
      const newTime = (boundedPercent / 100) * (videoRef.value.duration || 0)
      videoRef.value.currentTime = newTime

      // 更新UI
      progress.value = boundedPercent
      currentTime.value = newTime

      // 如果用户拖动到视频末尾
      if (boundedPercent >= 99.9) {
        hasEnded.value = true
      } else {
        hasEnded.value = false
      }
    }

    // 处理进度条拖拽开始
    const handleProgressMouseDown = (e) => {
      e.stopPropagation()

      // 记录拖拽前的播放状态
      wasPlayingBeforeDrag.value = isPlaying.value
      isDragging.value = true

      // 暂时暂停视频，便于精确拖拽
      if (isPlaying.value && videoRef.value) {
        videoRef.value.pause()
      }

      // 立即更新进度条位置
      handleProgressClick(e)
    }

    // 处理鼠标进入视频区域
    const handleMouseEnter = () => {
      // 只有在已经开始播放且未结束时才显示控制栏
      if (!shouldShowCover.value) {
        clearHideControlsTimer()
        showControls.value = true
      }
    }

    // 处理鼠标离开视频区域
    const handleMouseLeave = () => {
      // 无论视频是否正在播放，都设置计时器隐藏控制栏
      if (!isDragging.value) {
        startHideControlsTimer()
      }
    }

    // 监听全局点击事件
    const handleClickOutside = (event) => {
      if (
        videoContainerRef.value &&
        !videoContainerRef.value.contains(event.target)
      ) {
        showControls.value = false
        clearHideControlsTimer()
      } else if (!shouldShowCover.value) {
        // 只有在不显示封面时才显示控制栏
        showControls.value = true
        clearHideControlsTimer()
      }
    }

    // 监听全局鼠标移动和松开事件，用于拖拽进度条
    const handleMouseMove = (e) => {
      if (isDragging.value && progressRef.value && videoRef.value) {
        e.preventDefault()
        const progressRect = progressRef.value.getBoundingClientRect()
        const clickPosition = e.clientX - progressRect.left
        const percentClicked = (clickPosition / progressRect.width) * 100

        // 确保百分比在0-100范围内
        const boundedPercent = Math.max(0, Math.min(100, percentClicked))

        // 更新UI
        progress.value = boundedPercent

        // 预览时间位置
        const newTime = (boundedPercent / 100) * (videoRef.value.duration || 0)
        currentTime.value = newTime
      }
    }

    const handleMouseUp = () => {
      if (isDragging.value && videoRef.value) {
        // 设置视频时间
        const newTime = (progress.value / 100) * (videoRef.value.duration || 0)
        videoRef.value.currentTime = newTime

        // 如果用户拖动到视频末尾
        if (progress.value >= 99.9) {
          hasEnded.value = true
          isPlaying.value = false
        } else if (hasEnded.value) {
          hasEnded.value = false
        }

        // 恢复拖拽前的播放状态
        if (wasPlayingBeforeDrag.value && progress.value < 99.9) {
          videoRef.value.play()
          isPlaying.value = true
        } else if (!wasPlayingBeforeDrag.value) {
          isPlaying.value = false
        }

        isDragging.value = false
        wasPlayingBeforeDrag.value = false // 重置状态
      }
    }

    onMounted(() => {
      const videoElement = videoRef.value
      if (!videoElement) return

      const handleTimeUpdate = () => {
        if (!isDragging.value) {
          const currentTimeValue = videoElement.currentTime
          const durationValue = videoElement.duration || 0
          currentTime.value = currentTimeValue
          progress.value = (currentTimeValue / durationValue) * 100
        }
      }

      const handleLoadedMetadata = () => {
        duration.value = videoElement.duration
      }

      const handleEnded = () => {
        isPlaying.value = false
        progress.value = 0
        currentTime.value = 0
        hasEnded.value = true
        videoElement.currentTime = 0
      }

      const handlePlay = () => {
        hasStartedPlaying.value = true
        hasEnded.value = false
      }

      // 添加视频事件监听器
      videoElement.addEventListener('timeupdate', handleTimeUpdate)
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata)
      videoElement.addEventListener('ended', handleEnded)
      videoElement.addEventListener('play', handlePlay)

      // 添加全局事件监听器
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)

      // 清理函数
      return () => {
        videoElement.removeEventListener('timeupdate', handleTimeUpdate)
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata)
        videoElement.removeEventListener('ended', handleEnded)
        videoElement.removeEventListener('play', handlePlay)
        document.removeEventListener('mousedown', handleClickOutside)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        clearHideControlsTimer()
      }
    })

    onUnmounted(() => {
      clearHideControlsTimer()
    })

    return {
      videoRef,
      progressRef,
      videoContainerRef,
      isPlaying,
      progress,
      duration,
      currentTime,
      showControls,
      hasStartedPlaying,
      hasEnded,
      isDragging,
      shouldShowCover,
      formatTime,
      handleVideoPlay,
      handleProgressClick,
      handleProgressMouseDown,
      handleMouseEnter,
      handleMouseLeave
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

// 视频容器
.video-container {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin: 0 auto;
  width: 33.33vw;
  height: 18.85vw;
  max-width: 100%;
  min-width: 300px;
  min-height: 169px;
}

.video-wrapper {
  aspect-ratio: 16 / 9;
  position: relative;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.video-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease;
}

.opacity-0 {
  opacity: 0;
}

.opacity-100 {
  opacity: 1;
}

// 封面
.video-cover {
  position: absolute;
  inset: 0;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

// 播放按钮覆盖层
.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.play-button {
  width: 4rem;
  height: 4rem;
  position: relative;
}

.play-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

// 视频控制条
.video-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0.5rem;
  padding-top: 10px;
  transition: opacity 0.3s ease;
  z-index: 20;
}

// 进度条
.progress-bar {
  height: 0.5rem;
  background-color: #374151;
  border-radius: 9999px;
  margin-bottom: 0.5rem;
  cursor: pointer;
}

.progress-fill {
  height: 100%;
  background-color: #f97316;
  border-radius: 9999px;
  position: relative;
}

.progress-handle {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: white;
  transition: transform 0.1s ease;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
}

.scale-150 {
  transform: translateY(-50%) scale(1.5);
}

// 控制按钮行
.controls-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.control-button {
  color: white;
  border: none;
  background: none;
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
}

.control-icon {
  height: 1.5rem;
  width: 1.5rem;
}

.time-display {
  color: white;
  font-size: 0.875rem;
}

// 右侧文案
.text-container {
  height: 18.85vw;
  min-height: 169px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
}

.text-item {
  display: flex;
  align-items: flex-start;
}

.bullet-point {
  margin-right: 1rem;
  color: #ff6b35;
  font-size: 1.5rem;
  font-weight: 700;
  height: 100%;
  display: flex;
  align-items: flex-start;
  line-height: 100%;
}

.text-content {
  font-family: "AlibabaPuHuiTiRegular";
  color: #2e4057;
  margin: 0;
  line-height: 1.6;
}

// 响应式调整
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .video-container {
    width: 100%;
    height: auto;
    min-width: unset;
    min-height: unset;
  }
  
  .text-container {
    height: auto;
    min-height: unset;
  }
}
</style> 