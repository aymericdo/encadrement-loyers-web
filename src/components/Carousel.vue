<template>
  <div class="carousel">
    <Hooper ref="carousel" @slide="updateCarousel" :settings="hooperSettings">
      <Slide v-for="(item, index) in items" v-bind:key="index"></Slide>
    </Hooper>
    <div class="button-group">
      <span class="carousel-title">
        Exemple sur
        <b>{{items[currentSlide].website}}</b>
      </span>
      <div>
        <button @click.prevent="slidePrev" class="carousel-control" id="precedent">Prec.</button>
        <button @click.prevent="slideNext" class="carousel-control" id="suivant">Suiv.</button>
      </div>
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
  data: function() {
    return {
      currentSlide: 0,
      hooperSettings: {
        itemsToShow: 1,
        centerMode: true
      },
      carouselData: 0,
      items: [
        { website: "immobilier.lefigaro.fr" },
        { website: "leboncoin.fr" },
        { website: "pap.fr" },
        { website: "orpi.com" },
        { website: "loueragile.fr" },
        { website: "seloger.com" },
      ]
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
    },
    updateCarousel(e) {
      this.currentSlide = e.currentSlide;
    }
  }
};
</script>

<style>
.hooper > .hooper-list {
  border: solid 1px transparent;
  border-radius: 10px;
}
</style>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

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
.hooper:focus {
  outline: none;
}
.hooper li {
  background-position: left;
  background-size: cover;
}
.hooper li:nth-child(1) {
  background-image: url("../assets/images/figaro.png");
}
.hooper li:nth-child(2) {
  background-image: url("../assets/images/leboncoin.png");
}
.hooper li:nth-child(3) {
  background-image: url("../assets/images/pap.png");
}
.hooper li:nth-child(4) {
  background-image: url("../assets/images/orpi.png");
}
.hooper li:nth-child(5) {
  background-image: url("../assets/images/loueragile.png");
}
.hooper li:nth-child(6) {
  background-image: url("../assets/images/seloger.png");	
}
.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.button-group > div {
  display: flex;
}

.button-group > .carousel-title {
  font-size: 0.75rem;
  line-height: 16px;
  color: $lightgrey;
}

.button-group > .carousel-title > b {
  font-weight: 500;
}

button.carousel-control {
  font-size: 0.75rem;
  font-weight: 500;
  color: $yellow;
  letter-spacing: -0.12px;
  line-height: 16px;
  background: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
  transition: color ease 0.3s;

  &:hover {
    color: $darkeryellow;
  }
}

button#precedent {
  border-right: solid 1px $deepgrey;
  padding-right: 8px;
  margin-right: 1px;
}

button#suivant {
  padding-left: 8px;
}

@media screen and (max-width: $mobileSize) {
  button#precedent,
  button#suivant {
    display: none;
  }
}
</style>