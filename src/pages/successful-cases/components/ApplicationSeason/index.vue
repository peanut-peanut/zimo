<template>
  <section class="application-season-section">
    <div class="application-season-container">
      <img src="/assets/image/SuccessfulCases/ApplicationSeasonBackground.png" alt="application-season" class="background-image">
      <div class="overlay"></div>
      <div class="content">
        <h1 class="title">2025 Application Season</h1>
        <div class="subtitle">China’s Top University Admission Victories</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ApplicationSeason'
}
</script>

<style lang="less" scoped>
.application-season-section {
  width: 100%;
}

.application-season-container  {
  position: relative;
  width: 100%;
  font-size: 0;
}

.background-image {
  width: 100%;
  aspect-ratio: 960/271;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(46, 64, 87, 0.63);
}

.content {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title  {
  position: relative;
  font-size: 44px;
  font-weight: normal;
  line-height: 64px;
  text-align: center;
  letter-spacing: normal;
  color: #FFFFFF;
  font-family: "AlibabaPuHuiTiRegular";
  margin-bottom: 45px;

    &::before {
      content: "";
      position: absolute;
      top: 30px;
      left: -206px;
      width: 178px;
      height: 4px;
      border-radius: 245px;
      background: linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
    }

    &::after {
      content: "";
      position: absolute;
      top: 30px;
      right: -206px;
      width: 178px;
      height: 4px;
      transform: rotate(180deg);
      border-radius: 245px;
      background: linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
    }
}
.subtitle {
  font-family: "AlibabaPuHuiTiBold";
  font-size: 44px;
  font-weight: bold;
  line-height: 64px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: normal;
  color: #FFFFFF;
}


</style> 