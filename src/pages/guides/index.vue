<template>
    <div class="guides-container">
        <div class="header-container">
            <img src="/assets/image/Logo2.png" alt="logo" class="logo" />
        </div>
        
        
    </div>
</template>

<script>
export default {
    name: "Guides",
    setup() {
        return {};
    },
};
</script>

<style lang="less" scoped>
.guides-container {
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

</style> 