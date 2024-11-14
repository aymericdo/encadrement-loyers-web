<template>
  <div class="input">
    <div class="button">
      <input
        class="main-input"
        ref="myinput"
        @input="onTyping"
        :min="min" :max="max"
        :type="type"
        :placeholder="placeholder"
        :value="currentValue"
      />
      <span>{{ suffix }}</span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, toRefs } from "vue";

const props = defineProps({
  type: String,
  placeholder: String,
  currentValue: Number,
  min: Number,
  max: Number,
  suffix: String,
});

const emit = defineEmits([
  'onTyping',
])

const {
  type,
  placeholder,
  currentValue,
  min,
  max,
  suffix,
} = toRefs(props);

const onTyping = (opt) => {
  if (opt.target.value > max.value) {
    opt.target.value = max.value;
  } else if (opt.target.value < min.value) {
    opt.target.value = min.value;
  }

  emit('onTyping', opt.target.value)
}

</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

.input {
  position: relative;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0; 
}

.input > div.button {
  cursor: pointer;
  display: flex;
  position: relative;
  align-items: center;
  background-color: $yellow;
  font-weight: 600;
  height: 36px;
  width: 100%;
  border-radius: 4px;
  font-size: 1rem;
  padding: 6px 12px;
  border-color: transparent;
  transition: background-color ease 0.3s;
  box-sizing: border-box;
  color: black;
}

.main-input {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  padding-right: 1em;
  border: 0;
  background: transparent;
  font-weight: bold;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
}

@media (hover: hover) and (pointer: fine) {
  .input > div.button:hover {
    box-shadow: 0 0 0 1px white;
  }
}
</style>
