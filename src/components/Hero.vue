<template>
  <div class="hero-header">
    <div class="hero-heading">
      <h1>
        <div>
          <div class="yellow-text">Encadrement</div>
        </div>est une extension pour vous aider dans votre recherche de location à
        <div class="paris-word">
          <span class="blue-text">Pa</span>ri
          <span class="red-text">s.</span>
        </div>
      </h1>
      <h2>Conforme ou pas à la loi de l’encadrement des loyers parisiens, vous saurez.</h2>
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
  max-width: $mobileSize;
  width: 100%;
}
.hero-heading h1 {
  font-weight: 700;
  font-style: normal;
  font-size: 3.875rem;
  color: #fff;
  letter-spacing: -0.5px;
  line-height: 78px;
  margin-bottom: 24px;
}

.hero-heading h2 {
  font-weight: 500;
  font-style: normal;
  font-size: 1.375rem;
  color: $lightgrey;
  letter-spacing: -0.02px;
  line-height: 32px;
}

@media screen and (max-width: $mobileSize) {
  .hero-heading h1 {
    font-size: 2.5rem;
    line-height: 48px;
  }

  .hero-heading h2 {
    font-size: 1.125rem;
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
  text-decoration: none;

  &::after {
    content: "";
    position: relative;
    background-color: $yellow;
    width: 100%;
    height: 4px;
    left: 0;
    display: flow-root;
  }

  &:hover {
    color: $darkeryellow;

    &::after {
      background-color: $darkeryellow;
    }
  }
}

.blue-text {
  color: #26a1ff;
  display: inline-block;
}

.red-text {
  color: #ffaca6;
  display: inline-block;
}
</style>