<template>
  <Section class="section-how">
    <SectionTitle>Comment ?</SectionTitle>
    <SectionRightPart>
      <h4>
        L’extension vous donne automatiquement le prix maximum estimé que vous
        devriez payer
      </h4>
      <p>Selon les critères trouvés sur l'annonce.</p>
      <Carousel />
      <h4>Accédez aux détails du calcul</h4>
      <p>
        En cliquant sur la petite icône de l'extension, à droite de la barre
        d'URL.
      </p>
      <div class="infographic">
        <img
          src="@/assets/images/infographie_encadrement.png"
          alt="Infographie sur le fonctionnement de l'extension"
        />
        <router-link to="/learn-more">
          <span class="learn-more">Plus d'info</span>
        </router-link>
      </div>
    </SectionRightPart>
  </Section>
</template>

<script>
import Section from "@/shared/Section.vue";
import SectionRightPart from "@/shared/SectionRightPart.vue";
import SectionTitle from "@/shared/SectionTitle.vue";
import Carousel from "./Carousel.vue";

export default {
  name: "SectionHow",
  components: {
    Carousel,
    Section,
    SectionRightPart,
    SectionTitle,
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

h4 {
  margin: 0;
  margin-bottom: 8px;
  color: $yellow;
  line-height: 34px;
  letter-spacing: -0.22px;
  font-weight: 500;
}

span.learn-more {
  font-size: 16px;
  font-weight: 500;
  float: right;
}

.infographic {
  display: flex;
  flex-direction: column;
}
</style>
