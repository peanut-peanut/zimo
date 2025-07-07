<template>
    <div class="about-us-container">
        <!-- 首屏关键组件 -->
        <Header isFrom="AboutUs" />
        <Top />
        <CompanyIntroduction />
        
        <!-- 懒加载的非首屏组件 -->
        <div class="fade-in-section" data-fade-section="products-services">
            <Suspense>
                <template #default>
                    <ProductsServices />
                </template>
                <template #fallback>
                    <LoadingComponent height="500px" />
                </template>
            </Suspense>
        </div>

        <div class="fade-in-section" data-fade-section="our-team">
            <Suspense>
                <template #default>
                    <OurTeam />
                </template>
                <template #fallback>
                    <LoadingComponent height="400px" />
                </template>
            </Suspense>
        </div>

        <div class="fade-in-section" data-fade-section="location-contact">
            <Suspense>
                <template #default>
                    <LocationContact />
                </template>
                <template #fallback>
                    <LoadingComponent height="300px" />
                </template>
            </Suspense>
        </div>

        <div class="fade-in-section" data-fade-section="partners">
            <Suspense>
                <template #default>
                    <Partners />
                </template>
                <template #fallback>
                    <LoadingComponent height="350px" />
                </template>
            </Suspense>
        </div>

        <div class="fade-in-section" data-fade-section="join-us">
            <Suspense>
                <template #default>
                    <JoinUs />
                </template>
                <template #fallback>
                    <LoadingComponent height="400px" />
                </template>
            </Suspense>
        </div>
        <Footer />
        
        <!-- 置顶按钮 -->
        <button
            v-if="showScrollToTop"
            class="scroll-to-top-button"
            @click="scrollToTop"
            aria-label="Scroll to top"
        >
            <img
                src="/assets/image/Home/ScrollToTop.png"
                alt="Scroll to top"
                width="60"
                height="60"
                class="scroll-to-top-icon"
            />
        </button>
    </div>
</template>

<script>
import { defineAsyncComponent, onMounted, onUnmounted, ref } from "vue";
import Header from "../home/components/Header/index.vue";
import Top from "./components/Top/index.vue";
import CompanyIntroduction from "./components/CompanyIntroduction/index.vue";
import baiduAnalytics from "@/utils/baidu-analytics";

// 懒加载非首屏组件
const ProductsServices = defineAsyncComponent(() =>
    import("./components/ProductsServices/index.vue")
);
const OurTeam = defineAsyncComponent(() =>
    import("./components/OurTeam/index.vue")
);
const LocationContact = defineAsyncComponent(() =>
    import("./components/LocationContact/index.vue")
);
const Partners = defineAsyncComponent(() =>
    import("./components/Partners/index.vue")
);
const JoinUs = defineAsyncComponent(() =>
    import("./components/JoinUs/index.vue")
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
    name: "AboutUs",
    components: {
        Header,
        Top,
        CompanyIntroduction,
        ProductsServices,
        OurTeam,
        LocationContact,
        Partners,
        JoinUs,
        Footer,
        LoadingComponent,
    },
    setup() {
        let observer = null;
        const showScrollToTop = ref(false);
        
        // 立即回到顶部，在组件初始化时就执行
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;

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

        // 监听滚动事件，决定是否显示置顶按钮
        const handleScroll = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            showScrollToTop.value = scrollTop > 300; // 滚动超过300px时显示按钮
        };

        // 平滑滚动到顶部
        const scrollToTop = () => {
            // 上报回到顶部按钮点击事件
            baiduAnalytics.trackEvent('navigation', 'back_to_top_click', 'about_us_page', 1);
            
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };

        onMounted(() => {
            // 刷新页面时回到最顶部 - 使用多种方式确保到达顶部
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            
            // 延迟再次确保回到顶部，防止其他组件影响
            setTimeout(() => {
                window.scrollTo(0, 0);
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
            }, 100);
            
            // 设置页面标题和meta信息
            document.title = "About Us - ZIMO";

            const metaDescription = document.querySelector(
                'meta[name="description"]'
            );
            if (metaDescription) {
                metaDescription.setAttribute(
                    "content",
                    "About ZIMO - Learn more about our mission and services"
                );
            } else {
                const meta = document.createElement("meta");
                meta.name = "description";
                meta.content = "About ZIMO - Learn more about our mission and services";
                document.head.appendChild(meta);
            }

            // 延迟初始化动画，确保DOM完全加载
            setTimeout(() => {
                initFadeInAnimations();
            }, 300);
            
            // 添加滚动事件监听
            window.addEventListener("scroll", handleScroll);
        });

        onUnmounted(() => {
            if (observer) {
                observer.disconnect();
            }
            // 移除滚动事件监听
            window.removeEventListener("scroll", handleScroll);
        });

        return {
            showScrollToTop,
            scrollToTop,
        };
    },
};
</script>

<style lang="less" scoped>
.about-us-container {
    width: 100%;
    //min-height: 100vh;
    overflow: hidden;
    background: #f8f9fa;
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

// 保护已有动画的组件
:deep(.service-card) {
    // 保护ProductsServices组件的卡片动画
    &:not(.fade-in) {
        // 只有在没有fade-in类时才应用页面级别的动画
        opacity: 0 !important;
        transform: translateY(30px) !important;
    }
    
    &.fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
}

// 保护 ProductsServices 组件不被页面级别的文字动画影响
:deep(.product-introduction-container) {
    .card-title,
    .card-description {
        // 保护卡片内的文字不被页面级别的动画影响
        opacity: 1 !important;
        transform: none !important;
        
        &.text-fade-in {
            opacity: 1 !important;
            transform: none !important;
            transition: color 0.3s ease !important;
        }
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

// 加载组件样式
.flex {
    display: flex;
}

.items-center {
    align-items: center;
}

.justify-center {
    justify-content: center;
}

.animate-spin {
    animation: spin 1s linear infinite;
}

.rounded-full {
    border-radius: 50%;
}

.h-8 {
    height: 2rem;
}

.w-8 {
    width: 2rem;
}

.border-b-2 {
    border-bottom-width: 2px;
}

.border-orange-500 {
    border-color: #ff6b35;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/* 置顶按钮样式 */
.scroll-to-top-button {
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    transform: translateY(20px) scale(0.8);
    animation: fadeInUp 0.3s ease-out forwards;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px) scale(0.9);
        opacity: 1;
    }
}

.scroll-to-top-icon {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.2s ease;
}

.scroll-to-top-button:hover .scroll-to-top-icon {
    transform: scale(1.1);
}

/* 淡入动画 */
@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}
</style>
