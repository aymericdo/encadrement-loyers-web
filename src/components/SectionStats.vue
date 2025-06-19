<template>
  <Section>
    <SectionTitle class="title">
      Statistiques
    </SectionTitle>
    <SectionRightPart>
      <div
        class="flex flex-col items-center chart-section"
      >
        <div class="stats-section w-full">
          <FranceGraph
            :id="'map'"
            @error-output="getErrorMessage($event)"
          />
        </div>
      </div>
    </SectionRightPart>
  </Section>
</template>
<script setup>
  import Section from "@/shared/SectionItem.vue";
  import SectionTitle from "@/shared/SectionTitleItem.vue";
  import SectionRightPart from "@/shared/SectionRightPartItem.vue";
  import FranceGraph from "@/shared/FranceGraph.vue";

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
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

.title {
  max-width: inherit;
}

.chart-section {
  width: 600px;
  max-width: 100%;
}

.stats-section {
  position: relative;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  height: 500px;
  display: flex;
  > * {
    flex: 1;

    :deep(.graph) {
      cursor: pointer !important;
    }
  }
}
</style>