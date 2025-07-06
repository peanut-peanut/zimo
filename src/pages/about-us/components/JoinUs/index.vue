<template>
    <div class="join-us-container">
        <SectionTitle title="Join Us" />
    </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle.vue";
export default {
    name: "JoinUs",
    components: {
        SectionTitle,
    },
};
</script>

<style lang="less" scoped>
.join-us-container {
    background-color: #f6f6f6;
    padding: 75px 200px;
    max-width: 100%;
    margin: 0 auto;
}
</style>
