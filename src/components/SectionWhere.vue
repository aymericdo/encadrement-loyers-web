<template>
  <Section class="section-wherey">
    <SectionTitle>Où ?</SectionTitle>
    <SectionRightPart>
      <WebsiteList />
    </SectionRightPart>
  </Section>
</template>
<script>
import Section from "@/shared/Section.vue";
import SectionRightPart from "@/shared/SectionRightPart.vue";
import SectionTitle from "@/shared/SectionTitle.vue";
import WebsiteList from "./WebsiteList.vue";

export default {
  name: "SectionWhere",
  components: {
    SectionTitle,
    SectionRightPart,
    Section,
    WebsiteList,
  },
};
</script>

<style scoped>
ul {
  padding: 0;
}
</style>
