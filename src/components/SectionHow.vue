<template>
  <div class="section section-how">
    <SectionTitle class="left-part" :title="'Comment?'" />
    <div class="right-part">
      <h4>L’extension vous donne automatiquement le prix le plus haut que vous devriez payer.</h4>
      <p>Selon les critères trouvés sur la page du logement.</p>
      <Carousel />
      <h4>Accédez à plus d'informations.</h4>
      <p>En cliquant sur la petite icône de l'extension, à droite de la barre d'URL.</p>
    </div>
  </div>
</template>

<script>
import SectionTitle from "@/shared/SectionTitle";
import Carousel from "./Carousel";

export default {
  name: "SectionHow",
  components: {
    Carousel,
    SectionTitle
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.right-part h4 {
  margin: 0;
  margin-bottom: 8px;
  color: $yellow;
  line-height: 34px;
  letter-spacing: -0.22px;
  font-weight: 500;
}
</style>