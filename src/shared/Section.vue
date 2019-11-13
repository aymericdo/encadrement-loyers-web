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
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 160px 0 0 0;
}

@media screen and (max-width: $mobileSize) {
  .section {
    flex-direction: column;
    margin: 88px 0 0 0;
  }
}
</style>