<template>
  <div id="home">
    <NavBar />
    <div
      class="center-wrapper"
      :class="{ inactive: route.name !== 'home' }"
    >
      <div>
        <Hero
          class="mt-16"
          :cities="cities"
        />
        <SectionWhy />
        <SectionHow />
        <SectionDisclaimer />
        <SectionUs />
        <SectionStats
          :cities="cities"
        />
        <SectionDownload id="download" />
        <SectionBlog />
        <SectionThanks />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { domain } from "@/helper/config";
  import Hero from "@/components/HeroItem.vue";
  import SectionWhy from "@/components/SectionWhy.vue";
  import SectionHow from "@/components/SectionHow.vue";
  import SectionDisclaimer from "@/components/SectionDisclaimer.vue";
  import SectionThanks from "@/components/SectionThanks.vue";
  import SectionBlog from "@/components/SectionBlog.vue";
  import SectionUs from "@/components/SectionUs.vue";
  import SectionDownload from "@/components/SectionDownload.vue";
  import SectionStats from "@/components/SectionStats.vue";
  import Footer from "@/components/FooterItem.vue";
  import NavBar from "@/components/NavBar.vue";

  import { useRoute } from "vue-router";

  const route = useRoute()

  const cities = ref([]);

  const fetchCities = async () => {
    try {
      const rawResult = await fetch(`${domain}cities/list`)
      const res = await rawResult.json()
      if (res.message === "token expired") throw res

      cities.value = Object.keys(res).reduce((prev, city) => {
        prev.push({
          id: res[city].mainCity,
          text: `${res[city].displayName.city}.`,
          label: res[city].displayName.mainCity,
        })
        return prev
      }, []).sort(() => 0.5 - Math.random());
    } catch (err) {
      console.error(err);
    }
  };

  onMounted(async () => {
    await fetchCities();
  });
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

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
  width: 100%;
  padding: 4rem 1.25rem 0;
  box-sizing: border-box;
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

.center-wrapper{
  transition: filter ease 400ms;
  pointer-events: auto;

  &.inactive {
    height: 100vh;
    filter: blur(4px);
    pointer-events: none;
    overflow-y: hidden;
  }
}
</style>
