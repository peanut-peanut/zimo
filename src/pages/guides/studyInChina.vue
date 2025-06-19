<template>
    <div class="study-in-china-container">
        <div class="header-container">
            <img src="/assets/image/Logo2.png" alt="logo" class="logo" />
        </div>
        
        <div class="content-container">
            <div class="iframe-wrapper">
                <iframe 
                    src="https://r1smdjomca8.feishu.cn/docx/TuGPd7GU1oCE2Ixx2PPcglQRn1g"
                    class="feishu-iframe"
                    frameborder="0"
                    allowfullscreen
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    loading="lazy"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "StudyInChina",
    setup() {
        return {};
    },
};
</script>

<style lang="less" scoped>
.study-in-china-container {
    width: 100%;
    min-height: 100vh;
    background: #f8f9fa;
}

.header-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    height: 80px;
    background: #ff6b35;
    display: flex;
    align-items: center;
}

.logo {
    position: absolute;
    left: 160px;
    width: 216px;
    height: 59px;
    cursor: pointer;
}

.content-container {
    margin-top: 80px; // 为固定头部留出空间
    padding: 20px;
    height: calc(100vh - 80px); // 减去头部高度
}

.iframe-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: white;
}

.feishu-iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
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
}
</style>
