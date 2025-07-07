<template>
    <div class="our-team-container">
        <SectionTitle title="Our Team" marginBottom="0px" />
        <div class="subtitle">
            We are a young team, consisting of professionals from various fields
            such as international education, language teaching, and cross -
            cultural communication. We are not just educational consultants; we
            are partners in helping dreams come true, providing every student
            with patient, professional, and attentive services.
        </div>
        <div class="team-members-container">
            <div
                class="team-member-card"
                :class="{ 'fade-in': isLoaded }"
                :style="{ animationDelay: `${index * 0.15}s` }"
                v-for="(member, index) in teamMembers"
                :key="member.name"
            >
                <div
                    class="team-member-image"
                    :class="{ 'has-border': member.hasBorder }"
                >
                    <img :src="member.image" alt="Team Member" />
                </div>
                <div class="team-member-name">{{ member.name }}</div>
                <div class="team-member-position">{{ member.position }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle.vue";

export default {
    name: "OurTeam",
    components: {
        SectionTitle,
    },
    data() {
        return {
            isLoaded: false,
            observer: null,
            teamMembers: [
                {
                    name: "Ben Liao",
                    position: "CEO",
                    image: "/assets/image/AboutUs/OurTeam/Avatar1.png",
                    hasBorder: false,
                },
                {
                    name: "Rachel Qiu",
                    position: "co-founder",
                    image: "/assets/image/AboutUs/OurTeam/Avatar2.png",
                    hasBorder: false,
                },
                {
                    name: "Yu Xing",
                    position: "Content Manager",
                    image: "/assets/image/AboutUs/OurTeam/Avatar3.png",
                    hasBorder: false,
                },
                {
                    name: "Alex Zheng",
                    position: "Marketing Manager",
                    image: "/assets/image/AboutUs/OurTeam/Avatar4.png",
                    hasBorder: false,
                },
                {
                    name: "Claire Zhang",
                    position: "Recruitment Manager",
                    image: "/assets/image/AboutUs/OurTeam/Avatar5.png",
                    hasBorder: true,
                },
                {
                    name: "you？",
                    position: "We're hiring",
                    image: "/assets/image/AboutUs/OurTeam/Avatar6.png",
                    hasBorder: true,
                },
            ],
        };
    },
    mounted() {
        // 使用 Intersection Observer 检测组件是否进入视口
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // 延迟一点时间触发淡入效果
                        setTimeout(() => {
                            this.isLoaded = true;
                        }, 200);
                        // 停止观察，因为动画只需要触发一次
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "50px 0px",
            }
        );

        // 观察组件容器
        const container = this.$el;
        if (container) {
            this.observer.observe(container);
        }
    },
    beforeUnmount() {
        if (this.observer) {
            this.observer.disconnect();
        }
    },
};
</script>

<style lang="less" scoped>
.our-team-container {
    background-color: #fff;
    padding: 75px 196px;
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
.team-members-container {
    display: flex;
    //flex-wrap: wrap;
    gap: 20px;
}
.team-member-card {
    width: 238px;
    height: 308px;
    padding: 40px;
    border-radius: 10px;
    background: #ffffff;
    box-sizing: border-box;
    /* grey 03 */
    border: 1px solid #dbdfec;
    box-shadow: -5px 0px 10px 0px rgba(190, 190, 190, 0.25),
        5px 5px 10px 0px rgba(190, 190, 190, 0.25);

    /* 添加过渡效果 */
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;

    &.fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    /* 悬停效果 */
    &:hover {
        transform: translateY(-5px);
        box-shadow: -8px 0px 15px 0px rgba(190, 190, 190, 0.3),
            8px 8px 15px 0px rgba(190, 190, 190, 0.3);
    }
}

.team-member-image {
    width: 160px;
    height: 160px;
    margin-bottom: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    transition: transform 0.3s ease;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }

    .team-member-card:hover & {
        transform: scale(1.05);
    }
}

.has-border {
    width: 158px;
    height: 158px;
    border: 1px solid #2e4057;
}

.team-member-name {
    height: 24px;
    margin-bottom: 6px;
    font-family: PingFang SC;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    text-align: center;
    letter-spacing: normal;
    color: #2e4057;
    transition: color 0.3s ease;

    .team-member-card:hover & {
        color: #ff6b35;
    }
}

.team-member-position {
    height: 20px;
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 300;
    line-height: 20px;
    text-align: center;
    letter-spacing: normal;
    /* blue */
    color: #3a3e48;
    transition: color 0.3s ease;

    .team-member-card:hover & {
        color: #ff6b35;
    }
}

// 移动端
@media (max-width: 768px) {
    .team-member-card {
        padding: 20px 40px 0 40px;
    }
    .team-member-image {
        img {
            margin-top: -20px !important;
        }
        margin-bottom: 0px;
    }
    .has-border {
        width: 160px;
        height: 160px;
        border: none;
    }
    .team-member-name {
        margin-top: 40px;
        margin-bottom: 0px;
    }
}
</style>
