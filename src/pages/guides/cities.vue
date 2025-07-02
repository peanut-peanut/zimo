<template>
    <div class="cities-container">
        <Header isFrom="Cities" />
        
        <div class="content-container">
            <div v-if="!isIncognito" class="iframe-wrapper">
                <iframe 
                    src="https://kfk0ae7phot.sg.larksuite.com/docx/W2SWd1mlgotFZvxEQFSloiY7gFb"
                    class="feishu-iframe"
                    frameborder="0"
                    allowfullscreen
                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    loading="lazy"
                    @load="checkIframeLoaded"
                    @error="handleIframeError"
                    ref="iframe"
                />
            </div>
            <div v-else class="incognito-warning">
                <div class="warning-icon">!</div>
                <h2>您正在使用无痕浏览模式</h2>
                <p>在无痕浏览模式下，Lark文档可能无法正常加载</p>
                <a 
                    href="https://kfk0ae7phot.sg.larksuite.com/docx/W2SWd1mlgotFZvxEQFSloiY7gFb" 
                    target="_blank" 
                    class="open-new-window"
                >
                    点击此处在新窗口中查看文档
                </a>
                <p class="small-text">或者您可以尝试退出无痕模式后再访问此页面</p>
                <button @click="isIncognito = false" class="retry-button">尝试加载文档</button>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../home/components/Header/index.vue";
export default {
    name: "Cities",
    components: {
        Header,
    },
    data() {
        return {
            isIncognito: false,
            loadingTimeout: null,
            redirectCount: 0,
            maxRedirects: 5
        };
    },
    mounted() {
        this.detectIncognito();
        this.setupRedirectMonitor();
    },
    beforeUnmount() {
        if (this.loadingTimeout) {
            clearTimeout(this.loadingTimeout);
        }
    },
    methods: {
        detectIncognito() {
            // 更可靠的无痕模式检测方法
            const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
            
            // 检测方法1：文件系统API
            if (fs) {
                fs(window.TEMPORARY, 100, 
                    () => {
                        // 能够成功创建临时文件系统，可能不是无痕模式
                        console.log('文件系统可用，不是无痕模式');
                    }, 
                    () => {
                        // 无法创建文件系统，可能是无痕模式
                        console.log('文件系统不可用，可能是无痕模式');
                        this.isIncognito = true;
                    }
                );
            }
            
            // 检测方法2：使用localStorage并检查异常类型
            try {
                localStorage.setItem('test', 'test');
                // 在Chrome无痕模式下，可以写入但不会保存
                const testValue = localStorage.getItem('test');
                if (!testValue) {
                    this.isIncognito = true;
                }
                localStorage.removeItem('test');
            } catch (e) {
                // 某些错误类型表明是无痕模式
                if (e.name === 'QuotaExceededError' || 
                    e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || 
                    e.message.includes('exceeded')) {
                    this.isIncognito = true;
                }
            }
            
            // 检测方法3：Cookie可用性测试
            const cookieEnabled = navigator.cookieEnabled;
            if (!cookieEnabled) {
                this.isIncognito = true;
            }
        },
        
        setupRedirectMonitor() {
            // 设置超时检查，如果iframe加载时间过长，可能是遇到了重定向问题
            this.loadingTimeout = setTimeout(() => {
                if (this.$refs.iframe && !this.isIncognito) {
                    try {
                        // 尝试访问iframe内容，如果出错说明可能受到跨域限制或重定向问题
                        const iframeDoc = this.$refs.iframe.contentWindow.document;
                        console.log('Iframe loaded successfully');
                    } catch (e) {
                        console.log('Iframe access error, possible redirect or CORS issue', e);
                        this.isIncognito = true;
                    }
                }
            }, 5000);
        },
        
        checkIframeLoaded() {
            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
            }
            
            // 检查iframe是否加载到正确内容
            try {
                const iframeWindow = this.$refs.iframe.contentWindow;
                const iframeLocation = iframeWindow.location.href;
                
                // 如果重定向到了其他页面（比如登录页或首页），则判定为无痕模式问题
                if (!iframeLocation.includes('W2SWd1mlgotFZvxEQFSloiY7gFb')) {
                    console.log('Iframe redirected to another page', iframeLocation);
                    this.isIncognito = true;
                }
            } catch (e) {
                // 如果出现跨域错误，很可能是重定向导致的
                console.log('Cross-origin error, possible redirect issue', e);
                this.redirectCount++;
                
                if (this.redirectCount > this.maxRedirects) {
                    this.isIncognito = true;
                }
            }
        },
        
        handleIframeError() {
            console.log('Iframe loading error');
            this.isIncognito = true;
        }
    }
};
</script>

<style lang="less" scoped>
.cities-container {
    width: 100%;
    //min-height: 100vh;
    overflow: hidden;
    background: #f8f9fa;
}

.content-container {
    margin-top: -30px; // 遮挡顶部导航栏
    padding: 20px;
    height: calc(100vh + 30px); // 加上遮挡顶部导航栏的高度
    position: relative;
}

.iframe-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background: white;
}

.feishu-iframe {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 8px;
}

.incognito-warning {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 40px 20px;
    text-align: center;
}

.warning-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #FF6B35;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-weight: bold;
    margin-bottom: 20px;
}

.open-new-window {
    display: inline-block;
    margin: 20px 0 10px;
    padding: 12px 24px;
    background-color: #FF6B35;
    color: white;
    border-radius: 4px;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s;
}

.open-new-window:hover {
    background-color: #e85a24;
}

.small-text {
    font-size: 14px;
    color: #666;
    margin: 10px 0;
}

.retry-button {
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}

// 响应式设计
@media (max-width: 768px) {
    .logo {
        left: 20px;
        width: 150px;
        height: 41px;
    }
    
    .content-container {
        padding: 10px;
    }
}
</style>
