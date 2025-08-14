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
                            <span class="title-text">{{
                                programDetail.course_name
                            }}</span>
                            <span
                                class="scholarship-badge"
                                v-if="programDetail.has_scholarship"
                            >
                                Scholarship
                            </span>
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
                                            v-if="
                                                index === currentSlide ||
                                                index ===
                                                    (currentSlide + 1) %
                                                        programDetail
                                                            .university_images
                                                            .length ||
                                                preloadedImages.has(image)
                                            "
                                            :src="image"
                                            :alt="`${
                                                programDetail.university_name
                                            } - Image ${index + 1}`"
                                            @load="
                                                () => preloadedImages.add(image)
                                            "
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
                        <div
                            v-if="
                                programDetail.introduction &&
                                programDetail.introduction.trim()
                            "
                            class="section school-introduction"
                        >
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
                            <table class="fee-table-wrapper">
                                <thead>
                                    <tr>
                                        <th class="left-header">
                                            Billionaires
                                        </th>
                                        <th class="right-header"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(feeKey, index) in Object.keys(
                                            programDetail.fee_str
                                        )"
                                        :key="feeKey"
                                        :class="{
                                            'yellow-row': index % 2 === 0,
                                        }"
                                    >
                                        <td class="left-cell">
                                            <div
                                                class="table-font"
                                                style="
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: center;
                                                "
                                            >
                                                <div>
                                                    {{ formatFeeLabel(feeKey) }}
                                                </div>
                                                <div
                                                    style="
                                                        display: flex;
                                                        align-items: center;
                                                        justify-content: center;
                                                    "
                                                >
                                                    <a-tooltip
                                                        v-if="
                                                            feeKey.includes(
                                                                'service_fee'
                                                            )
                                                        "
                                                        placement="top"
                                                        overlay-class-name="service-fee-tooltip"
                                                        trigger="hover"
                                                    >
                                                        <template #title>
                                                            <div
                                                                class="tooltip-content"
                                                            >
                                                                Explanation of
                                                                Study Abroad
                                                                Application
                                                                Service Fees<br /><br />

                                                                I. Basic
                                                                Administrative
                                                                Fee
                                                                (Mandatory)<br />
                                                                - A 54 USD fee
                                                                is required
                                                                upfront for all
                                                                application
                                                                programs, which
                                                                covers:<br />
                                                                &nbsp;&nbsp;&nbsp;-
                                                                Basic
                                                                administrative
                                                                costs, document
                                                                preparation, and
                                                                submission fees
                                                                during the
                                                                application
                                                                process;<br />
                                                                &nbsp;&nbsp;&nbsp;-
                                                                Full scholarship
                                                                application
                                                                services (no
                                                                additional
                                                                charges).<br /><br /><br />

                                                                II. Application
                                                                Guarantee and
                                                                Secondary
                                                                Service<br />
                                                                - If the
                                                                application to
                                                                the first school
                                                                fails, we will
                                                                apply to a
                                                                second school
                                                                for you free of
                                                                charge, with no
                                                                need to pay an
                                                                additional basic
                                                                fee.<br /><br /><br />

                                                                III. Rules for
                                                                Remaining
                                                                Service Fees
                                                                (Charged after
                                                                Successful
                                                                Application)<br />
                                                                1. No
                                                                scholarship
                                                                awarded: The
                                                                remaining fee
                                                                will be charged
                                                                after
                                                                successfully
                                                                receiving an
                                                                admission
                                                                letter, based on
                                                                the specific
                                                                application
                                                                program (details
                                                                can be consulted
                                                                with your
                                                                advisor).<br />
                                                                2. Scholarship
                                                                awarded:<br />
                                                                &nbsp;&nbsp;&nbsp;-
                                                                Full
                                                                scholarship: The
                                                                remaining fee is
                                                                1,000 USD;<br />
                                                                &nbsp;&nbsp;&nbsp;-
                                                                Partial
                                                                scholarship: The
                                                                remaining fee is
                                                                600 USD.<br /><br /><br />

                                                                Note: All fee
                                                                details are
                                                                transparent and
                                                                verifiable, with
                                                                no hidden
                                                                charges during
                                                                the application
                                                                process. For any
                                                                questions, feel
                                                                free to contact
                                                                your dedicated
                                                                advisor for
                                                                clarification.
                                                            </div>
                                                        </template>
                                                        <QuestionCircleOutlined
                                                            class="service-fee-icon"
                                                        />
                                                    </a-tooltip>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="right-cell">
                                            <div
                                                class="table-font cell-content"
                                            >
                                                <template
                                                    v-if="
                                                        programDetail.fee_str[
                                                            feeKey
                                                        ] &&
                                                        typeof programDetail
                                                            .fee_str[feeKey] ===
                                                            'string' &&
                                                        programDetail.fee_str[
                                                            feeKey
                                                        ].includes(';')
                                                    "
                                                >
                                                    <ul class="fee-list">
                                                        <li
                                                            v-for="(
                                                                item, itemIndex
                                                            ) in programDetail.fee_str[
                                                                feeKey
                                                            ].split(';')"
                                                            :key="itemIndex"
                                                        >
                                                            {{ item.trim() }}
                                                        </li>
                                                    </ul>
                                                </template>
                                                <template v-else>
                                                    {{
                                                        programDetail.fee_str[
                                                            feeKey
                                                        ] || "-"
                                                    }}
                                                </template>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
                                <ul v-if="formattedRequirements.length > 0">
                                    <li
                                        v-for="(
                                            req, index
                                        ) in formattedRequirements"
                                        :key="index"
                                    >
                                        <template
                                            v-if="typeof req === 'string'"
                                        >
                                            {{ req }}
                                        </template>
                                        <template v-else>
                                            {{ req.main }}
                                            <ul v-if="req.sub">
                                                <li
                                                    v-for="(
                                                        subReq, subIndex
                                                    ) in req.sub"
                                                    :key="subIndex"
                                                >
                                                    {{ subReq }}
                                                </li>
                                            </ul>
                                        </template>
                                    </li>
                                </ul>
                                <div v-else class="no-requirements">
                                    No specific documents required
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 右侧信息栏 -->
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
                    <div class="why-choose-zimo-title">Why choose Zimo?</div>
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

        <!-- 推荐相似项目 -->
        <div v-if="similarPrograms.length > 0" class="section similar-programs">
            <div class="section-header">
                <img
                    src="/assets/image/Program/Detail/RecommendedIcon.png"
                    class="recommended-icon"
                    alt="Recommended Similar Items"
                />
                <div class="section-header-text">Recommended similar items</div>
            </div>
            <div class="similar-programs-list">
                <div
                    v-for="program in displayedSimilarPrograms"
                    :key="program.course_id"
                    class="similar-program-card"
                    @click="goToProgramDetail(program.course_id)"
                >
                    <div class="card-header">
                        <div class="similar-program-logo">
                            <img
                                :src="
                                    program.logo_url || programDetail.logo_url
                                "
                                :alt="program.university_name"
                            />
                        </div>
                        <div class="similar-program-info">
                            <div class="similar-program-title">
                                {{ program.course_name }}
                            </div>
                            <div class="similar-program-university">
                                {{ program.university_name }}
                            </div>
                        </div>
                    </div>
                    <div class="similar-program-details">
                        <div class="similar-detail-row">
                            <div class="similar-detail-label">Tuition</div>
                            <div class="similar-detail-label">Start Date</div>
                        </div>
                        <div class="similar-detail-row">
                            <div class="similar-detail-value">
                                {{ formatTuition(program.tuition_fee_rmb) }}
                            </div>
                            <div class="similar-detail-value">
                                {{ program.starting_date }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="shouldShowViewMore" class="view-more">
                <div class="view-more-btn" @click="showMoreSimilarPrograms">
                    View more items
                </div>
            </div>
        </div>

        <!-- 加载状态 -->
        <div v-else-if="isLoading" class="loading-container">
            <div class="loading-spinner"></div>
            <p>Loading program details...</p>
        </div>
    </div>
    <AboutUs v-if="!isLoading" :is-from-detail="true" />
    <Footer v-if="!isLoading" :is-from-detail="true" />
</template>

<script>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProgramHeader from "./components/ProgramHeader.vue";
import LazyImage from "@/components/LazyImage.vue";
import baiduAnalytics from "@/utils/baidu-analytics";
import { setSEO } from "@/utils/seo.js";
import { searchStore } from "@/store/searchStore.js";
import AboutUs from "../home/components/AboutUs/index.vue";
import Footer from "../home/components/Footer/index.vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
// import { Tooltip } from "ant-design-vue"; // 使用 a-tooltip 全局组件

// 导入API工具函数
import { apiGet, apiPost } from "@/utils/api.js";

export default {
    name: "ProgramDetail",
    components: {
        ProgramHeader,
        LazyImage,
        AboutUs,
        Footer,
        QuestionCircleOutlined,
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
        const showAllSimilarPrograms = ref(false); // 是否显示所有相似项目

        // 计算显示的相似项目
        const displayedSimilarPrograms = computed(() => {
            if (
                showAllSimilarPrograms.value ||
                similarPrograms.value.length <= 3
            ) {
                return similarPrograms.value;
            }
            return similarPrograms.value.slice(0, 3);
        });

        // 是否显示"View more items"按钮
        const shouldShowViewMore = computed(() => {
            return (
                similarPrograms.value.length > 3 &&
                !showAllSimilarPrograms.value
            );
        });

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
            if (
                images[nextIndex] &&
                !preloadedImages.value.has(images[nextIndex])
            ) {
                preloadImage(images[nextIndex]).catch(console.error);
            }

            // 预加载下下张图片
            if (total > 2) {
                const nextNextIndex = (currentSlide.value + 2) % total;
                if (
                    images[nextNextIndex] &&
                    !preloadedImages.value.has(images[nextNextIndex])
                ) {
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

                    // 使用HTML表格后不再需要手动同步高度

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
                    if (
                        result.data.university_images &&
                        result.data.university_images.length > 0
                    ) {
                        // 立即预加载第一张图片
                        preloadImage(result.data.university_images[0]).catch(
                            console.error
                        );

                        // 预加载第二张图片（如果存在）
                        if (result.data.university_images.length > 1) {
                            setTimeout(() => {
                                preloadImage(
                                    result.data.university_images[1]
                                ).catch(console.error);
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
            // 新开页面跳转到项目详情
            window.open(`/program/${id}`, "_blank");
        };

        // 显示更多相似项目
        const showMoreSimilarPrograms = () => {
            showAllSimilarPrograms.value = true;
            baiduAnalytics.trackEvent(
                "program_detail",
                "view_more_similar_programs",
                programDetail.value?.course_name,
                1
            );
        };

        // 格式化费用标签
        const formatFeeLabel = (feeKey) => {
            return feeKey
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());
        };

        // 格式化学费显示
        const formatTuition = (tuition) => {
            if (!tuition) return "-";
            return `${tuition.toLocaleString()} RMB`;
        };

        // 表格现在使用HTML表格布局，不再需要手动同步高度

        // 使用HTML表格后不再需要手动处理窗口大小变化

        onMounted(() => {
            fetchProgramDetail();
            fetchSimilarPrograms();
        });

        // 使用HTML表格后不再需要监听变化同步高度

        // 确保在组件销毁时清除定时器
        onUnmounted(() => {
            // 清除轮播定时器
            if (slideInterval.value) {
                clearInterval(slideInterval.value);
            }
            // 清除搜索防抖定时器
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
        });

        return {
            programDetail,
            similarPrograms,
            displayedSimilarPrograms,
            shouldShowViewMore,
            isLoading,
            error,
            applicantsCount,
            searchQuery,
            expandedSections,
            toggleSection,
            applyNow,
            handleSearch,
            goToProgramDetail,
            showMoreSimilarPrograms,
            currentSlide,
            setSlide,
            prevSlide,
            nextSlide,
            stopAutoSlide,
            resumeAutoSlide,
            isHovering, // 暴露 isHovering 状态
            formatFeeLabel,
            formatTuition,
            preloadedImages, // 暴露预加载图片集合

            // 格式化申请要求
            formattedRequirements: computed(() => {
                if (!programDetail.value?.requirements) return [];

                const reqText = programDetail.value.requirements;
                const requirements = [];

                // 首先尝试按数字序号分割（如：1. 2. 3.）
                let sentences = reqText
                    .split(/(?=\d+\.\s)/)
                    .map((s) => s.trim())
                    .filter((s) => s.length > 0);

                // 如果没有数字序号，尝试按句子分割文本，支持多种分隔符
                if (sentences.length <= 1) {
                    sentences = reqText
                        .split(/[.。;；\n]/)
                        .map((s) => s.trim())
                        .filter((s) => s.length > 0);
                }

                // 如果分割后的句子太少，可能是一整段文字，尝试其他分割方式
                if (sentences.length <= 2) {
                    // 尝试按照常见的需求关键词分割
                    sentences = reqText
                        .split(
                            /(?=Healthy|A master|Under \d+|Applicants for|Applicants without|Entrance)/i
                        )
                        .map((s) => s.trim())
                        .filter((s) => s.length > 0);
                }

                // 处理每个句子/段落
                sentences.forEach((sentence) => {
                    const cleanSentence = sentence
                        .replace(/^[^\w\u4e00-\u9fa5]+/, "")
                        .trim();
                    if (cleanSentence.length < 5) return; // 忽略太短的片段

                    // 直接处理带数字序号的要求
                    if (/^\d+\.\s/.test(cleanSentence)) {
                        // 检查是否包含子要求（如HSK级别要求）
                        if (
                            /\([^)]+\)/.test(cleanSentence) &&
                            cleanSentence.includes("(1)") &&
                            cleanSentence.includes("(2)")
                        ) {
                            // 分离主要要求和子要求
                            const parts = cleanSentence.split(/(?=\(\d+\))/);
                            const mainReq = parts[0].trim();
                            const subReqs = parts
                                .slice(1)
                                .map((part) => part.trim())
                                .filter((part) => part.length > 0);

                            if (subReqs.length > 0) {
                                requirements.push({
                                    main: mainReq,
                                    sub: subReqs,
                                });
                                return;
                            }
                        }

                        // 普通的数字序号要求
                        requirements.push(cleanSentence);
                        return;
                    }

                    // 国籍要求
                    if (
                        /healthy.*foreign.*nationals?/i.test(cleanSentence) ||
                        /non-chinese.*citizens?/i.test(cleanSentence)
                    ) {
                        requirements.push(
                            "Healthy foreign nationals (Non-Chinese citizens)"
                        );
                        return;
                    }

                    // 学历要求
                    if (
                        /master.*degree/i.test(cleanSentence) ||
                        /bachelor.*degree/i.test(cleanSentence) ||
                        /undergraduate/i.test(cleanSentence)
                    ) {
                        const degreeMatch = cleanSentence.match(
                            /(master|bachelor|undergraduate).*?(degree|diploma)/i
                        );
                        if (degreeMatch) {
                            let degreeText = cleanSentence;
                            // 提取学科领域信息
                            if (
                                /medicine|pharmacy|science/i.test(cleanSentence)
                            ) {
                                const fieldMatch = cleanSentence.match(
                                    /on\s+(medicine|pharmacy|[\w\s]+science)/i
                                );
                                if (fieldMatch) {
                                    degreeText = `${degreeMatch[0]} in ${fieldMatch[1]} or related field`;
                                }
                            }
                            requirements.push(
                                degreeText.charAt(0).toUpperCase() +
                                    degreeText.slice(1)
                            );
                        }
                        return;
                    }

                    // 年龄要求
                    if (/under \d+.*years?.*age/i.test(cleanSentence)) {
                        const ageMatch = cleanSentence.match(
                            /under (\d+).*years?.*age/i
                        );
                        if (ageMatch) {
                            requirements.push(
                                `Under ${ageMatch[1]} years of age`
                            );
                        }
                        return;
                    }

                    // 语言要求 - HSK
                    if (/hsk.*level/i.test(cleanSentence)) {
                        const hskMatch =
                            cleanSentence.match(/hsk.*level\s*(\d+)/i);
                        const scoreMatch =
                            cleanSentence.match(/(\d+)\s*points/i);
                        if (hskMatch && scoreMatch) {
                            requirements.push({
                                main: "Chinese Language Proficiency:",
                                sub: [
                                    `HSK Level ${hskMatch[1]} with minimum ${scoreMatch[1]} points`,
                                ],
                            });
                        }
                        return;
                    }

                    // 语言要求 - TOEFL/IELTS
                    if (/toefl|ielts/i.test(cleanSentence)) {
                        const subRequirements = [];
                        if (/toefl/i.test(cleanSentence)) {
                            const toeflMatch =
                                cleanSentence.match(/toefl.*?(\d+)/i);
                            if (toeflMatch) {
                                subRequirements.push(
                                    `TOEFL minimum ${toeflMatch[1]}`
                                );
                            }
                        }
                        if (/ielts/i.test(cleanSentence)) {
                            const ieltsMatch =
                                cleanSentence.match(/ielts.*?([\d.]+)/i);
                            if (ieltsMatch) {
                                subRequirements.push(
                                    `IELTS minimum ${ieltsMatch[1]}`
                                );
                            }
                        }
                        if (subRequirements.length > 0) {
                            requirements.push({
                                main: "English Language Certificate:",
                                sub: subRequirements,
                            });
                        }
                        return;
                    }

                    // 学术背景要求
                    if (
                        /tcm.*background|traditional.*chinese.*medicine/i.test(
                            cleanSentence
                        )
                    ) {
                        requirements.push(
                            "Traditional Chinese Medicine background (preferred)"
                        );
                        return;
                    }

                    // 研究能力要求
                    if (
                        /self-study.*research|academic.*research/i.test(
                            cleanSentence
                        )
                    ) {
                        requirements.push(
                            "Self-study and academic research abilities"
                        );
                        return;
                    }

                    // 入学考试
                    if (/entrance.*exam|mock.*test/i.test(cleanSentence)) {
                        requirements.push("Entrance examination or mock test");
                        return;
                    }

                    // 通用文档要求关键词
                    if (/transcript/i.test(cleanSentence)) {
                        requirements.push("Academic Transcripts");
                        return;
                    }
                    if (/passport/i.test(cleanSentence)) {
                        requirements.push("Valid Passport");
                        return;
                    }
                    if (
                        /health.*certificate|medical.*report/i.test(
                            cleanSentence
                        )
                    ) {
                        requirements.push("Health Certificate");
                        return;
                    }
                    if (
                        /character.*reference|recommendation.*letter/i.test(
                            cleanSentence
                        )
                    ) {
                        requirements.push(
                            "Character Reference or Recommendation Letter"
                        );
                        return;
                    }

                    // 如果是较长的描述性文本，尝试提取关键信息
                    if (
                        cleanSentence.length > 50 &&
                        cleanSentence.length < 200
                    ) {
                        // 如果包含多个关键信息，作为一个完整要求
                        if (
                            /applicants|students|candidates/i.test(
                                cleanSentence
                            )
                        ) {
                            requirements.push(cleanSentence);
                        }
                    }
                });

                // 如果没有提取到任何要求，返回原始文本作为单个要求
                if (requirements.length === 0) {
                    return [reqText];
                }

                // 去重
                const uniqueRequirements = [];
                const seen = new Set();

                requirements.forEach((req) => {
                    const key = typeof req === "string" ? req : req.main;
                    if (!seen.has(key)) {
                        seen.add(key);
                        uniqueRequirements.push(req);
                    }
                });

                return uniqueRequirements;
            }),
        };
    },
};
</script>

<style lang="less" scoped>
.program-detail-container {
    padding: 210px 260px 40px 260px;
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
            font-size: 24px;
            font-weight: 600;
            color: #2e4057;
            display: block;
            position: relative;
            max-height: 68px; // 两行的高度
            overflow: hidden;

            .title-text {
                display: inline;
                background: white;
                position: relative;
                margin-right: 6px;
            }

            .scholarship-badge {
                z-index: 2;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                height: 28px;
                background-color: #88afe9;
                border-radius: 4px;
                font-size: 14px;
                font-weight: 500;
                color: #ffffff;
                padding: 0 10px;
                white-space: nowrap;
                position: relative;
                top: -4px;
            }
        }

        .university-name {
            font-size: 18px;
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
    width: 100%;

    .table-font {
        font-family: PingFang SC;
        font-size: 18px;
        font-weight: normal;
        line-height: 1.4;
        text-align: center;
        letter-spacing: 0em;
        font-variation-settings: "opsz" auto;
        color: #2e4057;
    }

    .fee-table-wrapper {
        width: 100%;
        border-collapse: separate;
        border-spacing: 20px 0; /* 添加列之间的间距 */
        table-layout: fixed;

        th,
        td {
            padding: 0;
            margin: 0;
            vertical-align: middle;
        }

        th {
            height: 73px;
            background: #ff6b35;
            color: #ffffff;
            font-family: PingFang SC;
            font-size: 22px;
            font-weight: 600;
            text-align: center;
            border-bottom: 4px solid #ffffff;
        }

        .left-header {
            width: 300px;
            border-radius: 18px 18px 0 0;
        }

        .right-header {
            width: 520px;
            border-radius: 18px 18px 0 0;
        }

        td {
            border-bottom: 4px solid #ffffff;
            border-top: 4px solid #ffffff;
            background: #fffdf5;
            min-height: 60px; /* 设置单元格最小高度 */
            height: auto; /* 允许高度自动增长 */
            vertical-align: middle;
        }

        /* 为最后一行添加圆角 */
        tr:last-child .left-cell {
            border-radius: 0 0 18px 18px;
        }

        tr:last-child .right-cell {
            border-radius: 0 0 18px 18px;
        }

        .left-cell {
            width: 300px;
            padding: 10px 15px;
            text-align: center;
        }

        .right-cell {
            width: 520px;
            padding: 10px 15px;
            text-align: center;
        }

        .yellow-row td {
            background: #fffade;
        }

        .cell-content {
            white-space: normal;
            word-break: break-word;
            padding: 5px 0;
            font-weight: 500; /* 稍微加粗右侧内容 */

            .fee-list {
                list-style-type: none;
                padding: 0;
                margin: 0;
                text-align: left;

                li {
                    margin-bottom: 10px;
                    position: relative;
                    padding-left: 15px;
                    line-height: 1.4;

                    &:before {
                        content: "•";
                        position: absolute;
                        left: 0;
                        color: #ff6b35;
                    }

                    &:last-child {
                        margin-bottom: 0;
                    }
                }
            }
        }

        .service-fee-icon {
            margin-left: 10px;
            display: flex;
            align-items: center;
            justify-content: center;

            color: #ff6b35;
            font-size: 18px;
            cursor: pointer;

            &:hover {
                color: #e55a2b;
            }
        }
    }
}

/* 移除重复的样式代码，已在下方单独的 style 块中定义 */

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

        .no-requirements {
            font-family: PingFang SC;
            font-size: 20px;
            font-weight: 300;
            line-height: normal;
            color: #666;
            font-style: italic;
            padding: 10px 0;
        }
    }
}

.similar-programs {
    width: 100%;
    // margin: 60px auto 0;
    // padding: 0 260px;

    .similar-programs-list {
        margin-top: 30px;
        display: flex;
        gap: 20px;

        .similar-program-card {
            cursor: pointer;
            width: 453px;
            height: 200px;
            border-radius: 10px;
            background: #ffffff;

            box-sizing: border-box;
            /* grey 03 */
            border: 1px solid #dbdfec;

            box-shadow: -5px 0px 10px 0px rgba(190, 190, 190, 0.25),
                5px 5px 10px 0px rgba(190, 190, 190, 0.25);

            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px;

            &:hover {
                transform: translateY(-3px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                border-color: #ff6b35;
            }

            .card-header {
                display: flex;
                align-items: flex-start;
                gap: 20px;
                margin-bottom: 20px;

                .similar-program-logo {
                    width: 68px;
                    height: 68px;
                    border-radius: 50%;
                    overflow: hidden;
                    border: 1px solid #e8e8e8;
                    flex-shrink: 0;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }

                .similar-program-info {
                    flex: 1;
                    height: 68px;
                    min-width: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding-bottom: 5px;

                    .similar-program-title {
                        font-family: PingFang SC;
                        font-size: 18px;
                        font-weight: 500;
                        line-height: normal;
                        letter-spacing: 0em;

                        font-variation-settings: "opsz" auto;
                        color: #2e4057;
                    }

                    .similar-program-university {
                        font-family: PingFang SC;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: normal;
                        letter-spacing: 0em;

                        font-variation-settings: "opsz" auto;
                        color: #3a3e48;
                    }
                }
            }

            .similar-program-details {
                padding-left: 88px;
                .similar-detail-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 10px;

                    &:last-child {
                        margin-bottom: 0;
                    }

                    .similar-detail-label {
                        font-family: PingFang SC;
                        font-size: 14px;
                        font-weight: normal;
                        line-height: normal;
                        letter-spacing: 0em;

                        font-variation-settings: "opsz" auto;
                        color: #3a3e48;
                    }

                    .similar-detail-value {
                        font-family: PingFang SC;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: normal;
                        text-align: right;
                        letter-spacing: 0em;

                        font-variation-settings: "opsz" auto;
                        color: #3a3e48;
                    }
                }
            }
        }
    }

    .view-more {
        text-align: left;
        margin-top: 30px;

        .view-more-btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 172px;
            height: 44px;
            border-radius: 4px;
            opacity: 1;
            gap: 10px;
            cursor: pointer;
            transition: all 0.3s ease;

            box-sizing: border-box;
            border: 1px solid #ff6b35;
            font-family: PingFang SC;
            font-size: 18px;
            font-weight: normal;
            line-height: 24px;
            letter-spacing: 0px;

            font-variation-settings: "opsz" auto;
            color: #ff6b35;

            &:hover {
                background-color: #ff6b35;
                color: white;
                transform: translateY(-1px);
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

/* 单元格内容样式已移至表格定义中 */

// 大屏幕缩放比例
@large-screen-ratio: 0.6;

/* 大屏幕字体缩放和尺寸调整 - 屏幕宽度大于1680px时 */
@media (min-width: 1681px) {
    .program-detail-container {
        padding: 180px 260px 40px 260px;
        max-width: 1680px;
        margin: 0 auto;
    }

    .content-container {
        padding: 0 40px;
        gap: 0px; // 原 40px
        //space-around
        justify-content: space-between;
    }

    .left-content {
        width: floor(1050px * @large-screen-ratio); // 原 872px
    }

    .right-sidebar {
        width: floor(600px * @large-screen-ratio); // 原 488px

        .info-card {
            padding: floor(30px * @large-screen-ratio)
                floor(20px * @large-screen-ratio); // 原 30px 20px
            margin-bottom: floor(30px * @large-screen-ratio); // 原 30px

            .info-row {
                margin-bottom: floor(20px * @large-screen-ratio); // 原 20px
                line-height: floor(28px * @large-screen-ratio); // 原 28px

                .info-label {
                    font-size: floor(22px * @large-screen-ratio); // 原 20px
                }

                .info-value {
                    font-size: floor(20px * @large-screen-ratio); // 原 18px
                }
            }

            .apply-now-button {
                height: floor(56px * @large-screen-ratio); // 原 56px
                font-size: floor(22px * @large-screen-ratio); // 原 22px
                line-height: floor(24px * @large-screen-ratio); // 原 24px
            }

            .applicants-count {
                font-size: floor(18px * @large-screen-ratio); // 原 18px
            }
        }

        .why-choose-zimo {
            padding: 0 floor(20px * @large-screen-ratio); // 原 0 20px

            .why-choose-zimo-title {
                font-size: floor(30px * @large-screen-ratio); // 原 28px
                margin-bottom: floor(30px * @large-screen-ratio); // 原 30px
            }

            .benefit-item {
                margin-bottom: floor(20px * @large-screen-ratio); // 原 20px

                img {
                    width: floor(20px * @large-screen-ratio); // 原 20px
                    height: floor(20px * @large-screen-ratio); // 原 20px
                }

                .benefit-text {
                    font-size: floor(22px * @large-screen-ratio); // 原 20px
                    line-height: floor(28px * @large-screen-ratio); // 原 28px
                }
            }
        }
    }

    .program-header {
        margin-bottom: floor(30px * @large-screen-ratio); // 原 30px
        height: floor(120px * @large-screen-ratio); // 原 120px
        gap: floor(30px * @large-screen-ratio); // 原 30px

        .university-logo {
            width: floor(120px * @large-screen-ratio); // 原 120px
        }

        .program-info {
            gap: 3px; // 原 7px

            .program-title {
                font-size: floor(28px * @large-screen-ratio); // 原 28px
                max-height: 46px;

                .title-text {
                    margin-right: floor(6px * @large-screen-ratio); // 原 6px
                }

                .scholarship-badge {
                    height: floor(28px * @large-screen-ratio); // 原 28px
                    font-size: floor(14px * @large-screen-ratio); // 原 14px
                    padding: 0 floor(10px * @large-screen-ratio); // 原 0 10px
                    top: floor(-4px * @large-screen-ratio); // 原 -4px
                }
            }

            .university-name {
                font-size: floor(22px * @large-screen-ratio); // 原 22px
            }
        }
    }

    .program-detail-content {
        gap: floor(30px * @large-screen-ratio); // 原 30px

        .left-content {
            .university-image {
                height: floor(374px * @large-screen-ratio); // 原 374px
                margin-bottom: floor(40px * @large-screen-ratio); // 原 40px
            }
        }
    }

    .section {
        margin-bottom: floor(60px * @large-screen-ratio); // 原 60px

        .section-header {
            margin-bottom: floor(15px * @large-screen-ratio); // 原 15px
            gap: floor(23.25px * @large-screen-ratio); // 原 23.25px

            img {
                width: floor(21.82px * @large-screen-ratio); // 原 21.82px
                height: floor(24.83px * @large-screen-ratio); // 原 24.83px
            }

            .recommended-icon {
                width: floor(28px * @large-screen-ratio); // 原 28px
                height: floor(28px * @large-screen-ratio); // 原 28px
            }

            .project-icon {
                width: floor(28px * @large-screen-ratio); // 原 28px
                height: floor(21px * @large-screen-ratio); // 原 21px
            }

            .accommodation-icon {
                width: floor(28px * @large-screen-ratio); // 原 28px
                height: floor(28px * @large-screen-ratio); // 原 28px
            }

            .admissions-process-icon {
                width: floor(28px * @large-screen-ratio); // 原 28px
                height: floor(28px * @large-screen-ratio); // 原 28px
            }

            .section-header-text {
                font-size: floor(24px * @large-screen-ratio); // 原 22px
                height: floor(31px * @large-screen-ratio); // 原 31px
            }
        }

        .section-content {
            font-size: floor(22px * @large-screen-ratio); // 原 20px
            line-height: floor(32px * @large-screen-ratio); // 原 32px
            max-height: floor(240px * @large-screen-ratio); // 原 240px

            &.expanded {
                max-height: floor(2000px * @large-screen-ratio); // 原 2000px
            }

            &:not(.expanded)::after {
                height: floor(80px * @large-screen-ratio); // 原 80px
            }
        }

        .show-more {
            height: floor(40px * @large-screen-ratio); // 原 40px
            padding-bottom: floor(12px * @large-screen-ratio); // 原 12px
            font-size: floor(20px * @large-screen-ratio); // 原 20px
        }
    }

    .fees-table {
        margin-bottom: floor(60px * @large-screen-ratio); // 原 60px

        .table-font {
            font-size: floor(20px * @large-screen-ratio); // 原 18px
        }

        .fee-table-wrapper {
            border-spacing: floor(20px * @large-screen-ratio) 0; // 原 20px

            th {
                height: floor(73px * @large-screen-ratio); // 原 73px
                font-size: floor(22px * @large-screen-ratio); // 原 22px
            }

            .left-header {
                width: floor(300px * @large-screen-ratio); // 原 300px
            }

            .right-header {
                width: floor(520px * @large-screen-ratio); // 原 520px
            }

            .left-cell {
                width: floor(300px * @large-screen-ratio); // 原 300px
                padding: floor(10px * @large-screen-ratio)
                    floor(15px * @large-screen-ratio); // 原 10px 15px
            }

            .right-cell {
                width: floor(520px * @large-screen-ratio); // 原 520px
                padding: floor(10px * @large-screen-ratio)
                    floor(15px * @large-screen-ratio); // 原 10px 15px
            }

            .service-fee-icon {
                margin-left: floor(10px * @large-screen-ratio); // 原 10px
                font-size: floor(18px * @large-screen-ratio); // 原 18px
            }
        }
    }

    .admissions-process {
        margin-bottom: floor(60px * @large-screen-ratio); // 原 60px

        .process-steps {
            margin: floor(40px * @large-screen-ratio) 0; // 原 40px

            .step {
                gap: floor(20px * @large-screen-ratio); // 原 20px

                .step-number {
                    width: floor(65px * @large-screen-ratio); // 原 65px
                    height: floor(65px * @large-screen-ratio); // 原 65px
                    font-size: floor(30px * @large-screen-ratio); // 原 30px
                }

                .step-name {
                    font-size: floor(20px * @large-screen-ratio); // 原 20px
                }
            }

            .step-line {
                margin-top: floor(32px * @large-screen-ratio); // 原 32px
            }
        }

        .required-documents {
            .required-documents-title {
                font-size: floor(22px * @large-screen-ratio); // 原 22px
                margin-bottom: floor(20px * @large-screen-ratio); // 原 20px
            }

            ul {
                padding-left: floor(30px * @large-screen-ratio); // 原 30px

                li {
                    font-size: floor(20px * @large-screen-ratio); // 原 20px

                    &::marker {
                        font-size: floor(16px * @large-screen-ratio); // 原 16px
                    }
                }
            }

            .no-requirements {
                font-size: floor(20px * @large-screen-ratio); // 原 20px
                padding: floor(10px * @large-screen-ratio) 0; // 原 10px 0
            }
        }
    }

    .similar-programs {
        padding: 0 120px;
        .similar-programs-list {
            margin-top: floor(30px * @large-screen-ratio); // 原 30px
            gap: floor(40px * @large-screen-ratio); // 原 20px

            .similar-program-card {
                width: floor(473px * @large-screen-ratio); // 原 453px
                height: floor(220px * @large-screen-ratio); // 原 200px
                padding: floor(20px * @large-screen-ratio); // 原 20px

                .card-header {
                    gap: floor(20px * @large-screen-ratio); // 原 20px
                    margin-bottom: floor(20px * @large-screen-ratio); // 原 20px

                    .similar-program-logo {
                        width: floor(90px * @large-screen-ratio); // 原 68px
                        height: floor(90px * @large-screen-ratio); // 原 68px
                    }

                    .similar-program-info {
                        height: floor(68px * @large-screen-ratio); // 原 68px

                        .similar-program-title {
                            font-size: floor(
                                20px * @large-screen-ratio
                            ); // 原 18px
                        }

                        .similar-program-university {
                            font-size: floor(
                                16px * @large-screen-ratio
                            ); // 原 14px
                        }
                    }
                }

                .similar-program-details {
                    padding-left: floor(88px * @large-screen-ratio); // 原 88px

                    .similar-detail-row {
                        margin-bottom: floor(
                            10px * @large-screen-ratio
                        ); // 原 10px

                        .similar-detail-label {
                            font-size: floor(
                                16px * @large-screen-ratio
                            ); // 原 14px
                        }

                        .similar-detail-value {
                            font-size: floor(
                                16px * @large-screen-ratio
                            ); // 原 14px
                        }
                    }
                }
            }
        }

        .view-more {
            margin-top: floor(30px * @large-screen-ratio); // 原 30px

            .view-more-btn {
                width: floor(172px * @large-screen-ratio); // 原 172px
                height: floor(44px * @large-screen-ratio); // 原 44px
                font-size: floor(18px * @large-screen-ratio); // 原 18px
                line-height: floor(24px * @large-screen-ratio); // 原 24px
            }
        }
    }

    .loading-container,
    .error-container {
        height: floor(400px * @large-screen-ratio); // 原 400px

        .loading-spinner {
            width: floor(40px * @large-screen-ratio); // 原 40px
            height: floor(40px * @large-screen-ratio); // 原 40px
            margin-bottom: floor(20px * @large-screen-ratio); // 原 20px
        }

        p {
            font-size: floor(18px * @large-screen-ratio); // 原 18px
        }
    }

    .carousel-indicators {
        bottom: floor(10px * @large-screen-ratio); // 原 10px
        gap: floor(8px * @large-screen-ratio); // 原 8px

        .indicator {
            width: floor(10px * @large-screen-ratio); // 原 10px
            height: floor(10px * @large-screen-ratio); // 原 10px
        }
    }

    .carousel-controls button {
        padding: floor(10px * @large-screen-ratio); // 原 10px
        font-size: floor(24px * @large-screen-ratio); // 原 24px
        width: floor(40px * @large-screen-ratio); // 原 40px
        height: floor(40px * @large-screen-ratio); // 原 40px
    }

    .carousel-controls .prev-btn {
        left: floor(10px * @large-screen-ratio); // 原 10px
    }

    .carousel-controls .next-btn {
        right: floor(10px * @large-screen-ratio); // 原 10px
    }

    /* 大屏幕下的 Tooltip 样式缩放已移动到单独的 style 块 */
}
</style>

<style>
/* Tooltip 全局样式 */
.service-fee-tooltip .ant-tooltip-inner {
    max-width: 904px !important;
    width: 904px !important;
    min-height: 554px !important;
    background-color: #2d2d2d !important;
    border-radius: 8px !important;
    padding: 30px !important;
    font-family: "PingFang SC", sans-serif !important;
}

.service-fee-tooltip .ant-tooltip-arrow::before {
    background-color: #2d2d2d !important;
}

.service-fee-tooltip .tooltip-content {
    font-family: "PingFang SC", sans-serif;
    font-size: 16px;
    font-weight: 300;
    line-height: normal;
    letter-spacing: 0em;
    font-variation-settings: "opsz" auto;
    color: #ffffff;
    text-align: left;
}

/* 大屏幕下的 Tooltip 样式缩放 */
@media (min-width: 1681px) {
    .service-fee-tooltip .ant-tooltip-inner {
        max-width: 542px !important; /* 904px * 0.6 */
        width: 542px !important;
        min-height: 332px !important; /* 554px * 0.6 */
        padding: 18px !important; /* 30px * 0.6 */
    }

    .service-fee-tooltip .tooltip-content {
        font-size: 10px; /* 16px * 0.6 */
    }
}
</style>
