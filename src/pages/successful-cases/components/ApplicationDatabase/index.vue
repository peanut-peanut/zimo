<template>
  <section class="application-database">
    <SectionTitle title="Historical Application Database for China’s Top Universities" marginBottom="0px" />
    <p class="subtitle">ZIMO Study in China: Consistently High Admission Rates to China</p>

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
  </section>
</template>

<script>
import SectionTitle from "@/components/SectionTitle.vue";

export default {
  name: 'TableComponent',
  components: {
    SectionTitle
  },
  setup(){
    const tableData = [
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
    return {
      tableData
    }
  }
};
</script>

<style scoped>
.application-database {
  max-width: 100%;
  margin: 0 auto;
  padding-bottom: 100px;
}
.subtitle {
    margin: 0 auto 60px;
    font-family: "AlibabaPuHuiTiRegular";
    font-size: 22px;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    letter-spacing: normal;
    color: #2E4057;
}
.tables-container {
  display: flex;
  flex-wrap: nowrap; /* 防止换行 */
  justify-content: space-between;
  max-width: 100%;
  padding: 0 260px;
  margin: 0 auto;
}

.table-card {
  flex: 0;
  min-width: 313px; /* 设置最小宽度，防止表格过窄 */
  background-color: #ffffff;
  border-radius: 18px 18px 0 0;
  overflow: hidden;
}
.table-card:first-child {
  min-width: 400px; /* 第一列要更长  */
  flex-shrink: 0;
}

.table-card:nth-child(3) {
  min-width: 325px; /* 第三列要稍微长一点  */
  flex-shrink: 0;
}

.table-card:last-child {
  margin-right: 0;
}

.table-title {
  min-height: 120px; /* 确保标题栏高度一致 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0 20px;
  font-family: PingFang SC;
  font-size: 26px;
  font-weight: 500;
  line-height: normal;
  text-align: center;
  letter-spacing: normal;
  color: #FFFFFF;
  border-radius: 18px 18px 0px 0px;
  background: #FF6B35;
  border-width: 0px 0px 4px 0px;
  border-style: solid;
  border-color: #FFFFFF;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 26px 0;
  border-bottom: 1px solid #e0e0e0;
  font-family: PingFang SC;
  font-size: 24px;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  letter-spacing: normal;
  color: #2E4057;
}

tr:last-child td {
  border-bottom: none;
}

tr:nth-child(even) {
  background: #FFFDF5;
}
tr:nth-child(odd) {
  background-color: #FFFADE;
}

</style>
