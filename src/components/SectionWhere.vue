<template>
  <Section class="section-where">
    <SectionTitle>Où ?</SectionTitle>
    <SectionRightPart>
      <WebsiteList />
    </SectionRightPart>
  </Section>
</template>
<script setup>
  import Section from "@/shared/SectionItem.vue";
  import SectionRightPart from "@/shared/SectionRightPartItem.vue";
  import SectionTitle from "@/shared/SectionTitleItem.vue";
  import WebsiteList from "@/components/WebsiteList.vue";
</script>

<style scoped>
ul {
  padding: 0;
}
</style>
