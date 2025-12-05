<template>
  <Page2Wrapper :is-mounted="isMounted">
    <div class="prose w-full max-w-3xl mx-auto p-4">
      <h2 class="text-4xl font-bold my-8">
        Complément de loyer
      </h2>
      <h4>Bien que très limité, il est techniquement possible de dépasser l'encadrement des loyers de manière légale.</h4>
      <br>

      <p>
        La DRIHL a fait état de trois décisions du Tribunal judiciaire de Paris sur le complément de loyers :
      </p>

      <ul>
        <li>Tribunal judiciaire de Paris, <b>n°11-20-004058 du 2 décembre 2020 et n°11-20-010096 du 15 février 2021</b> : la location doit présenter une particularité telle que l'on pourrait considérer qu'elle se situe dans un cadre d'exception (vue remarquable) et/ou avec des équipements très spécifiques ou de grand standing la distinguant de tous les appartements de la même catégorie dans le même secteur</li>
        <li>Tribunal judiciaire de Paris, <b>RG n°11-21-001291 du 7 mai 2021</b> :</li>
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
      <ul>
        <li>
          <a
            class="text-[#fdcd56]"
            href="https://jurislogement.org/la-justification-obligatoire-des-complements-de-loyer/"
            target="_blank"
          >Tribunal judiciaire de Paris, <b>Jugement du 6 juin 2024, n° 24/02431</b> :</a> les éléments tels que cuisine aménagée, double vitrage, parquet ou cave, ne caractérisent pas un confort exceptionnel en comparaison avec des logements similaire en location dans le secteur. Aussi la vue dégagée sur un boulevard présente un avantage au regard de logements situés sur cour, mais n’a aucun caractère exceptionnel au sens de l’article 140 de la loi du 23 novembre 2018.
        </li>
      </ul>
      <p><b>Ces décisions constituent un début de jurisprudence de première instance et il faudrait, pour les consolider, quelques décisions d'appel.</b></p>

      <br>
      <br>

      <p>Par ailleurs, selon la <b>loi n°2022-1158 du 16 août 2022</b> portant mesure d’urgence pour la protection du pouvoir d’achat, apporte des précisions via <b>son article 13 amendant l’article 140 de la loi Elan.</b></p>
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
      <p>
        <span>Source : </span>
        <a
          class="text-[#fdcd56]"
          href="https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000046186753#:~:text=Article%2013%20%2D%20LOI%20n%C2%B0,'achat%20(1)%20%2D%20L%C3%A9gifrance"
          target="_blank"
        >legifrance.gouv.fr</a>
      </p>
      <p><b>Certains de ces critères nécessiteront probablement de la jurisprudence qui viendra préciser leur degré d’appréciation.</b></p>

      <br>
      <br>

      <div>
        <a
          class="text-[#fdcd56]"
          href="https://immobilier.lefigaro.fr/article/la-loi-se-durcit-autour-de-l-encadrement-des-loyers_f53afd86-0c23-11ed-b3fc-252e8fc48bdd/"
          target="_blank"
        >Article intéressant</a>
      </div> 
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
  import FixedButton from "@/shared/FixedButton.vue";
  import Page2Wrapper from "@/shared/Page2Wrapper.vue";
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

.indent {
  padding-left: 3rem;
}
</style>
