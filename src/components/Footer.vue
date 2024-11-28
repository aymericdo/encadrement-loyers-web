<template>
  <Section class="footer">
    <p class="social">
      Follow us on
      <a
        class="facebook"
        href="https://www.facebook.com/encadrementloyers"
        target="_blank"
      >
        <FacebookIcon :width="'32px'" :height="'32px'" />
      </a>
      <a class="twitter" href="https://twitter.com/_encadrement" target="_blank">
        <TwitterIcon :width="'32px'" :height="'32px'" />
      </a>
      <a class="instagram" href="https://www.instagram.com/encadrement_loyers/" target="_blank">
        <InstagramIcon :width="'32px'" :height="'32px'" />
      </a>
    </p>
    <p>Aucune donnée n'est collectée par l'extension, hormis celle nécessaire au calcul et à la réalisation de quelques statistiques.</p>
    <p>
      Aucune donnée utilisateur n'est collectée.&nbsp;
      <router-link to="legal">Mentions légales</router-link>
    </p>
    <p>
      Pour contribuer à faire connaitre l'encadrement, et notre démarche, voici un <a href="https://docs.google.com/document/d/1292FRvLPtRvQTLSeVnN1WO_BdrkqVCTzaQo9d02p2FY/edit?usp=sharing" target="_blank">flyer</a> à imprimer et distribuer.
    </p>
  </Section>
</template>
<script setup>
  import Section from "@/shared/Section.vue";
  import FacebookIcon from "@/icons/FacebookIcon.vue";
  import InstagramIcon from "@/icons/InstagramIcon.vue";
  import TwitterIcon from "@/icons/TwitterIcon.vue";
</script>
<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

.footer {
  flex-direction: column;
  padding-bottom: 4rem;
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
.instagram,
.twitter {
  display: flex;
  margin-left: 8px;
  width: 2.5rem;
}

a,
a:visited {
  color: $yellow;
  transition: color ease 0.3s;

  &:hover {
    color: $darkeryellow;
  }
}
</style>