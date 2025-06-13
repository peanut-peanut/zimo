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
    padding: 75px 260px;
    max-width: 100%;
    margin: 0 auto;
}

.subtitle {
    text-align: center;
    margin-bottom: 60px;
    font-size: 22px;
    line-height: normal;
    text-align: center;
    letter-spacing: normal;
    color: #2e4057;
    font-family: "AlibabaPuHuiTiRegular";
}

.features-grid {
    display: flex;
    gap: 20px;
    width: 100%;
    margin: 0 auto;
}

.feature-card {
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: fit-content;
    width: 335px;
    height: 460px;
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
    height: 171px;
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
    padding: 20px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 10px;
}

.feature-title {
    font-family: "AlibabaPuHuiTiMedium", sans-serif;
    font-size: 18px;
    line-height: 24px;
    color: #2e4057;
    margin: 0;
    transition: color 0.3s ease;
    cursor: pointer;
    font-weight: 600;

    &:hover {
        opacity: 1 !important;
        color: #ff6b35;
    }
}

.feature-description {
    font-family: "AlibabaPuHuiTiRegular", sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: #3A3E48;
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
}
</style>
