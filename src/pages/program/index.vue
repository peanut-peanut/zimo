<template>
    <div class="program-container">
        <div class="header-container">
            <img src="/assets/image/Logo2.png" alt="logo" class="logo" />
            <div class="search-container">
                <input
                    type="text"
                    class="search-input"
                    placeholder="ENTER THE NAME OF A UNIVERSITY OR A PROGRAM"
                    v-model="searchQuery"
                    @input="handleSearch"
                />
                <img
                    src="/assets/image/Program/SearchIcon.png"
                    alt="search"
                    class="search-icon"
                />
            </div>
        </div>

        <div class="apply-now-container" @click="applyNow">
            <img src="/assets/image/Program/ApplyNowIcon.png" alt="apply-now" />
        </div>

        <div class="content-container">
            <!-- 筛选区域 -->
            <div
                class="filter-sidebar"
                :class="{ 'expanded-sidebar': isAnyFilterExpanded }"
            >
                <!-- 城市筛选 -->
                <div class="filter-group">
                    <div class="filter-header" @click="toggleFilter('cities')">
                        <div class="filter-title">
                            <img
                                src="/assets/image/Program/CityIcon.png"
                                alt="City"
                                class="filter-icon"
                            />
                            City
                        </div>
                        <div class="filter-arrow">
                            <img
                                :src="
                                    expandedFilters.cities
                                        ? '/assets/image/Program/ArrowDown.png'
                                        : '/assets/image/Program/ArrowUp.png'
                                "
                                alt="Arrow"
                            />
                        </div>
                    </div>
                    <div
                        class="filter-options city-options"
                        :class="{
                            'filter-options-expanded': expandedFilters.cities,
                        }"
                    >
                        <div
                            v-for="city in sortedCities"
                            :key="city"
                            class="filter-option"
                        >
                            <input
                                type="checkbox"
                                :id="`city-${city}`"
                                :value="city"
                                v-model="selectedCities"
                            />
                            <label :for="`city-${city}`">{{ city }}</label>
                        </div>
                    </div>
                </div>

                <!-- 学习时长筛选 -->
                <div class="filter-group">
                    <div
                        class="filter-header"
                        @click="toggleFilter('durations')"
                    >
                        <div class="filter-title">
                            <img
                                src="/assets/image/Program/DurationIcon.png"
                                alt="Duration"
                                class="filter-icon"
                            />
                            Duration
                        </div>
                        <div class="filter-arrow">
                            <img
                                :src="
                                    expandedFilters.durations
                                        ? '/assets/image/Program/ArrowDown.png'
                                        : '/assets/image/Program/ArrowUp.png'
                                "
                                alt="Arrow"
                            />
                        </div>
                    </div>
                    <div
                        class="filter-options"
                        :class="{
                            'filter-options-expanded':
                                expandedFilters.durations,
                        }"
                    >
                        <div
                            v-for="duration in durations"
                            :key="duration"
                            class="filter-option"
                        >
                            <input
                                type="checkbox"
                                :id="`duration-${duration}`"
                                :value="duration"
                                v-model="selectedDurations"
                            />
                            <label :for="`duration-${duration}`">{{
                                duration
                            }}</label>
                        </div>
                    </div>
                </div>

                <!-- 语言筛选 -->
                <div class="filter-group">
                    <div
                        class="filter-header"
                        @click="toggleFilter('languages')"
                    >
                        <div class="filter-title">
                            <img
                                src="/assets/image/Program/DateIcon.png"
                                alt="Language"
                                class="filter-icon"
                            />
                            Language
                        </div>
                        <div class="filter-arrow">
                            <img
                                :src="
                                    expandedFilters.languages
                                        ? '/assets/image/Program/ArrowDown.png'
                                        : '/assets/image/Program/ArrowUp.png'
                                "
                                alt="Arrow"
                            />
                        </div>
                    </div>
                    <div
                        class="filter-options"
                        :class="{
                            'filter-options-expanded':
                                expandedFilters.languages,
                        }"
                    >
                        <div
                            v-for="language in languages"
                            :key="language"
                            class="filter-option"
                        >
                            <input
                                type="checkbox"
                                :id="`language-${language}`"
                                :value="language"
                                v-model="selectedLanguages"
                            />
                            <label :for="`language-${language}`">{{
                                language
                            }}</label>
                        </div>
                    </div>
                </div>

                <!-- 开始日期筛选 -->
                <div class="filter-group">
                    <div
                        class="filter-header"
                        @click="toggleFilter('startDates')"
                    >
                        <div class="filter-title">
                            <img
                                src="/assets/image/Program/DateIcon.png"
                                alt="Start Date"
                                class="filter-icon"
                            />
                            Starting Date
                        </div>
                        <div class="filter-arrow">
                            <img
                                :src="
                                    expandedFilters.startDates
                                        ? '/assets/image/Program/ArrowDown.png'
                                        : '/assets/image/Program/ArrowUp.png'
                                "
                                alt="Arrow"
                            />
                        </div>
                    </div>
                    <div
                        class="filter-options"
                        :class="{
                            'filter-options-expanded':
                                expandedFilters.startDates,
                        }"
                    >
                        <div
                            v-for="date in startDates"
                            :key="date"
                            class="filter-option"
                        >
                            <input
                                type="radio"
                                :id="`date-${date}`"
                                :value="date"
                                v-model="selectedStartDate"
                                name="startDate"
                            />
                            <label :for="`date-${date}`">{{ date }}</label>
                        </div>
                    </div>
                </div>

                <!-- 学费筛选 -->
                <div class="filter-group">
                    <div class="filter-header" @click="toggleFilter('tuition')">
                        <div class="filter-title">
                            <img
                                src="/assets/image/Program/TuitionFeeIcon.png"
                                alt="Tuition Fee"
                                class="filter-icon"
                            />
                            Tuition Fee
                        </div>
                        <div class="filter-arrow">
                            <img
                                :src="
                                    expandedFilters.tuition
                                        ? '/assets/image/Program/ArrowDown.png'
                                        : '/assets/image/Program/ArrowUp.png'
                                "
                                alt="Arrow"
                            />
                        </div>
                    </div>
                    <div
                        class="tuition-range"
                        :class="{
                            'filter-options-expanded': expandedFilters.tuition,
                        }"
                    >
                        <div class="tuition-input-row">
                            <div class="tuition-label">Min Fees</div>
                            <input
                                type="number"
                                v-model="minFees"
                                class="tuition-input"
                                placeholder="Enter Min Fees"
                            />
                        </div>
                        <div class="tuition-input-row">
                            <div class="tuition-label">Max Fees</div>
                            <input
                                type="number"
                                v-model="maxFees"
                                class="tuition-input"
                                placeholder="Enter Max Fees"
                            />
                        </div>
                    </div>
                </div>

                <!-- 学位筛选 -->
                <div class="filter-group">
                    <div class="filter-header" @click="toggleFilter('degrees')">
                        <div class="filter-title">
                            <img
                                src="/assets/image/Program/DateIcon.png"
                                alt="Degree"
                                class="filter-icon"
                            />
                            Degree
                        </div>
                        <div class="filter-arrow">
                            <img
                                :src="
                                    expandedFilters.degrees
                                        ? '/assets/image/Program/ArrowDown.png'
                                        : '/assets/image/Program/ArrowUp.png'
                                "
                                alt="Arrow"
                            />
                        </div>
                    </div>
                    <div
                        class="filter-options"
                        :class="{
                            'filter-options-expanded': expandedFilters.degrees,
                        }"
                    >
                        <div
                            v-for="degree in degrees"
                            :key="degree"
                            class="filter-option"
                        >
                            <input
                                type="checkbox"
                                :id="`degree-${degree}`"
                                :value="degree"
                                v-model="selectedDegrees"
                            />
                            <label :for="`degree-${degree}`">{{
                                degree
                            }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 项目列表区域 -->
            <div class="programs-list">
                <!-- 加载状态 -->
                <div v-if="isLoading" class="loading-container">
                    <div class="loading-spinner"></div>
                    <p>Loading programs...</p>
                </div>

                <!-- 无内容状态 -->
                <div
                    v-else-if="filteredPrograms.length === 0"
                    class="no-content-container"
                >
                    <img
                        src="/assets/image/Program/NoContentImage.png"
                        alt="No results found"
                        class="no-content-image"
                    />
                    <div class="no-content-text">
                        <div>
                            Oops! We couldn't find any results matching your
                            search.
                        </div>
                        <div>
                            Maybe refine your keywords, or explore other
                            sections of our site.
                        </div>
                    </div>
                </div>

                <!-- 项目卡片列表 -->
                <div
                    v-else
                    v-for="program in filteredPrograms"
                    :key="program.id"
                    class="program-card"
                >
                    <div class="program-header">
                        <div class="program-logo">
                            <img
                                :src="program.logoUrl"
                                :alt="program.university"
                            />
                        </div>
                        <div class="program-info">
                            <h2 class="program-title">{{ program.title }}</h2>
                            <div class="university-name">
                                {{ program.university }}
                            </div>
                            <div
                                class="scholarship-badge"
                                v-if="program.hasScholarship"
                            >
                                Scholarship
                            </div>
                        </div>
                        <div class="apply-button">
                            <button @click="applyNow(program)">
                                APPLY NOW
                            </button>
                        </div>
                    </div>
                    <div class="program-details">
                        <div class="detail-header">
                            <div class="header-item">Starting Date</div>
                            <div class="header-item">Duration</div>
                            <div class="header-item">Application Deadline</div>
                            <div class="header-item">Language</div>
                            <div class="header-item">City</div>
                            <div class="header-item">Tuition Fee (USD)</div>
                        </div>
                        <div class="detail-values">
                            <div class="value-item">
                                {{ program.startDate }}
                            </div>
                            <div class="value-item">
                                {{ program.duration }}
                            </div>
                            <div class="value-item">{{ program.deadline }}</div>
                            <div class="value-item">{{ program.language }}</div>
                            <div class="value-item">{{ program.city }}</div>
                            <div class="value-item">
                                {{ program.tuitionFee.toLocaleString() }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 分页 - 只在有内容时显示 -->
                <div class="pagination" v-if="filteredPrograms.length > 0">
                    <button
                        class="pagination-button prev"
                        :disabled="currentPage === 1"
                        @click="currentPage--"
                    >
                        &lt;
                    </button>
                    <!-- 智能分页显示 -->
                    <template
                        v-for="(pageNum, index) in displayedPageNumbers"
                        :key="index"
                    >
                        <!-- 显示页码按钮 -->
                        <button
                            v-if="pageNum !== '...'"
                            class="pagination-button"
                            :class="{ active: pageNum === currentPage }"
                            @click="currentPage = pageNum"
                        >
                            {{ pageNum }}
                        </button>

                        <!-- 显示省略号 -->
                        <span v-else class="pagination-ellipsis">...</span>
                    </template>

                    <!-- 跳转到指定页码 -->
                    <!-- <div class="pagination-goto">
                        <span class="goto-text">跳至</span>
                        <input 
                            type="number" 
                            v-model.number="gotoPage" 
                            min="1" 
                            :max="totalPages"
                            class="goto-input"
                            @keyup.enter="handleGotoPage"
                        />
                        <button class="goto-button" @click="handleGotoPage">确定</button>
                    </div> -->
                    <button
                        class="pagination-button next"
                        :disabled="currentPage === totalPages"
                        @click="currentPage++"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useProgram } from "./index.js";

export default {
    name: "Program",
    setup() {
        return useProgram();
    },
};
</script>

<style lang="less" scoped>
.program-container {
    width: 100%;
    min-height: 100vh;
    background-color: #f8f9fa;
    padding-top: 80px;
}

.header-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    height: 80px;
    background: #ff6b35;
    margin-left: auto;
    margin-right: auto;
    padding-left: 400px;
    padding-right: 400px;
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

.apply-now-container {
    position: fixed;
    right: 60px;
    bottom: 60px;
    width: 100px;
    height: 100px;
    cursor: pointer;
    z-index: 100;
    img {
        width: 100%;
        height: 100%;
    }
}

.content-container {
    display: flex;
    padding: 80px 260px;
    // max-width: 1440px;
    margin: 0 auto;
    gap: 40px;
}

/* 筛选侧边栏样式 */
.filter-sidebar {
    width: 240px;
    height: 360px;
    min-height: 360px;
    // max-height: calc(100vh - 120px);
    overflow: hidden; /* 修改这里，防止收起时出现滚动条 */
    flex-shrink: 0;
    border-radius: 10px;
    background: #ffffff;
    box-sizing: border-box;
    border: 1px solid #dee2ee;
    box-shadow: 0px 4px 10px 0px #dee2ee;
    padding: 20px;
    transition: height 0.3s ease;

    &.expanded-sidebar {
        height: fit-content;
        overflow-y: auto; /* 只在展开状态时允许滚动 */
    }
}

.filter-group {
    margin-bottom: 4px;
    min-height: 40px;
}

.filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    padding: 4px 0;
}

.filter-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: normal;
    color: #2e4057;
}

.filter-icon {
    width: 18px;
    height: 18px;
    margin-right: 10px;
}

.filter-arrow {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 14px;
        height: 14px;
    }
}

.filter-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transform: translateY(-10px);
    transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.2s ease, margin 0.2s ease, opacity 0.2s ease;
    will-change: max-height, transform, opacity; /* 优化动画性能 */
}

.filter-options-expanded {
    max-height: 400px;
    // height: auto;
    opacity: 1;
    transform: translateY(0);
    overflow-y: hidden;
    margin-top: 8px;
    margin-bottom: 8px;
    transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease,
        transform 0.2s ease, margin 0.2s ease;
}

.filter-option {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 30px;
    font-size: 15px;
    font-weight: normal;
    line-height: 22px;
    letter-spacing: normal;
    color: #2e4057;
}

.filter-option input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
    // 选中后背景是黑色
    // &:checked {
    //     background-color: #2E4057 !important;
    //     color: #fff !important;
    // }
}

.filter-option label {
    cursor: pointer;
}

.tuition-range {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transform: translateY(-10px);
    transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1),
        transform 0.2s ease, padding 0.2s ease;
    padding: 0;
}

.tuition-range.filter-options-expanded {
    max-height: 100px;
    opacity: 1;
    transform: translateY(0);
    padding: 8px 0;
    transition: max-height 0.25s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease,
        transform 0.2s ease, padding 0.2s ease;
}

.tuition-input-row {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    //padding: 6px;
}

.tuition-label {
    min-width: 70px;
    margin-right: 5px;
    font-size: 14px;
    color: #2e4057;
    line-height: 22px;
    letter-spacing: normal;
}

.tuition-input {
    width: calc(100% - 75px);
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    &::placeholder {
        font-family: PingFang SC;
        font-size: 12px;
        font-weight: normal;
        line-height: 22px;
        letter-spacing: normal;
        color: #dbdfec;
    }
}

/* 项目列表样式 */
.programs-list {
    width: 1120px;
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.program-card {
    border-radius: 10px;
    // min-height: 260px;
    background: #ffffff;
    box-sizing: border-box;
    /* grey 03 */
    border: 1px solid #dbdfec;
    box-shadow: -5px 0px 10px 0px rgba(190, 190, 190, 0.25),
        5px 5px 10px 0px rgba(190, 190, 190, 0.25);
}

.program-header {
    display: flex;
    gap: 30px;
    padding: 30px;
    // height: 220px;
    border-radius: 9px 9px 0px 0px;
    background: #fffceb;
}

.program-logo {
    width: 160px;
    height: 160px;
    // border: 1px solid #fe7246;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
}

.program-logo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.program-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    //gap: 10px;
}

.program-title {
    font-size: 26px;

    max-height: 78px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: normal;
    color: #2e4057;
    margin-bottom: 7px;
}

.university-name {
    font-size: 18px;
    height: 32px;
    font-weight: 300;
    line-height: normal;
    letter-spacing: normal;
    color: #3a3e48;
    margin-bottom: 9px;
}

.scholarship-badge {
    width: 120px;
    height: 34px;
    // margin-top: 5px;
    /* 自动布局 */
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid #fe7246;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: normal;
    color: #fe7246;
}

.apply-button {
    /* 自动布局 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.apply-button button {
    width: 165px;
    height: 44px;
    padding: 10px 16px;
    background-color: #ff6b35;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: normal;
    color: #ffffff;
}

.apply-button button:hover {
    background-color: #e55a2b;
}

/* 项目详情样式 */
.program-details {
    width: 100%;
    border-top: none;
}

.detail-header {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #e5e7eb;
    padding: 16px 0 8px 0;
}

.header-item {
    width: 186.67px;
    padding: 14px 0;
    text-align: center;
    font-family: PingFang SC;
    font-size: 16px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: normal;
    color: #2e4057;
    //左对齐
}
.first-item {
    text-align: left;
}

.detail-values {
    display: flex;
    width: 100%;
    padding: 8px 0 16px 0;
}

.value-item {
    width: 186.67px;
    padding: 14px 0;
    font-size: 16px;
    text-align: center;
    font-weight: 300;
    line-height: normal;
    text-align: center;
    letter-spacing: normal;
    color: #2e4057;
    border-right: none;
}

.last-item {
    text-align: right;
}
/* 分页样式 */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    gap: 8px;
}

.pagination-button {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 4px;
    font-size: 17px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.pagination-button.active {
    background-color: #ff6b35;
    color: white;
    border-color: #ff6b35;
}

.pagination-button:hover:not(.active):not(:disabled) {
    border-color: #ff6b35;
    color: #ff6b35;
}

.pagination-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.pagination-ellipsis {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    font-size: 14px;
    color: #777;
}

/* 无内容状态 */
.no-content-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 0;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px 0px rgba(190, 190, 190, 0.25);
}

.no-content-image {
    width: 363px;
    height: auto;
    margin-bottom: 30px;
}

.no-content-text {
    max-width: 1000px;

    font-family: Arial Hebrew;
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
    text-align: center;
    letter-spacing: normal;
    color: #2e4057;
}

/* 加载状态 */
.loading-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 60px 0;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 10px 0px rgba(190, 190, 190, 0.25);
}

.loading-spinner {
    width: 60px;
    height: 60px;
    border: 5px solid rgba(255, 107, 53, 0.2);
    border-top: 5px solid #ff6b35;
    border-radius: 50%;
    margin-bottom: 20px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.loading-container p {
    font-family: "AlibabaPuHuiTiRegular";
    font-size: 18px;
    color: #2e4057;
    font-weight: 500;
}

.pagination-goto {
    display: flex;
    align-items: center;
    margin-left: 15px;
}

.goto-text {
    font-size: 14px;
    color: #666;
    margin-right: 5px;
}

.goto-input {
    width: 50px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: center;
    margin-right: 5px;
    font-size: 14px;
    padding: 0 5px;
}

.goto-button {
    height: 30px;
    padding: 0 10px;
    background-color: #ff6b35;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
        background-color: darken(#ff6b35, 5%);
    }
}

// //媒体查询 大于1440px屏幕
// @media (min-width: 1441px) {
//     .program-header {
//         padding: 16px 30px 8px 30px;
//     }
//     .programs-list {
//         gap: 15px;
//     }
// }
</style>
