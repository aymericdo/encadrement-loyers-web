<template>
  <div id="stats">
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper class="page2-wrapper" v-if="isMounted">
        <SectionTitle class="title">Stats</SectionTitle>
        <div v-if="status !== 'ok'" class="entire-page-centered">
          <GoogleRecaptcha
            siteKey="6Le2wcEUAAAAACry2m3rkq5LHx9H0DmphXXU8BNw"
            class="recaptcha"
            ref="vueRecaptcha"
            v-if="status !== 'submitting'"
            size="normal"
            theme="light"
            :tabindex="0"
            @verify="onCaptchaVerified"
            @expire="onCaptchaExpired"
          />
          <bounce-loader class="spinner" :loading="status === 'submitting'" color="#fdcd56" :size="'120px'"></bounce-loader>
        </div>

        <div class="welcome-section" v-if="welcomeData">
          <div class="row">
            <div class="welcome">
              <div class="welcome-spinner">
                <bounce-loader class="spinner" :loading="!isWelcomeTextLoaded" color="#fdcd56" :size="'60px'"></bounce-loader>
              </div>
              <template v-if="isWelcomeTextLoaded">
                <div>
                  <span>Sur les</span>
                  <span class="yellow"
                    >&nbsp;{{ welcomeData.numberRents }}&nbsp;</span
                  >
                  <span>annonces étudiées au total</span>
                  <template v-if="city !== 'all'">
                    à
                    <span class="yellow">
                      &nbsp;{{
                        cityDropdownOptions.find((c) => c.value === city).label
                      }}</span
                    >
                  </template>
                  <span>,</span>
                  <span class="yellow">
                    &nbsp;{{ welcomeData.isIllegalPercentage }}%&nbsp;
                  </span>
                  <span>sont non conformes.</span>
                </div>
                <div>
                  <span>Pour les annonces d'une surface inférieure à</span>
                  <span class="yellow">
                    &nbsp;{{ welcomeData.pivotSurface }}m²
                  </span>
                  <span>, il y a</span>
                  <span class="yellow">
                    &nbsp;{{
                      welcomeData.isSmallSurfaceIllegalPercentage
                    }}%&nbsp;
                  </span>
                  <span>d'annonces non conformes.</span>
                </div>
              </template>
            </div>

            <div class="city-dropdown">
              <Dropdown
                :options="cityDropdownOptions"
                :currentValue="city"
                @onSelect="changeCity($event)"
              ></Dropdown>
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

        <div class="graph-list" v-if="status === 'ok'">
          <div class="stats-section -large">
            <Graph
              ref="isLegalVariation"
              :id="'is-legal-variation'"
              :city="city"
              :date="getDatesFromValues"
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
                :date="getDatesFromValues"
                :city="city"
                @errorOutput="getErrorMessage($event)"
              ></Graph>
            </div>

            <div class="stats-section">
              <Graph
                :id="'map'"
                :date="getDatesFromValues"
                :city="city"
                @errorOutput="getErrorMessage($event)"
              ></Graph>
            </div>
          </div>

          <div class="stats-section -large">
            <Graph
              :id="'is-legal-per-surface'"
              :date="getDatesFromValues"
              :city="city"
              @errorOutput="getErrorMessage($event)"
            ></Graph>
          </div>

          <div class="stats-section-row">
            <div class="stats-section">
              <Graph
                :id="'price-difference'"
                :date="getDatesFromValues"
                :city="city"
                @errorOutput="getErrorMessage($event)"
              ></Graph>
            </div>

            <div class="stats-section">
              <Graph
                :id="'price-variation'"
                :date="getDatesFromValues"
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
      @click="unmount"
    >
      <FixedButton>
        <StrokeIcon :width="'20px'" :height="'20px'" />
      </FixedButton>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
import { useRoute } from "vue-router";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import SectionTitle from "@/shared/SectionTitle.vue";
import GoogleRecaptcha from "@/shared/GoogleRecaptcha.vue";
import FixedButton from "@/shared/FixedButton.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import Dropdown from "@/shared/Dropdown.vue";
import Dropfilters from "@/shared/Dropfilters.vue";
import Graph from "@/shared/Graph.vue";
import Slider from "@vueform/slider";
import { domain } from "@/helper/config";

import "@vueform/slider/themes/default.css";

const DEFAULT_CITY_OPTIONS = [
  {
    value: "all",
    label: "Tout",
  },
  {
    value: "paris",
    label: "Paris",
  },
  {
    value: "lille",
    label: "Lille",
  },
  {
    value: "plaineCommune",
    label: "Plaine Commune",
  },
  {
    value: "estEnsemble",
    label: "Est Ensemble",
  },
  {
    value: "lyon",
    label: "Lyon",
  },
  {
    value: "montpellier",
    label: "Montpellier",
  },
  {
    value: "bordeaux",
    label: "Bordeaux",
  },
];

export default {
  name: "Stats",
  components: {
    BounceLoader,
    GoogleRecaptcha,
    SectionTitle,
    Page2Wrapper,
    StrokeIcon,
    FixedButton,
    Dropdown,
    Dropfilters,
    Graph,
    Slider,
  },
  mounted: function() {
    this.isMounted = true;
    this.needCaptcha();
    this.setDateValueStr(this.dateValue);
  },
  beforeUnmount: function() {
    this.controller.abort();
  },
  computed: {
    getDatesFromValues() {
      return this.dateValueStr;
    },
  },
  setup() {
    const route = useRoute();
    const showCloseButton = ref(true);
    const isLegalVariation = ref(null);
    const legalPercentageFiltersCount = ref(0);

    // Date of the first ad in the db
    const realStartDate = new Date("2019-10-22");
    const realEndDate = new Date();
    // Number of days between the first ad in the db and today
    const maxDateValue = Math.round(
      (realEndDate - realStartDate) / (1000 * 60 * 60 * 24)
    );
    // Number of days between the first ad in the db and 3 months before today
    const minDateValue = Math.round(
      (new Date(realEndDate.setMonth(realEndDate.getMonth() - 3)) -
        realStartDate) /
        (1000 * 60 * 60 * 24)
    );

    const initialLegalPercentageOptions = {
      surfaceValue: [9, 100],
      roomValue: [1, 6],
      furnishedValue: "all",
      districtValues: [],
      isParticulierValue: "all",
    };

    const legalPercentageOptions = ref({
      ...initialLegalPercentageOptions,
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

    return {
      showCloseButton,
      isLegalVariation,
      controller: new AbortController(),
      isMounted: ref(false),
      city: ref(route.params.city || "paris"),
      status: ref(""),
      sucessfulServerResponse: ref(""),
      serverError: ref(""),
      welcomeData: ref(null),
      isWelcomeTextLoaded: ref(false),
      cityDropdownOptions: DEFAULT_CITY_OPTIONS,
      initialLegalPercentageOptions,
      legalPercentageOptions,
      legalPercentageFiltersCount,
      realStartDate,
      dateValue: ref([minDateValue, maxDateValue]),
      maxDateValue,
      dateValueStr: ref(""),
    };
  },
  watch: {
    "$route.params.city": function(value) {
      this.city = value;
      this.onFetchWelcome(null);
      this.isWelcomeTextLoaded = false;
    },
  },
  methods: {
    // helper to get a displayable message to the user
    getErrorMessage(err) {
      let responseBody;
      responseBody = err.response;
      if (!responseBody) {
        responseBody = err;
      } else {
        responseBody = err.response.data || responseBody;
      }

      if (err.message === "token expired") {
        this.status = "";
        this.welcomeData = null;
      }

      return responseBody.message || JSON.stringify(responseBody);
    },
    needCaptcha: function() {
      this.status = "submitting";
      fetch(`${domain}stats/need-captcha`, {
        signal: this.controller.signal,
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
          if (res) {
            this.status = "";
          } else {
            this.onFetchWelcome(null);
          }
        })
        .catch((err) => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
    onFetchWelcome: function(recaptchaToken) {
      fetch(
        `${domain}stats/welcome/${this.city}?recaptchaToken=${recaptchaToken}`,
        {
          signal: this.controller.signal,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "token expired") {
            throw res;
          } else {
            return res;
          }
        })
        .then((res) => {
          this.status = "ok";
          this.welcomeData = res;
          this.isWelcomeTextLoaded = true;
        })
        .catch((err) => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
    onCaptchaVerified: function(recaptchaToken) {
      this.status = "submitting";
      this.$refs.vueRecaptcha.reset();
      this.onFetchWelcome(recaptchaToken);
    },
    onCaptchaExpired: function() {
      this.status = "";
      this.$refs.vueRecaptcha.reset();
    },
    changeCity(opt) {
      if (this.city === opt.value) {
        return;
      }

      this.$router.push({ path: `${opt.value}` });
    },
    changeFilters(opt = null) {
      if (opt) {
        this.legalPercentageOptions = { ...opt };
      } else {
        this.legalPercentageOptions = { ...this.initialLegalPercentageOptions };
      }
    },
    leave: function() {
      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 400);
    },
    unmount: function() {
      this.isMounted = false;
    },
    getDateFromValue: function(value) {
      const copy = new Date(Number(this.realStartDate));
      copy.setDate(this.realStartDate.getDate() + value);
      return copy;
    },
    dateValueFct: function(value) {
      return this.getDateFromValue(value).toLocaleDateString();
    },
    getDateValueStr: function(dateValue) {
      const date = [
        this.getDateFromValue(dateValue[0]),
        this.getDateFromValue(dateValue[1]),
      ];

      const currDate1 = date[0].getDate();
      const currMonth1 = date[0].getMonth() + 1; //Months are zero based
      const currYear1 = date[0].getFullYear();

      const currDate2 = date[1].getDate();
      const currMonth2 = date[1].getMonth() + 1; //Months are zero based
      const currYear2 = date[1].getFullYear();

      return `${currYear1}-${currMonth1}-${currDate1},${currYear2}-${currMonth2}-${currDate2}`;
    },
    setDateValueStr: function(dateValue) {
      this.dateValueStr = this.getDateValueStr(dateValue);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

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

.recaptcha {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.page2-wrapper {
  padding: 24px;
  box-sizing: border-box;
  align-items: baseline;
}

.entire-page-centered {
  height: 100vh;
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
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

.entire-page-centered > .spinner {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.title {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
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
  align-items: center;
  padding: 24px;
  max-width: 700px;
  margin-bottom: 24px;
}

.welcome-section .city-dropdown {
  width: 200px;
  min-width: 200px;
}

.welcome-section > .row {
  display: flex;
  width: 100%;
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
  padding-right: 1rem;
  min-height: 8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & div > span.yellow {
    color: $yellow;
  }
}

.welcome > .welcome-spinner {
  min-width: 500px;
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

  .welcome > .welcome-spinner {
  min-width: inherit;
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
