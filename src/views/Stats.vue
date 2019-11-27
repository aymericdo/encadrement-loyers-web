<template>
  <div id="stats">
    <ClipLoader :loading="status === 'submitting'" :color="'#fdcd56'"></ClipLoader>
    <VueRecaptcha
      v-if="status !== 'ok' && status !== 'submitting'"
      ref="recaptcha"
      @verify="onCaptchaVerified"
      @expired="onCaptchaExpired"
      sitekey="6Le2wcEUAAAAACry2m3rkq5LHx9H0DmphXXU8BNw"
    />
    <div class="center-wrapper" v-if="status === 'ok'">
      <div class="welcome">
        Sur les
        <span>{{welcomeData.numberRents}}</span>
        annonces étudiées, seulement
        <span>{{welcomeData.isLegalPercentage}}</span>
        % sont légales. Le
        <span>{{welcomeData.worstPostalCode}}</span>
        e est l'arrondissement où l'encadrement est le plus respecté contrairement au
        <span>{{welcomeData.bestPostalCode}}</span>e qui à le plus d'annonces illégales.
      </div>
      <Section class="map-container" ref="mapContainer">
        <SectionTitle>Carte</SectionTitle>
        <div id="map"></div>
        <SectionTitle>Différence de prix</SectionTitle>
        <div id="price-diff"></div>
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
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import VueRecaptcha from "vue-recaptcha";
import vegaEmbed from "vega-embed";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";
import SectionTitle from "@/shared/SectionTitle.vue";

export default {
  name: "Stats",
  components: {
    VueRecaptcha,
    ClipLoader,
    SectionTitle,
    StrokeIcon,
    FixedButton
  },
  data() {
    return {
      status: "",
      sucessfulServerResponse: "",
      serverError: "",
      welcomeData: null
    };
  },
  methods: {
    onFetchWelcome: function(recaptchaToken) {
      fetch(`${this.$domain}stats/welcome?recaptchaToken=${recaptchaToken}`)
        .then(res => res.json())
        .then(res => {
          this.welcomeData = res;
        })
        .catch(err => {
          this.serverError = getErrorMessage(err);
          this.status = "error";

          // helper to get a displayable message to the user
          function getErrorMessage(err) {
            let responseBody;
            responseBody = err.response;
            if (!responseBody) {
              responseBody = err;
            } else {
              responseBody = err.response.data || responseBody;
            }
            return responseBody.message || JSON.stringify(responseBody);
          }
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
          this.serverError = getErrorMessage(err);
          this.status = "error";

          // helper to get a displayable message to the user
          function getErrorMessage(err) {
            let responseBody;
            responseBody = err.response;
            if (!responseBody) {
              responseBody = err;
            } else {
              responseBody = err.response.data || responseBody;
            }
            return responseBody.message || JSON.stringify(responseBody);
          }
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
            const w = this.$refs.mapContainer.clientWidth;
            view.width(w).run();
          });
        })
        .catch(err => {
          this.serverError = getErrorMessage(err);
          this.status = "error";

          // helper to get a displayable message to the user
          function getErrorMessage(err) {
            let responseBody;
            responseBody = err.response;
            if (!responseBody) {
              responseBody = err;
            } else {
              responseBody = err.response.data || responseBody;
            }
            return responseBody.message || JSON.stringify(responseBody);
          }
        });
    },
    onCaptchaVerified: function(recaptchaToken) {
      this.status = "submitting";
      this.$refs.recaptcha.reset();
      this.onFetchWelcome(recaptchaToken);
      this.onFetchMap(recaptchaToken);
      this.onFetchPriceDifference(recaptchaToken);
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
  justify-content: center;
  width: calc(100% - 48px);
  padding: 0 24px;
}

#map {
  max-width: 100%;
}

.map-container {
  max-width: 100%;
  width: 700px;
  height: 500px;
}

.welcome > span {
  color: $yellow;
}
</style>
