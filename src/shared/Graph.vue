<template>
  <div class="container">
    <half-circle-spinner
      :animation-duration="1000"
      color="#fdcd56"
      :size="60"
      v-if="!isGraphLoaded"
      class="spinner"
    />
    <div v-if="isGraphLoaded" :id="id" class="graph"></div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from "epic-spinners";
import { timeFormatLocale, formatLocale } from "../tools/vegaFormatLocale";
import vegaEmbed from "vega-embed";
import { domain } from "@/helper/config";

const VEGA_COMMON = {
  tooltip: {
    theme: "dark",
  },
  actions: true,
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
    HalfCircleSpinner,
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

.spinner {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>
