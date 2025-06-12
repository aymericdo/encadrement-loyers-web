<template>
  <Section class="section-how">
    <SectionTitle>Comment ?</SectionTitle>
    <SectionRightPart>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/HL7YEsiLKo8?si=D9JBO9tLz5CI7kPs"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
      <p
        class="mt-4"
      >
        Une extension navigateur qui vous donne automatiquement le prix maximum estimé que vous
        devriez payer.
      </p>
      <router-link to="/methodologie">
        <Button
          type="button"
          class="text-white mt-2"
        >
          Plus d'info
        </Button>
      </router-link>
    </SectionRightPart>
  </Section>
</template>

<script setup>
import Section from "@/shared/SectionItem.vue";
import SectionRightPart from "@/shared/SectionRightPartItem.vue";
import SectionTitle from "@/shared/SectionTitleItem.vue";
import { Button } from '@/shadcn/ui/button'
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

.infographic {
  display: flex;
  flex-direction: column;
}

iframe {
  max-width: 100%;
}
</style>
