<template>
  <Page2Wrapper :is-mounted="isMounted">
    <SectionTitle class="mx-auto title">
      Observatoire de l'encadrement des loyers à
      {{ city.charAt(0).toUpperCase() + city.slice(1) }}
    </SectionTitle>
    <div class="graph-list">
      <div class="row -paragraph">
        <p>
          Pour le premier baromètre de l’Observatoire de l’Encadrement des
          Loyers à Paris, la Fondation pour le Logement nous a contactés pour leur
          fournir les données que nous avons collectées.
        </p>
        <p>
          Ce fut avec plaisir que nous leur avons partagé nos informations,
          ainsi que les graphiques que nous pouvons vous présenter ci-dessous.
        </p>
        <p>
          En complément,
          <router-link to="/stats">
            cette page
          </router-link> résume plus
          globalement l'état de l'encadrement sur plusieurs des villes où il est
          en application.
        </p>
      </div>

      <div class="row">
        <a
          target="_blank"
          href="https://www.fondationpourlelogement.fr/nos-publications/communiques-de-presse/4eme-barometre-de-lencadrement-des-loyers"
        >L'Observatoire 2024</a>
      </div>

      <div class="row slider-section">
        <Slider
          v-model="monthValue"
          class="slider"
          :min="1"
          :max="3"
          :format="monthFormatValueFct"
        />
      </div>

      <div class="row">
        <span>sur les {{ monthsNb }} derniers mois</span>
      </div>

      <Section class="stats-section -large -first">
        <Graph
          :id="'is-legal-per-website'"
          :city="city"
          :date="datesValues"
          @error-output="getErrorMessage($event)"
        />
      </Section>
      <Section class="stats-section -large">
        <Graph
          :id="'is-legal-per-renter'"
          :city="city"
          :date="datesValues"
          @error-output="getErrorMessage($event)"
        />
      </Section>
      <Section class="stats-section -large">
        <Graph
          :id="'is-legal-per-classic-renter'"
          :city="city"
          :date="datesValues"
          @error-output="getErrorMessage($event)"
        />
      </Section>
    </div>
    <div @click="isMounted = false">
      <FixedButton>
        <StrokeIcon
          :width="'18px'"
          :height="'18px'"
        />
      </FixedButton>
    </div>
  </Page2Wrapper>
</template>

<script setup>
import { ref, watchEffect, onBeforeUnmount, onMounted } from "vue";
import SectionTitle from "@/shared/SectionTitleItem.vue";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import FixedButton from "@/shared/FixedButton.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import Section from "@/shared/SectionItem.vue";
import Graph from "@/shared/GraphItem.vue";
import { domain } from "@/helper/config";
import Slider from "@vueform/slider";

import { useRouter } from "vue-router";

import "@vueform/slider/themes/default.css";

const monthValue = ref(2);
const isMounted = ref(false);
const city = ref("paris");
const serverError = ref("");
const welcomeData = ref(null);

const controller = new AbortController();

onMounted(() => {
  isMounted.value = true;
});

onBeforeUnmount(() => {
  controller.abort();
});

// helper to get a displayable message to the user
const getErrorMessage = (err) => {
  let responseBody;
  responseBody = err.response;
  if (!responseBody) {
    responseBody = err;
  } else {
    responseBody = err.response.data || responseBody;
  }

  if (err.message === "token expired") {
    welcomeData.value = null;
  }

  return responseBody.message || JSON.stringify(responseBody);
};

const getMonthNbValue = (value) => {
  switch (value) {
    case 1:
      return 3;
    case 2:
      return 6;
    case 3:
      return 12;
  }
};

const monthFormatValueFct = (monthsNb) => {
  return `${getMonthNbValue(monthsNb)} mois`;
};

function formatDate(monthValue) {
  const today = new Date();
  const realEndDate = new Date();
  const realStartDate = new Date(
    realEndDate.setMonth(realEndDate.getMonth() - monthValue)
  );

  const currDate1 = realStartDate.getDate();
  const currMonth1 = realStartDate.getMonth() + 1; // Months are zero based
  const currYear1 = realStartDate.getFullYear();

  const currDate2 = today.getDate();
  const currMonth2 = today.getMonth() + 1; // Months are zero based
  const currYear2 = today.getFullYear();

  return `${currYear1}-${currMonth1}-${currDate1},${currYear2}-${currMonth2}-${currDate2}`;
}

const monthsNb = ref(getMonthNbValue(monthValue.value));
const monthFormatValue = ref(monthFormatValueFct(monthsNb.value));
const datesValues = ref(formatDate(monthsNb.value));

watchEffect(
  () => {
    if (monthValue.value) {
      monthsNb.value = getMonthNbValue(monthValue.value);
      monthFormatValue.value = monthFormatValueFct(monthsNb.value);
      datesValues.value = formatDate(monthsNb.value);
    }
  },
  {
    flush: "post",
  }
);
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

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

.graph-list > .row {
  display: flex;
  justify-content: center;
}

.graph-list > .row > .slider {
  width: 300px;
  max-width: 100%;
  margin-top: 36px;
}

.graph-list > .row :deep(.slider-target .slider-connect) {
  background: $yellow;
}

.graph-list > .row :deep(.slider-target .slider-tooltip) {
  background: $deepblack;
  border-color: $yellow;
  line-height: 16px;
}

.entire-page-centered {
  height: 100vh;
  display: flex;
  justify-content: center;
  flex: 1;
  width: 100%;
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

.section.stats-section.-large.-first {
  margin-top: 1rem;
}

.row.-paragraph {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  align-items: center;

  > p {
    width: 50%;
  }
}

.slider-section {
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
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

  .row.-paragraph {
    > p {
      width: 100%;
    }
  }
}
</style>
