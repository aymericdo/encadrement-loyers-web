<template>
  <div class="section-title">
    <h3>
      <slot />
    </h3>
  </div>
</template>
<script>
export default {
  name: "SectionTitle",
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

.section-title {
  max-width: 248px;
  width: 100%;
}

.section-title h3 {
  margin-top: 0;
  font-weight: 700;
  font-size: 2.375rem;
  color: #f7f7f5;
  letter-spacing: -0.31px;
  line-height: 52px;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: $mobileSize) {
  .section-title h3 {
    margin: 0;
    margin-bottom: 8px;
  }
}
</style>
