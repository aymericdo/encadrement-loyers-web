<template>
  <div class="carousel">
    <hooper ref="carousel" @slide="updateCarousel" :settings="hooperSettings">
      <slide></slide>
      <slide></slide>
      <slide></slide>
      <slide></slide>
      <slide></slide>
      <slide></slide>
      <slide></slide>
    </hooper>
    <div class="button-group--s">
      <button @click.prevent="slidePrev" class="carousel-control" id="precedent">Prec.</button>
      <button @click.prevent="slideNext" class="carousel-control" id="suivant">Suiv.</button>
    </div>
  </div>
</template>

<script>
import { Hooper, Slide } from "hooper";
import "hooper/dist/hooper.css";

export default {
  name: "Carousel",
  components: {
    Hooper,
    Slide
  },
  props: {},
  data() {
    return {
      hooperSettings: {
        itemsToShow: 1,
        centerMode: true
      },
      carouselData: 0
    };
  },
  watch: {
    carouselData() {
      this.$refs.carousel.slideTo(this.carouselData);
    }
  },
  methods: {
    slidePrev() {
      this.$refs.carousel.slidePrev();
    },
    slideNext() {
      this.$refs.carousel.slideNext();
    }
  }
};
</script>

<style>
.hooper > .hooper-list {
  border: solid 1px transparent !important;
  border-radius: 10px !important;
}
</style>

<style scoped>
.carousel {
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-bottom: 56px;
}
.hooper {
  height: 340px;
  margin-bottom: 8px;
}
.hooper li {
  border-radius: 10px;
  background-color: #0f0f0f;
  background-position: center;
  background-size: cover;
}
.hooper li:nth-child(1) {
  background-image: url("../assets/images/figaro.png");
}
.hooper li:nth-child(2) {
  background-image: url("../assets/images/leboncoin.png");
}
.hooper li:nth-child(3) {
  background-image: url("../assets/images/seloger.png");
}
.hooper li:nth-child(4) {
  background-image: url("../assets/images/pap.png");
}
.hooper li:nth-child(5) {
  background-image: url("../assets/images/orpi.png");
}
.hooper li:nth-child(6) {
  background-image: url("../assets/images/loueragile.png");
}
.hooper li:nth-child(7) {
  background-image: url("../assets/images/logicimmo.png");
}
.button-group--s {
  float: left;
  display: flex;
  flex-direction: row;
}
button.carousel-control {
  font-size: 12px;
  font-weight: 500;
  color: #fdcd56;
  letter-spacing: -0.12px;
  line-height: 16px;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
}
button#precedent {
  border-right: solid 1px #222222;
  padding-right: 8px;
  margin-right: 1px;
}
button#suivant {
  padding-left: 8px;
}
</style>