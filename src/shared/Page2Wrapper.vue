<template>
  <div class="wrapper h-screen w-full flex overflow-x-hidden overflow-y-auto">
    <transition
      name="slide-fade"
      @leave="leave"
    >
      <div
        v-if="isMounted"
        class="center-wrapper w-full flex flex-col items-center flex-1 p-4"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";

  const router = useRouter();

  const { isMounted } = defineProps({
    isMounted: Boolean,
  });

  const leave = () => {
    setTimeout(() => {
      router.push({ path: "/" });
    }, 400);
  };
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

.wrapper,
.center-wrapper {
  background: #050505;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all ease 150ms;
}
</style>
