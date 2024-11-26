<template>
  <Page2Wrapper :isMounted="isMounted">
    <div class="flex flex-1 justify-center items-center">
      <div class="option-list" ref="optionListRef">
        <transition name="slide-side-r2l">
          <div key="1" v-if="!displayMoreInfo" class="global-content">
            <form class="p-4 space-y-6" @submit="onSubmit">
              <FormField v-slot="{ componentField }" name="city">
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <Select
                    v-bind="componentField"
                    :open="isCitySelectOpen"
                    @update:open="isCitySelectOpen = $event"
                    @update:modelValue="handleSelectCity"
                  >
                    <SelectTrigger :open="isCitySelectOpen">
                      <SelectValue :placeholder="'Entre le nom de ta ville'" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup :key="group.groupBy" v-for="group in cityDropdownOptions">
                        <SelectLabel>{{ group.groupBy }}</SelectLabel>
                        <SelectItem :key="value" v-for="{ label, value } in group.options" :value="value">
                          {{ label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              </FormField>

              <template v-if="districtDropdownOptions.length">
                <FormField v-slot="{ componentField }" name="district">
                  <FormItem>
                    <FormLabel>Localisation</FormLabel>
                    <div class="space-y-6">
                      <!-- <Input :placeholder="'Entre ton adresse'" :options="addressDropdownOptions"
                        :currentValue="optionValues.addressValue" :textTyped="optionValues.addressTyped"
                        @onTyping="handleSearchingAddress" @onSelect="handleAddressSelect($event)">
                      </Input> -->
                      <div>
                        <!-- <div class="relative w-full items-center">
                          <Input type="text" :placeholder="'Entre ton adresse'" class="pl-10" @update:model-value="handleSearchingAddress" />
                          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                            <Search class="size-6 text-muted-foreground" />
                          </span>
                        </div> -->

                        <!-- <Select v-if="!!addressDropdownOptions.length"> -->
                        <Select>
                          <!-- <SelectTrigger>
                            <SelectValue :placeholder="'Choisis ton adresse'" />
                          </SelectTrigger> -->
                          <Input type="text" :placeholder="'Entre ton adresse'" class="pl-10" @update:model-value="handleSearchingAddress" />
                          <SelectContent>
                            <SelectGroup v-for="option in addressDropdownOptions">
                              <SelectItem :key="option.value" :value="option.value">
                                {{ option.label }}
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>

                      <Select v-bind="componentField">
                        <SelectTrigger :open="isCitySelectOpen">
                          <SelectValue :placeholder="'Choisis ta zone'" />
                        </SelectTrigger>
                        <SelectContent>
                          <template v-if="districtGroupByDropdownOptions">
                            <SelectGroup v-for="option in Object.keys(districtGroupByDropdownOptions)">
                              <SelectLabel>{{ option }}</SelectLabel>
                              <SelectItem :key="value" v-for="{ label, value } in districtGroupByDropdownOptions[option]" :value="value">
                                {{ label }}
                              </SelectItem>
                            </SelectGroup>
                          </template>
                          <template v-else>
                            <SelectGroup v-for="option in districtDropdownOptions">
                              <SelectItem :key="option.value" :value="option.value">
                                {{ option.label }}
                              </SelectItem>
                            </SelectGroup>
                          </template>
                        </SelectContent>
                      </Select>
                    </div> 
                  </FormItem>
                </FormField>
              </template>

              <!-- <div class="row" v-if="districtDropdownOptions.length">
                <span class="label">Localisation</span>
                <span class="space-y-4">
                  <Input class="dropdown address" :placeholder="'Entre ton adresse...'" :options="addressDropdownOptions"
                    :currentValue="optionValues.addressValue" :textTyped="optionValues.addressTyped"
                    @onTyping="handleSearchingAddress" @onSelect="handleAddressSelect($event)">
                  </Input>
                  <Select @update:model-value="
                    setOptionValues({
                      districtValue: $event.value,
                      addressValue: undefined,
                    })
                    ">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="option in addressDropdownOptions" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </span>
              </div> -->
              <div v-if="hasHouse" class="row">
                <span class="label">Maison</span>
                <span>
                  <Select v-model="optionValues.isHouseValue" @update:model-value="
                    setOptionValues({ isHouseValue: $event })
                    ">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="option in isHouseValueDropdownOptions" :key="option.value"
                          :value="option.value">
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </span>
              </div>
              <div class="row">
                <span class="label">Prix (hors charges)
                  <div class="overlay" v-if="infoVisible" @click="infoVisible = false"></div>
                  <button @click="infoVisible = true" class="info-btn">
                    i
                  </button>
                  <div v-if="infoVisible" class="info-section">
                    Si vous ne connaissez pas votre loyer hors charges, vous
                    pouvez enlever 10% à votre loyer total.
                  </div>
                </span>
                <span>
                  <Input v-model="optionValues.priceValue" type="number" :placeholder="'Entre ton loyer'" :min="0"
                    :max="10000" @update:modelValue="handleSelectPrice" />
                </span>
              </div>
              <div class="row">
                <span class="label">Surface</span>
                <span>
                  <Select v-model="optionValues.surfaceValue" @update:model-value="
                    setOptionValues({ surfaceValue: $event })
                    ">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="option in surfaceValueDropdownOptions" :key="option.value"
                          :value="option.value">
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </span>
              </div>
              <div class="row">
                <span class="label">Nombre de pièce(s)</span>
                <span>
                  <Select v-model="optionValues.roomValue" @update:model-value="setOptionValues({ roomValue: $event })">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="option in roomValueDropdownOptions" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </span>
              </div>
              <div class="row">
                <span class="label">Meublé</span>
                <span>
                  <Select v-model="optionValues.furnishedValue" @update:model-value="
                    setOptionValues({ furnishedValue: $event })
                    ">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="option in furnishedDropdownOptions" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </span>
              </div>
              <div class="row">
                <span class="label">Date de construction</span>
                <span>
                  <Select v-model="optionValues.dateBuiltValue" @update:model-value="
                    setOptionValues({ dateBuiltValue: $event })
                    ">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem v-for="option in dateBuiltValueDropdownOptions" :key="option.value"
                        :value="option.value">
                        {{ option.label }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </span>
              </div>
            </form>
          </div>
        </transition>
        <transition name="slide-side-l2r">
          <div v-if="displayMoreInfo" class="global-content result">
            <div key="2" class="grid" v-bind:style="{
              'grid-template-columns': `repeat(${simulationResults?.length + 1
                }, 2fr)`,
            }">
              <span class="label">Année de construction</span>
              <span v-for="simulationResult in simulationResults" v-bind:key="simulationResult.yearBuilt">
                {{ simulationResult.yearBuilt }}
              </span>
              <span class="label">Prix maximum au m²</span>
              <span v-for="simulationResult in simulationResults" v-bind:key="simulationResult.yearBuilt">{{
                simulationResult.maxPrice }}€
              </span>
              <span class="label">Prix maximum hors charges</span>
              <span v-for="simulationResult in simulationResults" v-bind:key="simulationResult.yearBuilt">{{
                simulationResult.maxTotalPrice }}€
              </span>
              <template v-if="!isLegal">
                <span class="label">Dépassement</span>
                <span v-for="simulationResult in simulationResults" class="exceeding"
                  v-bind:key="simulationResult.yearBuilt">+{{
                    +(
                      optionValues.priceValue - simulationResult.maxTotalPrice
                    ).toFixed(2)
                  }}€
                </span>
              </template>
            </div>
            <div class="pushy-text" v-if="!isLegal">
              <h4>Et maintenant ?</h4>
              <p>
                Une fois <b>le bail signé</b>, s'il est <b>non-conforme</b> et
                qu'aucune <b>mention justificative</b> n'apparait dans les
                documents, vous pouvez vous renseigner afin de
                <b>faire valoir vos droits.</b>
              </p>

              <p>
                Pour plus d’informations, voir le site de votre
                <b><a :href="simulationResults[0].moreInfo" target="_blank">
                    {{ isMultipleCities ? "agglomération" : "ville" }}
                  </a></b>.
              </p>

              <p v-if="optionValues.cityValue === 'paysBasque'">
                Pour avoir de l'aide dans vos démarches, contactez l'<b><a :href="'https://www.alda.eus/contact/'"
                    target="_blank">association de défense des locataires Alda</a></b>.
              </p>

              <h4>Articles intéressants</h4>
              <div class="reference-links">
                <a href="https://www.leparisien.fr/economie/encadrement-des-loyers-locataires-faites-valoir-vos-droits-19-08-2021-GZAVHO5OVFH6XPACXPXMZ4YNMM.php"
                  target="_blank">
                  Le Parisien
                </a>
                <a href="https://immobilier.lefigaro.fr/article/condamne-a-rembourser-son-locataire-pour-un-bien-loue-51-euros-le-m2_68bddef4-3ed0-11eb-9ae8-33572115708c/"
                  target="_blank">
                  Le Figaro Immo
                </a>
              </div>
            </div>
          </div>
        </transition>

        <transition name="slide-fade">
          <div v-if="simulationResultsLoading || simulationResults !== null" class="row result">
            <template v-if="simulationResultsLoading">
              <BounceLoader class="spinner" :loading="simulationResultsLoading" color="#fdcd56" :size="'20px'">
              </BounceLoader>
            </template>
            <template v-else>
              <span>{{ isLegal ? "Conforme" : "Non conforme" }} </span>
              <button class="more-info-btn" @click="onClickMoreInfo">
                <template v-if="displayMoreInfo">
                  <span>Retour</span>
                </template>
                <template v-else>
                  <span>Cliquez pour plus d'info</span>
                </template>
                <span class="arrow-icon" :class="{ '-is-open': displayMoreInfo }">
                  <ArrowIcon :iconColor="'white'"></ArrowIcon>
                </span>
              </button>
            </template>
          </div>
        </transition>
        <div class="row actions-btn">
          <button class="reset-btn" @click="onReset">Réinitialiser</button>
        </div>
      </div>
    </div>
    <div @click="handleClose">
      <FixedButton>
        <StrokeIcon :width="'18px'" :height="'18px'" />
      </FixedButton>
    </div>
  </Page2Wrapper>
</template>

<script setup>
import { domain } from "@/helper/config";
import ArrowIcon from "@/icons/ArrowIcon.vue";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import { Search } from 'lucide-vue-next'
import { Input } from "@/shadcn/ui/input";
import { debounce } from '@/tools/debounce';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import FixedButton from "@/shared/FixedButton.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";
import { FormControl, FormField, FormItem, FormLabel } from "@/shadcn/ui/form";
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const router = useRouter();

const formSchema = toTypedSchema(z.object({
  city: z.string(),
  district: z.string(),
  surface: z.number(),
  rooms: z.number(),
  furnished: z.string(),
}))

const idkId = '-1';

const mainCitySelected = ref('bordeaux');
const initialValues = {
  surface: undefined,
  price: undefined,
  room: undefined,
  dateBuilt: idkId,
  furnished: undefined,
  addressValue: undefined,
  isHouseValue: 0,
  cityTyped: "",
  addressTyped: "",
  district: undefined,
  city: 'bordeaux',
}

const form = useForm({
  initialValues,
  validationSchema: formSchema,
})

const optionListRef = ref(null);

const isMounted = ref(false);
const loading = ref(true);
const isCitySelectOpen = ref(false);

const infoVisible = ref(false);

const cityDropdownOptions = ref([]);
const dateBuiltValueDropdownOptions = ref([]);

const optionValues = ref({});
const displayMoreInfo = ref(false);

const districtDropdownOptions = ref([]);
const districtGroupByDropdownOptions = ref(null);
const addressDropdownOptions = ref([]);
const simulationResults = ref(null);
const isLegal = ref(null);
const prevCity = ref(null);
const simulationResultsLoading = ref(false);

let searchingCityTimeoutRef = null;
let simulationTimeoutRef = null;

const hasHouse = ref(false);
const isMultipleCities = ref(false);
let cityInformation = [];

const furnishedDropdownOptions = [
  {
    value: "furnished",
    label: "Meublé",
  },
  {
    value: "nonFurnished",
    label: "Non meublé",
  },
];

const isHouseValueDropdownOptions = [
  {
    value: '1',
    label: "Maison",
  },
  {
    value: '0',
    label: "Appartement",
  },
];

const roomValueDropdownOptions = [...Array(6 - 1 + 1).keys()].map((x) => {
  x += 1;

  return {
    value: x.toString(),
    label: `${x} pièce${x > 1 ? "s" : ""}`,
  };
});

const surfaceValueDropdownOptions = [...Array(100 - 9 + 1).keys()].map((x) => {
  const val = x + 9;
  return {
    value: val.toString(),
    label: `${val}m²`,
  };
});

const setDateBuiltRangeDropdownOptions = (datesRange) => {
  dateBuiltValueDropdownOptions.value = datesRange.reduce(
    (prev, dates, index) => {
      if (index === 0) {
        prev.push({
          value: idkId,
          label: "Je ne sais pas",
        });
      }

      if (dates[0] === null) {
        prev.push({
          value: JSON.stringify(dates),
          label: `Avant ${dates[1]}`,
        });
      } else if (dates[1] === null) {
        prev.push({
          value: JSON.stringify(dates),
          label: `Après ${dates[0]}`,
        });
      } else {
        prev.push({
          value: JSON.stringify(dates),
          label: `${dates[0]}-${dates[1]}`,
        });
      }

      return prev;
    },
    []
  );
};

const setCityDropdownOptions = () => {
  cityDropdownOptions.value = cityInformation.reduce((prev, currentValue) => {
    currentValue.cities.forEach(({ value, label }) => {
      const groupAlreadyThere = prev.find(({ groupBy }) => groupBy === currentValue.label);

      const currentCityTyped = optionValues.value.cityTyped?.toLowerCase();
      if (!currentCityTyped?.length || (label.toLowerCase().includes(currentCityTyped) ||
          value.toLowerCase().includes(currentCityTyped) ||
          currentValue.label.toLowerCase().includes(currentCityTyped))
      ) {
        if (groupAlreadyThere) {
          groupAlreadyThere.options.push({ value, label })
        } else {
          prev.push({ options: [{ value, label }], groupBy: currentValue.label });
        }
      }
    });
    return prev;
  }, []);
};

const setDistrictDropdownOptions = (res) => {
  districtDropdownOptions.value = res.map((district) => ({
    groupBy: district.groupBy,
    value: district.value,
    label: district.label,
  }));

  if (districtDropdownOptions.value[0].groupBy) {
    districtGroupByDropdownOptions.value = districtDropdownOptions.value.reduce((prev, district) => {
      if (!prev[district.groupBy]) {
        prev[district.groupBy] = [{
          groupBy: district.groupBy,
          value: district.value,
          label: district.label,
        }];
      } else {
        prev[district.groupBy].push({
          groupBy: district.groupBy,
          value: district.value,
          label: district.label,
        });
      }
      return prev;
    }, {});
  } else {
    districtGroupByDropdownOptions.value = null;
  }
};

const setAddressDropdownOptions = (res) => {
  addressDropdownOptions.value = res.map((a) => ({
    value: a.properties.label,
    label: a.properties.label,
    district: a.districtName,
  }));
  console.log(addressDropdownOptions.value)
};

const onReset = () => {
  console.log('onReset')
  // optionValues.value = {
  //   ...optionValues.value,
  //   ...initialOptionValues,
  //   cityValue: undefined,
  // };
  // addressDropdownOptions.value = [];
  // simulationResults.value = null;
  // displayMoreInfo.value = false;
};

const onSubmit = form.handleSubmit((values) => {
  setFiltersCount();
})

const setOptionValues = async (newOptionValues) => {
  optionValues.value = {
    ...optionValues.value,
    ...newOptionValues,
  };

  await fetchSimulatorResult();
};

const setCityInformation = async (res) => {
  const cities = Object.keys(res);
  cityInformation = cities
    .reduce((prev, city) => {
      const currentCity = res[city];
      const mainCity = currentCity.mainCity;
      if (prev.some(({ value }) => value === mainCity)) return prev;

      prev.push({
        value: mainCity,
        label: currentCity.displayName.mainCity,
        cities: cities.reduce((cityList, c) => {
          if (mainCity === res[c].mainCity) {
            cityList.push({ label: res[c].displayName.city, value: c });
          }
          return cityList;
        }, []),
        dateBuiltRange: currentCity.dateBuiltRange,
        hasHouse: currentCity.hasHouse,
      });
      return prev;
    }, [])
    .sort((a, b) => {
      return a.value.localeCompare(b.value);
    });

  setCityDropdownOptions();
};

const cityChanged = async (newMainCity) => {
  optionValues.value = {
    ...optionValues.value,
    districtValue: undefined,
    addressValue: undefined,
    cityTyped: "",
    addressTyped: "",
    dateBuiltValue: idkId,
  };

  const currentCityOption = cityInformation.find(
    (c) => c.value === newMainCity
  );
  isMultipleCities.value = currentCityOption.cities.length > 1;
  hasHouse.value = !!currentCityOption?.hasHouse;

  setDateBuiltRangeDropdownOptions([...currentCityOption.dateBuiltRange]);

  if (citySelected.value !== prevCity.value) {
    prevCity.value = citySelected.value;
    await fetchDistricts();
    addressDropdownOptions.value = [];
    simulationResults.value = null;
    isLegal.value = null;

    if (!hasHouse.value) {
      optionValues.value.isHouseValue = 0;
    }

    if (!optionValues.value.furnishedValue) {
      optionValues.value.furnishedValue = initialOptionValues.furnishedValue;
    }

    if (districtDropdownOptions.value.length === 1) {
      optionValues.value.districtValue = districtDropdownOptions.value[0].value;
    }

    await setOptionValues({
      addressValue: undefined,
      cityTyped: "",
      addressTyped: "",
      dateBuiltValue: idkId,
    });
  }
};

const handleSelectPrice = async (price) => {
  optionValues.value.priceValue = price;
  if (!price) return;

  // initialOptionValues.priceValue = price;
  await setOptionValues({ priceValue: price });
};

const handleCloseCity = () => {
  optionValues.value.cityTyped = "";
  setCityDropdownOptions();
  citySelected.value = initialOptionValues.cityValue;
};

const handleSelectCity = async (city) => {
  const currentCityInformation = cityInformation.find((cityInfo) =>
    cityInfo.cities.map((c) => c.value).includes(city)
  );

  const mainCity = currentCityInformation.value;

  mainCitySelected.value = mainCity;
  await fetchDistricts();

  // initialOptionValues.cityValue = citySelected.value;
  // optionValues.value.cityValue = mainCity;

  // cityChanged(mainCity);
  isMultipleCities.value = currentCityInformation.cities.length > 1;
  hasHouse.value = !!currentCityInformation?.hasHouse;
  setDateBuiltRangeDropdownOptions([...currentCityInformation.dateBuiltRange]);
  form.setValues({
    ...initialValues,
    city,
  });

  if (districtDropdownOptions.value.length === 1) {
    form.setFieldValue('district', districtDropdownOptions.value[0].value);
  }
};

const fetchDistricts = async () => {
  try {
    const rawResult = await fetch(
      `${domain}districts/list/${mainCitySelected.value}?city=${form.values.city}`
    );
    const res = await rawResult.json();
    if (res.message === "token expired") throw res;

    setDistrictDropdownOptions(res);
  } catch (err) {
    console.error(err);
  }
};

const fetchCities = async () => {
  try {
    const rawResult = await fetch(`${domain}cities/list`);
    const res = await rawResult.json();
    if (res.message === "token expired") throw res;

    await setCityInformation(res);

    loading.value = false;
  } catch (err) {
    console.error(err);
  }
};

const fetchSimulatorResult = async () => {
  if (
    optionValues.value.cityValue === undefined ||
    optionValues.value.surfaceValue === undefined ||
    optionValues.value.roomValue === undefined ||
    optionValues.value.isHouseValue === undefined ||
    optionValues.value.furnishedValue === undefined ||
    optionValues.value.districtValue === undefined ||
    optionValues.value.priceValue === undefined
  )
    return;

  simulationResultsLoading.value = true;

  if (simulationTimeoutRef !== null) clearTimeout(simulationTimeoutRef);

  simulationTimeoutRef = setTimeout(async () => {
    const optionParams = {
      surfaceValue: optionValues.value.surfaceValue,
      priceValue: optionValues.value.priceValue,
      roomValue: optionValues.value.roomValue,
      furnishedValue: optionValues.value.furnishedValue,
      dateBuiltValueStr: optionValues.value.dateBuiltValue,
      districtValue: optionValues.value.districtValue,
      isHouseValue: optionValues.value.isHouseValue,
    };

    const strOptions = optionParams
      ? Object.keys(optionParams)
        .map((key) => {
          return key + "=" + optionParams[key];
        })
        .join("&")
      : null;

    try {
      const rawResult = await fetch(
        `${domain}simulator/${optionValues.value.cityValue}${strOptions ? "?" + strOptions : ""
        }`
      );
      const res = await rawResult.json();
      if (res.message === "token expired") throw res;

      simulationResults.value = res;
      isLegal.value = res.length && res.some((r) => r.isLegal);
      simulationResultsLoading.value = false;
    } catch (err) {
      console.error(err);
    }
  }, 300);
};

const handleSearchingCity = async (city) => {
  if (searchingCityTimeoutRef !== null) clearTimeout(searchingCityTimeoutRef);

  optionValues.value = {
    ...optionValues.value,
    cityTyped: city,
  };

  searchingCityTimeoutRef = setTimeout(async () => {
    setCityDropdownOptions();
  }, 200);
};

const handleSearchingAddress = debounce(async (address) => await fetchingAddress(address), 300);

const fetchingAddress = async (address) => {
  // optionValues.value = {
  //   ...optionValues.value,
  //   districtValue: undefined,
  //   addressValue: undefined,
  //   addressTyped: address,
  // };

  if (address.trim().length < 4) return;

  try {
    const rawResult = await fetch(
      `${domain}districts/address/${mainCitySelected.value}?q=${address.trim()}&city=${form.values.city}`
    );
    const res = await rawResult.json();
    if (res.message === "token expired") throw res;
    setAddressDropdownOptions(res);
  } catch (err) {
    console.error(err);
  }
};

const handleAddressSelect = async (event) => {
  if (event.district) {
    await setOptionValues({
      addressValue: event.value,
      districtValue: event.district,
    });
  }
};

const onClickMoreInfo = () => {
  optionListRef.value.querySelector("div").scrollIntoView(true);
  displayMoreInfo.value = !displayMoreInfo.value;
};

const handleClose = () => {
  isMounted.value = false;
};

onMounted(async () => {
  await fetchCities();
  isMounted.value = true;
  await handleSelectCity('bordeaux')
});
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

.overlay {
  background: rgba(19, 15, 64, 0.4);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 3;
  overflow: hidden;
}

.option-list {
  position: relative;
  margin-top: 4px;
  box-sizing: border-box;
  width: 100%;
  max-width: 800px;
  border-radius: 4px;
  border: 1px solid white;
  z-index: 5;
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.option-list div.global-content {
  display: block;
  padding: 1rem;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

.option-list div.global-content.result {
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 8px #fdcd5a57;
}

.option-list div.global-content.result .grid {
  overflow-x: auto;
}

.option-list div.global-content .grid {
  display: grid;
}

.option-list .pushy-text .reference-links {
  display: flex;

  >a {
    margin-right: 1rem;
  }
}

.option-list div.global-content .grid>span {
  padding: 8px;
  justify-content: center;
  align-items: center;
  display: flex;
  border: solid 1px;
}

.option-list div.global-content .grid>.label {
  font-weight: bold;
  text-align: left;
  line-height: normal;
}

.option-list div.global-content .grid>span.exceeding {
  font-weight: 500;
  color: red;
}

.option-list div>.row {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 16px 0;
}

.option-list div>.row>span:first-child {
  width: 35%;
}

.option-list div>.row>span:last-child {
  width: 65%;
}

.option-list div>.row .dropdown.input.address {
  margin-bottom: 0.625rem;
}

.option-list div>.row .info-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  z-index: 4;
  background: white;
  color: black;
  border: solid 1px white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.option-list .info-section {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(90%, -90%);
  z-index: 4;
  background: white;
  color: black;
  box-shadow: 0 0 10px 1px black;
  border-radius: 8px;
  padding: 1rem;
  font-size: 0.875rem;
  text-align: left;
  line-height: 1.25rem;
}

.option-list div>.row span.label {
  font-weight: 500;
  position: relative;
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
  justify-content: space-around;
  padding: 0.625rem;
  min-height: 50px;
  box-sizing: border-box;
  border: 1px solid white;
  position: relative;
  align-items: center;
  border-radius: 2px;
  margin: 1rem;
  line-height: 1.25rem;

  >span {
    font-weight: bold;
  }
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
  transition: all ease 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border: solid white 2px;
    }
  }
}

.more-info-btn {
  display: flex;
  align-items: center;
  border: 2px solid $yellow;
  border-radius: 2px;
  background: transparent;
  color: white;
  font-size: 0.825rem;
  font-weight: bold;
  padding: 0 1rem;
  transition: all ease 0.3s;
  margin-left: 0.5rem;

  &:hover {
    border: solid white 2px;
  }
}

.arrow-icon {
  transition: transform ease 0.3s;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
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
  transition: all ease 0.3s;
  float: right;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border: solid white 2px;
    }
  }
}

@media screen and (max-width: $mobileSize) {
  .dropfilters>button.mobile-back-btn.-is-open {
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
    padding: 2rem 0;
    top: 0;
    left: 0;
    z-index: 2;
    margin-top: 0;
    border: none;
    overflow-y: auto;
  }

  .option-list div>.row:not(.actions-btn) {
    flex-direction: column;
  }

  .option-list div>.row>span:first-child {
    margin-bottom: 0.5rem;
  }

  .option-list div>.row>span:first-child,
  .option-list div>.row>span:last-child {
    width: 100%;
  }

  .option-list .info-section {
    transform: translate(0, -90%);
  }
}

.slide-side-l2r-enter-active,
.slide-side-l2r-leave-active,
.slide-side-r2l-enter-active,
.slide-side-r2l-leave-active {
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
