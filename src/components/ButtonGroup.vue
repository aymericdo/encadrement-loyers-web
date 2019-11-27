<template>
  <div class="button-group" v-bind:class="{ '-firefox': isFirefox }">
    <a
      href="https://chrome.google.com/webstore/detail/encadrement/nkmghhgmpbngkbjnhpomddeglkpkkfeo?hl=fr"
      target="_blank"
    >
      <button id="chrome">
        <ChromeIcon :width="'20px'" :height="'20px'" :iconColor="isFirefox ? '#fff' : '#050505'" />Installer sur Chrome
      </button>
    </a>
    <a href="https://addons.mozilla.org/fr/firefox/addon/encadrement/" target="_blank">
      <button id="firefox">
        <FirefoxIcon :width="'20px'" :height="'20px'" :iconColor="isFirefox ? '#050505' : '#fff'" />Installer sur Firefox
      </button>
    </a>
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

.button-group.-firefox {
  justify-content: left;
  flex-direction: row-reverse;
}

@media screen and (max-width: $mobileSize) {
  .button-group {
    display: none;
  }
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

@media screen and (max-width: $mobileSize) {
  .button-group button {
    height: inherit;
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