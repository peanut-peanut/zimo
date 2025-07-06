<template>
    <div class="location-contact-container">
        <SectionTitle title="Location & Contact" />
    </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle.vue";
export default {
    name: "LocationContact",
    components: {
        SectionTitle,
    },
};
</script>

<style lang="less" scoped>
.location-contact-container {
    background-color: #F6F6F6;
    padding: 75px 200px;
    max-width: 100%;
    margin: 0 auto;
}
</style>