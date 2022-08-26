<template>
  <div class="hero-header">
    <div class="hero-heading">
      <h1>
        <div>
          <router-link to="video" class="yellow-text">
            Encadrement
          </router-link>
        </div>
        est une extension pour vous aider dans votre recherche de location à
        <div class="city-word">
          <span :class="`typing ${cities[currentCity].id}`">
            <span class="uno">{{
              city.slice(0, cities[currentCity].text.length / 3)
            }}</span>
            <span class="dos">{{
              city.slice(
                cities[currentCity].text.length / 3,
                (cities[currentCity].text.length / 3) * 2
              )
            }}</span>
            <span class="tres">{{
              city.slice(
                (cities[currentCity].text.length / 3) * 2,
                cities[currentCity].text.length
              )
            }}</span> </span
          >|
        </div>
      </h1>
      <h2>
        Vérifiez si les annonces sont conformes ou non à la loi de l’encadrement
        des loyers.
      </h2>
    </div>
    <ButtonGroup />
  </div>
</template>

<script>
import ButtonGroup from "./ButtonGroup";
export default {
  name: "Hero",
  components: {
    ButtonGroup,
  },
  data: function() {
    return {
      currentCity: 0,
      currentLetter: 0,
      cities: [
        { id: "paris", text: "Paris." },
        { id: "lille", text: "Lille." },
        { id: "plaineCommune", text: "Plaine Commune." },
        { id: "estEnsemble", text: "Est Ensemble." },
        { id: "lyon", text: "Lyon." },
        { id: "montpellier", text: "Montpellier." },
        { id: "bordeaux", text: "Bordeaux." },
      ],
      city: "",
      interval: null,
    };
  },
  mounted: function() {
    this.writeCity(250);
  },
  beforeUnmount: function() {
    clearInterval(this.interval);
  },
  methods: {
    writeCity: function(speed) {
      this.interval = setInterval(() => {
        this.city += this.cities[this.currentCity].text[this.currentLetter];
        this.currentLetter += 1;

        if (this.currentLetter > 2) {
          clearInterval(this.interval);
          this.writeCity(150);
        }

        if (this.cities[this.currentCity].text.length < this.currentLetter) {
          clearInterval(this.interval);
          setTimeout(() => {
            this.currentLetter = 0;
            this.currentCity = (this.currentCity + 1) % this.cities.length;
            this.city = "";
            this.writeCity(400);
          }, 500);
        }
      }, speed);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.hero-heading {
  max-width: $mobileSize;
  width: 100%;
}
.hero-heading h1 {
  font-weight: 700;
  font-style: normal;
  font-size: 3.875rem;
  color: #fff;
  letter-spacing: -0.5px;
  line-height: 78px;
  margin-bottom: 24px;
}

.hero-heading h2 {
  font-weight: 500;
  font-style: normal;
  font-size: 1.375rem;
  color: $lightgrey;
  letter-spacing: -0.02px;
  line-height: 32px;
}

@media screen and (max-width: $mobileSize) {
  .hero-heading h1 {
    font-size: 2.5rem;
    line-height: 48px;
  }

  .hero-heading h2 {
    font-size: 1.125rem;
    line-height: 28px;
  }
}

.city-word .typing.paris {
  > span.uno {
    color: #26a1ff;
  }

  > span.tres {
    color: #ffaca6;
  }
}

.city-word .typing.lille {
  > .uno {
    color: #e01e13;
  }

  > .tres {
    color: #e01e13;
  }
}

.city-word .typing.plaineCommune {
  > .uno {
    color: #71c828;
  }

  > .dos {
    -webkit-text-stroke: 2px white;
    color: black;
  }

  > .tres {
    color: #71c828;
  }
}

.city-word .typing.estEnsemble {
  > .uno {
    color: #d0033b;
  }

  > .dos {
    -webkit-text-stroke: 2px white;
    color: black;
  }

  > .tres {
    color: #d0033b;
  }
}

.city-word .typing.montpellier {
  > .uno {
    color: #eb590c;
  }

  > .dos {
    color: #b2c909;
  }

  > .tres {
    color: #973f93;
  }
}

.city-word .typing.bordeaux {
  > .uno {
    color: #d30039;
  }

  > .tres {
    color: #004b9d;
  }
}

.city-word .typing.lyon {
  > .uno {
    color: #2a56d8;
  }

  > .tres {
    color: #d82525;
  }
}

.yellow-text {
  color: $yellow;
  display: inline-block;
  text-decoration: none;

  &::after {
    content: "";
    position: relative;
    background-color: $yellow;
    width: 100%;
    height: 4px;
    left: 0;
    display: flow-root;
  }

  &:hover {
    color: $darkeryellow;

    &::after {
      background-color: $darkeryellow;
    }
  }
}
</style>
