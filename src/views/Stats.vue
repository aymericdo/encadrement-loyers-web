<template>
  <div id="stats">
    <router-link to="/">
      <button class="home">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
          <path
            fill="#050505"
            fill-rule="evenodd"
            d="M9.756 1.364a.784.784 0 0 0 0-1.137.868.868 0 0 0-1.169-.001L5 3.682 1.413.227A.868.868 0 0 0 .243.226a.786.786 0 0 0 0 1.137l3.582 3.45L.244 8.265a.784.784 0 0 0 0 1.137c.156.15.363.234.583.234.223 0 .43-.083.586-.234L5 5.945l3.587 3.456c.156.15.363.234.582.234a.836.836 0 0 0 .586-.233.782.782 0 0 0 0-1.138l-3.58-3.45 3.58-3.45z"
          />
        </svg>
      </button>
    </router-link>
    <ClipLoader :loading="status === 'submitting'" :color="'#fdcd56'"></ClipLoader>
    <VueRecaptcha
      v-if="status !== 'ok' && status !== 'submitting'"
      ref="recaptcha"
      @verify="onCaptchaVerified"
      @expired="onCaptchaExpired"
      sitekey="6Le2wcEUAAAAACry2m3rkq5LHx9H0DmphXXU8BNw"
    />
    <div id="map"></div>
  </div>
</template>

<script>
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
import VueRecaptcha from "vue-recaptcha";
import vegaEmbed from "vega-embed";

export default {
  name: "Stats",
  components: {
    VueRecaptcha,
    ClipLoader
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
  max-width: 856px;
  margin-top: 10%;
  padding: 0;
}

.home {
  position: fixed;
  display: flex;
  justify-content: center;
  background-color: $yellow;
  font-weight: 600;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-color: transparent;
  cursor: pointer;
  z-index: 1;

  & > svg {
    display: flex;
    align-self: center;
    width: 16px;
    height: 16px;
  }
}

#map {
  max-width: 100%;
}
</style>
