<template>
    <div class="program-header-component">
        <!-- 搜索区域 -->
        <div class="header-container">
            <img src="/assets/image/Logo2.png" alt="logo" class="logo" />
            <div class="search-container">
                <input
                    type="text"
                    class="search-input"
                    placeholder="ENTER THE NAME OF A UNIVERSITY OR A PROGRAM"
                    :value="searchQuery"
                    @input="handleSearchInput"
                />
                <img
                    src="/assets/image/Program/SearchIcon.png"
                    alt="search"
                    class="search-icon"
                />
            </div>
        </div>

        <!-- 导航区域 -->
        <nav
            class="program-navigation"
            @mouseleave="handleMouseLeave"
            @mouseenter="handleMouseEnter"
        >
            <div class="nav-container">
                <!-- Desktop Navigation -->
                <div class="nav-links">
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
                            handleNavClick(
                                'Successful Cases',
                                '/successful-cases'
                            )
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
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { isMobileDevice } from "@/utils/common.js";
import baiduAnalytics from "@/utils/baidu-analytics";

export default {
    name: "ProgramHeader",
    props: {
        isFrom: {
            type: String,
            default: "Program",
        },
        searchQuery: {
            type: String,
            default: "",
        },
    },
    emits: ["search"],
    setup(props, { emit }) {
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

        // 搜索输入处理
        const handleSearchInput = (event) => {
            emit("search", event.target.value);
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

        // 处理鼠标离开navigation区域
        const handleMouseLeave = () => {
            showGuidesDropdown.value = false;
        };

        // 鼠标进入navigation时的处理
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

        onMounted(() => {
            document.addEventListener("click", handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener("click", handleClickOutside);
        });

        return {
            showGuidesDropdown,
            dropdownRef,
            handleMouseLeave,
            handleMouseEnter,
            handleDropdownEnter,
            handleDropdownLeave,
            handleGuideClick,
            handleNavClick,
            handleSearchInput,
        };
    },
};
</script>

<style lang="less" scoped>
.program-header-component {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.header-container {
    width: 100%;
    height: 80px;
    background: #ff6b35;
    margin-left: auto;
    margin-right: auto;
    // padding-left: 400px;
    // padding-right: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.search-container {
    position: relative;
    display: flex;
    align-items: center;
    width: 593px;
    height: 50px;
    border-radius: 227px;
    margin: 0 auto;
    background: #ffffff;
    box-sizing: border-box;
    border: 1px solid #ffffff;
}

.search-input {
    width: 559px;
    height: 42px;
    padding: 0 20px;
    border-radius: 20px;
    border: none;
    outline: none;
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: normal;
    line-height: 22px;
    display: flex;
    align-items: center;
    letter-spacing: normal;
    color: #2e4057;

    &::placeholder {
        font-family: PingFang SC;
        font-size: 20px;
        font-weight: normal;
        line-height: 22px;
        display: flex;
        align-items: center;
        letter-spacing: normal;
        color: #dbdfec;
    }
}

.search-icon {
    position: absolute;
    right: 16px;
    width: 24px;
    height: 24px;
    pointer-events: none;
}

.logo {
    position: absolute;
    left: 160px;
    width: 216px;
    height: 59px;
    cursor: pointer;
    z-index: 100;
}

.program-navigation {
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0px 4px 10px 0px #f0f0f0;
    height: 80px;
    padding: 0 260px;

    // 当整个navigation被hover时，显示激活菜单的下划线
    &:hover {
        .nav-link.active::after {
            content: "";
            position: absolute;
            bottom: -14px;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 4px;
            background-color: #ff6b35;
            border-radius: 1px;
            animation: slideIn 0.3s ease-out;
        }
    }
}

.nav-container {
    width: 100%;
    // max-width: 1200px;
    margin: 0 auto;
   // padding: 0 260px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
}

.nav-links {
    display: flex;
    gap: 60px;
    font-size: 22px;

    // 当任何非active的nav-link被hover时，隐藏所有active的横线
    &:hover .nav-link:not(:hover).active::after {
        display: none;
    }
}

.nav-link {
    color: #333333;
    transition: all 0.3s ease;
    text-decoration: none;
    position: relative;
    display: inline-block;
    font-weight: 500;

    // Hover 放大效果（不包括active的元素）
    &:not(.active):hover {
        transform: scale(1.05);
        color: #ff6b35;
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
        background-color: #ff6b35;
        border-radius: 1px;
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
        background-color: #ff6b35;
        border-radius: 1px;
        animation: slideIn 0.3s ease-out;
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

// 下拉菜单
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(8px);
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
        border-bottom: 8px solid #ff6b35;
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
        color: #ff6b35;
    }

    &.active {
        background-color: #fffade;
        font-weight: 500;
        color: #ff6b35;
    }

    &:last-child {
        border-bottom: none;
    }
}

// 响应式设计
@media (max-width: 1024px) {
    .nav-links {
        gap: 40px;
        font-size: 16px;
    }
}

@media (max-width: 768px) {
    .nav-container {
        padding: 0 20px;
    }

    .nav-links {
        gap: 20px;
        font-size: 14px;
    }
}
</style>
