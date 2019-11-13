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
    <router-link to="/stats">
      <FixedButton>
        <GraphIcon :width="'26px'" :height="'26px'" />
      </FixedButton>
    </router-link>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import SectionWhy from "@/components/SectionWhy.vue";
import SectionWhere from "@/components/SectionWhere.vue";
import SectionHow from "@/components/SectionHow.vue";
import SectionDisclaimer from "@/components/SectionDisclaimer.vue";
import Footer from "@/components/Footer.vue";
import GraphIcon from "@/icons/GraphIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";

export default {
  name: "Home",
  components: {
    FixedButton,
    Footer,
    GraphIcon,
    Hero,
    SectionDisclaimer,
    SectionHow,
    SectionWhere,
    SectionWhy
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#home {
  min-width: 100%;
  display: flex;
  justify-content: center;
  max-width: $mobileSize;
  margin-top: 10%;
  margin-bottom: 48px;
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
