<template>
  <div itemscope itemtype="http://schema.org/Article" class="description">
    <div class="col-sm-12 col-md-8">
      <h2>Une extension pour vous aider dans votre recherche de location</h2>

      <p itemprop="description">
        Cette extension permet de savoir si le prix de votre loyer (ou futur loyer) est
        <i>potentiellement</i> légal ou non.
      </p>

      <p itemprop="description">
        Ceci à pour but d'informer, et d'avertir les potentiels futurs locataires
        que certains loyers parisiens ne respectent pas l'encadrement des loyers, en vigueur depuis le 01/07/2019.
      </p>

      <h4>Une extension disponible sur les sites les plus populaires</h4>
      <ul>
        <li itemprop="url">seloger.com</li>
        <li itemprop="url">leboncoin.fr</li>
        <li itemprop="url">loueragile.fr</li>
        <li itemprop="url">pap.fr</li>
        <li itemprop="url">logic-immo.com</li>
        <li itemprop="url">immobilier.lefigaro.fr</li>
        <li itemprop="url">orpi.com</li>
      </ul>

      <h4>Une extension simple d'utilisation</h4>
      <p itemprop="description">
        Lorsque vous naviguez sur les annonces de location de l'un de ces sites,
        l'extension vous donne automatiquement le prix le plus haut que vous devriez payer
        selon les critères trouvés sur la page du logement. Ensuite, vous pouvez accéder à plus d'informations en cliquant sur
        la petite icône de l'extension, à droite de la barre d'URL.
      </p>

      <h4>Disponible sur Firefox et Chrome</h4>
      <ul>
        <li>
          Chrome
          <a
            itemprop="url"
            href="https://chrome.google.com/webstore/detail/encadrement-loyers-paris/nkmghhgmpbngkbjnhpomddeglkpkkfeo?hl=fr"
          >Lien vers le chrome webstore</a>
        </li>
        <li>
          Firefox
          <a
            itemprop="url"
            href="https://addons.mozilla.org/fr/firefox/addon/encadrement-loyers-paris/"
          >Lien vers le mozilla add-ons store</a>
        </li>
      </ul>

      <h5>Avertissement</h5>
      <p
        itemprop="description"
      >Selon la mairie de Paris, il est possible de dépasser le prix de l'encadrement sous certaines conditions très strictes (garage, balcon, prestations extraordinaires, etc). Les annonces notées "illégales" ne le sont donc peut-être pas. (Ceci est un petit ajout pour ne pas choquer les âmes sensibles de nos chers propriétaires parisiens)</p>
      <p itemprop="description">
        Pour plus d'informations, vous pouvez vous renseigner ici
        <a
          itemprop="url"
          href="https://www.paris.fr/pages/l-encadrement-des-loyers-parisiens-en-vigueur-le-1er-aout-2712"
        >https://www.paris.fr/pages/l-encadrement-des-loyers-parisiens-en-vigueur-le-1er-aout-2712</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Body",
  props: {}
};
</script>

<style scoped>
.description {
  padding: 40px;
}

p {
  text-align: justify;
}
</style>
