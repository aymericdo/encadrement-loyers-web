<template>
  <div id="home">
    <router-view />
    <div class="center-wrapper inactivable" v-bind:class="{ inactive: $route.name !== 'home' }">
      <div>
        <Hero />
        <SectionWhy />
        <SectionWhere />
        <SectionHow />
        <SectionDisclaimer />
        <SectionBlog />
        <Footer />
      </div>
    </div>
    <router-link to="/stats">
      <FixedButton class="inactivable" v-bind:class="{ inactive: $route.name !== 'home' }">
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
import SectionBlog from "@/components/SectionBlog.vue";
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
    SectionBlog,
    SectionHow,
    SectionWhere,
    SectionWhy
  },
  data: function() {
    return {
      isFirstVisitDone: false
    };
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
  overflow-y: auto;
}

.center-wrapper {
  display: flex;
  justify-content: center;
  width: calc(100% - 48px);
  padding: 8% 24px 0;
}

.center-wrapper > div {
  max-width: 100%;
}

.inactivable {
  transition: filter ease 400ms;

  &.inactive {
    filter: blur(4px);
    pointer-events: none;
  }
}
</style>
