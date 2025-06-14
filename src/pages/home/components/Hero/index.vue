<template>
    <section class="hero-section">
        <!-- Background Image -->
        <div class="background-container">
            <img
                src="/assets/image/Home/HeaderBackground.png"
                alt="Students studying together"
                class="background-image"
            />
            <div class="overlay"></div>
        </div>

        <!-- Content Container -->
        <div class="content-container">
            <div class="left-content">
                <!-- Main Title -->
                <div class="main-title">
                    FIND THE UNIVERSITY
                    <br />
                    THAT SUITS YOU
                </div>

                <!-- Subtitle -->
                <div class="subtitle">UNLOCK YOUR LIFE ANSWER IN CHINA</div>

                <!-- Search Form -->
                <form @submit="handleSearch" class="search-form">
                    <div class="search-container">
                        <input
                            type="text"
                            placeholder="Enter the name of a university"
                            class="search-input"
                            v-model="searchTerm"
                        />
                        <button type="submit" class="search-button">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                class="search-icon"
                            >
                                <path
                                    d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                            Search
                        </button>
                    </div>
                </form>

                <!-- Popular Content -->
                <div class="popular-content">
                    <span class="popular-label">POPULAR CONTENT:</span>
                    <div class="popular-tags">
                        <button
                            v-for="(tag, index) in popularTags"
                            :key="index"
                            class="popular-tag"
                            @click="setSearchTerm(tag)"
                        >
                            {{ tag }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right side background image area -->
            <div class="right-content">
                <!-- This area shows the background image -->
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from "vue";

export default {
    name: "Hero",
    setup() {
        const searchTerm = ref("");

        const handleSearch = (e) => {
            e.preventDefault();
            console.log("Searching for:", searchTerm.value);
        };

        const setSearchTerm = (tag) => {
            searchTerm.value = tag;
        };

        const popularTags = ["peking university"];

        return {
            searchTerm,
            handleSearch,
            setSearchTerm,
            popularTags,
        };
    },
};
</script>

<style lang="less" scoped>
/* Hero Section Styles */
.hero-section {
    position: relative;
    width: 100%;
    height: 100vh; // 默认大屏幕高度
    overflow: hidden;
}

/* Background Container */
.background-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: linear-gradient(90deg, #3a3a3a 0%, rgba(14, 10, 11, 0) 95%);
}

/* Content Container */
.content-container {
    position: relative;
    z-index: 10;
    display: flex;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    padding: 0px 200px;
}

/* Left Content Area */
.left-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-right: 40px;
    padding-top: 140px;
    width: 665px;
}

/* Right Content Area */
.right-content {
    flex: 1;
    position: relative;
}

/* Typography */
.main-title {
    font-size: 55px;
    font-weight: 800;
    color: #fff;
    line-height: 64px;
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: normal;
    font-family: "AlibabaPuHuiTiBold";
}

.subtitle {
    font-size: 28px;
    font-weight: 500;
    color: #fff;
    margin-bottom: 40px;
    text-transform: uppercase;
    letter-spacing: normal;
    font-family: "AlibabaPuHuiTiMedium";
}

/* Search Form */
.search-form {
    margin-bottom: 40px;
}

.search-container {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 20px 10px 20px 50px;
    border-radius: 236px;
    // overflow: hidden;
    // box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    width: 614px;
    height: 64px;
}

.search-input {
    width: 100%;
    // flex: 1;
    //
    border: none;
    outline: none;
    font-size: 24px;
    color: #333;
    background: #ffffff;

    &::placeholder {
        font-family: PingFang SC;
        font-size: 22px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: normal;
        color: #afb2c4;
    }
}

.search-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 166px;
    height: 44px;
    margin: -10px 0;
    gap: 10px;
    border-radius: 209px;
    background: #ff6b35;

    border: none;

    cursor: pointer;
    transition: background-color 0.3s ease;
    white-space: nowrap;

    font-size: 18px;
    line-height: 22px;
    font-weight: 500;

    letter-spacing: normal;
    color: #ffffff;

    &:hover {
        background: #e55529;
    }
}

.search-icon {
    width: 24px;
    height: 24px;
}

/* Popular Content */
.popular-content {
    display: flex;
    align-items: center;
    gap: 16px;
}

.popular-label {
    font-size: 18px;
    line-height: 22px;
    font-weight: 600;

    line-height: normal;
    text-transform: uppercase;
    letter-spacing: normal;
    color: #ffffff;
}

.popular-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
}

.popular-tag {
    width: 175px;
    height: 37px;
    border-radius: 209px;
    box-sizing: border-box;
    border: 1px solid #ffffff;
    background: transparent;
    font-family: PingFang SC;
    font-size: 18px;
    font-weight: normal;
    line-height: 18px;
    letter-spacing: normal;
    color: #ffffff;
    &:hover {
        background: rgba(255, 255, 255, 0.3);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-1px);
    }
}

/* Animations */
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

.main-title,
.subtitle,
.search-form,
.popular-content {
    animation: fadeInUp 0.8s ease-out;
}

.subtitle {
    animation-delay: 0.2s;
}

.search-form {
    animation-delay: 0.4s;
}

.popular-content {
    animation-delay: 0.6s;
}

// 响应式样式
@media screen and (max-width: 479px) {
    .hero-section {
        height: 20vh;
    }
}

@media screen and (min-width: 480px) and (max-width: 768px) {
    .hero-section {
        height: 35vh;
    }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
    .hero-section {
        height: 40vh;
    }
}

@media screen and (min-width: 1025px) and (max-width: 1280px) {
    .hero-section {
        height: 50vh;
    }
}

@media screen and (min-width: 1281px) and (max-width: 1440px) {
    .hero-section {
        height: 70vh;
    }
}
</style>
