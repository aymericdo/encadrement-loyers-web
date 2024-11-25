<template>
  <Page2Wrapper :isMounted="isMounted">
    <div class="p-2 md:p-8">
      <p>
        Nous calculons <b>le montant maximum du loyer</b> en fonction des éléments ci-dessous tirés de l'annonce :
      </p>
      <ul class="p-6">
        <li>Adresse</li>
        <li>Nombre de pièce(s)</li>
        <li>Meublé ou non</li>
        <li>Année de construction</li>
        <li>Surface</li>
      </ul>
      <br>
      <h4>Adresse</h4>
      <p>
        Pour obtenir <b>l'adresse</b>, nous utilisons les données présentes dans l'annonce pour
        déterminer <b>si possible l'adresse exacte</b> (numéro + nom de rue).
      </p>
      <p>
        Si ce n'est pas possible, nous faisons l'estimation la plus précise possible (code postal, stations de métro, quartier).
      </p>
      <h4>Année de construction</h4>
      <p>
        L'année de construction, si elle n'est pas précisée dans l'annonce, peut être determinée 
        si nous avons l'adresse exacte.
      </p>
      <br>
      <h4>Méthodologie</h4>
      <p>
        Dans tous les cas, toutes nos estimations sont calculées en <b>arrondissant au plus haut</b>, de façon à fournir les chiffres les plus justes possibles.
      </p>
      <p>
        (Toujours à l'avantage du bailleur donc.)
      </p>
      <p>
        Si nous avons que le code postal, alors nous basons notre calcul sur
        le quartier <b>le plus cher de l'arrondissement.</b>
        De cette façon, nos estimations de loyers peuvent être revues, <b>toujours à la baisse</b>,
        une fois en possession de l'adresse précise du logement.
      </p>
    </div>
    <div @click="isMounted = false">
      <FixedButton>
        <StrokeIcon :width="'18px'" :height="'18px'" />
      </FixedButton>
    </div>
  </Page2Wrapper>
</template>	

<script setup>
  import StrokeIcon from "@/icons/StrokeIcon.vue";	
  import Page2Wrapper from "@/shared/Page2Wrapper.vue";	
  import FixedButton from "@/shared/FixedButton.vue";
  import { onMounted, ref } from "vue";

  const isMounted = ref(false);

  onMounted(() => {
    isMounted.value = true;
  })
</script>	

<style lang="scss" scoped>	
@use "@/assets/scss/variables.scss" as *;

h4 {
  font-weight: bold;
}

ul li {
  list-style: initial;
}

ul {
  padding: inherit;
}
</style>
