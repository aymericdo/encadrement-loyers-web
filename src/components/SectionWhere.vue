<template>
  <Section class="section-wherey">
    <SectionTitle>Où ?</SectionTitle>
    <SectionRightPart>
      <WebsiteList />
    </SectionRightPart>
  </Section>
</template>
<script setup>
  import Section from "@/shared/Section.vue";
  import SectionRightPart from "@/shared/SectionRightPart.vue";
  import SectionTitle from "@/shared/SectionTitle.vue";
  import WebsiteList from "@/components/WebsiteList.vue";
</script>

<style scoped>
ul {
  padding: 0;
}
</style>
