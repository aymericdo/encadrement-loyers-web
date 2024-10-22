<template>
  <div class="container">
    <bounce-loader class="spinner" :loading="!isGraphLoaded" color="#fdcd56" :size="'60px'"></bounce-loader>
    <div v-if="isGraphLoaded && !errorMessage.length" :id="id" class="graph"></div>
    <div class="error-message" v-if="isGraphLoaded && errorMessage.length">
      <span v-if="errorMessage === 'not_enough_data'">
        Pas assez de données
      </span>
    </div>
  </div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
import { timeFormatLocale, formatLocale } from "../tools/vegaFormatLocale";
import vegaEmbed from "vega-embed";
import { domain } from "@/helper/config";

const VEGA_COMMON = {
  tooltip: {
    theme: "dark",
  },
  actions: false,
  // not working héhé
  // width: 'container',
};

export default {
  name: "Graph",
  props: {
    id: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: false,
    },
    options: {
      type: Object,
      default: null,
    },
  },
  components: {
    BounceLoader,
  },
  mounted: function() {
    this.onFetchGraph();
  },
  watch: {
    city: function() {
      this.onFetchGraph();
    },
    date: function() {
      this.onFetchGraph();
    },
    options: function() {
      this.onFetchGraph();
    },
  },
  beforeUnmount: function() {
    this.controller.abort();
  },
  data() {
    return {
      controller: new AbortController(),
      isGraphLoaded: false,
      errorMessage: '',
    };
  },
  methods: {
    onFetchGraph: function() {
      this.isGraphLoaded = false;
      this.controller.abort();
      this.controller = new AbortController();

      const optionParams = {
        ...this.options,
      };

      if (this.date) {
        optionParams["dateValue"] = this.date;
      }

      const strOptions = optionParams
        ? Object.keys(optionParams)
            .map((key) => {
              return key + "=" + optionParams[key];
            })
            .join("&")
        : null;

      fetch(
        `${domain}stats/${this.id}/${this.city}${
          strOptions ? "?" + strOptions : ""
        }`,
        {
          signal: this.controller.signal,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "token expired") {
            throw res;
          } else if (res.message === 'not_enough_data') {
            this.errorMessage = res.message
          } else {
            return res;
          }
        })
        .then((spec) => {
          if (this.controller.signal.aborted) return;

          this.isGraphLoaded = true;
          setTimeout(() => {
            const width = document.getElementById(this.id).clientWidth;
            const height = document.getElementById(this.id).clientHeight;
            vegaEmbed(`#${this.id}`, spec, {
              ...VEGA_COMMON,
              width: width < 500 ? 500 : width,
              height,
              formatLocale,
              timeFormatLocale,
            });
          });
        })
        .catch((err) => {
          this.$emit("errorOutput", err);
        });
    },
  },
};
</script>

<style scoped>
.graph {
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
}

.container {
  position: relative;
  display: flex;
  justify-content: center;
  border: 1px white solid;
  border-radius: 4px;
  max-width: 100%;
  width: 100%;
  height: 100%;
}

.error-message {
  display: flex;
  align-items: center;
}

.spinner {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
