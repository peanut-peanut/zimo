<template>
    <div class="our-stories-container">
        <Header isFrom="OurStories" />

        <div class="content-container">
            <div class="iframe-wrapper">
                <iframe
                    src="https://ajp357puub52.jp.larksuite.com/wiki/FYcLwOLcPihw4pkMX8OjEfbUpbc"
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

const DOC_URL = "https://ajp357puub52.jp.larksuite.com/wiki/FYcLwOLcPihw4pkMX8OjEfbUpbc";

export default {
    name: "OurStories",
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
            // 每隔1秒检查iframe是否真正加载完成
            this.checkIntervalId = setInterval(() => {
                const iframe = this.$refs.docIframe;
                if (iframe) {
                    try {
                        // 尝试访问iframe的内容，如果成功说明已加载
                        if (iframe.contentDocument || iframe.contentWindow) {
                            this.loadTriggered = true;
                            clearInterval(this.checkIntervalId);
                        }
                    } catch (e) {
                        // 跨域访问被阻止，这是正常的
                        // 我们继续等待load事件
                    }
                }
            }, 1000);
        },
    },
};
</script>

<style lang="less" scoped>
.our-stories-container {
    min-height: 100vh;
    background-color: #ffffff;
}

.content-container {
    width: 100%;
    height: calc(100vh - 150px); // 减去header高度
    padding: 0;
    margin: 0;
    position: relative;
}

.iframe-wrapper {
    width: 100%;
    height: 100%;
    border: none;
    overflow: hidden;
}

.feishu-iframe {
    width: 100%;
    height: 100%;
    border: none;
    background: #ffffff;
    display: block;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .content-container {
        height: calc(100vh - 120px);
    }
}

@media (max-width: 480px) {
    .content-container {
        height: calc(100vh - 100px);
    }
}
</style>