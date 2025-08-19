<template>
    <div class="language-switcher">
        <button 
            class="language-button"
            :class="{ active: currentLocale === 'en' }"
            @click="changeLanguage('en')"
        >
            EN
        </button>
        <button 
            class="language-button"
            :class="{ active: currentLocale === 'ar' }"
            @click="changeLanguage('ar')"
        >
            العربية
        </button>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { saveLanguagePreference } from '../i18n'

export default {
    name: 'LanguageSwitcher',
    setup() {
        const { locale } = useI18n()
        
        const currentLocale = computed(() => locale.value)
        
        const changeLanguage = (newLocale) => {
            locale.value = newLocale
            saveLanguagePreference(newLocale)
            
            // 刷新页面以确保所有组件都使用新语言
            window.location.reload()
        }
        
        return {
            currentLocale,
            changeLanguage
        }
    }
}
</script>

<style lang="less" scoped>
.language-switcher {
    display: flex;
    gap: 8px;
    align-items: center;
}

.language-button {
    padding: 6px 12px;
    border: 1px solid #ddd;
    background: white;
    color: #333;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 14px;
    font-weight: 500;
    
    &:hover {
        background: #f5f5f5;
        border-color: #bbb;
    }
    
    &.active {
        background: #ff6b35;
        color: white;
        border-color: #ff6b35;
    }
}
</style>