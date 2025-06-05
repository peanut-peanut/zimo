"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionTitle from "../../../../components/SectionTitle";
import styles from "./index.module.css";

const OutstandingPrograms = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0); // 从0开始
    const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
    const [hoveredElements, setHoveredElements] = useState<{
        [key: string]: boolean;
    }>({});
    const [isClosing, setIsClosing] = useState(false);
    const totalSlides = 5;
    const [innerWidth, setInnerWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            setInnerWidth(0.7292 * window.innerWidth);
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    // Programs data
    const programs = [
        {
            id: 1,
            title: "Traditional Chinese Medicine(TCM)",
            university: "Nanjing University of Chinese Medicine",
            duration: "Bachelor 5 Years",
            language: "Chinese",
            fee: "RMB 24,000 Per Year",
            image: "/assets/image/OutstandingPrograms1.png",
            icon: "/assets/image/icon1.png",
            reasons: [
                "One of the earliest universities of Traditional Chinese Medicine (TCM) founded in China.",
                'NJUCM has been renowned as "the cradle of China\'s higher education in Chinese Medicine".',
                "WHO Collaborating Centre for Traditional Medicine.",
            ],
        },
        {
            id: 2,
            title: "MBBS (Bachelor of Medicine and Bachelor of Surgery)",
            university: "Chongqing Medical University",
            duration: "Bachelor 6 Years",
            language: "English",
            fee: "RMB 42,000 Per Year",
            image: "/assets/image/OutstandingPrograms2.png",
            icon: "/assets/image/icon2.png",
            reasons: [
                "Internationally recognized medical degree with comprehensive clinical training.",
                "Modern facilities and diverse patient exposure.",
                "Opportunity to learn both Western and Chinese medicine approaches.",
            ],
        },
        {
            id: 3,
            title: "Civil Engineering",
            university: "Northwestern Polytechnical University",
            duration: "Bachelor 4 Years",
            language: "English",
            fee: "RMB 26,000 Per Year",
            image: "/assets/image/OutstandingPrograms3.png",
            icon: "/assets/image/icon3.png",
            reasons: [
                "World-class civil engineering program focusing on sustainable development.",
                "Strong industry connections and modern laboratory facilities.",
                "Excellent career prospects in infrastructure and construction.",
            ],
        },
        {
            id: 4,
            title: "Mechanical Engineering",
            university: "China University of Mining and Technology",
            duration: "Bachelor 4 Years",
            language: "English",
            fee: "RMB 28,000 Per Year",
            image: "/assets/image/OutstandingPrograms4.png",
            icon: "/assets/image/icon4.png",
            reasons: [
                "Comprehensive mechanical engineering education with specializations in robotics.",
                "Strong research focus and industry partnerships.",
                "Modern laboratories with cutting-edge equipment.",
            ],
        },
        {
            id: 5,
            title: "Software Engineering",
            university: "Zhejiang University of Technology",
            duration: "Bachelor 4 Years",
            language: "English",
            fee: "RMB 26,000 Per Year",
            image: "/assets/image/OutstandingPrograms5.png",
            icon: "/assets/image/icon5.png",
            reasons: [
                "Cutting-edge software engineering program with focus on AI and data science.",
                "Industry-aligned curriculum with practical projects and internship opportunities.",
                "Located in Hangzhou, one of China's major tech hubs.",
            ],
        },
    ];

    // 创建扩展的卡片列表，支持单张切换
    const createExtendedPrograms = () => {
        const extended: any[] = [];
        // 无限循环
        for (let i = 0; i < 100; i++) {
            programs.forEach((program, index) => {
                extended.push({
                    ...program,
                    id: program.id + i * totalSlides + index, // 确保每个卡片都有唯一ID
                    originalId: program.id, // 保留原始ID用于详情页面
                });
            });
        }
        return extended;
    };

    // 计算轨道的transform值 - 每次移动一张卡片的距离
    const getTrackTransform = () => {
        // 每张卡片宽度200px + gap，总共移动的距离
        const cardWidth = 200;
        // 可视区域共5张卡片，间距是动态的，所以gap是动态的
        // 总宽度是100vw-16vw-11.08vw-5.54vw=67.4vw
        // 5张卡片宽度是67.4vw-20px*4=67.4vw-80px
        // 所以每张卡片宽度是(67.4vw-80px)/5=13.48vw-16px
        const gap = (innerWidth - 5 * cardWidth) / 4;
        const moveDistance = cardWidth + gap;
        return `translateX(-${currentSlide * moveDistance}px)`;
    };

    // Observe when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
                    setIsVisible(true);
        }
      },
            { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

    // Handle program selection
    const openProgramDetail = (programId: number) => {
        // 防抖
        setTimeout(() => {
            setIsClosing(false);
            setSelectedProgram(programId);
        }, 100);
    };

    const closeProgramDetail = () => {
        if (!isClosing) {
            setIsClosing(true);
            // 延迟清除selectedProgram，让关闭动画完成
            setTimeout(() => {
                setSelectedProgram(null);
                setIsClosing(false);
            }, 600); // 与CSS动画时间一致
        }
    };

    // Get selected program
    const getSelectedProgram = () => {
        return programs.find((program) => program.id === selectedProgram);
    };

    // 处理悬停状态
    const handleMouseEnter = (elementId: string) => {
        setHoveredElements((prev) => ({ ...prev, [elementId]: true }));
    };

    const handleMouseLeave = (elementId: string) => {
        setHoveredElements((prev) => ({ ...prev, [elementId]: false }));
    };

    // 轮播控制逻辑 - 单张切换
    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

  return (
        <section
            ref={sectionRef}
            className={styles.programsContainer}
            onClick={closeProgramDetail}
        >
            {/* 背景图容器 - 只占据300px高度 */}
            {/* <div className={styles.backgroundImage}></div> */}

            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "312px", zIndex: 1 }}>
                <Image
                    src="/assets/image/OutstandingBackground.png"
                    alt="Outstanding Programs"
                    fill
                    style={{ objectFit: "cover" }}
                    className={styles.backgroundImage}
                />
            </div>

            {/* 内容包装器 */}
            <div className={styles.contentWrapper}>
                <div
                    className={`${
                        isVisible ? "opacity-100" : "opacity-0"
                    } transition-opacity duration-500`}
                >
                    {/* Heading with decorative squares */}
                    <SectionTitle title="Outstanding Programs" fontColor="#fff" />

                    {/* Carousel */}
                    <div className={styles.carouselContainer}>
                        {/* Navigation Arrows */}
                        {!selectedProgram && (
            <button
                                className={`${styles.navigationArrow} ${styles.prevArrow}`}
                                onClick={prevSlide}
                                aria-label="Previous"
                            >
                                ‹
                            </button>
                        )}

                        <div className={styles.carouselInner}>
                            <div
                                className={styles.carouselTrack}
                                style={{ transform: getTrackTransform() }}
                            >
                                {createExtendedPrograms().map((program) => (
                                    <div
              key={program.id}
                                        className={styles.programCard}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openProgramDetail(
                                                program.originalId
                                            );
                                        }}
                                    >
                                        <div className={styles.cardImage}>
                                            <Image
                                                src={program.image}
                                                alt={program.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div
                                                className={
                                                    styles.universityIcon
                                                }
                                            >
                                                <Image
                                                    src={program.icon}
                                                    alt={`${program.university} icon`}
                                                    width={38}
                                                    height={38}
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.cardContent}>
                                            <h3
                                                className={styles.programTitle}
                                                style={{
                                                    color: hoveredElements[
                                                        `title-${program.id}`
                                                    ]
                                                        ? "#FF6B35"
                                                        : "#2E4057",
                                                    cursor: "pointer",
                                                }}
                                                onMouseEnter={() =>
                                                    handleMouseEnter(
                                                        `title-${program.id}`
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    handleMouseLeave(
                                                        `title-${program.id}`
                                                    )
                                                }
            >
              {program.title}
                                            </h3>
                                            <p
                                                className={
                                                    styles.universityName
                                                }
                                                style={{
                                                    color: hoveredElements[
                                                        `university-${program.id}`
                                                    ]
                                                        ? "#FF6B35"
                                                        : "#3A3E48",
                                                    cursor: "pointer",
                                                }}
                                                onMouseEnter={() =>
                                                    handleMouseEnter(
                                                        `university-${program.id}`
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    handleMouseLeave(
                                                        `university-${program.id}`
                                                    )
                                                }
                                            >
                                                {program.university}
                                            </p>
                                        </div>
                                    </div>
          ))}
        </div>

                            {/* 新的详情页面 - 覆盖在carouselInner上 */}
                            <div
                                className={`${styles.detailPage} ${
                                    selectedProgram && !isClosing
                                        ? styles.active
                                        : ""
                                } ${isClosing ? styles.closing : ""}`}
                                onClick={(e) => {
                                    if (!isClosing) {
                                        closeProgramDetail();
                                    }
                                }}
                            >
                                {selectedProgram && (
                                    <div
                                        className={styles.detailPageContent}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className={styles.detailPageImage}>
                <Image
                                                src={
                                                    getSelectedProgram()
                                                        ?.image || ""
                                                }
                                                alt={
                                                    getSelectedProgram()
                                                        ?.title || ""
                                                }
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className={styles.detailPageInfo}>
                                            <div>
                                                <h2
                                                    className={
                                                        styles.detailPageTitle
                                                    }
                                                >
                                                    {
                                                        getSelectedProgram()
                                                            ?.title
                                                    }
                                                </h2>
                                                <p
                                                    className={
                                                        styles.detailPageUniversity
                                                    }
                                                >
                                                    {
                                                        getSelectedProgram()
                                                            ?.university
                                                    }
                                                </p>

                                                <div
                                                    className={
                                                        styles.detailPageInfoContent
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.detailPageInfoGrid
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.detailPageInfoItem
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.detailPageInfoLabel
                                                                }
                                                            >
                                                                Degree:
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.detailPageInfoValue
                                                                }
                                                            >
                                                                {
                                                                    getSelectedProgram()
                                                                        ?.duration
                                                                }
                                                            </div>
                                                        </div>

                                                        <div
                                                            className={
                                                                styles.detailPageInfoItem
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.detailPageInfoLabel
                                                                }
                                                            >
                                                                Teaching Language:
                                                               
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.detailPageInfoValue
                                                                }
                                                            >
                                                                {
                                                                    getSelectedProgram()
                                                                        ?.language
                                                                }
                                                            </div>
              </div>
              
                                                        <div
                                                            className={
                                                                styles.detailPageInfoItem
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.detailPageInfoLabel
                                                                }
                                                            >
                                                                Tuition:
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.detailPageInfoValue
                                                                }
                                                            >
                                                                {
                                                                    getSelectedProgram()
                                                                        ?.fee
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.detailPageReasonsList
                                                        }
                                                    >
                                                        <h3
                                                            className={
                                                                styles.detailPageReasonsTitle
                                                            }
                                                        >
                                                            Recommended Reasons
                                                            :
                                                        </h3>
                                                        <ul
                                                            className={
                                                                styles.detailPageReasonsList
                                                            }
                                                        >
                                                            {getSelectedProgram()?.reasons.map(
                                                                (
                                                                    reason,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        className={
                                                                            styles.detailPageReasonItem
                                                                        }
                                                                    >
                                                                        <div
                                                                            className={
                                                                                styles.detailPageReasonNumber
                                                                            }
                                                                        >
                                                                            {index +
                                                                                1}
                                                                        </div>
                                                                        <div
                                                                            className={
                                                                                styles.detailPageReasonText
                                                                            }
                                                                        >
                                                                            {
                                                                                reason
                                                                            }
                                                                        </div>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div
                                                    className={
                                                        styles.detailPageButton
                                                    }
                                                >
                                                    Learn More
                                                </div>
                  </div>
                  </div>
                  </div>
                                )}
                  </div>
                </div>
                
                        {!selectedProgram && (
                            <button
                                className={`${styles.navigationArrow} ${styles.nextArrow}`}
                                onClick={nextSlide}
                                aria-label="Next"
                            >
                                ›
                            </button>
                        )}
                    </div>

                    {/* Pagination Dots */}
                    {!selectedProgram && (
                        <div className={styles.paginationContainer}>
                            {Array.from({ length: totalSlides }).map(
                                (_, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.paginationDot} ${
                                            currentSlide === index
                                                ? styles.active
                                                : ""
                                        }`}
                                        onClick={() => goToSlide(index)}
                                        role="button"
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                )
                            )}
                        </div>
                    )}
              </div>
      </div>
    </section>
  );
};

export default OutstandingPrograms; 
