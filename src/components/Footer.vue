<template>
  <Section class="footer">
    <p class="social">
      Follow us on
      <a
        class="facebook"
        href="https://www.facebook.com/encadrementloyers"
        target="_blank"
      >
        <FacebookIcon :width="'25px'" :height="'25px'" />
      </a>
      <a class="twitter" href="https://twitter.com/_encadrement" target="_blank">
        <TwitterIcon :width="'25px'" :height="'25px'" />
      </a>
    </p>
    <p>
      Brought to you by
      <span>
        <a
          href="https://www.linkedin.com/in/aymeric-dominique-b11349a6/"
          target="_blank"
        >Aymeric Dominique</a>
      </span>,
      <span>
        <a href="https://www.linkedin.com/in/thomas-d-legrand/" target="_blank">Thomas Legrand</a>
      </span> and
      <span>
        <a href="https://www.linkedin.com/in/lucienlandanger/" target="_blank">Lucien Landanger</a>
      </span>
      <br class="footer-br" />
      <span class="buy-us-coffee">
        <a href="https://buymeacoff.ee/DnzzL" target="_blank">☕️ Buy us a coffee</a>
      </span>
    </p>
  </Section>
</template>
<script>
import Section from "@/shared/Section.vue";
import FacebookIcon from "@/icons/FacebookIcon.vue";
import TwitterIcon from "@/icons/TwitterIcon.vue";

export default {
  name: "Footer",
  components: {
    Section,
    TwitterIcon,
    FacebookIcon
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

p.social {
  display: flex;
  align-items: center;
  justify-content: center;
}

.facebook,
.twitter {
  margin-left: 8px;
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