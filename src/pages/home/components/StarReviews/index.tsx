"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SectionTitle from "../../../../components/SectionTitle";
import styles from "./index.module.css";

const StarReviews = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const animationRef = useRef<number | null>(null);
    const [slidePosition, setSlidePosition] = useState(0);

    // 评论数据 - 使用不同长度的评论内容，展示高度差异
    const reviews = [
        {
            id: 1,
            name: "Howlader Urnisha",
            country: "Bangladesh",
            avatar: "/assets/image/StarReviews1.png",
            stars: 5,
            review: "You have processed my daughter Urnisha's admission in Wuhan University. I am very pleased for your smooth & reliable service!",
        },
        {
            id: 2,
            name: "Bensen Nolan",
            country: "USA",
            avatar: "/assets/image/StarReviews2.png",
            stars: 5,
            review: "Thank you ZIMO. You've been a great help, well worth the $100 I payed for your services. I'll be sure to review your website well online and recommend it to many other graduates I know who want to study in China. The process was straightforward and the communication was excellent throughout.",
        },
        {
            id: 3,
            name: "Samuel Chigbo Obiegbusi",
            country: "Guyana",
            avatar: "/assets/image/StarReviews3.png",
            stars: 5,
            review: "Good evening Rita, With great joy and happiness in my heart, I wish to say a big thank you to you and all the ZIMO team, Catherol and Andy included, for your professional and dedicated effort towards making my application a success!",
        },
        {
            id: 4,
            name: "JOYLYN ROSELYN BENEDICT ALI",
            country: "Zimbabwe",
            avatar: "/assets/image/StarReviews4.png",
            stars: 5,
            review: "I would like to thank the whole ZIMO team for the wonderful service provided! I received my admission package! The entire process from application to admission was handled professionally. I'm now studying at my dream university in China.",
        },
    ];

    // 创建一个非常长的评论列表，以实现真正的无限滚动
    // 使用多份数据以确保滚动过程中不会出现空白
    const extendedReviews = [];
    // 添加20组数据，确保足够长的滚动内容
    for (let i = 0; i < 20; i++) {
        extendedReviews.push(...reviews.map(review => ({
            ...review,
            id: `${review.id}-${i}` // 添加唯一ID以防止React key重复
        })));
    }

    // 观察元素是否进入视口
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
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

    // 实现真正的无限滚动
    const scrollLeft = () => {
        // 只需要简单地增加滚动位置，不需要检查和重置
        setSlidePosition(prev => prev + 1);
    };

    // 使用requestAnimationFrame处理滚动动画
    const startScrollAnimation = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
        
        let lastTime = 0;
        const animate = (time: number) => {
            if (time - lastTime > 30) {
                // 降低更新频率，约33fps
                scrollLeft();
                lastTime = time;
            }
            
            if (isVisible && !isPaused) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };
        
        animationRef.current = requestAnimationFrame(animate);
    };
    
    const stopScrollAnimation = () => {
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }
    };

    // 监听可见性和暂停状态变化，控制滚动
    useEffect(() => {
        // 当元素可见且未暂停时，开始滚动
        if (isVisible && !isPaused) {
            startScrollAnimation();
        } else {
            stopScrollAnimation();
        }

        return () => {
            stopScrollAnimation();
        };
    }, [isVisible, isPaused]);

    // 处理鼠标悬浮事件
    const handleMouseEnter = (id: string) => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    return (
        <section
            id="reviews"
            className="py-16 px-0 relative"
            style={{ backgroundColor: "#fff" }}
            ref={sectionRef}
        >
            <div className={`w-full`}>
                {/* 标题 */}
                <SectionTitle title="Over 1,000 5-Star Reviews" />

                {/* 评论轮播容器 */}
                <div className={styles.reviewContainer} ref={containerRef}>
                    <div className={styles.reviewWrapper}>
                        <div
                            ref={sliderRef}
                            className={styles.reviewSlider}
                            style={{
                                transform: `translateX(-${slidePosition}px)`,
                            }}
                        >
                            {/* 使用扩展后的超长评论数组，实现无需复位的无限滚动 */}
                            {extendedReviews.map((review) => (
                                <div
                                    key={review.id.toString()}
                                    className={styles.reviewCard}
                                    onMouseEnter={() => handleMouseEnter(review.id.toString())}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className={styles.avatarContainer}>
                                        <Image
                                            src={review.avatar}
                                            alt={review.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className={styles.userInfo}>
                                        <div>
                                            <div className={styles.userName}>
                                                {review.name}
                                            </div>
                                            <p className={styles.userCountry}>
                                                {review.country}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.starRating}>
                                        {[...Array(review.stars)].map(
                                            (_, i) => (
                                                <span key={i}>★</span>
                                            )
                                        )}
                                    </div>
                                    <p 
                                        className={styles.reviewText}
                                        // style={{
                                        //     color: hoveredCardId === review.id.toString() ? '#ff6b35' : undefined
                                        // }}
                                    >
                                        {review.review}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StarReviews;
