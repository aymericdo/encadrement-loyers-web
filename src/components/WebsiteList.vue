<template>
  <ul class="website-list">
    <li class="website-item">
      <div class="item-content">
        <img src="@/assets/images/logo-leboncoin.png" alt="-logo" />
        <p>LeBoncoin</p>
      </div>
    </li>
    <li class="website-item">
      <div class="item-content">
        <img src="@/assets/images/logo-seloger.png" alt="-logo" />
        <p>SeLoger</p>
      </div>
    </li>
    <li class="website-item">
      <div class="item-content">
        <img src="@/assets/images/logo-loueragile.png" alt="-logo" />
        <p>Louer Agile</p>
      </div>
    </li>
    <li class="website-item">
      <div class="item-content">
        <img src="@/assets/images/logo-pap.png" alt="-logo" />
        <p>PAP</p>
      </div>
    </li>
    <li class="website-item">
      <div class="item-content">
        <img src="@/assets/images/logo-logicimmo.png" alt="-logo" />
        <p>Logic Immo</p>
      </div>
    </li>
    <li class="website-item">
      <div class="item-content">
        <img src="@/assets/images/logo-figaroimmo.png" alt="-logo" />
        <p>Le Figaro Immobilier</p>
      </div>
    </li>
    <li class="website-item">
      <div class="item-content">
        <img src="@/assets/images/logo-orpi.png" alt="-logo" />
        <p>Orpi</p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "WebsiteList",
  props: {}
};
</script>

<style scoped>
.website-list li {
  background-color: #0f0f0f;
  height: 82px;
  padding: 0 32px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  font-weight: 500;
}

li .item-content {
  display: flex;
  flex-direction: row;
  height: auto;
  align-items: center;
}

.item-content img {
  width: 24px;
  height: 24px;
  margin-right: 16px;
}

.item-content p {
  margin: 0;
}
</style>