<template>
  <div class="section section-wherey">
    <div class="section-title left-part">
      <h3>Où?</h3>
    </div>
    <div class="right-part">
      <WebsiteList />
    </div>
  </div>
</template>
<script>
import WebsiteList from "./WebsiteList.vue";

export default {
  name: "SectionWhere",
  components: {
    WebsiteList
  },
  props: {}
};
</script>

<style scoped>
ul {
  padding: 0;
}
</style>