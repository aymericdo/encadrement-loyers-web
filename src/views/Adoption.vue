<template>
  <div id="stats">
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper v-if="isMounted">
        <vue-recaptcha
          class="recaptcha"
          :show="status !== 'ok' && status !== 'submitting' ? 1 : 0"
          ref="recaptcha"
          size="normal" 
          theme="light"
          :tabindex="0"
          @verify="onCaptchaVerified"
          @expire="onCaptchaExpired"
          siteKey="6Le2wcEUAAAAACry2m3rkq5LHx9H0DmphXXU8BNw"
        />
        <half-circle-spinner
          :animation-duration="1000"
          color="#fdcd56"
          :size="120"
          v-if="status !== 'ok' && status === 'submitting'"
          class="spinner"
        />
        <Section class="stats-section">
          <SectionTitle v-if="isAdoptionLoaded" class="title">Adoption</SectionTitle>
          <div v-if="status === 'ok'" class="container" ref="adoptionContainer">
            <half-circle-spinner
              :animation-duration="1000"
              color="#fdcd56"
              :size="60"
              v-if="!isAdoptionLoaded"
              class="spinner"
            />
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
import { HalfCircleSpinner } from 'epic-spinners'
import vegaEmbed from "vega-embed";
import vueRecaptcha from 'vue3-recaptcha2';
import StrokeIcon from "@/icons/StrokeIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";
import SectionTitle from "@/shared/SectionTitle.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import Section from "@/shared/Section.vue";

export default {
  name: "Adoption",
  components: {
    HalfCircleSpinner,
    vueRecaptcha,
    SectionTitle,
    StrokeIcon,
    FixedButton,
    Page2Wrapper,
    Section
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
      fetch(`${this.$domain}stats/adoption?recaptchaToken=${recaptchaToken}`)
        .then(res => res.json())
        .then(spec => {
          this.status = "ok";
          this.isAdoptionLoaded = true;
          vegaEmbed("#adoption", spec, {
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

  &:last-child {
    margin-bottom: 20px;
  }
}
</style>