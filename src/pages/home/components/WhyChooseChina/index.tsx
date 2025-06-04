"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SectionTitle from "../../../../components/SectionTitle";
import styles from "./index.module.css";

const WhyChooseChina = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
    const [hasEnded, setHasEnded] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [wasPlayingBeforeDrag, setWasPlayingBeforeDrag] = useState(false);

    // 判断是否应该显示封面
    const shouldShowCover = !hasStartedPlaying || hasEnded;

    // 格式化时间为 MM:SS 格式
    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    // 监听视频事件
    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleTimeUpdate = () => {
            if (!isDragging) {
                const currentTime = videoElement.currentTime;
                const duration = videoElement.duration || 0;
                setCurrentTime(currentTime);
                setProgress((currentTime / duration) * 100);
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(videoElement.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
            setHasEnded(true);
            videoElement.currentTime = 0;
        };

        const handlePlay = () => {
            setHasStartedPlaying(true);
            setHasEnded(false);
        };

        videoElement.addEventListener("timeupdate", handleTimeUpdate);
        videoElement.addEventListener("loadedmetadata", handleLoadedMetadata);
        videoElement.addEventListener("ended", handleEnded);
        videoElement.addEventListener("play", handlePlay);

        return () => {
            videoElement.removeEventListener("timeupdate", handleTimeUpdate);
            videoElement.removeEventListener(
                "loadedmetadata",
                handleLoadedMetadata
            );
            videoElement.removeEventListener("ended", handleEnded);
            videoElement.removeEventListener("play", handlePlay);
        };
    }, [isDragging]);

    // 清除计时器的函数
    const clearHideControlsTimer = () => {
        if (hideControlsTimerRef.current) {
            clearTimeout(hideControlsTimerRef.current);
            hideControlsTimerRef.current = null;
        }
    };

    // 设置计时器隐藏控制栏
    const startHideControlsTimer = () => {
        clearHideControlsTimer();
        hideControlsTimerRef.current = setTimeout(() => {
            setShowControls(false);
        }, 2000);
    };

    // 监听全局点击事件，点击视频区域外立即隐藏控制栏
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                videoContainerRef.current &&
                !videoContainerRef.current.contains(event.target as Node)
            ) {
                console.log("out");
                setShowControls(false);
                clearHideControlsTimer();
            } else if (!shouldShowCover) {
                // 只有在不显示封面时才显示控制栏
                console.log("in");
                setShowControls(true);
                clearHideControlsTimer();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            clearHideControlsTimer();
        };
    }, [shouldShowCover]);

    // 监听全局鼠标移动和松开事件，用于拖拽进度条
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging && progressRef.current && videoRef.current) {
                e.preventDefault();
                const progressRect =
                    progressRef.current.getBoundingClientRect();
                const clickPosition = e.clientX - progressRect.left;
                const percentClicked =
                    (clickPosition / progressRect.width) * 100;

                // 确保百分比在0-100范围内
                const boundedPercent = Math.max(
                    0,
                    Math.min(100, percentClicked)
                );

                // 更新UI
                setProgress(boundedPercent);

                // 预览时间位置
                const newTime =
                    (boundedPercent / 100) * (videoRef.current.duration || 0);
                setCurrentTime(newTime);
            }
        };

        const handleMouseUp = () => {
            if (isDragging && videoRef.current) {
                // 设置视频时间
                const newTime =
                    (progress / 100) * (videoRef.current.duration || 0);
                videoRef.current.currentTime = newTime;

                // 如果用户拖动到视频末尾
                if (progress >= 99.9) {
                    setHasEnded(true);
                    setIsPlaying(false);
                } else if (hasEnded) {
                    setHasEnded(false);
                }

                // 恢复拖拽前的播放状态
                if (wasPlayingBeforeDrag && progress < 99.9) {
                    videoRef.current.play();
                    setIsPlaying(true);
                } else if (!wasPlayingBeforeDrag) {
                    setIsPlaying(false);
                }

                setIsDragging(false);
                setWasPlayingBeforeDrag(false); // 重置状态
            }
        };

        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, progress, hasEnded, wasPlayingBeforeDrag]);

    const handleVideoPlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
                setHasStartedPlaying(true);
                setHasEnded(false);
            }
            setIsPlaying(!isPlaying);
        }
    };

    // 处理进度条点击
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!progressRef.current || !videoRef.current) return;

        const progressRect = progressRef.current.getBoundingClientRect();
        const clickPosition = e.clientX - progressRect.left;
        const percentClicked = (clickPosition / progressRect.width) * 100;

        // 确保百分比在0-100范围内
        const boundedPercent = Math.max(0, Math.min(100, percentClicked));

        // 设置视频时间
        const newTime =
            (boundedPercent / 100) * (videoRef.current.duration || 0);
        videoRef.current.currentTime = newTime;

        // 更新UI
        setProgress(boundedPercent);
        setCurrentTime(newTime);

        // 如果用户拖动到视频末尾
        if (boundedPercent >= 99.9) {
            setHasEnded(true);
        } else {
            setHasEnded(false);
        }
    };

    // 处理进度条拖拽开始
    const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();

        // 记录拖拽前的播放状态
        setWasPlayingBeforeDrag(isPlaying);
        setIsDragging(true);

        // 暂时暂停视频，便于精确拖拽
        if (isPlaying && videoRef.current) {
            videoRef.current.pause();
        }

        // 立即更新进度条位置
        handleProgressClick(e);
    };

    // 处理鼠标进入视频区域
    const handleMouseEnter = () => {
        // 只有在已经开始播放且未结束时才显示控制栏
        if (!shouldShowCover) {
            clearHideControlsTimer();
            setShowControls(true);
        }
    };

    // 处理鼠标离开视频区域
    const handleMouseLeave = () => {
        // 无论视频是否正在播放，都设置计时器隐藏控制栏
        if (!isDragging) {
            startHideControlsTimer();
        }
    };

    return (
        <section
            id="why-china"
            className="py-16 relative section-container-horizontal"
            style={{ backgroundColor: "#FFFFFF" }}
        >
            <div className="container mx-auto">
                <SectionTitle title="Why choose China" />

                <div className="grid md:grid-cols-2 gap-4 items-center">
                    {/* 左侧视频播放器 */}
                    <div
                        ref={videoContainerRef}
                        className={`relative rounded-lg overflow-hidden shadow-lg mx-auto`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            className="aspect-video relative cursor-pointer w-full h-full"
                            onClick={handleVideoPlay}
                        >
                            {/* 视频元素 */}
                            <video
                                ref={videoRef}
                                className={`w-full h-full object-cover ${
                                    shouldShowCover
                                        ? "opacity-0"
                                        : "opacity-100"
                                }`}
                                src="https://zimo.club/assets/video/zimo.mp4"
                                preload="metadata"
                            />

                            {/* 封面图 */}
                            {shouldShowCover && (
                                <div className="absolute inset-0">
                                    <Image
                                        src="/assets/image/VideoThumb.jpg"
                                        alt="Video cover"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            {/* 播放按钮覆盖层 */}
                            {!isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 z-10">
                                    <div className="w-16 h-16 relative">
                                        <Image
                                            src="/assets/image/VideoPlayIcon.png"
                                            alt="Play"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* 视频控制条 - 悬停或播放时显示，但仅在不显示封面时 */}
                            {!shouldShowCover && (
                                <div
                                    className={`absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 transition-opacity duration-300 z-20 ${
                                        showControls
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }`}
                                    style={{
                                        paddingTop: "10px",
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {/* 进度条 */}
                                    <div
                                        ref={progressRef}
                                        className="h-2 bg-gray-700 rounded-full mb-2 cursor-pointer"
                                        onClick={handleProgressClick}
                                        onMouseDown={handleProgressMouseDown}
                                    >
                                        <div
                                            className="h-full bg-orange-500 rounded-full relative"
                                            style={{ width: `${progress}%` }}
                                        >
                                            {/* 拖拽手柄 */}
                                            <div
                                                className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-white ${
                                                    isDragging
                                                        ? "scale-150"
                                                        : ""
                                                }`}
                                                style={{
                                                    transition:
                                                        "transform 0.1s ease",
                                                    boxShadow:
                                                        "0 0 2px rgba(0,0,0,0.5)",
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* 控制按钮和时间显示 */}
                                    <div className="flex items-center justify-between">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleVideoPlay();
                                            }}
                                            className="text-white focus:outline-none"
                                        >
                                            {isPlaying ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            )}
                                        </button>

                                        <div className="text-white text-sm">
                                            {formatTime(currentTime)} /{" "}
                                            {formatTime(duration)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 右侧文案 */}
                    <div
                        className="flex flex-col justify-between"
                        style={{
                            height: "100%",
                        }}
                    >
                        <div className="flex items-start">
                            <div className={styles.bulletPoint}>•</div>
                            <p className={styles.text}>
                                Experience the world&apos;s fastest-growing
                                economy, where innovation meets opportunity in a
                                dynamic global hub.
                            </p>
                        </div>

                        <div className="flex items-start">
                            <div className={styles.bulletPoint}>•</div>
                            <p className={styles.text}>
                                Discover a civilization with 5000 years of
                                culture, offering profound learning beyond the
                                classroom.
                            </p>
                        </div>

                        <div className="flex items-start">
                            <div className={styles.bulletPoint}>•</div>
                            <p className={styles.text}>
                                Study at internationally ranked universities
                                with generous scholarships and lower costs than
                                Western institutions!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseChina;
