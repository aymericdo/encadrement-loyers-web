<template>
  <div class="section">
    <slot />
  </div>
</template>
<script>
export default {
  name: "Section"
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.section {
  max-width: 100%;
  display: flex;
  flex-direction: row;
  padding: 160px 0 0 0;
}

@media screen and (max-width: $mobileSize) {
  .section {
    flex-direction: column;
    padding: 88px 0 0 0;
  }
}
</style>