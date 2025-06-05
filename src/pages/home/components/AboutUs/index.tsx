"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionTitle from "../../../../components/SectionTitle";
import styles from "./index.module.css";

const AboutUs = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // 每个社交媒体图标的独立悬停状态
    const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
    const [isTelegramHovered, setIsTelegramHovered] = useState(false);
    const [isWechatHovered, setIsWechatHovered] = useState(false);
    const [isTikTokHovered, setIsTikTokHovered] = useState(false);
    const [isYouTubeHovered, setIsYouTubeHovered] = useState(false);

    // 监听滚动事件，决定是否显示置顶按钮
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            setShowScrollToTop(scrollTop > 300); // 滚动超过300px时显示按钮
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // 平滑滚动到顶部
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const stats = [
        {
            id: 1,
            number: "400+",
            label: "UNIVERSITIES",
            color: "#38C9A6", // 绿色
        },
        {
            id: 2,
            number: "30000+",
            label: "PROGRAM",
            color: "#FFD255", // 黄色
        },
        {
            id: 3,
            number: "4000+",
            label: "STUDENTS",
            color: "#3BABBE", // 蓝色
        },
        {
            id: 4,
            number: "100+",
            label: "COMPANIES",
            color: "#D10022", // 红色
        },
    ];

    // WhatsApp 独立逻辑
    const handleWhatsAppMouseEnter = () => {
        setIsWhatsAppHovered(true);
    };

    const handleWhatsAppMouseLeave = () => {
        setIsWhatsAppHovered(false);
    };

    // Telegram 独立逻辑
    const handleTelegramMouseEnter = () => {
        setIsTelegramHovered(true);
    };

    const handleTelegramMouseLeave = () => {
        setIsTelegramHovered(false);
    };

    // WeChat 独立逻辑
    const handleWechatMouseEnter = () => {
        setIsWechatHovered(true);
    };

    const handleWechatMouseLeave = () => {
        setIsWechatHovered(false);
    };

    // TikTok 独立逻辑
    const handleTikTokMouseEnter = () => {
        setIsTikTokHovered(true);
    };

    const handleTikTokMouseLeave = () => {
        setIsTikTokHovered(false);
    };

    const handleTikTokClick = () => {
        window.open("https://www.tiktok.com/@zimostudyinchina", "_blank");
    };

    // YouTube 独立逻辑
    const handleYouTubeMouseEnter = () => {
        setIsYouTubeHovered(true);
    };

    const handleYouTubeMouseLeave = () => {
        setIsYouTubeHovered(false);
    };

    const handleYouTubeClick = () => {
        window.open("https://www.youtube.com/@zimo.studyinchina", "_blank");
    };

    return (
        <section
            id="about"
            className={`${styles.aboutSection} py-16 relative section-container-horizontal`}
            ref={sectionRef}
        >
            <div className={styles.container}>
                {/* 标题部分 */}
                <SectionTitle title="About Us" />

                {/* 主要内容区域 */}
                <div className={styles.mainContent}>
                    {/* 左侧文字内容 */}
                    <div className={styles.textContent}>
                        <h3 className={styles.companyTitle}>
                            ZIMO EDU STUDY IN CHINA
                        </h3>
                        <h4 className={styles.subtitle}>
                            ZIMO: Unlock Your Life Answer in China
                        </h4>
                        <p className={styles.description}>
                            Founded in 2008 | Trusted by 4,000+ Students
                            Annually
                        </p>

                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <div className={styles.bulletPoint}></div>
                                <div className={styles.featureContent}>
                                    <h5 className={styles.featureTitle}>
                                        University Applications
                                    </h5>
                                    <p className={styles.featureDesc}>
                                        400+ Chinese Universities: Including
                                        top-tier Chinese institutions (985/211)
                                    </p>
                                    <p className={styles.featureDesc}>
                                        Streamlined Process: Visa support,
                                        pre-session guidance
                                    </p>
                                </div>
                            </div>

                            <div className={styles.feature}>
                                <div className={styles.bulletPoint}></div>
                                <div className={styles.featureContent}>
                                    <h5 className={styles.featureTitle}>
                                        Cultural & Career Integration
                                    </h5>
                                    <p className={styles.featureDesc}>
                                        Job Links: Partnerships with 100+ com
                                    </p>
                                    <p className={styles.featureDesc}>
                                        Local Expertise: Regional hubs in
                                        Singapore
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 右侧统计数据 */}
                    <div className={styles.statsContainer}>
                        <div className={styles.statsGrid}>
                            {stats.map((stat) => (
                                <div key={stat.id} className={styles.statItem}>
                                    <div
                                        className={styles.statCircle}
                                        style={{ backgroundColor: stat.color }}
                                    >
                                        <span className={styles.statNumber}>
                                            {stat.number}
                                        </span>
                                    </div>
                                    <p className={styles.statLabel}>
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer 部分 */}
                <div className={styles.footer}>
                    <div className={styles.footerColumns}>
                        <div className={styles.footerColumn}>
                            <h6 className={styles.footerTitle}>About us</h6>
                            <a href="#" className={styles.footerLink}>
                                our services
                            </a>
                            <a href="#" className={styles.footerLink}>
                                our stories
                            </a>
                        </div>

                        <div className={styles.footerColumn}>
                            <h6 className={styles.footerTitle}>For students</h6>
                            <a href="#" className={styles.footerLink}>
                                Support
                            </a>
                            <a href="#" className={styles.footerLink}>
                                Admission
                            </a>
                        </div>

                        <div className={styles.footerColumn}>
                            <h6 className={styles.footerTitle}>
                                For universities
                            </h6>
                            <a href="#" className={styles.footerLink}>
                                Advertise with us
                            </a>
                        </div>

                        <div className={styles.footerColumn}>
                            <h6 className={styles.footerTitle}>Follow us</h6>
                            <div className={styles.socialIcons}>
                                {/* WhatsApp 图标 */}
                                <div
                                    className={`${styles.socialIconContainer} ${styles.whatsappContainer}`}
                                    onMouseEnter={handleWhatsAppMouseEnter}
                                    onMouseLeave={handleWhatsAppMouseLeave}
                                >
                                    <Image
                                        src="/assets/image/PhoneIcon.png"
                                        alt="WhatsApp"
                                        width={24}
                                        height={24}
                                        className={`${styles.socialIcon} ${styles.whatsappIcon}`}
                                    />
                                    {isWhatsAppHovered && (
                                        <div
                                            className={`${styles.socialTooltip} ${styles.wechatTooltip}`}
                                        >
                                            <div
                                                className={`${styles.tooltipContent} ${styles.wechatTooltipContent}`}
                                            >
                                                <div
                                                    className={
                                                        styles.wechatTooltipContentTitle
                                                    }
                                                >
                                                    <div>WhatsApp/Phone:</div>
                                                    <div>+853 65702421</div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.wechatTooltipContentImage
                                                    }
                                                >
                                                    <Image
                                                        src="/assets/image/WhatsApp.png"
                                                        alt="WeChat QR Code"
                                                        width={200}
                                                        height={200}
                                                        className={
                                                            styles.wechatQrCode
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className={styles.tooltipArrow}
                                            ></div>
                                        </div>
                                    )}
                                </div>

                                {/* Telegram 图标 */}
                                <div
                                    className={`${styles.socialIconContainer} ${styles.telegramContainer}`}
                                    onMouseEnter={handleTelegramMouseEnter}
                                    onMouseLeave={handleTelegramMouseLeave}
                                >
                                    <Image
                                        src="/assets/image/TelegramIcon.png"
                                        alt="Telegram"
                                        width={24}
                                        height={24}
                                        className={`${styles.socialIcon} ${styles.telegramIcon}`}
                                    />
                                    {isTelegramHovered && (
                                        <div
                                            className={`${styles.socialTooltip} ${styles.telegramTooltip}`}
                                        >
                                            <div
                                                className={`${styles.tooltipContent} ${styles.telegramTooltipContent}`}
                                            >
                                                <div>Telegram：</div>
                                                <div>+853 65702421</div>
                                            </div>
                                            <div
                                                className={styles.tooltipArrow}
                                            ></div>
                                        </div>
                                    )}
                                </div>

                                {/* WeChat 图标 */}
                                <div
                                    className={`${styles.socialIconContainer} ${styles.wechatContainer}`}
                                    onMouseEnter={handleWechatMouseEnter}
                                    onMouseLeave={handleWechatMouseLeave}
                                >
                                    <Image
                                        src="/assets/image/WechatIcon.png"
                                        alt="WeChat"
                                        width={24}
                                        height={24}
                                        className={`${styles.socialIcon} ${styles.wechatIcon}`}
                                    />
                                    {isWechatHovered && (
                                        <div
                                            className={`${styles.socialTooltip} ${styles.wechatTooltip}`}
                                        >
                                            <div
                                                className={`${styles.tooltipContent} ${styles.wechatTooltipContent}`}
                                            >
                                                <div
                                                    className={
                                                        styles.wechatTooltipContentTitle
                                                    }
                                                >
                                                    <div>WeChat:</div>
                                                    <div>Mia_Miaoao</div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.wechatTooltipContentImage
                                                    }
                                                >
                                                    <Image
                                                        src="/assets/image/WechatQrcode.png"
                                                        alt="WeChat QR Code"
                                                        width={200}
                                                        height={200}
                                                        className={
                                                            styles.wechatQrCode
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                className={styles.tooltipArrow}
                                            ></div>
                                        </div>
                                    )}
                                </div>

                                {/* TikTok 图标 */}
                                <div
                                    className={`${styles.socialIconContainer} ${styles.tiktokContainer}`}
                                    onMouseEnter={handleTikTokMouseEnter}
                                    onMouseLeave={handleTikTokMouseLeave}
                                    onClick={handleTikTokClick}
                                >
                                    <Image
                                        src="/assets/image/TikTokIcon.png"
                                        alt="TikTok"
                                        width={24}
                                        height={24}
                                        className={`${styles.socialIcon} ${
                                            styles.tiktokIcon
                                        } ${
                                            isTikTokHovered
                                                ? styles.tiktokIconHovered
                                                : ""
                                        }`}
                                    />
                                </div>

                                {/* YouTube 图标 */}
                                <div
                                    className={`${styles.socialIconContainer} ${styles.youtubeContainer}`}
                                    onMouseEnter={handleYouTubeMouseEnter}
                                    onMouseLeave={handleYouTubeMouseLeave}
                                    onClick={handleYouTubeClick}
                                >
                                    <Image
                                        src="/assets/image/YoutubeIcon.png"
                                        alt="YouTube"
                                        width={24}
                                        height={18}
                                        className={`${styles.socialIcon} ${
                                            styles.youtubeIcon
                                        } ${
                                            isYouTubeHovered
                                                ? styles.youtubeIconHovered
                                                : ""
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 置顶按钮 */}
            {showScrollToTop && (
                <button
                    className={styles.scrollToTopButton}
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                >
                    <Image
                        src="/assets/image/ScrollToTop.png"
                        alt="Scroll to top"
                        width={60}
                        height={60}
                        className={styles.scrollToTopIcon}
                    />
                </button>
            )}
        </section>
    );
};

export default AboutUs;
