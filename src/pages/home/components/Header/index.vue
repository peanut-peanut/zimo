<template>
    <header
        :class="[
            'header',
            { 'header-from-home': isFrom === 'Home' },
            { 'header-scrolled': isScrolled },
        ]"
        @mouseleave="handleMouseLeave"
        @mouseenter="handleMouseEnter"
    >
        <div class="header-container">
            <img
                src="/assets/image/Logo2.png"
                alt="logo"
                class="logo"
                @click="goToHome"
            />

            <!-- Desktop Navigation -->
            <nav class="desktop-nav">
                <a
                    href="/"
                    class="nav-link"
                    :class="{ active: isFrom === 'Home' }"
                    @click="handleNavClick('Home', '/')"
                    >Home</a
                >
                <a
                    href="/program"
                    class="nav-link"
                    target="_blank"
                    :class="{ active: isFrom === 'Program' }"
                    @click="handleNavClick('Program', '/program')"
                    >Program</a
                >

                <a
                    href="/successful-cases"
                    class="nav-link"
                    :class="{ active: isFrom === 'successful-cases' }"
                    target="_blank"
                    @click="
                        handleNavClick('Successful Cases', '/successful-cases')
                    "
                    >Successful cases</a
                >
                <div class="nav-dropdown" ref="dropdownRef">
                    <a
                        href="#"
                        class="nav-link"
                        :class="{
                            active: [
                                'Study in China',
                                'Cities',
                                'Universities',
                                'Scholarships',
                            ].includes(isFrom),
                        }"
                        @mouseenter="handleDropdownEnter"
                        @mouseleave="handleDropdownLeave"
                        @click="handleNavClick('Guides', '#')"
                        >Guides</a
                    >
                    <div
                        v-if="showGuidesDropdown"
                        class="dropdown-menu"
                        @mouseenter="handleDropdownEnter"
                        @mouseleave="handleDropdownLeave"
                        @click.stop
                    >
                        <a
                            @click="handleGuideClick('study-in-china')"
                            class="dropdown-item"
                            :class="{ active: isFrom === 'Study in China' }"
                            >Study in China</a
                        >
                        <a
                            @click="handleGuideClick('cities')"
                            class="dropdown-item"
                            :class="{ active: isFrom === 'Cities' }"
                            >Cities</a
                        >
                        <a
                            @click="handleGuideClick('universities')"
                            class="dropdown-item"
                            :class="{ active: isFrom === 'Universities' }"
                            >Universities</a
                        >
                        <a
                            @click="handleGuideClick('scholarships')"
                            class="dropdown-item"
                            :class="{ active: isFrom === 'Scholarships' }"
                            >Scholarships</a
                        >
                    </div>
                </div>
                <a
                    href="/about-us"
                    target="_blank"
                    class="nav-link"
                    :class="{ active: isFrom === 'AboutUs' }"
                    @click="handleNavClick('About Us', '/about-us')"
                    >About Us</a
                >
                <a
                    href="/apply-now"
                    class="nav-link"
                    :class="{ active: isFrom === 'ApplyNow' }"
                    target="_blank"
                    @click="handleNavClick('Apply Now', '/apply-now')"
                    >Apply Now</a
                >
            </nav>
            
            <!-- 语言切换器 -->
            <LanguageSwitcher />
        </div>
    </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { isMobileDevice } from "@/utils/common.js";
import baiduAnalytics from "@/utils/baidu-analytics";
import { useRouter } from "vue-router";
import { ROUTES } from "@/router/routes";
import LanguageSwitcher from "../../../../components/LanguageSwitcher.vue";

export default {
    name: "Header",
    components: {
        LanguageSwitcher,
    },
    props: {
        isFrom: {
            type: String,
            default: "Home",
        },
    },
    setup(props) {
        console.log(props.isFrom);
        const router = useRouter();
        const goToHome = () => {
            router.push(ROUTES.HOME);
        };
        const isScrolled = ref(false);

        const showGuidesDropdown = ref(false);
        const dropdownRef = ref(null);

        // 文档URL映射
        const docUrls = {
            "study-in-china":
                "https://kfk0ae7phot.sg.larksuite.com/docx/G3vDdQIAhoIIyjxCW6ilQMqagAg",
            cities: "https://kfk0ae7phot.sg.larksuite.com/docx/W2SWd1mlgotFZvxEQFSloiY7gFb",
            universities:
                "https://kfk0ae7phot.sg.larksuite.com/docx/BRT4dRFenoXmKzxfrsklAY9XgAd",
            scholarships:
                "https://kfk0ae7phot.sg.larksuite.com/docx/BTcQdwY4foASJqx9vV2lWLrjglf",
        };

        const handleScroll = () => {
            // 获取Hero组件的高度 (100vh)
            const heroHeight = window.innerHeight;

            // 当滚动距离超过Hero组件的高度时，才显示橙色背景
            if (window.scrollY > heroHeight) {
                isScrolled.value = true;
            } else {
                isScrolled.value = false;
            }
        };

        const toggleGuidesDropdown = () => {
            showGuidesDropdown.value = !showGuidesDropdown.value;
        };

        // 处理点击其他区域关闭下拉菜单
        const handleClickOutside = (event) => {
            if (
                dropdownRef.value &&
                !dropdownRef.value.contains(event.target)
            ) {
                showGuidesDropdown.value = false;
            }
        };

        const handleDropdownEnter = () => {
            showGuidesDropdown.value = true;
        };

        const handleDropdownLeave = () => {
            showGuidesDropdown.value = false;
        };

        // 处理鼠标离开header区域
        const handleMouseLeave = () => {
            // 简化逻辑，直接关闭下拉框
            showGuidesDropdown.value = false;
        };

        // 鼠标进入header时的处理
        const handleMouseEnter = () => {
            // 保持当前状态，不做额外操作
        };

        const handleNavClick = (navName, navUrl) => {
            // 上报导航点击事件
            baiduAnalytics.trackLinkClick("navigation", navUrl, navName);
            baiduAnalytics.trackEvent("navigation", "nav_click", navName, 1);
        };

        const handleGuideClick = (guide) => {
            // 关闭下拉菜单
            showGuidesDropdown.value = false;

            // 上报Guides子菜单点击事件
            baiduAnalytics.trackEvent(
                "navigation",
                "guides_submenu_click",
                guide,
                1
            );

            if (isMobileDevice()) {
                // 移动端：直接跳转到文档地址
                const docUrl = docUrls[guide];
                if (docUrl) {
                    console.log(`移动端检测到，直接跳转到文档: ${docUrl}`);
                    baiduAnalytics.trackLinkClick(
                        "external_doc",
                        docUrl,
                        guide
                    );
                    window.open(docUrl, "_blank");
                } else {
                    console.error(`未找到对应的文档URL: ${guide}`);
                }
            } else {
                // 桌面端：跳转到guides页面
                const guideUrl = `/guides/${guide}`;
                console.log(`桌面端检测到，跳转到guides页面: ${guideUrl}`);
                baiduAnalytics.trackLinkClick("internal_page", guideUrl, guide);
                window.open(guideUrl, "_blank");
            }
        };

        const headerStyle = {
            height: "90px",
            background:
                "linear-gradient(180deg, #383838 0%, rgba(56, 56, 56, 0) 94%)",
        };

        onMounted(() => {
            window.addEventListener("scroll", handleScroll);
            document.addEventListener("click", handleClickOutside);
        });

        onUnmounted(() => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleClickOutside);
        });

        return {
            isScrolled,
            showGuidesDropdown,
            toggleGuidesDropdown,
            headerStyle,
            dropdownRef,
            handleMouseLeave,
            handleMouseEnter,
            handleDropdownEnter,
            handleDropdownLeave,
            handleGuideClick,
            handleNavClick,
            goToHome,
        };
    },
};
</script>

<style lang="less" scoped>
// 大屏幕缩放系数
@large-screen-scale: 0.8;

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99999;
    height: 80px;
    background: #ff6b35;
    transition: all 0.3s ease;

    &.header-from-home {
        background: linear-gradient(
            180deg,
            #383838 0%,
            rgba(56, 56, 56, 0) 94%
        );
    }
    // Add scrolled state styling
    &.header-scrolled {
        background: #ff6b35;
    }

    // 当整个header被hover时，显示激活菜单的下划线
    &:hover {
        .nav-link.active::after {
            content: "";
            position: absolute;
            bottom: -14px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 4px;
            background-color: #fff;
            border-radius: 1px;
            animation: slideIn 0.3s ease-out;
        }
    }

    /* 大屏幕缩放 - 屏幕宽度大于1680px */
    @media (min-width: 1681px) {
        height: 80px * @large-screen-scale;
    }
}

.header-container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;

    /* 大屏幕缩放 - 屏幕宽度大于1680px */
    @media (min-width: 1681px) {
        padding-left: 400px * @large-screen-scale;
    }
}

.logo {
    position: absolute;
    top: 12px;
    left: 190px;
    width: 216px;
    height: 59px;
    cursor: pointer;
    z-index: 99999;

    /* 大屏幕缩放 - 屏幕宽度大于1680px */
    @media (min-width: 1681px) {
        top: 12px * @large-screen-scale;
        width: 216px * @large-screen-scale;
        height: 59px * @large-screen-scale;
        left: 255px * @large-screen-scale;
    }
}

// 桌面端导航
.desktop-nav {
    margin: 0 auto;
    padding-right: 60px;
    font-size: 22px;
    display: flex;
    gap: 85px;

    // 当任何非active的nav-link被hover时，隐藏所有active的横线
    &:hover .nav-link:not(:hover).active::after {
        display: none;
    }
}

.nav-link {
    color: white;
    transition: all 0.3s ease;
    text-decoration: none;
    position: relative;
    display: inline-block;
    

    // Hover 放大效果（不包括active的元素）
    &:not(.active):hover {
        transform: scale(1.1);
    }

    // 默认显示isFrom对应的横线
    &.active::after {
        content: "";
        position: absolute;
        bottom: -14px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 4px;
        background-color: #fff;
        border-radius: 1px;
        @media (min-width: 1681px) {
            width: 40px * @large-screen-scale;
            height: 4px * @large-screen-scale;
            bottom: -10px * @large-screen-scale;
        }
    }

    // 当hover非active菜单时显示hover菜单的横线
    &:not(.active):hover::after {
        content: "";
        position: absolute;
        bottom: -14px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 4px;
        background-color: #fff;
        border-radius: 1px;
        animation: slideIn 0.3s ease-out;
        @media (min-width: 1681px) {
            width: 40px * @large-screen-scale;
            height: 4px * @large-screen-scale;
            bottom: -10px * @large-screen-scale;
        }
    }

    // 下划线动画
    @keyframes slideIn {
        from {
            width: 0;
        }
        to {
            width: 40px;
        }
    }
}

// 下拉菜单容器
.nav-dropdown {
    position: relative;
    display: inline-block;

    // 扩大hover区域，减少意外关闭
    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: -20px;
        right: -20px;
        height: 10px;
        background: transparent;
        z-index: 99999;
    }
}

.dropdown-trigger {
    position: relative;

    &::after {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        margin-left: 8px;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid white;
        vertical-align: middle;
    }
}

// 下拉菜单
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: white;
    border-radius: 8px;
    min-width: 190px;
    z-index: 999999;
    opacity: 1;
    visibility: visible;
    transition: all 0.2s ease;

    background: #ffffff;
    box-sizing: border-box;
    border: 1px solid #dbdfec;
    box-shadow: -5px 0px 10px 0px rgba(190, 190, 190, 0.25),
        5px 5px 10px 0px rgba(190, 190, 190, 0.25);

    // 添加小三角形
    &::before {
        content: "";
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid white;
    }
}

.dropdown-item {
    display: block;
    padding: 15px 20px;
    color: #2e4057;
    text-decoration: none;
    font-size: 18px;
    transition: all 0.2s ease;
    border-bottom: 1px solid #d8d8d8;
    font-weight: normal;
    margin: 0 10px;
    text-align: center;
    cursor: pointer;

    &:hover {
        background-color: #fffade;
        font-weight: 500;
    }
    &.active {
        background-color: #fffade;
        font-weight: 500;
    }
    // &:first-child {
    //     background-color: #fffade;
    //     font-weight: 500;
    // }
    &:last-child {
        border-bottom: none;
    }
}

// 桌面端按钮
.desktop-buttons {
    display: none;
    align-items: center;
    gap: 1rem;
    width: 200px;

    @media (min-width: 768px) {
        display: flex;
    }
}

.login-button {
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    color: white;
    transition: color 0.3s ease;
    text-decoration: none;
}

.register-button {
    padding: 0.25rem 0.5rem;
    border: 1px solid white;
    border-radius: 0.375rem;
    color: white;
    transition: color 0.3s ease;
    text-decoration: none;
}

// 移动端菜单按钮
.mobile-menu-button {
    display: block;
    color: white;
    background: none;
    border: none;
    cursor: pointer;

    &:focus {
        outline: none;
    }

    @media (min-width: 768px) {
        display: none;
    }
}

.menu-icon {
    width: 1.5rem;
    height: 1.5rem;
}

// 移动端菜单
.mobile-menu {
    display: block;
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 1rem 0;

    @media (min-width: 768px) {
        display: none;
    }
}

.mobile-menu-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 1.5rem;
}

.mobile-nav-link {
    color: white;
    transition: color 0.3s ease;
    padding: 0.5rem 0;
    text-decoration: none;

    &:hover {
        color: #f97316;
    }
}

.mobile-menu-buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid #4b5563;
}

.mobile-login-button {
    padding: 0.5rem 1rem;
    text-align: center;
    border-radius: 0.375rem;
    border: 1px solid #f97316;
    color: #f97316;
    transition: all 0.3s ease;
    text-decoration: none;

    &:hover {
        background-color: #f97316;
        color: white;
    }
}

.mobile-register-button {
    padding: 0.5rem 1rem;
    text-align: center;
    border-radius: 0.375rem;
    background-color: #f97316;
    color: white;
    transition: background-color 0.3s ease;
    text-decoration: none;

    &:hover {
        background-color: #ea580c;
    }
}
</style>
