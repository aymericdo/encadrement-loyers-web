<template>
  <div class="section section-disclaimer">
    <SectionTitle class="left-part" :title="'Attention!'" />
    <div class="right-part">
      <p>Selon la mairie de Paris, il est possible de dépasser le prix de l'encadrement sous certaines conditions très strictes (garage, balcon, prestations extraordinaires, etc). Les annonces notées "illégales" ne le sont donc peut-être pas. (Ceci est un petit ajout pour ne pas choquer les âmes sensibles de nos chers propriétaires parisiens)</p>
    </div>
  </div>
</template>
<script>
import SectionTitle from "@/shared/SectionTitle";
export default {
  name: "SectionDisclaimer",
  components: {
    SectionTitle
  }
};
</script>