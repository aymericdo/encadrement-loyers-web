<template>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="default">
        Filtres
        <span v-if="filtersCount > 0" class="badge-count">{{
          filtersCount
        }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-80">
      <form class="p-4 space-y-4" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="surface">
          <FormItem>
            <FormLabel>Surface</FormLabel>
            <FormControl>
              <DualRangeSlider
                v-model="optionValues.surfaceValue"
                :label="(value) => `${value} m²`"
                :min="9"
                :max="100"
                :step="1"
                :defaultValue="[9, 100]"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="rooms">
          <FormItem>
            <FormLabel>Nombre de pièce(s)</FormLabel>
            <FormControl>
              <DualRangeSlider
                v-model="optionValues.roomValue"
                :label="roomValueFct"
                :min="1"
                :max="6"
                :step="1"
                :defaultValue="[1, 6]"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="furnished">
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

        <FormField
          v-if="city !== 'all'"
          v-slot="{ componentField }"
          name="districts"
        >
          <FormItem>
            <FormLabel>Localisation</FormLabel>
            <Select
              v-model="optionValues.districtValues"
              :options="furnishedDropdownOptions"
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup
                  :key="group.groupBy"
                  v-for="group in districtDropdownOptions"
                >
                  <SelectLabel>{{ group.groupBy }}</SelectLabel>
                  <SelectItem
                    :key="value"
                    v-for="{ label, value } in group.options"
                    :value="value"
                  >
                    {{ label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <!-- <MultiSelect
              v-model="optionValues.districtValues"
              :options="districtDropdownOptions"
              @update:modelValue="districtValuesChanged"
            /> -->
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="particulier">
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

<script>
import { domain } from "@/helper/config";
import ArrowIcon from "@/icons/ArrowIcon.vue";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { DualRangeSlider } from "@/shadcn/ui/dual-range-slider";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn/ui/form";
// import { MultiSelect } from "@/shadcn/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Slider } from "@/shadcn/ui/slider";

import Dropdown from "@/shared/Dropdown.vue";
import MultiDropdown from "@/shared/MultiDropdown.vue";
// import Slider from "@vueform/slider";
import { defineComponent, onMounted, ref, toRefs, watch } from "vue";

import "@vueform/slider/themes/default.css";

export default defineComponent({
  name: "Dropfilters",
  props: {
    city: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
    },
    filtersCount: {
      type: Number,
    },
  },
  beforeUnmount: function () {
    this.controller.abort();
  },
  components: {
    ArrowIcon,
    StrokeIcon,
    Slider,
    Dropdown,
    MultiDropdown,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    FormControl,
    FormDescription,
    DualRangeSlider,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Button,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    // MultiSelect,
  },
  setup(props) {
    const { options, city } = toRefs(props);

    const controller = new AbortController();
    const districtDropdownOptions = ref([]);
    const optionValues = ref({ ...options.value });

    const fetchDistricts = () => {
      fetch(`${domain}districts/list/${city.value}`, {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "token expired") {
            throw res;
          } else {
            return res;
          }
        })
        .then((res) => {
          const groupedOptions = res.reduce((acc, district) => {
            if (!acc[district.groupBy]) {
              acc[district.groupBy] = [];
            }
            acc[district.groupBy].push({
              value: district.value,
              label: district.label,
            });
            return acc;
          }, {});
          // districtDropdownOptions.value = groupedOptions;
          districtDropdownOptions.value = Object.keys(groupedOptions).map(
            (groupBy) => ({
              groupBy,
              options: groupedOptions[groupBy],
            })
          );
        })
        .catch((err) => {
          console.error(err);
        });
    };

    watch(
      () => props.city,
      (newValue) => {
        if (newValue !== "all") {
          fetchDistricts();
        }
        options.value.districtValues = [];
      }
    );

    watch(
      () => props.options,
      (newValue) => {
        optionValues.value = newValue;
      }
    );

    onMounted(() => {
      if (city.value !== "all") {
        fetchDistricts();
      }
    });

    return {
      controller,
      isOpen: ref(false),
      optionValues,
      furnishedDropdownOptions: [
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
      ],
      particulierDropdownOptions: [
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
      ],
      districtDropdownOptions,
    };
  },
  methods: {
    onOpen: function () {
      this.isOpen = !this.isOpen;
      this.$emit("onDropFilterOpeningChanged", this.isOpen);
    },
    onReset: function () {
      this.isOpen = false;
      this.$emit("onReset");
    },
    onSubmit: function () {
      this.isOpen = false;
      this.$emit("onSubmit", {
        districtValues: this.optionValues.districtValues,
        furnishedValue: this.optionValues.furnishedValue,
        surfaceValue: this.optionValues.surfaceValue,
        roomValue: this.optionValues.roomValue,
        isParticulierValue: this.optionValues.isParticulierValue,
      });
    },
    roomValueFct: function (value) {
      return `${value} pièce${value > 1 ? "s" : ""}`;
    },
    districtValuesChanged: function (opts) {
      if (opts.length < 2) {
        const opt = opts[0];
        if (
          this.optionValues.districtValues.some((value) => value === opt.value)
        ) {
          this.optionValues.districtValues =
            this.optionValues.districtValues.filter(
              (value) => value !== opt.value
            );
        } else {
          this.optionValues.districtValues = [
            ...this.optionValues.districtValues,
            opt.value,
          ];
        }
      } else {
        if (
          opts.every((opt) =>
            this.optionValues.districtValues.some(
              (value) => value === opt.value
            )
          )
        ) {
          this.optionValues.districtValues =
            this.optionValues.districtValues.filter(
              (value) => !opts.map((o) => o.value).includes(value)
            );
        } else {
          this.optionValues.districtValues = [
            ...this.optionValues.districtValues,
            ...opts
              .map((o) => o.value)
              .filter(
                (v) =>
                  !this.optionValues.districtValues.some((value) => value === v)
              ),
          ];
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.dropfilters {
  position: relative;
  width: 100%;
}

.overlay {
  background: rgba(19, 15, 64, 0.4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 2;
  overflow: hidden;
}

.dropfilters > button {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $yellow;
  font-weight: 600;
  height: 36px;
  border-radius: 4px;
  font-size: 1rem;
  padding: 6px 12px;
  border-color: transparent;
  transition: background-color ease 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border: solid white 2px;
    }
  }
}

.dropfilters > button.dropdown-btn {
  width: 100%;
}

.dropfilters > button.dropdown-btn > .badge-count {
  position: absolute;
  top: -14px;
  left: -14px;
  border-radius: 50%;
  background-color: white;
  color: $deepblack;
  width: 24px;
  height: 24px;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid $lightgrey 1px;
}

.dropfilters > button.-is-open {
  border: solid white 2px;
}

.dropfilters > button > span {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.arrow-icon {
  margin-left: 4px;
  transition: transform ease 0.3s;
}

.arrow-icon.-is-open {
  transform: rotate(-180deg);
}

.dropfilters > button.mobile-back-btn {
  display: none;
}

.option-list {
  position: absolute;
  margin-top: 4px;
  box-sizing: border-box;
  width: 500px;
  padding: 8px 14px;
  background-color: $deepblack;
  border-radius: 4px;
  border: 1px solid white;
  z-index: 5;
}

.option-list > .row {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 16px 0;
}

.option-list > .row > span:first-child {
  width: 30%;
}

.option-list > .row > span:last-child {
  width: 70%;
}

.option-list > .row .dropdown {
  display: flex;
  justify-content: center;
}

.option-list > .row .dropdown :deep(button) {
  width: 100%;
}

.option-list > .row :deep(.slider-target .slider-connect) {
  background: $yellow;
}

.option-list > .row :deep(.slider-target .slider-tooltip) {
  background: $deepblack;
  color: white;
  border-color: $yellow;
  line-height: 16px;
  top: 24px;
  bottom: inherit;
}

.option-list > .row :deep(.slider-target .slider-tooltip::before) {
  top: -10px;
  transform: translate(-50%) rotate(180deg);
}

.row.actions-btn {
  display: flex;
  justify-content: flex-end;
}

.reset-btn {
  display: flex;
  align-self: flex-end;
  color: white;
  display: flex;
  justify-content: center;
  font-weight: 400;
  background-color: black;
  cursor: pointer;
  font-weight: 600;
  border-radius: 4px;
  font-size: 14px;
  padding: 6px 12px;
  border-color: transparent;
  transition: all ease 0.3s;
  margin-right: 0.875rem;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border: solid white 2px;
    }
  }
}

.submit-btn {
  display: flex;
  align-self: flex-end;
  color: $deepblack;
  display: flex;
  justify-content: center;
  font-weight: 400;
  background-color: $yellow;
  cursor: pointer;
  font-weight: 600;
  border-radius: 4px;
  font-size: 14px;
  padding: 6px 12px;
  border-color: transparent;
  transition: all ease 0.3s;
  float: right;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border: solid white 2px;
    }
  }
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all ease 400ms;
}

@media screen and (max-width: $mobileSize) {
  .dropfilters > button.mobile-back-btn.-is-open {
    z-index: 3;
    position: fixed;
    top: 1em;
    right: 1em;
    display: block;
  }

  .option-list {
    width: 100vw;
    height: 100vh;
    position: fixed;
    padding: 2rem;
    top: 0;
    left: 0;
    z-index: 2;
    margin-top: 0;
    border: none;
    overflow-y: auto;
  }

  .option-list > .row:not(.actions-btn) {
    flex-direction: column;
  }

  .option-list > .row > span.label {
    font-weight: 500;
  }

  .option-list > .row > span:first-child {
    margin-bottom: 0.5rem;
  }

  .option-list > .row > span.slider {
    margin-bottom: 1.5rem;
  }

  .option-list > .row > span:first-child,
  .option-list > .row > span:last-child {
    width: 100%;
  }
}

.badge-count {
  @apply absolute -top-2 -left-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm font-medium text-black;
}
</style>
