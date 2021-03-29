<template>
  <div class="dropfilters">
    <button @click="onOpen()" :class="{ '-is-open': isOpen }">
      <span>Filtre</span>
      <ArrowIcon class="arrow-icon" :class="{ '-is-open': isOpen }"></ArrowIcon>
    </button>
    <transition name="slide-down">
      <div class="option-list" v-if="isOpen" :style="cssVars">
        <div class="row">
          <span class="label">Surface</span>
          <span>
            <Slider
              v-model="surfaceValue"
              :min="9"
              :max="100"
              :format="{ suffix: 'm²' }"
            />
          </span>
        </div>
        <div class="row">
          <span class="label">Nombre de pièce(s)</span>
          <span>
            <Slider
              v-model="roomValue"
              :min="1"
              :max="6"
              :format="roomValueFct"
            />
          </span>
        </div>
        <div class="row">
          <span class="label">Meublé</span>
        </div>
        <div class="row">
          <span class="label">Localisation</span>
        </div>
        <div class="row">
          <span class="label">Siteweb</span>
        </div>
        <button class="submit-btn" @click="onSubmit()">Filtrer</button>
      </div>
    </transition>
  </div>
</template>

<script>
import ArrowIcon from "@/icons/ArrowIcon.vue";
import Slider from "@vueform/slider";

import "@vueform/slider/themes/default.css";

export default {
  name: "Dropfilters",
  props: {
    width: {
      type: Number,
    },
  },
  computed: {
    cssVars() {
      return {
        '--width': `${this.width}px`,
      };
    }
  },
  components: {
    ArrowIcon,
    Slider,
  },
  data() {
    return {
      isOpen: false,
      currentValueDisplay: "",
      surfaceValue: [9, 100],
      roomValue: [1, 6],
    };
  },
  methods: {
    onOpen: function() {
      this.isOpen = !this.isOpen;
    },
    onSubmit: function(opt) {
      this.isOpen = false;
      this.$emit("onSubmit", opt);
    },
    roomValueFct: function(value) {
      return `${value} pièce${(value > 1 ? 's' : '')}`
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.dropfilters {
  position: relative;
}

.dropfilters > button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $yellow;
  font-weight: 600;
  border-radius: 8px;
  font-size: 20px;
  padding: 6px 12px;
  border-color: transparent;
  transition: background-color ease 0.3s;

  &:hover {
    border: solid white 2px;
  }
}

.dropfilters > button.-is-open {
  border: solid white 2px;
}

.arrow-icon {
  margin-left: 4px;
  transition: transform ease 0.3s;
}

.arrow-icon.-is-open {
  transform: rotate(180deg);
}

.option-list {
  position: absolute;
  margin-top: 4px;
  box-sizing: border-box;
  width: 500px;
  padding: 8px 14px;
  background-color: $deepblack;
  border-radius: 8px;
  border: 1px solid white;
  z-index: 1;
}

.option-list > .row {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 16px 0;
}

@media screen and (max-width: $mobileSize) {
  .option-list {
    width: var(--width);
  }

  .option-list > .row {
    flex-direction: column;
  }

  .option-list > .row > span.label {
    margin-bottom: 36px;
  }

  .option-list > .row > span {
    width: 100%;
  }
}

.option-list > .row > span.label {
  min-width: 200px;
}

.option-list > .row > span {
  flex: 1;
}

.option-list > .row :deep(.slider-target .slider-connect) {
  background: $yellow;
}

.option-list > .row :deep(.slider-target .slider-tooltip) {
  background: $deepblack;
  border-color: $yellow;
  line-height: 16px;
}

.submit-btn {
  display: flex;
  align-self: flex-end;
  color: $deepblack;
  display: flex;
  justify-content: center;
  font-weight: 400;
  background-color: $yellow;
  cursor: pointer;
  font-weight: 600;
  border-radius: 8px;
  font-size: 14px;
  padding: 6px 12px;
  border-color: transparent;
  transition: background-color ease 0.3s;
  float: right;

  &:hover {
    border: solid white 2px;
  }
}

.option:hover {
  color: $yellow;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all ease 400ms;
  transition-property: opacity, transform;
}
</style>
