<template>
    <div class="universities-container">
        <Header isFrom="Universities" />

        <div class="content-container">
            <div class="iframe-wrapper">
                <iframe
                    src="https://kfk0ae7phot.sg.larksuite.com/docx/BRT4dRFenoXmKzxfrsklAY9XgAd"
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
</template>

<script>
import Header from "../home/components/Header/index.vue";

const DOC_URL =
    "https://kfk0ae7phot.sg.larksuite.com/docx/BRT4dRFenoXmKzxfrsklAY9XgAd";

export default {
    name: "Universities",
    components: {
        Header,
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
        // 预加载文档
        const link = document.createElement("link");
        link.rel = "preload";
        link.href = DOC_URL;
        link.as = "document";
        document.head.appendChild(link);

        // 开始倒计时
        this.startCountdown();
        
        // 开始定时检查iframe内容
        this.startContentCheck();
    },
    methods: {
        startCountdown() {
            this.timeoutId = setTimeout(() => {
                if (!this.loadTriggered) {
                    console.log("6.5秒内未触发load事件，执行跳转");
                    window.location.href = DOC_URL;
                }
            }, 6500);
        },
        
        startContentCheck() {
            // 每100毫秒检查一次iframe内容
            this.checkIntervalId = setInterval(() => {
                if (!this.loadTriggered) {
                    this.checkIframeContent();
                }
            }, 100);
        },
        
        checkIframeContent() {
            try {
                const iframe = this.$refs.docIframe;
                if (iframe && iframe.contentDocument) {
                    const doc = iframe.contentDocument;
                    
                    // 检查多个可能的元素来判断页面是否加载完成
                    const indicators = [
                        '.editor-container',
                        '.navigation-bar-wrapper', 
                        '.doc-content',
                        '.feishu-doc',
                        '[data-testid="doc-content"]',
                        'body > div:not([style*="display: none"])'
                    ];
                    
                    for (const selector of indicators) {
                        const element = doc.querySelector(selector);
                        if (element) {
                            console.log(`检测到页面元素: ${selector}，页面加载完成`);
                            this.markAsLoaded();
                            return;
                        }
                    }
                    
                    // 检查body内容是否有实际内容
                    const body = doc.body;
                    if (body && body.children.length > 0) {
                        // 检查是否有可见的内容
                        const hasVisibleContent = Array.from(body.children).some(child => {
                            const style = window.getComputedStyle(child);
                            return style.display !== 'none' && style.visibility !== 'hidden';
                        });
                        
                        if (hasVisibleContent) {
                            console.log("检测到页面有可见内容，页面加载完成");
                            this.markAsLoaded();
                            return;
                        }
                    }
                } else {
                    // 如果无法访问iframe内容，检查iframe本身的状态
                    const iframe = this.$refs.docIframe;
                    if (iframe && iframe.contentWindow) {
                        console.log("iframe内容无法访问但iframe存在，可能是跨域限制");
                        // 延迟一点再标记为加载完成，给iframe更多时间
                        setTimeout(() => {
                            if (!this.loadTriggered) {
                                console.log("iframe存在但内容无法访问，标记为加载完成");
                                this.markAsLoaded();
                            }
                        }, 2000);
                    }
                }
            } catch (e) {
                console.log("检查iframe内容出错:", e);
            }
        },
        
        markAsLoaded() {
            if (!this.loadTriggered) {
                console.log("页面加载完成，取消倒计时");
                this.loadTriggered = true;
                this.iframeLoaded = true;
                
                // 清除倒计时
                if (this.timeoutId) {
                    clearTimeout(this.timeoutId);
                    this.timeoutId = null;
                }
                
                // 清除定时检查
                if (this.checkIntervalId) {
                    clearInterval(this.checkIntervalId);
                    this.checkIntervalId = null;
                }
            }
        },
        
        onIframeLoad() {
            console.log("iframe load事件触发");
            this.markAsLoaded();
        },
    },
    beforeUnmount() {
        // 组件销毁前清除计时器
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        if (this.checkIntervalId) {
            clearInterval(this.checkIntervalId);
        }
    },
};
</script>

<style lang="less" scoped>
.universities-container {
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
