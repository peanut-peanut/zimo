<template>
    <div class="universities-container">
        <div class="header-container">
            <img src="/assets/image/Logo2.png" alt="logo" class="logo" />
        </div>
        
        <div class="content-container">
            <div class="page-title">
                <h1>Universities</h1>
            </div>
            
            <div class="content">
                <!-- 这里是Universities的内容区域 -->
                <p>Welcome to Universities guide page. Content will be added here.</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Universities",
    setup() {
        return {};
    },
};
</script>

<style lang="less" scoped>
.universities-container {
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
    padding-top: 120px;
    padding-left: 160px;
    padding-right: 160px;
    max-width: 1200px;
    margin: 0 auto;
}

.page-title {
    margin-bottom: 40px;
    
    h1 {
        font-size: 36px;
        color: #2e4057;
        font-weight: bold;
        margin: 0;
    }
}

.content {
    background: white;
    border-radius: 8px;
    padding: 40px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    
    p {
        font-size: 18px;
        color: #666;
        line-height: 1.6;
        margin: 0;
    }
}
</style>
