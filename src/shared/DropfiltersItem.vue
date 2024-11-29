<template>
  <DropdownMenu
    :open="isOpen"
    @update:open="isOpen = $event"
  >
    <DropdownMenuTrigger as-child>
      <Button
        variant="default"
        class="hover:bg-accent hover:text-accent-foreground"
      >
        Filtres
        <span
          v-if="filtersCount > 0"
          class="badge-count"
        >{{
          filtersCount
        }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-screen md:absolute md:w-80 lg:w-96">
      <form
        class="p-4 space-y-6"
        @submit="onSubmit"
      >
        <FormField
          v-slot="{ componentField }"
          name="surface"
        >
          <FormItem class="pb-4">
            <FormLabel>Surface (m²)</FormLabel>
            <FormControl>
              <DualRangeSlider
                v-bind="componentField"
                :label="(value) => value"
                label-position="bottom"
                :min="9"
                :max="100"
                :step="1"
                :default-value="[9, 100]"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="rooms"
        >
          <FormItem class="pb-4">
            <FormLabel>Nombre de pièce(s)</FormLabel>
            <FormControl>
              <DualRangeSlider
                v-bind="componentField"
                :label="(value) => value"
                label-position="bottom"
                :min="1"
                :max="6"
                :step="1"
                :default-value="[1, 6]"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField }"
          name="furnished"
        >
          <FormItem>
            <FormLabel>Meublé</FormLabel>
            <Select
              v-bind="componentField"
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

        <FormField
          v-slot="{ componentField }"
          name="particulier"
        >
          <FormItem>
            <FormLabel>Particulier</FormLabel>
            <Select
              v-bind="componentField"
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
          <Button
            type="button"
            variant="outline"
            @click="onReset"
          >
            Réinitialiser
          </Button>
          <Button type="submit">
            Appliquer
          </Button>
        </div>
      </form>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup>
import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { DualRangeSlider } from "@/shadcn/ui/dual-range-slider";
import { FormControl, FormField, FormItem, FormLabel } from "@/shadcn/ui/form";
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { useForm } from 'vee-validate'
import { ref, toRefs, watch } from "vue";

import "@vueform/slider/themes/default.css";

const props = defineProps({
  city: String,
  options: Object,
});

const emits = defineEmits([
  "onReset",
  "onSubmit",
]);

const { options } = toRefs(props);

const filtersCount = ref(0);

const formSchema = toTypedSchema(z.object({
  surface: z.number().array(),
  rooms: z.number().array(),
  furnished: z.string(),
  particulier: z.string(),
}))

const initialValues = {
  surface: options.value.surfaceValue,
  rooms: options.value.roomValue,
  furnished: options.value.furnishedValue,
  particulier: options.value.isParticulierValue,
}

const form = useForm({
  initialValues,
  validationSchema: formSchema,
})

const currentFormValues = ref({ ...initialValues });

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
  () => isOpen.value,
  (newValue) => {
    if (newValue) {
      form.setValues({
        ...currentFormValues.value,
      })
    }
  }
);

const setFiltersCount = () => {
  let cpt = 0;
  Object.keys(currentFormValues.value).forEach((key) => {
    if (
      JSON.stringify(currentFormValues.value[key]) !==
      JSON.stringify(initialValues[key])
    ) {
      cpt += 1;
    }
  });

  filtersCount.value = cpt;
};

const onReset = () => {
  isOpen.value = false;
  currentFormValues.value = { ...initialValues };

  setFiltersCount();
  emits("onReset");
};

const onSubmit = form.handleSubmit((values) => {
  isOpen.value = false;
  currentFormValues.value = { ...values };

  setFiltersCount();

  emits("onSubmit", {
    furnishedValue: values.furnished,
    surfaceValue: values.surface,
    roomValue: values.rooms,
    isParticulierValue: values.particulier,
  });
})
</script>

<style lang="scss" scoped>
.badge-count {
  @apply absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm font-medium text-black;
}
</style>
