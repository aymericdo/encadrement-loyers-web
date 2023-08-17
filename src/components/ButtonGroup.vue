<template>
  <div class="button-row">
    <div class="button-group -only-laptop" v-bind:class="{ '-firefox': isFirefox }">
      <a
        href="https://chrome.google.com/webstore/detail/encadrement/nkmghhgmpbngkbjnhpomddeglkpkkfeo?hl=fr"
        target="_blank"
      >
        <button id="chrome">
          <ChromeIcon :width="'20px'" :height="'20px'" :iconColor="isFirefox ? '#fff' : '#050505'" />Installez sur Chrome
        </button>
      </a>
      <a href="https://addons.mozilla.org/fr/firefox/addon/encadrement/" target="_blank">
        <button id="firefox">
          <FirefoxIcon :width="'20px'" :height="'20px'" :iconColor="isFirefox ? '#050505' : '#fff'" />Installez sur Firefox
        </button>
      </a>
    </div>
    <div class="button-group simulator">
      <h3 class="-only-mobile">
        Revenez sur votre ordinateur pour télécharger l'extension 😉,
        et en attendant...
      </h3>
      <router-link to="/simulator">
        <button id="simulator">
          Vérifiez votre loyer
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import FirefoxIcon from "@/icons/FirefoxIcon.vue";
import ChromeIcon from "@/icons/ChromeIcon.vue";

export default {
  name: "ButtonGroup",
  components: {
    FirefoxIcon,
    ChromeIcon
  },
  data: function() {
    return {
      isFirefox: typeof InstallTrigger !== "undefined"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.button-group {
  display: flex;
  flex-direction: row;
  margin-top: 88px;
}

.button-row {
  display: flex;
  flex-direction: row;
}

.button-group.simulator {
  position: relative;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  > h3 {
    text-align: center;
  }

  &::after {
    content: '';
    width: 0;
    height: 80%;
    position: absolute;
    border: 1px solid $lightgrey;
    top: 50%;
    left: -1rem;
    transform: translate(-50%, -50%);
  }
}

.button-group.-firefox {
  justify-content: left;
  flex-direction: row-reverse;
}

.button-group a {
  text-decoration: none;
}

.button-group:not(.-firefox) a:first-child,
.button-group.-firefox a:last-child {
  margin-right: 24px;
}

.button-group button {
  display: flex;
  align-items: center;
  font-family: inherit;
  height: 56px;
  width: auto;
  padding: 0 24px;
  color: #fff;
  border-radius: 10px;
  background-color: $deepgrey;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  color: #fff;
  letter-spacing: -0.06px;
  line-height: 24px;
  cursor: pointer;
  transition: background-color ease 0.3s;

  &:hover {
    background-color: $darkerdeepgrey;
  }

  & > svg {
    margin-right: 16px;
  }
}

.-only-mobile {
  display: none;
}

@media screen and (max-width: $mobileSize) {
  .button-group {
    margin-top: 12px;

  }
  
  .button-group.simulator {
    margin-left: 0;
    &::after {
      display: none;
    }
  }

  .-only-laptop {
    display: none;

    button {
      height: inherit;
    }
  }

  .-only-mobile {
    display: block;
  }
}

.button-group:not(.-firefox) a:first-child button,
.button-group.-firefox a:last-child button {
  background-color: $yellow;
  color: $deepblack;

  &:hover {
    background-color: $darkeryellow;
  }
}
</style>