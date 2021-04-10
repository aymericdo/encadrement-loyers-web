<template>
  <div class="dropfilters">
    <button
      class="dropdown-btn"
      @click="onOpen()"
      :class="{ '-is-open': isOpen }"
    >
      <span>Filtres</span>
      <span v-if="filtersCount > 0" class="badge-count">{{
        filtersCount
      }}</span>
      <ArrowIcon class="arrow-icon" :class="{ '-is-open': isOpen }"></ArrowIcon>
    </button>
    <button
      class="mobile-back-btn"
      :class="{ '-is-open': isOpen }"
      @click="onOpen()"
    >
      <StrokeIcon></StrokeIcon>
    </button>
    <transition name="slide-down">
      <div class="option-list" v-if="isOpen">
        <div class="row">
          <span class="label">Surface</span>
          <span class="slider">
            <Slider
              v-model="optionValues.surfaceValue"
              :min="9"
              :max="100"
              :format="{ suffix: 'm²', decimals: 0 }"
            />
          </span>
        </div>
        <div class="row">
          <span class="label">Nombre de pièce(s)</span>
          <span class="slider">
            <Slider
              v-model="optionValues.roomValue"
              :min="1"
              :max="6"
              :format="roomValueFct"
            />
          </span>
        </div>
        <div class="row">
          <span class="label">Meublé</span>
          <span>
            <Dropdown
              class="dropdown"
              :options="furnishedDropdownOptions"
              :currentValue="optionValues.furnishedValue"
              @onSelect="optionValues.furnishedValue = $event.value"
            >
            </Dropdown>
          </span>
        </div>
        <div class="row">
          <span class="label">Localisation</span>
          <span>
            <MultiDropdown
              class="dropdown"
              :options="districtDropdownOptions"
              :currentValues="optionValues.districtValues"
              @onSelect="districtValuesChanged($event)"
            >
            </MultiDropdown>
          </span>
        </div>
        <div class="row actions-btn">
          <button class="reset-btn" @click="onReset">Reset</button>
          <button class="submit-btn" @click="onSubmit">Go</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ArrowIcon from "@/icons/ArrowIcon.vue";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import Slider from "@vueform/slider";
import Dropdown from "@/shared/Dropdown.vue";
import MultiDropdown from "@/shared/MultiDropdown.vue";
import { domain } from "@/helper/config";
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
  beforeUnmount: function() {
    this.controller.abort();
  },
  components: {
    ArrowIcon,
    StrokeIcon,
    Slider,
    Dropdown,
    MultiDropdown,
  },
  setup(props) {
    const { options, city } = toRefs(props);

    const controller = new AbortController();
    const districtDropdownOptions = ref([]);
    const optionValues = ref({ ...options.value });

    const fetchDistricts = () => {
      fetch(`${domain}stats/district-list/${city.value}`, {
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
          districtDropdownOptions.value = res.map((district) => ({
            value: district,
            label: district,
          }));
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
      fetchDistricts();
    });

    return {
      controller,
      isOpen: ref(false),
      optionValues,
      cityDropdownOptions: [
        {
          value: "all",
          label: "Tout",
        },
        {
          value: "paris",
          label: "Paris",
        },
        {
          value: "lille",
          label: "Lille",
        },
      ],
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
      districtDropdownOptions,
    };
  },
  methods: {
    onOpen: function() {
      this.isOpen = !this.isOpen;
      this.$emit("onDropFilterChanged", this.isOpen);
    },
    onReset: function() {
      this.isOpen = false;
      this.$emit("onReset");
    },
    onSubmit: function() {
      this.isOpen = false;
      this.$emit("onSubmit", {
        districtValues: this.optionValues.districtValues,
        furnishedValue: this.optionValues.furnishedValue,
        surfaceValue: this.optionValues.surfaceValue,
        roomValue: this.optionValues.roomValue,
      });
    },
    roomValueFct: function(value) {
      return `${value} pièce${value > 1 ? "s" : ""}`;
    },
    districtValuesChanged: function(opt) {
      if (
        this.optionValues.districtValues.some((value) => value === opt.value)
      ) {
        this.optionValues.districtValues = this.optionValues.districtValues.filter(
          (value) => value !== opt.value
        );
      } else {
        this.optionValues.districtValues = [
          ...this.optionValues.districtValues,
          opt.value,
        ];
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

.dropfilters {
  position: relative;
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
  font-size: 20px;
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
  transform: rotate(180deg);
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
  z-index: 1;
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
  background-color: $lightgrey;
  cursor: pointer;
  font-weight: 600;
  border-radius: 4px;
  font-size: 14px;
  padding: 6px 12px;
  border-color: transparent;
  transition: background-color ease 0.3s;
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
  transition: background-color ease 0.3s;
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
  transition-property: opacity, transform;
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
</style>
