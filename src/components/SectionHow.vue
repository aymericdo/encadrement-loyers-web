<template>
  <div class="section sectionHow">
    <div class="sectionTitle leftPart">
      <h3>Comment?</h3>
    </div>
    <div class="rightPart">
      <h4>L’extension vous donne automatiquement le prix le plus haut que vous devriez payer.</h4>
      <p>Selon les critères trouvés sur la page du logement.</p>
      <Carousel />
      <h4>Accédez à plus d'informations.</h4>
      <p>En cliquant sur la petite icône de l'extension, à droite de la barre d'URL.</p>
    </div>
  </div>
</template>

<script>
import Carousel from './Carousel';

export default {
  name: "sectionHow",
  components: {
    Carousel
  }
}
</script>

<style>
.rightPart h4{
  margin-bottom: 8px;
  color: #CFCFCF;
  line-height: 34px;
  letter-spacing: -0.22px;
  font-weight: 500;
}

</style>