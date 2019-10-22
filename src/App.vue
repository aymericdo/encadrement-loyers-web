<template>
  <div id="app">
    <TopBar />
    <Body />
  </div>
</template>

<script>
import Body from "./components/Body.vue";
import TopBar from "./components/TopBar.vue";

export default {
  name: "app",
  components: {
    Body,
    TopBar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
