<template>
  <div class="sidebar">
    <div
      class="sidebar-backdrop"
      @click="emits('toggleClosing', false)"
      v-if="isPanelOpen"
    ></div>
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <Burger
          class="sidebar-burger"
          :isBurgerActive="isPanelOpen"
          :isFixed="false"
          @togglingSidebar="emits('toggleClosing', false)"
          ><span></span
        ></Burger>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
  import Burger from "@/components/menu/Burger.vue";
  import { toRefs } from 'vue'

  const props = defineProps({
    isPanelOpen: Boolean,
  });

  const emits = defineEmits([
    'toggleClosing',
  ])

  const {
    isPanelOpen,
  } = toRefs(props);
</script>

<style scoped lang="scss">
@use "@/assets/scss/variables.scss" as *;
.slide-enter-active,
.slide-leave-active {
  transition: transform 200ms ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
  transition: all 150ms ease-in 0s;
}

.sidebar-backdrop {
  background-color: rgba(19, 15, 64, 0.4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 2;
}

.sidebar-burger {
  top: 1em;
  right: 1em;
}

.sidebar-panel {
  overflow-y: auto;
  background-color: $deepblack;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 999;
  padding: 3rem 20px 2rem 20px;
  width: 300px;
}
</style>
