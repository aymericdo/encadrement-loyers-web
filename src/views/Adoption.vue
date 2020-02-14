<template>
  <div id="stats">
    <transition name="slide-fade" v-on:leave="leave">
      <div v-if="isMounted" class="center-wrapper">
        <Spinner class="spinner" v-if="isLoading" />
        <Section class="stats-section">
          <SectionTitle v-if="isAdoptionLoaded" class="title">Adoption</SectionTitle>
          <div v-if="status === 'ok'" class="container" ref="mapContainer">
            <Spinner v-if="!isAdoptionLoaded" class="spinner" />
            <div v-if="isAdoptionLoaded" id="adoption"></div>
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
import vegaEmbed from "vega-embed";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";
import SectionTitle from "@/shared/SectionTitle.vue";
import Section from "@/shared/Section.vue";

export default {
  name: "Adoption",
  components: {
    Spinner,
    SectionTitle,
    StrokeIcon,
    FixedButton,
    Section
  },
  mounted: function() {
    this.onFetchAdoption();
    this.isMounted = true;
  },
  data() {
    return {
      isAdoptionLoaded: false,
      isMounted: false,
      isLoading: true,
      sucessfulServerResponse: "",
      serverError: ""
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
    onFetchAdoption: function() {
      fetch(`${this.$domain}stats/adoption`)
        .then(res => res.json())
        .then(spec => {
          this.status = "ok";
          this.isAdoptionLoaded = true;
          this.isLoading = false;
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

#adoption {
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
  margin-top: 0;

  &:last-child {
    margin-bottom: 20px;
  }
}
</style>