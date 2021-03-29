<template>
  <div class="carousel">
    <Swiper
      class="swiper"
      :slides-per-view="1"
      :space-between="50"
      :loop="true"
      :speed="500"
      :pagination="{ clickable: true }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      @slideChange="onSlideChange"
    >
      <SwiperSlide class="slide" v-for="item in items" v-bind:key="item.id">
        <img
          :src="require(`@/assets/images/${item.id}.png`)"
          :alt="`screenshot de ${item.website}`"
        />
      </SwiperSlide>

      <div class="button-group">
        <span class="carousel-title">
          Exemple sur
          <b>{{ items[currentSlide].website }}</b>
        </span>
        <div>
          <button
            class="carousel-control prev swiper-button-prev"
          >
            <span>Prec.</span>
          </button>
          <button
            class="carousel-control next swiper-button-next"
          >
            <span>Suiv.</span>
          </button>
        </div>
      </div>
    </Swiper>
  </div>
</template>

<script>
import SwiperCore, { Navigation, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

SwiperCore.use([Navigation, Pagination]);

export default {
  name: "Carousel",
  components: {
    Swiper,
    SwiperSlide,
  },
  data: function() {
    return {
      currentSlide: 0,
      items: [
        { id: "figaro", website: "immobilier.lefigaro.fr" },
        { id: "leboncoin", website: "leboncoin.fr" },
        { id: "pap", website: "pap.fr" },
        { id: "orpi", website: "orpi.com" },
        { id: "loueragile", website: "loueragile.fr" },
        { id: "seloger", website: "seloger.com" },
      ],
    };
  },
  methods: {
    onSlideChange(event) {
      this.currentSlide = event.realIndex;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.carousel {
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  margin-bottom: 56px;
}

.swiper {
  width: 100%;
}

:deep(.swiper-pagination) {
  bottom: 24px
}

:deep(.swiper-pagination .swiper-pagination-bullet-active) {
  background: $yellow;
}

.slide > img {
  border: solid 1px transparent;
  border-radius: 10px;
  width: 100%;
  height: 100%;
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

button.prev {
  border-right: solid 1px $deepgrey;
  padding-right: 8px;
  margin-right: 1px;
}

button.next {
  padding-left: 8px;
}

@media screen and (max-width: $mobileSize) {
  button.next > span,
  button.prev > span {
    display: none;
  }

  button.prev {
    border: none;
    padding-right: 0;
    margin-right: 0;
  }
}

@media screen and (min-width: $mobileSize) {
  :deep(.swiper-button-prev), :deep(.swiper-button-next) {
    position: inherit;
    height: inherit;
    width: inherit;
    margin-top: inherit;
    top: inherit;
  }

  :deep(.swiper-button-prev::after), :deep(.swiper-button-next::after) {
    display: none;
  }
}
</style>
