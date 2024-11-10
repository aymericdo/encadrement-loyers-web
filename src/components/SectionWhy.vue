<template>
  <Section class="section-why">
    <SectionTitle>Pourquoi ?</SectionTitle>
    <SectionRightPart>
      <p>
        L'extension a pour but d'informer, et d'avertir les futurs locataires
        que certains loyers ne respectent pas l'encadrement des loyers, en
        vigueur depuis le 01/07/2019.
      </p>
    </SectionRightPart>
  </Section>
</template>

<script>
import Section from "@/shared/Section.vue";
import SectionRightPart from "@/shared/SectionRightPart.vue";
import SectionTitle from "@/shared/SectionTitle.vue";
export default {
  name: "SectionWhy",
  components: {
    Section,
    SectionRightPart,
    SectionTitle,
  },
};
</script>

<style scoped></style>
