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

        <iframe
          class="facebook"
          src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Floueragile%2Fposts%2F2429261067286129&width=350&show_text=true&height=585&appId"
          width="350"
          height="585"
          style="border:none;overflow:hidden"
          scrolling="no"
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
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
  },
  mounted: function() {
    const twitterScript = document.createElement("script");
    twitterScript.setAttribute("async", true);

    twitterScript.setAttribute(
      "src",
      "https://platform.twitter.com/widgets.js"
    );
    document.head.appendChild(twitterScript);
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.col {
  max-width: $mobileSize;
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
.twitter-tweet {
  width: 350px !important;
  margin-top: 0 !important;
}

.article-list {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  & > * {
    margin-bottom: 50px !important;
    max-width: 100%;
  }

  iframe.facebook {
    max-width: 100%;
  }
}
</style>