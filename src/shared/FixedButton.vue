<template>
  <button>
    <slot />
  </button>
</template>

<script>
export default {
  name: "FixedButton"
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

button {
  position: fixed;
  display: flex;
  justify-content: center;
  background-color: $yellow;
  font-weight: 600;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border-color: transparent;
  cursor: pointer;
  z-index: 1;

  & > svg {
    display: flex;
    align-self: center;
  }
}

#map {
  max-width: 100%;
}
</style>
