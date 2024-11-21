<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 10 12">
    <defs>
      <path
        id="a"
        d="M1.511 2.384c.556 0 1.011.46 1.011 1.023v7.07A1.02 1.02 0 0 1 1.511 11.5 1.02 1.02 0 0 1 .5 10.476V3.407a1.02 1.02 0 0 1 1.011-1.023zM5.105.5l.11.006c.505.056.902.492.902 1.018v8.952A1.02 1.02 0 0 1 5.105 11.5a1.02 1.02 0 0 1-1.01-1.024V1.524A1.02 1.02 0 0 1 5.105.5zM8.49 5.576c.556 0 1.011.46 1.011 1.023v3.877A1.02 1.02 0 0 1 8.489 11.5a1.02 1.02 0 0 1-1.011-1.024V6.6a1.02 1.02 0 0 1 1.01-1.023z"
      />
    </defs>
    <use :fill="iconColor" fill-rule="evenodd" xlink:href="#a" />
  </svg>
</template>

<script setup>
  import {
    toRefs,
  } from "vue";

  const props = defineProps({
    width: {
      type: [Number, String],
      default: 18,
    },
    height: {
      type: [Number, String],
      default: 18,
    },
    iconColor: {
      type: String,
      default: "#050505"
    }
  });

  const {
    width,
    height,
  } = toRefs(props);
</script>
