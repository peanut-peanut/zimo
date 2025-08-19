import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ar from './locales/ar.json'

// 从localStorage获取用户选择的语言，默认为阿拉伯语
const getStoredLanguage = () => {
  return localStorage.getItem('zimo-language') || 'ar'
}

const i18n = createI18n({
  legacy: false, // 使用Composition API
  locale: getStoredLanguage(), // 设置默认语言
  fallbackLocale: 'en', // 设置备用语言
  messages: {
    en,
    ar
  },
  // 阿拉伯语RTL支持
  globalInjection: true,
  missingWarn: false,
  fallbackWarn: false
})

// 设置HTML的dir属性以支持RTL
export const setHTMLDirection = (locale) => {
  document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
  document.documentElement.setAttribute('lang', locale)
}

// 保存语言选择到localStorage
export const saveLanguagePreference = (locale) => {
  localStorage.setItem('zimo-language', locale)
  setHTMLDirection(locale)
}

// 初始化时设置方向
setHTMLDirection(getStoredLanguage())

export default i18n