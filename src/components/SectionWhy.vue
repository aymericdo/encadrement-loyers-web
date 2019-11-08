<template>
  <div class="section section-why">
    <SectionTitle class="left-part" :title="'Pourquoi?'" />
    <div class="right-part">
      <p>Ceci a pour but d'informer, et d'avertir les potentiels futurs locataires que certains loyers parisiens ne respectent pas l'encadrement des loyers, en vigueur depuis le 01/07/2019.</p>
    </div>
  </div>
</template>

<script>
import SectionTitle from "@/shared/SectionTitle";
export default {
  name: "SectionWhy",
  components: {
    SectionTitle
  }
};
</script>

<style scoped>
</style>