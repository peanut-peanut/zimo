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
                    <!-- <div class="card-Subheading">Subheading:</div> -->
                    <div class="card-description">
                        {{ content.description }}
                    </div>
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
        description:
            "2025 China Education Revolution: Discover 150+ Top Global Universities Offering English-Taught Programs — From AI Research Hubs to Belt and Road Innovation Zones, Your Future Starts Here.",
        date: "May 2025",
        image: "/assets/image/Home/SpecialContent/SpecialContent1.png",
    },
    {
        id: 2,
        title: "Costs of Studying in China",
        description:
            "The Ultimate Value FormQula: Study at QS Top 200 Universities for $4,200/Year + Uncover How to Live in Shanghai/Shenzhen on 1/5th of NYC Costs — With Internship Bonuses Included.",
        date: "May 2025",
        image: "/assets/image/Home/SpecialContent/SpecialContent2.png",
    },
    {
        id: 3,
        title: "Read more details about how studying abroad in China can change your life!",
        description:
            "Beyond Degrees: The Real Story of How China 留学 (Study in China) Transformed Professionals — Gain Access to Billion-Dollar Tech Networks, Cross-Cultural Leadership, and a Front-Row Seat to the Next Global Economic Shift.",
        date: "May 2025",
        image: "/assets/image/Home/SpecialContent/SpecialContent3.png",
    },
    {
        id: 4,
        title: "8 Reasons to Study in China",
        description:
            "8 Unmissable Advantages Only China Offers — From Co-Authoring Chang'e Lunar Missions to Scaling Cross-Border E-Commerce Empires, Redefine Your Career Trajectory in the World’s Largest Innovation Lab.",
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
            CONTENTS_DATA,
        };
    },
};
</script>

<style lang="less" scoped>
.special-content-container {
    background-color: #fff;
    padding: 75px 260px;
    max-width: 100%;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.content-grid {
    display: flex;
    gap: 20px;
}

.content-card {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #dbdfec;
    box-shadow: -5px 0px 10px 0px rgba(190, 190, 190, 0.25),
        5px 5px 10px 0px rgba(190, 190, 190, 0.25);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 335px;
    height: 512px;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    }
}

.card-image {
    width: 100%;
    height: 215px;
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
    height: 297px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    //justify-content: space-between;
}

.card-title {
    font-size: 18px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 24px;
    letter-spacing: normal;
    margin-bottom: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        color: #ff6b35;
    }
}

.card-Subheading {
    font-family: PingFang SC;
    font-size: 15px;
    font-weight: 300;
    line-height: 20px;
    letter-spacing: normal;
    color: #3a3e48;
}
.card-description {
    flex: 1;
    font-family: PingFang SC;
    font-size: 15px;
    font-weight: 300;
    line-height: 20px;
    letter-spacing: normal;
    /* blue */
    color: #3a3e48;
    &:hover {
        color: #ff6b35;
    }
}

.card-date {
    font-size: 14px;
    color: #3a3e48;
    margin: 0;
    font-weight: 300;
    line-height: 20px;
    letter-spacing: normal;
}
</style>
