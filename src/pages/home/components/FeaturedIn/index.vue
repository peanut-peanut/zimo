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
    padding: clamp(3rem, 6vw, 5rem) 13.54vw;
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
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: clamp(1rem, 3vw, 2rem);
    margin-top: clamp(2rem, 4vw, 3rem);
    align-items: center;
    justify-items: center;
}

.media-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(0.8rem, 2vw, 1.5rem);
    background: #fff;
    //border-radius: 8px;
    width: 100%;
    min-height: clamp(60px, 8vw, 100px);
    transition: all 0.3s ease;
    cursor: pointer;
    // border虚线
    border: 2px dashed #bbbaba;

    // 为每个logo添加错开的淡入动画
    opacity: 0;
    &:nth-child(1) {
        animation: fadeInUp 0.8s ease-out 0.3s forwards;
    }
    &:nth-child(2) {
        animation: fadeInUp 0.8s ease-out 0.4s forwards;
    }
    &:nth-child(3) {
        animation: fadeInUp 0.8s ease-out 0.5s forwards;
    }
    &:nth-child(4) {
        animation: fadeInUp 0.8s ease-out 0.6s forwards;
    }
    &:nth-child(5) {
        animation: fadeInUp 0.8s ease-out 0.7s forwards;
    }
    &:nth-child(6) {
        animation: fadeInUp 0.8s ease-out 0.8s forwards;
    }

    &:hover {
        border-color: #ff6b35;
        box-shadow: 0 4px 16px rgba(255, 107, 53, 0.1);
        transform: translateY(-2px);
    }
}

.logo-image {
    max-width: 100%;
    max-height: clamp(40px, 5vw, 60px);
    width: auto;
    height: auto;
    object-fit: contain;
    transition: all 0.3s ease;
}

.media-logo:hover .logo-image {
    transform: scale(1.05);
}

// Responsive adjustments
@media (max-width: 1200px) {
    .media-logos {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: clamp(0.8rem, 2vw, 1.5rem);
    }
}

@media (max-width: 768px) {
    .featured-in-container {
        padding: clamp(2rem, 4vw, 3rem) clamp(1rem, 4vw, 2rem);
    }

    .media-logos {
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: clamp(0.5rem, 2vw, 1rem);
    }

    .media-logo {
        min-height: clamp(50px, 6vw, 70px);
        padding: clamp(0.5rem, 1.5vw, 1rem);
    }

    .logo-image {
        max-height: clamp(30px, 4vw, 45px);
    }
}

@media (max-width: 480px) {
    .media-logos {
        grid-template-columns: 1fr;
        grid-template-rows: repeat(6, 1fr);
    }
}
</style>
