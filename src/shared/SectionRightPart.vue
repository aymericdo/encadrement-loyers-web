<template>
  <div class="right-part">
    <slot />
  </div>
</template>
<script>
export default {
  name: "SectionRightPart"
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.right-part {
  margin-left: 56px;
  max-width: 552px;
  width: 100%;
  font-size: 1.375rem;
}

@media screen and (max-width: $mobileSize) {
  .right-part {
    margin-left: 0;
  }
}
</style>