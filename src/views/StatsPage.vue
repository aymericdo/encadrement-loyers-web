<template>
  <Page2Wrapper :is-mounted="isMounted">
    <div class="welcome-section">
      <SectionTitle class="title">
        Stats
      </SectionTitle>

      <div class="row">
        <div class="welcome">
          <div
            v-if="!isWelcomeTextLoaded"
            class="flex justify-center"
          >
            <BounceLoader
              class="spinner"
              :loading="!isWelcomeTextLoaded"
              color="#fdcd56"
              :size="'60px'"
            />
          </div>
          <template v-if="isWelcomeTextLoaded">
            <div>
              <span>Sur les</span>
              <span class="text-[#fdcd56]">&nbsp;{{ welcomeData.numberRents }}&nbsp;</span>
              <span>annonces étudiées au total</span>
              <template v-if="city !== 'all'">
                à<span class="text-[#fdcd56]">&nbsp;{{
                  cityDropdownOptions.find((c) => c.value === city).label
                }}</span>
              </template>
              <span>,</span>
              <span class="text-[#fdcd56]">&nbsp;{{ welcomeData.isIllegalPercentage }}%&nbsp;</span>
              <span>sont non conformes.</span>
            </div>
            <div>
              <span>Pour les annonces d'une surface inférieure à</span>
              <span class="text-[#fdcd56]">&nbsp;{{ welcomeData.pivotSurface }}m²</span><span>, il y a</span>
              <span class="text-[#fdcd56]">&nbsp;{{
                welcomeData.isIllegalPercentageUnderPivot
              }}%&nbsp;</span>
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
                  :key="value"
                  :value="value"
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
          v-model="dateValue"
          class="slider"
          :min="0"
          :max="maxDateValue"
          :format="dateValueFct"
          @change="setDateValueStr"
        />
      </div>
    </div>

    <div class="graph-list">
      <div class="stats-section -large">
        <CityGraph
          :id="'is-legal-variation'"
          ref="isLegalVariation"
          :city="city"
          :date="dateValueStr"
          :options="legalPercentageOptions"
          @error-output="getErrorMessage($event)"
        />
        <div class="is-legal-variation-dropdown">
          <Dropfilters
            :city="city"
            :options="legalPercentageOptions"
            @on-submit="changeFilters($event)"
            @on-reset="changeFilters()"
          />
        </div>
      </div>

      <div
        v-if="city !== 'all'"
        class="stats-section-row"
      >
        <div class="stats-section">
          <CityGraph
            :id="'chloropleth-map'"
            :date="dateValueStr"
            :city="city"
            @error-output="getErrorMessage($event)"
          />
        </div>

        <div class="stats-section">
          <CityGraph
            :id="'map'"
            :date="dateValueStr"
            :city="city"
            @error-output="getErrorMessage($event)"
          />
        </div>
      </div>

      <div
        v-if="
          city !== 'all' &&
            cityDropdownOptions.find((value) => value.value === city)
              ?.multipleCities
        "
        class="stats-section -large"
      >
        <CityGraph
          :id="'chloropleth-cities-map'"
          :date="dateValueStr"
          :city="city"
          @error-output="getErrorMessage($event)"
        />
      </div>

      <div class="stats-section -large">
        <CityGraph
          :id="'is-legal-per-surface'"
          :date="dateValueStr"
          :city="city"
          @error-output="getErrorMessage($event)"
        />
      </div>

      <div
        v-if="city === 'all'"
        class="stats-section -large"
      >
        <CityGraph
          :id="'price-variation'"
          :date="dateValueStr"
          :city="city"
          @error-output="getErrorMessage($event)"
        />
      </div>

      <div
        v-if="city !== 'all'"
        class="stats-section-row"
      >
        <div class="stats-section">
          <CityGraph
            :id="'price-difference'"
            :date="dateValueStr"
            :city="city"
            @error-output="getErrorMessage($event)"
          />
        </div>

        <div class="stats-section">
          <CityGraph
            :id="'price-variation'"
            :date="dateValueStr"
            :city="city"
            @error-output="getErrorMessage($event)"
          />
        </div>
      </div>
    </div>
    <div
      class="fixed-btn"
      :class="{ 'show-on-mobile': showCloseButton }"
      @click="isMounted = false"
    >
      <FixedButton>
        <StrokeIcon
          :width="'18px'"
          :height="'18px'"
        />
      </FixedButton>
    </div>
  </Page2Wrapper>
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
import Dropfilters from "@/shared/DropfiltersItem.vue";
import FixedButton from "@/shared/FixedButton.vue";
import CityGraph from "@/shared/CityGraphItem.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import SectionTitle from "@/shared/SectionTitleItem.vue";
import Slider from "@vueform/slider";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";

import { camelize, kebabize } from "../tools/kebabier";

import "@vueform/slider/themes/default.css";

const route = useRoute();
const router = useRouter();
const showCloseButton = ref(true);
const isLegalVariation = ref(null);
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

.welcome-section,
.graph-list {
  min-width: 100%;
}

.welcome-section {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
}

.graph-list {
  padding: 1.25rem;
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
  margin-bottom: 1.25rem;
}

.welcome-section .city-dropdown {
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

  .stats-section-row {
    flex-wrap: wrap;
  }

  .fixed-btn:not(.show-on-mobile) {
    display: none;
  }
}
</style>
