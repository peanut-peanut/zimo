import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import postCssPxToRem from 'postcss-pxtorem';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        vue(),
        // Gzip压缩
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240, // 只压缩大于10KB的文件
            algorithm: 'gzip',
            ext: '.gz',
        }),
        // 生成Brotli压缩文件
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'brotliCompress',
            ext: '.br',
        })
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
        postcss: {
            plugins: [
              postCssPxToRem({
                // 配置在将px转化为rem时 1rem等于多少px(因为我们搭配使用了amfe-flexible插件 此处我们需要设置的值应是UI设计稿全屏基准宽度的十分之一)
                // 当UI设计稿的全屏基准宽度是1920px时 此处设置的值为192
                rootValue: 192,
                // 所有px均转化为rem
                propList: ['*']
                // 若想设置部分样式不转化 可以在配置项中写出
                // eg: 除 border和font-size外 所有px均转化为rem
                // propList: ["*", "!border","!font-size"],
              })
            ]
          }
    },
    build: {
        outDir: "dist",
        assetsDir: "assets",
        // 启用资源压缩
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        // 启用gzip压缩
        rollupOptions: {
            output: {
                // 分包策略
                manualChunks: {
                    vendor: ['vue', 'vue-router'],
                    utils: ['libphonenumber-js', 'country-flag-emoji-json']
                },
                // 静态资源处理
                assetFileNames: (assetInfo) => {
                    const info = assetInfo.name.split('.');
                    const ext = info[info.length - 1];
                    if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
                        return `assets/media/[name]-[hash][extname]`;
                    }
                    if (/\.(png|jpe?g|gif|svg|webp)(\?.*)?$/i.test(assetInfo.name)) {
                        return `assets/images/[name]-[hash][extname]`;
                    }
                    if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
                        return `assets/fonts/[name]-[hash][extname]`;
                    }
                    return `assets/[ext]/[name]-[hash][extname]`;
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js'
            }
        },
        // 设置资源内联阈值
        assetsInlineLimit: 4096,
        // 启用CSS代码分割
        cssCodeSplit: true,
        // 生成source map用于调试（生产环境可以设为false）
        sourcemap: false
    },
    server: {
        port: 3000,
        open: true,
        proxy: {
            '/api': {
                target: 'http://www.zimo.club',
                changeOrigin: true,
                secure: false,
                // rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    base: "/",
});
