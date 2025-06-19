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

        <div class="apply-now-container" @click="goToGuides">
            <img src="/assets/image/Program/CommentIcon.png" alt="go-guides" />
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
@import "./index.less";
</style>
