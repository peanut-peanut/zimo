<template>
    <div class="join-us-container">
        <SectionTitle title="Join Us" />

        <div class="join-us-content" :class="{ 'fade-in': isVisible }">
            <div class="join-us-left">
                <div class="hiring-title">
                    We are currently hiring for the following positions:
                </div>

                <div class="positions-list">
                    <div class="position-item" v-for="(position, index) in positions" :key="index" :style="{ animationDelay: `${index * 0.1}s` }">
                        <div class="position-dot"></div>
                        <div class="position-text">{{ position }}</div>
                    </div>
                </div>

                <div class="application-text">
                    To apply, please email HR@zimo.club.
                    <br />
                    Please send us your application, updated resume (CV), and a
                    brief description of your experience, introduce yourself and
                    explain why you're interested in this role.
                </div>
            </div>

            <div class="join-us-right">
                <div class="image-container">
                    <div class="image-background"></div>
                    <img
                        src="/assets/image/AboutUs/JoinUs/JoinUs.png"
                        alt="Join Us"
                        class="join-us-image"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle.vue";
export default {
    name: "JoinUs",
    components: {
        SectionTitle,
    },
    data() {
        return {
            isVisible: false,
            positions: [
                "Writers",
                "Content Creators and Student Ambassadors",
                "Admissions Service Manager",
                "International Marketing Manager",
                "University Sales Manager"
            ]
        };
    },
    mounted() {
        this.setupIntersectionObserver();
    },
    methods: {
        setupIntersectionObserver() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            this.isVisible = true;
                        }
                    });
                },
                {
                    threshold: 0.1,
                }
            );

            observer.observe(this.$el);
        },
    },
};
</script>

<style lang="less" scoped>
.join-us-container {
    background-color: #f6f6f6;
    padding: 75px 260px;
    max-width: 100%;
    margin: 0 auto;
}

.join-us-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 360px;
    gap: 120px;
}

.join-us-left {
    flex: 1;
}

.join-us-right {
    flex-shrink: 0;
}

.hiring-title {
    margin-top: 10px;
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: normal;
    color: #2e4057;
    margin-bottom: 20px;
}

.positions-list {
    margin-bottom: 29px;
}

.position-item {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
}

.position-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #ff6b35;
    flex-shrink: 0;
}

.position-text {
    font-family: PingFang SC;
    font-size: 18px;
    font-weight: 300;
    line-height: normal;
    letter-spacing: normal;
    color: #2e4057;
}

.application-text {
    font-family: PingFang SC;
    font-size: 18px;
    font-weight: 300;
    line-height: normal;
    letter-spacing: normal;
    color: #2e4057;
    line-height: 32px;
}

.image-container {
    position: relative;
}

.image-background {
    position: absolute;
    width: 519px;
    height: 320px;
    border-radius: 10px;
    background: #ff6b35;
    left: -20px;
    bottom: -19px;
    z-index: 1;
}

.join-us-image {
    position: relative;
    width: 519px;
    height: 320px;
    border-radius: 10px;
    object-fit: cover;
    z-index: 2;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
}

// 淡入动画效果
.join-us-content {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 1s ease-out, transform 1s ease-out;

    &.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
}

// 职位列表项动画
.position-item {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.8s ease-out forwards;

    .fade-in & {
        animation-play-state: running;
    }

    &:hover {
        .position-dot {
            transform: scale(1.2);
            background-color: #ff8c5a;
        }

        .position-text {
            color: #ff6b35;
        }
    }
}

.position-dot {
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.position-text {
    transition: color 0.3s ease;
}

// 图片容器悬停效果
.image-container {
    &:hover {
        .image-background {
            transform: scale(1.02);
        }
    }
}

.image-background {
    transition: transform 0.3s ease;
}

// 关键帧动画
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
</style>
