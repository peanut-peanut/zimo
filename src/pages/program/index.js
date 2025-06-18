import { ref, computed, watch, onMounted } from "vue";
import { searchStore } from "../../store/searchStore";
import { ROUTES } from "../../router/routes";

// 筛选选项数据
export const degrees = ["Bachelor", "Master", "Doctoral"];
export const languages = ["Chinese", "English", "Chinese & English"];
export const cities = [
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
export const durations = [
    "1 year",
    "2 years",
    "3 years",
    "4 years",
    "5 years",
    "6 years",
];
export const startDates = [
    "January 2026",
    "February 2026",
    "March 2026",
    "September 2025",
    "October 2025",
    "November 2025",
];

// 格式化学位显示
export const formatDegree = (degree) => {
    if (!degree) return "N/A";
    return degree.charAt(0).toUpperCase() + degree.slice(1);
};

// 格式化日期显示
export const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
        const date = new Date(dateStr);
        const month = date.toLocaleString("en-US", { month: "short" });
        const day = date.getDate();
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    } catch (error) {
        console.error("日期格式化错误:", error);
        return dateStr;
    }
};

// 处理API返回的数据
export const processApiResponse = (response) => {
    if (!response || !response.success) {
        console.error("API响应错误:", response);
        return [];
    }

    // 处理大学数据
    const processedData = [];

    response.data.forEach((university) => {
        // 对每个大学的课程进行处理
        university.courses.forEach((course) => {
            processedData.push({
                id: course.course_id,
                title: course.course_name,
                university: university.university_name,
                hasScholarship: false, // API中没有奖学金信息，默认为false
                startDate: course.starting_date || "N/A",
                duration: course.duration || "N/A",
                deadline: formatDate(course.application_deadline) || "N/A",
                language: course.language || "N/A",
                city: university.city || "N/A",
                tuitionFee: course.yearly_tuition || 0,
                logoUrl:
                    university.logo_url ||
                    "/assets/image/Program/UniversityIcon.png",
                degree: formatDegree(course.degree),
                programUrl: course.program_url,
            });
        });
    });

    return processedData;
};

export const useProgram = () => {
    // 搜索功能
    const searchQuery = ref("");
    let searchTimeout = null;

    // API数据和加载状态
    const apiData = ref([]);
    const isLoading = ref(false);
    const pagination = ref({
        current_page: 1,
        total_pages: 1,
        total: 0,
    });

    // 从API获取数据，包含所有筛选条件
    const fetchDataFromApi = async (page = 1) => {
        isLoading.value = true;
        try {
            // 构建POST请求体
            const requestBody = {
                // 添加页码参数
                page: page,
                per_page: 10
            };
            
            // 添加搜索关键词
            if (searchQuery.value.trim()) {
                requestBody.keyword = searchQuery.value.trim();
            }
            
            // 添加持续时间筛选（作为数组）
            if (selectedDurations.value.length > 0) {
                requestBody.duration = [...selectedDurations.value];
            }
            
            // 添加学位筛选（数组）
            if (selectedDegrees.value.length > 0) {
                // 将选中的学位转换为小写
                requestBody.degrees = selectedDegrees.value.map(degree => degree.toLowerCase());
            }
            
            // 添加语言筛选（数组）
            if (selectedLanguages.value.length > 0) {
                requestBody.languages = [...selectedLanguages.value];
            }
            
            // 添加城市筛选（数组）
            if (selectedCities.value.length > 0) {
                requestBody.city = [...selectedCities.value];
            }
            
            // 添加开始日期筛选（字符串）
            if (selectedStartDate.value) {
                requestBody.start_date = selectedStartDate.value;
            }
            
            // 添加学费范围筛选
            if (minFees.value) {
                requestBody.min_tuition = Number(minFees.value);
            }
            
            if (maxFees.value) {
                requestBody.max_tuition = Number(maxFees.value);
            }
            
            // 发起POST请求
            const response = await fetch('/api/courses/search', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });

            // 尝试解析API响应
            let data;
            try {
                data = await response.json();
                console.log("data", data);
            } catch (error) {
                console.warn("API响应解析失败，使用模拟数据", error);
                data = {
                    pagination: {
                        current_page: page,
                        total_pages: 1,
                        total: 0,
                    },
                    data: [],
                };
            }

            // 更新分页信息
            pagination.value = {
                current_page: data.pagination.current_page,
                total_pages: data.pagination.total_pages,
                total: data.pagination.total,
            };

            const processed = processApiResponse(data);
            apiData.value = processed;
        } catch (error) {
            console.error("获取API数据错误:", error);
        } finally {
            isLoading.value = false;
        }
    };

    // 筛选器展开状态
    const expandedFilters = ref({
        cities: false,
        durations: false,
        startDates: false,
        tuition: false,
        degrees: false,
        languages: false,
    });

    // 是否有任何筛选项被展开
    const isAnyFilterExpanded = computed(() => {
        return Object.values(expandedFilters.value).some(
            (value) => value === true
        );
    });

    // 切换筛选器展开状态
    const toggleFilter = (filterName) => {
        expandedFilters.value[filterName] = !expandedFilters.value[filterName];
    };

    // 用户选择的筛选条件
    const selectedDegrees = ref([]);
    const selectedLanguages = ref([]);
    const selectedCities = ref([]);
    const selectedDurations = ref([]);
    const selectedStartDate = ref(""); // 改为单选，使用字符串而非数组
    const minFees = ref("");
    const maxFees = ref("");
    const currentPage = ref(1);
    const itemsPerPage = 10;

    // 按字母顺序排序城市
    const sortedCities = computed(() => {
        return [...cities].sort();
    });

    // 筛选程序
    const filteredPrograms = computed(() => {
        let result = [...apiData.value];

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
            result = result.filter((program) =>
                selectedDegrees.value.includes(program.degree)
            );
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

        // 筛选开始日期（单选）
        if (selectedStartDate.value) {
            result = result.filter((program) => 
                program.startDate.includes(selectedStartDate.value)
            );
        }

        // 筛选学费
        const min = minFees.value ? Number(minFees.value) : 0;
        const max = maxFees.value ? Number(maxFees.value) : Infinity;
        result = result.filter(
            (program) => program.tuitionFee >= min && program.tuitionFee <= max
        );

        return result;
    });

    // 使用API分页而不是前端分页
    const paginatedPrograms = computed(() => {
        return filteredPrograms.value;
    });

    // API返回的总页数
    const totalPages = computed(() => {
        return pagination.value.total_pages || 1;
    });
    
    // 用于跳转到指定页码的变量
    const gotoPage = ref(1);
    
    // 处理跳转到指定页码
    const handleGotoPage = () => {
        // 确保页码在有效范围内
        if (gotoPage.value < 1) {
            gotoPage.value = 1;
        } else if (gotoPage.value > totalPages.value) {
            gotoPage.value = totalPages.value;
        }
        
        // 设置当前页并跳转
        currentPage.value = gotoPage.value;
    };
    
    // 计算要显示哪些页码按钮
    const displayedPageNumbers = computed(() => {
        const total = totalPages.value;
        const current = currentPage.value;
        
        // 如果总页数较少，直接显示所有页码
        if (total <= 7) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }
        
        // 否则显示智能分页
        let pages = [];
        
        // 总是显示第一页
        pages.push(1);
        
        // 当前页靠前时 (1-3)
        if (current <= 3) {
            pages.push(2, 3);
            // 如果当前页不是3，添加4
            if (current < 3) pages.push(4);
            // 添加前半部分省略号
            pages.push('...');
            // 添加最后一页
            pages.push(total);
        }
        // 当前页靠近末尾时 (total-2 ~ total)
        else if (current >= total - 2) {
            // 添加前半部分省略号
            pages.push('...');
            // 添加倒数几页
            pages.push(total - 2, total - 1, total);
        }
        // 当前页在中间位置时
        else {
            // 添加第一个省略号 (如果当前页不是4)
            if (current > 4) {
                pages.push('...');
            } else {
                pages.push(2, 3);
            }
            
            // 添加当前页及其前后页
            pages.push(current - 1, current, current + 1);
            
            // 添加第二个省略号 (如果当前页距离末尾较远)
            if (current < total - 4) {
                pages.push('...');
            } else {
                pages.push(total - 2, total - 1);
            }
            
            // 添加最后一页 (如果上面没有已经添加)
            if (current < total - 2) {
                pages.push(total);
            }
        }
        
        // 过滤重复的页码并排序
        return Array.from(new Set(pages))
            .sort((a, b) => {
                // 让省略号保持原位置
                if (a === '...') {
                    return pages.indexOf(a);
                }
                if (b === '...') {
                    return pages.indexOf(b);
                }
                return a - b;
            });
    });
    
    // 监听页码变化，重新获取数据
    watch(currentPage, (newPage) => {
        fetchDataFromApi(newPage);
    });
    
    // 监听筛选条件变化，重置到第一页并重新获取数据
    watch(
        [
            searchQuery,
            selectedDegrees,
            selectedLanguages,
            selectedCities,
            selectedDurations,
            selectedStartDate,
            minFees,
            maxFees
        ],
        () => {
            currentPage.value = 1; // 重置到第一页
            fetchDataFromApi(1);
        },
        { deep: true }
    );

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
                            case "startDate":
                    selectedStartDate.value = "";
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
        // 如果有programUrl，则打开该链接，否则跳转到申请页面
        if (program && program.programUrl) {
            window.open(program.programUrl, "_blank");
        } else {
            window.open(ROUTES.APPLYNOW, "_blank");
        }
    };

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

        // 获取API数据
        fetchDataFromApi();
    });

    const handleSearch = () => {
        // 防抖处理
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        searchTimeout = setTimeout(() => {
            // 重置到第一页并重新获取数据
            currentPage.value = 1;
            fetchDataFromApi(1);
        }, 300);
    };

        return {
        // 数据
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
        selectedStartDate,
        minFees,
        maxFees,
        currentPage,
        filteredPrograms: paginatedPrograms,
        totalPages,
        expandedFilters,
        searchQuery,
        isLoading,
        pagination,
        isAnyFilterExpanded,
        displayedPageNumbers,
        gotoPage,
        
        // 方法
        clearFilter,
        applyNow,
        toggleFilter,
        handleSearch,
        fetchDataFromApi,
        handleGotoPage,
    };
};
