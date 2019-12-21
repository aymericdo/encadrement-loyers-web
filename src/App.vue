<template>
  <div id="app">
    <router-view />
    <audio ref="asymetrie">
      <source src="@/assets/sounds/asymetrie.mp3" type="audio/mp3" />
    </audio>
    <audio ref="hommepresse">
      <source src="@/assets/sounds/hommepresse.mp3" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      hits: []
    };
  },
  mounted: function() {
    document.addEventListener("keydown", event => {
      if (event.keyCode === 65) {
        this.hits.push({
          event: 65,
          date: Date.now()
        });

        if (
          this.hits.every(hit => hit.event === 65) &&
          this.hits[4].date - this.hits[0].date < 600
        ) {
          this.$refs.asymetrie.play();
        }
      } else if (event.keyCode === 90) {
        this.hits.push({
          event: 90,
          date: Date.now()
        });

        if (
          this.hits.every(hit => hit.event === 90) &&
          this.hits[4].date - this.hits[0].date < 600
        ) {
          this.$refs.hommepresse.play();
        }
      }

      if (this.hits.length > 5) {
        this.hits.shift();
      }
    });
  }
};
</script>

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
  font-size: 1rem;
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
