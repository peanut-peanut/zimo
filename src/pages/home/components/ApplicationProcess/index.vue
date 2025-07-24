<template>
    <section id="application-process" ref="sectionRef">
        <div class="service-module">
            <div class="module-header">
                <!-- <h1 class="module-title">Comprehensive Application Service</h1> -->
                <SectionTitle
                    title="Comprehensive Application Service"
                    fontColor="#fff"
                    marginBottom="0"
                />
                <!-- <p class="module-subtitle">
                    Your Journey to Academic Success - Expertly Guided Every
                    Step
                </p> -->
                <div class="subtitle">
                    Your Journey to Academic Success - Expertly Guided Every
                    Step
                </div>
            </div>

            <div class="phases-grid">
                <div class="phase-card">
                    <div class="phase-number">1</div>
                    <h3 class="phase-title">Preparation & Planning</h3>
                    <ul class="phase-list">
                        <li>Assemble 3-to-1 senior mentor team</li>
                        <li>Provide application materials checklist</li>
                        <li>Create detailed timeline plan</li>
                        <li>Develop school selection strategy</li>
                    </ul>
                    <div class="phase-highlight"></div>
                </div>

                <div class="phase-card">
                    <div class="phase-number">2</div>
                    <h3 class="phase-title">Application & Documentation</h3>
                    <ul class="phase-list">
                        <li>Professional document collection assistance</li>
                        <li>Customized PS, CV, and recommendation letters</li>
                        <li>Real-time progress tracking</li>
                        <li>Interview preparation materials</li>
                        <li>Comprehensive interview training</li>
                    </ul>
                    <div class="phase-highlight"></div>
                </div>

                <div class="phase-card">
                    <div class="phase-number">3</div>
                    <h3 class="phase-title">Success & Enrollment</h3>
                    <ul class="phase-list">
                        <li>Concierge-style school correspondence</li>
                        <li>Full application process monitoring</li>
                        <li>Admission recommendations & analysis</li>
                        <li>Visa processing guidance</li>
                        <li>Enrollment procedure assistance</li>
                    </ul>
                    <div class="phase-highlight"></div>
                </div>
            </div>

            <div class="cta-section">
                <p class="cta-text">
                    Ready to start your academic journey with expert guidance?
                </p>
                <button class="cta-button" @click="handleGetStarted">
                    Get Started Today
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from "vue";
import { ROUTES } from "../../../../router/routes";
import SectionTitle from "@/components/SectionTitle.vue";
export default {
    name: "ApplicationProcess",
    components: {
        SectionTitle,
    },
    setup() {
        const sectionRef = ref(null);

        const handleGetStarted = () => {
            window.open(ROUTES.APPLYNOW, "_blank");
        };

        return {
            sectionRef,
            handleGetStarted,
        };
    },
};
</script>

<style lang="less" scoped>
#application-process {
    padding: 40px 0px;
    background: #f8f9fa;
}

.service-module {
    //max-width: 1200px;
    width: 100%;
    padding: 0 200px;
    margin: 0 auto;
    background: white;
    // border-radius: 16px;
    // box-shadow: 0 8px 32px rgba(255, 107, 53, 0.1);
    overflow: hidden;
}

.module-header {
    background: linear-gradient(135deg, #ff6b35 0%, #ff8a65 100%);
    color: white;
    text-align: center;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.subtitle {
    text-align: center;
    padding: 0 64px;
   // margin-bottom: 60px;
    font-size: 22px;
    line-height: normal;
    text-align: center;
    letter-spacing: normal;
    color: #fff;
    font-family: "AlibabaPuHuiTiRegular";
}

.phases-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
}

.phase-card {
    padding: 40px 30px;
    border-right: 1px solid #f0f0f0;
    position: relative;
    transition: all 0.3s ease;
    min-height: 400px;
    display: flex;
    flex-direction: column;

    &:last-child {
        border-right: none;
    }

    &:hover {
        background: linear-gradient(135deg, #fff 0%, #fff8f6 100%);
        transform: translateY(-2px);

        .phase-highlight {
            opacity: 1;
        }
    }
}

.phase-number {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, #ff6b35, #ff8a65);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    margin: 0 auto 24px auto;
    box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
}

.phase-title {
    font-size: 22px;
    font-weight: 600;
    color: #333;
    text-align: center;
    margin-bottom: 24px;
    line-height: 1.3;
}

.phase-list {
    list-style: none;
    flex-grow: 1;

    li {
        font-size: 16px;
        line-height: 1.5;
        color: #666;
        margin-bottom: 12px;
        padding-left: 20px;
        position: relative;

        &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 8px;
            width: 6px;
            height: 6px;
            background: #ff6b35;
            border-radius: 50%;
        }
    }
}

.phase-highlight {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, transparent, #ff6b35, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.cta-section {
    //background: linear-gradient(135deg, #f8f9fa 0%, #fff 100%);
    text-align: center;
    padding: 40px 30px;
    border-top: 1px solid #f0f0f0;
}

.cta-text {
    font-size: 16px;
    color: #666;
    margin-bottom: 24px;
    font-family: "AlibabaPuHuiTiRegular";
}

.cta-button {
    background: linear-gradient(135deg, #ff6b35, #ff8a65);
    color: white;
    border: none;
    padding: 12px 32px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
    position: relative;
    overflow: hidden;
    
    // 添加光晕效果
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        transition: left 0.6s ease;
    }

    &:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 8px 32px rgba(255, 107, 53, 0.5);
        background: linear-gradient(135deg, #ff8a65, #ff6b35);
        
        // 触发光晕动画
        &::before {
            left: 100%;
        }
    }
    
    &:active {
        transform: translateY(-1px) scale(1.02);
        transition: all 0.1s ease;
    }
}

// 响应式设计
@media (max-width: 768px) {
    .phases-grid {
        grid-template-columns: 1fr;
    }

    .phase-card {
        border-right: none;
        border-bottom: 1px solid #f0f0f0;
        min-height: auto;

        &:last-child {
            border-bottom: none;
        }
    }

    .module-title {
        font-size: 28px;
    }
}

// 动画
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.phase-card {
    animation: slideInUp 0.6s ease forwards;

    &:nth-child(1) {
        animation-delay: 0.1s;
    }
    &:nth-child(2) {
        animation-delay: 0.2s;
    }
    &:nth-child(3) {
        animation-delay: 0.3s;
    }
}
</style>
