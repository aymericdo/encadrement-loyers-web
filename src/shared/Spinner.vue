<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="width"
    :height="height"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <path
      d="M10 50A40 40 0 0 0 90 50A40 42.5 0 0 1 10 50"
      fill="#fdcd56"
      stroke="none"
      transform="rotate(295.274 50 51.25)"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        dur="1s"
        repeatCount="indefinite"
        keyTimes="0;1"
        values="0 50 51.25;360 50 51.25"
      />
    </path>
  </svg>
</template>
<script>
export default {
  name: "Spinner",
  props: {
    width: {
      type: [Number, String],
      default: 100
    },
    height: {
      type: [Number, String],
      default: 100
    }
  }
};
</script>
