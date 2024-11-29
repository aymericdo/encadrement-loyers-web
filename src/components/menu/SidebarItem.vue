<template>
  <div class="sidebar">
    <div
      v-if="isPanelOpen"
      class="sidebar-backdrop"
      @click="emits('toggleClosing', false)"
    />
    <transition name="slide">
      <div
        v-if="isPanelOpen"
        class="sidebar-panel"
      >
        <Burger
          class="sidebar-burger"
          :is-burger-active="isPanelOpen"
          :is-fixed="false"
          @toggling-sidebar="emits('toggleClosing', false)"
        >
          <span />
        </Burger>
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
  import Burger from "@/components/menu/BurgerItem.vue";
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
