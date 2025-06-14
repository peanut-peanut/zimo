<template>
    <header
        :class="[
            'header',
            { 'header-from-home': isFromHome },
            { 'header-scrolled': isScrolled },
        ]"
    >
        <div class="header-container">
            <img src="/assets/image/Logo2.png" alt="logo" class="logo"  />

            <!-- Desktop Navigation -->
            <nav class="desktop-nav">
                <a href="#" class="nav-link">Home</a>
                <a href="#programs" class="nav-link">Program</a>
                <!-- <a href="#universities" class="nav-link">Universities</a> -->
                <a href="/successful-cases" class="nav-link" target="_blank"
                    >Successful cases</a
                >
                <div class="nav-dropdown" ref="dropdownRef">
                    <a
                        href="#"
                        class="nav-link"
                        @click.prevent="toggleGuidesDropdown"
                        >Guides</a
                    >
                    <div
                        v-if="showGuidesDropdown"
                        class="dropdown-menu"
                        @click.stop
                    >
                        <a href="/guides/study-in-china" class="dropdown-item"
                            >Study in China</a
                        >
                        <a href="/guides/cities" class="dropdown-item"
                            >Cities</a
                        >
                        <a href="/guides/universities" class="dropdown-item"
                            >Universities</a
                        >
                        <a href="/guides/scholarships" class="dropdown-item"
                            >Scholarships</a
                        >
                    </div>
                </div>
                <a href="#about" class="nav-link">About Us</a>
                <a href="#contact" class="nav-link">Apply Now</a>
            </nav>

            <!-- <div class="desktop-buttons">
                <a href="/login" class="login-button">LOGIN</a>
                <a href="/register" class="register-button">REGISTER</a>
            </div> -->

            <!-- Mobile Menu Button -->
            <button class="mobile-menu-button" @click="toggleMobileMenu">
                <svg
                    v-if="isMobileMenuOpen"
                    class="menu-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
                <svg
                    v-else
                    class="menu-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isMobileMenuOpen" class="mobile-menu">
            <div class="mobile-menu-content">
                <a href="#" class="mobile-nav-link" @click="closeMobileMenu"
                    >Home</a
                >
                <a
                    href="#programs"
                    class="mobile-nav-link"
                    @click="closeMobileMenu"
                    >Programs</a
                >
                <a
                    href="#universities"
                    class="mobile-nav-link"
                    @click="closeMobileMenu"
                    >Universities</a
                >
                <a
                    href="#about"
                    class="mobile-nav-link"
                    @click="closeMobileMenu"
                    >About Us</a
                >
                <a
                    href="#contact"
                    class="mobile-nav-link"
                    @click="closeMobileMenu"
                    >Contact</a
                >

                <div class="mobile-menu-buttons">
                    <a href="/login" class="mobile-login-button">Log In</a>
                    <a href="/register" class="mobile-register-button"
                        >Register</a
                    >
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";

export default {
    name: "Header",
    props: {
        isFromHome: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const isScrolled = ref(false);
        const isMobileMenuOpen = ref(false);
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

        const toggleMobileMenu = () => {
            isMobileMenuOpen.value = !isMobileMenuOpen.value;
        };

        const closeMobileMenu = () => {
            isMobileMenuOpen.value = false;
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
            isMobileMenuOpen,
            showGuidesDropdown,
            toggleMobileMenu,
            closeMobileMenu,
            toggleGuidesDropdown,
            headerStyle,
            dropdownRef,
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
    height: 116px;
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
       // box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
    // display: none;
    margin: 0 auto;
    padding-right: 60px;
    font-size: 22px;

   display: flex;
   gap: 85px;
}

.nav-link {
    color: white;
    transition: color 0.3s ease;
    text-decoration: none;
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
    transform: translateX(-50%) translateY(10px);
    background: white;
    border-radius: 8px;
    //padding: 12px 0;
    min-width: 160px;
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
    padding: 10px 20px;
    color: #2e4057;
    text-decoration: none;
    font-size: 14px;
    transition: all 0.2s ease;
    border-bottom: 1px solid #d8d8d8;
    font-weight: normal;
    margin: 0 10px;
    text-align: center;

    &:hover {
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
