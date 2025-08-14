<template>
    <div class="beijing-container">
        <Header isFrom="Beijing" />

        <div class="content-container">
            <div class="iframe-wrapper">
                <iframe
                    src="https://ajp357puub52.jp.larksuite.com/docx/BjphdZlONoA5gDxnOCnjizt7pwe"
                    class="feishu-iframe"
                    frameborder="0"
                    allowfullscreen
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
                    loading="eager"
                    ref="docIframe"
                    @load="onIframeLoad"
                />
            </div>
        </div>
    </div>
    <AboutUs :need-large-screen-adaptation="true" />
    <Footer :need-large-screen-adaptation="true" />
</template>

<script>
import Header from "../home/components/Header/index.vue";
import AboutUs from "../home/components/AboutUs/index.vue";
import Footer from "../home/components/Footer/index.vue";
import { isMobileDevice } from "@/utils/common.js";

const DOC_URL = "https://ajp357puub52.jp.larksuite.com/docx/BjphdZlONoA5gDxnOCnjizt7pwe";

export default {
    name: "Beijing",
    components: {
        Header,
        AboutUs,
        Footer,
    },
    data() {
        return {
            iframeLoaded: false,
            timeoutId: null,
            loadTriggered: false,
            checkIntervalId: null,
        };
    },
    mounted() {
        // 移动端检测：如果是移动端，直接跳转到文档
        if (isMobileDevice()) {
            console.log("检测到移动端设备，直接跳转到文档");
            window.location.href = DOC_URL;
            return;
        }

        // 预加载文档
        this.preloadDocument();

        // 设置超时处理：5秒后如果还没加载完成，则显示备用方案
        this.timeoutId = setTimeout(() => {
            if (!this.loadTriggered) {
                console.log("文档加载超时，跳转到原始链接");
                window.location.href = DOC_URL;
            }
        }, 5000);

        // 设置定期检查机制
        this.setupLoadChecker();
    },
    beforeUnmount() {
        // 清理定时器
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        if (this.checkIntervalId) {
            clearInterval(this.checkIntervalId);
        }
    },
    methods: {
        preloadDocument() {
            // 预加载逻辑 - 创建隐藏的iframe进行预加载
            const preloadIframe = document.createElement("iframe");
            preloadIframe.style.display = "none";
            preloadIframe.src = DOC_URL;
            document.body.appendChild(preloadIframe);

            preloadIframe.onload = () => {
                console.log("文档预加载完成");
                document.body.removeChild(preloadIframe);
            };

            preloadIframe.onerror = () => {
                console.log("文档预加载失败");
                document.body.removeChild(preloadIframe);
            };
        },

        onIframeLoad() {
            console.log("主要iframe加载完成");
            this.iframeLoaded = true;
            this.loadTriggered = true;
            
            // 清除超时定时器
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }
        },

        setupLoadChecker() {
            // 每500ms检查一次iframe状态
            this.checkIntervalId = setInterval(() => {
                if (this.$refs.docIframe) {
                    try {
                        const iframeDoc = this.$refs.docIframe.contentDocument;
                        if (iframeDoc && iframeDoc.readyState === "complete") {
                            console.log("通过定期检查确认文档已加载");
                            this.loadTriggered = true;
                            clearInterval(this.checkIntervalId);
                        }
                    } catch (e) {
                        // 由于跨域限制，这里可能会有异常，属于正常情况
                        console.log("跨域访问限制（正常现象）");
                    }
                }
            }, 500);
        },
    },
};
</script>

<style lang="less" scoped>
.beijing-container {
    width: 100%;
    overflow: hidden;
    background: #f8f9fa;
}

.content-container {
    margin-top: -30px; /* 遮挡顶部导航栏 */
    padding: 20px;
    height: calc(100vh + 30px); /* 加上遮挡顶部导航栏的高度 */
    position: relative;
}

.iframe-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: white;
    position: relative;
}

.feishu-iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .logo {
        left: 20px;
        width: 150px;
        height: 41px;
    }

    .content-container {
        padding: 10px;
    }
}
</style>