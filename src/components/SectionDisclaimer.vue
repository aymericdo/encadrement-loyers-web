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
      <router-link to="/justification">
        <span class="justification">En savoir plus</span>
      </router-link>
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

:deep(.section-title h3) {
  color: $darkeryellow;
}
</style>
