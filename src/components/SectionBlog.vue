<template>
  <Section class="section-blog">
    <div class="col">
      <SectionTitle class="title">On parle de nous!</SectionTitle>
      <div class="article-list">
        <blockquote class="twitter-tweet">
          <p lang="fr" dir="ltr">
            Cette application vérifie si votre loyer respecte bien l’encadrement
            <a
              href="https://twitter.com/hashtag/Eco?src=hash&amp;ref_src=twsrc%5Etfw"
            >#Eco</a>
            <a href="https://t.co/7JMoUctwHt">https://t.co/7JMoUctwHt</a>
          </p>&mdash; Le Figaro (@Le_Figaro)
          <a
            href="https://twitter.com/Le_Figaro/status/1208975839070752768?ref_src=twsrc%5Etfw"
          >December 23, 2019</a>
        </blockquote>
        <div
          class="fb-post"
          data-href="https://www.facebook.com/loueragile/posts/2429261067286129"
          data-width="350"
          data-show-text="true"
        >
          <blockquote
            cite="https://developers.facebook.com/loueragile/posts/2429261067286129"
            class="fb-xfbml-parse-ignore"
          >
            <p>Les bailleurs doivent respecter l&#039;encadrement des loyers renouvellé par la Mairie de Paris le 1er juillet 2019. Vous...</p>Publiée par
            <a href="https://www.facebook.com/loueragile/">LouerAgile</a> sur&nbsp;
            <a
              href="https://developers.facebook.com/loueragile/posts/2429261067286129"
            >Mercredi 20 novembre 2019</a>
          </blockquote>
        </div>
      </div>
    </div>
  </Section>
</template>
<script>
import Section from "@/shared/Section.vue";
import SectionTitle from "@/shared/SectionTitle.vue";

export default {
  name: "SectionBlog",
  components: {
    Section,
    SectionTitle
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.col {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.title {
  max-width: inherit;
}

@media screen and (max-width: $mobileSize) {
}
</style>

<style lang="scss">
#twitter-widget-0 {
  width: 350px !important;
  margin-top: 0 !important;
}

.article-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & > * {
    margin-right: 50px !important;
    margin-bottom: 50px !important;
    max-width: 100%;
  }

  .fb_iframe_widget span,
  .fb_iframe_widget iframe {
    max-width: 100%;
  }
}
</style>