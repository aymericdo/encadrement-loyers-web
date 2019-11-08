<template>
  <div class="section section-wherey">
    <SectionTitle class="left-part" :title="'Où?'" />
    <div class="right-part">
      <WebsiteList />
    </div>
  </div>
</template>
<script>
import SectionTitle from "@/shared/SectionTitle";
import WebsiteList from "./WebsiteList.vue";

export default {
  name: "SectionWhere",
  components: {
    SectionTitle,
    WebsiteList
  }
};
</script>

<style scoped>
ul {
  padding: 0;
}
</style>