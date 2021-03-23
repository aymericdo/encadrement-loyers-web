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

        <div v-if="welcomeData">
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
        </div>

        <div class="graph-list" v-if="status === 'ok'">
          <div class="stats-section -large">
            <div class="container">
              <Spinner
                :speed="0.5"
                line-fg-color="#fdcd56"
                size="large"
                v-if="!isLegalVariationLoaded"
                class="spinner"
              />
              <div
                v-if="isLegalVariationLoaded"
                id="is-legal-variation"
                class="graph"
              ></div>
            </div>
          </div>

          <div class="stats-section-row">
            <div class="stats-section -high">
              <div class="container">
                <Spinner
                  :speed="0.5"
                  line-fg-color="#fdcd56"
                  size="large"
                  v-if="!isLegalPerSurfaceLoaded"
                  class="spinner"
                />
                <div
                  v-if="isLegalPerSurfaceLoaded"
                  id="is-legal-per-surface"
                  class="graph"
                ></div>
              </div>
            </div>

            <div class="sub-column">
              <div class="stats-section">
                <div class="container">
                  <Spinner
                    :speed="0.5"
                    line-fg-color="#fdcd56"
                    size="large"
                    v-if="!isChloroplethMapLoaded"
                    class="spinner"
                  />
                  <div
                    v-if="isChloroplethMapLoaded"
                    id="chloropleth-map"
                    class="graph"
                  ></div>
                </div>
              </div>

              <div class="stats-section">
                <div class="container">
                  <Spinner
                    :speed="0.5"
                    line-fg-color="#fdcd56"
                    size="large"
                    v-if="!isMapLoaded"
                    class="spinner"
                  />
                  <div v-if="isMapLoaded" id="map" class="graph"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="stats-section-row">
            <div class="stats-section">
              <div class="container">
                <Spinner
                  :speed="0.5"
                  line-fg-color="#fdcd56"
                  size="large"
                  v-if="!isPriceDifferenceLoaded"
                  class="spinner"
                />
                <div
                  v-if="isPriceDifferenceLoaded"
                  id="price-diff"
                  class="graph"
                ></div>
              </div>
            </div>

            <div class="stats-section">
              <div class="container">
                <Spinner
                  :speed="0.5"
                  line-fg-color="#fdcd56"
                  size="large"
                  v-if="!isPriceVariationLoaded"
                  class="spinner"
                />
                <div
                  v-if="isPriceVariationLoaded"
                  id="price-variation"
                  class="graph"
                ></div>
              </div>
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
import vegaEmbed from "vega-embed";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";

const VEGA_COMMON = {
  tooltip: {
    theme: "dark",
  },
  actions: false,
  // not working héhé
  // width: 'container',
};

export default {
  name: "Stats",
  components: {
    VueRecaptcha,
    Spinner,
    Page2Wrapper,
    StrokeIcon,
    FixedButton,
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
      isMapLoaded: false,
      isChloroplethMapLoaded: false,
      isMounted: false,
      isLegalPerSurfaceLoaded: false,
      isPriceDifferenceLoaded: false,
      isPriceVariationLoaded: false,
      isLegalVariationLoaded: false,
      city: "paris",
      status: "",
      sucessfulServerResponse: "",
      serverError: "",
      welcomeData: null,
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
      fetch(
        `${this.$domain}stats/welcome/${this.city}?recaptchaToken=${recaptchaToken}`,
        { signal: this.controller.signal }
      )
        .then((res) => res.json())
        .then((res) => {
          this.status = "ok";
          this.welcomeData = res;
          this.onFetchMap();
          this.onFetchChloroplethMap();
          this.onFetchPriceDifference();
          this.onFetchIsLegalPerSurface();
          this.onFetchPriceVariation();
          this.onFetchIsLegalVariation();
        })
        .catch((err) => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
    onFetchIsLegalVariation: function() {
      fetch(`${this.$domain}stats/is-legal-variation/${this.city}`, {
        signal: this.controller.signal,
      })
        .then((res) => res.json())
        .then((spec) => {
          if (this.controller.signal.aborted) return;

          this.status = "ok";
          this.isLegalVariationLoaded = true;
          setTimeout(() => {
            const width = document.getElementById("is-legal-variation")
              .clientWidth;
            const height = document.getElementById("is-legal-variation")
              .clientHeight;
            vegaEmbed("#is-legal-variation", spec, {
              ...VEGA_COMMON,
              width: width < 500 ? 500 : width,
              height,
            });
          });
        })
        .catch((err) => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
    onFetchMap: function() {
      fetch(`${this.$domain}stats/map/${this.city}`, {
        signal: this.controller.signal,
      })
        .then((res) => res.json())
        .then((spec) => {
          if (this.controller.signal.aborted) return;

          this.status = "ok";
          this.isMapLoaded = true;
          setTimeout(() => {
            const width = document.getElementById("map").clientWidth;
            const height = document.getElementById("map").clientHeight;
            vegaEmbed("#map", spec, {
              ...VEGA_COMMON,
              width: width < 500 ? 500 : width,
              height,
            });
          });
        })
        .catch((err) => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
    onFetchChloroplethMap: function() {
      fetch(`${this.$domain}stats/chloropleth-map/${this.city}`, {
        signal: this.controller.signal,
      })
        .then((res) => res.json())
        .then((spec) => {
          if (this.controller.signal.aborted) return;

          this.status = "ok";
          this.isChloroplethMapLoaded = true;
          setTimeout(() => {
            const width = document.getElementById("chloropleth-map")
              .clientWidth;
            const height = document.getElementById("chloropleth-map")
              .clientHeight;
            vegaEmbed("#chloropleth-map", spec, {
              ...VEGA_COMMON,
              width: width < 500 ? 500 : width,
              height,
            });
          });
        })
        .catch((err) => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
    onFetchPriceDifference: function() {
      fetch(`${this.$domain}stats/price-difference/${this.city}`, {
        signal: this.controller.signal,
      })
        .then((res) => res.json())
        .then((spec) => {
          if (this.controller.signal.aborted) return;

          this.status = "ok";
          this.isPriceDifferenceLoaded = true;
          setTimeout(() => {
            const width = document.getElementById("price-diff").clientWidth;
            const height = document.getElementById("price-diff").clientHeight;
            vegaEmbed("#price-diff", spec, {
              ...VEGA_COMMON,
              width: width < 500 ? 500 : width,
              height,
            });
          });
        })
        .catch((err) => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
    onFetchPriceVariation: function() {
      fetch(`${this.$domain}stats/price-variation/${this.city}`, {
        signal: this.controller.signal,
      })
        .then((res) => res.json())
        .then((spec) => {
          if (this.controller.signal.aborted) return;

          this.status = "ok";
          this.isPriceVariationLoaded = true;
          setTimeout(() => {
            const width = document.getElementById("price-variation")
              .clientWidth;
            const height = document.getElementById("price-variation")
              .clientHeight;
            vegaEmbed("#price-variation", spec, {
              ...VEGA_COMMON,
              width: width < 500 ? 500 : width,
              height,
            });
          });
        })
        .catch((err) => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
    onFetchIsLegalPerSurface: function() {
      fetch(`${this.$domain}stats/is-legal-per-surface/${this.city}`, {
        signal: this.controller.signal,
      })
        .then((res) => res.json())
        .then((spec) => {
          if (this.controller.signal.aborted) return;

          this.status = "ok";
          this.isLegalPerSurfaceLoaded = true;
          setTimeout(() => {
            const width = document.getElementById("is-legal-per-surface")
              .clientWidth;
            const height = document.getElementById("is-legal-per-surface")
              .clientHeight;
            vegaEmbed("#is-legal-per-surface", spec, {
              ...VEGA_COMMON,
              width: width < 500 ? 500 : width,
              height,
            });
          });
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

.welcome {
  padding: 24px;
  max-width: 700px;

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
