<template>
  <div id="simulator">
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper v-if="isMounted">
        <div class="option-list">
          <div class="row">
            <span class="label">Ville</span>
            <span>
              <Dropdown
                class="dropdown"
                :options="cityDropdownOptions"
                :currentValue="optionValues.cityValue"
                @onSelect="optionValues.cityValue = $event.value"
              >
              </Dropdown>
            </span>
          </div>
          <div class="row">
            <span class="label">Prix (hors charges</span>
            <span class="slider">
              <Slider
                :modelValue="optionValues.priceValue"
                :min="200"
                :max="3000"
                :step="5"
                :format="{ suffix: '€', decimals: 0 }"
                @change="optionValues.priceValue = $event"
              />
            </span>
          </div>
          <div class="row">
            <span class="label">Surface</span>
            <span class="slider">
              <Slider
                :modelValue="optionValues.surfaceValue"
                :min="9"
                :max="100"
                :format="{ suffix: 'm²', decimals: 0 }"
                @change="optionValues.surfaceValue = $event"
              />
            </span>
          </div>
          <div class="row">
            <span class="label">Nombre de pièce(s)</span>
            <span class="slider">
              <Slider
                :modelValue="optionValues.roomValue"
                :min="1"
                :max="6"
                :format="roomValueFct"
                @change="optionValues.roomValue = $event"
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
          <div class="row" v-if="districtDropdownOptions.length">
            <span class="label">Localisation</span>
            <span>
              <Input
                class="dropdown input"
                :options="addressDropdownOptions"
                :currentValue="optionValues.addressValue"
                :textTyped="optionValues.addressTyped"
                @onTyping="handleSearchingAddress"
                @onSelect="handleAddressSelect($event)"
              >
              </Input>
              <Dropdown
                class="dropdown"
                :options="districtDropdownOptions"
                :currentValue="optionValues.districtValue"
                @onSelect="optionValues.districtValue = $event.value"
              >
              </Dropdown>
            </span>
          </div>
          <div v-if="simulationResult !== null">
            {{ simulationResult.isLegal ? "conforme" : "non conforme" }}
          </div>
          <div class="row actions-btn">
            <button class="reset-btn" @click="onReset">Reset</button>
          </div>
        </div>
      </Page2Wrapper>
    </transition>
    <div @click="unmount">
      <FixedButton>
        <StrokeIcon :width="'20px'" :height="'20px'" />
      </FixedButton>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import Dropdown from "@/shared/Dropdown.vue";
import Input from "@/shared/Input.vue";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import Slider from "@vueform/slider";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import FixedButton from "@/shared/FixedButton.vue";
import { domain } from "@/helper/config";

import "@vueform/slider/themes/default.css";

export default {
  name: "Simulator",
  components: {
    Dropdown,
    FixedButton,
    Page2Wrapper,
    Slider,
    Input,
    StrokeIcon,
  },
  setup() {
    const controller = new AbortController();
    const isMounted = ref(false);

    const initialOptionValues = {
      surfaceValue: 20,
      priceValue: 1000,
      roomValue: 2,
      furnishedValue: "furnished",
      addressValue: "",
      addressTyped: "",
      districtValue: "",
      cityValue: "paris",
    };

    const optionValues = reactive({
      ...initialOptionValues,
    });

    const districtDropdownOptions = ref([]);
    const addressDropdownOptions = ref([]);
    const simulationResult = ref(null);

    const fetchDistricts = () => {
      fetch(`${domain}districts/list/${optionValues.cityValue}`, {
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
            groupBy: district.groupBy,
            value: district.value,
            label: district.value,
          }));
        })
        .catch((err) => {
          console.error(err);
        });
    };

    watch(
      () => optionValues.cityValue,
      (newOptionValues, prevOptionValues) => {
        if (newOptionValues !== prevOptionValues) {
          fetchDistricts();
          optionValues.districtValue = "";
          optionValues.addressValue = "";
        }
      }
    );

    watch(
      () => [
        optionValues.surfaceValue,
        optionValues.priceValue,
        optionValues.roomValue,
        optionValues.furnishedValue,
        optionValues.districtValue,
        optionValues.cityValue,
      ],
      () => {
        if (
          optionValues.surfaceValue &&
          optionValues.priceValue &&
          optionValues.roomValue &&
          optionValues.furnishedValue &&
          optionValues.districtValue &&
          optionValues.cityValue
        ) {
          const optionParams = {
            surfaceValue: optionValues.surfaceValue,
            priceValue: optionValues.priceValue,
            roomValue: optionValues.roomValue,
            furnishedValue: optionValues.furnishedValue,
            districtValue: optionValues.districtValue,
          };

          const strOptions = optionParams
            ? Object.keys(optionParams)
                .map((key) => {
                  return key + "=" + optionParams[key];
                })
                .join("&")
            : null;

          fetch(
            `${domain}simulator/${optionValues.cityValue}${
              strOptions ? "?" + strOptions : ""
            }`,
            {
              signal: controller.signal,
            }
          )
            .then((res) => res.json())
            .then((res) => {
              if (res.message === "token expired") {
                throw res;
              } else {
                return res;
              }
            })
            .then((res) => {
              simulationResult.value = res;
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }
    );

    onMounted(() => {
      fetchDistricts();
      isMounted.value = true;
    });

    onBeforeUnmount(() => {
      controller.abort();
    });

    return {
      controller: new AbortController(),
      simulationResult,
      isMounted,
      optionValues,
      initialOptionValues,
      cityDropdownOptions: [
        {
          value: "paris",
          label: "Paris",
        },
        {
          value: "lille",
          label: "Lille",
        },
        {
          value: "plaine_commune",
          label: "Plaine Commune",
        },
      ],
      furnishedDropdownOptions: [
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
      addressDropdownOptions,
      timeoutRef: null,
    };
  },
  methods: {
    leave: function() {
      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 400);
    },
    roomValueFct: function(value) {
      return `${value} pièce${value > 1 ? "s" : ""}`;
    },
    unmount: function() {
      this.isMounted = false;
    },
    handleSearchingAddress: function(address) {
      this.optionValues.districtValue = "";
      this.optionValues.addressValue = "";
      this.optionValues.addressTyped = address;

      if (this.timeoutRef !== null) {
        clearTimeout(this.timeoutRef);
      }

      this.timeoutRef = setTimeout(() => {
        fetch(
          `${domain}districts/address/${this.optionValues.cityValue}?q=${address}`,
          {
            signal: this.controller.signal,
          }
        )
          .then((res) => res.json())
          .then((res) => {
            if (res.message === "token expired") {
              throw res;
            } else {
              return res;
            }
          })
          .then((res) => {
            this.addressDropdownOptions = res.map((a) => ({
              value: a.fields.l_adr,
              label: a.fields.l_adr,
              district: a.districtName,
            }));
          })
          .catch((err) => {
            console.error(err);
          });
      }, 500);
    },
    handleAddressSelect: function(event) {
      this.optionValues.addressValue = event.value;
      this.optionValues.districtValue = event.district;
    },
    onReset: function() {
      Object.assign(this.optionValues, this.initialOptionValues);
      this.addressDropdownOptions = [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#simulator {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

:deep(.center-wrapper) {
  align-items: flex-start;
  text-align: justify;
  box-sizing: border-box;
  padding: 124px;

  @media screen and (max-width: $mobileSize) {
    padding: 124px 16px;
  }

  ul li {
    list-style: inherit;
  }
}

.option-list {
  margin-top: 4px;
  box-sizing: border-box;
  width: 100%;
  padding: 8px 14px;
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

.option-list > .row .dropdown.input {
  margin-bottom: 0.625rem;
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
  transition: background-color ease 0.3s;

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

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all ease 400ms;
}
</style>
