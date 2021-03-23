<template>
  <div class="center-wrapper">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Page2Wrapper",
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.center-wrapper {
    align-items: center;
    background: #050505;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding: 0 24px;
    position: relative;
  }
</style>