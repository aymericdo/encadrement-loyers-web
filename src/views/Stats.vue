<template>
  <div id="stats">
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper class="page2-wrapper" v-if="isMounted">
        <div class="entire-page-centered">
          <VueRecaptcha
            class="recaptcha"
            v-if="status !== 'ok' && status !== 'submitting'"
            ref="recaptcha"
            @verify="onCaptchaVerified"
            @expired="onCaptchaExpired"
            sitekey="6Le2wcEUAAAAACry2m3rkq5LHx9H0DmphXXU8BNw"
          />
          <Spinner
            :speed="0.5"
            line-fg-color="#fdcd56"
            size="huge"
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

          <div class="dropdown-city">
            <VueDropdown
              :config="cityDropdownConfig"
              @setSelectedOption="setNewSelectedOption($event)"
            ></VueDropdown>
          </div>
        </div>

        <div class="graph-list" v-if="status === 'ok'">
          <div class="stats-section -large">
            <Graph
              :id="'is-legal-variation'"
              :city="this.city"
              @errorOutput="getErrorMessage($event)"
            ></Graph>
          </div>

          <div class="stats-section-row">
            <div class="stats-section -high">
              <Graph
                :id="'is-legal-per-surface'"
                :city="this.city"
                @errorOutput="getErrorMessage($event)"
              ></Graph>
            </div>

            <div class="sub-column">
              <div class="stats-section">
                <Graph
                  :id="'chloropleth-map'"
                  :city="this.city"
                  @errorOutput="getErrorMessage($event)"
                ></Graph>
              </div>

              <div class="stats-section">
                <Graph
                  :id="'map'"
                  :city="this.city"
                  @errorOutput="getErrorMessage($event)"
                ></Graph>
              </div>
            </div>
          </div>

          <div class="stats-section-row">
            <div class="stats-section">
              <Graph
                :id="'price-difference'"
                :city="this.city"
                @errorOutput="getErrorMessage($event)"
              ></Graph>
            </div>

            <div class="stats-section">
              <Graph
                :id="'price-variation'"
                :city="this.city"
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
import Spinner from "vue-simple-spinner";
import VueRecaptcha from "vue-recaptcha";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import VueDropdown from "vue-dynamic-dropdown";
import Graph from "@/shared/Graph.vue";

const DEFAULT_CITY = "paris";
const DEFAULT_OPTIONS = [
  {
    realValue: 'paris',
    value: "Paris",
  },
  {
    realValue: 'lille',
    value: "Lille",
  },
];

export default {
  name: "Stats",
  components: {
    VueRecaptcha,
    Spinner,
    Page2Wrapper,
    StrokeIcon,
    FixedButton,
    VueDropdown,
    Graph,
  },
  mounted: function() {
    this.isMounted = true;
    this.needCaptcha();
  },
  beforeDestroy: function() {
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
      cityDropdownConfig: {
        options: DEFAULT_OPTIONS,
        placeholder: DEFAULT_OPTIONS[0].value,
        disabled: false,
        backgroundColor: "#fdcd56",
        textColor: "#050505",
        borderRadius: "8px",
        width: 180,
      },
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
    setNewSelectedOption(selectedOption) {
      if (this.city === selectedOption.realValue) {
        return;
      }
      this.city = selectedOption.realValue;
      this.cityDropdownConfig.placeholder = selectedOption.value;
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

.graph {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  border: 1px white solid;
  border-radius: 4px;
  max-width: 100%;
  width: 100%;
  height: 100%;
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

.stats-section {
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
