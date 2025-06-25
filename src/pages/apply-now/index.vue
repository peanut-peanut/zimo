<template>
    <div class="apply-now-container">
        <Header isFrom="ApplyNow" />

        <img
            src="/assets/image/ApplyNow/ApplyNowBackground.png"
            alt="Students studying together"
            class="background-image"
        />

        <div class="form-wrapper">
            <div class="form-container">
                <form @submit.prevent="handleSubmit" class="application-form">
                    <!-- Name Field -->
                    <div class="form-field">
                        <div class="form-group">
                            <label class="form-label">Name</label>
                            <input
                                v-model="form.name"
                                type="text"
                                class="form-input"
                                :class="{ error: errors.name }"
                                placeholder="Please enter your name"
                                @blur="validateName"
                            />
                        </div>
                        <span v-if="errors.name" class="error-message">{{
                            errors.name
                        }}</span>
                    </div>

                    <!-- Country Field -->
                    <div class="form-field">
                        <div class="form-group">
                            <label class="form-label">Country</label>
                            <div
                                class="custom-select"
                                :class="{ active: countryDropdownOpen }"
                            >
                                <div
                                    class="select-trigger"
                                    :class="{ error: errors.country }"
                                    @click="toggleCountryDropdown"
                                >
                                    <span
                                        class="select-text"
                                        data-placeholder="Please select your country"
                                        >{{ form.country || "" }}</span
                                    >
                                    <svg
                                        class="select-arrow"
                                        :class="{ rotate: countryDropdownOpen }"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M7 10l5 5 5-5z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                <div
                                    v-if="countryDropdownOpen"
                                    class="select-options country-select-options"
                                >
                                    <div
                                        v-for="country in filteredCountries"
                                        :key="country.code"
                                        class="select-option country-select-option"
                                        @click="
                                            selectCountry(
                                                country.name,
                                                country.code
                                            )
                                        "
                                    >
                                        <img
                                            class="country-select-option-image"
                                            :src="country.image"
                                        />
                                        <div class="country-select-option-name">
                                            {{ country.name }}
                                        </div>
                                    </div>
                                    <div
                                        v-if="filteredCountries.length === 0"
                                        class="no-results"
                                    >
                                        No countries found
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span v-if="errors.country" class="error-message">{{
                            errors.country
                        }}</span>
                    </div>

                    <!-- Phone Number Field -->
                    <div class="form-field">
                        <div class="form-group">
                            <label class="form-label">Phone number</label>
                            <div class="phone-input-container">
                                <select
                                    v-model="form.countryCode"
                                    class="country-code-select"
                                    :class="{
                                        'text-placeholder': !form.countryCode,
                                    }"
                                >
                                    <option value="" disabled selected>
                                        Select
                                    </option>
                                    <option
                                        v-for="country in phoneCountries"
                                        :key="country.code"
                                        :value="country.code"
                                        :selected="
                                            country.code === form.countryCode
                                        "
                                    >
                                        {{ country.flag }} {{ country.code }}
                                    </option>
                                </select>
                                <input
                                    v-model="form.phone"
                                    type="tel"
                                    class="form-input phone-input"
                                    :class="{ error: errors.phone }"
                                    placeholder="Please enter your phone number"
                                    @blur="validatePhone"
                                />
                            </div>
                        </div>
                        <span v-if="errors.phone" class="error-message">{{
                            errors.phone
                        }}</span>
                    </div>

                    <!-- Age Field -->
                    <div class="form-field">
                        <div class="form-group">
                            <label class="form-label">Age</label>
                            <input
                                v-model="form.age"
                                type="text"
                                class="form-input"
                                :class="{ error: errors.age }"
                                placeholder="Please enter your age"
                                @blur="validateAge"
                            />
                        </div>
                        <span v-if="errors.age" class="error-message">{{
                            errors.age
                        }}</span>
                    </div>

                    <!-- GPA Field -->
                    <div class="form-field">
                        <div class="form-group">
                            <label class="form-label">GPA</label>
                            <div
                                class="custom-select"
                                :class="{
                                    active: gpaDropdownOpen,
                                }"
                            >
                                <div
                                    class="select-trigger"
                                    :class="{ error: errors.gpa }"
                                    @click="toggleGpaDropdown"
                                >
                                    <span
                                        class="select-text"
                                        data-placeholder="Please select your GPA"
                                        >{{ form.gpa || "" }}</span
                                    >
                                    <svg
                                        class="select-arrow"
                                        :class="{ rotate: gpaDropdownOpen }"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M7 10l5 5 5-5z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                <div
                                    v-if="gpaDropdownOpen"
                                    class="select-options"
                                >
                                    <div
                                        v-for="gpa in gpaOptions"
                                        :key="gpa.value"
                                        class="select-option gpa-select-option"
                                        @click="selectGpa(gpa.value)"
                                    >
                                        {{ gpa.value }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span v-if="errors.gpa" class="error-message">{{
                            errors.gpa
                        }}</span>
                    </div>

                    <!-- Target Degree Field -->
                    <div class="form-field">
                        <div class="form-group">
                            <label class="form-label">Target degree</label>
                            <div
                                class="custom-select"
                                :class="{ active: degreeDropdownOpen }"
                            >
                                <div
                                    class="select-trigger"
                                    :class="{ error: errors.targetDegree }"
                                    @click="toggleDegreeDropdown"
                                >
                                    <span
                                        class="select-text"
                                        data-placeholder="Please select your target degree"
                                        >{{ form.targetDegree || "" }}</span
                                    >
                                    <svg
                                        class="select-arrow"
                                        :class="{ rotate: degreeDropdownOpen }"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M7 10l5 5 5-5z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                                <div
                                    v-if="degreeDropdownOpen"
                                    class="select-options"
                                >
                                    <div
                                        v-for="degree in degreeOptions"
                                        :key="degree.value"
                                        class="select-option"
                                        @click="selectDegree(degree.value)"
                                    >
                                        {{ degree.label }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span
                            v-if="errors.targetDegree"
                            class="error-message"
                            >{{ errors.targetDegree }}</span
                        >
                    </div>

                    <!-- Target Major Field -->
                    <div class="form-field">
                        <div class="form-group">
                            <label class="form-label">Target major</label>
                            <input
                                v-model="form.targetMajor"
                                type="text"
                                class="form-input"
                                :class="{ error: errors.targetMajor }"
                                placeholder="Please enter your target major"
                                @blur="validateTargetMajor"
                            />
                        </div>
                        <span v-if="errors.targetMajor" class="error-message">{{
                            errors.targetMajor
                        }}</span>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        class="submit-button"
                        :disabled="isSubmitting"
                    >
                        {{ isSubmitting ? "Submitting..." : "APPLY NOW" }}
                    </button>
                </form>
            </div>
        </div>

        <!-- 提交后的二维码弹窗 -->
        <div v-if="showQrcodeModal" class="qrcode-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-icon">
                        <img
                            src="/assets/image/ApplyNow/SuccessIcon.png"
                            alt="Students studying together"
                        />
                    </div>
                    <div class="modal-title">Submission successful</div>
                    <div class="modal-description">
                        Scan the QR code to get one-on-one application services
                    </div>
                </div>
                <div class="close-button" @click="showQrcodeModal = false">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path
                            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <div class="qrcode-content-container">
                    <ScanQrcode />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, computed } from "vue";
import countryData from "country-flag-emoji-json";
import {
    getCountries,
    getCountryCallingCode,
    getExampleNumber,
    parsePhoneNumberFromString,
} from "libphonenumber-js";
import metadata from "libphonenumber-js/metadata.min.json";
import ScanQrcode from "@/components/ScanQrcode/index.vue";
import { apiPost } from "@/utils/api.js";
import Header from "@/pages/home/components/Header/index.vue";

export default {
    name: "ApplyNow",
    components: {
        ScanQrcode,
        Header,
    },
    setup() {
        // 获取所有支持的国家代码
        const allCountryCodes = getCountries(metadata);
        const showQrcodeModal = ref(false);

        // Form data
        const form = reactive({
            name: "",
            phone: "",
            countryCode: "",
            country: "",
            countryCodeIso: "", // ISO国家代码
            age: "",
            gpa: "",
            targetDegree: "",
            targetMajor: "",
        });

        // Form validation errors
        const errors = reactive({});

        // Dropdown states
        const countryDropdownOpen = ref(false);
        const gpaDropdownOpen = ref(false);
        const degreeDropdownOpen = ref(false);
        const isSubmitting = ref(false);
        const countrySearchText = ref("");
        console.log("countryData", countryData);
        // 使用libphonenumber-js构建完整的国家列表
        const countries = computed(() => {
            return allCountryCodes
                .map((countryCode) => {
                    const countryInfo = countryData.find(
                        (c) => c.code === countryCode
                    );
                    const callingCode = getCountryCallingCode(
                        countryCode,
                        metadata
                    );
                    const exampleNumber = getExampleNumber(
                        countryCode,
                        metadata
                    );
                    let digits = exampleNumber
                        ? exampleNumber.nationalNumber.length
                        : 10; // 默认10位

                    // 处理无法从metadata中获取号码长度的情况
                    const lengthByCountry = {
                        CN: 11, // 中国手机号11位
                        GB: 10, // 英国10位
                        IN: 10, // 印度10位
                        BR: 10, // 巴西10位
                        RU: 10, // 俄罗斯10位
                        JP: 10, // 日本10位
                        KR: 10, // 韩国10位
                        AU: 9, // 澳大利亚9位
                    };

                    digits = lengthByCountry[countryCode] || digits;

                    return {
                        code: countryCode,
                        name: countryInfo ? countryInfo.name : countryCode,
                        flag: countryInfo ? countryInfo.emoji : countryCode,
                        phoneCode: `+${callingCode}`,
                        digits: digits,
                        image: countryInfo ? countryInfo.image : "",
                    };
                })
                .sort((a, b) => a.name.localeCompare(b.name));
        });
        // console.log("countries", countries.value);

        // 电话区号列表（计算属性）
        const phoneCountries = computed(() => {
            return countries.value.map((c) => ({
                code: c.phoneCode,
                flag: c.flag,
                name: c.name,
                digits: c.digits,
            }));
        });

        // 过滤后的国家列表（支持搜索）
        const filteredCountries = computed(() => {
            if (!countrySearchText.value.trim()) {
                return countries.value;
            }
            const searchTerm = countrySearchText.value.toLowerCase();
            return countries.value.filter((country) =>
                country.name.toLowerCase().includes(searchTerm)
            );
        });

        // GPA options
        const gpaOptions = [
            { value: "Exceptional - (Grade A, 70%+, GPA 3+)" },
            { value: "Above average - (Grade B-A, 60-70%, GPA 2.5-3)" },
            { value: "Average level - (Grade C-B, 55% - 60%, GPA 2-2.5%)" },
            {
                value: "Below average - (Grade D Average, 45% - 55%, GPA 1.5-2)",
            },
            {
                value: "Very Low (Grade E Average, 40% or less, GPA 1.5 or less)",
            },
        ];

        // Degree options
        const degreeOptions = [
            { value: "bachelor", label: "Bachelor" },
            { value: "master", label: "Master" },
            { value: "PHD", label: "PHD" },
            { value: "none degree", label: "None Degree" },
        ];

        // Methods
        const toggleCountryDropdown = () => {
            countryDropdownOpen.value = !countryDropdownOpen.value;
            gpaDropdownOpen.value = false;
            degreeDropdownOpen.value = false;

            // 如果关闭下拉菜单，清除搜索文本
            if (!countryDropdownOpen.value) {
                countrySearchText.value = "";
            }
        };

        const toggleGpaDropdown = () => {
            gpaDropdownOpen.value = !gpaDropdownOpen.value;
            countryDropdownOpen.value = false;
            degreeDropdownOpen.value = false;
        };

        const toggleDegreeDropdown = () => {
            degreeDropdownOpen.value = !degreeDropdownOpen.value;
            countryDropdownOpen.value = false;
            gpaDropdownOpen.value = false;
        };

        const selectCountry = (countryName, countryCode) => {
            form.country = countryName;
            form.countryCodeIso = countryCode;

            // 查找该国家的电话区号并设置
            const selectedCountry = countries.value.find(
                (c) => c.code === countryCode
            );
            if (selectedCountry) {
                form.countryCode = selectedCountry.phoneCode;
            }

            if (form.phone) {
                validatePhone(); // 重新验证电话号码
            }

            countryDropdownOpen.value = false;
            countrySearchText.value = ""; // 清除搜索文本
            validateCountry(); // 验证country选择
        };

        const selectGpa = (gpa) => {
            form.gpa = gpa;
            gpaDropdownOpen.value = false;
            validateGpa(); // 验证GPA选择
        };

        const selectDegree = (degree) => {
            form.targetDegree = degree;
            degreeDropdownOpen.value = false;
            validateTargetDegree(); // 验证target degree选择
        };

        const validatePhone = () => {
            // 基本验证：号码是否为空
            if (!form.phone.trim()) {
                errors.phone = "Phone number is required";
                return;
            }

            // 根据电话区号查找对应的国家进行校验
            const selectedCountry = phoneCountries.value.find(
                (c) => c.code === form.countryCode
            );

            if (selectedCountry) {
                const phoneDigits = form.phone.replace(/\D/g, "").length;
                if (phoneDigits !== selectedCountry.digits) {
                    errors.phone = `Phone number should be ${selectedCountry.digits} digits for ${selectedCountry.name}`;
                } else {
                    delete errors.phone;
                }
            } else {
                errors.phone = "Invalid country code selected";
            }
        };

        const validateAge = () => {
            if (!form.age.trim()) {
                errors.age = "Age is required";
            } else {
                const ageNum = parseInt(form.age);
                if (isNaN(ageNum) || ageNum < 1) {
                    //age 填写不合法
                    errors.age = "Age is not valid";
                } else {
                    delete errors.age;
                }
            }
        };

        const validateName = () => {
            if (!form.name.trim()) {
                errors.name = "Name is required";
            } else {
                delete errors.name;
            }
        };

        const validateCountry = () => {
            if (!form.country) {
                errors.country = "Country is required";
            } else {
                delete errors.country;
            }
        };

        const validateGpa = () => {
            if (!form.gpa) {
                errors.gpa = "GPA is required";
            } else {
                delete errors.gpa;
            }
        };

        const validateTargetDegree = () => {
            if (!form.targetDegree) {
                errors.targetDegree = "Target degree is required";
            } else {
                delete errors.targetDegree;
            }
        };

        const validateTargetMajor = () => {
            if (!form.targetMajor.trim()) {
                errors.targetMajor = "Target major is required";
            } else {
                delete errors.targetMajor;
            }
        };

        const validateForm = () => {
            // 验证所有字段
            validateName();
            validatePhone();
            validateCountry();
            validateAge();
            validateGpa();
            validateTargetDegree();
            validateTargetMajor();

            // 检查是否还有错误
            return Object.keys(errors).length === 0;
        };

        const handleSubmit = async () => {
            // 先验证电话号码
            validatePhone();

            // 再验证整个表单
            if (!validateForm()) return;

            isSubmitting.value = true;

            try {
                // 构建API请求数据
                const apiData = {
                    name: form.name,
                    phone_number_district: form.countryCode,
                    phone_number: form.phone,
                    country: form.country,
                    age: parseInt(form.age),
                    gpa_level: form.gpa,
                    target_degree: form.targetDegree.toLowerCase(),
                    target_major: form.targetMajor,
                };

                console.log("提交数据:", apiData);

                // 发送API请求
                const result = await apiPost("/api/course/apply", apiData);
                console.log("提交成功:", result);

                // 显示二维码弹窗
                showQrcodeModal.value = true;
            } catch (error) {
                console.error("提交申请时发生错误:", error);
                alert("申请提交失败，请检查网络连接后重试。");
            } finally {
                isSubmitting.value = false;
            }
        };

        const handleClickOutside = (event) => {
            if (!event.target.closest(".custom-select")) {
                countryDropdownOpen.value = false;
                gpaDropdownOpen.value = false;
                degreeDropdownOpen.value = false;
                countrySearchText.value = ""; // 清除搜索文本
            }
        };

        onMounted(() => {
            document.addEventListener("click", handleClickOutside);
        });

        onUnmounted(() => {
            document.removeEventListener("click", handleClickOutside);
        });

        return {
            form,
            errors,
            countryDropdownOpen,
            gpaDropdownOpen,
            degreeDropdownOpen,
            isSubmitting,
            countrySearchText,
            phoneCountries,
            countries,
            filteredCountries,
            gpaOptions,
            degreeOptions,
            showQrcodeModal,
            toggleCountryDropdown,
            toggleGpaDropdown,
            toggleDegreeDropdown,
            selectCountry,
            selectGpa,
            selectDegree,
            validatePhone,
            validateAge,
            validateName,
            validateCountry,
            validateGpa,
            validateTargetDegree,
            validateTargetMajor,
            handleSubmit,
        };
    },
};
</script>

<style lang="less" scoped>
/* 样式保持不变，同之前代码 */
.apply-now-container {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    z-index: 1;
}
.header-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 50;
    height: 80px;
    background: #ff6b35;
    margin-left: auto;
    margin-right: auto;
    padding-left: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.logo {
    position: absolute;
    left: 160px;
    width: 216px;
    height: 59px;
    cursor: pointer;
    z-index: 100;
}

.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

// Form styles
.form-wrapper {
    position: absolute;
    left: 260px;
    top: 216px;
    width: 584px;
    height: 456px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 99;
}

.form-container {
    //  background: #ffffff;
    border-radius: 16px;
    // padding: 40px 40px 40px 20px;
    width: 100%;
    //box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.application-form {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-field {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.form-group {
    display: flex;
    align-items: center;
    gap: 16px;
}

.form-label {
    font-size: 20px;
    font-weight: normal;
    line-height: 28px;
    text-align: right;
    letter-spacing: normal;
    color: #2e4057;
    flex: 1;
    font-family: "HarmonyOS Sans SC";
}

.form-input {
    width: 426px;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 18px;
    background: #ffffff;
    color: #374151;
    transition: border-color 0.2s ease;
    outline: none;
    font-family: "AlibabaPuHuiTiRegular", -apple-system, BlinkMacSystemFont,
        sans-serif;

    &:focus {
        border-color: #3b82f6;
    }

    &.error {
        border-color: #ef4444;
    }

    &::placeholder {
        color: #dbdfec;
        font-size: 18px;
        letter-spacing: normal;
    }
}

// Phone input styles
.phone-input-container {
    width: 426px;
    display: flex;
    gap: 8px;
}

.country-code-select {
    width: 110px;
    //padding: 12px 8px;

    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 22px;
    background: #ffffff;
    color: #2e4057;
    cursor: pointer;
    outline: none;
    font-family: "AlibabaPuHuiTiRegular", -apple-system, BlinkMacSystemFont,
        sans-serif;

    &:focus {
        border-color: #3b82f6;
    }
}
.text-placeholder {
    padding: 0 10px;
    color: #dbdfec !important;
    font-size: 18px !important;
    letter-spacing: normal;
}
.phone-input {
    flex: 1;
}

// Custom select styles
.custom-select {
    width: 426px;
    position: relative;
    cursor: pointer;
}

.select-trigger {
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: border-color 0.2s ease;
    min-height: 48px;

    &:hover {
        border-color: #9ca3af;
    }
    &.error {
        border-color: #ef4444;
    }
}

.custom-select.active .select-trigger {
    border-color: #3b82f6;
}

.select-text {
    font-size: 18px;
    color: #374151;
    flex: 1;
    text-align: left;
    font-family: "AlibabaPuHuiTiRegular", -apple-system, BlinkMacSystemFont,
        sans-serif;

    // 添加placeholder样式
    &:empty::before {
        content: attr(data-placeholder);
        color: #dbdfec;
    }
}

.select-arrow {
    width: 24px;
    height: 24px;
    color: #2e4057;
    transition: transform 0.2s ease;
    flex-shrink: 0;

    &.rotate {
        transform: rotate(180deg);
    }
}

.select-options {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #ffffff;
    border: 1px solid #d1d5db;
    border-top: none;
    border-radius: 0 0 8px 8px;
    max-height: 400px;
    overflow-y: auto;
    z-index: 1000;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.select-option {
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-bottom: 1px solid #f3f4f6;
    font-size: 18px;
    color: #374151;
    font-family: "AlibabaPuHuiTiRegular", -apple-system, BlinkMacSystemFont,
        sans-serif;

    &:hover {
        background-color: #f9fafb;
    }

    &:last-child {
        border-bottom: none;
    }
}
.gpa-select-option {
    font-size: 14px;
}

.country-select-options {
    padding: 10px 0;
    max-height: 500px;
}

.country-select-option {
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 0 16px;
    font-size: 18px;
    color: #2e4057;
    font-family: "AlibabaPuHuiTiRegular", -apple-system, BlinkMacSystemFont,
        sans-serif;
}

.country-select-option-image {
    width: 40px;
    height: 40px;
    //border-radius: 50%;
    object-fit: cover;
    object-position: center;
}

.country-search-container {
    padding: 8px 16px;
    border-bottom: 1px solid #f3f4f6;
    background: #f9fafb;
}

.country-search-input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 18px;
    outline: none;
    background: #ffffff;

    &:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    &::placeholder {
        color: #dbdfec;
        font-size: 18px;
        letter-spacing: normal;
    }
}

.no-results {
    padding: 16px;
    text-align: center;
    color: #6b7280;
    font-size: 18px;
    font-style: italic;
}

// Submit button
.submit-button {
    width: calc(100% - 20px);
    margin-top: 20px;
    height: 44px;
    line-height: 44px;
    margin-left: 20px;
    background: #ff6b35;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    text-align: center;
    letter-spacing: normal;
    color: #ffffff;

    &:hover:not(:disabled) {
        background: #ea580c;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}

// Error message
.error-message {
    color: #ef4444;
    font-size: 16px;
    // margin-top: 4px;
    margin-left: calc(100% - 426px);
    width: 426px;
    font-family: "AlibabaPuHuiTiRegular", -apple-system, BlinkMacSystemFont,
        sans-serif;
}

/* 二维码弹窗样式 */
.qrcode-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    animation: fadeIn 0.3s ease;
}

.modal-content {
    width: 665px;
    height: 500px;
    background: #ffffff;
    border-radius: 12px;
    padding: 40px 55px;
    position: relative;
    box-shadow: 0px 12px 48px 0px;
    background: #ffffff;
}

.modal-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}
.modal-icon {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
}
.modal-icon img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.modal-title {
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    letter-spacing: normal;
    color: #2e4057;
    margin-bottom: 10px;
}
.modal-description {
    font-family: PingFang SC;
    font-size: 18px;
    font-weight: 300;
    line-height: 24px;
    text-align: center;
    letter-spacing: normal;
    color: #2e4057;
}
.close-button {
    position: absolute;
    right: 15px;
    top: 8px;
    width: 24px;
    height: 24px;

    cursor: pointer;
    color: #6b7280;
    transition: color 0.2s ease;

    &:hover {
        color: #374151;
    }
}
.qrcode-content-container {
    padding: 0 18px;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
</style>
