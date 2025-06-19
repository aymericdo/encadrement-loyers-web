<template>
  <div class="container">
    <BounceLoader
      class="spinner"
      :loading="!isGraphLoaded"
      color="#fdcd56"
      :size="'60px'"
    />
    <div
      v-if="isGraphLoaded && !errorMessage.length"
      :id="id"
      class="graph"
    />
    <div
      v-if="isGraphLoaded && errorMessage.length"
      class="error-message"
    >
      <span v-if="errorMessage === 'not_enough_data'">
        Pas assez de données
      </span>
    </div>
  </div>
</template>

<script setup>
  import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
  import { timeFormatLocale, formatLocale } from "@/tools/vegaFormatLocale";
  import vegaEmbed from "vega-embed";
  import { domain } from "@/helper/config";
  import {
    onMounted,
    onBeforeUnmount,
    ref,
    toRefs,
  } from "vue";

  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
  });

  const emits = defineEmits([
    'errorOutput',
  ])

  const {
    id,
  } = toRefs(props);

  const isGraphLoaded = ref(false);
  const errorMessage = ref('');

  const controller = ref(new AbortController());

  const VEGA_COMMON = {
    tooltip: {
      theme: "dark",
    },
    actions: false,
  };

  onMounted(() => {
    onFetchGraph();
  });

  onBeforeUnmount(() => {
    controller.value.abort();
  });

  const onFetchGraph = () => {
    errorMessage.value = '';
    isGraphLoaded.value = false;
    controller.value.abort();
    controller.value = new AbortController();

    fetch(
      `${domain}stats/${id.value}/france`,
      {
        signal: controller.value.signal,
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "token expired") {
          throw res;
        } else if (res.message === 'not_enough_data') {
          errorMessage.value = res.message
        } else {
          return res;
        }
      })
      .then((spec) => {
        if (controller.value.signal.aborted) return;

        isGraphLoaded.value = true;
        setTimeout(async () => {
          const width = document.getElementById(id.value).clientWidth;
          const height = document.getElementById(id.value).clientHeight;

          await vegaEmbed(`#${id.value}`, spec, {
            ...VEGA_COMMON,
            width: width < 500 ? 500 : width,
            height,
            formatLocale,
            timeFormatLocale,
          });
        });
      })
      .catch((err) => {
        emits("errorOutput", err);
      });
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
