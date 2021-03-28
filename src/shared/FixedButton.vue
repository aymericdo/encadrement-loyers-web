<template>
  <button class="-blink" v-bind:class="{ '-bounce': bounce }">
    <slot />
  </button>
</template>

<script>
export default {
  name: "FixedButton",
  props: {
    bounce: {
      type: [Boolean],
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

button {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $yellow;
  font-weight: 600;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border-color: transparent;
  cursor: pointer;
  z-index: 1;
  transition: background-color ease 0.3s;

  &.-blink {
    animation: blink 1s linear infinite;
  }

  &.-bounce {
    animation: blink 1s linear infinite, bounce-5 20s ease infinite;
    animation-delay: 0s, 2s;
  }

  &:hover {
    border: solid white 2px;
  }

  & > svg {
    display: flex;
    align-self: center;
  }
}

@keyframes bounce-5 {
  0%   { transform: scale(1,1)    translateY(0); }
  1%  { transform: scale(1.1,.9) translateY(0); }
  3%  { transform: scale(.9,1.1) translateY(-100px); }
  5%  { transform: scale(1,1)    translateY(0); }
  5.7%  { transform: scale(1,1)    translateY(-7px); }
  6.4%  { transform: scale(1,1)    translateY(0); }
  10% { transform: scale(1,1)    translateY(0); }
}

@keyframes blink {  
  0% { background-color: $yellow; }
  50% { background-color: $darkeryellow; }
  100% { background-color: $yellow; }
}

#map {
  max-width: 100%;
}
</style>
