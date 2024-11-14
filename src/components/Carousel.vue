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
      <SwiperSlide
        class="slide"
        v-for="(item, index) in items"
        v-bind:key="index"
      >
        <img
          :src="require(`@/assets/images/capture${index + 1}.jpg`)"
          :alt="`screenshot de l'extension`"
        />
      </SwiperSlide>

      <div class="button-group">
        <span class="carousel-title">
          Exemple d'une annonce
          <b>{{ items[currentSlide] }}</b>
        </span>
        <div>
          <button class="carousel-control prev swiper-button-prev">
            <span>Prec.</span>
          </button>
          <button class="carousel-control next swiper-button-next">
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
        "non conforme",
        "non conforme",
        "conforme",
        "conforme",
        "conforme",
        "conforme",
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
@use "@/assets/scss/variables.scss" as *;

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
  bottom: 24px;
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
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    position: inherit;
    height: inherit;
    width: inherit;
    margin-top: inherit;
    top: inherit;
  }

  :deep(.swiper-button-prev::after),
  :deep(.swiper-button-next::after) {
    display: none;
  }
}
</style>
