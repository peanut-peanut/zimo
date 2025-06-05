<template>
  <section id="application-process" ref="sectionRef">
    <div>
      <SectionTitle title="Application Process" />

      <img
        src="/assets/image/ApplicationProcess.jpg"
        alt="Application Process"
        class="process-image"
      />
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import SectionTitle from '../../../../components/SectionTitle.vue'

export default {
  name: 'ApplicationProcess',
  components: {
    SectionTitle
  },
  setup() {
    const sectionRef = ref(null)

    return {
      sectionRef
    }
  }
}
</script>

<style lang="less" scoped>
.process-image {
  width: 100%;
  height: auto;
}
</style>
