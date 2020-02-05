<template>
  <ul class="website-list">
    <li class="website-item">
      <a
        href="https://www.facebook.com/marketplace/paris/propertyrentals/?sort=BEST_MATCH"
        target="_blank"
      >
        <div class="item-content">
          <img src="@/assets/images/logo-facebook.png" alt="logo-facebook" />
          <p>Marketplace</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a
        href="https://www.leboncoin.fr/recherche/?category=10&locations=Paris__48.85790400439863_2.358842071208555_10000&real_estate_type=2"
        target="_blank"
      >
        <div class="item-content">
          <img src="@/assets/images/logo-leboncoin.png" alt="logo-leboncoin" />
          <p>LeBoncoin</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a
        href="https://www.loueragile.fr/alert?token=9c61de8a9f85f36f7f54338bf2ef52c1"
        target="_blank"
      >
        <div class="item-content">
          <img src="@/assets/images/logo-loueragile.png" alt="logo-loueragile" />
          <p>Louer Agile</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a href="https://www.pap.fr/annonce/locations-appartement-paris-75-g439" target="_blank">
        <div class="item-content">
          <img src="@/assets/images/logo-pap.png" alt="logo-pap" />
          <p>PAP</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a
        href="https://immobilier.lefigaro.fr/annonces/resultat/annonces.html?transaction=location&location=Paris&type=appartement,atelier,chambre,chambre%20d%20hote,duplex,loft"
        target="_blank"
      >
        <div class="item-content">
          <img src="@/assets/images/logo-figaroimmo.png" alt="logo-figaroimmo" />
          <p>Le Figaro Immo</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a
        href="https://www.orpi.com/recherche/rent?realEstateTypes%5B%5D=appartement&locations%5B0%5D%5Bvalue%5D=paris-metropole&locations%5B0%5D%5Blabel%5D=Paris+-+M%C3%A9tropole&maxPrice=&sort=date-down&layoutType=mixte"
        target="_blank"
      >
        <div class="item-content">
          <img src="@/assets/images/logo-orpi.png" alt="logo-orpi" />
          <p>Orpi</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a
        href="https://www.seloger.com/list.htm?projects=1,3&types=1&places=[{cp:75}]&enterprise=0&qsVersion=1.0"
        target="_blank"
      >
        <div class="item-content">
          <p>SeLoger*</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a
        href="https://www.logic-immo.com/location-immobilier-paris-75,100_1/options/groupprptypesids=1,2,6,7,12"
        target="_blank"
      >
        <div class="item-content">
          <p>LogicImmo*</p>
        </div>
      </a>
    </li>
    <p>
      <span class="asterisque">* Marques déposées appartenant au groupe SeLoger</span>
    </p>
  </ul>
</template>

<script>
export default {
  name: "WebsiteList"
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.website-list {
  margin: 0;
}

.website-list a {
  display: flex;
  flex: 1;
  text-decoration: none;
}

.website-list li {
  background-color: $deepgrey;
  height: 82px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  font-weight: 500;
  transition: background-color ease 0.3s;

  &:hover {
    background-color: $darkerdeepgrey;
  }
}

.website-list li:last-child {
  margin-bottom: 0;
}

.website-list .asterisque {
  font-size: 12px;
}

li .item-content {
  display: flex;
  flex-direction: row;
  height: auto;
  align-items: center;
  padding: 0 32px;
}

.item-content img,
.item-content svg {
  width: 24px;
  height: 24px;
  margin-right: 16px;
}

.item-content p {
  margin: 0;
  color: $lightgrey;
}
</style>