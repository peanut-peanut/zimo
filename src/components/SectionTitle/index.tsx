"use client";

import React from "react";
import styles from "./index.module.css";

interface SectionTitleProps {
    title: string;
    className?: string;
    fontColor?: string;
    marginBottom?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    className,
    fontColor = "#2E4057",
    marginBottom = "30px",
}) => {
    return (
        <div className={`${styles.sectionTitleContainer} ${className || ""}`}
        style={{ marginBottom: marginBottom }}
        >
            {/* 左侧装饰方块 */}
            <div className={styles.leftDecorations}>
                <div className={`${styles.square} ${styles.yellow}`}></div>
                <div className={`${styles.square} ${styles.red}`}></div>
            </div>

            {/* 标题文本 */}
            <h2 className={styles.titleText} style={{ color: fontColor }}>
                {title}
            </h2>

            {/* 右侧装饰方块 */}
            <div className={styles.rightDecorations}>
                <div className={`${styles.square} ${styles.orange}`}></div>
                <div className={`${styles.square} ${styles.blue}`}></div>
            </div>
        </div>
    );
};

export default SectionTitle;
