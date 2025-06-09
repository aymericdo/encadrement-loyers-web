<template>
  <Page2Wrapper :is-mounted="isMounted">
    <div class="prose w-full max-w-3xl mx-auto p-4">
      <h2 class="text-4xl font-bold my-8">
        Méthodologie
      </h2>

      <p>
        Nous estimons le loyer maximal autorisé en nous basant sur plusieurs informations extraites de l’annonce :
      </p>

      <ul class="list-disc list-inside mb-4">
        <li>Adresse</li>
        <li>Nombre de pièces</li>
        <li>Meublé ou non</li>
        <li>Année de construction</li>
        <li>Surface</li>
      </ul>

      <h3 class="text-xl font-semibold mt-6 mb-2">Adresse</h3>
      <p>
        Lorsque l’adresse complète est disponible (numéro et nom de rue), nous l’utilisons pour affiner l’estimation.
        <br>
        Si ce n’est pas le cas, nous faisons l’estimation la plus précise possible à partir des éléments disponibles : 
        code postal, stations de métro proches ou nom du quartier.
      </p>

      <h3 class="text-xl font-semibold mt-6 mb-2">Année de construction</h3>
      <p>
        Si l’année de construction n’est pas indiquée dans l’annonce, elle peut être retrouvée si l’adresse complète du logement est connue.
      </p>

      <Carousel />

      <h3 class="text-xl font-semibold mt-6 mb-2">Principe général</h3>
      <p>
        Nos estimations sont toujours arrondies à la hausse, afin de fournir une fourchette maximale réaliste.
        <br>
        Cela garantit une estimation juste, mais toujours en faveur du bailleur.
      </p>

      <p>
        Lorsqu’une annonce ne fournit que le code postal, nous nous basons sur le quartier le plus cher de l’arrondissement
        pour effectuer le calcul. L’estimation pourra ensuite être revue à la baisse dès que l’adresse exacte est connue.
      </p>

      <h3 class="text-xl font-semibold mt-6 mb-2">Conclusion</h3>
      <img
        src="@/assets/images/infographie_encadrement.png"
        alt="Infographie sur le fonctionnement de l'extension"
      >
    </div>

    <div @click="isMounted = false">
      <FixedButton>
        <StrokeIcon
          :width="'18px'"
          :height="'18px'"
        />
      </FixedButton>
    </div>
  </Page2Wrapper>
</template>	

<script setup>
  import StrokeIcon from "@/icons/StrokeIcon.vue";	
  import Page2Wrapper from "@/shared/Page2Wrapper.vue";
  import Carousel from "@/components/CarouselItem.vue";
  import FixedButton from "@/shared/FixedButton.vue";
  import { onMounted, ref } from "vue";

  const isMounted = ref(false);

  onMounted(() => {
    isMounted.value = true;
  })
</script>	

<style lang="scss" scoped>	
ul li {
  list-style: initial;
}

ul {
  padding: inherit;
}
</style>
