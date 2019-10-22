<template>
  <div class="description">
    <div class="col-sm-12 col-md-8">
      <p>
        Cette extension permet de savoir si le prix de votre loyer (ou futur loyer) est
        <i>potentiellement</i> légal ou non.
      </p>

      <p>
        Ceci à pour but d'informer, et d'avertir les potentiels futurs locataires
        que certains loyers parisiens ne respectent pas l'encadrement des loyers, en vigueur depuis le 01/07/2019.
      </p>

      <span>L'extension est disponible sur les sites suivants</span>
      <ul>
        <li>seloger.com</li>
        <li>leboncoin.fr</li>
        <li>loueragile.fr</li>
        <li>pap.fr</li>
        <li>logic-immo.com</li>
        <li>immobilier.lefigaro.fr</li>
        <li>orpi.com</li>
      </ul>

      <p>
        Lorsque vous naviguez sur les annonces de location de l'un de ces sites,
        l'extension vous donne automatiquement le prix le plus haut que vous devriez payer
        selon les critères trouvés sur la page. Ensuite, vous pouvez accéder à plus d'informations en cliquant sur
        la petite icône de l'extension, à droite de la barre d'URL.
      </p>

      <span>Notre extension est disponible sur Firefox et Chrome</span>
      <ul>
        <li>
          Chrome
          <a
            href="https://chrome.google.com/webstore/detail/encadrement-loyers-paris/nkmghhgmpbngkbjnhpomddeglkpkkfeo?hl=fr"
          >Lien vers le chrome webstore</a>
        </li>
        <li>
          Firefox
          <a
            href="https://addons.mozilla.org/fr/firefox/addon/encadrement-loyers-paris/"
          >Lien vers le mozilla add-ons store</a>
        </li>
      </ul>
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
