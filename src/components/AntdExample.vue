<template>
    <div class="antd-example">
        <h2>Ant Design Vue 组件示例</h2>
        
        <!-- 按钮组件 -->
        <div class="example-section">
            <h3>按钮 Button</h3>
            <a-space>
                <a-button type="primary">主要按钮</a-button>
                <a-button>默认按钮</a-button>
                <a-button type="dashed">虚线按钮</a-button>
                <a-button type="text">文本按钮</a-button>
                <a-button type="link">链接按钮</a-button>
            </a-space>
        </div>

        <!-- 输入框组件 -->
        <div class="example-section">
            <h3>输入框 Input</h3>
            <a-space direction="vertical" style="width: 100%;">
                <a-input v-model:value="inputValue" placeholder="请输入内容" />
                <a-input-search
                    v-model:value="searchValue"
                    placeholder="搜索内容"
                    enter-button="搜索"
                    @search="onSearch"
                />
            </a-space>
        </div>

        <!-- 选择器组件 -->
        <div class="example-section">
            <h3>选择器 Select</h3>
            <a-select
                v-model:value="selectValue"
                placeholder="请选择"
                style="width: 200px"
                :options="selectOptions"
            />
        </div>

        <!-- 日期选择器 -->
        <div class="example-section">
            <h3>日期选择器 DatePicker</h3>
            <a-date-picker v-model:value="dateValue" placeholder="选择日期" />
        </div>

        <!-- 表格组件 -->
        <div class="example-section">
            <h3>表格 Table</h3>
            <a-table :columns="columns" :data-source="tableData" :pagination="false" />
        </div>

        <!-- 消息提示 -->
        <div class="example-section">
            <h3>消息提示 Message</h3>
            <a-space>
                <a-button @click="showSuccess">成功消息</a-button>
                <a-button @click="showError">错误消息</a-button>
                <a-button @click="showWarning">警告消息</a-button>
                <a-button @click="showInfo">信息消息</a-button>
            </a-space>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { message } from 'ant-design-vue';

export default {
    name: 'AntdExample',
    setup() {
        const inputValue = ref('');
        const searchValue = ref('');
        const selectValue = ref(undefined);
        const dateValue = ref(null);

        const selectOptions = [
            { value: 'option1', label: '选项1' },
            { value: 'option2', label: '选项2' },
            { value: 'option3', label: '选项3' },
        ];

        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
        ];

        const tableData = [
            {
                key: '1',
                name: '张三',
                age: 32,
                address: '北京市朝阳区',
            },
            {
                key: '2',
                name: '李四',
                age: 28,
                address: '上海市浦东新区',
            },
            {
                key: '3',
                name: '王五',
                age: 35,
                address: '广州市天河区',
            },
        ];

        const onSearch = (value) => {
            console.log('搜索内容:', value);
            message.info(`搜索内容: ${value}`);
        };

        const showSuccess = () => {
            message.success('这是一条成功消息');
        };

        const showError = () => {
            message.error('这是一条错误消息');
        };

        const showWarning = () => {
            message.warning('这是一条警告消息');
        };

        const showInfo = () => {
            message.info('这是一条信息消息');
        };

        return {
            inputValue,
            searchValue,
            selectValue,
            dateValue,
            selectOptions,
            columns,
            tableData,
            onSearch,
            showSuccess,
            showError,
            showWarning,
            showInfo,
        };
    },
};
</script>

<style lang="less" scoped>
.antd-example {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.example-section {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background-color: #fafafa;

    h3 {
        margin: 0 0 16px 0;
        color: #1890ff;
        font-size: 16px;
        font-weight: 600;
    }
}

h2 {
    text-align: center;
    color: #1890ff;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 700;
}
</style>