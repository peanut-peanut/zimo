<template>
    <section
        ref="sectionRef"
        class="programs-container"
        @click="closeProgramDetail"
    >
        <!-- 背景图容器 -->
        <div class="background-wrapper">
            <img
                src="/assets/image/OutstandingBackground.png"
                alt="Outstanding Programs"
                class="background-image"
            />
        </div>

        <!-- 内容包装器 -->
        <div class="content-wrapper">
            <div
                :class="[
                    'content-inner',
                    { 'opacity-100': isVisible, 'opacity-0': !isVisible },
                ]"
            >
                <!-- 标题部分 -->
                <SectionTitle title="Outstanding Programs" fontColor="#fff" />

                <!-- 轮播容器 -->
                <div class="carousel-container">
                    <!-- 导航箭头 -->
                    <button
                        v-if="!selectedProgram"
                        class="navigation-arrow prev-arrow"
                        @click="prevSlide"
                        aria-label="Previous"
                    >
                        ‹
                    </button>

                    <div class="carousel-inner">
                        <div
                            class="carousel-track"
                            :style="{ transform: trackTransform }"
                        >
                            <div
                                v-for="program in extendedPrograms"
                                :key="program.id"
                                class="program-card"
                                @click.stop="
                                    openProgramDetail(program.originalId)
                                "
                            >
                                <div class="card-image">
                                    <img
                                        :src="program.image"
                                        :alt="program.title"
                                        class="card-image-img"
                                    />
                                    <div class="university-icon">
                                        <img
                                            :src="program.icon"
                                            :alt="`${program.university} icon`"
                                            width="38"
                                            height="38"
                                        />
                                    </div>
                                </div>
                                <div class="card-content">
                                    <h3
                                        class="program-title"
                                        :class="{
                                            'is-hovered':
                                                hoveredElements[
                                                    `title-${program.id}`
                                                ],
                                        }"
                                        @mouseenter="
                                            handleMouseEnter(
                                                `title-${program.id}`
                                            )
                                        "
                                        @mouseleave="
                                            handleMouseLeave(
                                                `title-${program.id}`
                                            )
                                        "
                                    >
                                        {{ program.title }}
                                    </h3>
                                    <p
                                        class="university-name"
                                        :class="{
                                            'is-hovered':
                                                hoveredElements[
                                                    `university-${program.id}`
                                                ],
                                        }"
                                        @mouseenter="
                                            handleMouseEnter(
                                                `university-${program.id}`
                                            )
                                        "
                                        @mouseleave="
                                            handleMouseLeave(
                                                `university-${program.id}`
                                            )
                                        "
                                    >
                                        {{ program.university }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- 详情页面 -->
                        <div
                            :class="[
                                'detail-page',
                                { active: selectedProgram && !isClosing },
                                { closing: isClosing },
                            ]"
                            @click="!isClosing && closeProgramDetail()"
                        >
                            <div
                                v-if="selectedProgram"
                                class="detail-page-content"
                                @click.stop
                            >
                                <div class="detail-page-image">
                                    <img
                                        :src="selectedProgramData?.image || ''"
                                        :alt="selectedProgramData?.title || ''"
                                        class="detail-image"
                                    />
                                </div>
                                <div class="detail-page-info">
                                    <div>
                                        <h2 class="detail-page-title">
                                            {{ selectedProgramData?.title }}
                                        </h2>
                                        <p class="detail-page-university">
                                            {{
                                                selectedProgramData?.university
                                            }}
                                        </p>

                                        <div class="detail-page-info-content">
                                            <div class="detail-page-info-grid">
                                                <div
                                                    class="detail-page-info-item"
                                                >
                                                    <div
                                                        class="detail-page-info-label"
                                                    >
                                                        Degree:
                                                    </div>
                                                    <div
                                                        class="detail-page-info-value"
                                                    >
                                                        {{
                                                            selectedProgramData?.duration
                                                        }}
                                                    </div>
                                                </div>

                                                <div
                                                    class="detail-page-info-item"
                                                >
                                                    <div
                                                        class="detail-page-info-label"
                                                    >
                                                        Teaching Language:
                                                    </div>
                                                    <div
                                                        class="detail-page-info-value"
                                                    >
                                                        {{
                                                            selectedProgramData?.language
                                                        }}
                                                    </div>
                                                </div>

                                                <div
                                                    class="detail-page-info-item"
                                                >
                                                    <div
                                                        class="detail-page-info-label"
                                                    >
                                                        Tuition:
                                                    </div>
                                                    <div
                                                        class="detail-page-info-value"
                                                    >
                                                        {{
                                                            selectedProgramData?.fee
                                                        }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="detail-page-reasons-section"
                                            >
                                                <h3
                                                    class="detail-page-reasons-title"
                                                >
                                                    Recommended Reasons:
                                                </h3>
                                                <ul
                                                    class="detail-page-reasons-list"
                                                >
                                                    <li
                                                        v-for="(
                                                            reason, index
                                                        ) in selectedProgramData?.reasons ||
                                                        []"
                                                        :key="index"
                                                        class="detail-page-reason-item"
                                                    >
                                                        <div
                                                            class="detail-page-reason-number"
                                                        >
                                                            {{ index + 1 }}
                                                        </div>
                                                        <div
                                                            class="detail-page-reason-text"
                                                        >
                                                            {{ reason }}
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <!-- <div class="detail-page-button">
                                            Learn More
                                        </div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        v-if="!selectedProgram"
                        class="navigation-arrow next-arrow"
                        @click="nextSlide"
                        aria-label="Next"
                    >
                        ›
                    </button>
                </div>

                <!-- 分页点 -->
                <div v-if="!selectedProgram" class="pagination-container">
                    <div
                        v-for="(_, index) in TOTAL_SLIDES"
                        :key="index"
                        :class="[
                            'pagination-dot',
                            { active: currentSlide === index },
                        ]"
                        @click="goToSlide(index)"
                        role="button"
                        :aria-label="`Go to slide ${index + 1}`"
                    />
                </div>
                <div v-else class="pagination-container"></div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted, onUnmounted, computed } from "vue";
import SectionTitle from "../../../../components/SectionTitle.vue";

// 常量配置
const TOTAL_SLIDES = 5;
const CARD_WIDTH = 200;
const ANIMATION_DURATION = 600;

// 程序数据
const PROGRAMS_DATA = [
    {
        id: 1,
        title: "Traditional Chinese Medicine(TCM)",
        university: "Nanjing University of Chinese Medicine",
        duration: "Bachelor 5 Years",
        language: "Chinese",
        fee: "RMB 24,000 Per Year",
        image: "/assets/image/OutstandingPrograms1.png",
        icon: "/assets/image/icon1.png",
        reasons: [
            "One of the earliest universities of Traditional Chinese Medicine (TCM) founded in China.",
            'NJUCM has been renowned as "the cradle of China\'s higher education in Chinese Medicine".',
            "WHO Collaborating Centre for Traditional Medicine.",
        ],
    },
    {
        id: 2,
        title: "MBBS (Bachelor of Medicine and Bachelor of Surgery)",
        university: "Chongqing Medical University",
        duration: "Bachelor 6 Years",
        language: "English",
        fee: "RMB 42,000 Per Year",
        image: "/assets/image/OutstandingPrograms2.png",
        icon: "/assets/image/icon2.png",
        reasons: [
            "Internationally recognized medical degree with comprehensive clinical training.",
            "Modern facilities and diverse patient exposure.",
            "Opportunity to learn both Western and Chinese medicine approaches.",
        ],
    },
    {
        id: 3,
        title: "Civil Engineering",
        university: "Northwestern Polytechnical University",
        duration: "Bachelor 4 Years",
        language: "English",
        fee: "RMB 26,000 Per Year",
        image: "/assets/image/OutstandingPrograms3.png",
        icon: "/assets/image/icon3.png",
        reasons: [
            "World-class civil engineering program focusing on sustainable development.",
            "Strong industry connections and modern laboratory facilities.",
            "Excellent career prospects in infrastructure and construction.",
        ],
    },
    {
        id: 4,
        title: "Mechanical Engineering",
        university: "China University of Mining and Technology",
        duration: "Bachelor 4 Years",
        language: "English",
        fee: "RMB 28,000 Per Year",
        image: "/assets/image/OutstandingPrograms4.png",
        icon: "/assets/image/icon4.png",
        reasons: [
            "Comprehensive mechanical engineering education with specializations in robotics.",
            "Strong research focus and industry partnerships.",
            "Modern laboratories with cutting-edge equipment.",
        ],
    },
    {
        id: 5,
        title: "Software Engineering",
        university: "Zhejiang University of Technology",
        duration: "Bachelor 4 Years",
        language: "English",
        fee: "RMB 26,000 Per Year",
        image: "/assets/image/OutstandingPrograms5.png",
        icon: "/assets/image/icon5.png",
        reasons: [
            "Cutting-edge software engineering program with focus on AI and data science.",
            "Industry-aligned curriculum with practical projects and internship opportunities.",
            "Located in Hangzhou, one of China's major tech hubs.",
        ],
    },
];

export default {
    name: "OutstandingPrograms",
    components: {
        SectionTitle,
    },
    setup() {
        // 响应式状态
        const sectionRef = ref(null);
        const isVisible = ref(false);
        const currentSlide = ref(0);
        const selectedProgram = ref(null);
        const hoveredElements = ref({});
        const isClosing = ref(false);
        const innerWidth = ref(0);

        // 计算属性
        const extendedPrograms = computed(() => {
            const extended = [];
            // 减少重复次数，只创建必要的副本以支持无限轮播
            for (let i = 0; i < 10; i++) {
                // 从100改为10，减少重复
                PROGRAMS_DATA.forEach((program, index) => {
                    extended.push({
                        ...program,
                        id: program.id + i * TOTAL_SLIDES + index,
                        originalId: program.id,
                    });
                });
            }
            return extended;
        });

        const trackTransform = computed(() => {
            // 使用更精确的计算方式
            const containerWidth = innerWidth.value;
            const totalCardsWidth = 5 * CARD_WIDTH; // 5张卡片的总宽度
            const totalGapWidth = containerWidth - totalCardsWidth; // 总间隙宽度
            const singleGap = totalGapWidth / 6; // 4个间隙（卡片之间）

            // 每次移动：一张卡片宽度 + 一个间隙
            const moveDistance = CARD_WIDTH + singleGap;

            return `translateX(-${currentSlide.value * moveDistance}px)`;
        });

        const selectedProgramData = computed(() => {
            return PROGRAMS_DATA.find(
                (program) => program.id === selectedProgram.value
            );
        });

        // 方法
        const updateWidth = () => {
            innerWidth.value = 0.7292 * window.innerWidth;
        };

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

        const nextSlide = () => {
            currentSlide.value = (currentSlide.value + 1) % TOTAL_SLIDES;
        };

        const prevSlide = () => {
            currentSlide.value =
                (currentSlide.value - 1 + TOTAL_SLIDES) % TOTAL_SLIDES;
        };

        const goToSlide = (index) => {
            currentSlide.value = index;
        };

        const openProgramDetail = (programId) => {
            setTimeout(() => {
                isClosing.value = false;
                selectedProgram.value = programId;
            }, 100);
        };

        const closeProgramDetail = () => {
            if (!isClosing.value) {
                isClosing.value = true;
                setTimeout(() => {
                    selectedProgram.value = null;
                    isClosing.value = false;
                }, ANIMATION_DURATION);
            }
        };

        // 生命周期
        onMounted(() => {
            updateWidth();
            window.addEventListener("resize", updateWidth);

            const observer = new IntersectionObserver(
                (entries) => {
                    const [entry] = entries;
                    if (entry.isIntersecting) {
                        isVisible.value = true;
                    }
                },
                { threshold: 0.3 }
            );

            if (sectionRef.value) {
                observer.observe(sectionRef.value);
            }

            return () => {
                if (sectionRef.value) {
                    observer.unobserve(sectionRef.value);
                }
            };
        });

        onUnmounted(() => {
            window.removeEventListener("resize", updateWidth);
        });

        return {
            // refs
            sectionRef,
            // 状态
            isVisible,
            currentSlide,
            selectedProgram,
            hoveredElements,
            isClosing,
            innerWidth,
            // 常量
            TOTAL_SLIDES,
            // 计算属性
            extendedPrograms,
            trackTransform,
            selectedProgramData,
            // 方法
            handleMouseEnter,
            handleMouseLeave,
            nextSlide,
            prevSlide,
            goToSlide,
            openProgramDetail,
            closeProgramDetail,
        };
    },
};
</script>

<style lang="less" scoped>
.programs-container {
    position: relative;
    width: 100%;
    padding: 60px 0;
    overflow: hidden;
}

.background-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 312px;
    z-index: 1;
}

.background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.content-wrapper {
    position: relative;
    z-index: 2;
}

.content-inner {
    transition: opacity 0.5s ease;

    &.opacity-100 {
        opacity: 1;
    }

    &.opacity-0 {
        opacity: 0;
    }
}

.carousel-container {
    position: relative;
    width: calc(100% - 16vw);
    margin: 0 8vw;
    padding: 0 5.54vw;
}

.carousel-inner {
    position: relative;
    width: calc(100% + 10px);
    margin: 20px -5px;
    padding: 10px 5px;
    overflow: hidden;
}

.carousel-track {
    display: flex;
    transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    will-change: transform;
    justify-content: space-between;
    gap: calc((100% - 1000px) / 4);
}

.program-card {
    width: 200px;
    height: 390px;
    border-radius: 10px;
    box-shadow: -2px 0px 4px 0px rgba(190, 190, 190, 0.25),
        2px 2px 4px 0px rgba(190, 190, 190, 0.25);
    overflow: hidden;
    background-color: #fff;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    z-index: 99;

    &:hover {
        // box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        //             0 10px 10px -5px rgba(0, 0, 0, 0.04);
        transform: translateY(-4px);
    }
}

.card-image {
    width: 100%;
    height: 236px;
    position: relative;
    overflow: hidden;
}

.card-image-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    .program-card:hover & {
        transform: scale(1.05);
    }
}

.university-icon {
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 38px;
    height: 38px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 5;

    img {
        object-fit: contain;
    }
}

.card-content {
    padding: 12px;
    text-align: center;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.program-title {
    font-weight: bold;
    font-size: 15px;
    line-height: 20px;
    color: #2e4057;
    transition: color 0.3s ease;
    cursor: pointer;
    margin: 0;

    &.is-hovered {
        color: #ff6b35;
    }
}

.university-name {
    font-size: 12px;
    color: #3a3e48;
    margin: 0;
    transition: color 0.3s ease;
    cursor: pointer;

    &.is-hovered {
        color: #ff6b35;
    }
}

.navigation-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 10;
    transition: all 0.3s ease;
    color: #ff6b35;
    font-size: 24px;
    font-weight: bold;
    border: none;
    outline: none;

    &:hover {
        background-color: #f3f4f6;
        transform: scale(1.1);
    }

    &:disabled {
        cursor: not-allowed;
    }

    &.prev-arrow {
        left: 0;
    }

    &.next-arrow {
        right: 0;
    }
}

.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    height: 15px;
}

.pagination-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #dbdfec;
    margin: 0 5px;
    cursor: pointer;
    transition: all 0.4s ease;

    &.active {
        background-color: #ff6b35;
        border: 3px solid #dbdfec;
        width: 14px;
        height: 14px;
    }
}

// 详情页面样式
.detail-page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 200;
    transform: translateX(100%);
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94),
        opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    opacity: 0;
    pointer-events: none;

    &.active {
        transform: translateX(0);
        opacity: 1;
        pointer-events: auto;
    }

    &.closing {
        transform: translateX(100%);
        opacity: 0;
        pointer-events: none;
    }
}

.detail-page-content {
    display: flex;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    background: #ffffff;
    box-sizing: border-box;
    border: 1px solid #dbdfec;
    box-shadow: -5px 0px 10px 0px rgba(190, 190, 190, 0.25),
        5px 5px 10px 0px rgba(190, 190, 190, 0.25);
}

.detail-page-image {
    width: 240px;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.detail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.detail-page-info {
    width: calc(100% - 240px);
    padding: 22px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    position: relative;
}

.detail-page-title {
    font-size: 21px;
    font-weight: 600;
    color: #2e4057;
    margin-bottom: 3.5px;
    line-height: normal;
    letter-spacing: normal;
}

.detail-page-university {
    font-size: 18px;
    color: #3a3e48;
    font-weight: 300;
    margin-bottom: 25px;
    line-height: normal;
    letter-spacing: normal;
}

.detail-page-info-content {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 16px;
}

.detail-page-info-grid {
    width: 330px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.detail-page-info-item {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
}

.detail-page-info-label {
    font-weight: 600;
    color: #2e4057;
    display: flex;
    align-items: center;
    margin-right: 4px;
    font-size: 16.5px;

    &::before {
        content: "";
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: #ff6b35;
        border-radius: 50%;
        margin-right: 15px;
    }
}

.detail-page-info-value {
    font-weight: 300;
    line-height: normal;
    letter-spacing: normal;
    color: #3a3e48;
    margin-left: 21px;
    font-size: 16.5px;
    font-family: PingFang SC;
}

.detail-page-reasons-section {
    flex-grow: 1;
}

.detail-page-reasons-title {
    font-size: 16.5px;
    font-weight: 600;
    color: #2e4057;
    margin-bottom: 22px;
}

.detail-page-reasons-list {
    list-style: none;
    padding: 0;
    margin: 0 0 16px 0;
}

.detail-page-reason-item {
    display: flex;
    align-items: baseline;
    margin-bottom: 20px;
}

.detail-page-reason-number {
    width: 19.5px;
    height: 19.5px;
    border-radius: 50%;
    background-color: #ff6b35;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    flex-shrink: 0;
    font-size: 13.5px;
    font-weight: 600;
}

.detail-page-reason-text {
    font-weight: 300;
    line-height: normal;
    letter-spacing: normal;
    color: #3a3e48;
    font-size: 16.5px;
}

.detail-page-button {
    position: absolute;
    bottom: 22px;
    right: 22px;
    width: 110px;
    height: 33px;
    background-color: #ff6b35;
    color: #fff;
    padding: 7.5px 12px;
    border-radius: 4px;
    font-weight: 500;
    text-align: center;
    transition: background-color 0.2s ease;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: normal;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #e55a29;
    }
}
</style>
