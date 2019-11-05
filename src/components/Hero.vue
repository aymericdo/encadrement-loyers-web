<template>
  <div itemscope itemtype="http://schema.org/Thing" class="heroHeader">
    <div class="heroHeading">
      <h1 itemprop="title">
        <span class="yellowText">Encadrement</span> est une extension pour vous aider dans votre recherche de location à <span class="blueText">Pa</span>ri<span class="redText">s.</span>
      </h1>
      <h2 itemprop="description">Conforme ou pas à la loi de l’encadrement des loyers parisiens, vous saurez.</h2>
    </div>
    <ButtonGroup />
  </div>
</template>

<script>
import ButtonGroup from './ButtonGroup'
export default {
  name: "Hero",
  components: {
    ButtonGroup
  },
  props: {}
};
</script>

<style>
/* .heroHeader{
  padding-top: calc((100vw - 856px) / 3);
} */
.heroHeading{
  max-width: 856px;
  width: 100%;
}
.heroHeading h1{
  font-family: Garnett;
  font-weight: 700;
  font-style: normal;
  font-size: 62px;
  color: #fff;
  letter-spacing: -0.5px;
  line-height: 78px;
  margin-bottom: 24px;
}

.heroHeading h2 {
  font-family: Garnett;
  font-weight: 500;
  font-style: normal;
  font-size: 22px;
  color: #9E9E9E;
  letter-spacing: -0.02px;
  line-height: 32px;
  margin-bottom: 88px;
}

.yellowText{
  color: #FDCD56;
  display: inline-block;
}

.blueText{
  color: #26A1FF;
  display: inline-block;
}

.redText{
  color: #FFACA6;
  display: inline-block;
}

.yellowText::after{
  content: "";
  position: relative;
  background-color: #FDCD56;
  width: 100%;
  height: 4px;
  left: 0;
  display: flow-root;
}
</style>