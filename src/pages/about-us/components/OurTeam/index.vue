<template>
    <div class="our-team-container">
        <SectionTitle title="Our Team" />
    </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle.vue";
export default {
    name: "OurTeam",
    components: {
        SectionTitle,
    },
};
</script>

<style lang="less" scoped>
.our-team-container {
    background-color: #fff;
    padding: 75px 200px;
    max-width: 100%;
    margin: 0 auto;
}
</style>