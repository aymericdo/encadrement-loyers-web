<template>
  <Section class="section-why">
    <SectionTitle>Pourquoi ?</SectionTitle>
    <SectionRightPart>
      <p>
        Trop de loyers ne respectent pas l'encadrement pourtant obligatoire dans beaucoup de villes sur la base de la loi ELAN (2018).
      </p>
      <a
        href="https://www.service-public.fr/particuliers/vosdroits/F1314"
        target="_blank"
      >
        <Button
          type="button"
          class="text-white mt-2"
        >
          Plus d'info
        </Button>
      </a>
    </SectionRightPart>
  </Section>
</template>

<script setup>
  import Section from "@/shared/SectionItem.vue";
  import SectionRightPart from "@/shared/SectionRightPartItem.vue";
  import SectionTitle from "@/shared/SectionTitleItem.vue";
  import { Button } from '@/shadcn/ui/button'
</script>

<style scoped></style>
