<template>
    <div class="location-contact-container">
        <SectionTitle title="Location & Contact" />

        <div class="location-contact-content">
            <div class="location-contact-content-left">
                <!-- 地址信息 -->
                <div 
                    class="address-section"
                    :class="{ 'fade-in': isLoaded }"
                    :style="{ animationDelay: '0.1s' }"
                >
                    <div class="address-item">
                        <div class="address-icon">
                            <img
                                src="/assets/image/AboutUs/LocationContact/MarkIcon.png"
                                alt="Address"
                            />
                        </div>
                        <div class="address-info">
                            <div class="address-title">
                                Shenzhen, China Address
                            </div>
                            <div class="divider"></div>
                            <div class="address-description">
                                Room 210A, Bldg. 1, Baianlong Industrial
                                Building<br />
                                No. 4 Haiwan Road, Wuwan Community<br />
                                Zhaoshang Subdistrict, Nanshan District<br />
                                Shenzhen, Guangdong, China
                            </div>
                            <div class="address-note">
                                (For visiting or counseling in our office,
                                please call us<br />
                                and make an appointment first)
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 左下侧办公室图片 -->
                <div 
                    class="office-images"
                    :class="{ 'fade-in': isLoaded }"
                    :style="{ animationDelay: '0.3s' }"
                >
                    <img
                        src="/assets/image/AboutUs/LocationContact/Image1.png"
                        alt="Office Image 1"
                        class="office-image-1"
                    />
                    <img
                        src="/assets/image/AboutUs/LocationContact/Image2.png"
                        alt="Office Image 2"
                        class="office-image-2"
                    />
                    <div class="office-background"></div>
                </div>
            </div>

            <div class="location-contact-content-right">
                <!-- 地图区域 -->
                <div 
                    class="map-container"
                    :class="{ 'fade-in': isLoaded }"
                    :style="{ animationDelay: '0.2s' }"
                >
                    <div class="map-background"></div>
                    <img
                        src="/assets/image/AboutUs/LocationContact/MapImage.png"
                        alt="Map"
                        class="map-image"
                    />
                </div>

                <!-- 联系方式 -->
                <div 
                    class="contact-section"
                    :class="{ 'fade-in': isLoaded }"
                    :style="{ animationDelay: '0.4s' }"
                >
                    <div class="contact-item">
                        <div class="contact-icon">
                            <img
                                src="/assets/image/AboutUs/LocationContact/TelIcon.png"
                                alt="Student Service"
                            />
                        </div>
                        <div class="contact-info">
                            <div class="contact-title">Student Service</div>
                            <div class="divider"></div>
                            <div class="contact-description">
                                <span class="contact-description-label"
                                    >Email：</span
                                >
                                service@zimo.club<br />
                                <span class="contact-description-label"
                                    >WeChat：</span
                                >
                                Mia_Miaoao
                            </div>
                        </div>
                    </div>

                    <div class="contact-item">
                        <div class="contact-icon">
                            <img
                                src="/assets/image/AboutUs/LocationContact/MarkIcon.png"
                                alt="Business and Cooperation"
                            />
                        </div>
                        <div class="contact-info">
                            <div class="contact-title">
                                Business and Cooperation
                            </div>
                            <div class="divider"></div>
                            <div class="contact-description">
                                <span class="contact-description-label">
                                    Email：
                                </span>
                                rachel.qiu@zimo.club<br />
                                <span class="contact-description-label"
                                    >Phone：</span
                                >
                                +8618566720217<br />
                                <span class="contact-description-label"
                                    >WeChat：</span
                                >
                                gdmzrr
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle.vue";
export default {
    name: "LocationContact",
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
                        }, 200);
                        // 停止观察，因为动画只需要触发一次
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
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
.location-contact-container {
    background-color: #f6f6f6;
    padding: 75px 260px;
    max-width: 100%;
    margin: 0 auto;
}

.location-contact-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 216px;
}

.location-contact-content-left {
    width: 648px;
}

.location-contact-content-right {
    width: 538px;
    position: relative;
}

/* 通用淡入效果 */
.address-section,
.office-images,
.map-container,
.contact-section {
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s ease-out;
    
    &.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 地址信息样式 */
.address-section {
    margin-bottom: 80px;
}

.address-item {
    display: flex;
    align-items: flex-start;
    gap: 30px;
}

.address-icon {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
    }
    
    // &:hover {
    //     transform: translateY(-3px);
    //     box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
    // }
}

.address-info {
    flex: 1;
}

.divider {
    width: 47px;
    height: 4px;
    border-radius: 186px;
    background: #ff6b35;
    margin: 10px 0 26px 0;
    transition: width 0.3s ease;
        
    .address-item:hover & {
        width: 60px;
    }

    .contact-item:hover & {
        width: 60px;
    }
}

.address-title {
    margin-top: 8px;
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: normal;
    color: #2e4057;
    transition: color 0.3s ease;
    
    .address-item:hover & {
        color: #ff6b35;
    }
}

.address-description {
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: 300;
    line-height: 37px;
    letter-spacing: normal;
    color: #3a3e48;
    margin-bottom: 15px;
    transition: color 0.3s ease;
}

.address-note {
    font-family: PingFang SC;
    font-size: 18px;
    font-weight: 300;
    line-height: normal;
    letter-spacing: normal;
    color: #3a3e48;
    transition: color 0.3s ease;
}

/* 联系方式样式 */
.contact-section {
    margin-bottom: 60px;
}

.contact-item {
    display: flex;
    align-items: flex-start;
    gap: 30px;
    margin-bottom: 40px;
    transition: transform 0.3s ease;

    &:last-child {
        margin-bottom: 0;
    }
    
    &:hover {
        transform: translateX(10px);
    }
}

.contact-icon {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;

    img {
        width: 100%;
        height: 100%;
    }
    
    // &:hover {
    //     transform: translateY(-3px);
    //     box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
    // }
}

.contact-info {
    flex: 1;
}

.contact-title {
    margin-top: 8px;
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: normal;
    color: #2e4057;
    transition: color 0.3s ease;
    
    .contact-item:hover & {
        color: #ff6b35;
    }
}

.contact-description {
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: 300;
    line-height: normal;
    letter-spacing: normal;
    color: #3a3e48;
    transition: color 0.3s ease;
}

.contact-description-label {
    font-weight: 500;
    margin-bottom: 10px;
    display: inline-block;
    font-variation-settings: "opsz" auto;
    transition: color 0.3s ease;
    
    .contact-item:hover & {
        color: #ff6b35;
    }
}

/* 办公室图片样式 */
.office-images {
    display: flex;
    gap: 20px;
    align-items: flex-end;
    position: relative;
}

.office-image-1 {
    width: 376px;
    height: 506px;
    border-radius: 10px;
    object-fit: cover;
    z-index: 98;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    cursor: pointer;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    }
}

.office-image-2 {
    width: 318px;
    height: 295px;
    border-radius: 10px;
    object-fit: cover;
    position: absolute;
    right: 0px;
    bottom: 35px;
    z-index: 99;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    cursor: pointer;
    
    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    }
}

.office-background {
    width: 311px;
    height: 470px;
    border-radius: 10px;
    background: #ff6b35;
    position: absolute;
    left: -20px;
    bottom: 18px;
    z-index: 97;
    transition: transform 0.4s ease;
}

/* 地图区域样式 */
.map-container {
    position: relative;
    margin-bottom: 100px;
    
    &:hover .map-image {
        transform: scale(1.02);
    }
    
    &:hover .map-background {
        transform: rotate(180deg) scale(1.05);
    }
}

.map-background {
    position: absolute;
    width: 526px;
    height: 295px;
    transform: rotate(180deg);
    border-radius: 10px;
    background: #ff6b35;
    right: -16px;
    bottom: -19px;
    z-index: 1;
    transition: transform 0.4s ease;
}

.map-image {
    position: relative;
    width: 538px;
    height: 295px;
    border-radius: 10px;
    object-fit: cover;
    z-index: 2;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    cursor: pointer;
    
    &:hover {
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }
}
</style>
