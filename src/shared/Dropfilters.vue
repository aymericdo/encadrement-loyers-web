<template>
  <div class="dropfilters">
    <button @click="onOpen()" :class="{ '-is-open': isOpen }">
      <span>Filtre</span>
      <ArrowIcon class="arrow-icon" :class="{ '-is-open': isOpen }"></ArrowIcon>
    </button>
    <transition name="slide-down">
      <div class="option-list" v-if="isOpen" :style="cssVars">
        <div class="row">
          <span class="label">Surface</span>
          <span>
            <Slider
              v-model="surfaceValue"
              :min="9"
              :max="100"
              :format="{ suffix: 'm²', decimals: 0 }"
            />
          </span>
        </div>
        <div class="row">
          <span class="label">Nombre de pièce(s)</span>
          <span>
            <Slider
              v-model="roomValue"
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
              :currentValue="furnishedValue"
              @onSelect="furnishedValue = $event.value">
            </Dropdown>
          </span>
        </div>
        <div class="row">
          <span class="label">Localisation</span>
          <span>
            <MultiDropdown
              class="dropdown"
              :options="districtDropdownOptions"
              :currentValues="districtValues"
              @onSelect="districtValuesChanged($event)">
            </MultiDropdown>
          </span>
        </div>
        <button class="submit-btn" @click="onSubmit()">Filtrer</button>
      </div>
    </transition>
  </div>
</template>

<script>
import ArrowIcon from "@/icons/ArrowIcon.vue";
import Slider from "@vueform/slider";
import Dropdown from "@/shared/Dropdown.vue";
import MultiDropdown from "@/shared/MultiDropdown.vue";

import "@vueform/slider/themes/default.css";

export default {
  name: "Dropfilters",
  props: {
    city: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
    },
  },
  computed: {
    cssVars() {
      return {
        '--width': `${this.width}px`,
      };
    }
  },
  mounted: function() {
    this.fetchDistricts();
  },
  beforeUnmount: function() {
    this.controller.abort();
  },
  watch: {
    city: function() {
      this.fetchDistricts();
    },
  },
  components: {
    ArrowIcon,
    Slider,
    Dropdown,
    MultiDropdown,
  },
  data() {
    return {
      controller: new AbortController(),
      isOpen: false,
      currentValueDisplay: "",
      surfaceValue: [9, 100],
      roomValue: [1, 6],
      furnishedDropdownOptions: [{
        value: "all",
        label: "Tout",
      }, {
        value: "furnished",
        label: "Meublé",
      }, {
        value: "nonFurnished",
        label: "Non meublé",
      }],
      furnishedValue: 'all',
      districtDropdownOptions: [],
      districtValues: [],
    };
  },
  methods: {
    onOpen: function() {
      this.isOpen = !this.isOpen;
    },
    onSubmit: function(opt) {
      this.isOpen = false;
      this.$emit("onSubmit", opt);
    },
    roomValueFct: function(value) {
      return `${value} pièce${(value > 1 ? 's' : '')}`
    },
    districtValuesChanged: function(opt) {
      if (this.districtValues.some(value => value === opt.value)) {
        this.districtValues = this.districtValues.filter(value => value !== opt.value)
      } else {
        this.districtValues = [...this.districtValues, opt.value]
      }
    },
    fetchDistricts: function() {
      fetch(`${this.$domain}stats/district-list/${this.city}`, {
        signal: this.controller.signal,
      })
        .then((res) => res.json())
        .then((res) => {
          this.districtDropdownOptions = res.map(district => ({
            value: district.toLowerCase(),
            label: district,
          }))
        })
        .catch((err) => {
          this.serverError = this.getErrorMessage(err);
          this.status = "error";
        });
    },
  },
};
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

  &:hover {
    border: solid white 2px;
  }
}

.dropfilters > button.-is-open {
  border: solid white 2px;
}

.dropfilters > button > span {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 180px;
}

.arrow-icon {
  margin-left: 4px;
  transition: transform ease 0.3s;
}

.arrow-icon.-is-open {
  transform: rotate(180deg);
}

.option-list {
  position: absolute;
  max-height: 250px;
  overflow-y: auto;
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

@media screen and (max-width: $mobileSize) {
  .option-list {
    width: var(--width);
  }

  .option-list > .row {
    flex-direction: column;
  }

  .option-list > .row > span.label {
    margin-bottom: 36px;
  }

  .option-list > .row > span {
    width: 100%;
  }
}

.option-list > .row > span.label {
  min-width: 200px;
}

.option-list > .row > span {
  flex: 1;
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
  border-color: $yellow;
  line-height: 16px;
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

  &:hover {
    border: solid white 2px;
  }
}

.option:hover {
  color: $yellow;
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
</style>
