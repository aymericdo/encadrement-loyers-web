<script setup>
import { cn } from "@/lib/utils";
import { PopoverTrigger } from 'radix-vue';

const props = defineProps({
  asChild: { type: Boolean, required: false },
  as: { type: null, required: false },
});
</script>

<template>
  <PopoverTrigger
    v-bind="props"
    :class="
      cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background text-primary font-bold px-3 py-2 text-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:truncate text-start',
        props.class
      )
    ">
    <slot />
  </PopoverTrigger>
</template>
