<template>
    <section id="why-zimo" class="choose-zimo-container">
        <SectionTitle title="Why choose zimo" marginBottom="0px" />
        <p class="subtitle">Most importantly, we are a Chinese institution!</p>

        <div class="features-grid">
            <div
                v-for="feature in features"
                :key="feature.id"
                class="feature-card"
            >
                <div class="feature-image">
                    <img
                        :src="feature.image"
                        :alt="feature.title"
                        class="image"
                    />
                </div>
                <div class="feature-content">
                    <h3
                        class="feature-title"
                        :class="{
                            'is-hovered':
                                hoveredElements[`title-${feature.id}`],
                        }"
                        @mouseenter="handleMouseEnter(`title-${feature.id}`)"
                        @mouseleave="handleMouseLeave(`title-${feature.id}`)"
                    >
                        {{ feature.title }}
                    </h3>
                    <p
                        class="feature-description"
                        :class="{
                            'is-hovered': hoveredElements[`desc-${feature.id}`],
                        }"
                        @mouseenter="handleMouseEnter(`desc-${feature.id}`)"
                        @mouseleave="handleMouseLeave(`desc-${feature.id}`)"
                    >
                        {{ feature.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from "vue";
import SectionTitle from "../../../../components/SectionTitle.vue";

export default {
    name: "WhyChooseZimo",
    components: {
        SectionTitle,
    },
    setup() {
        // 悬停状态管理
        const hoveredElements = ref({});

        // 处理悬停状态
        const handleMouseEnter = (elementId) => {
            hoveredElements.value = {
                ...hoveredElements.value,
                [elementId]: true,
            };
        };

        const handleMouseLeave = (elementId) => {
            hoveredElements.value = {
                ...hoveredElements.value,
                [elementId]: false,
            };
        };

        const features = [
            {
                id: 1,
                title: "Have a better understanding of Chinese universities",
                description:
                    "We can directly connect with schools and have a better understanding of the school's competitiveness and requirements. Our prices are more affordable.",
                image: "/assets/image/Home/WhyChooseZimo/WhyChooseZimo1.png",
            },
            {
                id: 2,
                title: "more convenient than applying on your own",
                description:
                    "We provide real-time services and help you solve problems such as language, translation, text optimization, and cross-border payments.",
                image: "/assets/image/Home/WhyChooseZimo/WhyChooseZimo2.png",
            },
            {
                id: 3,
                title: "one-stop services",
                description:
                    "After you successfully apply to a school, we provide one-stop services including visa agency, flight ticket booking, airport pick-up upon arrival, dormitory reservation, and school registration.",
                image: "/assets/image/Home/WhyChooseZimo/WhyChooseZimo3.png",
            },
            {
                id: 4,
                title: "A vast network of partners",
                description:
                    "As a strategic partner of the China Education Association for International Exchange (CEAIE), ZIMO collaborates with over 400 universities and more than 100 partners, offering more than 30,000 programs and scholarships, opening up unlimited possibilities for you to realize your Chinese dream.",
                image: "/assets/image/Home/WhyChooseZimo/WhyChooseZimo4.png",
            },
        ];

        return {
            hoveredElements,
            handleMouseEnter,
            handleMouseLeave,
            features,
        };
    },
};
</script>

<style lang="less" scoped>
.choose-zimo-container {
    background-color: #fff;
    padding: clamp(2rem, 4vw, 4rem) 13.54vw;
    max-width: 100%;
    margin: 0 auto;
}

.subtitle {
    text-align: center;
    color: #666;
    font-size: clamp(14px, 1.2vw, 16px);
    line-height: 1.5;
    margin: 0 auto clamp(2rem, 3vw, 2.5rem);
    font-family: "AlibabaPuHuiTiRegular";
    max-width: 600px;
}

.features-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(1rem, 2vw, 1.5rem);
    max-width: 1400px;
    margin: 0 auto;

    /* 平板尺寸：2列布局 */
    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
        gap: clamp(1.25rem, 2.5vw, 2rem);
    }

    /* 桌面尺寸：4列布局 */
    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
        gap: clamp(1rem, 1.5vw, 1.5rem);
    }
}

.feature-card {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: fit-content;
    min-height: clamp(260px, 30vw, 320px);
    display: flex;
    flex-direction: column;

    &:hover {
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        transform: translateY(-4px);
    }
}

.feature-image {
    width: 100%;
    height: clamp(100px, 12vw, 140px);
    overflow: hidden;
    flex-shrink: 0;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    .feature-card:hover & {
        transform: scale(1.05);
    }
}

.feature-content {
    padding: clamp(0.75rem, 1.5vw, 1.05rem);
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: clamp(0.5rem, 1vw, 0.75rem);
}

.feature-title {
    font-family: "AlibabaPuHuiTiMedium", sans-serif;
    font-size: clamp(13px, 1vw, 15px);
    line-height: 1.3;
    color: #2e4057;
    margin: 0;
    transition: color 0.3s ease;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        opacity: 1 !important;
        color: #ff6b35;
    }

    // &.is-hovered {
    //     color: #FF6B35;
    // }

    /* 移动端稍微增大字体 */
    @media (max-width: 639px) {
        font-size: clamp(15px, 4vw, 18px);
        line-height: 1.25;
    }
}

.feature-description {
    font-family: "AlibabaPuHuiTiRegular", sans-serif;
    font-size: clamp(12px, 1vw, 14px);
    line-height: 1.4;
    color: #3a3e48;
    margin: 0;
    transition: color 0.3s ease;
    cursor: pointer;
    flex-grow: 1;

    // &.is-hovered {
    //     color: #FF6B35;
    // }
    &:hover {
        opacity: 1 !important;
        color: #ff6b35;
    }

    /* 移动端调整 */
    @media (max-width: 639px) {
        font-size: clamp(13px, 3.5vw, 16px);
        line-height: 1.5;
    }
}

/* 超大屏幕优化 */
@media (min-width: 1400px) {
    .features-grid {
        max-width: 1600px;
    }

    .feature-card {
        min-height: 340px;
    }

    .feature-image {
        height: 160px;
    }

    .feature-title {
        font-size: 15px;
        line-height: 1.25;
    }

    .feature-description {
        font-size: 14px;
        line-height: 1.5;
    }
}

/* 小屏幕优化 */
@media (max-width: 480px) {
    .choose-zimo-container {
        padding: 2rem 1rem;
    }

    .features-grid {
        gap: 1.5rem;
    }

    .feature-card {
        min-height: 280px;
    }

    .feature-content {
        padding: 1rem;
        gap: 0.75rem;
    }
}
</style>
