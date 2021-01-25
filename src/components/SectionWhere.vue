<template>
  <Section class="section-wherey">
    <SectionTitle>Où ?</SectionTitle>
    <SectionRightPart>
      <WebsiteList />
    </SectionRightPart>
  </Section>
</template>
<script>
import Section from "@/shared/Section";
import SectionTitle from "@/shared/SectionTitle";
import SectionRightPart from "@/shared/SectionRightPart";
import WebsiteList from "./WebsiteList.vue";

export default {
  name: "SectionWhere",
  components: {
    SectionTitle,
    SectionRightPart,
    Section,
    WebsiteList
  }
};
</script>

<style scoped>
ul {
  padding: 0;
}
</style>