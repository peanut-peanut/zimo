<template>
    <div class="company-introduction-container">
        <SectionTitle title="Company Introduction" />
        <div class="company-introduction-content">
            <img
                src="/assets/image/AboutUs/CompanyIntroduction/LeftBall.png"
                alt="CompanyIntroduction"
                class="left-ball"
            />
            <div class="right-content">
                <div class="right-content-title">
                    <div class="right-content-title-text">
                        Founded in 2020, our mission is simple yet powerful:
                    </div>
                    <div class="right-content-title-text orange-text">
                        Unlock your life answer in China.
                    </div>
                    <div class="right-content-title-text">
                        We believe that studying in China is not just about
                        education—it's about discovering opportunities, building
                        global connections, and unlocking a better future.
                    </div>
                </div>
                <div class="right-content-card">
                    <div class="card-description">
                        <span class="strong-text"
                            >Trusted by 4000+ students annually</span
                        >
                        for applications and university placements.
                    </div>
                    <div class="card-divider"></div>
                    <div class="stats-container">
                        <div class="stat-item">
                            <div class="stat-number">800+</div>
                            <div class="stat-label">UNIVERSITIES</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">30000+</div>
                            <div class="stat-label">PROGRAM</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">4000+</div>
                            <div class="stat-label">STUDENTS</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">100+</div>
                            <div class="stat-label">COMPANIES</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SectionTitle from "@/components/SectionTitle.vue";
export default {
    name: "CompanyIntroduction",
    components: {
        SectionTitle,
    },
};
</script>

<style lang="less" scoped>
.company-introduction-container {
    background-color: #fff;
    padding: 75px 260px;
    max-width: 100%;
    margin: 0 auto;
}
.company-introduction-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 60px;
}
.left-ball {
    width: 564px;
    height: 514px;
}
.right-content {
    flex: 1;
    height: 514px;
    display: flex;
    flex-direction: column;
    gap: 55px;
}
.right-content-title {
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: normal;
    line-height: normal;
    letter-spacing: normal;
}
.right-content-title-text {
    font-family: PingFang SC;
    font-size: 22px;
    color: #2e4057;
}
.orange-text {
    color: #ff6b35;
}
.right-content-card {
    width: 776px;
    height: 269px;
    border-radius: 10px;
    background: #ffffff;
    box-sizing: border-box;
    /* grey 03 */
    border: 1px solid #dbdfec;
    box-shadow: -5px 0px 10px 0px rgba(190, 190, 190, 0.25),
        5px 5px 10px 0px rgba(190, 190, 190, 0.25);
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.stats-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 41px;
}

.stat-item {
    width: 152px;
    height: 90px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
}

.stat-number {
    width: 152px;
    height: 56px;
    font-family: "AlibabaPuHuiTiBold";
    font-size: 40px;
    font-weight: bold;
    line-height: normal;
    text-align: center;
    letter-spacing: normal;
    color: #ff6b35;
}

.stat-label {
    width: 152px;
    height: 28px;
    font-family: PingFang SC;
    font-size: 20px;
    font-weight: 500;
    line-height: normal;
    text-align: center;
    letter-spacing: normal;
    color: #2e4057;
}

.card-divider {
    width: 47px;
    height: 4px;
    background-color: #ff6b35;
    border-radius: 186px;
}

.card-description {
    font-family: PingFang SC;
    font-size: 22px;
    font-weight: normal;
    line-height: normal;
    letter-spacing: normal;
    color: #2e4057;
}
.strong-text {
    font-variation-settings: "opsz" auto;
    font-weight: 500;
}
</style>
