<template>
  <div class="tables-container">
    <!-- 表格1：大学名称 -->
    <div class="table-card">
      <h3 class="table-title">University Name</h3>
      <div class="table-wrapper">
        <table>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{ item.universityName }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- 表格2：申请人数量 -->
    <div class="table-card">
      <h3 class="table-title">2024 Study in China Applicants (via ZIMO)</h3>
      <div class="table-wrapper">
        <table>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{ item.applicants }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- 表格3：平均录取率 -->
    <div class="table-card">
      <h3 class="table-title">Average Admission Rate for International Students to China</h3>
      <div class="table-wrapper">
        <table>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{ item.admissionRate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- 表格4：ZIMO录取率 -->
    <div class="table-card">
      <h3 class="table-title">ZIMO Study in China Admission Rate</h3>
      <div class="table-wrapper">
        <table>
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td>{{ item.zimoAdmissionRate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableComponent',
  data() {
    return {
      tableData: [
        {
          universityName: 'Tsinghua University',
          applicants: 25,
          admissionRate: '5.50%',
          zimoAdmissionRate: '95%'
        },
        {
          universityName: 'Peking University',
          applicants: 38,
          admissionRate: '6.20%',
          zimoAdmissionRate: '96.50%'
        },
        {
          universityName: 'Fudan University',
          applicants: 20,
          admissionRate: '7.10%',
          zimoAdmissionRate: '97.60%'
        },
        {
          universityName: 'Shanghai Jiao Tong University',
          applicants: 18,
          admissionRate: '6.80%',
          zimoAdmissionRate: '96.60%'
        },
        {
          universityName: 'Zhejiang University',
          applicants: 22,
          admissionRate: '7.50%',
          zimoAdmissionRate: '98%'
        },
        {
          universityName: 'Nanjing University',
          applicants: 15,
          admissionRate: '8.00%',
          zimoAdmissionRate: '100%'
        },
        {
          universityName: 'Renmin University of China',
          applicants: 10,
          admissionRate: '9.20%',
          zimoAdmissionRate: '100%'
        },
        {
          universityName: 'Beijing Normal University',
          applicants: 12,
          admissionRate: '8.50%',
          zimoAdmissionRate: '97.60%'
        },
        {
          universityName: 'Wuhan University',
          applicants: 30,
          admissionRate: '9.80%',
          zimoAdmissionRate: '100%'
        },
        {
          universityName: 'Sun Yat-sen University',
          applicants: 28,
          admissionRate: '10.50%',
          zimoAdmissionRate: '100%'
        },
        {
          universityName: 'Xiamen University',
          applicants: 16,
          admissionRate: '11.20%',
          zimoAdmissionRate: '98.50%'
        },
        {
          universityName: 'Harbin Institute of Technology',
          applicants: 14,
          admissionRate: '10.00%',
          zimoAdmissionRate: '100%'
        }
      ]
    };
  }
};
</script>

<style scoped>
.tables-container {
  display: flex;
  flex-wrap: nowrap; /* 防止换行 */
  overflow-x: auto; /* 添加横向滚动条 */
  max-width: 100%;
  padding: 20px 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch; /* 增强移动设备滚动体验 */
}

/* 隐藏滚动条但保留功能 */
.tables-container::-webkit-scrollbar {
  display: none;
}
.tables-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.table-card {
  flex: 0 0 calc(25% - 15px); /* 每个表格占25%宽度，减去间距 */
  min-width: 280px; /* 设置最小宽度，防止表格过窄 */
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-right: 20px;
}

.table-card:last-child {
  margin-right: 0;
}

.table-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.table-title {
  margin: 0;
  padding: 16px;
  background-color: #4a6fa5;
  color: white;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  min-height: 60px; /* 确保标题栏高度一致 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
}

td:first-child {
  font-weight: 500;
}

tr:last-child td {
  border-bottom: none;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .table-card {
    flex: 0 0 calc(25% - 15px);
  }
}

@media (max-width: 1024px) {
  .table-card {
    flex: 0 0 calc(33.33% - 15px);
  }
}

@media (max-width: 768px) {
  .table-card {
    flex: 0 0 calc(50% - 15px);
  }
}

@media (max-width: 480px) {
  .table-card {
    flex: 0 0 calc(100% - 15px);
  }
}
</style>
