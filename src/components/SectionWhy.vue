<template>
  <Section class="section-why">
    <SectionTitle>Pourquoi?</SectionTitle>
    <SectionRightPart>
      <p>Ceci a pour but d'informer, et d'avertir les potentiels futurs locataires que certains loyers parisiens ne respectent pas l'encadrement des loyers, en vigueur depuis le 01/07/2019.</p>
    </SectionRightPart>
  </Section>
</template>

<script>
import Section from "@/shared/Section";
import SectionTitle from "@/shared/SectionTitle";
import SectionRightPart from "@/shared/SectionRightPart";
export default {
  name: "SectionWhy",
  components: {
    Section,
    SectionRightPart,
    SectionTitle
  }
};
</script>

<style scoped>
</style>