<template>
  <div id="app-component">
    <router-view />

    <audio ref="asymetrie">
      <source
        src="@/assets/sounds/asymetrie.mp3"
        type="audio/mp3"
      >
    </audio>

    <audio ref="gstaad">
      <source
        src="@/assets/sounds/gstaad.mp3"
        type="audio/mp3"
      >
    </audio>
  </div>
</template>

<script setup>
  import {
    onMounted,
    ref,
  } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();

  const hits = ref([]);
  const asymetrie = ref(null);
  const gstaad = ref(null);

  onMounted(() => {
    const sounds = {
      a: asymetrie.value,
      g: gstaad.value,
    };

    document.addEventListener("keydown", (event) => {
      const eventCode = event.key;
      hits.value.push({
        event: eventCode,
        date: Date.now(),
      });

      if (
        hits.value.length > 4 &&
        hits.value.every((hit) => hit.event === eventCode) &&
        hits.value[4].date - hits.value[0].date < 600
      ) {
        if (eventCode === "g") {
          route.name === "statsCity" &&
            sounds[eventCode] &&
            sounds[eventCode].play();
        } else {
          sounds[eventCode] && sounds[eventCode].play();
        }
      }

      if (hits.value.length > 5) {
        hits.value.shift();
      }
    });
  });
</script>

<style lang="scss">
@use "@/assets/scss/garnett.scss" as *;
@use "@/assets/scss/variables.scss" as *;

#app-component {
  font-family: "Garnett", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $lightgrey;
  display: flex;
  flex-direction: row;
  background-color: $deepblack;
  width: 100%;
  height: 100%;
  justify-content: center;
  font-size: 1rem;
  letter-spacing: -0.23px;
  line-height: 34px;
}

html,
body {
  margin: 0;
}
</style>
