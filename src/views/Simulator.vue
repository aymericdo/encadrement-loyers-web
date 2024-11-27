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
                      <Popover v-model:open="isAddressPopoverOpen">
                        <PopoverTrigger as-child>
                          <Button
                            variant="outline"
                            role="combobox"
                            :aria-expanded="isAddressPopoverOpen"
                          >
                            {{ addressSelected
                              ? addressDropdownOptions.find((option) => option.value === addressSelected)?.label
                              : "Entre ton adresse" }}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent class="popover-content" v-bind:style="{
                          'width': 'var(--radix-popover-trigger-width)',
                        }">
                          <Command
                            @update:searchTerm="handleSearchingAddress" :filterFunction="(list) => list"
                            @update:modelValue="(addressSelected) => form.setFieldValue('district', addressDropdownOptions.find((option) => option.value === addressSelected)?.district)"
                          >
                            <CommandInput class="h-9" placeholder="Rechercher..." />
                            <CommandEmpty>Pas d'adresse trouvée.</CommandEmpty>
                            <CommandList>
                              <CommandGroup>
                                <CommandItem
                                  v-for="option in addressDropdownOptions"
                                  :key="option.value"
                                  :value="option.value"
                                  @select="(ev) => {
                                    if (typeof ev.detail.value === 'string') {
                                      addressSelected = ev.detail.value
                                    }
                                    isAddressPopoverOpen = false
                                  }"
                                >
                                <CheckIcon
                                  :class="cn(
                                    'mr-2 h-4 w-4',
                                    addressSelected === option.value ? 'opacity-100' : 'opacity-0',
                                  )"
                                />
                                  {{ option.label }}
                                </CommandItem>
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

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

              <template v-if="hasHouse">
                <FormField v-slot="{ componentField }" name="house">
                  <FormItem>
                    <FormLabel>Maison</FormLabel>

                    <Select v-bind="componentField">
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
                  </FormItem>
                </FormField>
              </template>

              <FormField v-slot="{ componentField }" name="price">
                <FormItem>
                  <FormLabel class="flex items-center">
                    Loyer
                    <HoverCard>
                      <HoverCardTrigger as-child>
                        <Button variant="primary" type="button">
                          <InfoCircledIcon />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent class="w-80">
                        <div class="flex justify-between space-x-4">
                          <p class="text-sm">
                            Si vous ne connaissez pas votre loyer hors charges, vous pouvez enlever 10% à votre loyer total.
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </FormLabel>

                  <FormControl>
                    <div class="relative w-full items-center">
                      <Input
                        v-bind="componentField"
                        class="pr-10"
                        type="number" :placeholder="'Entre ton loyer'"
                        :min="0"
                        :max="10000" />
                        <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
                          <span class="flex items-center justify-center size-6 text-muted-foreground">€</span>
                        </span>
                      </div>
                  </FormControl>
                  <FormDescription>
                    Loyer hors charges
                  </FormDescription>
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="surface">
                <FormItem>
                  <FormLabel class="flex items-center">
                    Surface
                  </FormLabel>
                  <FormControl>
                    <div class="relative w-full items-center">
                      <Input
                        v-bind="componentField"
                        class="pr-10"
                        type="number" :placeholder="'Entre ta surface'"
                        :min="9"
                        :max="200" />
                        <span class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
                          <span class="flex items-center justify-center size-6 text-muted-foreground">m²</span>
                        </span>
                      </div>
                  </FormControl>
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="rooms">
                <FormItem>
                  <FormLabel class="flex items-center">
                    Nombre de pièce(s)
                  </FormLabel>
                  <Select v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="option in roomValueDropdownOptions" :key="option.value"
                          :value="option.value">
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="furnished">
                <FormItem>
                  <FormLabel class="flex items-center">
                    Meublé
                  </FormLabel>
                  <Select v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="option in furnishedDropdownOptions" :key="option.value"
                          :value="option.value">
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="dateBuilt">
                <FormItem>
                  <FormLabel class="flex items-center">
                    Date de construction
                  </FormLabel>
                  <Select v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="option in dateBuiltValueDropdownOptions" :key="option.value"
                          :value="option.value">
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              </FormField>
            </form>
          </div>
        </transition>

        <transition name="slide-side-l2r">
          <div v-if="displayMoreInfo" class="global-content">
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
                      form.values.price - simulationResult.maxTotalPrice
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

              <p v-if="mainCitySelected === 'paysBasque'">
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

        <div class="w-full flex items-center justify-end pb-4 px-8">
          <Button class="reset-btn" @click="onReset">Réinitialiser</Button>
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shadcn/ui/popover'
import {
  Button,
} from '@/shadcn/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/shadcn/ui/command'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/shadcn/ui/hover-card'
import { CheckIcon, InfoCircledIcon } from "@radix-icons/vue";
import FixedButton from "@/shared/FixedButton.vue";
import Page2Wrapper from "@/shared/Page2Wrapper.vue";
import { onMounted, ref, watch } from "vue";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";
import { FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/shadcn/ui/form";
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { cn } from '@/lib/utils';
import * as z from 'zod'

const formSchema = toTypedSchema(z.object({
  city: z.string(),
  district: z.string(),
  house: z.string().optional(),
  price: z.number(),
  surface: z.number(),
  rooms: z.string(),
  furnished: z.string(),
  dateBuilt: z.string(),
}))

const idkId = '-1';

const mainCitySelected = ref('');
const initialValues = {
  city: undefined,
  district: undefined,
  house: '0',
  price: undefined,
  surface: undefined,
  rooms: undefined,
  furnished: undefined,
  dateBuilt: idkId,
}

const form = useForm({
  initialValues,
  validationSchema: formSchema,
})

const currentFormValues = ref({ ...initialValues });

const optionListRef = ref(null);

const isMounted = ref(false);
const loading = ref(true);

const isCitySelectOpen = ref(false);
const isAddressPopoverOpen = ref(false)
const addressSelected = ref('')

const cityDropdownOptions = ref([]);
const dateBuiltValueDropdownOptions = ref([]);

const displayMoreInfo = ref(false);

const districtDropdownOptions = ref([]);
const districtGroupByDropdownOptions = ref(null);
const addressDropdownOptions = ref([]);

const simulationResults = ref(null);
const simulationResultsLoading = ref(false);
const isLegal = ref(null);

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

const roomValueDropdownOptions = [
  {
    value: '1',
    label: '1 pièce',
  },
  {
    value: '2',
    label: '2 pièces',
  },
  {
    value: '3',
    label: '3 pièces',
  },
  {
    value: '4',
    label: '4 pièces et plus',
  },
];

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

      if (groupAlreadyThere) {
        groupAlreadyThere.options.push({ value, label })
      } else {
        prev.push({ options: [{ value, label }], groupBy: currentValue.label });
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

const handleSelectCity = async (city) => {
  const currentCityInformation = cityInformation.find((cityInfo) =>
    cityInfo.cities.map((c) => c.value).includes(city)
  );

  const mainCity = currentCityInformation.value;

  mainCitySelected.value = mainCity;
  await fetchDistricts();

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

const onReset = () => {
  console.log('onReset')
};

watch(
  () => form.meta.value.valid,
  (isValid) => {
    if (isValid) {
      handleFetchSimulatorResult()
    }
  }
);

watch(
  () => displayMoreInfo.value,
  (displayMoreInfo) => {
    if (displayMoreInfo) {
      currentFormValues.value = { ...form.values };
    } else {
      form.setValues({
        ...currentFormValues.value,
      });
    }
  }
);

const handleSearchingAddress = debounce(async (address) => await fetchingAddress(address), 300);
const handleFetchSimulatorResult = debounce(async () => await fetchSimulatorResult(), 300);

const fetchingAddress = async (address) => {
  if (address.trim().length < 4) {
    return;
  }

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

const fetchSimulatorResult = async () => {
  simulationResultsLoading.value = true;

  const optionParams = {
    surfaceValue: form.values.surface,
    priceValue: form.values.price,
    roomValue: form.values.rooms,
    furnishedValue: form.values.furnished,
    dateBuiltValueStr: form.values.dateBuilt,
    districtValue: form.values.district,
    isHouseValue: form.values.house || '0',
  };

  const strOptions = Object.keys(optionParams)
    .map((key) => {
      return key + "=" + optionParams[key];
    })
    .join("&")

  try {
    const rawResult = await fetch(
      `${domain}simulator/${mainCitySelected.value}?${strOptions}`
    );
    const res = await rawResult.json();
    if (res.message === "token expired") throw res;

    simulationResults.value = res;
    isLegal.value = res.some((r) => r.isLegal);
    simulationResultsLoading.value = false;
  } catch (err) {
    console.error(err);
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
  padding: 1.25rem;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

.option-list div.global-content .grid {
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

.row.result {
  display: flex;
  justify-content: space-around;
  padding: 0.625rem;
  box-sizing: border-box;
  border: 1px solid white;
  position: relative;
  align-items: center;
  border-radius: 2px;
  margin: 0 2rem 1rem;
  line-height: 1.25rem;

  > span {
    font-weight: bold;
  }

  .spinner {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
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
