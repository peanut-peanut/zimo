<template>
    <div style="padding: 50px;">
        <h2>Tooltip 测试</h2>
        <p>这是一个简单的 tooltip 测试：</p>
        
        <!-- 基础 tooltip 测试 -->
        <a-tooltip title="这是一个简单的 tooltip">
            <a-button type="primary">悬停查看 tooltip</a-button>
        </a-tooltip>
        
        <br><br>
        
        <!-- 服务费 tooltip 测试 -->
        <a-tooltip 
            placement="top"
            overlay-class-name="service-fee-tooltip"
            trigger="hover"
        >
            <template #title>
                <div class="tooltip-content">
                    <div class="tooltip-title">
                        Explanation of Study Abroad Application Service Fees
                    </div>
                    
                    <div class="tooltip-section">
                        <div class="section-title">I. Basic Administrative Fee (Mandatory)</div>
                        <div class="section-content">
                            - A 54 USD fee is required upfront for all application programs, which covers:<br/>
                            - Basic administrative costs, document preparation, and submission fees during the application process;<br/>
                            - Full scholarship application services (no additional charges).
                        </div>
                    </div>

                    <div class="tooltip-section">
                        <div class="section-title">II. Application Guarantee and Secondary Service</div>
                        <div class="section-content">
                            - If the application to the first school fails, we will apply to a second school for you free of charge, with no need to pay an additional basic fee.
                        </div>
                    </div>

                    <div class="tooltip-section">
                        <div class="section-title">III. Rules for Remaining Service Fees (Charged after Successful Application)</div>
                        <div class="section-content">
                            1. No scholarship awarded: The remaining fee will be charged after successfully receiving an admission letter, based on the specific application program (details can be consulted with your advisor).<br/>
                            2. Scholarship awarded:<br/>
                            &nbsp;&nbsp;- Full scholarship: The remaining fee is 1,000 USD;<br/>
                            &nbsp;&nbsp;- Partial scholarship: The remaining fee is 600 USD.
                        </div>
                    </div>

                    <div class="tooltip-note">
                        Note: All fee details are transparent and verifiable, with no hidden charges during the application process. For any questions, feel free to contact your dedicated advisor for clarification.
                    </div>
                </div>
            </template>
            <QuestionCircleOutlined style="font-size: 18px; color: #ff6b35; cursor: pointer;" />
        </a-tooltip>
    </div>
</template>

<script>
import { QuestionCircleOutlined } from '@ant-design/icons-vue';

export default {
    name: 'TooltipTest',
    components: {
        QuestionCircleOutlined,
    }
};
</script>

<style scoped>
/* 本地测试样式 */
</style>