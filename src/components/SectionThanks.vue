<template>
  <Section>
    <div class="col">
      <SectionTitle class="title">
        Remerciements
      </SectionTitle>
      <div class="data-provider">
        <div class="image alda">
          <a
            href="https://www.alda.eus/"
            target="_blank"
          >
            <img
              src="@/assets/images/alda_logo.png"
              alt="Photo logo Alda"
            >
          </a>
          <span>Alda</span>
        </div>
        <div class="image cnhp">
          <a
            href="https://www.collectifcnhp.org/accueil"
            target="_blank"
          >
            <img
              src="@/assets/images/cnhp_logo.png"
              alt="Photo logo CNHP"
            >
          </a>
          <span>Le Collectif National des Habitants Permanents</span>
        </div>
        <div class="image">
          <a
            href="https://opendata.paris.fr/pages/home/"
            target="_blank"
          >
            <img
              src="@/assets/images/data-paris.png"
              alt="Photo de logo data paris"
            >
          </a>
          <span>Open Data Paris</span>
        </div>
        <div class="image">
          <a
            href="https://opendata.apur.org/"
            target="_blank"
          >
            <img
              src="@/assets/images/data-apur.png"
              alt="Photo logo Apur"
            >
          </a>
          <span>Open Data Apur</span>
        </div>
        <div class="image mel">
          <a
            href="https://opendata.lillemetropole.fr/pages/home/"
            target="_blank"
          >
            <img
              src="@/assets/images/mel-lille.png"
              alt="Photo logo MEL"
            >
          </a>
          <span>Open Data Lille</span>
        </div>
        <div class="image">
          <a
            href="https://data.grandlyon.com/"
            target="_blank"
          >
            <img
              src="@/assets/images/grand-lyon.jpeg"
              alt="Photo logo Grand Lyon"
            >
          </a>
          <span>Open Data Lyon</span>
        </div>
        <div class="image">
          <a
            href="https://www.observatoires-des-loyers.org/"
            target="_blank"
          >
            <img
              src="@/assets/images/observatoires-des-loyers.png"
              alt="Observatoires des loyers"
            >
          </a>
          <span>Observatoires des loyers</span>
        </div>
        <div class="image">
          <a
            href="https://www.fondationpourlelogement.fr/"
            target="_blank"
          >
            <img
              src="@/assets/images/logo-fpll.png"
              alt="Fondation pour le logement"
            >
          </a>
          <span>La Fondation pour le Logement des Défavorisés</span>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup>
import Section from "@/shared/SectionItem.vue";
import SectionTitle from "@/shared/SectionTitleItem.vue";
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;
.title {
  max-width: inherit;
}

.col {
  max-width: $mobileSize;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.data-provider {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.data-provider > .image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 2em 2em;
}

.data-provider img {
  width: 250px;
}

.data-provider > .image.mel img {
  width: 150px;
}

.data-provider > .image.alda img {
  background-color: white;
}

.data-provider {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
