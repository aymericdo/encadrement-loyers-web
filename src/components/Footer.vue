<template>
  <Section class="footer">
    <p>
      Brought to you by
      <span>
        <a href="https://www.linkedin.com/in/aymeric-dominique-b11349a6/">Aymeric Dominique</a>
      </span>,
      <span>
        <a href="https://www.linkedin.com/in/thomas-d-legrand/">Thomas Legrand</a>
      </span> and
      <span>
        <a href="https://www.linkedin.com/in/lucienlandanger/">Lucien Landanger</a>
      </span>
      <br class="footer-br" />
      <span class="buy-us-coffee">
        <a href="https://buymeacoff.ee/DnzzL">☕️ Buy us a coffee</a>
      </span>
    </p>
  </Section>
</template>
<script>
import Section from "@/shared/Section.vue";

export default {
  name: "Footer",
  components: {
    Section
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.footer {
  flex-direction: column;
}

p {
  font-size: 0.75rem;
  text-align: center;
}

@media screen and (max-width: $mobileSize) {
  .footer-br {
    display: none;
  }

  .buy-us-coffee {
    margin-left: 8px;
  }
}
</style>