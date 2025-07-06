<template>
    <div class="partners-container">
        <SectionTitle title="Partners" />
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
</style>