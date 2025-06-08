<template>
    <section class="special-content-container">
        <SectionTitle title="Special Content" />
        
        <div class="content-grid">
            <div 
                v-for="content in CONTENTS_DATA" 
                :key="content.id" 
                class="content-card"
            >
                <div class="card-image">
                    <img :src="content.image" :alt="content.title" />
                </div>
                <div class="card-content">
                    <div class="card-title">{{ content.title }}</div>
                    <div class="card-date">{{ content.date }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import SectionTitle from "../../../../components/SectionTitle.vue";

// 内容数据
const CONTENTS_DATA = [
    {
        id: 1,
        title: "Can You Study in China in English in 2025?",
        date: "May 2025",
        image: "/assets/image/Home/SpecialContent/SpecialContent1.png",
    },
    {
        id: 2,
        title: "Costs of Studying in China",
        date: "May 2025",
        image: "/assets/image/Home/SpecialContent/SpecialContent2.png",
    },
    {
        id: 3,
        title: "Read more details about how studying abroad in China can change your life!",
        date: "May 2025",
        image: "/assets/image/Home/SpecialContent/SpecialContent3.png",
    },
    {
        id: 4,
        title: "8 Reasons to Study in China",
        date: "May 2025",
        image: "/assets/image/Home/SpecialContent/SpecialContent4.png",
    },
];

export default {
    name: "SpecialContent",
    components: {
        SectionTitle,
    },
    setup() {
        return {
            CONTENTS_DATA
        };
    },
};
</script>

<style lang="less" scoped>
.special-content-container {
    background-color: #fff;
    padding: clamp(3rem, 6vw, 5rem) 13.54vw;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.content-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.01vw;
    margin-top: 2rem;
    
    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 2vw;
    }
    
    @media (max-width: 640px) {
        grid-template-columns: 1fr;
        gap: 3vw;
    }
}

.content-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 300px;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    }
}

.card-image {
    width: 100%;
    height: 150px;
    overflow: hidden;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .content-card:hover & img {
        transform: scale(1.05);
    }
}

.card-content {
    height: 150px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-title {
    font-size: 16px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 1.2;
    letter-spacing: normal;
    margin-bottom: 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        color: #ff6b35;
    }
}

.card-date {
    font-size: clamp(0.875rem, 1vw, 0.9375rem);
    color: #3A3E48;
    margin: 0;
    font-weight: 400;
}
</style>
