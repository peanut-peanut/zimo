<template>
  <main class="successful-cases-page">
    <Header isFrom="successful-cases" />
    <ApplicationSeason />
    <AdmissionCases />
    <AppicationDatabase />
    <AboutUs />
    <Footer />
  </main>
</template>

<script>
import Header from "../home/components/Header/index.vue";
import ApplicationSeason from './components/ApplicationSeason/index.vue';
import AdmissionCases from './components/AdmissionCases/index.vue';
import AppicationDatabase from './components/ApplicationDatabase/index.vue';
import AboutUs from '../home/components/AboutUs/index.vue';
import Footer from '../home/components/Footer/index.vue';

export default {
  name: 'SuccessfulCases',
  components: {
        Header,
        ApplicationSeason,
        AdmissionCases,
        AppicationDatabase,
        AboutUs,
        Footer
    },
}
</script>

<style lang="less" scoped>
.successful-cases-page {
  padding-top: 80px;
}
</style>