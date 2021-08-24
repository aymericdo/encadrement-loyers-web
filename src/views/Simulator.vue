<template>
  <div id="simulator">
    <transition name="slide-fade" v-on:leave="leave">
      <Page2Wrapper v-if="isMounted">
        <div class="option-list">
          <transition name="slide-side-r2l">
            <div key="1" v-if="!displayMoreInfo" class="global-content">
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
              <div v-if="hasHouse" class="row">
                <span class="label">Maison</span>
                <span>
                  <Dropdown
                    class="dropdown"
                    :options="isHouseValueDropdownOptions"
                    :currentValue="optionValues.isHouseValue"
                    @onSelect="optionValues.isHouseValue = $event.value"
                  >
                  </Dropdown>
                </span>
              </div>
              <div class="row">
                <span class="label">Prix (hors charges)</span>
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
              <div class="row">
                <span class="label">Date de construction</span>
                <span class="slider">
                  <Slider
                    :modelValue="optionValues.dateBuiltValue"
                    :min="-1"
                    :max="possibleDateYearsCount"
                    :format="getDateBuiltValue"
                    @change="setDateBuiltValue"
                  />
                </span>
              </div>
              <div class="row" v-if="districtDropdownOptions.length">
                <span class="label">Localisation</span>
                <span>
                  <Input
                    class="dropdown input"
                    :placeholder="'Entre ton adresse...'"
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
            </div>
          </transition>
          <transition name="slide-side-l2r">
            <div v-if="displayMoreInfo">
              <div
                key="2"
                class="grid global-content"
                v-bind:style="{
                  'grid-template-columns': `repeat(${simulationResults.length +
                    1}, 2fr)`,
                }"
              >
                <span class="label">Année de construction</span>
                <span
                  v-for="simulationResult in simulationResults"
                  v-bind:key="simulationResult.yearBuilt"
                >
                  {{ simulationResult.yearBuilt }}
                </span>
                <span class="label">Prix maximum au m²</span>
                <span
                  v-for="simulationResult in simulationResults"
                  v-bind:key="simulationResult.yearBuilt"
                  >{{ simulationResult.maxPrice }}€
                </span>
                <span class="label">Prix maximum hors charges</span>
                <span
                  v-for="simulationResult in simulationResults"
                  v-bind:key="simulationResult.yearBuilt"
                  >{{ simulationResult.maxTotalPrice }}€
                </span>
              </div>
              <div
                class="pushy-text"
                v-if="
                  simulationResults?.length &&
                    !simulationResults.some((r) => r.isLegal)
                "
              >
                <p>
                  Une fois le bail signé, s'il est non-conforme et qu'aucune
                  mention justificative n'apparait dans les documents, vous
                  pouvez vous renseigner afin de faire valoir vos droits.
                </p>
                <div class="reference-links">
                  <a
                    href="https://www.leparisien.fr/economie/encadrement-des-loyers-locataires-faites-valoir-vos-droits-19-08-2021-GZAVHO5OVFH6XPACXPXMZ4YNMM.php"
                    target="_blank"
                  >
                    Lien 1
                  </a>
                  <a
                    href="https://immobilier.lefigaro.fr/article/condamne-a-rembourser-son-locataire-pour-un-bien-loue-51-euros-le-m2_68bddef4-3ed0-11eb-9ae8-33572115708c/"
                    target="_blank"
                  >
                    Lien 2
                  </a>
                </div>
              </div>
            </div>
          </transition>

          <transition name="slide-fade">
            <div
              v-if="simulationResultsLoading || simulationResults !== null"
              class="row result"
            >
              <half-circle-spinner
                :animation-duration="1000"
                color="#fdcd56"
                :size="20"
                v-if="simulationResultsLoading"
                class="spinner"
              />
              <template v-else>
                {{
                  simulationResults.some((r) => r.isLegal)
                    ? "Conforme"
                    : "Non conforme"
                }}
                <button
                  class="arrow-icon"
                  @click="onClickMoreInfo"
                  :class="{ '-is-open': displayMoreInfo }"
                >
                  <ArrowIcon :iconColor="'white'"></ArrowIcon>
                </button>
              </template>
            </div>
          </transition>
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
import ArrowIcon from "@/icons/ArrowIcon.vue";
import Slider from "@vueform/slider";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import FixedButton from "@/shared/FixedButton.vue";
import { HalfCircleSpinner } from "epic-spinners";
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
    ArrowIcon,
    HalfCircleSpinner,
  },
  setup() {
    let controller = new AbortController();
    const isMounted = ref(false);

    const olderYear = 1700;
    const currentYear = +new Date().getFullYear();
    const possibleDateYearsCount = currentYear - olderYear;
    const idkId = -1;

    const initialOptionValues = {
      surfaceValue: 20,
      priceValue: 1000,
      roomValue: 2,
      dateBuiltValue: idkId,
      dateBuiltValueStr: idkId,
      furnishedValue: "furnished",
      addressValue: "",
      isHouseValue: 0,
      addressTyped: "",
      districtValue: "",
      cityValue: "paris",
    };

    const optionValues = reactive({
      ...initialOptionValues,
    });

    const cityDropdownOptions = [
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
        hasHouse: true,
      },
    ];
    const districtDropdownOptions = ref([]);
    const addressDropdownOptions = ref([]);
    const simulationResults = ref(null);
    const simulationResultsLoading = ref(false);
    let simulationTimeoutRef = null;

    const hasHouse = ref(false);

    const fetchDistricts = () => {
      controller.abort();
      controller = new AbortController();

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
      (newCity, prevCity) => {
        hasHouse.value = !!cityDropdownOptions.find((c) => c.value === newCity)
          ?.hasHouse;

        if (!hasHouse.value) {
          optionValues.isHouseValue = 0;
        }

        if (newCity !== prevCity) {
          fetchDistricts();
          addressDropdownOptions.value = [];
          simulationResults.value = null;
          optionValues.districtValue = "";
          optionValues.addressValue = "";
          optionValues.addressTyped = "";
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
        optionValues.dateBuiltValueStr,
        optionValues.cityValue,
        optionValues.isHouseValue,
      ],
      () => {
        if (
          optionValues.surfaceValue &&
          optionValues.priceValue &&
          optionValues.roomValue &&
          optionValues.furnishedValue &&
          optionValues.districtValue &&
          optionValues.dateBuiltValueStr &&
          optionValues.cityValue
        ) {
          simulationResultsLoading.value = true;

          if (simulationTimeoutRef !== null) {
            clearTimeout(simulationTimeoutRef);
          }

          controller.abort();
          controller = new AbortController();

          simulationTimeoutRef = setTimeout(() => {
            const optionParams = {
              surfaceValue: optionValues.surfaceValue,
              priceValue: optionValues.priceValue,
              roomValue: optionValues.roomValue,
              furnishedValue: optionValues.furnishedValue,
              dateBuiltValueStr: optionValues.dateBuiltValueStr,
              districtValue: optionValues.districtValue,
              isHouseValue: optionValues.isHouseValue,
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
                simulationResults.value = res;
                simulationResultsLoading.value = false;
              })
              .catch((err) => {
                console.error(err);
              });
          }, 1000);
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
      controller,
      simulationResults,
      isMounted,
      optionValues,
      initialOptionValues,
      cityDropdownOptions,
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
      isHouseValueDropdownOptions: [
        {
          value: 1,
          label: "Maison",
        },
        {
          value: 0,
          label: "Appartement",
        },
      ],
      districtDropdownOptions,
      addressDropdownOptions,
      hasHouse,
      timeoutRef: null,
      displayMoreInfo: ref(false),
      simulationResultsLoading,
      possibleDateYearsCount,
      olderYear,
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
    getDateBuiltValue: function(value) {
      if (value === -1) {
        return "Je ne sais pas";
      } else {
        return value + this.olderYear;
      }
    },
    setDateBuiltValue: function(value) {
      this.optionValues.dateBuiltValue = value;
      this.optionValues.dateBuiltValueStr =
        value === -1 ? value : this.getDateBuiltValue(value);
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

      this.controller.abort();
      this.controller = new AbortController();

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
      this.simulationResults = null;
      this.displayMoreInfo = false;
    },
    onClickMoreInfo: function() {
      this.displayMoreInfo = !this.displayMoreInfo;
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
  align-items: center;

  @media screen and (max-width: $mobileSize) {
    padding: 124px 16px;
  }

  ul li {
    list-style: inherit;
  }
}

.option-list {
  position: relative;
  margin-top: 4px;
  box-sizing: border-box;
  width: 100%;
  max-width: 800px;
  border-radius: 4px;
  border: 1px solid white;
  z-index: 1;
}

.option-list div.global-content {
  display: block;
  padding: 8px 14px;
  width: 100%;
  box-sizing: border-box;
}

.option-list div.global-content.grid {
  display: grid;
}

.option-list .pushy-text {
  padding: 8px 22px;
}

.option-list .pushy-text .reference-links {
  display: flex;
  justify-content: space-evenly;
}

.option-list div.global-content.grid > span {
  padding: 8px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.option-list div.global-content.grid > .label {
  font-weight: bold;
  text-align: left;
  line-height: normal;
}

.option-list div > .row {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 16px 0;
}

.option-list div > .row > span:first-child {
  width: 30%;
}

.option-list div > .row > span:last-child {
  width: 70%;
}

.option-list div > .row .dropdown {
  display: flex;
  justify-content: center;
}

.option-list div > .row .dropdown.input {
  margin-bottom: 0.625rem;
}

.option-list div > .row .dropdown :deep(button) {
  width: 100%;
}

.option-list div > .row :deep(.slider-target .slider-connect) {
  background: $yellow;
}

.option-list div > .row :deep(.slider-target .slider-tooltip) {
  background: $deepblack;
  color: white;
  border-color: $yellow;
  line-height: 16px;
  top: 24px;
  bottom: inherit;
}

.option-list div > .row :deep(.slider-target .slider-tooltip::before) {
  top: -10px;
  transform: translate(-50%) rotate(180deg);
}

.row.actions-btn {
  display: flex;
  justify-content: flex-end;
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
}

.row.result {
  display: flex;
  justify-content: center;
  padding: 16px;
  height: 50px;
  box-sizing: border-box;
  border: 1px solid white;
  position: relative;
  align-items: center;
  border-radius: 2px;
  margin: 16px;
}

.row.result .spinner {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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

.arrow-icon {
  position: absolute;
  transition: transform ease 0.3s;
  right: 14px;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid $yellow;
  border-radius: 2px;
  transform: rotate(-90deg);
  background: transparent;
  padding: 4px;
}

.arrow-icon.-is-open {
  transform: rotate(90deg);
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

  .option-list div > .row:not(.actions-btn) {
    flex-direction: column;
  }

  .option-list div > .row > span.label {
    font-weight: 500;
  }

  .option-list div > .row > span:first-child {
    margin-bottom: 0.5rem;
  }

  .option-list div > .row > span.slider {
    margin-bottom: 1.5rem;
  }

  .option-list div > .row > span:first-child,
  .option-list div > .row > span:last-child {
    width: 100%;
  }
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.slide-side-l2r-enter-active,
.slide-side-l2r-leave-active,
.slide-side-r2l-enter-active,
.slide-side-r2l-leave-active,
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all ease 400ms;
}

.slide-side-r2l-enter-from {
  position: absolute;
  opacity: 0;
  transform: translateX(-100%);
  top: 0;
}

.slide-side-r2l-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(-100%);
  top: 0;
}

.slide-side-l2r-leave-to {
  position: absolute;
  opacity: 0;
  transform: translateX(100%);
  top: 0;
}

.slide-side-l2r-enter-from {
  position: absolute;
  opacity: 0;
  transform: translateX(100%);
  top: 0;
}
</style>
