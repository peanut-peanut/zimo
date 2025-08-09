<template>
    <div class="popup-content" :class="{ 'from-detail': isFromDetail }">
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
                    <span class="contact-value">Mia_Miaoao</span>
                </div>
                <div class="contact-item">
                    <span class="contact-label">WhatsApp/Phone: </span>
                    <span class="contact-value">+853 65702421</span>
                </div>
                <div class="contact-item">
                    <span class="contact-label">Telegram: </span>
                    <span class="contact-value">+853 65702421</span>
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
</template>

<script>
export default {
    name: "ScanQrcode",
    props: {
        isFromDetail: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="less" scoped>
.popup-content {
    backdrop-filter: blur(10px);
    border-radius: 12px;
    background: #ffffff;
    box-shadow: -5px 0px 10px 0px rgba(190, 190, 190, 0.25),
        5px 5px 10px 0px rgba(190, 190, 190, 0.25);
    padding: 22px;
    display: flex;
    width: 520px;
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

.avatar-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.popup-name {
    font-size: 24px;
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
        font-size: 24px;
    }
}

.contact-label {
    margin: 0 6px;
    font-size: 18px;
    color: #3a3e48;
    line-height: normal;
    letter-spacing: normal;
}

.contact-value {
    font-size: 18px;
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
    justify-content: space-around;
}

.qr-code-image {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qr-code-label {
    font-size: 22px;
    font-weight: 500;
    color: #3a3e48;
    text-align: center;
    margin-bottom: -2px;
}

// 详情页面缩放比例
@detail-screen-ratio: 0.6;

/* 当从 detail 页面调用时的媒体查询 */
.popup-content.from-detail {
    @media (min-width: 1681px) {
        padding: floor(22px * @detail-screen-ratio); // 原 22px
        width: floor(520px * @detail-screen-ratio); // 原 520px

        .popup-header {
            gap: floor(10px * @detail-screen-ratio); // 原 10px
            margin-bottom: floor(15px * @detail-screen-ratio); // 原 15px
        }

        .avatar-image {
            width: floor(60px * @detail-screen-ratio); // 原 60px
            height: floor(60px * @detail-screen-ratio); // 原 60px
        }

        .popup-name {
            font-size: floor(24px * @detail-screen-ratio); // 原 24px
        }

        .contact-list {
            gap: floor(8px * @detail-screen-ratio); // 原 8px
        }

        .contact-item {
            &::before {
                font-size: floor(24px * @detail-screen-ratio); // 原 24px
            }
        }

        .contact-label {
            margin: 0 floor(6px * @detail-screen-ratio); // 原 0 6px
            font-size: floor(18px * @detail-screen-ratio); // 原 18px
        }

        .contact-value {
            font-size: floor(18px * @detail-screen-ratio); // 原 18px
        }

        .qr-code-container {
            padding-top: floor(10px * @detail-screen-ratio); // 原 10px
        }

        .qr-code-image {
            width: floor(100px * @detail-screen-ratio); // 原 100px
            height: floor(100px * @detail-screen-ratio); // 原 100px
        }

        .qr-code-label {
            font-size: floor(22px * @detail-screen-ratio); // 原 22px
            margin-bottom: floor(-2px * @detail-screen-ratio); // 原 -2px
        }
    }
}
</style>
