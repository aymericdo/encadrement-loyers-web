<template>
  <div class="container">
    <Spinner
      :speed="0.5"
      line-fg-color="#fdcd56"
      size="large"
      v-if="!isGraphLoaded"
      class="spinner"
    />
    <div
      v-if="isGraphLoaded"
      :id="id"
      class="graph"
    ></div>
  </div>
</template>

<script>
import Spinner from "vue-simple-spinner";
import vegaEmbed from "vega-embed";

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
    }
  },
  components: {
    Spinner,
  },
  mounted: function() {
    this.onFetchGraph();
  },
  beforeDestroy: function() {
    this.controller.abort();
  },
  data() {
    return {
      controller: new AbortController(),
      isGraphLoaded: false,
    }
  },
  methods: {
    onFetchGraph: function() {
      fetch(`${this.$domain}stats/${this.id}/${this.city}`, {
        signal: this.controller.signal,
      })
        .then((res) => res.json())
        .then((spec) => {
          if (this.controller.signal.aborted) return;

          this.isGraphLoaded = true;
          setTimeout(() => {
            const width = document.getElementById(this.id)
              .clientWidth;
            const height = document.getElementById(this.id)
              .clientHeight;
            vegaEmbed(`#${this.id}`, spec, {
              ...VEGA_COMMON,
              width: width < 500 ? 500 : width,
              height,
            });
          });
        })
        .catch((err) => {
          this.$emit('errorOutput', err)
        });
    },
  },
}
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