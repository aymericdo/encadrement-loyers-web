<template>
  <div id="app">
    <div class="centerWrapper">
      <Hero />
      <SectionWhy />
      <SectionWhere />
      <SectionHow />
      <SectionDisclaimer />
      <Footer />
    </div>
  </div>
</template>

<script>
import Hero from "./components/Hero.vue";
//import Body from "./components/Body.vue";
import SectionWhy from "./components/SectionWhy.vue";
import SectionWhere from "./components/SectionWhere.vue";
import SectionHow from "./components/SectionHow.vue";
import SectionDisclaimer from "./components/SectionDisclaimer.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "app",
  components: {
    Hero,
    SectionWhy,
    SectionWhere,
    SectionHow,
    SectionDisclaimer,
    Footer
  }
};
</script>

<style>
/* Webfont: Garnett-Black */@font-face {
    font-family: 'Garnett';
    src: url('./assets/fonts/Garnett-Medium.eot'); /* IE9 Compat Modes */
    src: url('./assets/fonts/Garnett-Medium.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./assets/fonts/Garnett-Medium.woff') format('woff'), /* Modern Browsers */
         url('./assets/fonts/Garnett-Medium.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./assets/fonts/Garnett-Medium.svg#Garnett-Medium') format('svg'); /* Legacy iOS */
    font-style: normal;
    font-weight: 500;
    text-rendering: optimizeLegibility;
}

/* Webfont: Garnett-Bold */@font-face {
    font-family: 'Garnett';
    src: url('./assets/fonts/Garnett-Bold.eot'); /* IE9 Compat Modes */
    src: url('./assets/fonts/Garnett-Bold.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./assets/fonts/Garnett-Bold.woff') format('woff'), /* Modern Browsers */
         url('./assets/fonts/Garnett-Bold.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./assets/fonts/Garnett-Bold.svg#Garnett-Bold') format('svg'); /* Legacy iOS */
    font-style: normal;
    font-weight: 700;
    text-rendering: optimizeLegibility;
}

/* Webfont: Garnett-Regular */@font-face {
    font-family: 'Garnett';
    src: url('./assets/fonts/Garnett-Regular.eot'); /* IE9 Compat Modes */
    src: url('./assets/fonts/Garnett-Regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./assets/fonts/Garnett-Regular.woff') format('woff'), /* Modern Browsers */
         url('./assets/fonts/Garnett-Regular.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./assets/fonts/Garnett-Regular.svg#Garnett-Regular') format('svg'); /* Legacy iOS */
    font-style: normal;
    font-weight: 400;
    text-rendering: optimizeLegibility;
}

/* Webfont: Garnett-Regular */@font-face {
    font-family: 'Garnett';
    src: url('./assets/fonts/Garnett-SemiBold.eot'); /* IE9 Compat Modes */
    src: url('./assets/fonts/Garnett-SemiBold.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
         url('./assets/fonts/Garnett-SemiBold.woff') format('woff'), /* Modern Browsers */
         url('./assets/fonts/Garnett-SemiBold.ttf') format('truetype'), /* Safari, Android, iOS */
         url('./assets/fonts/Garnett-SemiBold.svg#Garnett-SemiBold') format('svg'); /* Legacy iOS */
    font-style: normal;
    font-weight: 600;
    text-rendering: optimizeLegibility;
}
button:focus{
  outline-style:none!important;
  box-shadow:none!important;
  border-color:transparent;
}

html, body{
  background-color: #050505;
}

ul li{
  list-style: none;
}
#app {
  font-family: "Garnett","Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #9E9E9E;
  display: flex;
  flex-direction: row;
  background-color: #050505;
  width: 100vw;
  justify-content: center;
  font-size: 22px;
  letter-spacing: -0.23px;
  line-height: 34px;
}

.sectionTitle h3{
font-weight: 700;
font-size: 38px;
color: #F7F7F5;
letter-spacing: -0.31px;
line-height: 52px;
}

.centerWrapper{
  display: flex;
  flex-direction: column;
  max-width: 856px;
  padding-top: calc((100vw - 856px) / 3);
  padding-bottom: calc((100vw - 856px) / 3);

}

.section{
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 160px 0 0 0;
}

.sectionTitle{
  max-width: 248px;
  width: 100%;
}

.rightPart{
  margin-left: 56px;
  max-width: 552px;
  width: 100%;
}

</style>
