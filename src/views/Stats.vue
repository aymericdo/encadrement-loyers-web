<template>
  <div id="stats">
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper class="page2-wrapper" v-if="isMounted">
        <div class="entire-page-centered">
          <vue-recaptcha
            siteKey="6Le2wcEUAAAAACry2m3rkq5LHx9H0DmphXXU8BNw"
            class="recaptcha"
            ref="recaptcha"
            :show="status !== 'ok' && status !== 'submitting' ? 1 : 0"
            size="normal"
            theme="light"
            :tabindex="0"
            @verify="onCaptchaVerified"
            @expire="onCaptchaExpired"
          />
          <half-circle-spinner
            :animation-duration="1000"
            color="#fdcd56"
            :size="120"
            class="spinner"
            v-if="status !== 'ok' && status === 'submitting'"
          />
        </div>

        <div class="welcome-section" v-if="welcomeData">
          <div class="welcome">
            <span>Sur les</span>
            <span class="yellow"
              >&nbsp;{{ welcomeData.numberRents }}&nbsp;</span
            >
            <span>cas étudiés,</span>
            <span class="yellow"
              >&nbsp;{{ welcomeData.isIllegalPercentage }}%&nbsp;</span
            >
            <span
              >sont illégales. Pour les annonces d'une surface inférieure
              à</span
            >
            <span class="yellow">&nbsp;{{ welcomeData.pivotSurface }}m²</span>
            <span>, il y a</span>
            <span class="yellow"
              >&nbsp;{{
                welcomeData.isSmallSurfaceIllegalPercentage
              }}%&nbsp;</span
            >
            <span>d'annonces illégales.</span>
          </div>

          <div class="city-dropdown">
            <Dropdown
              :options="cityDropdownOptions"
              :currentValue="city"
              @onSelect="changeCity($event)"
            ></Dropdown>
          </div>
        </div>

        <div class="graph-list" v-if="status === 'ok'">
          <div class="stats-section -large">
            <Graph
              :id="'is-legal-variation'"
              :city="city"
              @errorOutput="getErrorMessage($event)"
            ></Graph>
            <div class="is-legal-variation-dropdown">
              <Dropfilters @onSubmit="changeFilters($event)"> </Dropfilters>
            </div>
          </div>

          <div class="stats-section-row">
            <div class="stats-section -high">
              <Graph
                :id="'is-legal-per-surface'"
                :city="city"
                @errorOutput="getErrorMessage($event)"
              ></Graph>
            </div>

            <div class="sub-column">
              <div class="stats-section">
                <Graph
                  :id="'chloropleth-map'"
                  :city="city"
                  @errorOutput="getErrorMessage($event)"
                ></Graph>
              </div>

              <div class="stats-section">
                <Graph
                  :id="'map'"
                  :city="city"
                  @errorOutput="getErrorMessage($event)"
                ></Graph>
              </div>
            </div>
          </div>

          <div class="stats-section-row">
            <div class="stats-section">
              <Graph
                :id="'price-difference'"
                :city="city"
                @errorOutput="getErrorMessage($event)"
              ></Graph>
            </div>

            <div class="stats-section">
              <Graph
                :id="'price-variation'"
                :city="city"
                @errorOutput="getErrorMessage($event)"
              ></Graph>
            </div>
          </div>
        </div>
      </Page2Wrapper>
    </transition>
    <div @click="unmount">
      <FixedButton>
        <StrokeIcon :width="'20px'" :height="'20px'" />
      </FixedButton>
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
import vueRecaptcha from "vue3-recaptcha2";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import Dropdown from "@/shared/Dropdown.vue";
import Dropfilters from "@/shared/Dropfilters.vue";
import Graph from "@/shared/Graph.vue";

const DEFAULT_CITY = "paris";
const DEFAULT_CITY_OPTIONS = [
  {
    value: "paris",
    label: "Paris",
  },
  {
    value: "lille",
    label: "Lille",
  },
];

export default {
  name: "Stats",
  components: {
    HalfCircleSpinner,
    vueRecaptcha,
    Page2Wrapper,
    StrokeIcon,
    FixedButton,
    Dropdown,
    Dropfilters,
    Graph,
  },
  mounted: function() {
    this.isMounted = true;
    this.needCaptcha();
  },
  beforeUnmount: function() {
    this.controller.abort();
  },
  data() {
    return {
      controller: new AbortController(),
      isMounted: false,
      city: DEFAULT_CITY,
      status: "",
      sucessfulServerResponse: "",
      serverError: "",
      welcomeData: null,
      cityDropdownOptions: DEFAULT_CITY_OPTIONS,
    };
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
      return responseBody.message || JSON.stringify(responseBody);
    },
    needCaptcha: function() {
      this.status = "submitting";
      fetch(`${this.$domain}stats/need-captcha`, {
        signal: this.controller.signal,
      })
        .then((res) => res.json())
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
      fetch(`${this.$domain}stats/welcome?recaptchaToken=${recaptchaToken}`, {
        signal: this.controller.signal,
      })
        .then((res) => res.json())
        .then((res) => {
          this.status = "ok";
          this.welcomeData = res;
        })
        .catch((err) => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
    onCaptchaVerified: function(recaptchaToken) {
      this.status = "submitting";
      this.$refs.recaptcha.reset();
      this.onFetchWelcome(recaptchaToken);
    },
    onCaptchaExpired: function() {
      this.status = "";
      this.$refs.recaptcha.reset();
    },
    changeCity(opt) {
      if (this.city === opt.value) {
        return;
      }
      this.city = opt.value;
    },
    changeFilters(opt) {
      console.log(opt);
    },
    leave: function() {
      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 400);
    },
    unmount: function() {
      this.isMounted = false;
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

.slide-fade-enter,
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

.spinner {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.welcome-section {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  max-width: 700px;
}

.welcome {
  & > span.yellow {
    color: $yellow;
  }
}

.is-legal-variation-dropdown {
  display: flex;
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  z-index: 1;
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
}
</style>
