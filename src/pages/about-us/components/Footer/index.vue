<template>
    <div class="footer-container">
        <img
            src="/assets/image/AboutUs/Footer/Background.png"
            alt="Footer"
            class="footer-image"
        />
        <div class="background-overlay"></div>

        <div class="footer-content">
            <div class="footer-content-left">
                <div class="footer-content-left-title">Social Media</div>
                <div class="footer-content-left-description">
                    Follow us to stay updated
                </div>
            </div>
            <div class="footer-content-right">
                <!-- WhatsApp 图标 -->
                <div
                    class="social-icon-container whatsapp-container"
                    @mouseenter="handleWhatsAppMouseEnter"
                    @mouseleave="handleWhatsAppMouseLeave"
                >
                    <img
                        src="/assets/image/AboutUs/Footer/WhatsApp.png"
                        alt="WhatsApp"
                        class="social-media-image whatsapp-icon"
                    />
                    <div
                        v-if="isWhatsAppHovered"
                        class="social-tooltip wechat-tooltip"
                    >
                        <div class="tooltip-content wechat-tooltip-content">
                            <div class="wechat-tooltip-content-title">
                                <div>WhatsApp/Phone:</div>
                                <div>+853 65702421</div>
                            </div>
                            <div class="wechat-tooltip-content-image">
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
                        src="/assets/image/AboutUs/Footer/Telegram.png"
                        alt="Telegram"
                        class="social-media-image telegram-icon"
                    />
                    <div
                        v-if="isTelegramHovered"
                        class="social-tooltip telegram-tooltip"
                    >
                        <div class="tooltip-content telegram-tooltip-content">
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
                        src="/assets/image/AboutUs/Footer/WeChat.png"
                        alt="WeChat"
                        class="social-media-image wechat-icon"
                    />
                    <div
                        v-if="isWechatHovered"
                        class="social-tooltip wechat-tooltip"
                    >
                        <div class="tooltip-content wechat-tooltip-content">
                            <div class="wechat-tooltip-content-title">
                                <div>WeChat:</div>
                                <div>Mia_Miaoao</div>
                            </div>
                            <div class="wechat-tooltip-content-image">
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
                        src="/assets/image/AboutUs/Footer/TikTok.png"
                        alt="TikTok"
                        :class="[
                            'social-media-image',
                            'tiktok-icon',
                            {
                                'tiktok-icon-hovered': isTikTokHovered,
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
                        src="/assets/image/AboutUs/Footer/Youtube.png"
                        alt="YouTube"
                        :class="[
                            'social-media-image',
                            'youtube-icon',
                            {
                                'youtube-icon-hovered': isYouTubeHovered,
                            },
                        ]"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            // 每个社交媒体图标的独立悬停状态
            isWhatsAppHovered: false,
            isTelegramHovered: false,
            isWechatHovered: false,
            isTikTokHovered: false,
            isYouTubeHovered: false,
        };
    },
    methods: {
        // WhatsApp 独立逻辑
        handleWhatsAppMouseEnter() {
            this.isWhatsAppHovered = true;
        },
        handleWhatsAppMouseLeave() {
            this.isWhatsAppHovered = false;
        },

        // Telegram 独立逻辑
        handleTelegramMouseEnter() {
            this.isTelegramHovered = true;
        },
        handleTelegramMouseLeave() {
            this.isTelegramHovered = false;
        },

        // WeChat 独立逻辑
        handleWechatMouseEnter() {
            this.isWechatHovered = true;
        },
        handleWechatMouseLeave() {
            this.isWechatHovered = false;
        },

        // TikTok 独立逻辑
        handleTikTokMouseEnter() {
            this.isTikTokHovered = true;
        },
        handleTikTokMouseLeave() {
            this.isTikTokHovered = false;
        },
        handleTikTokClick() {
            window.open("https://www.tiktok.com/@zimostudyinchina", "_blank");
        },

        // YouTube 独立逻辑
        handleYouTubeMouseEnter() {
            this.isYouTubeHovered = true;
        },
        handleYouTubeMouseLeave() {
            this.isYouTubeHovered = false;
        },
        handleYouTubeClick() {
            window.open("https://www.youtube.com/@zimo.studyinchina", "_blank");
        },
    },
};
</script>

<style lang="less" scoped>
.footer-container {
    width: 100%;
    height: 251px;
    position: relative;
}
.footer-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 1;
}
.background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(46, 64, 87, 0.87);
    z-index: 2;
}
.footer-content {
    padding: 0 260px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    position: relative;
    z-index: 99;
}
.footer-content-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    width: 300px;
}
.footer-content-left-title {
    height: 50px;
    font-family: "AlibabaPuHuiTiBold";
    font-size: 36px;
    // font-weight: 900;
    line-height: normal;
    letter-spacing: normal;
    color: #ffffff;
    text-align: left;
    width: 100%;
    margin-bottom: 10px;
}
.footer-content-left-description {
    font-family: "AlibabaPuHuiTiMedium";
    font-size: 22px;
    // font-weight: 500;
    line-height: normal;
    letter-spacing: normal;
    color: #ffffff;
}

.footer-content-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 30px;
}
.social-media-image {
    width: 56.5px;
    height: 56.67px;
}

/* 社交媒体图标容器 */
.social-icon-container {
    position: relative;
    display: inline-block;
    cursor: pointer;
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
        filter: drop-shadow(0 2px 4px rgba(37, 211, 102, 0.3));
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
        transform: scale(1.15);
        filter: drop-shadow(0 2px 4px rgba(0, 136, 204, 0.3));
    }
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
    color: #2e4057;
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

.wechat-qr-code {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
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
</style>
