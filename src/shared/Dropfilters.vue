<template>
  <DropdownMenu :open="isOpen" @update:open="isOpen = $event">
    <DropdownMenuTrigger asChild>
      <Button variant="default" class="hover:bg-accent hover:text-accent-foreground">
        Filtres
        <span v-if="filtersCount > 0" class="badge-count">{{
          filtersCount
        }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="absolute w-80">
      <form class="p-4 space-y-6" @submit.prevent="onSubmit">
        <FormField name="surface">
          <FormItem>
            <FormLabel>Surface (m²)</FormLabel>
            <FormControl>
              <DualRangeSlider
                v-model="optionValues.surfaceValue"
                :label="(value) => value"
                labelPosition="bottom"
                :min="9"
                :max="100"
                :step="1"
                :defaultValue="[9, 100]"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="rooms">
          <FormItem>
            <FormLabel>Nombre de pièce(s)</FormLabel>
            <FormControl>
              <DualRangeSlider
                v-model="optionValues.roomValue"
                :label="(value) => value"
                labelPosition="bottom"
                :min="1"
                :max="6"
                :step="1"
                :defaultValue="[1, 6]"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField name="furnished">
          <FormItem>
            <FormLabel>Meublé</FormLabel>
            <Select
              v-model="optionValues.furnishedValue"
              :options="furnishedDropdownOptions"
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="option in furnishedDropdownOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        </FormField>

        <FormField name="particulier">
          <FormItem>
            <FormLabel>Particulier</FormLabel>
            <Select
              v-model="optionValues.isParticulierValue"
              :options="particulierDropdownOptions"
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  v-for="option in particulierDropdownOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        </FormField>

        <div class="flex justify-between mt-4">
          <Button type="button" variant="outline" @click="onReset">
            Réinitialiser
          </Button>
          <Button type="submit">Appliquer</Button>
        </div>
      </form>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
import { domain } from "@/helper/config";
import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { DualRangeSlider } from "@/shadcn/ui/dual-range-slider";
import { FormControl, FormField, FormItem, FormLabel } from "@/shadcn/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";

import { ref, toRefs, watch } from "vue";

import "@vueform/slider/themes/default.css";

const props = defineProps({
  city: String,
  options: Object,
  filtersCount: Number,
});

const emits = defineEmits([
  "onDropFilterOpeningChanged",
  "onReset",
  "onSubmit",
]);

const { options, filtersCount } = toRefs(props);

const optionValues = ref({ ...options.value });
const isOpen = ref(false);
const furnishedDropdownOptions = ref([
  {
    value: "all",
    label: "Tout",
  },
  {
    value: "furnished",
    label: "Meublé",
  },
  {
    value: "nonFurnished",
    label: "Non meublé",
  },
]);

const particulierDropdownOptions = ref([
  {
    value: "all",
    label: "Tout",
  },
  {
    value: "true",
    label: "Particulier",
  },
  {
    value: "false",
    label: "Agence",
  },
]);

watch(
  () => props.options,
  (newValue) => {
    optionValues.value = newValue;
  }
);

const onReset = () => {
  isOpen.value = false;
  emits("onReset");
};

const onSubmit = () => {
  isOpen.value = false;
  emits("onSubmit", {
    furnishedValue: optionValues.value.furnishedValue,
    surfaceValue: optionValues.value.surfaceValue,
    roomValue: optionValues.value.roomValue,
    isParticulierValue: optionValues.value.isParticulierValue,
  });
};
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

.badge-count {
  @apply absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm font-medium text-black;
}
</style>
