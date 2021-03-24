<template>
  <div id="learn-more">	
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper v-if="isMounted">
        <p>
          Nous calculons le prix maximum du loyer en fonction de ces éléments tirés de l'annonce :
        </p>
        <ul>
          <li>Nombre de pièce(s)</li>
          <li>Meublé ou non</li>
          <li>Année de construction</li>
          <li>Quartier</li>
          <li>Surface</li>
        </ul>
        <br>
        <p>
          Pour obtenir l'adresse, nous utilisons les données présentes dans l'annonce pour
          déterminer si possible l'adresse exacte (numéro + nom de rue). Sinon, nous 
          cherchons l'estimation la plus précise possible (code postal, stations de métro, quartier).
          L'année de construction, si elle n'est pas précisée dans l'annonce, peut être estimée 
          si nous avons l'adresse exacte.
        </p>
        <br>
        <p>
          Dans tous les cas, toutes nos estimations sont calculées en arrondissant au plus haut, de façon à fournir les chiffres les plus justes possibles.
        </p>
        <br>
        <p>
          Exemple : Si nous n'avons que le code postal, alors nous basons notre calcul sur
          le quartier le plus cher de l'arrondissement.
          De cette façon, nos estimations de loyers peuvent être revues, toujours à la baisse,
          une fois en possession de l'adresse précise du logement.
        </p>
      </Page2Wrapper>
    </transition>
    <div @click="unmount">
      <FixedButton>
        <StrokeIcon :width="'20px'" :height="'20px'" />
      </FixedButton>
    </div>	
  </div>	
</template>	

<script>	
import StrokeIcon from "@/icons/StrokeIcon.vue";	
import Page2Wrapper from "@/shared/Page2Wrapper.vue";	
import FixedButton from "@/shared/FixedButton.vue";	
export default {	
  name: "LearnMore",	
  components: {	
    FixedButton,	
    Page2Wrapper,
    StrokeIcon,
  },
  mounted: function() {
    this.isMounted = true;
  },
  data() {
    return {
      isMounted: false,
    };
  },
  methods: {
    leave: function() {
      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 400);
    },
    unmount: function() {
      this.isMounted = false;
    }
  }
};	
</script>	

<style lang="scss" scoped>	
@import "@/assets/scss/variables.scss";

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

/deep/ .center-wrapper {
  align-items: flex-start;
  text-align: justify;
  box-sizing: border-box;
  padding: 124px;

  @media screen and (max-width: $mobileSize) {
    padding: 124px 16px;
  }

  ul li {
    list-style: inherit;
  }
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all ease 400ms;
}
</style>
