<template>
    <div class="cities-container">
        <Header isFrom="Cities" />
        
        <div class="content-container">
            <div class="iframe-wrapper">
                <div v-if="!iframeLoaded" class="loading-container">
                    <div class="loading-spinner"></div>
                    <p class="loading-text">Loading...</p>
                </div>
                <iframe 
                    src="https://kfk0ae7phot.sg.larksuite.com/docx/W2SWd1mlgotFZvxEQFSloiY7gFb"
                    class="feishu-iframe"
                    frameborder="0"
                    allowfullscreen
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
                    importance="high"
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

const DOC_URL = "https://kfk0ae7phot.sg.larksuite.com/docx/W2SWd1mlgotFZvxEQFSloiY7gFb";

export default {
    name: "Cities",
    components: {
        Header,
    },
    data() {
        return {
            iframeLoaded: false,
            timeoutId: null
        };
    },
    mounted() {
        // 预加载文档
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = DOC_URL;
        link.as = 'document';
        document.head.appendChild(link);
        
        // 设置超时检测 iframe 是否成功加载
        this.timeoutId = setTimeout(() => {
            if (!this.iframeLoaded) {
                console.log("iframe加载超时，直接跳转");
                window.location.href = DOC_URL;
            }
        }, 6000);
    },
    methods: {
        onIframeLoad() {
            console.log("iframe加载成功");
            this.iframeLoaded = true;
            // 清除超时计时器
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
        },
    },
    beforeUnmount() {
        // 组件销毁前清除计时器
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
};
</script>

<style lang="less" scoped>
.cities-container {
    width: 100%;
    overflow: hidden;
    background: #f8f9fa;
}

.content-container {
    margin-top: -30px; // 遮挡顶部导航栏
    padding: 20px;
    height: calc(100vh + 30px); // 加上遮挡顶部导航栏的高度
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

.loading-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    z-index: 10;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #ff6b35;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
}

.loading-text {
    font-size: 18px;
    color: #333;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

// 响应式设计
@media (max-width: 768px) {
    .logo {
        left: 20px;
        width: 150px;
        height: 41px;
    }

    .content-container {
        padding: 10px;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border-width: 4px;
    }
    
    .loading-text {
        font-size: 16px;
    }
}
</style>
