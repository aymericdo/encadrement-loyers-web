<template>
  <div id="stats">
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper class="page2-wrapper" v-if="isMounted">
        <div class="welcome-section">
          <SectionTitle class="title">Stats</SectionTitle>

          <div class="row">
            <div class="welcome">
              <div v-if="!isWelcomeTextLoaded" class="welcome-spinner">
                <BounceLoader
                  class="spinner"
                  :loading="!isWelcomeTextLoaded"
                  color="#fdcd56"
                  :size="'60px'"
                ></BounceLoader>
              </div>
              <template v-if="isWelcomeTextLoaded">
                <div>
                  <span>Sur les</span>
                  <span class="yellow"
                    >&nbsp;{{ welcomeData.numberRents }}&nbsp;</span
                  >
                  <span>annonces étudiées au total</span>
                  <template v-if="city !== 'all'">
                    à<span class="yellow"
                      >&nbsp;{{
                        cityDropdownOptions.find((c) => c.value === city).label
                      }}</span
                    >
                  </template>
                  <span>,</span>
                  <span class="yellow"
                    >&nbsp;{{ welcomeData.isIllegalPercentage }}%&nbsp;</span
                  >
                  <span>sont non conformes.</span>
                </div>
                <div>
                  <span>Pour les annonces d'une surface inférieure à</span>
                  <span class="yellow"
                    >&nbsp;{{ welcomeData.pivotSurface }}m²</span
                  ><span>, il y a</span>
                  <span class="yellow"
                    >&nbsp;{{
                      welcomeData.isIllegalPercentageUnderPivot
                    }}%&nbsp;</span
                  >
                  <span>d'annonces non conformes.</span>
                </div>
              </template>
            </div>

            <div class="city-dropdown">
              <Select
                v-model="city"
                :open="isCitySelectOpen"
                @update:model-value="changeCity"
                @update:open="isCitySelectOpen = $event"
              >
                <SelectTrigger :open="isCitySelectOpen">
                  <SelectValue placeholder="Choisir une ville..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="{ label, value } in cityDropdownOptions"
                      :value="value"
                      :key="value"
                    >
                      {{ label }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div class="row">
            <Slider
              class="slider"
              v-model="dateValue"
              :min="0"
              :max="maxDateValue"
              :format="dateValueFct"
              @change="setDateValueStr"
            />
          </div>
        </div>

        <div class="graph-list">
          <div class="stats-section -large">
            <Graph
              ref="isLegalVariation"
              :id="'is-legal-variation'"
              :city="city"
              :date="dateValueStr"
              :options="legalPercentageOptions"
              @errorOutput="getErrorMessage($event)"
            ></Graph>
            <div class="is-legal-variation-dropdown">
              <Dropfilters
                @onSubmit="changeFilters($event)"
                @onReset="changeFilters()"
                @onDropFilterOpeningChanged="showCloseButton = !$event"
                :city="city"
                :options="legalPercentageOptions"
                :filtersCount="legalPercentageFiltersCount"
              ></Dropfilters>
            </div>
          </div>

          <div class="stats-section-row" v-if="city !== 'all'">
            <div class="stats-section">
              <Graph
                :id="'chloropleth-map'"
                :date="dateValueStr"
                :city="city"
                @errorOutput="getErrorMessage($event)"
              ></Graph>
            </div>

            <div class="stats-section">
              <Graph
                :id="'map'"
                :date="dateValueStr"
                :city="city"
                @errorOutput="getErrorMessage($event)"
              ></Graph>
            </div>
          </div>

          <div
            class="stats-section -large"
            v-if="
              city !== 'all' &&
              cityDropdownOptions.find((value) => value.value === city)
                ?.multipleCities
            "
          >
            <Graph
              :id="'chloropleth-cities-map'"
              :date="dateValueStr"
              :city="city"
              @errorOutput="getErrorMessage($event)"
            ></Graph>
          </div>

          <div class="stats-section -large">
            <Graph
              :id="'is-legal-per-surface'"
              :date="dateValueStr"
              :city="city"
              @errorOutput="getErrorMessage($event)"
            ></Graph>
          </div>

          <div v-if="city === 'all'" class="stats-section -large">
            <Graph
              :id="'price-variation'"
              :date="dateValueStr"
              :city="city"
              @errorOutput="getErrorMessage($event)"
            ></Graph>
          </div>

          <div v-if="city !== 'all'" class="stats-section-row">
            <div class="stats-section">
              <Graph
                :id="'price-difference'"
                :date="dateValueStr"
                :city="city"
                @errorOutput="getErrorMessage($event)"
              ></Graph>
            </div>

            <div class="stats-section">
              <Graph
                :id="'price-variation'"
                :date="dateValueStr"
                :city="city"
                @errorOutput="getErrorMessage($event)"
              ></Graph>
            </div>
          </div>
        </div>
      </Page2Wrapper>
    </transition>
    <div
      class="fixed-btn"
      :class="{ 'show-on-mobile': showCloseButton }"
      @click="isMounted = false"
    >
      <FixedButton>
        <StrokeIcon :width="'18px'" :height="'18px'" />
      </FixedButton>
    </div>
  </div>
</template>

<script setup>
import { domain } from "@/helper/config";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import Dropfilters from "@/shared/Dropfilters.vue";
import FixedButton from "@/shared/FixedButton.vue";
import Graph from "@/shared/Graph.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import SectionTitle from "@/shared/SectionTitle.vue";
import Slider from "@vueform/slider";
import { onBeforeUnmount, onMounted, ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";

import { camelize, kebabize } from "../tools/kebabier";

import "@vueform/slider/themes/default.css";

const route = useRoute();
const router = useRouter();
const showCloseButton = ref(true);
const isLegalVariation = ref(null);
const legalPercentageFiltersCount = ref(0);
const cityDropdownOptions = ref([]);
const isMounted = ref(false);
const city = ref(camelize(route.params.city) || "paris");
const serverError = ref("");
const welcomeData = ref(null);
const isWelcomeTextLoaded = ref(false);
const dateValueStr = ref("");
const isCitySelectOpen = ref(false);

const controller = new AbortController();

// Date of the first ad in the db
const realStartDate = new Date("2019-10-22");
const realEndDate = new Date();
// Number of days between the first ad in the db and today
const maxDateValue = Math.round(
  (realEndDate - realStartDate) / (1000 * 60 * 60 * 24)
);
// Number of days between the first ad in the db and 6 months before today
const minDateValue = Math.round(
  (new Date(realEndDate.setMonth(realEndDate.getMonth() - 6)) - realStartDate) /
    (1000 * 60 * 60 * 24)
);
const dateValue = ref([minDateValue, maxDateValue]);

const initialLegalPercentageOptions = {
  surfaceValue: [9, 100],
  roomValue: [1, 6],
  furnishedValue: "all",
  isParticulierValue: "all",
};

const legalPercentageOptions = ref({
  ...initialLegalPercentageOptions,
});

watch(route, (newValue, oldValue) => {
  if (newValue.params.city !== oldValue.oldValue) {
    const value = newValue.params.city;
    city.value = value && camelize(value);
    changeFilters();
    onFetchWelcome(null);
    isWelcomeTextLoaded.value = false;
  }
});

watchEffect(
  () => {
    if (legalPercentageOptions.value) {
      let cpt = 0;
      Object.keys(legalPercentageOptions.value).forEach((key) => {
        if (
          JSON.stringify(legalPercentageOptions.value[key]) !==
          JSON.stringify(initialLegalPercentageOptions[key])
        ) {
          cpt += 1;
        }
      });

      legalPercentageFiltersCount.value = cpt;
    }
  },
  {
    flush: "post",
  }
);

const fetchCities = async () => {
  try {
    const rawResult = await fetch(`${domain}cities/list`);
    const res = await rawResult.json();
    if (res.message === "token expired") throw res;

    cityDropdownOptions.value = Object.keys(res).reduce((prev, city, index) => {
      if (index === 0) {
        prev.push({
          value: "all",
          label: "Tout",
        });
      }

      if (prev.some((value) => value.value === res[city].mainCity)) {
        return prev.map((data) => {
          return data.value === res[city].mainCity
            ? {
                ...data,
                multipleCities: true,
              }
            : {
                ...data,
              };
        });
      }

      prev.push({
        value: res[city].mainCity,
        label: res[city].displayName.mainCity,
        multipleCities: false,
      });
      return prev;
    }, []);
  } catch (err) {
    console.error(err);
  }
};

onMounted(async () => {
  await fetchCities();
  isMounted.value = true;
  setDateValueStr(dateValue.value);
  onFetchWelcome();
});

onBeforeUnmount(() => {
  controller.abort();
});

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

const onFetchWelcome = () => {
  fetch(`${domain}stats/welcome/${city.value}`, {
    signal: controller.signal,
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message === "token expired") {
        throw res;
      } else {
        return res;
      }
    })
    .then((res) => {
      welcomeData.value = res;
      isWelcomeTextLoaded.value = true;
    })
    .catch((err) => {
      serverError.value = getErrorMessage(err);
    });
};

const changeCity = (opt) => {
  router.push({ path: kebabize(opt) });
};

const changeFilters = (opt = null) => {
  legalPercentageOptions.value = opt
    ? { ...opt }
    : { ...initialLegalPercentageOptions };
};

const leave = () => {
  setTimeout(() => {
    router.push({ path: "/" });
  }, 400);
};

const getDateFromValue = (value) => {
  const copy = new Date(Number(realStartDate));
  copy.setDate(realStartDate.getDate() + value);
  return copy;
};

const dateValueFct = (value) => {
  return getDateFromValue(value).toLocaleDateString();
};

const getDateValueStr = (dateValue) => {
  const date = [getDateFromValue(dateValue[0]), getDateFromValue(dateValue[1])];

  const currDate1 = date[0].getDate();
  const currMonth1 = date[0].getMonth() + 1; // Months are zero based
  const currYear1 = date[0].getFullYear();

  const currDate2 = date[1].getDate();
  const currMonth2 = date[1].getMonth() + 1; // Months are zero based
  const currYear2 = date[1].getFullYear();

  return `${currYear1}-${currMonth1}-${currDate1},${currYear2}-${currMonth2}-${currDate2}`;
};

const setDateValueStr = (dateValue) => {
  dateValueStr.value = getDateValueStr(dateValue);
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

#stats {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.page2-wrapper {
  padding: 24px;
  box-sizing: border-box;
  align-items: baseline;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all ease 400ms;
}

.graph-list {
  width: 100%;
}

.title {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 700px;

  :deep(h3) {
    margin: 0;
  }
}

.welcome-section {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  width: 90%;
  margin-bottom: 1.25rem;
}

.welcome-section .city-dropdown {
  min-width: 200px;
  flex: 1;
}

.welcome-section > .row {
  display: flex;
  width: 90%;
}

.welcome-section > .row > .slider {
  width: 100%;
  margin-top: 36px;
}

.welcome-section > .row :deep(.slider-target .slider-connect) {
  background: $yellow;
}

.welcome-section > .row :deep(.slider-target .slider-tooltip) {
  background: $deepblack;
  border-color: $yellow;
  line-height: 16px;
}

.welcome {
  flex: 2;
  padding-right: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1.625rem;

  & div > span.yellow {
    color: $yellow;
  }
}

.welcome > .welcome-spinner {
  min-height: 5rem;
  display: flex;
  justify-content: center;
}

.is-legal-variation-dropdown {
  display: flex;
  position: absolute;
  top: -18px;
  left: 10px;
  z-index: 1;
  min-width: 150px;
}

.stats-section {
  position: relative;
  flex-direction: column;
  align-items: center;
  width: calc(50% - 10px);
  height: 500px;
  margin-right: 20px;
  margin-bottom: 20px;

  &:last-of-type {
    margin: 0;
  }
}

.stats-section.-high {
  height: 1020px;
  width: calc(50% - 10px);
}

.sub-column {
  display: flex;
  flex-direction: column;
  width: calc(50% - 10px);
}

.sub-column > .stats-section {
  width: 100%;
}

.stats-section-row {
  display: flex;
}

.stats-section.-large {
  width: 100%;
}

@media screen and (max-width: $mobileSize) {
  .welcome-section > .row {
    flex-direction: column;
  }

  .welcome-section > .row > .slider {
    margin-top: 50px;
  }

  .welcome {
    padding-right: 0;
  }

  .stats-section,
  .stats-section.-large,
  .stats-section.-high {
    height: 500px;
    width: 100%;
    margin-right: 0;
  }

  .sub-column {
    width: 100%;
  }

  .stats-section-row {
    flex-wrap: wrap;
  }

  .fixed-btn:not(.show-on-mobile) {
    display: none;
  }
}
</style>
