<template>
    <footer class="footer" :class="{ 'need-large-screen-adaptation': needLargeScreenAdaptation }">
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
                    <ScanQrcode :need-large-screen-adaptation="needLargeScreenAdaptation" />
                </div>
            </div>

            <!-- 右侧按钮 -->
            <div class="action-button">
                <button class="plan-button" @click="handlePlanClick">
                    <img
                        src="/assets/image/Home/MailIcon.png"
                        alt="Email"
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
import ScanQrcode from "@/components/ScanQrcode/index.vue";
import { ROUTES } from "../../../../router/routes";

export default {
    name: "Footer",
    components: {
        ScanQrcode
    },
    props: {
        needLargeScreenAdaptation: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
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
            window.open(ROUTES.APPLYNOW, '_blank');
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
    background: #3f5269;
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
        font-size: 18px;
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
    font-size: 18px;
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
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 10px;

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        right: 175px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid rgba(255, 255, 255, 0.95);
    }
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
    font-size: 18px;
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
    width: 24px;
    height: 24px;
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

// 详情页面缩放比例
@detail-screen-ratio: 0.7;

/* 当从 detail 页面调用时的媒体查询 */
.footer.need-large-screen-adaptation {
    @media (min-width: 1681px) {
        height: floor(80px * @detail-screen-ratio); // 原 80px

        .container {
            height: floor(80px * @detail-screen-ratio); // 原 80px
            padding: 0 floor(250px * @detail-screen-ratio); // 原 0 250px
        }

        .copyright span {
            font-size: floor(18px * @detail-screen-ratio); // 原 18px
        }

        .contact-person {
            gap: floor(12px * @detail-screen-ratio); // 原 12px
        }

        .help-text {
            font-size: floor(18px * @detail-screen-ratio); // 原 18px
        }

        .person-info {
            gap: floor(8px * @detail-screen-ratio); // 原 8px
        }

        .avatar {
            width: floor(32px * @detail-screen-ratio); // 原 32px
            height: floor(32px * @detail-screen-ratio); // 原 32px
            font-size: floor(16px * @detail-screen-ratio); // 原 16px
        }

        .person-name {
            font-size: floor(16px * @detail-screen-ratio); // 原 16px
        }

        .plan-button {
            gap: floor(6px * @detail-screen-ratio); // 原 6px
            font-size: floor(18px * @detail-screen-ratio); // 原 18px
        }

        .email-icon {
            width: floor(24px * @detail-screen-ratio); // 原 24px
            height: floor(24px * @detail-screen-ratio); // 原 24px
        }

        .contact-popup {
            margin-bottom: floor(15px * @detail-screen-ratio); // 原 15px

            &::after {
                right: 220px; // 原 175px
                border-left: floor(8px * @detail-screen-ratio) solid transparent; // 原 8px
                border-right: floor(8px * @detail-screen-ratio) solid transparent; // 原 8px
                border-top: floor(8px * @detail-screen-ratio) solid rgba(255, 255, 255, 0.95); // 原 8px
            }
        }
    }
}
</style>
