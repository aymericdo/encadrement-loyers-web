<template>
  <ul class="website-list">
    <li class="website-item">
      <a href="https://www.leboncoin.fr/locations/offres/" target="blank">
        <div class="item-content">
          <img src="@/assets/images/logo-leboncoin.png" alt="logo-leboncoin" />
          <p>LeBoncoin</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a href="https://www.seloger.com/location.htm" target="blank">
        <div class="item-content">
          <img src="@/assets/images/logo-seloger.png" alt="logo-seloger" />
          <p>SeLoger</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a href="https://www.loueragile.fr/" target="blank">
        <div class="item-content">
          <img src="@/assets/images/logo-loueragile.png" alt="logo-loueragile" />
          <p>Louer Agile</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a href="https://www.pap.fr/annonce/locations" target="blank">
        <div class="item-content">
          <img src="@/assets/images/logo-pap.png" alt="logo-pap" />
          <p>PAP</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a href="https://www.logic-immo.com/location-immobilier.php" target="blank">
        <div class="item-content">
          <img src="@/assets/images/logo-logicimmo.png" alt="logo-logicimmo" />
          <p>Logic Immo</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a href="https://immobilier.lefigaro.fr/annonces/location" target="blank">
        <div class="item-content">
          <img src="@/assets/images/logo-figaroimmo.png" alt="logo-figaroimmo" />
          <p>Le Figaro Immo</p>
        </div>
      </a>
    </li>
    <li class="website-item">
      <a href="https://www.orpi.com/louer/" target="blank">
        <div class="item-content">
          <img src="@/assets/images/logo-orpi.png" alt="logo-orpi" />
          <p>Orpi</p>
        </div>
      </a>
    </li>
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
  transition: background-color 0.7s cubic-bezier(0.455, 0.03, 0.515, 0.955);

  &:hover {
    background-color: $darkerdeepgrey;
  }
}

.website-list li:last-child {
  margin-bottom: 0;
}

li .item-content {
  display: flex;
  flex-direction: row;
  height: auto;
  align-items: center;
  padding: 0 32px;
}

.item-content img {
  width: 24px;
  height: 24px;
  margin-right: 16px;
}

.item-content p {
  margin: 0;
  color: $lightgrey;
}
</style>