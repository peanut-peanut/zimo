<template>
    <section
        id="about"
        ref="sectionRef"
        class="about-section"
        :class="{ 'need-large-screen-adaptation': needLargeScreenAdaptation }"
    >
        <div class="container">
            <!-- 标题部分 -->
            <!-- <SectionTitle title="About Us" /> -->

            <!-- Footer 部分 -->
            <div class="footer">
                <div class="footer-columns">
                    <div class="footer-column">
                        <div class="footer-title">{{ $t('footer.aboutUs.title') }}</div>
                        <a
                            href="#"
                            class="footer-link"
                            @click.prevent="handleLinkClick('our-stories')"
                            >{{ $t('footer.aboutUs.ourStories') }}</a
                        >
                        <a
                            href="#"
                            class="footer-link"
                            @click.prevent="handleLinkClick('our-services')"
                            >{{ $t('footer.aboutUs.ourServices') }}</a
                        >
                        <a
                            href="#"
                            class="footer-link"
                            @click.prevent="handleLinkClick('why-zimo')"
                            >{{ $t('footer.aboutUs.whyZimo') }}</a
                        >
                    </div>

                    <div class="footer-column">
                        <div class="footer-title">{{ $t('footer.forStudents.title') }}</div>
                        <a
                            href="#"
                            class="footer-link"
                            @click.prevent="handleProgramClick('Chinese')"
                            >{{ $t('footer.forStudents.chinesePrograms') }}</a
                        >
                        <a
                            href="#"
                            class="footer-link"
                            @click.prevent="handleProgramClick('Bachelor')"
                            >{{ $t('footer.forStudents.undergraduateCourses') }}</a
                        >
                        <a
                            href="#"
                            class="footer-link"
                            @click.prevent="handleProgramClick('Master')"
                            >{{ $t('footer.forStudents.postgraduateCourses') }}</a
                        >
                        <a
                            href="#"
                            class="footer-link"
                            @click.prevent="handleProgramClick('PHD')"
                            >{{ $t('footer.forStudents.doctoralCourses') }}</a
                        >
                        <a
                            href="#"
                            class="footer-link"
                            @click.prevent="handleProgramClick('MBBS')"
                            >{{ $t('footer.forStudents.mbbsCourses') }}</a
                        >
                        <a
                            href="#"
                            class="footer-link"
                            @click.prevent="handleScholarshipClick()"
                            >{{ $t('footer.forStudents.chinaScholarship') }}</a
                        >
                        <a
                            href="#"
                            class="footer-link"
                            @click.prevent="handleLinkClick('support')"
                            >{{ $t('footer.forStudents.support') }}</a
                        >
                    </div>

                    <div class="footer-column">
                        <div class="footer-title">{{ $t('footer.forUniversities.title') }}</div>
                        <a
                            href="#"
                            class="footer-link"
                            @click.prevent="
                                handleLinkClick('advertise-with-us')
                            "
                            >{{ $t('footer.forUniversities.advertiseWithUs') }}</a
                        >
                    </div>

                    <div class="footer-column">
                        <div class="footer-title">{{ $t('footer.followUs.title') }}</div>
                        <div class="social-icons">
                            <!-- WhatsApp 图标 -->
                            <div
                                class="social-icon-container whatsapp-container"
                                @mouseenter="handleWhatsAppMouseEnter"
                                @mouseleave="handleWhatsAppMouseLeave"
                            >
                                <img
                                    src="/assets/image/Home/AboutUs/PhoneIcon.png"
                                    alt="WhatsApp"
                                    class="social-icon whatsapp-icon"
                                />
                                <div
                                    v-if="isWhatsAppHovered"
                                    class="social-tooltip wechat-tooltip"
                                >
                                    <div
                                        class="tooltip-content wechat-tooltip-content"
                                    >
                                        <div
                                            class="wechat-tooltip-content-title"
                                        >
                                            <div>{{ $t('social.whatsapp') }}</div>
                                            <div>+853 65702421</div>
                                        </div>
                                        <div
                                            class="wechat-tooltip-content-image"
                                        >
                                            <img
                                                src="/assets/image/Home/AboutUs/WhatsApp.png"
                                                alt="WhatsApp QR Code"
                                                width="200"
                                                height="200"
                                                class="wechat-qr-code"
                                            />
                                        </div>
                                    </div>
                                    <div class="tooltip-arrow"></div>
                                </div>
                            </div>

                            <!-- Telegram 图标 -->
                            <div
                                class="social-icon-container telegram-container"
                                @mouseenter="handleTelegramMouseEnter"
                                @mouseleave="handleTelegramMouseLeave"
                            >
                                <img
                                    src="/assets/image/Home/AboutUs/TelegramIcon.png"
                                    alt="Telegram"
                                    class="social-icon telegram-icon"
                                />
                                <div
                                    v-if="isTelegramHovered"
                                    class="social-tooltip telegram-tooltip"
                                >
                                    <div
                                        class="tooltip-content telegram-tooltip-content"
                                    >
                                        <div>{{ $t('social.telegram') }}</div>
                                        <div>+853 65702421</div>
                                    </div>
                                    <div class="tooltip-arrow"></div>
                                </div>
                            </div>

                            <!-- WeChat 图标 -->
                            <div
                                class="social-icon-container wechat-container"
                                @mouseenter="handleWechatMouseEnter"
                                @mouseleave="handleWechatMouseLeave"
                            >
                                <img
                                    src="/assets/image/Home/AboutUs/WechatIcon.png"
                                    alt="WeChat"
                                    class="social-icon wechat-icon"
                                />
                                <div
                                    v-if="isWechatHovered"
                                    class="social-tooltip wechat-tooltip"
                                >
                                    <div
                                        class="tooltip-content wechat-tooltip-content"
                                    >
                                        <div
                                            class="wechat-tooltip-content-title"
                                        >
                                            <div>{{ $t('social.wechat') }}</div>
                                            <div>Mia_Miaoao</div>
                                        </div>
                                        <div
                                            class="wechat-tooltip-content-image"
                                        >
                                            <img
                                                src="/assets/image/Home/AboutUs/WechatQrcode.png"
                                                alt="WeChat QR Code"
                                                width="200"
                                                height="200"
                                                class="wechat-qr-code"
                                            />
                                        </div>
                                    </div>
                                    <div class="tooltip-arrow"></div>
                                </div>
                            </div>

                            <!-- TikTok 图标 -->
                            <div
                                class="social-icon-container tiktok-container"
                                @mouseenter="handleTikTokMouseEnter"
                                @mouseleave="handleTikTokMouseLeave"
                                @click="handleTikTokClick"
                            >
                                <img
                                    src="/assets/image/Home/AboutUs/TikTokIcon.png"
                                    alt="TikTok"
                                    :class="[
                                        'social-icon',
                                        'tiktok-icon',
                                        {
                                            'tiktok-icon-hovered':
                                                isTikTokHovered,
                                        },
                                    ]"
                                />
                            </div>

                            <!-- YouTube 图标 -->
                            <div
                                class="social-icon-container youtube-container"
                                @mouseenter="handleYouTubeMouseEnter"
                                @mouseleave="handleYouTubeMouseLeave"
                                @click="handleYouTubeClick"
                            >
                                <img
                                    src="/assets/image/Home/AboutUs/YoutubeIcon.png"
                                    alt="YouTube"
                                    :class="[
                                        'social-icon',
                                        'youtube-icon',
                                        {
                                            'youtube-icon-hovered':
                                                isYouTubeHovered,
                                        },
                                    ]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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
    </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import SectionTitle from "../../../../components/SectionTitle.vue";
import { searchStore } from "../../../../store/searchStore";
import { ROUTES } from "../../../../router/routes";

export default {
    name: "AboutUs",
    components: {
        SectionTitle,
    },
    props: {
        needLargeScreenAdaptation: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const sectionRef = ref(null);
        const showScrollToTop = ref(false);

        // 每个社交媒体图标的独立悬停状态
        const isWhatsAppHovered = ref(false);
        const isTelegramHovered = ref(false);
        const isWechatHovered = ref(false);
        const isTikTokHovered = ref(false);
        const isYouTubeHovered = ref(false);

        const stats = [
            {
                id: 1,
                number: "400+",
                label: "UNIVERSITIES",
                color: "#38C9A6", // 绿色
            },
            {
                id: 2,
                number: "30000+",
                label: "PROGRAM",
                color: "#FFD255", // 黄色
            },
            {
                id: 3,
                number: "4000+",
                label: "STUDENTS",
                color: "#3BABBE", // 蓝色
            },
            {
                id: 4,
                number: "100+",
                label: "COMPANIES",
                color: "#D10022", // 红色
            },
        ];

        // 监听滚动事件，决定是否显示置顶按钮
        const handleScroll = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            showScrollToTop.value = scrollTop > 300; // 滚动超过300px时显示按钮
        };

        // 平滑滚动到顶部
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        };

        // WhatsApp 独立逻辑
        const handleWhatsAppMouseEnter = () => {
            isWhatsAppHovered.value = true;
        };

        const handleWhatsAppMouseLeave = () => {
            isWhatsAppHovered.value = false;
        };

        // Telegram 独立逻辑
        const handleTelegramMouseEnter = () => {
            isTelegramHovered.value = true;
        };

        const handleTelegramMouseLeave = () => {
            isTelegramHovered.value = false;
        };

        // WeChat 独立逻辑
        const handleWechatMouseEnter = () => {
            isWechatHovered.value = true;
        };

        const handleWechatMouseLeave = () => {
            isWechatHovered.value = false;
        };

        // TikTok 独立逻辑
        const handleTikTokMouseEnter = () => {
            isTikTokHovered.value = true;
        };

        const handleTikTokMouseLeave = () => {
            isTikTokHovered.value = false;
        };

        const handleTikTokClick = () => {
            window.open("https://www.tiktok.com/@zimostudyinchina", "_blank");
        };

        // YouTube 独立逻辑
        const handleYouTubeMouseEnter = () => {
            isYouTubeHovered.value = true;
        };

        const handleYouTubeMouseLeave = () => {
            isYouTubeHovered.value = false;
        };

        const handleYouTubeClick = () => {
            window.open("https://www.youtube.com/@zimo.studyinchina", "_blank");
        };

        // 处理footer链接点击
        const handleLinkClick = (linkType) => {
            const linkRouteMap = {
                "our-stories": "/about-us/our-stories",
                "our-services": "/about-us/our-services",
                "why-zimo": "/about-us/why-zimo",
                support: "/for-students/support",
                "advertise-with-us": "/for-universities/advertise-with-us",
            };

            const routePath = linkRouteMap[linkType];
            if (routePath) {
                // 新开窗口跳转到对应的文档页面
                window.open(routePath, "_blank");
            }
        };

        // 处理程序类型点击 - 跳转到Program页面并应用筛选
        const handleProgramClick = (programType) => {
            // 先清除所有之前的搜索和筛选参数
            searchStore.clearAll();

            // 设置对应的筛选参数，使用完整的初始状态
            const filterParams = {
                // 清空所有筛选选项
                selectedDegrees: [],
                selectedScholarship: "",
                selectedLanguages: [],
                selectedCities: [],
                selectedDurations: [],
                selectedStartDate: "",
                minFees: "",
                maxFees: "",
                // 默认的展开状态
                expandedFilters: {
                    cities: false,
                    durations: false,
                    startDates: false,
                    tuition: false,
                    degrees: false,
                    scholarship: false,
                    languages: false,
                },
            };

            if (programType === "Chinese") {
                // Chinese Programs - 按语言筛选
                filterParams.selectedLanguages = ["Chinese"];
                filterParams.expandedFilters.languages = true;
            } else if (programType === "MBBS") {
                // MBBS Courses - 按搜索关键词，清除所有筛选但保持degree默认展开
                filterParams.expandedFilters.degrees = true; // 确保学位筛选器展开
                searchStore.setSearchQuery("MBBS");
                searchStore.setFilterParams(filterParams); // 设置筛选参数
                window.open(ROUTES.PROGRAM, "_blank");
                return;
            } else {
                // Bachelor, Master, PHD - 按学位筛选
                filterParams.selectedDegrees = [programType];
                filterParams.expandedFilters.degrees = true;
            }

            // 设置筛选参数到store
            searchStore.setFilterParams(filterParams);

            // 打开Program页面
            window.open(ROUTES.PROGRAM, "_blank");
        };

        // 处理China Scholarship点击 - 跳转到Guides-Scholarship页面
        const handleScholarshipClick = () => {
            window.open(ROUTES.GUIDES_SCHOLARSHIPS, "_blank");
        };

        onMounted(() => {
            window.addEventListener("scroll", handleScroll);
        });

        onUnmounted(() => {
            window.removeEventListener("scroll", handleScroll);
        });

        return {
            sectionRef,
            showScrollToTop,
            stats,
            isWhatsAppHovered,
            isTelegramHovered,
            isWechatHovered,
            isTikTokHovered,
            isYouTubeHovered,
            scrollToTop,
            handleWhatsAppMouseEnter,
            handleWhatsAppMouseLeave,
            handleTelegramMouseEnter,
            handleTelegramMouseLeave,
            handleWechatMouseEnter,
            handleWechatMouseLeave,
            handleTikTokMouseEnter,
            handleTikTokMouseLeave,
            handleTikTokClick,
            handleYouTubeMouseEnter,
            handleYouTubeMouseLeave,
            handleYouTubeClick,
            handleLinkClick,
            handleProgramClick,
            handleScholarshipClick,
        };
    },
};
</script>

<style lang="less" scoped>
.about-section {
    background-color: #f6f6f6;
    position: relative;
    padding: 50px 200px;
}

.container {
    width: 100%;
}

/* 主要内容区域 */
.main-content {
    display: flex;
    align-items: flex-start;
    margin-bottom: 60px;
}

/* 左侧文字内容 */
.text-content {
    flex: 1;
}

.company-title {
    font-size: 21px;
    font-weight: 600;
    color: #2e4057;
    line-height: normal;
    letter-spacing: normal;
    margin-bottom: 8px;
}

.subtitle {
    font-size: 21px;
    font-weight: 600;
    color: #2e4057;
    line-height: normal;
    letter-spacing: normal;
    margin-bottom: 8px;
}

.description {
    font-size: 18px;
    font-weight: 300;
    color: #3a3e48;
    margin-bottom: 30px;
    line-height: normal;
    letter-spacing: normal;
}

.features {
    display: flex;
    flex-direction: column;
    gap: 22.5px;
}

.feature {
    display: flex;
    align-items: flex-start;
    gap: 16px;
}

.bullet-point {
    width: 8px;
    height: 8px;
    background-color: #ff6b35;
    border-radius: 50%;
    margin-top: 8px;
    flex-shrink: 0;
}

/* .feature-content {
    margin-bottom: 15px;
} */

.feature-title {
    font-size: 16.5px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: normal;
    color: #2e4057;
    margin-bottom: 3px;
}

.feature-desc {
    font-size: 16.5px;
    font-weight: 300;
    line-height: normal;
    letter-spacing: normal;
    color: #3a3e48;
    margin-bottom: 3px;
}

/* 右侧统计数据 */
.stats-container {
    flex-shrink: 0;
    width: 296px;
}

.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px 80px;
    width: 296px;
}

.stat-item {
    width: 108px;
    text-align: center;
}

.stat-circle {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
}

.stat-number {
    font-size: 24px;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    letter-spacing: normal;
    color: #ffffff;
}

.stat-label {
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    letter-spacing: normal;
    color: #2e4057;
    margin: 0;
}

/* Footer 部分 */
.footer {
    // border-top: 1px solid #e5e7eb;
    // padding-top: 45px;
    width: 100%;
}

.footer-columns {
    display: flex;
    gap: 160px;
}

.footer-column {
    //  flex: 1;
    display: flex;
    flex-direction: column;
}

.footer-title {
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: normal;
    color: #2e4057;
    margin: 0 0 40px 0;
}

.footer-link {
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: 300;
    line-height: normal;
    letter-spacing: normal;
    color: #3a3e48;
    margin-bottom: 10px;
    transition: color 0.3s ease;
    text-decoration: none;
    cursor: pointer !important;

    &:hover {
        color: #ff6b35;
    }
}

.social-icons {
    display: flex;
    gap: 20px;
    //  flex-wrap: wrap;
    justify-content: center;
    align-items: center;
}

/* 社交媒体图标容器 */
.social-icon-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.social-icon {
    transition: transform 0.3s ease;
    border-radius: 4px;
    width: 24px;
    height: 24px;

    &:hover {
        transform: scale(1.1);
    }
}

/* WhatsApp 图标独立样式 */
.whatsapp-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.whatsapp-icon {
    transition: transform 0.3s ease, filter 0.3s ease;
    border-radius: 4px;

    &:hover {
        transform: scale(1.15);
        filter: brightness(1.2);
    }
}

/* Telegram 图标独立样式 */
.telegram-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.telegram-icon {
    transition: transform 0.3s ease, filter 0.3s ease;
    border-radius: 4px;

    &:hover {
        transform: scale(1.15) rotate(5deg);
        filter: drop-shadow(0 2px 4px rgba(0, 123, 255, 0.3));
    }
}

.telegram-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 10px;
    z-index: 1000;
    opacity: 1;
}

/* WeChat 图标独立样式 */
.wechat-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.wechat-icon {
    transition: transform 0.3s ease, filter 0.3s ease;
    border-radius: 4px;

    &:hover {
        transform: scale(1.15);
        filter: drop-shadow(0 2px 4px rgba(7, 193, 96, 0.3));
    }
}

.wechat-tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 10px;
    z-index: 1000;
    opacity: 1;
}

.wechat-qr-code {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

/* TikTok 图标独立样式 */
.tiktok-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.tiktok-icon {
    transition: transform 0.3s ease, filter 0.3s ease;
    border-radius: 4px;

    &:hover,
    &.tiktok-icon-hovered {
        transform: scale(1.15) rotate(-3deg);
        filter: drop-shadow(0 2px 4px rgba(255, 0, 80, 0.3)) hue-rotate(10deg);
    }
}

.tiktok-container:active .tiktok-icon {
    transform: scale(1.05) rotate(-3deg);
}

/* YouTube 图标独立样式 */
.youtube-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.youtube-icon {
    transition: transform 0.3s ease, filter 0.3s ease;
    border-radius: 4px;

    &:hover,
    &.youtube-icon-hovered {
        transform: scale(1.15);
        filter: drop-shadow(0 2px 4px rgba(255, 0, 0, 0.3)) brightness(1.1);
    }
}

.youtube-container:active .youtube-icon {
    transform: scale(1.05);
}

/* 悬浮弹层样式 */
.social-tooltip {
    position: absolute;
    bottom: 133%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 10px;
    z-index: 1000;
    opacity: 1;
    //阴影
}

.tooltip-content {
    background: white;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    width: 150px;
    max-width: 320px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
}

.telegram-tooltip-content {
    width: 220px;
    height: 100px;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 24px;
    line-height: 36px;
}

.wechat-tooltip-content {
    width: 320px;
    height: 400px;
    padding: 20px;
}

.wechat-tooltip-content-title {
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    font-size: 22px;
    line-height: 32px;
    color: #2e4057;
    margin-bottom: 10px;
}

.wechat-tooltip-content-image {
    width: 280px;
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 弹层箭头 */
.tooltip-arrow {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid white;

    &::before {
        content: "";
        position: absolute;
        top: -12px;
        left: -12px;
        width: 0;
        height: 0;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-top: 12px solid #fff;
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

// 详情页面缩放比例
@detail-screen-ratio: 0.7;

/* 当从 detail 页面调用时的媒体查询 */
.about-section.need-large-screen-adaptation {
    @media (min-width: 1681px) {
        padding: 0 100px;
        .container {
            padding: floor(50px * @detail-screen-ratio)
                floor(200px * @detail-screen-ratio); // 原 75px 200px
        }

        .footer-title {
            font-size: floor(22px * @detail-screen-ratio); // 原 21px
        }

        .footer-link {
            font-size: floor(20px * @detail-screen-ratio); // 原 18px
        }

        .social-icons {
            gap: floor(26px * @detail-screen-ratio); // 原 22.5px
        }

        .social-icon {
            width: floor(26px * @detail-screen-ratio); // 原 24px
            height: floor(26px * @detail-screen-ratio); // 原 24px
        }

        .stats {
            gap: floor(40px * @detail-screen-ratio)
                floor(80px * @detail-screen-ratio); // 原 40px 80px
            width: floor(296px * @detail-screen-ratio); // 原 296px
        }

        .stat-circle {
            width: floor(96px * @detail-screen-ratio); // 原 96px
            height: floor(96px * @detail-screen-ratio); // 原 96px
        }

        .stat-number {
            font-size: floor(24px * @detail-screen-ratio); // 原 24px
        }

        .stat-label {
            font-size: floor(16px * @detail-screen-ratio); // 原 16px
        }

        .contact {
            gap: floor(160px * @detail-screen-ratio); // 原 160px
        }

        .contact-title {
            font-size: floor(22px * @detail-screen-ratio); // 原 22px
            margin: 0 0 floor(40px * @detail-screen-ratio) 0; // 原 40px
        }

        .contact-info {
            font-size: floor(22px * @detail-screen-ratio); // 原 22px
        }

        .social-tooltip {
            margin-bottom: floor(10px * @detail-screen-ratio); // 原 10px
        }

        .tooltip-content {
            padding: floor(10px * @detail-screen-ratio); // 原 10px
            width: floor(150px * @detail-screen-ratio); // 原 150px
            max-width: floor(320px * @detail-screen-ratio); // 原 320px
        }

        .telegram-tooltip-content {
            width: floor(220px * @detail-screen-ratio); // 原 220px
            height: floor(100px * @detail-screen-ratio); // 原 100px
            padding: floor(30px * @detail-screen-ratio)
                floor(20px * @detail-screen-ratio); // 原 30px 20px
            font-size: floor(24px * @detail-screen-ratio); // 原 24px
            line-height: floor(36px * @detail-screen-ratio); // 原 36px
        }

        .wechat-tooltip-content {
            width: floor(320px * @detail-screen-ratio); // 原 320px
            height: floor(400px * @detail-screen-ratio); // 原 400px
            padding: floor(20px * @detail-screen-ratio); // 原 20px
        }

        .wechat-tooltip-content-title {
            height: floor(80px * @detail-screen-ratio); // 原 80px
            font-size: floor(22px * @detail-screen-ratio); // 原 22px
            line-height: floor(32px * @detail-screen-ratio); // 原 32px
            margin-bottom: floor(10px * @detail-screen-ratio); // 原 10px
        }

        .wechat-tooltip-content-image {
            width: floor(280px * @detail-screen-ratio); // 原 280px
            height: floor(280px * @detail-screen-ratio); // 原 280px
        }

        .tooltip-arrow {
            border-left: floor(12px * @detail-screen-ratio) solid transparent; // 原 12px
            border-right: floor(12px * @detail-screen-ratio) solid transparent; // 原 12px
            border-top: floor(12px * @detail-screen-ratio) solid white; // 原 12px

            &::before {
                top: floor(-12px * @detail-screen-ratio); // 原 -12px
                left: floor(-12px * @detail-screen-ratio); // 原 -12px
                border-left: floor(12px * @detail-screen-ratio) solid
                    transparent; // 原 12px
                border-right: floor(12px * @detail-screen-ratio) solid
                    transparent; // 原 12px
                border-top: floor(12px * @detail-screen-ratio) solid #fff; // 原 12px
            }
        }

        .scroll-to-top-button {
            width: floor(60px * @detail-screen-ratio); // 原 60px
            height: floor(60px * @detail-screen-ratio); // 原 60px
        }
    }
}
</style>
