<template>
  <div id="home">
    <div class="center-wrapper">
      <Hero />
      <SectionWhy />
      <SectionWhere />
      <SectionHow />
      <SectionDisclaimer />
      <Footer />
    </div>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import SectionWhy from "@/components/SectionWhy.vue";
import SectionWhere from "@/components/SectionWhere.vue";
import SectionHow from "@/components/SectionHow.vue";
import SectionDisclaimer from "@/components/SectionDisclaimer.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",
  components: {
    Hero,
    SectionWhy,
    SectionWhere,
    SectionHow,
    SectionDisclaimer,
    Footer
  }
};
</script>

<style>
.section-title h3 {
  font-weight: 700;
  font-size: 38px;
  color: #f7f7f5;
  letter-spacing: -0.31px;
  line-height: 52px;
}

.center-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 856px;
  padding: 10% 0;
}

.section {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 160px 0 0 0;
}

.section-title {
  max-width: 248px;
  width: 100%;
}

.right-part {
  margin-left: 56px;
  max-width: 552px;
  width: 100%;
}
</style>
