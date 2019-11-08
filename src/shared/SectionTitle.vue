<template>
  <div class="section-title">
    <h3>{{title}}</h3>
  </div>
</template>
<script>
export default {
  name: "SectionTitle",
  props: ["title"]
};
</script>

<style scoped>
.section-title {
  max-width: 248px;
  width: 100%;
}

.section-title h3 {
  font-weight: 700;
  font-size: 38px;
  color: #f7f7f5;
  letter-spacing: -0.31px;
  line-height: 52px;
}

@media screen and (max-width: 856px) {
  .section-title h3 {
    margin: 0;
    margin-bottom: 8px;
  }
}
</style>