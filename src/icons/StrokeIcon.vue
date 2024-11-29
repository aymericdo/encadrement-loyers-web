<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 10 10"
  >
    <path
      :fill="iconColor"
      fill-rule="evenodd"
      d="M9.756 1.364a.784.784 0 0 0 0-1.137.868.868 0 0 0-1.169-.001L5 3.682 1.413.227A.868.868 0 0 0 .243.226a.786.786 0 0 0 0 1.137l3.582 3.45L.244 8.265a.784.784 0 0 0 0 1.137c.156.15.363.234.583.234.223 0 .43-.083.586-.234L5 5.945l3.587 3.456c.156.15.363.234.582.234a.836.836 0 0 0 .586-.233.782.782 0 0 0 0-1.138l-3.58-3.45 3.58-3.45z"
    />
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
      default: "#050505",
    },
  });

  const {
    width,
    height,
    iconColor,
  } = toRefs(props);
</script>