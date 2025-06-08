<template>
    <footer class="footer">
        <div class="container">
            <!-- 左侧版权信息 -->
            <div class="copyright">
                <span>©2022-2023 Zimo</span>
            </div>

            <!-- 中间联系人信息 -->
            <div
                class="contact-person"
                @mouseenter="handleContactMouseEnter"
                @mouseleave="handleContactMouseLeave"
            >
                <div class="help-text">We are here to help :</div>
                <div class="person-info">
                    <div class="avatar">M</div>
                    <div class="person-name">Mia</div>
                </div>

                <!-- 联系方式弹窗 -->
                <div v-if="showContactPopup" class="contact-popup">
                    <div class="popup-content">
                        <div class="contact-details">
                            <div class="popup-header">
                                <img
                                    src="/assets/image/Home/AboutUs/Avatar.jpg"
                                    alt="Mia"
                                    class="avatar-image"
                                />
                                <div class="popup-name">Mia</div>
                            </div>
                            <div class="contact-list">
                                <div class="contact-item">
                                    <span class="contact-label">WeChat: </span>
                                    <span class="contact-value"
                                        >Mia_Miaoao</span
                                    >
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label"
                                        >WhatsApp/Phone:
                                    </span>
                                    <span class="contact-value"
                                        >+853 65702421</span
                                    >
                                </div>
                                <div class="contact-item">
                                    <span class="contact-label"
                                        >Telegram:
                                    </span>
                                    <span class="contact-value"
                                        >+853 65702421</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="qr-code-section">
                            <div class="qr-code-container">
                                <img
                                    src="/assets/image/Home/AboutUs/WhatsApp.png"
                                    alt="Contact QR Code"
                                    width="100"
                                    height="100"
                                    class="qr-code-image"
                                />
                                <div class="qr-code-label">WhatsApp</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 右侧按钮 -->
            <div class="action-button">
                <button class="plan-button" @click="handlePlanClick">
                    <img
                        src="/assets/image/Home/MailIcon.png"
                        alt="Email"
                        width="16"
                        height="16"
                        class="email-icon"
                    />
                    Get Customized Application Plan
                </button>
            </div>
        </div>
    </footer>
</template>

<script>
import { ref } from "vue";

export default {
    name: "Footer",
    setup() {
        const showContactPopup = ref(false);

        const handleContactMouseEnter = () => {
            showContactPopup.value = true;
        };

        const handleContactMouseLeave = () => {
            showContactPopup.value = false;
        };

        const handlePlanClick = () => {
            // 这里可以添加发送邮件或跳转到联系页面的逻辑
            // window.location.href = "mailto:mia@zimo.group";
        };

        return {
            showContactPopup,
            handleContactMouseEnter,
            handleContactMouseLeave,
            handlePlanClick,
        };
    },
};
</script>

<style lang="less" scoped>
.footer {
    background: #3F5269;
    position: relative;
    height: 80px;
}

.container {
    height: 80px;
    margin: 0 auto;
    padding: 0 250px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

/* 左侧版权信息 */
.copyright {
    span {
        font-family: PingFang SC;
        font-size: 16.5px;
        font-weight: 500;
        line-height: normal;
        letter-spacing: normal;
        color: #ffffff;
    }
}

/* 中间联系人信息 */
.contact-person {
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: center;
    position: relative;
    cursor: pointer;
}

.help-text {
    font-family: PingFang SC;
    font-size: 16.5px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: normal;
    color: #ffffff;
}

.person-info {
    display: flex;
    align-items: center;
    gap: 8px;
}

.avatar {
    width: 32px;
    height: 32px;
    background-color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 600;
    color: #2e3a52;
}

.person-name {
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    line-height: normal;
    letter-spacing: normal;
}

/* 联系方式弹窗 */
.contact-popup {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 15px;
    z-index: 1000;
    animation: fadeInUp 0.3s ease;

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        right: 110px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid rgba(255, 255, 255, 0.95);
    }
}

.popup-content {
    backdrop-filter: blur(10px);
    border-radius: 12px;
    background: #ffffff;
    box-shadow: -5px 0px 10px 0px rgba(190, 190, 190, 0.25),
        5px 5px 10px 0px rgba(190, 190, 190, 0.25);
    padding: 22px;
    display: flex;
    width: 400px;
}

.contact-details {
    flex: 1;
}

.popup-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
}

.popup-avatar {
    width: 40px;
    height: 40px;
    background-color: #3f5269;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
}

.avatar-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.popup-name {
    font-size: 18px;
    font-weight: 600;
    color: #2e3a52;
    line-height: normal;
    letter-spacing: normal;
}

.contact-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.contact-item {
    display: flex;
    align-items: center;

    &::before {
        content: "•";
        color: #ff6b35;
        font-weight: bold;
        font-size: 16px;
    }
}

.contact-label {
    margin: 0 6px;
    font-size: 14px;
    color: #3a3e48;
    line-height: normal;
    letter-spacing: normal;
}

.contact-value {
    font-size: 14px;
    color: #3a3e48;
    line-height: normal;
    letter-spacing: normal;
}

.qr-code-section {
    display: flex;
    align-items: center;
    justify-content: center;
}

.qr-code-container {
    height: 100%;
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.qr-code-image {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qr-code-label {
    font-size: 16.5px;
    font-weight: 500;
    color: #3a3e48;
    text-align: center;
    margin-bottom: -2px;
}

/* 右侧按钮 */
.action-button {
    display: flex;
    justify-content: flex-end;
}

.plan-button {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 16.5px;
    font-weight: 500;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: underline;
    line-height: normal;
    letter-spacing: normal;
    background: none;
    border: none;

    &:hover {
        color: #f0f0f0;
        transform: translateY(-1px);
    }
}

.email-icon {
    flex-shrink: 0;
    line-height: normal;
    letter-spacing: normal;
}

/* 弹窗动画 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

/* 响应式设计 */
@media (max-width: 1024px) {
    .container {
        flex-direction: column;
        height: auto;
        gap: 20px;
        padding: 20px;
    }

    .copyright,
    .contact-person,
    .action-button {
        flex: none;
        justify-content: center;
    }

    .action-button {
        width: 100%;
    }

    .plan-button {
        width: 100%;
        justify-content: center;
    }

    .contact-popup {
        position: fixed;
        bottom: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;

        &::after {
            display: none;
        }
    }
}

@media (max-width: 768px) {
    .footer {
        height: auto;
        padding: 16px 0;
    }

    .container {
        padding: 16px;
        gap: 16px;
        height: auto;
    }

    .copyright span,
    .help-text,
    .person-name {
        font-size: 14px;
    }

    .plan-button {
        font-size: 13px;
        padding: 10px 16px;
    }

    .avatar {
        width: 28px;
        height: 28px;
        font-size: 14px;
    }

    .popup-content {
        flex-direction: column;
        min-width: 400px;
        padding: 16px;
    }

    .qr-code-section {
        align-self: center;
    }
}
</style>
