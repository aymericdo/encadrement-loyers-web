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

<style scoped>
#home {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.center-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 856px;
  padding: 10% 0;
}
</style>
