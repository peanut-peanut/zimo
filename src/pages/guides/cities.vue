<template>
    <div class="cities-container">
        <Header isFrom="Cities" />
        
        <div class="content-container">
            <div class="iframe-wrapper">
                <iframe 
                    src="https://r1smdjomca8.feishu.cn/docx/PCDQdHOXHooUkdxdTy8cNUodngQ"
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
import Header from "../home/components/Header/index.vue";
export default {
    name: "Cities",
    components: {
        Header,
    },
    setup() {
        return {};
    },
};
</script>

<style lang="less" scoped>
.cities-container {
    width: 100%;
    //min-height: 100vh;
    overflow: hidden;
    background: #f8f9fa;
}




.content-container {
    margin-top: -30px; // 遮挡顶部导航栏
    padding: 20px;
    height: calc(100vh + 30px); // 加上遮挡顶部导航栏的高度
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
