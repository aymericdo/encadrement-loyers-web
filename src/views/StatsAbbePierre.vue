<template>
  <div id="stats">
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper v-if="isMounted">
        <VueRecaptcha
          class="recaptcha"
          v-if="status !== 'ok' && status !== 'submitting'"
          ref="recaptcha"
          @verify="onCaptchaVerified"
          @expired="onCaptchaExpired"
          sitekey="6Le2wcEUAAAAACry2m3rkq5LHx9H0DmphXXU8BNw"
        />
        <Spinner  :speed="0.5" line-fg-color="#fdcd56" size="huge" class="spinner" v-if="status !== 'ok' && status === 'submitting'" />
        <Section class="stats-section">
          <SectionTitle v-if="isLegalVariationLoaded" class="title">Pourcentage d'annonces illégales</SectionTitle>
          <div v-if="status === 'ok'" class="container" ref="mapContainer">
            <Spinner  :speed="0.5" line-fg-color="#fdcd56" size="large" v-if="!isLegalVariationLoaded" class="spinner" />
            <div v-if="isLegalVariationLoaded" id="isLegalVariation" class="graph"></div>
          </div>
        </Section>
        <Section class="stats-section">
          <SectionTitle v-if="isPriceVariationLoaded" class="title">Écart des annonces illégales avec le prix théorique</SectionTitle>
          <div v-if="status === 'ok'" class="container" ref="diffContainer">
            <Spinner  :speed="0.5" line-fg-color="#fdcd56" size="large" v-if=" !isPriceVariationLoaded" class="spinner" />
            <div v-if="isPriceVariationLoaded" id="priceVariation" class="graph"></div>
          </div>
        </Section>
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
import Spinner from 'vue-simple-spinner'
import vegaEmbed from "vega-embed";
import VueRecaptcha from "vue-recaptcha";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";
import SectionTitle from "@/shared/SectionTitle.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import Section from "@/shared/Section.vue";

export default {
  name: "StatsAbbePierre",
  components: {
    Spinner,
    SectionTitle,
    StrokeIcon,
    FixedButton,
    VueRecaptcha,
    Page2Wrapper,
    Section
  },
  mounted: function() {
    this.isMounted = true;
  },
  data() {
    return {
      isLegalVariationLoaded: false,
      isPriceVariationLoaded: false,
      isMounted: false,
      sucessfulServerResponse: "",
      serverError: "",
      status: "",
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
    onFetchIsLegalVariation: function(recaptchaToken) {
      fetch(`${this.$domain}stats/is-legal-variation?recaptchaToken=${recaptchaToken}`)
        .then(res => res.json())
        .then(spec => {
          this.status = "ok";
          this.isLegalVariationLoaded = true;
          this.onFetchPriceVariation()
          vegaEmbed("#isLegalVariation", spec, {
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
    onFetchPriceVariation: function(recaptchaToken) {
      fetch(
        `${this.$domain}stats/price-variation?recaptchaToken=${recaptchaToken}`
      )
        .then(res => res.json())
        .then(spec => {
          this.status = "ok";
          this.isPriceVariationLoaded = true;
          vegaEmbed("#priceVariation", spec, {
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
      this.onFetchIsLegalVariation(recaptchaToken);
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

.recaptcha {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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
  max-width: 100%;
  max-height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
}

/deep/ .title {
  max-width: 100%;
  width: 700px;

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
  align-items: center;
  margin-top: 0;

  &:last-child {
    margin-bottom: 20px;
  }
}
</style>