<template>
  <div id="learn-more">	
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper v-if="isMounted">
        <p>
          Nous calculons <b>le montant maximum du loyer</b> en fonction des éléments ci-dessous tirés de l'annonce :
        </p>
        <ul>
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
      </Page2Wrapper>
    </transition>
    <div @click="isMounted = false">
      <FixedButton>
        <StrokeIcon :width="'18px'" :height="'18px'" />
      </FixedButton>
    </div>	
  </div>	
</template>	

<script setup>
  import StrokeIcon from "@/icons/StrokeIcon.vue";	
  import Page2Wrapper from "@/shared/Page2Wrapper.vue";	
  import FixedButton from "@/shared/FixedButton.vue";
  import { onMounted, ref } from "vue";

  import { useRouter } from "vue-router";

  const router = useRouter()

  const isMounted = ref(false);

  onMounted(() => {
    isMounted.value = true;
  })

  const leave = () => {
    setTimeout(() => {
      router.push({ path: "/" });
    }, 400);
  }
</script>	

<style lang="scss" scoped>	
@use "@/assets/scss/variables.scss" as *;

#learn-more {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

:deep(.center-wrapper) {
  align-items: flex-start;
  box-sizing: border-box;
  padding: 124px;

  @media screen and (max-width: $mobileSize) {
    padding: 124px 1.25rem;
  }

  ul li {
    list-style: inherit;
  }
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all ease 400ms;
}
</style>
