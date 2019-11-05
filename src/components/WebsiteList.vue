<template>
  <ul class="websiteList">
    <li class="websiteItem">
      <div class="itemContent">
        <img src="../assets/images/icon--chrome.svg" alt="-logo">
        <p>LeBoncoin</p>
      </div>
    </li>
    <li class="websiteItem">
      <div class="itemContent">
        <img src="../assets/images/icon--chrome.svg" alt="-logo">
        <p>SeLegoer</p>
      </div>
    </li>
    <li class="websiteItem">
      <div class="itemContent">
        <img src="../assets/images/icon--chrome.svg" alt="-logo">
        <p>Louer Agile</p>
      </div>
    </li>
    <li class="websiteItem">
      <div class="itemContent">
        <img src="../assets/images/icon--chrome.svg" alt="-logo">
        <p>PAP</p>
      </div>
    </li>
    <li class="websiteItem">
      <div class="itemContent">
        <img src="../assets/images/icon--chrome.svg" alt="-logo">
        <p>Logic Immo</p>
      </div>
    </li>
    <li class="websiteItem">
      <div class="itemContent">
        <img src="../assets/images/icon--chrome.svg" alt="-logo">
        <p>Le Figaro Immobilier</p>
      </div>
    </li>
    <li class="websiteItem">
      <div class="itemContent">
        <img src="../assets/images/icon--chrome.svg" alt="-logo">
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

<style>
.websiteList li{
  width: 100%;
  background-color: #0F0F0F;
  height: 82px;
  padding: 0 32px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  font-weight: 500;
}

li .itemContent{
  display: flex;
  flex-direction: row;
  height: auto;
  justify-self: center;
}

.itemContent img{
  width: 24px;
  height: 24px;
  margin-right: 16px;
}

.itemContent p{
  margin: 0;
}
</style>