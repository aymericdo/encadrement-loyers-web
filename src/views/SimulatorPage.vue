<template>
  <Page2Wrapper :is-mounted="isMounted">
    <div class="flex items-center justify-center flex-1 p-4">
      <div class="option-list">
        <transition name="slide-side-r2l">
          <div
            v-show="!displayMoreInfo"
            key="1"
            class="global-content"
          >
            <h1 class="text-xl font-bold my-4">
              Simulation de votre plafonnement de loyer
            </h1>
            <h2 class="text-lg font-semibold my-4">
              Faites vous-même le calcul en remplissant chaque champ et découvrez si votre loyer dépasse le maximum autorisé grâce au simulateur.
            </h2>
            <form class="space-y-6">
              <FormField name="city">
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <div class="space-y-6">
                    <Popover v-model:open="isCityPopoverOpen">
                      <PopoverTrigger as-child>
                        <Button
                          variant="outline"
                          role="combobox"
                          :aria-expanded="isCityPopoverOpen"
                        >
                          {{
                            form.values.city
                              ? cityDropdownOptions
                                .flatMap((group) => group.options)
                                .find(
                                  (option) =>
                                    option.value === form.values.city
                                )?.label
                              : "Entre ta ville"
                          }}
                          <Button
                            v-if="form.values.city"
                            variant="ghost"
                            size="icon"
                            @click="form.setFieldValue('city', ''); form.setFieldValue('district', null);"
                            aria-label="Effacer"
                          >
                            <StrokeIcon
                              :width="'18px'"
                              :height="'18px'"
                            />
                          </Button>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        class="popover-content"
                        :style="{
                          width: 'var(--radix-popover-trigger-width)',
                        }"
                      >
                        <Command @update:model-value="handleSelectCity">
                          <CommandInput
                            class="h-9"
                            placeholder="Rechercher une ville..."
                          />
                          <CommandEmpty>Pas de ville trouvée.</CommandEmpty>
                          <CommandList>
                            <CommandGroup
                              v-for="group in cityDropdownOptions"
                              :key="group.groupBy"
                            >
                              <SelectLabel>{{ group.groupBy }}</SelectLabel>
                              <CommandItem
                                v-for="option in group.options"
                                :key="option.value"
                                :value="option.value"
                                @select="
                                  (ev) => {
                                    if (typeof ev.detail.value === 'string') {
                                      form.setFieldValue(
                                        'city',
                                        ev.detail.value
                                      );
                                    }
                                    isCityPopoverOpen = false;
                                  }
                                "
                              >
                                <CheckIcon
                                  :class="
                                    cn(
                                      'mr-2 h-4 w-4',
                                      form.values.city === option.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )
                                  "
                                />
                                {{ option.label }}
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </FormItem>
              </FormField>

              <div v-show="districtDropdownOptions.length">
                <FormField name="district">
                  <FormItem>
                    <FormLabel>Localisation</FormLabel>
                    <Popover v-model:open="isAddressPopoverOpen">
                      <PopoverTrigger as-child>
                        <Button
                          variant="outline"
                          role="combobox"
                          :aria-expanded="isAddressPopoverOpen"
                          :disabled="districtDropdownOptions.length === 1"
                        >
                          {{
                            addressSelected
                              ? addressDropdownOptions.find(
                                (option) => option.value === addressSelected
                              )?.label
                              : "Entre ton adresse"
                          }}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        class="popover-content"
                        :style="{
                          width: 'var(--radix-popover-trigger-width)',
                        }"
                      >
                        <Command
                          :filter-function="(list) => list"
                          @update:search-term="handleSearchingAddress"
                          @update:model-value="
                            (addressSelected) =>
                              form.setFieldValue(
                                'district',
                                addressDropdownOptions.find(
                                  (option) => option.value === addressSelected
                                )?.district
                              )
                          "
                        >
                          <CommandInput
                            class="h-9"
                            placeholder="Rechercher..."
                          />
                          <CommandEmpty>Pas d'adresse trouvée.</CommandEmpty>
                          <CommandList>
                            <CommandGroup>
                              <CommandItem
                                v-for="option in addressDropdownOptions"
                                :key="option.value"
                                :value="option.value"
                                @select="
                                  (ev) => {
                                    if (typeof ev.detail.value === 'string') {
                                      addressSelected = ev.detail.value;
                                    }
                                    isAddressPopoverOpen = false;
                                  }
                                "
                              >
                                <CheckIcon
                                  :class="
                                    cn(
                                      'mr-2 h-4 w-4',
                                      addressSelected === option.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
                                    )
                                  "
                                />
                                {{ option.label }}
                              </CommandItem>
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                </FormField>

                <FormField
                  v-slot="{ componentField }"
                  name="district"
                >
                  <FormItem>
                    <FormLabel>Ou</FormLabel>
                    <Select
                      v-bind="componentField"
                      :open="isCitySelectOpen"
                      @update:open="isCitySelectOpen = $event"
                    >
                      <SelectTrigger
                        :open="isCitySelectOpen"
                        :disabled="districtDropdownOptions.length === 1"
                      >
                        <SelectValue :placeholder="'Choisis ta zone'" />
                      </SelectTrigger>
                      <SelectContent>
                        <template v-if="districtGroupByDropdownOptions">
                          <SelectGroup
                            v-for="option in Object.keys(
                              districtGroupByDropdownOptions
                            )"
                            :key="option"
                          >
                            <SelectLabel>{{ option }}</SelectLabel>
                            <SelectItem
                              v-for="{
                                label,
                                value,
                              } in districtGroupByDropdownOptions[option]"
                              :key="value"
                              :value="value"
                            >
                              {{ label }}
                            </SelectItem>
                          </SelectGroup>
                        </template>
                        <template v-else>
                          <SelectGroup
                            v-for="option in districtDropdownOptions"
                            :key="option.value"
                          >
                            <SelectItem
                              :key="option.value"
                              :value="option.value"
                            >
                              {{ option.label }}
                            </SelectItem>
                          </SelectGroup>
                        </template>
                      </SelectContent>
                    </Select>
                  </FormItem>
                </FormField>
              </div>

              <div v-show="hasHouse">
                <FormField
                  v-slot="{ componentField }"
                  name="house"
                >
                  <FormItem>
                    <FormLabel>Maison</FormLabel>

                    <Select
                      v-bind="componentField"
                      :open="isHasHouseSelectOpen"
                      @update:open="isHasHouseSelectOpen = $event"
                    >
                      <SelectTrigger :open="isHasHouseSelectOpen">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            v-for="option in isHouseValueDropdownOptions"
                            :key="option.value"
                            :value="option.value"
                          >
                            {{ option.label }}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                </FormField>
              </div>

              <FormField
                v-slot="{ componentField }"
                name="price"
              >
                <FormItem>
                  <FormLabel class="flex items-center">
                    Loyer
                    <HoverCard>
                      <HoverCardTrigger as-child>
                        <Button
                          variant="default"
                          type="button"
                          class="ml-2"
                        >
                          <InfoCircledIcon />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent class="w-80">
                        <div class="flex justify-between space-x-4">
                          <p class="text-sm">
                            Si vous ne connaissez pas votre loyer hors charges,
                            vous pouvez enlever 10% à votre loyer total.
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </FormLabel>

                  <FormControl>
                    <div class="relative items-center w-full">
                      <Input
                        v-bind="componentField"
                        class="pr-10"
                        type="number"
                        :placeholder="'Entre ton loyer'"
                        :min="0"
                        :max="10000"
                      />
                      <span
                        class="absolute inset-y-0 flex items-center justify-center px-2 end-0"
                      >
                        <span
                          class="flex items-center justify-center size-6 text-muted-foreground"
                        >€</span>
                      </span>
                    </div>
                  </FormControl>
                  <FormDescription> Loyer hors charges </FormDescription>
                </FormItem>
              </FormField>

              <FormField
                v-slot="{ componentField }"
                name="surface"
              >
                <FormItem>
                  <FormLabel class="flex items-center">
                    Surface
                  </FormLabel>
                  <FormControl>
                    <div class="relative items-center w-full">
                      <Input
                        v-bind="componentField"
                        class="pr-10"
                        type="number"
                        :placeholder="'Entre ta surface'"
                        :min="9"
                        :max="400"
                      />
                      <span
                        class="absolute inset-y-0 flex items-center justify-center px-2 end-0"
                      >
                        <span
                          class="flex items-center justify-center size-6 text-muted-foreground"
                        >m²</span>
                      </span>
                    </div>
                  </FormControl>
                </FormItem>
              </FormField>

              <FormField
                v-slot="{ componentField }"
                name="rooms"
              >
                <FormItem>
                  <FormLabel class="flex items-center">
                    Nombre de pièce(s)
                  </FormLabel>
                  <Select
                    v-bind="componentField"
                    :open="isRoomsSelectOpen"
                    @update:open="isRoomsSelectOpen = $event"
                  >
                    <SelectTrigger :open="isRoomsSelectOpen">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="option in roomValueDropdownOptions"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              </FormField>

              <FormField
                v-slot="{ componentField }"
                name="furnished"
              >
                <FormItem>
                  <FormLabel class="flex items-center">
                    Meublé
                  </FormLabel>
                  <Select
                    v-bind="componentField"
                    :open="isFurnishedSelectOpen"
                    @update:open="isFurnishedSelectOpen = $event"
                  >
                    <SelectTrigger :open="isFurnishedSelectOpen">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="option in furnishedDropdownOptions"
                          :key="option.value"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              </FormField>

              <div v-show="dateBuiltValueDropdownOptions.length">
                <FormField
                  v-slot="{ componentField }"
                  name="dateBuilt"
                >
                  <FormItem>
                    <FormLabel class="flex items-center">
                      Date de construction
                    </FormLabel>
                    <Select
                      v-bind="componentField"
                      :open="isDateBuiltSelectOpen"
                      @update:open="isDateBuiltSelectOpen = $event"
                    >
                      <SelectTrigger :open="isDateBuiltSelectOpen">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem
                            v-for="option in dateBuiltValueDropdownOptions"
                            :key="option.value"
                            :value="option.value"
                          >
                            {{ option.label }}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                </FormField>
              </div>
            </form>
          </div>
        </transition>

        <transition name="slide-side-l2r">
          <div
            v-if="displayMoreInfo"
            class="global-content"
          >
            <div
              key="2"
              class="grid"
              :style="{
                'grid-template-columns': `repeat(${
                  simulationResults?.length + 1
                }, 2fr)`,
              }"
            >
              <span class="label rounded-tl-md">Année de construction</span>
              <span
                v-for="(simulationResult, index) in simulationResults"
                :key="simulationResult.yearBuilt"
                :class="{
                  'rounded-tr-md': index === simulationResults.length - 1,
                }"
              >
                {{ simulationResult.yearBuilt }}
              </span>
              <span class="label">Prix maximum au m²</span>
              <span
                v-for="simulationResult in simulationResults"
                :key="simulationResult.yearBuilt"
              >{{ simulationResult.maxPrice }}€
              </span>
              <span
                class="label"
                :class="{ 'rounded-bl-md': isLegal }"
              >Prix maximum hors charges</span>
              <span
                v-for="(simulationResult, index) in simulationResults"
                :key="simulationResult.yearBuilt"
                :class="{
                  '-last-before-exceeding-section': !isLegal,
                  'rounded-br-md':
                    isLegal && index === simulationResults.length - 1,
                }"
              >{{ simulationResult.maxTotalPrice }}€
              </span>
              <template v-if="simulationResults.some((simulationResult) => simulationResult.maxTotalPrice < form.values.price)">
                <span class="label rounded-bl-md">Dépassement</span>
                <template
                  v-for="(simulationResult, index) in simulationResults"
                  :key="simulationResult.yearBuilt"
                >
                  <span
                    v-if="simulationResult.maxTotalPrice < form.values.price"
                    class="exceeding"
                    :class="{
                      'rounded-br-md': index === simulationResults.length - 1,
                    }"
                  >
                    +{{
                      +(
                        form.values.price - simulationResult.maxTotalPrice
                      ).toFixed(2)
                    }}€
                  </span>
                  <span
                    v-else
                    class="not-exceeding"
                    :class="{
                      'rounded-br-md': index === simulationResults.length - 1,
                    }"
                  >
                    OK
                  </span>
                </template>
              </template>
            </div>
            <div
              v-if="!isLegal"
              class="pushy-text"
            >
              <h4 class="my-4 text-lg font-bold">
                Et maintenant ?
              </h4>
              <p>
                Une fois <b>le bail signé</b>, s'il est <b>non-conforme</b> et
                qu'aucune <b>mention justificative</b> n'apparait dans les
                documents, vous pouvez vous renseigner afin de
                <b>faire valoir vos droits.</b>
              </p>

              <p>
                Pour plus d’informations,
                <b><a
                  :href="simulationResults[0].moreInfo"
                  target="_blank"
                >
                  voir le site de votre {{ isMultipleCities ? "agglomération" : "ville" }}
                </a></b>.
              </p>

              <p v-if="mainCitySelected === 'paysBasque'">
                Pour avoir de l'aide dans vos démarches, contactez l'<b><a
                  :href="'https://www.alda.eus/contact/'"
                  target="_blank"
                >association de défense des locataires Alda</a></b>.
              </p>

              <h4>Articles intéressants</h4>
              <div class="flex space-x-4">
                <a
                  href="https://www.leparisien.fr/economie/encadrement-des-loyers-locataires-faites-valoir-vos-droits-19-08-2021-GZAVHO5OVFH6XPACXPXMZ4YNMM.php"
                  target="_blank"
                >
                  Le Parisien
                </a>
                <a
                  href="https://immobilier.lefigaro.fr/article/condamne-a-rembourser-son-locataire-pour-un-bien-loue-51-euros-le-m2_68bddef4-3ed0-11eb-9ae8-33572115708c/"
                  target="_blank"
                >
                  Le Figaro Immo
                </a>
              </div>
            </div>
          </div>
        </transition>

        <transition name="slide-fade">
          <div
            v-if="simulationResultsLoading || simulationResults !== null"
            class="flex flex-wrap items-center justify-around m-4 result-section"
          >
            <span class="flex justify-center flex-1 py-2">
              <template v-if="simulationResultsLoading">
                <BounceLoader
                  class="spinner"
                  :loading="simulationResultsLoading"
                  color="#fdcd56"
                  :size="'20px'"
                />
              </template>
              <template v-else>
                {{ isLegal ?
                  simulationResults?.some((simulationResult) => simulationResult.maxTotalPrice < form.values.price) ?
                    "Potentiellement conforme" :
                    "Conforme" :
                  "Non conforme"
                }}
              </template>
            </span>
            <Button
              type="button"
              class="my-2"
              variant="secondary"
              :disabled="simulationResultsLoading"
              @click="onClickMoreInfo"
            >
              <template v-if="displayMoreInfo">
                <span class="rotate-[90deg]">
                  <ArrowIcon :icon-color="'black'" />
                </span>
                <span>Retour</span>
              </template>
              <template v-else>
                <span>Cliquez pour plus d'info</span>
                <span class="rotate-[270deg]">
                  <ArrowIcon :icon-color="'black'" />
                </span>
              </template>
            </Button>
          </div>
        </transition>

        <div class="flex items-center justify-end w-full px-5 pb-4">
          <Button
            type="button"
            @click="onReset"
          >
            Réinitialiser
          </Button>
        </div>
      </div>
    </div>

    <div @click="handleClose">
      <FixedButton>
        <StrokeIcon
          :width="'18px'"
          :height="'18px'"
        />
      </FixedButton>
    </div>
  </Page2Wrapper>
</template>

<script setup>
import { domain } from "@/helper/config";
import ArrowIcon from "@/icons/ArrowIcon.vue";
import StrokeIcon from "@/icons/StrokeIcon.vue";
import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shadcn/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/shadcn/ui/form";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/shadcn/ui/hover-card";
import { Input } from "@/shadcn/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
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
import { debounce } from "@/tools/debounce";
import { CheckIcon, InfoCircledIcon } from "@radix-icons/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from 'vee-validate'
import { onMounted, ref, watch } from "vue";
import BounceLoader from "vue-spinner/src/BounceLoader.vue";
import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    city: z.string(),
    district: z.string(),
    house: z.string().optional(),
    price: z.number().min(0).max(10000),
    surface: z.number().min(9).max(400),
    rooms: z.string(),
    furnished: z.string(),
    dateBuilt: z.string(),
  })
);

const idkId = "-1";

const mainCitySelected = ref("");
const initialValues = {
  city: undefined,
  district: undefined,
  house: "0",
  price: undefined,
  surface: undefined,
  rooms: undefined,
  furnished: undefined,
  dateBuilt: idkId,
};

const form = useForm({
  initialValues,
  validationSchema: formSchema,
});

const isMounted = ref(false);
const loading = ref(true);

const isCitySelectOpen = ref(false);
const isHasHouseSelectOpen = ref(false);
const isRoomsSelectOpen = ref(false);
const isFurnishedSelectOpen = ref(false);
const isDateBuiltSelectOpen = ref(false);
const isCityPopoverOpen = ref(false);
const isAddressPopoverOpen = ref(false);

const addressSelected = ref("");

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
    value: "1",
    label: "Maison",
  },
  {
    value: "0",
    label: "Appartement",
  },
];

const roomValueDropdownOptions = [
  {
    value: "1",
    label: "1 pièce",
  },
  {
    value: "2",
    label: "2 pièces",
  },
  {
    value: "3",
    label: "3 pièces",
  },
  {
    value: "4",
    label: "4 pièces et plus",
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
          value: dates.join(','),
          label: `Avant ${dates[1]}`,
        });
      } else if (dates[1] === null) {
        prev.push({
          value: dates.join(','),
          label: `Après ${dates[0]}`,
        });
      } else {
        prev.push({
          value: dates.join(','),
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
      const groupAlreadyThere = prev.find(
        ({ groupBy }) => groupBy === currentValue.label
      );

      if (groupAlreadyThere) {
        groupAlreadyThere.options.push({ value, label });
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
    districtGroupByDropdownOptions.value = districtDropdownOptions.value.reduce(
      (prev, district) => {
        if (!prev[district.groupBy]) {
          prev[district.groupBy] = [
            {
              groupBy: district.groupBy,
              value: district.value,
              label: district.label,
            },
          ];
        } else {
          prev[district.groupBy].push({
            groupBy: district.groupBy,
            value: district.value,
            label: district.label,
          });
        }
        return prev;
      },
      {}
    );
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
  form.setFieldValue('city', city);

  if (form.values.district) {
    form.setFieldValue('district', null);
  }

  addressSelected.value = "";

  if (districtDropdownOptions.value.length === 1) {
    form.setFieldValue("district", districtDropdownOptions.value[0].value);
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

const onReset = async () => {
  mainCitySelected.value = "";
  addressSelected.value = "";

  dateBuiltValueDropdownOptions.value = [];
  districtDropdownOptions.value = [];
  districtGroupByDropdownOptions.value = null;
  simulationResults.value = null;
  isLegal.value = null;

  hasHouse.value = false;
  isMultipleCities.value = false;

  displayMoreInfo.value = false;

  form.setValues({
    ...initialValues,
  });
};

const handleSearchingAddress = debounce(
  async (address) => await fetchingAddress(address),
  500
);

const handleFetchSimulatorResult = debounce(async () => {
  if (!form.meta.value.valid) return

  simulationResultsLoading.value = true
  await fetchSimulatorResult()
  simulationResultsLoading.value = false
}, 250)

const fetchingAddress = async (address) => {
  if (address.trim().length < 4) {
    return;
  }

  try {
    const rawResult = await fetch(
      `${domain}districts/address/${
        mainCitySelected.value
      }?q=${address.trim()}&city=${form.values.city}`
    );
    const res = await rawResult.json();
    if (res.message === "token expired") throw res;
    setAddressDropdownOptions(res);
  } catch (err) {
    console.error(err);
  }
};

const fetchSimulatorResult = async () => {
  const optionParams = {
    surfaceValue: form.values.surface,
    priceValue: form.values.price,
    roomValue: form.values.rooms,
    furnishedValue: form.values.furnished,
    dateBuiltValueStr: form.values.dateBuilt,
    districtValue: form.values.district,
    isHouseValue: form.values.house || "0",
  };

  const strOptions = Object.keys(optionParams)
    .map((key) => {
      return key + "=" + optionParams[key];
    })
    .join("&");

  try {
    const rawResult = await fetch(
      `${domain}simulator/${mainCitySelected.value}?${strOptions}`
    );
    const res = await rawResult.json();
    if (res.message === "token expired") throw res;

    simulationResults.value = res;
    isLegal.value = res.some((r) => r.isLegal);
  } catch (err) {
    console.error(err);
  }
};

const onClickMoreInfo = () => {
  displayMoreInfo.value = !displayMoreInfo.value;
};

const handleClose = () => {
  isMounted.value = false;
};

onMounted(async () => {
  await fetchCities();
  isMounted.value = true;
});

watch(() => form.controlledValues.value, () => {
  handleFetchSimulatorResult()
})
</script>

<style lang="scss" scoped>
@use "@/assets/scss/variables.scss" as *;

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

  .global-content {
    display: block;
    padding: 1.25rem;
    width: 100%;
    box-sizing: border-box;
    overflow-y: auto;
  }

  a,
  a:visited {
    color: $yellow;
    transition: color ease 0.3s;

    &:hover {
      color: $darkeryellow;
    }
  }
}

.option-list div.global-content .grid {
  display: grid;
  overflow-x: auto;

  > span {
    padding: 8px;
    justify-content: center;
    align-items: center;
    display: flex;
    border: solid 1px;
  }

  > .label {
    font-weight: bold;
    text-align: left;
    line-height: normal;
  }

  .-last-before-exceeding-section {
    border-bottom-color: red;
  }

  > .exceeding {
    font-weight: 500;
    color: red;
  }

  > .not-exceeding {
    font-weight: 500;
    color: #69e882;
  }
}

.result-section {
  padding: 0.625rem;
  box-sizing: border-box;
  border: 1px solid white;
  position: relative;
  border-radius: 2px;
  margin: 0 1.25rem 2rem;
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

@media screen and (max-width: $mobileSize) {
  .option-list {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    margin-top: 0;
    border: none;
    
    .global-content {
      padding-top: 2rem;
    }
    // overflow-y: auto;
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
