<template>
  <div itemscope itemtype="http://schema.org/Thing" class="hero-header">
    <div class="hero-heading">
      <h1 itemprop="title">
        <span class="yellow-text">Encadrement</span> est une extension pour vous aider dans votre recherche de location à
        <div class="paris-word">
          <span class="blue-text">Pa</span>ri
          <span class="red-text">s.</span>
        </div>
      </h1>
      <h2
        itemprop="description"
      >Conforme ou pas à la loi de l’encadrement des loyers parisiens, vous saurez.</h2>
    </div>
    <ButtonGroup />
  </div>
</template>

<script>
import ButtonGroup from "./ButtonGroup";
export default {
  name: "Hero",
  components: {
    ButtonGroup
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.hero-heading {
  max-width: 856px;
  width: 100%;
}
.hero-heading h1 {
  font-family: Garnett;
  font-weight: 700;
  font-style: normal;
  font-size: 62px;
  color: #fff;
  letter-spacing: -0.5px;
  line-height: 78px;
  margin-bottom: 24px;
}

.hero-heading h2 {
  font-family: Garnett;
  font-weight: 500;
  font-style: normal;
  font-size: 22px;
  color: $lightgrey;
  letter-spacing: -0.02px;
  line-height: 32px;
}

@media screen and (max-width: 856px) {
  .hero-heading h1 {
    font-size: 40px;
    line-height: 48px;
  }

  .hero-heading h2 {
    font-size: 18px;
    line-height: 28px;
  }
}

.paris-word {
  display: inline-flex;
  flex-wrap: nowrap;
}

.yellow-text {
  color: $yellow;
  display: inline-block;
}

.blue-text {
  color: #26a1ff;
  display: inline-block;
}

.red-text {
  color: #ffaca6;
  display: inline-block;
}

.yellow-text::after {
  content: "";
  position: relative;
  background-color: $yellow;
  width: 100%;
  height: 4px;
  left: 0;
  display: flow-root;
}
</style>