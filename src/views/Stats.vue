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
    <div id="map"></div>
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

export default {
  name: "Stats",
  components: {
    VueRecaptcha,
    ClipLoader,
    StrokeIcon,
    FixedButton
  },
  data() {
    return {
      status: "",
      sucessfulServerResponse: "",
      serverError: ""
    };
  },
  methods: {
    onCaptchaVerified: function(recaptchaToken) {
      this.status = "submitting";
      this.$refs.recaptcha.reset();
      fetch(
        `https://encadrement-loyers.herokuapp.com/stats/map?recaptchaToken=${recaptchaToken}`
      )
        .then(res => res.json())
        .then(spec => {
          this.status = "ok";
          vegaEmbed("#map", spec, {
            tooltip: {
              theme: "dark"
            }
          });
        })
        .catch(err => {
          this.serverError = getErrorMessage(err);
          this.status = "error";

          //helper to get a displayable message to the user
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
    onCaptchaExpired: function() {
      this.$refs.recaptcha.reset();
      this.status = "";
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
  margin-top: 10%;
  padding: 0;
}

#map {
  max-width: 100%;
}
</style>
