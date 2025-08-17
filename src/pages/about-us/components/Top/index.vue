<template>
    <div class="top-container">
        <img
            src="/assets/image/AboutUs/Top/AboutUsBackground.png"
            alt="About Us"
            class="top-background"
        />
        <div class="top-background-overlay"></div>
        <div class="top-content-container">
            <img
                src="/assets/image/AboutUs/Top/ZimoTitle.png"
                alt="ZIMO"
                class="top-zimo-title"
            />
            <div class="top-content-description">
                Unlock your life answer in china
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Top",
};
</script>

<style lang="less" scoped>
.top-container {
    margin-top: 80px;
    width: 100%;
    height: 520px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //  z-index: 99;
    @media (min-width: 1681px) {
        margin-top: 64px;
    }
}
.top-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 1;
}
.top-background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 63, 102, 0.5);
    z-index: 2;
}
.top-content-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 665px;
    height: 100%;
    z-index: 99;
    gap: 36px;
}

.top-zimo-title {
    width: 152px;
    height: 48px;
    object-fit: cover;
    object-position: center;
    z-index: 1;
}
.top-content-description {
    font-family: Arial Hebrew;
    font-size: 36px;
    //font-weight: bold;
    line-height: normal;
    text-align: center;
    letter-spacing: normal;
    color: #ffffff;
}
</style>
