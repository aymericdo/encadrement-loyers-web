<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Garnett", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #9e9e9e;
  display: flex;
  flex-direction: row;
  background-color: #050505;
  width: 100vw;
  justify-content: center;
  font-size: 22px;
  letter-spacing: -0.23px;
  line-height: 34px;
}

.section-title h3 {
  font-weight: 700;
  font-size: 38px;
  color: #f7f7f5;
  letter-spacing: -0.31px;
  line-height: 52px;
}

.section {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 160px 0 0 0;
}

.section-title {
  max-width: 248px;
  width: 100%;
}

.right-part {
  margin-left: 56px;
  max-width: 552px;
  width: 100%;
}

@media screen and (max-width: 870px) {
  .section {
    flex-direction: column;
  }

  .right-part {
    margin-left: 0;
  }
}
</style>
