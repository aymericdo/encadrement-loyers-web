<template>
  <svg
    :width="width"
    :height="height"
    viewBox="-100 -100 500 500">
    <g>
      <circle fill="#222222" cx="150" cy="150" r="250" />
    </g>
    <g>
      <path style="fill:#FFFFFF;" d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
    </g> 
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
  });

  const {
    width,
    height,
  } = toRefs(props);
</script>
