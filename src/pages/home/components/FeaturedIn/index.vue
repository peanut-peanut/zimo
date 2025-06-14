<template>
    <section class="featured-in-container">
        <SectionTitle title="Featured In" />
        <div class="media-logos">
            <div v-for="media in mediaLogos" :key="media.id" class="media-logo">
                <img :src="media.image" :alt="media.name" class="logo-image" />
            </div>
        </div>
    </section>
</template>

<script>
import SectionTitle from "../../../../components/SectionTitle.vue";

export default {
    name: "FeaturedIn",
    components: {
        SectionTitle,
    },
    setup() {
        const mediaLogos = [
            {
                id: 1,
                name: "VOA",
                image: "/assets/image/Home/FeaturedIn/VOA.png",
            },
            {
                id: 2,
                name: "THINKIFIC",
                image: "/assets/image/Home/FeaturedIn/THINKIFIC.png",
            },
            {
                id: 3,
                name: "SABC",
                image: "/assets/image/Home/FeaturedIn/SABC.png",
            },
            {
                id: 4,
                name: "Egypt Today",
                image: "/assets/image/Home/FeaturedIn/EGYPT.png",
            },
            {
                id: 5,
                name: "CRJ",
                image: "/assets/image/Home/FeaturedIn/CRJ.png",
            },
            {
                id: 6,
                name: "CNTV",
                image: "/assets/image/Home/FeaturedIn/CNTV.png",
            },
        ];

        return {
            mediaLogos,
        };
    },
};
</script>

<style lang="less" scoped>
.featured-in-container {
    background-color: #f6f6f6;
    padding: 75px 260px;
    max-width: 100%;
    margin: 0 auto;

    // 淡入动画
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 1.2s ease-out forwards;
}

// 淡入动画关键帧
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.media-logos {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-items: center;
}

.media-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    width: 217px;
    height: 111px;
    transition: all 0.3s ease;
    cursor: pointer;
    
    // 使用CSS3的新特性来控制虚线样式
    border: 0;
    background-image: 
        linear-gradient(90deg, #DBDFEC 50%, transparent 50%),
        linear-gradient(90deg, #DBDFEC 50%, transparent 50%),
        linear-gradient(0deg, #DBDFEC 50%, transparent 50%),
        linear-gradient(0deg, #DBDFEC 50%, transparent 50%);
    background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
    background-position: 0 0, 0 100%, 0 0, 100% 0;
    background-size: 12px 1px, 12px 1px, 1px 12px, 1px 12px;

    &:hover {
        background-image: 
            linear-gradient(90deg, #ff6b35 50%, transparent 50%),
            linear-gradient(90deg, #ff6b35 50%, transparent 50%),
            linear-gradient(0deg, #ff6b35 50%, transparent 50%),
            linear-gradient(0deg, #ff6b35 50%, transparent 50%);
        box-shadow: 0 4px 16px rgba(255, 107, 53, 0.1);
        transform: translateY(-2px);
    }
}

.logo-image {
    
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
}

.media-logo:hover .logo-image {
    transform: scale(1.05);
}


</style>
