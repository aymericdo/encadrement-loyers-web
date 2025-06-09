<template>
  <div class="button-row">
    <div
      class="button-group -only-laptop"
      :class="{ '-firefox': isFirefox }"
    >
      <a
        href="https://chrome.google.com/webstore/detail/encadrement/nkmghhgmpbngkbjnhpomddeglkpkkfeo?hl=fr"
        target="_blank"
      >
        <button id="chrome">
          <ChromeIcon
            :width="'20px'"
            :height="'20px'"
            :icon-color="isFirefox ? '#fff' : '#050505'"
          />Installez sur Chrome
        </button>
      </a>
      <a
        href="https://addons.mozilla.org/fr/firefox/addon/encadrement/"
        target="_blank"
      >
        <button id="firefox">
          <FirefoxIcon
            :width="'20px'"
            :height="'20px'"
            :icon-color="isFirefox ? '#050505' : '#fff'"
          />Installez sur Firefox
        </button>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FirefoxIcon from "@/icons/FirefoxIcon.vue";
import ChromeIcon from "@/icons/ChromeIcon.vue";

const isFirefox = ref(typeof InstallTrigger !== "undefined")
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

.button-group {
  display: flex;
  flex-direction: row;
}

.button-row {
  display: flex;
  flex-direction: row;
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

  .button-row {
    border-radius: 8px;
    background: white;
    padding-bottom: 1rem;
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

  h3.-only-mobile {
    color: black;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1.5rem;
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