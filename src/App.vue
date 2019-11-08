<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/garnett.scss";
@import "@/assets/scss/variables.scss";

#app {
  font-family: "Garnett", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $lightgrey;
  display: flex;
  flex-direction: row;
  background-color: $deepblack;
  width: 100%;
  justify-content: center;
  font-size: 22px;
  letter-spacing: -0.23px;
  line-height: 34px;
}

html,
body {
  background-color: $deepblack;
  margin: 0;
}

ul li {
  list-style: none;
}

a,
a:visited {
  color: $yellow !important;
}

p {
  margin: 0;
}

button:focus {
  outline-style: none !important;
  box-shadow: none !important;
  border-color: transparent;
}

.section {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 160px 0 0 0;
}

.right-part {
  margin-left: 56px;
  max-width: 552px;
  width: 100%;
}

@media screen and (max-width: 856px) {
  .section {
    flex-direction: column;
    margin: 88px 0 0 0;
  }

  .right-part {
    margin-left: 0;
  }
}
</style>
