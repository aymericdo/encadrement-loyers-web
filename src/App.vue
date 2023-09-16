<template>
  <div id="app-component">
    <router-view />
    <audio ref="asymetrie">
      <source src="@/assets/sounds/asymetrie.mp3" type="audio/mp3" />
    </audio>
    <audio ref="hommepresse">
      <source src="@/assets/sounds/hommepresse.mp3" type="audio/mp3" />
    </audio>
    <audio ref="gstaad">
      <source src="@/assets/sounds/gstaad.mp3" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      hits: [],
    };
  },
  mounted: function() {
    const sounds = {
      a: this.$refs.asymetrie,
      h: this.$refs.hommepresse,
      g: this.$refs.gstaad,
    };

    document.addEventListener("keydown", (event) => {
      const eventCode = event.key;
      this.hits.push({
        event: eventCode,
        date: Date.now(),
      });

      if (
        this.hits.length > 4 &&
        this.hits.every((hit) => hit.event === eventCode) &&
        this.hits[4].date - this.hits[0].date < 600
      ) {
        if (eventCode === "g") {
          this.$route.name === "stats" &&
            sounds[eventCode] &&
            sounds[eventCode].play();
        } else {
          sounds[eventCode] && sounds[eventCode].play();
        }
      }

      if (this.hits.length > 5) {
        this.hits.shift();
      }
    });
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/garnett.scss";
@import "@/assets/scss/variables.scss";

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

ul li {
  list-style: none;
}

a,
a:visited {
  color: $yellow;
  transition: color ease 0.3s;

  &:hover {
    color: $darkeryellow;
  }
}

p {
  margin: 0;
}

button:focus {
  outline-style: none !important;
  box-shadow: none !important;
  border-color: transparent;
}
</style>
