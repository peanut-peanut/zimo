<template>
  <section class="admission-cases">
    <div class="case-lists">
      <div v-for="item in lists" :key="item.caseId" class="case-item">
        <img src="/assets/image/SuccessfulCases/AdmissionCaseImage.png" alt="AdmissionCaseImage" class="case-item-img">
        <div class="case-item-card">
          <h2 class="card-title">{{ item.caseTitle }}</h2>
          <ul class="card-details">
            <li>
              <span class="bullet-point"></span>
              <span class="dullet-point-right">
                <span class="detail-label">Major/Program:</span>
                <span class="detail-value">{{ item.major }}</span>
              </span>
            </li>
            <li>
              <span class="bullet-point"></span>
              <span class="dullet-point-right">
                <span class="detail-label">Admission Date:</span>
                <span class="detail-value">{{ item.admissionDate }}</span>
              </span>
            </li>
            <li>
              <span class="bullet-point"></span>
              <span class="dullet-point-right">
                <span class="detail-label">From:</span>
                <span class="detail-value">{{ item.from }}</span>
              </span>
            </li>
            <li>
              <span class="bullet-point"></span>
              <span class="dullet-point-right">
                <span class="detail-label">Academic Performance:</span>
                <span class="detail-value">{{ item.academicPerformance }}</span>
              </span>
            </li>
            <li>
              <span class="bullet-point"></span>
              <span class="dullet-point-right">
                <span class="detail-label">Standardized Test Scores:</span>
                <span class="detail-value">{{ item.standardizedTestScores }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div> 
    </div>
  </section>
</template>

<script>
export default {
  name: 'AdmissionCases',
  setup() {
    const lists = [
      {
        caseId: 'case1',
        caseTitle: 'Congratulations to Student A on Admission to Tsinghua University!',
        major: 'Computer Science and Technology',
        admissionDate: '2025-02-15',
        from: 'A well-known STEM High School in South Korea',
        academicPerformance: 'GPA: 4.0/4.0',
        standardizedTestScores: 'HSK 5, IELTS 7.0'
      },
      {
        caseId: 'case2',
        caseTitle: 'Congratulations to Student B on Admission to Peking University!',
        major: 'International Relations',
        admissionDate: '2025-01-20',
        from: 'National University of Indonesia (Undergraduate Background)',
        academicPerformance: 'Average Score: 90%',
        standardizedTestScores: 'HSK 6, TOEFL 105'
      },
      {
        caseId: 'case3',
        caseTitle: 'Congratulations to Student C on Admission to Fudan University!',
        major: 'Clinical Medicine (English Taught)',
        admissionDate: '2025-03-01',
        from: 'Russian Federation Medical Preparatory Program',
        academicPerformance: 'Average Score: 88%',
        standardizedTestScores: 'HSK 4, IELTS 6.5'
      },
      {
        caseId: 'case4',
        caseTitle: 'Congratulations to Student D on Admission to Shanghai Jiao Tong University!',
        major: 'Business Administration (English Taught)',
        admissionDate: '2025-02-05',
        from: 'An International School in Bangladesh (A-Level)',
        academicPerformance: 'A-Level: AAA',
        standardizedTestScores: 'TOEFL 98'
      },
      {
        caseId: 'case5',
        caseTitle: 'Congratulations to Student E on Admission to Zhejiang University!',
        major: 'Chinese Language and Literature (Master’s)',
        admissionDate: '2025-01-28',
        from: 'Ho Chi Minh City University of Foreign Languages (Chinese Department), Vietnam',
        academicPerformance: 'GPA: 3.7/4.0',
        standardizedTestScores: 'HSK 6 (280 points)'
      },
      {
        caseId: 'case6',
        caseTitle: 'Congratulations to Student F on Admission to Nanjing University!',
        major: 'Environmental Engineering',
        admissionDate: '2025-03-10',
        from: 'A reputable Engineering University in Pakistan',
        academicPerformance: 'GPA: 3.5/4.0',
        standardizedTestScores: 'IELTS 6.0, Passed Written Exam and Interview'
      },
      {
        caseId: 'case7',
        caseTitle: 'Congratulations to Student G on Admission to Wuhan University!',
        major: 'Geomatics Engineering (Ph.D.)',
        admissionDate: '2025-02-20',
        from: 'Addis Ababa University, Ethiopia (Master’s)',
        academicPerformance: 'GPA: 3.9/4.0',
        standardizedTestScores: 'TOEFL 90, Outstanding Research Background'
      },
      {
        caseId: 'case8',
        caseTitle: 'Congratulations to Student H on Admission to Sun Yat-sen University!',
        major: 'International Business',
        admissionDate: '2025-01-30',
        from: 'Chulalongkorn University, Thailand (Undergraduate)',
        academicPerformance: 'Average Score: 85%',
        standardizedTestScores: 'HSK 4, IELTS 6.0'
      }
    ]

    return {
      lists
    }
  }
}
</script>

<style lang="less" scoped>
.admission-cases {
  padding: 100px 260px 80px;
}

.case-lists {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(calc(50% - 10px), 1fr));
  gap: 20px;
}

.case-item {
  display: flex;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 20px;
  border-radius: 10px;
  background: #FFFCEB;
  box-shadow: -5px 0px 10px 0px rgba(190, 190, 190, 0.25),5px 5px 10px 0px rgba(190, 190, 190, 0.25);

  &:hover {
    transform: translateY(-4px) scale(1.01);
  }
}

.case-item-img {
  flex: 0;
  width: 283px;
  height: 400px;
  border-radius: 10px 0px 0px 10px;
  background: #FFFFFF;
}

.case-item-card {
  flex: 1;
  padding: 30px 30px 0 30px;
}


.card-title {
  font-family: PingFang SC;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: normal;
  color: #2E4057;
  margin-bottom: 20px;
  word-wrap: break-word;
}

.card-details {
  list-style: none;
  padding: 0;
  margin: 0;
}

.card-details li {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 10px;
  font-family: PingFang SC;
  font-size: 14px;
  font-weight: 300;
  line-height: normal;
  letter-spacing: normal;
  color: #3A3E48;
}

.bullet-point {
  flex-shrink: 0;
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #FF6B35;
  border-radius: 50%;
  margin-right: 8px;
  margin-top: 6px;
}
.dullet-point-right {
  flex: 1;
}

.detail-label {
  font-weight: 500;
  font-variation-settings: "opsz" auto;
  margin-right: 5px;
  word-wrap: break-word;

}

.detail-value {
  font-weight: 300;
  word-wrap: break-word;
}



</style>