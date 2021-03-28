<template>
  <div class="dropdown">
    <button @click="onOpen()" :class="{ '-is-open': isOpen }">
      <span>{{ currentValueDisplay }}</span
      ><ArrowIcon class="arrow-icon" :class="{ '-is-open': isOpen }"></ArrowIcon>
    </button>
    <transition name="slide-down">
      <div class="option-list" v-if="isOpen">
        <div
          class="option"
          v-for="option in options"
          v-bind:key="option.value"
          @click="onSelect(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ArrowIcon from "@/icons/ArrowIcon.vue";
export default {
  name: "Dropdown",
  props: ["options", "currentValue"],
  data() {
    return {
      isOpen: false,
      currentValueDisplay: '',
    };
  },
  mounted: function() {
    this.currentValueDisplay = this.options.find(opt => opt.value === this.currentValue).label
  },
  watch: {
    currentValue: function() {
      console.log('bite')
      this.currentValueDisplay = this.options.find(opt => opt.value === this.currentValue).label
    },
  },
  methods: {
    onOpen: function() {
      this.isOpen = !this.isOpen;
    },
    onSelect: function(opt) {
      this.isOpen = false;
      this.$emit("onSelect", opt);
    },
  },
  components: {
    ArrowIcon,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.dropdown {
  position: relative;
}

.dropdown > button {
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

.dropdown > button.-is-open {
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
  width: 100%;
  margin-top: 4px;
  background-color: $deepblack;
  border-radius: 8px;
  border: 1px solid white;
  z-index: 1;
}

.option {
  color: white;
  display: flex;
  justify-content: center;
  font-weight: 400;
  cursor: pointer;
  transition: all ease 0.3s;
  transition-property: background-color, color;
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
