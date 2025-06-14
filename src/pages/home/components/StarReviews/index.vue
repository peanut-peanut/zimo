<template>
    <section id="reviews" ref="sectionRef" class="reviews-section">
        <div class="w-full">
            <!-- 标题 -->
            <SectionTitle title="Over 1,000 5-Star Reviews" />

            <!-- 评论轮播容器 -->
            <div class="review-container" ref="containerRef">
                <div class="review-wrapper">
                    <div
                        ref="sliderRef"
                        class="review-slider"
                        :style="{
                            transform: `translateX(-${slidePosition}px)`,
                        }"
                    >
                        <!-- 使用扩展后的超长评论数组，实现无需复位的无限滚动 -->
                        <div
                            v-for="review in extendedReviews"
                            :key="review.id.toString()"
                            class="review-card"
                            @mouseenter="handleMouseEnter(review.id.toString())"
                            @mouseleave="handleMouseLeave"
                        >
                            <div class="avatar-container">
                                <img
                                    :src="review.avatar"
                                    :alt="review.name"
                                    class="avatar-image"
                                />
                            </div>
                            <div class="user-info">
                                <div>
                                    <div class="user-name">
                                        {{ review.name }}
                                    </div>
                                    <p class="user-country">
                                        {{ review.country }}
                                    </p>
                                </div>
                            </div>
                            <div class="star-rating">
                                <span v-for="i in review.stars" :key="i"
                                    >★</span
                                >
                            </div>
                            <p class="review-text">
                                {{ review.review }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import SectionTitle from "../../../../components/SectionTitle.vue";

export default {
    name: "StarReviews",
    components: {
        SectionTitle,
    },
    setup() {
        const sectionRef = ref(null);
        const sliderRef = ref(null);
        const containerRef = ref(null);
        const isVisible = ref(false);
        const isPaused = ref(false);
        const animationRef = ref(null);
        const slidePosition = ref(0);

        // 评论数据 - 使用不同长度的评论内容，展示高度差异
        const reviews = [
            {
                id: 1,
                name: "Howlader Urnisha",
                country: "Bangladesh",
                avatar: "/assets/image/Home/StarReviews/StarReviews1.png",
                stars: 5,
                review: "You have processed my daughter Urnisha's admission in Wuhan University. I am very pleased for your smooth & reliable service!",
            },
            {
                id: 2,
                name: "Bensen Nolan",
                country: "USA",
                avatar: "/assets/image/Home/StarReviews/StarReviews2.png",
                stars: 5,
                review: "Thank you ZIMO. You've been a great help, well worth the $100 I payed for your services. I'll be sure to review your website well online and recommend it to many other graduates I know who want to study in China. The process was straightforward and the communication was excellent throughout.",
            },
            {
                id: 3,
                name: "Samuel Chigbo Obiegbusi",
                country: "Guyana",
                avatar: "/assets/image/Home/StarReviews/StarReviews3.png",
                stars: 5,
                review: "Good evening Rita, With great joy and happiness in my heart, I wish to say a big thank you to you and all the ZIMO team, Catherol and Andy included, for your professional and dedicated effort towards making my application a success!",
            },
            {
                id: 4,
                name: "Joylyn Roselyn Benedict Ali",
                country: "Zimbabwe",
                avatar: "/assets/image/Home/StarReviews/StarReviews4.png",
                stars: 5,
                review: "I would like to thank the whole ZIMO team for the wonderful service provided! I received my admission package! The entire process from application to admission was handled professionally. I'm now studying at my dream university in China.",
            },
        ];

        // 创建一个非常长的评论列表，以实现真正的无限滚动
        // 使用多份数据以确保滚动过程中不会出现空白
        const extendedReviews = computed(() => {
            const extended = [];
            // 添加20组数据，确保足够长的滚动内容
            for (let i = 0; i < 20; i++) {
                extended.push(
                    ...reviews.map((review) => ({
                        ...review,
                        id: `${review.id}-${i}`, // 添加唯一ID
                    }))
                );
            }
            return extended;
        });

        // 实现真正的无限滚动
        const scrollLeft = () => {
            // 只需要简单地增加滚动位置，不需要检查和重置
            slidePosition.value = slidePosition.value + 1;
        };

        // 使用requestAnimationFrame处理滚动动画
        const startScrollAnimation = () => {
            if (animationRef.value) {
                cancelAnimationFrame(animationRef.value);
            }

            let lastTime = 0;
            const animate = (time) => {
                if (time - lastTime > 30) {
                    // 降低更新频率，约33fps
                    scrollLeft();
                    lastTime = time;
                }

                if (isVisible.value && !isPaused.value) {
                    animationRef.value = requestAnimationFrame(animate);
                }
            };

            animationRef.value = requestAnimationFrame(animate);
        };

        const stopScrollAnimation = () => {
            if (animationRef.value) {
                cancelAnimationFrame(animationRef.value);
                animationRef.value = null;
            }
        };

        // 处理鼠标悬浮事件
        const handleMouseEnter = (id) => {
            isPaused.value = true;
        };

        const handleMouseLeave = () => {
            isPaused.value = false;
        };

        // 监听可见性和暂停状态变化，控制滚动
        const updateAnimation = () => {
            // 当元素可见且未暂停时，开始滚动
            if (isVisible.value && !isPaused.value) {
                startScrollAnimation();
            } else {
                stopScrollAnimation();
            }
        };

        onMounted(() => {
            // 观察元素是否进入视口
            const observer = new IntersectionObserver(
                (entries) => {
                    const [entry] = entries;
                    if (entry.isIntersecting) {
                        isVisible.value = true;
                    } else {
                        isVisible.value = false;
                    }
                    updateAnimation();
                },
                { threshold: 0.3 }
            );

            if (sectionRef.value) {
                observer.observe(sectionRef.value);
            }

            // 监听暂停状态变化
            const unwatch = [
                // 当isPaused变化时更新动画
                (() => {
                    let prevIsPaused = isPaused.value;
                    const checkPaused = () => {
                        if (prevIsPaused !== isPaused.value) {
                            prevIsPaused = isPaused.value;
                            updateAnimation();
                        }
                        requestAnimationFrame(checkPaused);
                    };
                    checkPaused();
                })(),
            ];

            return () => {
                if (sectionRef.value) {
                    observer.unobserve(sectionRef.value);
                }
                stopScrollAnimation();
            };
        });

        onUnmounted(() => {
            stopScrollAnimation();
        });

        return {
            sectionRef,
            sliderRef,
            containerRef,
            slidePosition,
            extendedReviews,
            handleMouseEnter,
            handleMouseLeave,
        };
    },
};
</script>

<style lang="less" scoped>
.reviews-section {
    width: 100%;
    background-color: #fff;
    padding: 75px 0;
    position: relative;
}

.w-full {
    width: 100%;
}

.review-container {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.review-wrapper {
    display: flex;
    overflow: hidden;
    position: relative;
    padding: 10px 0;
    margin: 0 -10px;
}

.review-slider {
    display: flex;
    transition: none;
    width: max-content;
    align-items: flex-start;
}

.review-card {
    flex: 0 0 auto;
    width: 489px;
    padding: 30px 30px 30px 118px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    background-color: #ffffff;
    margin-right: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid #eaeaea;
    position: relative;
    height: auto;
    min-height: auto;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
}

.avatar-container {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    position: absolute;
    top: 30px;
    left: 30px;
    overflow: hidden;
}

.avatar-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.user-info {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
}

.user-name {
    font-weight: bold;
    color: #2e4057;
    font-size: 24px;
    margin-bottom: 2px;
    transition: color 0.3s ease;
    line-height: normal;
    letter-spacing: normal;
    cursor: pointer;

    &:hover {
        color: #ff6b35;
    }
}

.user-country {
    color: #3a3e48;
    font-size: 18px;
    transition: color 0.3s ease;
    line-height: normal;
    letter-spacing: normal;
    cursor: pointer;
    margin: 0;

    &:hover {
        color: #ff6b35;
    }
}

.star-rating {
    display: flex;
    color: #ffca38;
    margin-bottom: 20px;
    font-size: 22px;
    gap: 6px;
}

.review-text {
    color: #2e4057;
    line-height: normal;
    letter-spacing: normal;
    font-size: 18px;
    display: block;
    overflow: visible;
    max-height: none;
    white-space: normal;
    word-wrap: break-word;
    hyphens: auto;
    transition: color 0.3s ease;
    cursor: pointer;
    margin: 0;

    &:hover {
        color: #ff6b35;
    }
}
</style>
