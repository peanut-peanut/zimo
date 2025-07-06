<template>
    <div class="partners-container">
        <SectionTitle title="Partners" marginBottom="0" />
        <div class="subtitle">
            We proudly collaborate with a network of universities, language
            schools, international education agencies,
            <br />
            and cultural institutions throughout China.
        </div>

        <img
            src="/assets/image/AboutUs/Partners/Partners.png"
            alt="Partners"
            class="partners-image"
        />
    </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle.vue";
export default {
    name: "Partners",
    components: {
        SectionTitle,
    },
};
</script>

<style lang="less" scoped>
.partners-container {
    background-color: #fff;
    padding: 75px 200px;
    max-width: 100%;
    margin: 0 auto;
}
.subtitle {
    text-align: center;
    padding: 0 64px;
    margin-bottom: 60px;
    font-size: 22px;
    line-height: normal;
    text-align: center;
    letter-spacing: normal;
    color: #2e4057;
    font-family: "AlibabaPuHuiTiRegular";
}
.partners-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>
