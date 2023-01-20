<template>
  <div id="stats">
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper v-if="isMounted">
        <GoogleRecaptcha
          class="recaptcha"
          v-if="status !== 'ok' && status !== 'submitting'"
          ref="recaptcha"
          size="normal"
          theme="light"
          :tabindex="0"
          @verify="onCaptchaVerified"
          @expire="onCaptchaExpired"
          siteKey="6Le2wcEUAAAAACry2m3rkq5LHx9H0DmphXXU8BNw"
        />
        <bounce-loader class="spinner" :loading="status !== 'ok' && status === 'submitting'" color="#fdcd56" :size="'120px'"></bounce-loader>
        <Section class="stats-section">
          <div v-if="status === 'ok'" class="container" ref="adoptionContainer">
            <bounce-loader class="spinner" :loading="!isAdoptionLoaded" color="#fdcd56" :size="'60px'"></bounce-loader>
            <div v-if="isAdoptionLoaded" id="adoption"></div>
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
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
import vegaEmbed from "vega-embed";
import GoogleRecaptcha from "@/shared/GoogleRecaptcha.vue";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import Section from "@/shared/Section.vue";
import { domain } from "@/helper/config";

export default {
  name: "Adoption",
  components: {
    BounceLoader,
    GoogleRecaptcha,
    StrokeIcon,
    FixedButton,
    Page2Wrapper,
    Section,
  },
  mounted: function() {
    this.isMounted = true;
  },
  data() {
    return {
      isAdoptionLoaded: false,
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
    onFetchAdoption: function(recaptchaToken) {
      fetch(`${domain}stats/adoption?recaptchaToken=${recaptchaToken}`)
        .then((res) => res.json())
        .then((spec) => {
          this.status = "ok";
          this.isAdoptionLoaded = true;
          vegaEmbed("#adoption", spec, {
            tooltip: {
              theme: "dark",
            },
            actions: false,
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
      this.onFetchAdoption(recaptchaToken);
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

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all ease 400ms;
}

#adoption {
  max-width: 100%;
  max-height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
}

:deep(.title) {
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
  align-items: center;
  margin-top: 0;
  flex: 1;
  justify-content: center;

  &:last-child {
    margin-bottom: 20px;
  }
}
</style>
