<template>
  <main class="successful-cases-page">
    <Header />
    <ApplicationSeason />
    <AdmissionCases />
    <AppicationDatabase />
  </main>
</template>

<script>
import Header from "../home/components/Header/index.vue";
import ApplicationSeason from './components/ApplicationSeason/index.vue';
import AdmissionCases from './components/AdmissionCases/index.vue';
import AppicationDatabase from './components/ApplicationDatabase/index.vue';

export default {
  name: 'SuccessfulCases',
  components: {
        Header,
        ApplicationSeason,
        AdmissionCases,
        AppicationDatabase
    },
}
</script>

<style lang="less" scoped>
.successful-cases-page {
  padding-top: 82px;
}
</style> 