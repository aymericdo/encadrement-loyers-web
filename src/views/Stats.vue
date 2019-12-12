<template>
  <div id="stats">
    <Spinner v-if="status === 'submitting'" />
    <VueRecaptcha
      v-if="status !== 'ok' && status !== 'submitting'"
      ref="recaptcha"
      @verify="onCaptchaVerified"
      @expired="onCaptchaExpired"
      sitekey="6Le2wcEUAAAAACry2m3rkq5LHx9H0DmphXXU8BNw"
    />
    <div class="center-wrapper" v-if="status === 'ok'">
      <Section>
        <div class="welcome">
          <span>Sur les</span>
          <span class="yellow">&nbsp;{{welcomeData.numberRents}}&nbsp;</span>
          <span>cas étudiés, seulement</span>
          <span class="yellow">&nbsp;{{welcomeData.isLegalPercentage}}</span>
          <span>% sont légaux. Le</span>
          <span class="yellow">&nbsp;{{welcomeData.bestPostalCode}}</span>
          <span>ème est l'arrondissement où l'encadrement est le plus respecté contrairement au</span>
          <span class="yellow">&nbsp;{{welcomeData.worstPostalCode}}</span>
          <span>ème qui à le plus d'annonces illégales.</span>
        </div>
      </Section>
      <Section class="stats-section">
        <SectionTitle class="title">Carte</SectionTitle>
        <div class="container" ref="mapContainer">
          <div id="map"></div>
        </div>
      </Section>
      <Section class="stats-section">
        <SectionTitle class="title">Différence de prix</SectionTitle>
        <div class="container" ref="diffContainer">
          <div id="price-diff"></div>
        </div>
      </Section>
      <Section class="stats-section">
        <SectionTitle class="title">Est légal par surface</SectionTitle>
        <div class="container" ref="legalContainer">
          <div id="is-legal-per-surface"></div>
        </div>
      </Section>
    </div>
    <router-link to="/">
      <FixedButton>
        <StrokeIcon :width="'20px'" :height="'20px'" />
      </FixedButton>
    </router-link>
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
  data() {
    return {
      status: "",
      sucessfulServerResponse: "",
      serverError: "",
      welcomeData: {}
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
          this.welcomeData = res;
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
          vegaEmbed("#map", spec, {
            tooltip: {
              theme: "dark"
            },
            actions: false
          }).then(result => {
            const view = result.view;
            const w = this.$refs.mapContainer.clientWidth;
            view.width(w).run();
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
          vegaEmbed("#price-diff", spec, {
            tooltip: {
              theme: "dark"
            },
            actions: false
          }).then(result => {
            const view = result.view;
            const w = this.$refs.diffContainer.clientWidth;
            view.width(w).run();
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
          vegaEmbed("#is-legal-per-surface", spec, {
            tooltip: {
              theme: "dark"
            },
            actions: false
          }).then(result => {
            const view = result.view;
            const w = this.$refs.legalContainer.clientWidth;
            view.width(w).run();
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
      this.onFetchMap(recaptchaToken);
      this.onFetchPriceDifference(recaptchaToken);
      this.onFetchIsLegalPerSurface(recaptchaToken);
    },
    onCaptchaExpired: function() {
      this.status = "";
      this.$refs.recaptcha.reset();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#stats {
  min-width: 100%;
  display: flex;
  justify-content: center;
  max-width: $mobileSize;
  margin-top: 8%;
  padding: 0;
}

.center-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 48px);
  padding: 0 24px;
}

#map,
#price-diff,
#is-legal-per-surface {
  max-width: 100%;
}

/deep/ .title > h3 {
  margin-top: 42px;
  margin-bottom: 8px;
}

.container {
  max-width: 100%;
  width: 700px;
  height: 500px;
}

.welcome {
  max-width: 700px;

  & > span.yellow {
    color: $yellow;
  }
}

.stats-section {
  flex-direction: column;
}
</style>
