<template>
  <div>
    <div v-if="!loading" ref="recaptcha"></div>
    <half-circle-spinner
      :animation-duration="1000"
      color="#fdcd56"
      :size="120"
      class="spinner"
      v-if="loading"
    />
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";

export default {
  name: "GoogleRecaptcha",
  components: {
    HalfCircleSpinner,
  },
  data() {
    return {
      recaptcha: null,
      loading: true,
    };
  },
  props: {
    siteKey: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: false,
      default: "normal",
    },
    theme: {
      type: String,
      required: false,
      default: "light",
    },
    show: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    renderRecaptcha() {
      this.loading = false;
      setTimeout(() => {
        this.recaptcha = window.grecaptcha.render(this.$refs.recaptcha, {
          sitekey: this.siteKey,
          theme: this.theme,
          size: this.size,
          tabindex: this.tabindex,
          callback: (response) => this.$emit("verify", response),
          "expired-callback": () => this.$emit("expire"),
          "error-callback": () => this.$emit("fail"),
        })
      });
    },
    reset() {
      window.grecaptcha.reset(this.recaptcha);
    },
  },
  beforeMount() {
    if (window.grecaptcha == null) {
      new Promise((resolve) => {
        window.recaptchaReady = function() {
          resolve();
        };

        const doc = window.document;
        const scriptId = "recaptcha-script";
        const scriptTag = doc.createElement("script");
        scriptTag.id = scriptId;
        scriptTag.setAttribute(
          "src",
          "https://www.google.com/recaptcha/api.js?onload=recaptchaReady&render=explicit"
        );
        doc.head.appendChild(scriptTag);
      }).then(() => {
        this.renderRecaptcha();
      });
    } else {
      this.renderRecaptcha();
    }
  },
};
</script>
