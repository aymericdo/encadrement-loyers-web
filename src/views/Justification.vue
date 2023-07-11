<template>
  <div id="justification">
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper v-if="isMounted">
        <div>
          <h2>Complément de loyer</h2>
          <h4>Bien que très limité, il est techniquement possible de dépasser l'encadrement des loyers de manière légale.</h4>
          <br>

          <p>
            La DRIHL a fait état de deux décisions du Tribunal judiciaire de Paris sur le complément de loyers :
          </p>
   
          <ul>
            <li>Tribunal judiciaire de Paris, <b>n° 11-20-004058 du 2 décembre 2020 et n° 11-20-010096 du 15 février 2021</b> : la location doit présenter une particularité telle que l'on pourrait considérer qu'elle se situe dans un cadre d'exception (vue remarquable) et/ou avec des équipements très spécifiques ou de grand standing la distinguant de tous les appartements de la même catégorie dans le même secteur</li>
            <li>Tribunal judiciaire de Paris, <b>RG n° 11-21-001291 du 7 mai 2021</b> :</li>
          </ul>

          <div class="indent">
            <p>Caractéristiques <b>pouvant être</b> determinantes afin de dépasser l'encadrement :</p>
            <ul>
              <li>une terrasse ou jardin</li>
              <li>une hauteur sous plafond de plus de 3,3 m</li>
              <li>une vue exceptionnelle sur un monument</li>
              <li>des équipements luxueux</li>
            </ul>
            <p>Caractéristiques <b>ne pouvant pas être</b> determinantes afin de dépasser l'encadrement :</p>
            <ul>
              <li>un balcon filant</li>
              <li>une exposition ensoleillée</li>
              <li>des travaux de rénovation voire de réfection</li>
              <li>une cuisine équipée</li>
              <li>la proximité des transports en commun</li>
            </ul>

          </div>
          <p><b>Ces décisions constituent un début de jurisprudence de première instance et il faudrait, pour les consolider, quelques décisions d'appel.</b></p>

          <br>
          <br>
  
          <p>Par ailleurs, selon la <b>loi du 16/08/2022</b> portant mesure d’urgence pour la protection du pouvoir d’achat, apporte des précisions via <b>son article 13 amendant l’article 140 de la loi Elan.</b></p>
          <p>L’article indique que le complément de loyer n’est pas applicable si le logement présente l’un des caractéristiques suivantes :</p>
          <ul>
            <li>des sanitaires sur le palier</li>
            <li>des signes d'humidité sur certains murs</li>
            <li>un niveau de performance énergétique de classe F ou de classe G au sens de l'article L. 173-1-1 du code de la construction et de l'habitation</li>
            <li>des fenêtres laissant anormalement passer l'air hors grille de ventilation</li>
            <li>un vis-à-vis à moins de dix mètres</li>
            <li>des infiltrations ou des inondations provenant de l'extérieur du logement</li>
            <li>des problèmes d'évacuation d'eau au cours des trois derniers mois</li>
            <li>une installation électrique dégradée</li>
            <li>une mauvaise exposition de la pièce principale</li>
          </ul>
          <p><b>Certains de ces critères nécessiteront probablement de la jurisprudence qui viendra préciser leur degré d’appréciation.</b></p>

          <br>

          <div><a href="https://immobilier.lefigaro.fr/article/la-loi-se-durcit-autour-de-l-encadrement-des-loyers_f53afd86-0c23-11ed-b3fc-252e8fc48bdd/">Article intéressant</a></div> 
        </div>
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
import FixedButton from "@/shared/FixedButton.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
export default {
  name: "Justification",
  components: {
    FixedButton,
    StrokeIcon,
    Page2Wrapper,
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
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
#justification {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;

  :deep(.center-wrapper) {
    align-items: flex-start;
    text-align: justify;
    box-sizing: border-box;
    padding: 124px;

    @media screen and (max-width: $mobileSize) {
      padding: 124px 1.25rem;
    }

    ul li {
      list-style: inherit;
    }
  }

  .indent {
    padding-left: 3rem;
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
}
</style>
