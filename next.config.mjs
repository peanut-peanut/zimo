/** @type {import('next').NextConfig} */
const nextConfig = {
    // 根据环境决定是否进行静态导出
    output: process.env.NODE_ENV === "production" ? "export" : undefined,
    trailingSlash: process.env.NODE_ENV === "production",
    images: {
        unoptimized: process.env.NODE_ENV === "production",
    },
    // 生产环境使用 /zimo 前缀，开发环境不使用
    assetPrefix: "",
    basePath: "",

    // 环境变量
    env: {
        CUSTOM_ENV: process.env.NODE_ENV,
    },

    // 公共运行时配置
    publicRuntimeConfig: {
        environment: process.env.NODE_ENV,
        assetPrefix: "",
    },
};

export default nextConfig;
