/**
 * SEO工具模块 - 用于动态管理页面meta标签
 */

// 各页面的SEO配置
export const seoConfig = {
  home: {
    title: 'ZIMO - study in china',
    description: 'ZIMO is a professional study abroad platform helping international students apply to top Chinese universities. We offer comprehensive services including university applications, visa assistance, accommodation, and more. Start your China study journey with ZIMO today!',
    keywords: 'study in china, chinese universities, china study abroad, ZIMO, university application china, chinese scholarship, international students china, study abroad consulting, china education, beijing university, tsinghua university',
    ogImage: 'https://zimo.club/assets/image/Logo.png'
  },
  aboutUs: {
    title: 'About ZIMO - Professional China Study Abroad Platform',
    description: 'Learn about ZIMO - Founded in 2020, we help 4000+ students annually with Chinese university applications. Trusted by students worldwide for comprehensive study abroad services.',
    keywords: 'about ZIMO, china study abroad platform, education consulting, study in china services, university application assistance',
    ogImage: 'https://zimo.club/assets/image/AboutUs/Top/ZimoTitle.png'
  },
  program: {
    title: 'Study Programs in China - ZIMO University Application',
    description: 'Explore 30000+ study programs across 400+ Chinese universities. Find your perfect degree program with ZIMO - from undergraduate to doctoral studies in China.',
    keywords: 'china study programs, chinese university programs, study abroad programs china, undergraduate programs china, graduate programs china, doctoral programs china',
    ogImage: 'https://zimo.club/assets/image/Program/NoContentImage.png'
  },
  successfulCases: {
    title: 'Success Stories - ZIMO Student Admissions',
    description: 'Read inspiring success stories from international students who achieved their dreams of studying in China with ZIMO. 95%+ admission rate to top universities.',
    keywords: 'china study success stories, student admissions china, university acceptance stories, study abroad testimonials, ZIMO success rate',
    ogImage: 'https://zimo.club/assets/image/SuccessfulCases/AdmissionCaseImage.png'
  },
  guides: {
    title: 'Study in China Guide - Complete Resources for International Students',
    description: 'Complete guide to studying in China. Learn about universities, cities, scholarships, application process, and life in China for international students.',
    keywords: 'study in china guide, china education guide, chinese universities guide, study abroad china tips, china student life',
    ogImage: 'https://zimo.club/assets/image/Logo.png'
  },
  studyInChina: {
    title: 'Study in China - Complete Guide for International Students',
    description: 'Everything you need to know about studying in China. From choosing universities to application process, visa requirements, and student life in China.',
    keywords: 'study in china, international students china, china education system, chinese universities, study abroad china',
    ogImage: 'https://zimo.club/assets/image/Logo.png'
  },
  cities: {
    title: 'Best Cities to Study in China - University Cities Guide',
    description: 'Discover the best cities for international students in China: Beijing, Shanghai, Hangzhou, Shenzhen, and more. Find your ideal study destination.',
    keywords: 'best cities study china, beijing universities, shanghai universities, chinese cities students, study destinations china',
    ogImage: 'https://zimo.club/assets/image/Home/PopularCities/ChinaMap.png'
  },
  universities: {
    title: 'Chinese Universities Guide - Top Universities in China',
    description: 'Comprehensive guide to top Chinese universities including Tsinghua, Peking University, Fudan, and more. Find rankings, programs, and admission requirements.',
    keywords: 'chinese universities, top universities china, tsinghua university, peking university, fudan university, university rankings china',
    ogImage: 'https://zimo.club/assets/image/Logo.png'
  },
  scholarships: {
    title: 'China Scholarships for International Students - ZIMO Guide',
    description: 'Find scholarships for studying in China. Government scholarships, university scholarships, and other funding opportunities for international students.',
    keywords: 'china scholarships, chinese government scholarship, university scholarships china, study abroad funding china, international student scholarships',
    ogImage: 'https://zimo.club/assets/image/Logo.png'
  },
  applyNow: {
    title: 'Apply Now - Start Your China Study Journey with ZIMO',
    description: 'Ready to study in China? Start your application with ZIMO today. Our expert team will guide you through the entire process from application to arrival.',
    keywords: 'apply study china, china university application, study abroad application, ZIMO application, start china study journey',
    ogImage: 'https://zimo.club/assets/image/ApplyNow/ApplyNowBackground.png'
  }
}

/**
 * 设置页面SEO meta标签
 * @param {string} page - 页面名称
 * @param {Object} customConfig - 自定义配置（可选）
 */
export function setSEO(page, customConfig = {}) {
  const config = { ...seoConfig[page], ...customConfig }
  
  if (!config) {
    console.warn(`SEO config not found for page: ${page}`)
    return
  }

  // 设置页面标题
  if (config.title) {
    document.title = config.title
  }

  // 设置或更新description
  updateMetaTag('name', 'description', config.description)
  
  // 设置或更新keywords
  updateMetaTag('name', 'keywords', config.keywords)
  
  // 设置或更新Open Graph标签
  updateMetaTag('property', 'og:title', config.title)
  updateMetaTag('property', 'og:description', config.description)
  updateMetaTag('property', 'og:image', config.ogImage)
  updateMetaTag('property', 'og:url', window.location.href)
  updateMetaTag('property', 'og:type', 'website')
  updateMetaTag('property', 'og:site_name', 'ZIMO')
  
  // 设置或更新Twitter Card标签
  updateMetaTag('name', 'twitter:card', 'summary_large_image')
  updateMetaTag('name', 'twitter:title', config.title)
  updateMetaTag('name', 'twitter:description', config.description)
  updateMetaTag('name', 'twitter:image', config.ogImage)
  
  // 设置canonical URL
  updateLinkTag('canonical', window.location.href)
  
  // 集成Google SEO优化
  initGoogleOptimizations(page)
}

/**
 * 初始化Google优化功能
 */
function initGoogleOptimizations(page) {
  // 延迟执行，确保DOM已加载
  setTimeout(() => {
    try {
      // 添加hreflang标签
      addHreflangTags()
      
      // 添加面包屑结构化数据
      addBreadcrumbStructuredData()
      
      // 添加站点搜索框结构化数据（仅首页）
      if (page === 'home') {
        addSiteSearchBoxStructuredData()
        addFAQStructuredData()
      }
      
      // 添加页面特定的结构化数据
      addPageSpecificStructuredData(page)
      
    } catch (error) {
      console.warn('Google SEO optimizations failed:', error)
    }
  }, 100)
}

/**
 * 更新或创建meta标签
 * @param {string} attr - 属性名 ('name' 或 'property')
 * @param {string} value - 属性值
 * @param {string} content - 内容
 */
function updateMetaTag(attr, value, content) {
  if (!content) return
  
  let meta = document.querySelector(`meta[${attr}="${value}"]`)
  
  if (meta) {
    meta.setAttribute('content', content)
  } else {
    meta = document.createElement('meta')
    meta.setAttribute(attr, value)
    meta.setAttribute('content', content)
    document.head.appendChild(meta)
  }
}

/**
 * 更新或创建link标签
 * @param {string} rel - rel属性值
 * @param {string} href - href属性值
 */
function updateLinkTag(rel, href) {
  if (!href) return
  
  let link = document.querySelector(`link[rel="${rel}"]`)
  
  if (link) {
    link.setAttribute('href', href)
  } else {
    link = document.createElement('link')
    link.setAttribute('rel', rel)
    link.setAttribute('href', href)
    document.head.appendChild(link)
  }
}

/**
 * 添加结构化数据到页面
 * @param {Object} data - 结构化数据对象
 */
export function addStructuredData(data) {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}

/**
 * 为不同页面类型添加特定的结构化数据
 */
export const structuredDataTemplates = {
  organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ZIMO",
    "alternateName": "ZIMO Club",
    "url": "https://zimo.club",
    "logo": "https://zimo.club/assets/image/Logo.png",
    "description": "Professional study abroad platform helping international students apply to top Chinese universities",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "service@zimo.club"
    },
    "sameAs": [
      "https://www.youtube.com/@zimoeducation",
      "https://www.tiktok.com/@zimo.club"
    ],
    "foundingDate": "2020",
    "slogan": "Unlock your life answer in China",
    "areaServed": "Worldwide",
    "serviceType": "Education Consulting"
  },
  
  educationalOrganization: {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ZIMO",
    "url": "https://zimo.club",
    "description": "Study abroad consulting platform specializing in Chinese university applications",
    "areaServed": "Worldwide",
    "educationalCredentialAwarded": "Study Abroad Consulting Services"
  },
  
  service: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "China Study Abroad Consulting",
    "provider": {
      "@type": "Organization",
      "name": "ZIMO"
    },
    "description": "Comprehensive study abroad services for students applying to Chinese universities",
    "areaServed": "Worldwide",
    "serviceType": "Education Consulting"
  }
}

/**
 * 添加hreflang标签（国际化SEO）
 */
function addHreflangTags() {
  const currentDomain = 'https://zimo.club'
  const currentPath = window.location.pathname
  
  // 主要针对英文内容，但为中文用户提供备选
  const hreflangData = [
    { lang: 'en', href: `${currentDomain}${currentPath}` },
    { lang: 'en-US', href: `${currentDomain}${currentPath}` },
    { lang: 'x-default', href: `${currentDomain}${currentPath}` }
  ]
  
  hreflangData.forEach(item => {
    // 检查是否已存在，避免重复添加
    const existing = document.querySelector(`link[hreflang="${item.lang}"]`)
    if (!existing) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = item.lang
      link.href = item.href
      document.head.appendChild(link)
    }
  })
}

/**
 * 添加面包屑导航结构化数据
 */
function addBreadcrumbStructuredData() {
  const path = window.location.pathname
  const pathSegments = path.split('/').filter(segment => segment)
  
  if (pathSegments.length === 0) return // 首页不需要面包屑
  
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": []
  }
  
  // 添加首页
  breadcrumbList.itemListElement.push({
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://zimo.club/"
  })
  
  // 添加路径段
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    let name = segment
    switch (segment) {
      case 'about-us':
        name = 'About Us'
        break
      case 'program':
        name = 'Study Programs'
        break
      case 'successful-cases':
        name = 'Success Stories'
        break
      case 'guides':
        name = 'Study Guides'
        break
      case 'study-in-china':
        name = 'Study in China Guide'
        break
      case 'apply-now':
        name = 'Apply Now'
        break
    }
    
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": name,
      "item": `https://zimo.club${currentPath}`
    })
  })
  
  addStructuredData(breadcrumbList)
}

/**
 * 添加站点搜索框结构化数据
 */
function addSiteSearchBoxStructuredData() {
  const siteSearchBox = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://zimo.club/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://zimo.club/program?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
  
  addStructuredData(siteSearchBox)
}

/**
 * 添加FAQ结构化数据
 */
function addFAQStructuredData() {
  const commonFAQs = [
    {
      question: "How can I apply to Chinese universities through ZIMO?",
      answer: "ZIMO provides comprehensive application services for Chinese universities. You can start by browsing our program database, then submit an application through our platform. Our team will guide you through the entire process from document preparation to visa assistance."
    },
    {
      question: "What programs are available for international students in China?",
      answer: "We offer access to over 30,000 study programs across 400+ Chinese universities, including Bachelor's, Master's, and PhD programs in various fields such as Medicine (MBBS), Engineering, Business, Chinese Language, and more."
    },
    {
      question: "Are there scholarships available for studying in China?",
      answer: "Yes, there are numerous scholarship opportunities including Chinese Government Scholarships, university-specific scholarships, and other funding options. Our team can help you identify and apply for suitable scholarships based on your academic background and chosen program."
    },
    {
      question: "What support does ZIMO provide during the application process?",
      answer: "ZIMO provides end-to-end support including university selection guidance, application document preparation, visa assistance, accommodation arrangements, and pre-departure orientation to ensure a smooth transition to studying in China."
    }
  ]
  
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": commonFAQs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
  
  addStructuredData(faqStructuredData)
}

/**
 * 添加页面特定的结构化数据
 */
function addPageSpecificStructuredData(page) {
  switch (page) {
    case 'home':
      addHomePageStructuredData()
      break
    case 'program':
      addProgramPageStructuredData()
      break
    case 'aboutUs':
      addAboutPageStructuredData()
      break
    case 'successfulCases':
      addSuccessPageStructuredData()
      break
    default:
      break
  }
}

function addHomePageStructuredData() {
  const homeData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "ZIMO",
    "alternateName": "ZIMO Education",
    "description": "Leading platform for international students to apply to Chinese universities",
    "url": "https://zimo.club",
    "foundingDate": "2020",
    "areaServed": "Worldwide",
    "serviceType": "Education Consulting",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Study Programs in China",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course",
            "name": "Bachelor Programs"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Course",
            "name": "Master Programs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Course", 
            "name": "PhD Programs"
          }
        }
      ]
    }
  }
  
  addStructuredData(homeData)
}

function addProgramPageStructuredData() {
  const programData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Study Programs in China",
    "description": "Browse over 30,000 study programs across 400+ Chinese universities",
    "url": "https://zimo.club/program",
    "mainEntity": {
      "@type": "ItemList",
      "name": "University Programs",
      "numberOfItems": 30000
    }
  }
  
  addStructuredData(programData)
}

function addAboutPageStructuredData() {
  const aboutData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About ZIMO",
    "description": "Learn about ZIMO's mission to help international students study in China",
    "url": "https://zimo.club/about-us",
    "mainEntity": {
      "@type": "Organization",
      "name": "ZIMO",
      "foundingDate": "2020",
      "mission": "Unlock your life answer in China"
    }
  }
  
  addStructuredData(aboutData)
}

function addSuccessPageStructuredData() {
  const successData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Success Stories",
    "description": "Read inspiring success stories from international students who achieved their dreams of studying in China with ZIMO",
    "url": "https://zimo.club/successful-cases",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Student Success Stories"
    }
  }
  
  addStructuredData(successData)
} 