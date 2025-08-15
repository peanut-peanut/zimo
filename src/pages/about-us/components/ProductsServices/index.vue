<template>
    <div class="product-introduction-container">
        <SectionTitle title="Products & Services" marginBottom="0px" />
        <div class="subtitle">
            We offer a range of tailored education programs for students
            worldwide, including:
        </div>
        <div class="cards-container">
            <div 
                class="service-card"
                :class="{ 'fade-in': isLoaded }"
                :style="{ animationDelay: '0.1s' }"
            >
                <div class="card-image-container">
                    <img
                        src="/assets/image/AboutUs/ProductsServices/Pic1.png"
                        alt="University Application Support"
                        class="card-image"
                    />
                </div>
                <div class="card-content">
                    <div class="card-title">University Application Support</div>
                    <div class="card-description">
                        Helping students successfully apply to Chinese
                        universities.
                    </div>
                </div>
            </div>
            <div 
                class="service-card"
                :class="{ 'fade-in': isLoaded }"
                :style="{ animationDelay: '0.3s' }"
            >
                <div class="card-image-container">
                    <img
                        src="/assets/image/AboutUs/ProductsServices/Pic2.png"
                        alt="Study Tours"
                        class="card-image"
                    />
                </div>
                <div class="card-content">
                    <div class="card-title">Study Tours</div>
                    <div class="card-description">
                        Short-term educational and cultural trips across China.
                    </div>
                </div>
            </div>
            <div 
                class="service-card"
                :class="{ 'fade-in': isLoaded }"
                :style="{ animationDelay: '0.5s' }"
            >
                <div class="card-image-container">
                    <img
                        src="/assets/image/AboutUs/ProductsServices/Pic3.png"
                        alt="Chinese Summer Camps"
                        class="card-image"
                    />
                </div>
                <div class="card-content">
                    <div class="card-title">Chinese Summer Camps</div>
                    <div class="card-description">
                        Language and culture immersion programs designed for
                        youth.
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle.vue";
export default {
    name: "ProductsServices",
    components: {
        SectionTitle,
    },
    data() {
        return {
            isLoaded: false,
            observer: null
        };
    },
    mounted() {
        // 使用 Intersection Observer 检测组件是否进入视口
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // 延迟一点时间触发淡入效果
                        setTimeout(() => {
                            this.isLoaded = true;
                        }, 300);
                        // 停止观察，因为动画只需要触发一次
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: '50px 0px'
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
    }
};
</script>

<style lang="less" scoped>
.product-introduction-container {
    background-color: #f6f6f6;
    padding: 75px 260px;
    max-width: 100%;
    margin: 0 auto;
}
.subtitle {
    text-align: center;
    margin-bottom: 60px;
    font-size: 22px;
    line-height: normal;
    text-align: center;
    letter-spacing: normal;
    color: #2e4057;
    font-family: "AlibabaPuHuiTiRegular";
}

.cards-container {
    display: flex;
    justify-content: space-between;
    gap: 21px;
}

.service-card {
    width: 453px;
    height: 439px;
    border: 1px solid #dbdfec;
    border-radius: 10px;
    background-color: #ffffff;
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
    
    &.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
}

.card-image-container {
    width: 453px;
    height: 340px;
    overflow: hidden;
    border-radius: 10px 10px 0px 0px;
}

.card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease-out;
    
    .service-card:hover & {
        transform: scale(1.1);
    }
}

.card-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.card-title {
    font-family: PingFang SC;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: normal;
    color: #2e4057;
    transition: color 0.3s ease;
    
    .service-card:hover & {
        color: #ff6b35;
    }
}

.card-description {
    font-family: PingFang SC;
    font-size: 14px;
    font-weight: 300;
    line-height: 20px;
    letter-spacing: normal;
    color: #3a3e48;
    transition: color 0.3s ease;
    
    .service-card:hover & {
        color: #ff6b35;
    }
}
</style>
