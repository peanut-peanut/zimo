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
            <img src="/assets/image/Logo2.png" alt="logo" class="logo" />

            <!-- Desktop Navigation -->
            <nav class="desktop-nav">
                <a
                    href="/"
                    class="nav-link"
                    :class="{ active: isFrom === 'Home' }"
                    >Home</a
                >
                <a
                    href="/program"
                    class="nav-link"
                    target="_blank"
                    :class="{ active: isFrom === 'Program' }"
                    >Program</a
                >

                <a
                    href="/successful-cases"
                    class="nav-link"
                    :class="{ active: isFrom === 'successful-cases' }"
                    target="_blank"
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
                        @click.prevent="toggleGuidesDropdown"
                        >Guides</a
                    >
                    <div
                        v-if="showGuidesDropdown"
                        class="dropdown-menu"
                        @click.stop
                    >
                        <a
                            href="/guides/study-in-china"
                            class="dropdown-item"
                            target="_blank"
                            :class="{ active: isFrom === 'Study in China' }"
                            >Study in China</a
                        >
                        <a
                            href="/guides/cities"
                            class="dropdown-item"
                            target="_blank"
                            :class="{ active: isFrom === 'Cities' }"
                            >Cities</a
                        >
                        <a
                            href="/guides/universities"
                            class="dropdown-item"
                            target="_blank"
                            :class="{ active: isFrom === 'Universities' }"
                            >Universities</a
                        >
                        <a
                            href="/guides/scholarships"
                            class="dropdown-item"
                            target="_blank"
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
                    >About Us</a
                >
                <a
                    href="/apply-now"
                    class="nav-link"
                    :class="{ active: isFrom === 'ApplyNow' }"
                    target="_blank"
                    >Apply Now</a
                >
            </nav>
        </div>
    </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
    name: "Header",
    props: {
        isFrom: {
            type: String,
            default: "Home",
        },
    },
    setup(props) {
        console.log(props.isFrom);
        const isScrolled = ref(false);

        const showGuidesDropdown = ref(false);
        const dropdownRef = ref(null);

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

        // 处理窗口失去焦点时关闭下拉菜单（解决iframe点击问题）
        const handleWindowBlur = () => {
            showGuidesDropdown.value = false;
        };

        // 处理鼠标离开header区域
        const handleMouseLeave = () => {
            // 使用短暂延迟，避免鼠标快速移动时意外关闭
            setTimeout(() => {
                if (showGuidesDropdown.value) {
                    showGuidesDropdown.value = false;
                }
            }, 200);
        };

        // 鼠标进入header时取消关闭
        const handleMouseEnter = () => {
            // 这里可以用来取消延迟关闭，但由于我们使用setTimeout，这里主要是占位
        };

        const headerStyle = {
            height: "90px",
            background:
                "linear-gradient(180deg, #383838 0%, rgba(56, 56, 56, 0) 94%)",
        };

        onMounted(() => {
            window.addEventListener("scroll", handleScroll);
            document.addEventListener("click", handleClickOutside);
            window.addEventListener("blur", handleWindowBlur);

            // 定期检查iframe是否被激活
            const checkIframeInteraction = () => {
                const iframes = document.querySelectorAll("iframe");
                iframes.forEach((iframe) => {
                    // 检查iframe是否获得焦点
                    if (document.activeElement === iframe) {
                        showGuidesDropdown.value = false;
                    }

                    // 监听iframe的鼠标进入事件
                    iframe.addEventListener("mouseenter", () => {
                        showGuidesDropdown.value = false;
                    });
                });
            };

            // 立即检查一次
            checkIframeInteraction();

            // 定期检查（每500ms）
            const intervalId = setInterval(checkIframeInteraction, 500);

            // 存储intervalId以便在组件卸载时清理
            window.headerIntervalId = intervalId;
        });

        onUnmounted(() => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("blur", handleWindowBlur);

            // 清理定时器
            if (window.headerIntervalId) {
                clearInterval(window.headerIntervalId);
                delete window.headerIntervalId;
            }
        });

        return {
            isScrolled,
            showGuidesDropdown,
            toggleGuidesDropdown,
            headerStyle,
            dropdownRef,
            handleMouseLeave,
            handleMouseEnter,
        };
    },
};
</script>

<style lang="less" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
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
}

.logo {
    position: absolute;
    // top: -30px;
    left: 160px;
    width: 216px;
    height: 59px;
    cursor: pointer;
    z-index: 100;
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
    }

    // 下划线动画
    @keyframes slideIn {
        from {
            width: 0;
        }
        to {
            width: 40p x;
        }
    }
}

// 下拉菜单容器
.nav-dropdown {
    position: relative;
    display: inline-block;
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
    transform: translateX(-50%) translateY(20px);
    background: white;
    border-radius: 8px;
    //padding: 12px 0;
    min-width: 190px;
    z-index: 100;

    background: #ffffff;
    box-sizing: border-box;
    /* grey 03 */
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
