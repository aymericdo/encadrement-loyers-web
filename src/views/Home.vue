<template>
  <div id="home">
    <div class="center-wrapper">
      <div>
        <Hero />
        <SectionWhy />
        <SectionWhere />
        <SectionHow />
        <SectionDisclaimer />
        <Footer />
      </div>
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

<style scoped>
#home {
  min-width: 100%;
  display: flex;
  justify-content: center;
  max-width: 856px;
  margin-top: 10%;
  padding: 0;
}

.center-wrapper {
  display: flex;
  justify-content: center;
  width: calc(100% - 48px);
  padding: 0 24px;
}

.center-wrapper > div {
  max-width: 100%;
}
</style>
