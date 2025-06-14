<template>
  <Section class="section-blog">
    <div class="col">
      <SectionTitle class="title">
        On parle de nous
      </SectionTitle>
      <div class="article-list mt-10">
        <div
          @click="openArticle('https://www.lemonde.fr/argent/article/2024/04/23/encadrement-des-loyers-les-depassements-restent-monnaie-courante_6229353_1657007.html')"
          role="button"
          aria-label="Lire l'article du Monde"
          class="article max-w-md p-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer"
        >
          <div class="flex items-center space-x-3 mb-3">
            <img
              src="@/assets/images/logo-le-monde.webp"
              alt="Logo Le Monde"
              class="h-12 w-12 object-contain flex-shrink-0"
            >
            <div>
              <p class="text-sm font-semibold text-gray-900">
                Le Monde
              </p>
              <p class="text-xs text-gray-500">
                23 avril 2024
              </p>
            </div>
          </div>

          <h3
            class="text-gray-900 font-semibold text-lg mb-2 leading-tight"
          >
            Encadrement des loyers : les dépassements restent monnaie courante
          </h3>
          <p class="text-gray-700 text-sm mb-3 line-clamp-3">
            Les villes françaises qui plafonnent les loyers peinent à faire appliquer la règle. A Paris, le montant moyen d’un dépassement excède 150 euros par mois.
          </p>
          <div
            class="text-blue-600 text-sm font-medium hover:underline"
          >
            Lire l'article sur Le Monde &rarr;
          </div>
        </div>

        <blockquote class="twitter-tweet">
          <p
            lang="fr"
            dir="ltr"
          >
            Hello Twitter, tu te demandes parfois si ton loyer est légal ou
            abusif ? <br>Nous nous associons au collectif de développeurs
            &quot;Encadrement-loyers&quot; qui lance une extension gratuite pour
            vérifier si ton loyer est légal. <br>Elle est téléchargable ici :
            <a href="https://t.co/fXoXvbVLfk">https://t.co/fXoXvbVLfk</a>
          </p>
          &mdash; Ian Brossat (@IanBrossat)
          <a
            href="https://twitter.com/IanBrossat/status/1400357311743500288?ref_src=twsrc%5Etfw"
          >June 3, 2021</a>
        </blockquote>

        <blockquote class="twitter-tweet">
          <p
            lang="fr"
            dir="ltr"
          >
            Cette application vérifie si votre loyer respecte bien l’encadrement
            <a
              href="https://twitter.com/hashtag/Eco?src=hash&amp;ref_src=twsrc%5Etfw"
            >#Eco</a>
            <a href="https://t.co/7JMoUctwHt">https://t.co/7JMoUctwHt</a>
          </p>
          &mdash; Le Figaro (@Le_Figaro)
          <a
            href="https://twitter.com/Le_Figaro/status/1208975839070752768?ref_src=twsrc%5Etfw"
          >December 23, 2019</a>
        </blockquote>

        <div
          @click="openArticle('https://www.leparisien.fr/immobilier/encadrement-des-loyers-a-paris-cette-application-epingle-les-annonces-de-location-illegales-04-02-2020-8252145.php')"
          role="button"
          aria-label="Lire l'article du Parisien"
          class="article max-w-md p-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer"
        >
          <div class="flex items-center space-x-3 mb-3">
            <img
              src="@/assets/images/logo-le-parisien.png"
              alt="Logo Le Parisien"
              class="h-12 w-12 object-contain flex-shrink-0"
            >
            <div>
              <p class="text-sm font-semibold text-gray-900">
                Le Parisien
              </p>
              <p class="text-xs text-gray-500">
                4 février 2020
              </p>
            </div>
          </div>

          <h3
            class="text-gray-900 font-semibold text-lg mb-2 leading-tight"
          >
            Encadrement des loyers à Paris : cette application épingle les annonces de location «illégales»
          </h3>
          <p class="text-gray-700 text-sm mb-3 line-clamp-3">
            Téléchargeable sur les navigateurs Internet Chrome et Mozilla, l’application «l’Encadrement» permet d’afficher directement sur les sites de location, à côté du montant du loyer, le prix auquel il devrait légalement être loué.
          </p>
          <div
            class="text-blue-600 text-sm font-medium hover:underline"
          >
            Lire l'article sur Le Parisien &rarr;
          </div>
        </div>
      </div>
    </div>
  </Section>
</template>

<script setup>
  import { onMounted } from 'vue';
  import Section from "@/shared/SectionItem.vue";
  import SectionTitle from "@/shared/SectionTitleItem.vue";

  onMounted(() => {
    const twitterScript = document.createElement("script");
    twitterScript.setAttribute("async", true);

    twitterScript.setAttribute(
      "src",
      "https://platform.twitter.com/widgets.js"
    );
    document.head.appendChild(twitterScript);
  });

  function openArticle(url) {
    window.open(url, "_blank");
  }
</script>
<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

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
.twitter-tweet,
.article {
  width: 350px !important;
  margin-top: 0 !important;
  height: fit-content;
}

.article-list {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  & > * {
    margin-bottom: 2rem;
    max-width: 100%;
  }

  iframe.facebook {
    max-width: 100%;
  }
}
</style>
