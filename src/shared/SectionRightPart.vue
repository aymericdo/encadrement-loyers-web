<template>
  <div class="right-part">
    <slot />
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;
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