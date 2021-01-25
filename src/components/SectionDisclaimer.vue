<template>
  <Section class="section-disclaimer">
    <SectionTitle>Attention !</SectionTitle>
    <SectionRightPart>
      <p>Selon la mairie de Paris, il est possible de dépasser le prix de l'encadrement sous certaines conditions très strictes (garage, balcon, prestations extraordinaires, etc). Les annonces notées illégales ne le sont donc peut-être pas. (Ceci est un petit ajout pour ne pas choquer les âmes sensibles de nos chers propriétaires parisiens)</p>
    </SectionRightPart>
  </Section>
</template>
<script>
import SectionRightPart from "@/shared/SectionRightPart";
import SectionTitle from "@/shared/SectionTitle";
import Section from "@/shared/Section";
export default {
  name: "SectionDisclaimer",
  components: {
    SectionRightPart,
    SectionTitle,
    Section
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

/deep/ .section-title h3 {
    color: $darkeryellow;
}
</style>
