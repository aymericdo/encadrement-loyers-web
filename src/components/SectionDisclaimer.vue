<template>
  <Section class="section-disclaimer">
    <SectionTitle>Attention !</SectionTitle>
    <SectionRightPart>
      <p>
        Selon la loi ELAN, il est possible de dépasser le prix de l'encadrement
        sous certaines conditions très strictes (garage, balcon, prestations
        extraordinaires, etc). Les annonces notées non conformes ne le sont donc
        peut-être pas.
      </p>
      <p><router-link to="/justification">En savoir plus</router-link></p>
    </SectionRightPart>
  </Section>
</template>
<script setup>
import Section from "@/shared/Section.vue";
import SectionRightPart from "@/shared/SectionRightPart.vue";
import SectionTitle from "@/shared/SectionTitle.vue";
</script>
<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

:deep(.section-title h3) {
  color: $darkeryellow;
}
</style>
