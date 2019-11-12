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
      <button class="stats">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 12">
          <defs>
            <path
              id="a"
              d="M1.511 2.384c.556 0 1.011.46 1.011 1.023v7.07A1.02 1.02 0 0 1 1.511 11.5 1.02 1.02 0 0 1 .5 10.476V3.407a1.02 1.02 0 0 1 1.011-1.023zM5.105.5l.11.006c.505.056.902.492.902 1.018v8.952A1.02 1.02 0 0 1 5.105 11.5a1.02 1.02 0 0 1-1.01-1.024V1.524A1.02 1.02 0 0 1 5.105.5zM8.49 5.576c.556 0 1.011.46 1.011 1.023v3.877A1.02 1.02 0 0 1 8.489 11.5a1.02 1.02 0 0 1-1.011-1.024V6.6a1.02 1.02 0 0 1 1.01-1.023z"
            />
          </defs>
          <use fill="#050505" fill-rule="evenodd" xlink:href="#a" />
        </svg>
      </button>
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

export default {
  name: "Home",
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

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#home {
  min-width: 100%;
  display: flex;
  justify-content: center;
  max-width: 856px;
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

.stats {
  position: fixed;
  display: flex;
  justify-content: center;
  background-color: $yellow;
  font-weight: 600;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border-color: transparent;
  cursor: pointer;
  z-index: 1;

  & > svg {
    width: 26px;
    height: 26px;
  }
}
</style>
