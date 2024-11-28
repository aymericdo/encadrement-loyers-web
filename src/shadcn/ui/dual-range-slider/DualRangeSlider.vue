<template>
  <SliderRoot
    :class="
      cn(
        'relative flex w-full touch-none select-none items-center data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-2 data-[orientation=vertical]:h-full',
        props.class
      )
    "
    v-bind="forwarded"
  >
    <SliderTrack
      class="relative h-2 w-full data-[orientation=vertical]:w-2 grow overflow-hidden rounded-full bg-secondary"
    >
      <SliderRange
        class="absolute h-full data-[orientation=vertical]:w-full bg-primary"
      />
    </SliderTrack>
    <SliderThumb
      v-for="(value, index) in initialValue"
      :key="index"
      class="relative block w-5 h-5 transition-colors border-2 rounded-full border-primary bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    >
      <span
        v-if="props.label"
        :class="
          cn(
            'absolute flex w-full justify-center text-xs',
            props.labelPosition === 'top' ? '-top-7' : 'top-4'
          )
        "
      >
        {{ props.label(value) }}
      </span>
    </SliderThumb>
  </SliderRoot>
</template>

<script setup>
import { cn } from "@/lib/utils";
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  useForwardPropsEmits,
} from "radix-vue";
import { computed } from "vue";

const props = defineProps({
  name: { type: String, required: false },
  defaultValue: { type: Array, required: false },
  modelValue: { type: Array, required: false },
  disabled: { type: Boolean, required: false },
  orientation: { type: String, required: false },
  dir: { type: String, required: false },
  inverted: { type: Boolean, required: false },
  min: { type: Number, required: false },
  max: { type: Number, required: false },
  step: { type: Number, required: false },
  minStepsBetweenThumbs: { type: Number, required: false },
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
  class: { type: null, required: false },
  labelPosition: { type: String, default: "top" },
  label: { type: Function, required: false },
});
const emits = defineEmits(["update:modelValue", "valueCommit"]);

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;
  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const initialValue = computed(() => {
  return Array.isArray(props.modelValue)
    ? props.modelValue
    : [props.min, props.max];
});
</script>
