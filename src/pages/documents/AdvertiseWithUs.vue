<template>
    <div class="advertise-with-us-container">
        <Header isFrom="AdvertiseWithUs" />

        <div class="content-container">
            <div class="iframe-wrapper">
                <iframe
                    src="https://ajp357puub52.jp.larksuite.com/wiki/JQHewnI4ai9jBBkhPsDjlAy6pkc"
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

const DOC_URL = "https://ajp357puub52.jp.larksuite.com/wiki/JQHewnI4ai9jBBkhPsDjlAy6pkc";

export default {
    name: "AdvertiseWithUs",
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
        if (isMobileDevice()) {
            console.log("检测到移动端设备，直接跳转到文档");
            window.location.href = DOC_URL;
            return;
        }

        this.preloadDocument();

        this.timeoutId = setTimeout(() => {
            if (!this.loadTriggered) {
                console.log("文档加载超时，跳转到原始链接");
                window.location.href = DOC_URL;
            }
        }, 5000);

        this.setupLoadChecker();
    },
    beforeUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        if (this.checkIntervalId) {
            clearInterval(this.checkIntervalId);
        }
    },
    methods: {
        preloadDocument() {
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

            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }
        },

        setupLoadChecker() {
            this.checkIntervalId = setInterval(() => {
                const iframe = this.$refs.docIframe;
                if (iframe) {
                    try {
                        if (iframe.contentDocument || iframe.contentWindow) {
                            this.loadTriggered = true;
                            clearInterval(this.checkIntervalId);
                        }
                    } catch (e) {
                        // 跨域访问被阻止，这是正常的
                    }
                }
            }, 1000);
        },
    },
};
</script>

<style lang="less" scoped>
.advertise-with-us-container {
    min-height: 100vh;
    background-color: #ffffff;
}

.content-container {
    width: 100%;
    height: calc(100vh - 150px);
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