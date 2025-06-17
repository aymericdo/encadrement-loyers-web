<template>
  <Section>
    <SectionTitle class="title">
      Statistiques
    </SectionTitle>
    <SectionRightPart>
      <RouterLink
        v-if="!!currentCity"
        :to="kebabize('/stats/' + currentCity.id)"
      >
        <div
          class="flex flex-col items-center chart-section"
        >
          <div class="text-2xl font-bold mb-4">
            {{ currentCity.label }}
          </div>
          <div class="stats-section w-full">
            <CityGraph
              :id="'map'"
              :date="dateValueStr"
              :city="currentCity.id"
              @error-output="getErrorMessage($event)"
            />
          </div>

          <div class="relative w-full h-1 bg-gray-200 mt-4 overflow-hidden rounded-md">
            <div
              key="progress-bar"
              class="absolute top-0 left-0 h-full bg-[#fdcd56]"
              :class="{ 'animate-progress': animate }"
            />
          </div>
        </div>
      </RouterLink>
    </SectionRightPart>
  </Section>
</template>
<script setup>
  import Section from "@/shared/SectionItem.vue";
  import SectionTitle from "@/shared/SectionTitleItem.vue";
  import SectionRightPart from "@/shared/SectionRightPartItem.vue";
  import CityGraph from "@/shared/CityGraphItem.vue";
  import { ref, watch, onBeforeUnmount } from 'vue';
  import { kebabize } from "@/tools/kebabier";

  const props = defineProps({
    cities: {
      type: [Object],
    },
  });

  const mainCities = ref([])

  const today = new Date()
  const severalYearsAgo = new Date()
  severalYearsAgo.setFullYear(today.getFullYear() - 4)

  const date = [severalYearsAgo, today]

  const currDate1 = date[0].getDate();
  const currMonth1 = date[0].getMonth() + 1; // Months are zero based
  const currYear1 = date[0].getFullYear();

  const currDate2 = date[1].getDate();
  const currMonth2 = date[1].getMonth() + 1; // Months are zero based
  const currYear2 = date[1].getFullYear();

  const dateValueStr = ref(`${currYear1}-${currMonth1}-${currDate1},${currYear2}-${currMonth2}-${currDate2}`)

  const animate = ref(true)

  const currentIndex = ref(0)
  const currentCity = ref(null)

  let intervalId;

  const updateCity = () => {
    currentIndex.value = (currentIndex.value + 1) % mainCities.value.length
    currentCity.value = mainCities.value[currentIndex.value]

    animate.value = false
    requestAnimationFrame(() => {
      animate.value = true
    })
  }

  const getErrorMessage = (err) => {
    let responseBody;
    responseBody = err.response;
    if (!responseBody) {
      responseBody = err;
    } else {
      responseBody = err.response.data || responseBody;
    }

    if (err.message === "token expired") {
      welcomeData.value = null;
    }

    return responseBody.message || JSON.stringify(responseBody);
  };

  watch(
    () => props.cities,
    () => {
      clearInterval(intervalId)

      mainCities.value = props.cities.reduce((prev, data) => {
        if (!prev.some((element) => element.id === data.id)) {
          prev.push({
            label: data.label,
            id: data.id,
          })
        }
        return prev
      }, [])

      currentCity.value = mainCities.value[currentIndex.value]
      intervalId = setInterval(updateCity, 10 * 1000)
    },
  );

  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

.title {
  max-width: inherit;
}

.chart-section {
  width: 552px;
  cursor: pointer;
  
  &:hover {
    color: $yellow;

    :deep(.container) {
      border-color: $yellow;
    }
  }
}

.stats-section {
  position: relative;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  height: 500px;
  display: flex;
  > * {
    flex: 1;

    :deep(.graph) {
      cursor: pointer !important;
    }
  }
}

@keyframes progress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.animate-progress {
  animation: progress 10s linear forwards;
}
</style>