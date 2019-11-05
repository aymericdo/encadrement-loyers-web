<template>
  <div class="section sectionWherey">
    <div class="sectionTitle leftPart">
      <h3>Où?</h3>
    </div>
    <div class="rightPart">
      <WebsiteList />
    </div>
  </div>

</template>
<script>
import WebsiteList from './WebsiteList.vue'

export default {
  name: "SectionWhere",
  components: {
    WebsiteList
  },
  props: {}
};
</script>

<style scoped>
ul{
  padding: 0;
}
</style>