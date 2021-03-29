<template>
  <div id="home">
    <router-view />
    <div
      class="center-wrapper inactivable"
      v-bind:class="{ inactive: $route.name !== 'home' }"
    >
      <div>
        <Hero />
        <SectionWhy />
        <SectionWhere />
        <SectionHow />
        <SectionDisclaimer />
        <SectionBlog />
        <SectionUs />
        <SectionThanks />
        <Footer />
      </div>
    </div>
    <router-link to="/stats">
      <transition name="opacity">
        <FixedButton v-if="$route.name === 'home'" class="fixed-button">
          <GraphIcon :width="'26px'" :height="'26px'" />
          <span class="label-stats">Stats</span>
        </FixedButton>
      </transition>
    </router-link>
  </div>
</template>

<script>
import Hero from "@/components/Hero.vue";
import SectionWhy from "@/components/SectionWhy.vue";
import SectionWhere from "@/components/SectionWhere.vue";
import SectionHow from "@/components/SectionHow.vue";
import SectionDisclaimer from "@/components/SectionDisclaimer.vue";
import SectionThanks from "@/components/SectionThanks.vue";
import SectionBlog from "@/components/SectionBlog.vue";
import SectionUs from "@/components/SectionUs.vue";
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
    SectionThanks,
    SectionWhere,
    SectionUs,
    SectionWhy,
  },
  data: function() {
    return {
      isFirstVisitDone: false,
    };
  },
  mounted() {
    if (!localStorage.isFirstVisitDone) {
      this.$router.push({ path: "video" });
      localStorage.isFirstVisitDone = true;
    }
  },
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

.fixed-button {
  align-items: center;
  width: fit-content;
  border-radius: 25px;
  font-size: 20px;
  justify-content: space-evenly;
}

.label-stats {
  font-weight: bold;
  margin-left: 4px;
}

@media screen and (max-width: $mobileSize) {
  .fixed-button {
    border-radius: 50%;
    width: 60px;
  }

  .label-stats {
    display: none;
  }
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
}

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity ease 400ms;
}

.inactivable {
  transition: filter ease 400ms;

  &.inactive {
    filter: blur(4px);
    pointer-events: none;
  }
}
</style>
