<template>
    <div class="program-detail-container">
        <ProgramHeader
            :isFrom="'Program'"
            :searchQuery="searchQuery"
            @search="handleSearch"
        />

        <div class="content-container" v-if="programDetail">
            <div class="left-content">
                <!-- 项目基本信息 -->
                <div class="program-header">
                    <div class="university-logo">
                        <img
                            :src="programDetail.logo_url"
                            :alt="programDetail.university_name"
                        />
                    </div>
                    <div class="program-info">
                        <h1 class="program-title">
                            {{ programDetail.course_name }}
                        </h1>
                        <div class="university-name">
                            {{ programDetail.university_name }}
                        </div>
                    </div>
                </div>

                <!-- 项目详情信息 -->
                <div class="program-detail-content">
                    <!-- 左侧大图和介绍内容 -->
                    <div class="left-content">
                        <div class="university-image">
                            <!-- 图片轮播 -->
                            <div
                                class="carousel-container"
                                @mouseenter="stopAutoSlide"
                                @mouseleave="resumeAutoSlide"
                            >
                                <!-- 调试信息 -->
                                <div class="debug-info" v-if="false">
                                    悬停状态: {{ isHovering ? "是" : "否" }}
                                </div>
                                <!-- 轮播图片 -->
                                <div class="carousel-slides">
                                    <div
                                        v-for="(
                                            image, index
                                        ) in programDetail.university_images ||
                                        []"
                                        :key="index"
                                        class="carousel-slide"
                                        :class="{
                                            active: currentSlide === index,
                                        }"
                                    >
                                        <!-- 当前显示的图片和下一张图片使用普通img，其他使用LazyImage -->
                                        <img
                                            v-if="index === currentSlide || index === (currentSlide + 1) % programDetail.university_images.length || preloadedImages.has(image)"
                                            :src="image"
                                            :alt="`${
                                                programDetail.university_name
                                            } - Image ${index + 1}`"
                                            @load="() => preloadedImages.add(image)"
                                        />
                                        <LazyImage
                                            v-else
                                            :src="image"
                                            :alt="`${
                                                programDetail.university_name
                                            } - Image ${index + 1}`"
                                            aspect-ratio="42.9%" 
                                        />
                                    </div>

                                    <!-- 如果没有图片，显示默认图片 -->
                                    <div
                                        v-if="
                                            !programDetail.university_images ||
                                            programDetail.university_images
                                                .length === 0
                                        "
                                        class="carousel-slide active"
                                    >
                                        <img
                                            src="/assets/image/Program/NoContentImage.png"
                                            :alt="programDetail.university_name"
                                        />
                                    </div>
                                </div>

                                <!-- 轮播指示器 -->
                                <div
                                    class="carousel-indicators"
                                    v-if="
                                        programDetail.university_images &&
                                        programDetail.university_images.length >
                                            1
                                    "
                                >
                                    <span
                                        v-for="(
                                            _, index
                                        ) in programDetail.university_images"
                                        :key="index"
                                        class="indicator"
                                        :class="{
                                            active: currentSlide === index,
                                        }"
                                        @click="setSlide(index)"
                                    ></span>
                                </div>

                                <!-- 轮播控制按钮 -->
                                <!-- <div 
                                    class="carousel-controls" 
                                    v-if="programDetail.university_images && programDetail.university_images.length > 1"
                                >
                                    <button class="prev-btn" @click="prevSlide">&lt;</button>
                                    <button class="next-btn" @click="nextSlide">&gt;</button>
                                </div> -->
                            </div>
                        </div>

                        <!-- 学校介绍 -->
                        <div class="section school-introduction">
                            <div class="section-header">
                                <img
                                    src="/assets/image/Program/Detail/SchoolIntroductionIcon.png"
                                    alt="School Introduction"
                                />
                                <div class="section-header-text">
                                    School Introduction
                                </div>
                            </div>
                            <div
                                class="section-content"
                                v-html="programDetail.introduction"
                                :class="{
                                    expanded: expandedSections.introduction,
                                }"
                            ></div>
                            <div
                                class="show-more"
                                @click="toggleSection('introduction')"
                                v-if="!expandedSections.introduction"
                            >
                                Show more
                            </div>
                        </div>

                        <!-- 项目介绍 -->
                        <div
                            class="section project-introduction"
                            v-if="
                                programDetail.program_desc &&
                                programDetail.program_desc.trim()
                            "
                        >
                            <div class="section-header">
                                <img
                                    src="/assets/image/Program/Detail/ProjectIntroductionIcon.png"
                                    alt="Project Introduction"
                                    class="project-icon"
                                />
                                <div class="section-header-text">
                                    Project Introduction
                                </div>
                            </div>
                            <div
                                class="section-content"
                                v-html="programDetail.program_desc"
                                :class="{
                                    expanded: expandedSections.program,
                                }"
                            ></div>
                            <div
                                class="show-more"
                                @click="toggleSection('program')"
                                v-if="!expandedSections.program"
                            >
                                Show more
                            </div>
                        </div>

                        <!-- 住宿信息 -->
                        <div
                            class="section accommodation"
                            v-if="
                                programDetail.accommodation &&
                                programDetail.accommodation.trim()
                            "
                        >
                            <div class="section-header">
                                <img
                                    src="/assets/image/Program/Detail/AccommodationIcon.png"
                                    alt="Accommodation"
                                    class="accommodation-icon"
                                />
                                <div class="section-header-text">
                                    Accommodation
                                </div>
                            </div>
                            <div
                                class="section-content"
                                :class="{
                                    expanded: expandedSections.accommodation,
                                }"
                                v-html="programDetail.accommodation"
                            ></div>
                            <div
                                class="show-more"
                                @click="toggleSection('accommodation')"
                                v-if="!expandedSections.accommodation"
                            >
                                Show more
                            </div>
                        </div>

                        <!-- 费用表格 -->
                        <div
                            class="fees-table"
                            v-if="
                                programDetail.fee_str &&
                                Object.keys(programDetail.fee_str).length > 0
                            "
                        >
                            <div class="left-table">
                                <div class="table-header">Billionaires</div>
                                <div
                                    v-for="(feeKey, index) in Object.keys(
                                        programDetail.fee_str
                                    )"
                                    :key="feeKey"
                                    class="table-cell table-font"
                                    :class="{ yellow: index % 2 === 0 }"
                                >
                                    {{ formatFeeLabel(feeKey) }}
                                </div>
                            </div>
                            <div class="right-table">
                                <div class="table-header"></div>
                                <div
                                    v-for="(feeKey, index) in Object.keys(
                                        programDetail.fee_str
                                    )"
                                    :key="feeKey"
                                    class="table-cell table-font"
                                    :class="{ yellow: index % 2 === 0 }"
                                >
                                    <div
                                        class="cell-content"
                                        :title="programDetail.fee_str[feeKey]"
                                    >
                                        {{ programDetail.fee_str[feeKey] }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 申请流程 -->
                        <div class="section admissions-process">
                            <div class="section-header">
                                <img
                                    src="/assets/image/Program/Detail/AdmissionsProcessIcon.png"
                                    alt="Admissions Process"
                                    class="admissions-process-icon"
                                />
                                <div class="section-header-text">
                                    Admissions Process
                                </div>
                            </div>

                            <div class="process-steps">
                                <div class="step">
                                    <div class="step-number">1</div>
                                    <div class="step-name">CHOOSE PROGRAMS</div>
                                </div>
                                <div class="step-line"></div>
                                <div class="step">
                                    <div class="step-number">2</div>
                                    <div class="step-name">APPLY ONLINE</div>
                                </div>
                                <div class="step-line second-step"></div>
                                <div class="step">
                                    <div class="step-number">3</div>
                                    <div class="step-name">ENROLL IN CHINA</div>
                                </div>
                            </div>

                            <div class="required-documents">
                                <div class="required-documents-title">
                                    Required Documents:
                                </div>
                                <ul>
                                    <li>
                                        Supplemental Information Form: Dalian
                                        Medical University
                                    </li>
                                    <li>Bank Statement</li>
                                    <li>No Criminal Record Certificate</li>
                                    <li>Medical Examination Form</li>
                                    <li>English Language Certificate</li>
                                    <li>
                                        Your Highest Academic Transcript (In
                                        English/Your Graduation Certificate (In
                                        English)
                                    </li>
                                    <li>Your Photograph</li>
                                    <li>Your Passport Copy</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- 右侧信息栏 -->
                </div>

                <!-- 推荐相似项目 -->
                <div v-if="similarPrograms.length > 0" class="section similar-programs">
                    <div class="section-header">
                        <img
                            src="/assets/image/Program/Detail/RecommendedIcon.png"
                            class="recommended-icon"
                            alt="Recommended Similar Items"
                        />
                        <div class="section-header-text">
                            Recommended similar items
                        </div>
                    </div>
                    <div class="similar-programs-list">
                        <div
                            v-for="program in similarPrograms"
                            :key="program.course_id"
                            class="similar-program-card"
                            @click="goToProgramDetail(program.course_id)"
                        >
                            <div class="similar-program-logo">
                                <img
                                    :src="
                                        program.logo_url ||
                                        '/assets/image/Logo.png'
                                    "
                                    :alt="program.university_name"
                                />
                            </div>
                            <div class="similar-program-info">
                                <h3 class="similar-program-title">
                                    {{ program.course_name }}
                                </h3>
                                <div class="similar-program-university">
                                    {{ program.university_name }}
                                </div>
                            </div>
                            <div class="similar-program-details">
                                <div class="similar-detail-row">
                                    <div class="similar-detail-label">
                                        Tuition
                                    </div>
                                    <div class="similar-detail-value">
                                        {{
                                            program.tuition_fee_rmb.toLocaleString()
                                        }}
                                        RMB
                                    </div>
                                </div>
                                <div class="similar-detail-row">
                                    <div class="similar-detail-label">
                                        Start Date
                                    </div>
                                    <div class="similar-detail-value">
                                        {{ program.starting_date }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="view-more">
                        <a href="/program">View more items</a>
                    </div>
                </div>
            </div>

            <div class="right-sidebar">
                <div class="info-card">
                    <div class="info-row">
                        <div class="info-label">Admission time：</div>
                        <div class="info-value">
                            {{ programDetail.starting_date }}
                        </div>
                    </div>
                    <!-- <div class="info-row">
                        <div class="info-label">Application fee：</div>
                        <div class="info-value">50 USD</div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Service charge：</div>
                        <div class="info-value">50 USD</div>
                    </div> -->
                    <div class="info-row">
                        <div class="info-label">Application deadline：</div>
                        <div class="info-value">
                            {{ programDetail.application_deadline }}
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Tuition fee：</div>
                        <div class="info-value">
                            {{ programDetail.tuition_fee_rmb.toLocaleString() }}
                            per year
                            <!-- <br />
                            {{
                                (
                                    (programDetail.tuition_fee_rmb *
                                        programDetail.duration.split(" ")[0]) /
                                    7
                                )
                                    .toFixed(2)
                                    .toLocaleString()
                            }}
                            USD in total -->
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Study duration：</div>
                        <div class="info-value">
                            {{ programDetail.duration }}
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">Language of instruction：</div>
                        <div class="info-value">
                            {{ programDetail.language }}
                        </div>
                    </div>
                    <div class="info-row">
                        <div class="info-label">School location：</div>
                        <div class="info-value">
                            {{ programDetail.city }}
                        </div>
                    </div>

                    <button class="apply-now-button" @click="applyNow">
                        APPLY NOW
                    </button>

                    <!-- <div class="applicants-count">
                        {{ applicantsCount }} students applied for this program
                    </div> -->
                </div>

                <div class="why-choose-zimo">
                    <div class="why-choose-zimo-title">Why choose zimo?</div>
                    <div class="benefit-item">
                        <img
                            src="/assets/image/Program/Detail/FinishIcon.png"
                            alt="Check"
                        />
                        <span class="benefit-text"
                            >Boost Your Acceptance Rate</span
                        >
                    </div>
                    <div class="benefit-item">
                        <img
                            src="/assets/image/Program/Detail/FinishIcon.png"
                            alt="Check"
                        />
                        <span class="benefit-text"
                            >Easy Online Application</span
                        >
                    </div>
                    <div class="benefit-item">
                        <img
                            src="/assets/image/Program/Detail/FinishIcon.png"
                            alt="Check"
                        />
                        <span class="benefit-text"
                            >Thousands of international students use Zimo with
                            4.9 star reviews</span
                        >
                    </div>
                    <div class="benefit-item">
                        <img
                            src="/assets/image/Program/Detail/FinishIcon.png"
                            alt="Check"
                        />
                        <span class="benefit-text"
                            >A vast network of partners</span
                        >
                    </div>
                </div>
            </div>
        </div>

        <!-- 加载状态 -->
        <div v-else-if="isLoading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading program details...</p>
        </div>

        <!-- 错误状态 -->
        <div v-else class="error-container">
            <p>Sorry, we couldn't find the program you're looking for.</p>
            <a href="/program">Back to Programs</a>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProgramHeader from "./components/ProgramHeader.vue";
import LazyImage from "@/components/LazyImage.vue";
import baiduAnalytics from "@/utils/baidu-analytics";
import { setSEO } from "@/utils/seo.js";
import { searchStore } from "@/store/searchStore.js";
// 导入API工具函数
import { apiGet, apiPost } from "@/utils/api.js";

export default {
    name: "ProgramDetail",
    components: {
        ProgramHeader,
        LazyImage,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const programId = computed(() => route.params.id);

        const programDetail = ref(null);
        const similarPrograms = ref([]);
        const isLoading = ref(true);
        const error = ref(null);
        const applicantsCount = ref(Math.floor(Math.random() * 500) + 500); // 随机生成申请人数
        const searchQuery = ref(""); // 搜索查询字符串
        let searchTimeout = null; // 搜索防抖定时器

        // 控制内容展开收起
        const expandedSections = ref({
            introduction: false,
            program: false,
            accommodation: false,
        });

        // 图片轮播相关
        const currentSlide = ref(0);
        const slideInterval = ref(null);
        const isHovering = ref(false);
        const preloadedImages = ref(new Set()); // 已预加载的图片集合

        const startAutoSlide = () => {
            if (slideInterval.value) {
                clearInterval(slideInterval.value);
            }

            // 只有当不在悬停状态时才启动轮播
            if (
                !isHovering.value &&
                programDetail.value?.university_images?.length > 1
            ) {
                slideInterval.value = setInterval(nextSlide, 4000); // 每4秒切换一次
                console.log("轮播已启动");
            }
        };

        const stopAutoSlide = () => {
            isHovering.value = true;
            console.log("停止轮播，isHovering:", isHovering.value);
            if (slideInterval.value) {
                clearInterval(slideInterval.value);
                console.log("轮播已暂停");
            }
        };

        const resumeAutoSlide = () => {
            isHovering.value = false;
            console.log("恢复轮播，isHovering:", isHovering.value);
            startAutoSlide();
            console.log("轮播已恢复");
        };

        const setSlide = (index) => {
            currentSlide.value = index;
            // 点击指示器时暂停轮播
            stopAutoSlide();
        };

        const prevSlide = () => {
            if (programDetail.value?.university_images?.length > 1) {
                currentSlide.value =
                    (currentSlide.value -
                        1 +
                        programDetail.value.university_images.length) %
                    programDetail.value.university_images.length;
                // 点击按钮时暂停轮播
                stopAutoSlide();
            }
        };

        const nextSlide = () => {
            if (programDetail.value?.university_images?.length > 1) {
                currentSlide.value =
                    (currentSlide.value + 1) %
                    programDetail.value.university_images.length;
                
                // 预加载下一张图片
                preloadNextImages();
                
                // 自动轮播时不需要停止，但手动点击时需要暂停
                if (isHovering.value) {
                    stopAutoSlide();
                }
            }
        };

        // 预加载图片函数
        const preloadImage = (src) => {
            return new Promise((resolve, reject) => {
                if (preloadedImages.value.has(src)) {
                    resolve();
                    return;
                }
                
                const img = new Image();
                img.onload = () => {
                    preloadedImages.value.add(src);
                    resolve();
                };
                img.onerror = reject;
                img.src = src;
            });
        };

        // 预加载下一张和下下张图片
        const preloadNextImages = () => {
            if (!programDetail.value?.university_images?.length) return;
            
            const images = programDetail.value.university_images;
            const total = images.length;
            
            // 预加载下一张图片
            const nextIndex = (currentSlide.value + 1) % total;
            if (images[nextIndex] && !preloadedImages.value.has(images[nextIndex])) {
                preloadImage(images[nextIndex]).catch(console.error);
            }
            
            // 预加载下下张图片
            if (total > 2) {
                const nextNextIndex = (currentSlide.value + 2) % total;
                if (images[nextNextIndex] && !preloadedImages.value.has(images[nextNextIndex])) {
                    preloadImage(images[nextNextIndex]).catch(console.error);
                }
            }
        };

        // 获取项目详情
        const fetchProgramDetail = async () => {
            try {
                isLoading.value = true;
                const result = await apiGet(`/api/courses/${programId.value}`);

                if (result.success) {
                    programDetail.value = result.data;

                    // 设置SEO信息
                    setSEO("programDetail", {
                        title: `${result.data.course_name} - ${result.data.university_name}`,
                        description:
                            result.data.program_desc?.substring(0, 150) ||
                            `Study ${result.data.course_name} at ${result.data.university_name} in ${result.data.city}, China`,
                        keywords: `${result.data.course_name}, ${result.data.university_name}, study in China, ${result.data.city}, ${result.data.category_name} program`,
                    });

                    // 上报百度统计
                    baiduAnalytics.trackEvent(
                        "program_detail",
                        "view",
                        result.data.course_name,
                        1
                    );

                    // 预加载前几张图片
                    if (result.data.university_images && result.data.university_images.length > 0) {
                        // 立即预加载第一张图片
                        preloadImage(result.data.university_images[0]).catch(console.error);
                        
                        // 预加载第二张图片（如果存在）
                        if (result.data.university_images.length > 1) {
                            setTimeout(() => {
                                preloadImage(result.data.university_images[1]).catch(console.error);
                            }, 100);
                        }
                        
                        // 如果有多张图片，启动轮播
                        if (result.data.university_images.length > 1) {
                            setTimeout(() => {
                                startAutoSlide();
                            }, 500);
                        }
                    }
                } else {
                    error.value =
                        result.error || "Failed to load program details";
                }
            } catch (err) {
                console.error("Error fetching program details:", err);
                error.value = "An error occurred while loading program details";
            } finally {
                isLoading.value = false;
            }
        };

        // 获取相似项目
        const fetchSimilarPrograms = async () => {
            try {
                const result = await apiGet(
                    `/api/courses/similar/${programId.value}`
                );

                if (result.success) {
                    similarPrograms.value = result.data;

                    // 上报百度统计
                    baiduAnalytics.trackEvent(
                        "similar_programs",
                        "load",
                        `for_program_${programId.value}`,
                        result.data.length
                    );
                }
            } catch (err) {
                console.error("Error fetching similar programs:", err);
            }
        };

        // 切换内容展开收起
        const toggleSection = (section) => {
            expandedSections.value[section] = !expandedSections.value[section];

            // 上报展开/收起事件
            baiduAnalytics.trackEvent(
                "program_detail",
                "toggle_section",
                section,
                expandedSections.value[section] ? 1 : 0
            );
        };

        // 申请按钮点击
        const applyNow = () => {
            baiduAnalytics.trackEvent(
                "program_detail",
                "apply_now_click",
                programDetail.value?.course_name,
                1
            );
            //
            window.open("/apply-now", "_blank");
        };

        // 搜索处理 - 带防抖功能
        const handleSearch = (query) => {
            searchQuery.value = query; // 更新搜索查询状态
            
            // 清除之前的定时器
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            
            // 如果查询为空，不进行跳转
            if (!query.trim()) {
                return;
            }
            
            // 设置新的定时器，等待用户停止输入1000ms后执行跳转
            searchTimeout = setTimeout(() => {
                baiduAnalytics.trackEvent("program_detail", "search", query, 1);
                // 保存搜索内容到store
                searchStore.setSearchQuery(query.trim());
                // 跳转到Program页面
                router.push("/program");
            }, 1000);
        };

        // 跳转到其他项目详情页
        const goToProgramDetail = (id) => {
            baiduAnalytics.trackEvent(
                "program_detail",
                "similar_program_click",
                `program_${id}`,
                1
            );
            router.push(`/program/${id}`);
        };

        // 格式化费用标签
        const formatFeeLabel = (feeKey) => {
            return feeKey
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());
        };

        onMounted(() => {
            fetchProgramDetail();
            fetchSimilarPrograms();
        });

        // 确保在组件销毁时清除定时器
        onUnmounted(() => {
            if (slideInterval.value) {
                clearInterval(slideInterval.value);
            }
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        });

        return {
            programDetail,
            similarPrograms,
            isLoading,
            error,
            applicantsCount,
            searchQuery,
            expandedSections,
            toggleSection,
            applyNow,
            handleSearch,
            goToProgramDetail,
            currentSlide,
            setSlide,
            prevSlide,
            nextSlide,
            stopAutoSlide,
            resumeAutoSlide,
            isHovering, // 暴露 isHovering 状态
            formatFeeLabel,
            preloadedImages, // 暴露预加载图片集合
        };
    },
};
</script>

<style lang="less" scoped>
.program-detail-container {
    padding: 220px 260px 100px 260px;
    background-color: #fff;
}

.content-container {
    width: 100%;
    margin: 0 auto;
    display: flex;
    gap: 40px;
}
.left-content {
    width: 872px;
}

.right-sidebar {
    width: 488px;

    .info-card {
        margin-top: 10px;
        background-color: #fff;

        border: 1px solid #dbdfec;

        box-shadow: -5px 0px 10px 0px rgba(190, 190, 190, 0.25),
            5px 5px 10px 0px rgba(190, 190, 190, 0.25);
        border-radius: 10px;
        padding: 30px 20px;
        margin-bottom: 30px;
        .info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            line-height: 28px;

            .info-label {
                color: #2e4057;
                font-size: 20px;
                font-weight: 500;
            }

            .info-value {
                color: #2e4057;
                font-weight: 300;
                font-size: 18px;
                text-align: right;
            }
        }

        .apply-now-button {
            margin-top: 20px;
            width: 100%;
            height: 56px;
            border-radius: 4px;
            background-color: #ff6b35;
            color: white;
            border: none;
            font-size: 22px;
            line-height: 24px;
            font-weight: 550;
            letter-spacing: 0px;

            font-variation-settings: "opsz" auto;
            color: #ffffff;
            cursor: pointer;
            transition: background-color 0.3s;

            &:hover {
                background-color: #e55a25;
            }
        }

        .applicants-count {
            margin-top: 10px;
            font-family: PingFang SC;
            font-size: 18px;
            font-weight: 300;
            line-height: normal;
            color: #2e4057;
            text-align: center;
        }
    }

    .why-choose-zimo {
        // background-color: #f9f9f9;
        //border-radius: 8px;
        padding: 0 20px;

        .why-choose-zimo-title {
            font-family: PingFang SC;
            font-size: 28px;
            font-weight: 600;
            line-height: normal;
            letter-spacing: 0em;

            font-variation-settings: "opsz" auto;
            color: #2e4057;
            margin-bottom: 30px;
        }

        .benefit-item {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 10px;
            margin-bottom: 20px;

            img {
                width: 20px;
                height: 20px;
            }

            .benefit-text {
                font-family: PingFang SC;
                font-size: 20px;
                font-weight: 500;
                line-height: 28px;
                display: flex;
                align-items: center;
                letter-spacing: 0px;

                font-variation-settings: "opsz" auto;
                color: #2e4057;
            }
        }
    }
}

.program-header {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    height: 120px;
    gap: 30px;

    .university-logo {
        width: 120px;
        height: 100%;

        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #eee;

        img {
            width: 100%;
            height: 100%;
            //  object-fit: contain;
        }
    }

    .program-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        gap: 7px;
        height: 100%;
        .program-title {
            font-size: 28px;
            font-weight: 600;
            color: #2e4057;
        }

        .university-name {
            font-size: 22px;
            font-weight: 300;
            color: #3a3e48;
        }
    }
}

.program-detail-content {
    display: flex;
    gap: 30px;

    .left-content {
        flex: 1;

        .university-image {
            width: 100%;
            height: 374px;
            margin-bottom: 40px;
            //  border-radius: 8px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
}

.section {
    margin-bottom: 60px;

    .section-header {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        gap: 23.25px;

        img {
            width: 21.82px;
            height: 24.83px;
        }

        .recommended-icon {
            width: 28px;
            height: 28px;
        }

        .project-icon {
            width: 28px;
            height: 21px;
        }

        .accommodation-icon {
            width: 28px;
            height: 28px;
        }

        .admissions-process-icon {
            width: 28px;
            height: 28px;
        }
        .section-header-text {
            font-family: PingFang SC;
            font-size: 22px;
            height: 31px;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0em;
        }
    }

    .section-content {
        font-family: PingFang SC;
        font-size: 20px;
        font-weight: 300;
        line-height: 32px;
        letter-spacing: 0.5px;
        font-variation-settings: "opsz" auto;
        color: #3d3d3d;
        position: relative;
        max-height: 240px; /* 约10行文字的高度 */
        overflow: hidden;
        transition: max-height 0.5s ease;

        &.expanded {
            max-height: 2000px; /* 足够大的值以显示全部内容 */
        }

        /* 渐变遮罩，未展开时在底部显示渐变效果 */
        &:not(.expanded)::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 80px;
            background: linear-gradient(
                to bottom,
                rgba(255, 255, 255, 0),
                rgba(255, 255, 255, 1)
            );
            pointer-events: none;
        }

        p {
            margin-bottom: 15px;
        }
    }

    .show-more {
        height: 40px;
        padding-bottom: 12px;
        width: 100%;
        font-family: PingFang SC;
        font-size: 20px;
        font-weight: 500;
        line-height: normal;
        text-align: center;
        letter-spacing: 0em;
        border-bottom: 1px solid #d8d8d8;

        font-variation-settings: "opsz" auto;
        color: #30659b;
        cursor: pointer;

        // &:hover {

        // }
    }
}

.fees-table {
    margin-bottom: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    .table-font {
        font-family: PingFang SC;
        font-size: 20px;
        font-weight: normal;
        line-height: normal;
        text-align: center;
        letter-spacing: 0em;

        font-variation-settings: "opsz" auto;
        color: #2e4057;
    }
    .table-header {
        width: 100%;
        border-radius: 18px 18px 0px 0px;
        background: #ff6b35;
        height: 73px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-width: 0px 0px 4px 0px;
        border-style: solid;
        border-color: #ffffff;
        font-family: PingFang SC;
        font-size: 22px;
        font-weight: 600;
        line-height: normal;
        text-align: center;
        letter-spacing: 0em;
        font-variation-settings: "opsz" auto;
        color: #ffffff;
    }
    .table-cell {
        background: #fffdf5;
        height: 68px;
        border-width: 4px 0px 4px 0px;
        border-style: solid;
        border-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        cursor: default;
    }

    /* 修改右侧表格单元格样式，使省略号生效 */
    .right-table .table-cell {
        width: 100%;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .yellow {
        background: #fffade;
    }
    .left-table {
        width: 313px;
        display: flex;
        flex-direction: column;
    }
    .right-table {
        width: 539px;
        display: flex;
        flex-direction: column;
    }
}

.admissions-process {
    margin-bottom: 60px;

    .process-steps {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 40px 0;

        .step {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;

            .step-number {
                width: 65px;
                height: 65px;
                border-radius: 50%;
                background-color: #ff6b35;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: PingFang SC;
                font-size: 30px;
                font-weight: 500;
                line-height: normal;
                letter-spacing: 0em;

                font-variation-settings: "opsz" auto;
                color: #ffffff;
            }

            .step-name {
                font-family: PingFang SC;
                font-size: 20px;
                font-weight: 500;
                line-height: normal;
                text-align: center;
                letter-spacing: 0em;

                font-variation-settings: "opsz" auto;
                color: #ff6b35;
            }
        }

        .step-line {
            flex: 1;
            height: 2px;
            background-image: repeating-linear-gradient(
                to right,
                #ff6b35 0px,
                #ff6b35 8px,
                transparent 8px,
                transparent 16px
            );
            margin-left: -45px;
            margin-right: -10px;

            position: relative;
            align-self: flex-start;
            margin-top: 32px; /* 65px圆圈高度的一半 - 1px线条高度的一半 = 32px */

            /* 添加箭头 */
            &::after {
                content: "";
                position: absolute;
                right: -8px;
                top: -5px;
                width: 0;
                height: 0;
                border-left: 16px solid #ff6b35;
                border-top: 6px solid transparent;
                border-bottom: 6px solid transparent;
            }

            &.second-step {
                margin-left: -10px;
                margin-right: -20px;
            }
        }
    }

    .required-documents {
        .required-documents-title {
            font-family: PingFang SC;
            font-size: 22px;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 0em;

            font-variation-settings: "opsz" auto;
            color: #3d3d3d;
            margin-bottom: 20px;
        }

        ul {
            padding-left: 30px;
            // ul 圆点的样式

            li {
                font-family: PingFang SC;
                font-size: 20px;
                font-weight: 300;
                line-height: normal;
                letter-spacing: 0em;

                font-variation-settings: "opsz" auto;
                color: #3d3d3d;
                margin-bottom: 2px;
                &::marker {
                    font-size: 16px;
                }
            }
        }
    }
}

.similar-programs {
  

    .similar-programs-list {
        display: flex;
        gap: 20px;
        overflow-x: auto;
        padding-bottom: 20px;

        .similar-program-card {
            min-width: 300px;
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 15px;
            cursor: pointer;
            transition: transform 0.3s, box-shadow 0.3s;

            &:hover {
                transform: translateY(-5px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }

            .similar-program-logo {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                overflow: hidden;
                margin-bottom: 15px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }

            .similar-program-info {
                margin-bottom: 15px;

                .similar-program-title {
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 5px;
                    color: #333;
                }

                .similar-program-university {
                    font-size: 14px;
                    color: #666;
                }
            }

            .similar-program-details {
                .similar-detail-row {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 8px;

                    .similar-detail-label {
                        font-size: 12px;
                        color: #999;
                    }

                    .similar-detail-value {
                        font-size: 12px;
                        color: #333;
                        font-weight: 500;
                    }
                }
            }
        }
    }

    .view-more {
        text-align: center;
        margin-top: 20px;

        a {
            display: inline-block;
            padding: 8px 20px;
            border: 1px solid #ff6b35;
            border-radius: 20px;
            color: #ff6b35;
            text-decoration: none;
            transition: all 0.3s;

            &:hover {
                background-color: #ff6b35;
                color: white;
            }
        }
    }
}

.loading-container,
.error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 400px;

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #ff6b35;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    p {
        font-size: 18px;
        color: #666;
    }

    a {
        margin-top: 20px;
        color: #ff6b35;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}

/* 图片轮播样式 */
.carousel-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        .carousel-indicators,
        .carousel-controls {
            opacity: 1;
            visibility: visible;
        }
    }
}

.carousel-slides {
    display: flex;
    height: 100%;
    transition: transform 0.5s ease-in-out;
}

.carousel-slide {
    min-width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity 0.5s ease-in-out;

    &.active {
        opacity: 1;
        z-index: 1;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.carousel-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;

    &.visible {
        opacity: 1;
        visibility: visible;
    }
}

.indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: background-color 0.3s;

    &.active {
        background-color: white;
    }
}

.carousel-controls {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    z-index: 10;
    pointer-events: none; /* 允许点击轮播图，但不影响指示器和按钮 */
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;

    &.visible {
        opacity: 1;
        visibility: visible;
    }
}

.carousel-controls button {
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 24px;
    line-height: 1;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto; /* 允许点击按钮 */
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
    }
}

.carousel-controls .prev-btn {
    left: 10px;
    position: absolute;
}

.carousel-controls .next-btn {
    right: 10px;
    position: absolute;
}

.cell-content {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
