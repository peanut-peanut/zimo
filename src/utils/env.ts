/**
 * 环境配置工具
 */

// 获取当前环境
export const getEnvironment = (): "development" | "test" | "production" => {
    if (typeof window !== "undefined") {
        // 客户端环境
        return process.env.NODE_ENV as "development" | "test" | "production";
    }
    // 服务端环境
    return process.env.NODE_ENV as "development" | "test" | "production";
};

// 判断是否为开发环境
export const isDevelopment = (): boolean => {
    return getEnvironment() === "development";
};

// 判断是否为测试环境
export const isTest = (): boolean => {
    return getEnvironment() === "test";
};

// 判断是否为生产环境
export const isProduction = (): boolean => {
    return getEnvironment() === "production";
};

// 获取资源前缀
export const getAssetPrefix = (): string => {
    return isProduction() ? "/zimo" : "";
};

// 获取基础路径
export const getBasePath = (): string => {
    return isProduction() ? "/zimo" : "";
};

/**
 * 获取正确的资源路径
 * @param path - 资源路径，如 '/assets/image/logo.png'
 * @returns 适合当前环境的完整资源路径
 */
export function getAssetPath(path: string): string {
    console.log("isProduction", isProduction());

    // 如果是开发环境，直接返回原路径
    if (isDevelopment()) {
        return path;
    }

    // 生产环境移除最前面的/
    return path.replace(/^\//, "");
    // if (path.startsWith("/")) {
    //     return `${prefix}${path}`;
    // }

    // return `${prefix}/${path}`;
}

// 环境配置对象
export const envConfig = {
    environment: getEnvironment(),
    isDevelopment: isDevelopment(),
    isTest: isTest(),
    isProduction: isProduction(),
    assetPrefix: getAssetPrefix(),
    basePath: getBasePath(),
};
