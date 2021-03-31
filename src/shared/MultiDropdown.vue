<template>
  <div class="multi-dropdown">
    <div class="overlay" v-if="isOpen" @click="onOpen"></div>
    <button @click="onOpen" :class="{ '-is-open': isOpen }">
      <span>{{ currentValuesDisplay }}</span
      ><ArrowIcon
        class="arrow-icon"
        :class="{ '-is-open': isOpen }"
      ></ArrowIcon>
    </button>
    <transition name="slide-down">
      <div class="option-list" v-if="isOpen">
        <div
          class="option"
          v-for="option in options"
          :class="{
            '-selected': currentValues.some((v) => v === option.value),
          }"
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
  name: "MultiDropdown",
  props: ["options", "currentValues"],
  data() {
    return {
      isOpen: false,
      currentValuesDisplay: "",
    };
  },
  mounted: function() {
    this.currentValuesDisplay = this.options
      .filter((opt) => this.currentValues.includes(opt.value))
      .map((opt) => opt.label)
      .join(", ") || 'Tout';
  },
  watch: {
    currentValues: function() {
      this.currentValuesDisplay = this.options
        .filter((opt) => this.currentValues.includes(opt.value))
        .map((opt) => opt.label)
        .join(", ") || 'Tout';
    },
  },
  methods: {
    onOpen: function() {
      this.isOpen = !this.isOpen;
    },
    onSelect: function(opt) {
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

.multi-dropdown {
  position: relative;
}

.multi-dropdown > button {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $yellow;
  font-weight: 600;
  height: 36px;
  border-radius: 4px;
  font-size: 20px;
  padding: 6px 12px;
  border-color: transparent;
  transition: background-color ease 0.3s;

  &:hover {
    border: solid white 2px;
  }
}

.multi-dropdown > button.-is-open {
  border: solid white 2px;
  z-index: 2;
}

.multi-dropdown > button > span {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 180px;
}

.arrow-icon {
  margin-left: 4px;
  transition: transform ease 0.3s;
}

.arrow-icon.-is-open {
  transform: rotate(180deg);
}

.overlay {
  background: rgba(19,15,64,.4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 2;
  overflow: hidden;
}

.option-list {
  position: absolute;
  max-height: 250px;
  overflow-y: auto;
  width: 100%;
  top: 100%;
  margin-top: 4px;
  background-color: $deepblack;
  border-radius: 4px;
  border: 1px solid white;
  z-index: 2;
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

.option.-selected,
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
