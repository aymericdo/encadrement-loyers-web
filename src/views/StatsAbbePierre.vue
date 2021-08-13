<template>
  <div id="stats">
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper v-if="isMounted">
        <SectionTitle class="title"
          >Stats pour la fondation Abbé Pierre (sur les {{ nbMonths }} derniers
          mois)</SectionTitle
        >
        <div v-if="status !== 'ok'" class="entire-page-centered">
          <GoogleRecaptcha
            class="recaptcha"
            v-if="status !== 'submitting'"
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
            v-if="status === 'submitting'"
            class="spinner"
          />
        </div>
        <div class="graph-list" v-if="status === 'ok'">
          <Section class="stats-section -large">
            <Graph
              :id="'is-legal-per-website'"
              :city="city"
              :date="datesValues"
              @errorOutput="getErrorMessage($event)"
            ></Graph>
          </Section>
          <Section class="stats-section -large">
            <Graph
              :id="'is-legal-per-renter'"
              :city="city"
              :date="datesValues"
              @errorOutput="getErrorMessage($event)"
            ></Graph>
          </Section>
          <Section class="stats-section -large">
            <Graph
              :id="'is-legal-per-classic-renter'"
              :city="city"
              :date="datesValues"
              @errorOutput="getErrorMessage($event)"
            ></Graph>
          </Section>
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
import { HalfCircleSpinner } from "epic-spinners";
import SectionTitle from "@/shared/SectionTitle.vue";
import GoogleRecaptcha from "@/shared/GoogleRecaptcha.vue";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import Section from "@/shared/Section.vue";
import Graph from "@/shared/Graph.vue";
import { domain } from "@/helper/config";

export default {
  name: "StatsAbbePierre",
  components: {
    HalfCircleSpinner,
    StrokeIcon,
    SectionTitle,
    FixedButton,
    GoogleRecaptcha,
    Page2Wrapper,
    Graph,
    Section,
  },
  mounted: function() {
    this.isMounted = true;
    this.needCaptcha();
  },
  beforeUnmount: function() {
    this.controller.abort();
  },
  data() {
    const nbMonths = 3;
    const today = new Date();
    const realEndDate = new Date();
    const realStartDate = new Date(
      realEndDate.setMonth(realEndDate.getMonth() - nbMonths)
    );

    const currDate1 = realStartDate.getDate();
    const currMonth1 = realStartDate.getMonth() + 1; // Months are zero based
    const currYear1 = realStartDate.getFullYear();

    const currDate2 = today.getDate();
    const currMonth2 = today.getMonth() + 1; // Months are zero based
    const currYear2 = today.getFullYear();

    return {
      controller: new AbortController(),
      isLegalVariationLoaded: false,
      isPriceVariationLoaded: false,
      isLegalPerRenterLoaded: false,
      isMounted: false,
      city: "all",
      sucessfulServerResponse: "",
      serverError: "",
      status: "",
      welcomeData: null,
      nbMonths,
      datesValues: `${currYear1}-${currMonth1}-${currDate1},${currYear2}-${currMonth2}-${currDate2}`,
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

      if (err.message === "token expired") {
        this.status = "";
        this.welcomeData = null;
      }

      return responseBody.message || JSON.stringify(responseBody);
    },
    needCaptcha: function() {
      this.status = "submitting";
      fetch(`${domain}stats/need-captcha`, {
        signal: this.controller.signal,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "token expired") {
            throw res;
          } else {
            return res;
          }
        })
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
      fetch(`${domain}stats/welcome?recaptchaToken=${recaptchaToken}`, {
        signal: this.controller.signal,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "token expired") {
            throw res;
          } else {
            return res;
          }
        })
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

.entire-page-centered {
  height: 100vh;
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
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

.graph {
  max-width: 100%;
  max-height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
}

:deep(.title) {
  max-width: 100%;
  width: 700px;

  & > h3 {
    margin-top: 42px;
    margin-bottom: 8px;
  }
}

.graph-list {
  width: 100%;
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
  position: relative;
  flex-direction: column;
  align-items: center;
  width: calc(50% - 10px);
  height: 500px;
  margin-right: 20px;
  margin-bottom: 20px;

  &:first-of-type {
    margin-top: 60px;
  }

  &:last-of-type {
    margin-bottom: 60px;
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
