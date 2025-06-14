<template>
    <main class="min-h-screen">
        <!-- 首屏关键组件 -->
        <Header :isFrom="Home" />
        <Hero />

        <!-- 懒加载的非首屏组件 - 从这里开始添加淡入效果 -->
        <div class="fade-in-section" data-fade-section="why-china">
            <Suspense>
                <template #default>
                    <WhyChooseChina />
                </template>
                <template #fallback>
                    <LoadingComponent height="300px" />
                </template>
            </Suspense>
        </div>

        <div class="fade-in-section" data-fade-section="popular-cities">
            <Suspense>
                <template #default>
                    <PopularCities />
                </template>
                <template #fallback>
                    <LoadingComponent height="300px" />
                </template>
            </Suspense>
        </div>

        <div class="fade-in-section" data-fade-section="why-zimo">
            <Suspense>
                <template #default>
                    <WhyChooseZimo />
                </template>
                <template #fallback>
                    <LoadingComponent height="400px" />
                </template>
            </Suspense>
        </div>

        <div class="fade-in-section" data-fade-section="reviews">
            <Suspense>
                <template #default>
                    <StarReviews />
                </template>
                <template #fallback>
                    <LoadingComponent height="350px" />
                </template>
            </Suspense>
        </div>

        <div class="fade-in-section" data-fade-section="programs">
            <Suspense>
                <template #default>
                    <OutstandingPrograms />
                </template>
                <template #fallback>
                    <LoadingComponent height="500px" />
                </template>
            </Suspense>
        </div>

        <div class="fade-in-section" data-fade-section="process">
            <Suspense>
                <template #default>
                    <ApplicationProcess />
                </template>
                <template #fallback>
                    <LoadingComponent height="300px" />
                </template>
            </Suspense>
        </div>

        <div class="fade-in-section" data-fade-section="featured-in">
            <Suspense>
                <template #default>
                    <FeaturedIn />
                </template>
                <template #fallback>
                    <LoadingComponent height="300px" />
                </template>
            </Suspense>
        </div>

        <Suspense>
            <template #default>
                <SpecialContent />
            </template>
            <template #fallback>
                <LoadingComponent height="300px" />
            </template>
        </Suspense>

        <Suspense>
            <template #default>
                <AboutUs />
            </template>
            <template #fallback>
                <LoadingComponent height="400px" />
            </template>
        </Suspense>

        <Suspense>
            <template #default>
                <Footer />
            </template>
            <template #fallback>
                <LoadingComponent />
            </template>
        </Suspense>
    </main>
</template>

<script>
import { defineAsyncComponent, onMounted, onUnmounted } from "vue";
import Header from "./components/Header/index.vue";
import Hero from "./components/Hero/index.vue";

// 懒加载非首屏组件
const WhyChooseChina = defineAsyncComponent(() =>
    import("./components/WhyChooseChina/index.vue")
);
const PopularCities = defineAsyncComponent(() =>
    import("./components/PopularCities/index.vue")
);
const WhyChooseZimo = defineAsyncComponent(() =>
    import("./components/WhyChooseZimo/index.vue")
);
const StarReviews = defineAsyncComponent(() =>
    import("./components/StarReviews/index.vue")
);
const OutstandingPrograms = defineAsyncComponent(() =>
    import("./components/OutstandingPrograms/index.vue")
);
const ApplicationProcess = defineAsyncComponent(() =>
    import("./components/ApplicationProcess/index.vue")
);

const FeaturedIn = defineAsyncComponent(() =>
    import("./components/FeaturedIn/index.vue")
);

const SpecialContent = defineAsyncComponent(() =>
    import("./components/SpecialContent/index.vue")
);
const AboutUs = defineAsyncComponent(() =>
    import("./components/AboutUs/index.vue")
);
const Footer = defineAsyncComponent(() =>
    import("./components/Footer/index.vue")
);

// 加载占位组件
const LoadingComponent = {
    props: {
        height: {
            type: String,
            default: "200px",
        },
    },
    template: `
    <div class="flex items-center justify-center" :style="{ height }">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
    </div>
  `,
};

export default {
    name: "Home",
    components: {
        Header,
        Hero,
        WhyChooseChina,
        PopularCities,
        WhyChooseZimo,
        StarReviews,
        OutstandingPrograms,
        ApplicationProcess,
        FeaturedIn,
        SpecialContent,
        AboutUs,
        Footer,
        LoadingComponent,
    },
    setup() {
        let observer = null;

        // 简化的淡入动画 - 容器和内部文字都有效果
        const initFadeInAnimations = () => {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            // 先给容器添加淡入效果
                            entry.target.classList.add("fade-in-active");

                            // 延迟后对内部文字元素添加淡入效果
                            setTimeout(() => {
                                const textElements =
                                    entry.target.querySelectorAll(
                                        "h1, h2, h3, h4, h5, h6, p, .feature-title, .feature-description, .subtitle, .section-title"
                                    );
                                textElements.forEach((element, index) => {
                                    // 跳过特殊组件的文字元素
                                    const isInSpecialComponent =
                                        element.closest(
                                            ".choose-zimo-container"
                                        ) ||
                                        element.closest(
                                            ".programs-container"
                                        ) ||
                                        element.closest(
                                            ".section-title-container"
                                        ) ||
                                        element.closest(".footer");

                                    // 避免影响已有动画的元素或特殊组件的元素
                                    if (
                                        !element.style.transition &&
                                        !element.classList.contains(
                                            "animate-"
                                        ) &&
                                        !element.hasAttribute("data-animate") &&
                                        !isInSpecialComponent
                                    ) {
                                        setTimeout(() => {
                                            element.classList.add(
                                                "text-fade-in"
                                            );
                                        }, index * 100);
                                    }
                                });
                            }, 200);
                        }
                    });
                },
                {
                    threshold: 0.15,
                    rootMargin: "-50px 0px -100px 0px",
                }
            );

            // 观察所有需要淡入的section
            const sections = document.querySelectorAll(".fade-in-section");
            sections.forEach((section) => {
                observer.observe(section);
            });
        };

        onMounted(() => {
            // 设置页面标题和meta信息
            document.title = "ZIMO - study in china";

            const metaDescription = document.querySelector(
                'meta[name="description"]'
            );
            if (metaDescription) {
                metaDescription.setAttribute(
                    "content",
                    "ZIMO - study in china"
                );
            } else {
                const meta = document.createElement("meta");
                meta.name = "description";
                meta.content =
                    "ZIMO - study in china";
                document.head.appendChild(meta);
            }

            // 延迟初始化动画，确保DOM完全加载
            setTimeout(() => {
                initFadeInAnimations();
            }, 300);
        });

        onUnmounted(() => {
            if (observer) {
                observer.disconnect();
            }
        });

        return {};
    },
};
</script>

<style lang="less" scoped>
// 全局字体设置
:deep(*) {
    //font-family: "ArialHB", sans-serif !important;
}

// 简洁的容器级淡入动画
.fade-in-section {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    &.fade-in-active {
        opacity: 1;
        transform: translateY(0);
    }
}

// 文字元素的淡入效果
:deep(h1),
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6),
:deep(p),
:deep(.feature-title),
:deep(.feature-description),
:deep(.subtitle),
:deep(.section-title) {
    // 只对没有自定义动画的元素应用初始状态
    &:not(.text-fade-in):not([style*="transition"]):not(.animate-):not(
            [data-animate]
        ) {
        opacity: 0;
        transform: translateY(20px);
    }

    // 淡入后的状态
    &.text-fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
    }
}

// 保护SectionTitle组件始终可见
:deep(.section-title-container .title-text) {
    opacity: 1 !important;
    transform: none !important;

    &.text-fade-in {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
    }
}

// 特殊保护WhyChooseZimo和OutstandingPrograms组件的文字元素
:deep(.choose-zimo-container .feature-title),
:deep(.choose-zimo-container .feature-description),
:deep(.choose-zimo-container .subtitle),
:deep(.programs-container .program-title),
:deep(.programs-container .university-name),
:deep(.programs-container .detail-page-title) {
    // 这些元素始终保持可见且位置不变，因为它们有自己的hover效果
    opacity: 1 !important;
    transform: none !important;

    // 确保即使添加了text-fade-in类也不改变位置
    &.text-fade-in {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
    }
}

// 保护Hero组件的subtitle始终可见
:deep(.hero-section .subtitle) {
    opacity: 1 !important;
    transform: none !important;

    &.text-fade-in {
        opacity: 1 !important;
        transform: none !important;
        transition: none !important;
    }
}

// 响应式优化
@media (max-width: 768px) {
    .fade-in-section {
        transform: translateY(20px);
        transition-duration: 0.6s;
    }

    :deep(.text-fade-in) {
        transform: translateY(0) !important;
        transition-duration: 0.4s !important;
    }
}

// 为偏好减少动效的用户提供支持
@media (prefers-reduced-motion: reduce) {
    .fade-in-section {
        transition-duration: 0.3s;
        transform: translateY(10px);
    }

    :deep(.text-fade-in) {
        transition-duration: 0.2s !important;
        transform: translateY(0) !important;
    }
}
</style>
