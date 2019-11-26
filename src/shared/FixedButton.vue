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
  transition: background-color 0.7s cubic-bezier(0.455, 0.03, 0.515, 0.955);

  &:hover {
    background-color: $darkeryellow;
  }

  & > svg {
    display: flex;
    align-self: center;
  }
}

#map {
  max-width: 100%;
}
</style>
