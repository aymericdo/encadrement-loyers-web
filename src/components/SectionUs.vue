<template>
  <Section class="section-us">
    <SectionTitle>Qui sommes nous ?</SectionTitle>
    <SectionRightPart>
      <div class="nosgrossesteutés">
        <div>
          <a
            href="https://www.linkedin.com/in/aymeric-dominique/"
            target="_blank"
          >
            <img
              src="@/assets/images/aymeric.jpeg"
              alt="Photo de Aymeric Dominique"
            />
          </a>
          <span>Développeur</span>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/thomas-d-legrand/"
            target="_blank"
          >
            <img
              src="@/assets/images/thomas.jpeg"
              alt="Photo de Thomas Legrand"
            />
          </a>
          <span>Data Scientist</span>
        </div>
        <div>
          <a
            href="https://www.linkedin.com/in/lucienlandanger/"
            target="_blank"
          >
            <img
              src="@/assets/images/lucien.jpeg"
              alt="Photo de Lucien Landanger"
            />
          </a>
          <span>Designer</span>
        </div>
      </div>
      <br class="footer-br" />
      <span class="buy-us-coffee">
        <a href="https://buymeacoff.ee/DnzzL" target="_blank"
          >☕️ Buy us a coffee</a
        > </span
      >&nbsp;
    </SectionRightPart>
  </Section>
</template>

<script>
import Section from "@/shared/Section.vue";
import SectionRightPart from "@/shared/SectionRightPart.vue";
import SectionTitle from "@/shared/SectionTitle.vue";

export default {
  name: "SectionHow",
  components: {
    Section,
    SectionRightPart,
    SectionTitle,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.nosgrossesteutés {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.nosgrossesteutés > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2em 2em;
}

.nosgrossesteutés img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.buy-us-coffee {
  display: flex;
  justify-content: center;
}
</style>
