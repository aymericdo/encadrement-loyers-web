<template>
  <div class="section section-how">
    <div class="section-title left-part">
      <h3>Comment?</h3>
    </div>
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
import Carousel from "./Carousel";

export default {
  name: "sectionHow",
  components: {
    Carousel
  }
};
</script>

<style scoped>
.right-part h4 {
  margin: 0;
  margin-bottom: 8px;
  color: #fdcd56;
  line-height: 34px;
  letter-spacing: -0.22px;
  font-weight: 500;
}
</style>