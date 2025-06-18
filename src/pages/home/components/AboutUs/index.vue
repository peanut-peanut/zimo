<template>
    <section id="about" ref="sectionRef" class="about-section">
        <div class="container">
            <!-- 标题部分 -->
            <!-- <SectionTitle title="About Us" /> -->

            <!-- Footer 部分 -->
            <div class="footer">
                <div class="footer-columns">
                    <div class="footer-column">
                        <div class="footer-title">About us</div>
                        <a href="#" class="footer-link">our services</a>
                        <a href="#" class="footer-link">our stories</a>
                    </div>

                    <div class="footer-column">
                        <div class="footer-title">For students</div>
                        <a href="#" class="footer-link">Support</a>
                        <a href="#" class="footer-link">Admission</a>
                    </div>

                    <div class="footer-column">
                        <div class="footer-title">For universities</div>
                        <a href="#" class="footer-link">Advertise with us</a>
                    </div>

                    <div class="footer-column">
                        <div class="footer-title">Follow us</div>
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
                                            <div>WhatsApp/Phone:</div>
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
                                        <div>Telegram：</div>
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
                                            <div>WeChat:</div>
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

export default {
    name: "AboutUs",
    components: {
        SectionTitle,
    },
    setup() {
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
        };
    },
};
</script>

<style lang="less" scoped>
.about-section {
    background-color: #f6f6f6;
    position: relative;
    padding: 75px 200px;
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

.feature-content {
    /* margin-bottom: 15px; */
}

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
</style>
