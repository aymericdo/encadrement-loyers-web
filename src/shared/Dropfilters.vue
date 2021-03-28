<template>
  <div class="dropfilters">
    <button @click="onOpen()" :class="{ '-is-open': isOpen }">
      <span>Filtre</span
      ><ArrowIcon class="arrow-icon" :class="{ '-is-open': isOpen }"></ArrowIcon>
    </button>
    <transition name="slide-down">
      <div class="option-list" v-if="isOpen">
        <div>
          <span class="label">Surface</span>
        </div>
        <div>
          <span class="label">Nombre de pièce(s)</span>
        </div>
        <div>
          <span class="label">Meublé</span>
        </div>
        <div>
          <span class="label">Localisation</span>
        </div>
        <div>
          <span class="label">Siteweb</span>
        </div>
        <button class="submit-btn" @click="onSubmit()">Filtrer</button>
      </div>
    </transition>
  </div>
</template>

<script>
import ArrowIcon from "@/icons/ArrowIcon.vue";
export default {
  name: "Dropfilters",
  props: ["options", "currentValue"],
  data() {
    return {
      isOpen: false,
      currentValueDisplay: '',
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
  },
  components: {
    ArrowIcon,
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
  width: max-content;
  padding: 8px 14px;
  background-color: $deepblack;
  border-radius: 8px;
  border: 1px solid white;
  z-index: 1;
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

.slide-down-enter,
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
