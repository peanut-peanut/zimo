<template>
    <div
        class="section-title-container"
        :class="className"
        :style="{ marginBottom: responsiveMarginBottom }"
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
import { ref, onMounted, onUnmounted, computed } from 'vue';

export default {
    name: "SectionTitle",
    props: {
        title: {
            type: String,
            required: true,
        },
        className: {
            type: String,
            default: "",
        },
        fontColor: {
            type: String,
            default: "#2E4057",
        },
        marginBottom: {
            type: String,
            default: "80px",
        },
    },
    setup(props) {
        const windowWidth = ref(window.innerWidth);

        // 计算响应式的marginBottom
        const responsiveMarginBottom = computed(() => {
            // 移除'px'并转换为数字
            const originalMargin = parseInt(props.marginBottom);
            // 计算响应式margin: (原始值 / 1920) * 当前屏幕宽度
            const responsiveMargin = (originalMargin / 1920) * windowWidth.value;
            return `${responsiveMargin}px`;
        });

        // 监听窗口大小变化
        const handleResize = () => {
            windowWidth.value = window.innerWidth;
        };

        onMounted(() => {
            window.addEventListener('resize', handleResize);
        });

        onUnmounted(() => {
            window.removeEventListener('resize', handleResize);
        });

        return {
            responsiveMarginBottom
        };
    }
};
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
    font-size: 36px;
    color: #2e4057;
    text-align: center;
    margin: 0;
    padding: 0 32px 0 40px;

    letter-spacing: normal;
    font-family: "AlibabaPuHuiTiBold";
    // font-weight: 900;
    line-height: normal;
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
    width: 26px;
    height: 26px;
    background-color: #ffd255;
    transform: rotate(-6.14deg);
    margin-top: 9px;
}

.red {
    width: 18px;
    height: 18px;
    background-color: #d10022;
    transform: rotate(-29.38deg);
    margin-top: -30px;
}

.orange {
    width: 17.5px;
    height: 17.5px;
    margin-top: -30px;
    background-color: #ff9757;
    transform: rotate(75.01deg);
}

.blue {
    width: 13.3px;
    height: 13.3px;
    margin-top: 7px;
    margin-left: 4px;
    background-color: #3babbe;
    transform: rotate(18.97deg);
}
</style>
