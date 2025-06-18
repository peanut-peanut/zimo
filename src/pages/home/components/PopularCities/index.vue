<template>
    <section id="popular-cities" class="popular-cities-container">
        <SectionTitle title="Popular Cities" />
        <div class="content">
            <!-- 左侧地图 -->
            <div class="map-section">
                <div class="map-container">
                    <img
                        src="/assets/image/Home/PopularCities/ChinaMap.png"
                        alt="China Map"
                        class="china-map"
                    />
                    <!-- 地图上的标记点 -->
                    <div
                        v-for="city in cities"
                        :key="city.id"
                        :class="[
                            'map-marker',
                            `marker-${city.id}`,
                            { active: hoveredCity === city.id },
                        ]"
                        @mouseenter="handleMapMarkerHover(city.id)"
                        @mouseleave="handleMapMarkerLeave"
                    >
                        <img
                            src="/assets/image/Home/PopularCities/MapMarker.png"
                            alt="marker"
                            class="marker-icon"
                        />
                    </div>
                </div>
            </div>

            <!-- 右侧城市卡片 -->
            <div class="cities-section">
                <div class="cities-grid">
                    <div
                        v-for="city in cities"
                        :key="city.id"
                        :class="[
                            'city-card',
                            { active: hoveredCity === city.id },
                        ]"
                        @mouseenter="handleCityCardHover(city.id)"
                        @mouseleave="handleCityCardLeave"
                    >
                        <img
                            :src="city.image"
                            :alt="city.name"
                            class="city-image"
                        />
                        <div class="city-name">{{ city.name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from "vue";
import SectionTitle from "../../../../components/SectionTitle.vue";

export default {
    name: "PopularCities",
    components: {
        SectionTitle,
    },
    setup() {
        const hoveredCity = ref(null);

        const cities = ref([
            {
                id: "beijing",
                name: "Beijing",
                image: "/assets/image/Home/PopularCities/Beijing.png",
            },
            {
                id: "shanghai",
                name: "Shanghai",
                image: "/assets/image/Home/PopularCities/Shanghai.png",
            },
            {
                id: "hangzhou",
                name: "Hangzhou",
                image: "/assets/image/Home/PopularCities/Hangzhou.png",
            },
            {
                id: "hongkong",
                name: "Hongkong",
                image: "/assets/image/Home/PopularCities/HongKong.png",
            },
            {
                id: "shenzhen",
                name: "Shenzhen",
                image: "/assets/image/Home/PopularCities/Shenzhen.png",
            },
            {
                id: "wuhan",
                name: "Wuhan",
                image: "/assets/image/Home/PopularCities/Wuhan.png",
            },
        ]);

        const handleCityCardHover = (cityId) => {
            hoveredCity.value = cityId;
        };

        const handleCityCardLeave = () => {
            hoveredCity.value = null;
        };

        const handleMapMarkerHover = (cityId) => {
            hoveredCity.value = cityId;
        };

        const handleMapMarkerLeave = () => {
            hoveredCity.value = null;
        };

        return {
            hoveredCity,
            cities,
            handleCityCardHover,
            handleCityCardLeave,
            handleMapMarkerHover,
            handleMapMarkerLeave,
        };
    },
};
</script>

<style lang="less" scoped>
.popular-cities-container {
    background-color: #f6f6f6;
    padding: 75px 200px;
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

.content {
    display: flex;
    gap: 40px;
    margin-top: 30px;
    margin-bottom: -82px;
    min-height: 500px;
}

.map-section {
    flex: 1; // 让地图占据更多空间
    margin-top: -120px;

    // 为地图区域添加延迟淡入
    opacity: 0;
    animation: fadeInUp 1.2s ease-out 0.2s forwards;

    .map-container {
        position: relative;

        width: 1046px;
        height: 783px;
        margin-left: -286px;
        height: 100%;

        .china-map {
            width: 100%;
            object-fit: contain;
            object-position: center;
        }

        .map-marker {
            position: absolute;
            cursor: pointer;
            transition: all 0.3s ease;
            transform: translate(-50%, -50%);
            z-index: 10;
            width: 24px;
            height: 24px;
            // 为标记点添加更晚的淡入
            opacity: 0;
            animation: fadeInUp 0.8s ease-out 0.8s forwards;

            .marker-icon {
                width: 100%;
                height: 100%;
                // width: clamp(16px, 1.8vw, 24px);
                // height: clamp(16px, 1.8vw, 24px);
                transition: all 0.3s ease;
                // filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
            }

            &:hover,
            &.active {
                .marker-icon {
                    transform: scale(1.8);
                    filter: brightness(1.1);
                }
            }
        }

        // 各个城市标记点的位置
        .marker-beijing {
            top: 330px;
            right: 360px;
        }

        .marker-shanghai {
            top: 460px;
            right: 300px;
        }

        .marker-hangzhou {
            top: 500px;
            right: 320px;
      
        }

        .marker-hongkong {
            top: 590px;
            right: 385px;
        }

        .marker-shenzhen {
            top: 580px;
            right: 405px;
        }

        .marker-wuhan {
            top: 480px;
            right: 470px;
        }
    }
}

.cities-section {
    flex: 1; // 右侧城市卡片区域
    height: 354px;
    padding-top: 100px;

    // 为城市卡片区域添加延迟淡入
    opacity: 0;
    animation: fadeInUp 1.2s ease-out 0.4s forwards;

    .cities-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 18px;
        height: 100%;
        justify-items: center;
        align-items: center;

        .city-card {
            display: flex;
            flex-direction: column;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 10px;
            overflow: hidden;
            background: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            position: relative;
            width: 232px;
            height: 168px;

            // 为每个城市卡片添加错开的淡入动画
            opacity: 0;
            &:nth-child(1) {
                animation: fadeInUp 0.8s ease-out 0.6s forwards;
            }
            &:nth-child(2) {
                animation: fadeInUp 0.8s ease-out 0.7s forwards;
            }
            &:nth-child(3) {
                animation: fadeInUp 0.8s ease-out 0.8s forwards;
            }
            &:nth-child(4) {
                animation: fadeInUp 0.8s ease-out 0.9s forwards;
            }
            &:nth-child(5) {
                animation: fadeInUp 0.8s ease-out 1s forwards;
            }
            &:nth-child(6) {
                animation: fadeInUp 0.8s ease-out 1.1s forwards;
            }

            .city-image {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: all 0.3s ease;
            }

            .city-name {
                position: absolute;
                bottom: 2px;
                left: 0;
                right: 0;
                font-size: 18px;
                line-height: normal;
                text-align: center;
                letter-spacing: normal;
                color: #ffffff;
                // font-weight: 600;
            }

            &:hover,
            &.active {
                // transform: translateY(-6px);
                box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);

                .city-image {
                    transform: scale(1.15);
                }

                .city-name {
                    color: #ff6b35;
                    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
                }
            }
        }
    }
}

// 屏幕小于1024px
@media (max-width: 1024px) {
    .marker-beijing {
        top: 230px !important;
  
    }
    .marker-shanghai {
        top: 350px !important;

    }
    .marker-hangzhou {
        top: 380px !important;
   
    }
    .marker-hongkong {
        top: 450px !important;

    }
    .marker-shenzhen {
        top: 440px !important;

    }
    .marker-wuhan {
        top: 380px !important;
    }
}
</style>
