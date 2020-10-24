<template>
  <div id="stats">
    <transition name="slide-fade" v-on:leave="leave">
      <div v-if="isMounted" class="center-wrapper">
        <VueRecaptcha
          class="recaptcha"
          v-if="status !== 'ok' && status !== 'submitting'"
          ref="recaptcha"
          @verify="onCaptchaVerified"
          @expired="onCaptchaExpired"
          sitekey="6Le2wcEUAAAAACry2m3rkq5LHx9H0DmphXXU8BNw"
        />
        <Spinner class="spinner" v-if="status !== 'ok' && status === 'submitting'" />
        <Section v-if="welcomeData">
          <div class="welcome">
            <span>Sur les</span>
            <span class="yellow">&nbsp;{{welcomeData.numberRents}}&nbsp;</span>
            <span>cas étudiés,</span>
            <span class="yellow">&nbsp;{{welcomeData.isIllegalPercentage}}%&nbsp;</span>
            <span>sont potentiellement illégales. Pour les annonces d'une surface inférieure à</span>
            <span class="yellow">&nbsp;{{welcomeData.pivotSurface}}m²</span>
            <span>, il y a</span>
            <span class="yellow">&nbsp;{{welcomeData.isSmallSurfaceIllegalPercentage}}%&nbsp;</span>
            <span>d'annonces potentiellement illégales. Le</span>
            <span
              class="yellow"
            >&nbsp;{{welcomeData.bestPostalCode}}{{welcomeData.bestPostalCode !== '1' ? 'ème' : 'er' }}&nbsp;</span>
            <span>est l'arrondissement où l'encadrement est le plus respecté contrairement au</span>
            <span
              class="yellow"
            >&nbsp;{{welcomeData.worstPostalCode}}{{welcomeData.worstPostalCode !== '1' ? 'ème' : 'er' }}&nbsp;</span>
            <span>qui a le plus d'annonces potentiellement illégales.</span>
          </div>
        </Section>
        <Section class="stats-section">
          <SectionTitle v-if="isMapLoaded" class="title">Carte</SectionTitle>
          <div v-if="status === 'ok'" class="container" ref="mapContainer">
            <Spinner v-if="!isMapLoaded" class="spinner" />
            <div v-if="isMapLoaded" id="map"></div>
          </div>
        </Section>
        <Section class="stats-section">
          <SectionTitle v-if="isLegalPerSurfaceLoaded" class="title">Est légal par surface</SectionTitle>
          <div v-if="status === 'ok'" class="container" ref="legalContainer">
            <Spinner v-if="!isLegalPerSurfaceLoaded" class="spinner" />
            <div v-if="isLegalPerSurfaceLoaded" id="is-legal-per-surface"></div>
          </div>
        </Section>
        <Section class="stats-section">
          <SectionTitle v-if="isPriceDifferenceLoaded" class="title">Différence de prix</SectionTitle>
          <div v-if="status === 'ok'" class="container" ref="diffContainer">
            <Spinner v-if=" !isPriceDifferenceLoaded" class="spinner" />
            <div v-if="isPriceDifferenceLoaded" id="price-diff"></div>
          </div>
        </Section>
      </div>
    </transition>
    <div @click="unmount">
      <FixedButton>
        <StrokeIcon :width="'20px'" :height="'20px'" />
      </FixedButton>
    </div>
  </div>
</template>

<script>
import Spinner from "@/shared/Spinner.vue";
import VueRecaptcha from "vue-recaptcha";
import vegaEmbed from "vega-embed";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";
import SectionTitle from "@/shared/SectionTitle.vue";
import Section from "@/shared/Section.vue";

export default {
  name: "Stats",
  components: {
    VueRecaptcha,
    Spinner,
    SectionTitle,
    StrokeIcon,
    FixedButton,
    Section
  },
  mounted: function() {
    this.isMounted = true;
  },
  data() {
    return {
      isMapLoaded: false,
      isMounted: false,
      isLegalPerSurfaceLoaded: false,
      isPriceDifferenceLoaded: false,
      status: "",
      sucessfulServerResponse: "",
      serverError: "",
      welcomeData: null
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
    onFetchWelcome: function(recaptchaToken) {
      fetch(`${this.$domain}stats/welcome?recaptchaToken=${recaptchaToken}`)
        .then(res => res.json())
        .then(res => {
          this.status = "ok";
          this.welcomeData = res;
          this.onFetchMap(recaptchaToken);
          this.onFetchPriceDifference(recaptchaToken);
          this.onFetchIsLegalPerSurface(recaptchaToken);
        })
        .catch(err => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
    onFetchMap: function(recaptchaToken) {
      fetch(`${this.$domain}stats/map?recaptchaToken=${recaptchaToken}`)
        .then(res => res.json())
        .then(spec => {
          this.status = "ok";
          this.isMapLoaded = true;
          vegaEmbed("#map", spec, {
            tooltip: {
              theme: "dark"
            },
            actions: false
          });
        })
        .catch(err => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
    onFetchPriceDifference: function(recaptchaToken) {
      fetch(
        `${this.$domain}stats/price-difference?recaptchaToken=${recaptchaToken}`
      )
        .then(res => res.json())
        .then(spec => {
          this.status = "ok";
          this.isPriceDifferenceLoaded = true;
          vegaEmbed("#price-diff", spec, {
            tooltip: {
              theme: "dark"
            },
            actions: false
          });
        })
        .catch(err => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
    onFetchIsLegalPerSurface: function(recaptchaToken) {
      fetch(
        `${this.$domain}stats/is-legal-per-surface?recaptchaToken=${recaptchaToken}`
      )
        .then(res => res.json())
        .then(spec => {
          this.status = "ok";
          this.isLegalPerSurfaceLoaded = true;
          vegaEmbed("#is-legal-per-surface", spec, {
            tooltip: {
              theme: "dark"
            },
            actions: false
          });
        })
        .catch(err => {
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
    }
  }
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

.center-wrapper {
  align-items: center;
  background: rgba($deepgrey, 0.9);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 80%;
  width: 80%;
  max-width: 90%;
  overflow-y: auto;
  padding: 0 24px;
  position: relative;

  & > .recaptcha {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
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

#map,
#price-diff,
#is-legal-per-surface {
  max-width: 100%;
  max-height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
}

/deep/ .title {
  max-width: inherit;

  & > h3 {
    margin-top: 42px;
    margin-bottom: 8px;
  }
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 100%;
  width: 700px;
  height: 500px;
}

.spinner {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.welcome {
  max-width: 700px;

  & > span.yellow {
    color: $yellow;
  }
}

.stats-section {
  flex-direction: column;

  &:last-child {
    margin-bottom: 20px;
  }
}
</style>
