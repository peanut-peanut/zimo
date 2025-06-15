<template>
    <div class="program-container">
        <div class="header-container">
            <img src="/assets/image/Logo2.png" alt="logo" class="logo" />
            <div class="search-container">
                <input
                    type="text"
                    class="search-input"
                    placeholder="Please Enter Program or University"
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
                                type="checkbox"
                                :id="`date-${date}`"
                                :value="date"
                                v-model="selectedStartDates"
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
                <div
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

                <!-- 分页 -->
                <div class="pagination">
                    <button
                        class="pagination-button prev"
                        :disabled="currentPage === 1"
                        @click="currentPage--"
                    >
                        &lt;
                    </button>
                    <button
                        v-for="page in totalPages"
                        :key="page"
                        class="pagination-button"
                        :class="{ active: page === currentPage }"
                        @click="currentPage = page"
                    >
                        {{ page }}
                    </button>
                    <span class="pagination-ellipsis" v-if="totalPages > 5"
                        >...</span
                    >
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
import { ref, computed, watch, onMounted } from "vue";
import { searchStore } from "../../store/searchStore";
import { ROUTES } from "../../router/routes";

export default {
    name: "Program",
    setup() {
        // 筛选选项数据
        const degrees = ["Bachelor", "Master", "Doctoral"];
        const languages = ["Chinese", "English", "Chinese & English"];
        const cities = [
            "Beijing",
            "Shanghai",
            "Guangzhou",
            "Shenzhen",
            "Hangzhou",
            "Nanjing",
            "Chengdu",
            "Wuhan",
            "Xiamen",
        ];
        const durations = [
            "1 year",
            "2 years",
            "3 years",
            "4 years",
            "5 years",
            "6 years",
        ];
        const startDates = [
            "January 2026",
            "February 2026",
            "March 2026",
            "September 2025",
            "October 2025",
            "November 2025",
        ];

        // 搜索功能
        const searchQuery = ref("");
        let searchTimeout = null;

        // 在组件挂载时，从store获取搜索内容
        onMounted(() => {
            const query = searchStore.getSearchQuery();
            if (query) {
                searchQuery.value = query;
                // 立即触发搜索
                handleSearch();
                // 清除store中的搜索内容，避免下次进入时仍然存在

                searchStore.clearSearchQuery();
            }
        });

        const handleSearch = () => {
            // 防抖处理
            if (searchTimeout) {
                clearTimeout(searchTimeout);
            }
            searchTimeout = setTimeout(() => {
                // 重置到第一页
                currentPage.value = 1;
            }, 300);
        };

        // 筛选器展开状态
        const expandedFilters = ref({
            cities: false,
            durations: false,
            startDates: false,
            tuition: false,
            degrees: false,
        });

        // 是否有任何筛选项被展开
        const isAnyFilterExpanded = computed(() => {
            return Object.values(expandedFilters.value).some(
                (value) => value === true
            );
        });

        // 切换筛选器展开状态
        const toggleFilter = (filterName) => {
            expandedFilters.value[filterName] =
                !expandedFilters.value[filterName];
        };

        // 用户选择的筛选条件
        const selectedDegrees = ref([]);
        const selectedLanguages = ref([]);
        const selectedCities = ref([]);
        const selectedDurations = ref([]);
        const selectedStartDates = ref([]);
        const minFees = ref("");
        const maxFees = ref("");
        const currentPage = ref(1);
        const itemsPerPage = 3;

        // 模拟数据
        const programs = [
            {
                id: 1,
                title: "Dual Degree Bachelor's in InternationalEconomics &Trade (JMD)",
                university: "Donghua University",
                hasScholarship: true,
                startDate: "Jan.16 2026",
                duration: "6 years",
                deadline: "Nov.30 2025",
                language: "Chinese",
                city: "Shanghai",
                tuitionFee: 3100,
                logoUrl: "/assets/image/Program/UniversityIcon.png",
            },
            {
                id: 2,
                title: "Bachelor of Business Administration",
                university: "Fudan University",
                hasScholarship: true,
                startDate: "Sep.1 2025",
                duration: "4 years",
                deadline: "May.30 2025",
                language: "English",
                city: "Shanghai",
                tuitionFee: 4500,
                logoUrl: "/assets/image/Program/UniversityIcon.png",
            },
            {
                id: 3,
                title: "Master of Computer Science",
                university: "Peking University",
                hasScholarship: false,
                startDate: "Sep.15 2025",
                duration: "3 years",
                deadline: "Apr.30 2025",
                language: "Chinese & English",
                city: "Beijing",
                tuitionFee: 5200,
                logoUrl: "/assets/image/Program/UniversityIcon.png",
            },
            {
                id: 4,
                title: "Doctoral Program in Economics",
                university: "Shanghai Jiao Tong University",
                hasScholarship: true,
                startDate: "Mar.1 2026",
                duration: "4 years",
                deadline: "Dec.15 2025",
                language: "English",
                city: "Shanghai",
                tuitionFee: 6000,
                logoUrl: "/assets/image/Program/UniversityIcon.png",
            },
            {
                id: 5,
                title: "Bachelor of Medicine",
                university: "Zhejiang University",
                hasScholarship: false,
                startDate: "Feb.20 2026",
                duration: "5 years",
                deadline: "Oct.30 2025",
                language: "Chinese",
                city: "Hangzhou",
                tuitionFee: 4800,
                logoUrl: "/assets/image/Program/UniversityIcon.png",
            },
            {
                id: 6,
                title: "Master of International Relations",
                university: "Nanjing University",
                hasScholarship: true,
                startDate: "Oct.10 2025",
                duration: "2 years",
                deadline: "Jun.30 2025",
                language: "English",
                city: "Nanjing",
                tuitionFee: 3800,
                logoUrl: "/assets/image/Program/UniversityIcon.png",
            },
            {
                id: 7,
                title: "Bachelor of Civil Engineering",
                university: "Tongji University",
                hasScholarship: false,
                startDate: "Sep.5 2025",
                duration: "4 years",
                deadline: "May.15 2025",
                language: "Chinese",
                city: "Shanghai",
                tuitionFee: 3500,
                logoUrl: "/assets/image/Program/UniversityIcon.png",
            },
            {
                id: 8,
                title: "Doctoral Program in Artificial Intelligence",
                university: "Tsinghua University",
                hasScholarship: true,
                startDate: "Mar.15 2026",
                duration: "4 years",
                deadline: "Nov.30 2025",
                language: "English",
                city: "Beijing",
                tuitionFee: 7000,
                logoUrl: "/assets/image/Program/UniversityIcon.png",
            },
            {
                id: 9,
                title: "Master of Finance",
                university: "Shanghai University of Finance and Economics",
                hasScholarship: true,
                startDate: "Sep.1 2025",
                duration: "2 years",
                deadline: "Apr.30 2025",
                language: "Chinese & English",
                city: "Shanghai",
                tuitionFee: 4200,
                logoUrl: "/assets/image/Program/UniversityIcon.png",
            },
        ];

        // 按字母顺序排序城市
        const sortedCities = computed(() => {
            return [...cities].sort();
        });

        // 筛选程序
        const filteredPrograms = computed(() => {
            let result = [...programs];

            // 搜索查询
            if (searchQuery.value.trim()) {
                const query = searchQuery.value.toLowerCase().trim();
                result = result.filter(
                    (program) =>
                        program.title.toLowerCase().includes(query) ||
                        program.university.toLowerCase().includes(query)
                );
            }

            // 筛选学位
            if (selectedDegrees.value.length > 0) {
                result = result.filter((program) => {
                    return selectedDegrees.value.some((degree) =>
                        program.title
                            .toLowerCase()
                            .includes(degree.toLowerCase())
                    );
                });
            }

            // 筛选语言
            if (selectedLanguages.value.length > 0) {
                result = result.filter((program) =>
                    selectedLanguages.value.includes(program.language)
                );
            }

            // 筛选城市
            if (selectedCities.value.length > 0) {
                result = result.filter((program) =>
                    selectedCities.value.includes(program.city)
                );
            }

            // 筛选持续时间
            if (selectedDurations.value.length > 0) {
                result = result.filter((program) =>
                    selectedDurations.value.includes(program.duration)
                );
            }

            // 筛选开始日期
            if (selectedStartDates.value.length > 0) {
                result = result.filter((program) => {
                    const programDateParts = program.startDate.split(" ");
                    const programMonth = programDateParts[0].replace(".", "");
                    const programYear = programDateParts[1];
                    return selectedStartDates.value.some((date) => {
                        return (
                            date.includes(programYear) &&
                            date
                                .toLowerCase()
                                .includes(programMonth.toLowerCase())
                        );
                    });
                });
            }

            // 筛选学费
            const min = minFees.value ? Number(minFees.value) : 0;
            const max = maxFees.value ? Number(maxFees.value) : Infinity;
            result = result.filter(
                (program) =>
                    program.tuitionFee >= min && program.tuitionFee <= max
            );

            return result;
        });

        // 分页后的程序
        const paginatedPrograms = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return filteredPrograms.value.slice(start, end);
        });

        // 总页数
        const totalPages = computed(() => {
            return Math.ceil(filteredPrograms.value.length / itemsPerPage);
        });

        // 清除筛选条件
        const clearFilter = (filterType) => {
            switch (filterType) {
                case "degrees":
                    selectedDegrees.value = [];
                    break;
                case "languages":
                    selectedLanguages.value = [];
                    break;
                case "cities":
                    selectedCities.value = [];
                    break;
                case "durations":
                    selectedDurations.value = [];
                    break;
                case "startDates":
                    selectedStartDates.value = [];
                    break;
                case "tuition":
                    minFees.value = "";
                    maxFees.value = "";
                    break;
                default:
                    break;
            }
        };

        // 申请按钮点击
        const applyNow = (program) => {
           // 新开一个页面 跳转到申请页面
           window.open(ROUTES.APPLYNOW, '_blank');
        };

        return {
            degrees,
            languages,
            cities,
            sortedCities,
            durations,
            startDates,
            selectedDegrees,
            selectedLanguages,
            selectedCities,
            selectedDurations,
            selectedStartDates,
            minFees,
            maxFees,
            currentPage,
            programs,
            filteredPrograms: paginatedPrograms,
            totalPages,
            clearFilter,
            applyNow,
            expandedFilters,
            toggleFilter,
            isAnyFilterExpanded,
            searchQuery,
            handleSearch,
        };
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
    width: 519px;
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
        font-size: 22px;
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

.content-container {
    display: flex;
    padding: 20px 260px 0px 260px;
    // max-width: 1440px;
    margin: 0 auto;
    gap: 40px;
}

/* 筛选侧边栏样式 */
.filter-sidebar {
    width: 240px;
    height: 300px;
    min-height: 300px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
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
        transform 0.2s ease, margin 0.2s ease;
}

.filter-options-expanded {
    max-height: 200px;
    opacity: 1;
    transform: translateY(0);
    overflow-y: auto;
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
    gap: 20px;

}

.program-card {
    border-radius: 10px;
     min-height: 260px;
    background: #ffffff;
    box-sizing: border-box;
    /* grey 03 */
    border: 1px solid #dbdfec;
    box-shadow: -5px 0px 10px 0px rgba(190, 190, 190, 0.25),
        5px 5px 10px 0px rgba(190, 190, 190, 0.25);
}

.program-header {
    display: flex;
    gap: 20px;
    padding: 24px 30px 16px 30px;
    // height: 220px;
    border-radius: 9px 9px 0px 0px;
    background: #fffceb;
}

.program-logo {
    width: 124px;
    height: 124px;
    border: 1px solid #fe7246;
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
    object-fit: contain;
}

.program-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 5px;
}

.program-title {
    font-size: 24px;
    font-weight: 600;
    line-height: normal;
    letter-spacing: normal;
    color: #2e4057;
    // margin: 0 0 4px 0;
}

.university-name {
    font-size: 18px;
    font-weight: 300;
    line-height: normal;
    letter-spacing: normal;
    color: #3a3e48;
    // margin-bottom: 6px;
}

.scholarship-badge {
    width: 120px;
    height: 30px;
    margin-top: 5px;
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
    //  padding: 0 16px;
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
    //  padding: 0 16px;
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
    //margin-top: 10px;
    gap: 8px;
}

.pagination-button {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    background-color: #fff;
    border-radius: 4px;
    font-size: 16px;
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

//媒体查询 大于1440px屏幕
@media (min-width: 1441px) {
    .program-header {
        padding: 16px 30px 8px 30px;
    }
    .programs-list {
       gap: 15px;
    }
}
</style>
