<template>
  <Section class="section-how">
    <SectionTitle>Comment?</SectionTitle>
    <SectionRightPart>
      <h4>L’extension vous donne automatiquement le prix le plus haut que vous devriez payer.</h4>
      <p>Selon les critères trouvés sur la page du logement.</p>
      <Carousel />
      <h4>Accédez à plus d'informations.</h4>
      <p>En cliquant sur la petite icône de l'extension, à droite de la barre d'URL.</p>
    </SectionRightPart>
  </Section>
</template>

<script>
import Section from "@/shared/Section";
import SectionTitle from "@/shared/SectionTitle";
import SectionRightPart from "@/shared/SectionRightPart";
import Carousel from "./Carousel";

export default {
  name: "SectionHow",
  components: {
    Carousel,
    Section,
    SectionRightPart,
    SectionTitle
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

h4 {
  margin: 0;
  margin-bottom: 8px;
  color: $yellow;
  line-height: 34px;
  letter-spacing: -0.22px;
  font-weight: 500;
}
</style>