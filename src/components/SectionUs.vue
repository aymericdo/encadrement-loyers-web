<template>
  <Section class="section-us">
    <SectionTitle>Qui sommes nous ?</SectionTitle>
    <SectionRightPart>
      <p>
        Face aux abus des loyers, nous sommes des bénévoles mobilisés pour offrir un outil gratuit et accessible à tous les locataires.
      </p>
      <div class="nosgrossesteutés mt-10">
        <div>
          <a
            href="https://www.linkedin.com/in/aymeric-dominique/"
            target="_blank"
          >
            <img
              src="@/assets/images/aymeric.jpeg"
              alt="Photo de Aymeric Dominique"
            >
          </a>
          <span
            class="text-sm mt-4"
          >
            Développeur
          </span>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/thomas-d-legrand/"
            target="_blank"
          >
            <img
              src="@/assets/images/thomas.jpeg"
              alt="Photo de Thomas Legrand"
            >
          </a>
          <span
            class="text-sm mt-4"
          >
            Développeur
          </span>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/lucienlandanger/"
            target="_blank"
          >
            <img
              src="@/assets/images/lucien.jpeg"
              alt="Photo de Lucien Landanger"
            >
          </a>
          <span
            class="text-sm mt-4"
          >
            Designer
          </span>
        </div>
      </div>
    </SectionRightPart>
  </Section>
</template>

<script setup>
import Section from "@/shared/SectionItem.vue";
import SectionRightPart from "@/shared/SectionRightPartItem.vue";
import SectionTitle from "@/shared/SectionTitleItem.vue";
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

.nosgrossesteutés {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.nosgrossesteutés > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2em 2em;
}

.nosgrossesteutés img {
  width: 75px;
  height: 75px;
  border-radius: 50%;
}
</style>
