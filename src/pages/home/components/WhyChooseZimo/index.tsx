"use client";

import Image from "next/image";
import { useState } from "react";
import SectionTitle from "../../../../components/SectionTitle";

const WhyChooseZimo = () => {
    // 分别为每个文本元素添加悬停状态
    const [hoveredElements, setHoveredElements] = useState<{[key: string]: boolean}>({});

    // 计算参考值：屏幕宽1440px时的尺寸比例
    // 卡片宽度: 250/1440 ≈ 17.36vw
    // 卡片高度: 300/1440 ≈ 20.83vw
    // 图片高度: 128/1440 ≈ 8.89vw
    // 间距: 15/1440 ≈ 1.04vw
    // 标题字体大小: 13.5/1440 ≈ 0.9375vw
    // 描述字体大小: 10.5/1440 ≈ 0.73vw
    const cardWidth = "max(230px, 17.75vw)";
    const cardHeight = "max(270px, 22.83vw)";
    const imageHeight = "max(110px, 8.89vw)";
    const gap = "max(10px, 1.24vw)";
    const titleFontSize = "max(14px, 0.9975vw)";
    const descFontSize = "max(13px, 0.83vw)";
    const titleLineHeight = "max(18px, 1.25vw)";  // 相应调整行高
    const descLineHeight = "max(16px, 1.04vw)";   // 相应调整行高


    // 处理悬停状态
    const handleMouseEnter = (elementId: string) => {
        setHoveredElements(prev => ({...prev, [elementId]: true}));
    };

    const handleMouseLeave = (elementId: string) => {
        setHoveredElements(prev => ({...prev, [elementId]: false}));
    };

    const features = [
        {
            id: 1,
            title: "Have a better understanding of Chinese universities",
            description:
                "We can directly connect with schools and have a better understanding of the school's competitiveness and requirements. Our prices are more affordable.",
            image: "/assets/image/WhyChooseZimo1.png",
        },
        {
            id: 2,
            title: "more convenient than applying on your own",
            description:
                "We provide real-time services and help you solve problems such as language, translation, text optimization, and cross-border payments.",
            image: "/assets/image/WhyChooseZimo2.png",
        },
        {
            id: 3,
            title: "one-stop services",
            description:
                "After you successfully apply to a school, we provide one-stop services including visa agency, flight ticket booking, airport pick-up upon arrival, dormitory reservation, and school registration.",
            image: "/assets/image/WhyChooseZimo3.png",
        },
        {
            id: 4,
            title: "A vast network of partners",
            description:
                "As a strategic partner of the China Education Association for International Exchange (CEAIE), ZIMO collaborates with over 400 universities and more than 100 partners, offering more than 30,000 programs and scholarships, opening up unlimited possibilities for you to realize your Chinese dream.",
            image: "/assets/image/WhyChooseZimo4.png",
        },
    ];

    return (
        <section id="why-zimo" className="py-16 section-container-horizontal" style={{ backgroundColor: '#F6F6F6' }}>
            <SectionTitle title="Why choose zimo" marginBottom="0px" />
            <p className="text-center text-gray-600 mb-10 alibaba-font-regular">
                Most importantly, we are a Chinese institution!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: gap }}>
                {features.map((feature) => (
                    <div
                        key={feature.id}
                        className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        style={{ 
                            width: cardWidth,
                            height: cardHeight
                        }}
                    >
                        <div 
                            className="relative" 
                            style={{ 
                                width: "100%", 
                                height: imageHeight
                            }}
                        >
                            <Image
                                src={feature.image}
                                alt={feature.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="p-2 lg:px-4" style={{ height: `calc(${cardHeight} - ${imageHeight})` }}>
                            <div 
                                className="mt-2 mb-1 transition-colors duration-300 alibaba-font-medium"
                                style={{ 
                                    //fontFamily: 'PingFang SC, sans-serif',
                                    fontSize: titleFontSize,
                                    //fontWeight: 500,
                                    letterSpacing: 'normal',
                                    lineHeight: titleLineHeight,
                                    color: hoveredElements[`title-${feature.id}`] ? '#FF6B35' : '#2E4057',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={() => handleMouseEnter(`title-${feature.id}`)}
                                onMouseLeave={() => handleMouseLeave(`title-${feature.id}`)}
                            >
                                {feature.title}
                            </div>
                            <div 
                                className="transition-colors duration-300 alibaba-font-regular"
                                style={{ 
                                    //fontFamily: 'PingFang SC, sans-serif',
                                    fontSize: descFontSize,
                                    //fontWeight: 400,
                                    letterSpacing: 'normal',
                                    lineHeight: descLineHeight,
                                    color: hoveredElements[`desc-${feature.id}`] ? '#FF6B35' : '#3A3E48',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={() => handleMouseEnter(`desc-${feature.id}`)}
                                onMouseLeave={() => handleMouseLeave(`desc-${feature.id}`)}
                            >
                                {feature.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseZimo;
