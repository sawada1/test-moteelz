<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";
import VueMultiselect from "vue-multiselect";
import { useStaticData } from "~/stores/staticData";
import { useUser } from "~/stores/user";

const store = useFilterUnits();
const staticData = useStaticData();
const filterPackageId = useCookie("filterPackageId");
const userStore = useUser();

onMounted(async () => {});

const handleCities = async () => {
  store.filter.country_id = store.filter.country?.country_id.toString();
  store.filter.city_id = "";
};

const handleUnits = async (typeSelected: number) => {
  store.filter.locationAddress = null;
  store.filter.location = store.filter.city?.city_name;
  store.units = [];
  store.filter.city_id = store.filter.city?.city_id.toString();
  store.scrollLoading = true;
  store.isLoadingFirst = false;
  store.scrollPaginate = 0;
  store.filtersCounter();
  store.filtering();
};

const filterCities = (v: { country_id: number; city_id: number }) =>
  v.country_id == Number(store.filter.country_id) &&
  (Number(filterPackageId) > 0
    ? userStore.package.cities_ids.includes(v.city_id)
    : true);
const filterCountries = (v: { country_code: string }) =>
  Number(filterPackageId) > 0
    ? userStore.package.countries_codes.includes(v.country_code)
    : true;

onMounted(() => {
  if (staticData.countries.length == 0) staticData.getCountries();
  if (staticData.cities.length == 0) staticData.getCities();
});
</script>

<template>
  <div
    class="grid grid-cols-2 justify-start gap-1 md:gap-0 items-center h-12 md:h-full"
  >
    <div
      class="relative flex justify-center cursor-pointer rounded items-center h-full md:border-t-none border-t md:rtl:border-r md:ltr:border-l md:rtl:rounded-bl-none md:ltr:rounded-br-none border-2xl border-lg border border-dark/10 border-y md:shadow-none bg-light md:rtl:rounded-r-2xl md:py-3 md:ltr:rounded-l-2xl md:rounded-t-none border-lg"
    >
      <VueMultiselect
        track-by="country_id"
        label="country_name"
        :show-labels="false"
        :placeholder="$t('content.searchCountry')"
        @select="handleCities"
        :value="store.filter.country"
        v-model="store.filter.country"
        :options="staticData.countries?.filter(filterCountries)"
        :preselect-first="false"
        :allow-empty="false"
      >
        <template v-slot:noResult>{{ $t("content.filterDistract") }}</template>
        <template v-slot:noOptions>{{ $t("content.selectCountry") }}</template>
        <template v-slot:placeholder
          >{{ $t("content.selectCountry") }}
          <Icon name="mdi:magnify" class="w-5 me-2 h-5 object-contain" />
        </template>
      </VueMultiselect>
    </div>

    <div
      class="relative cursor-pointer md:py-3 rounded h-full flex justify-center items-center bg-light border-lg border border-dark/10 border-y md:mb-0 md:shadow-none"
    >
      <VueMultiselect
        track-by="city_id"
        label="city_name"
        :show-labels="false"
        :placeholder="$t('content.searchCity')"
        @select="handleUnits"
        :value="store.filter.city"
        v-model="store.filter.city"
        :options="staticData.cities?.filter(filterCities)"
        :preselect-first="false"
        :allow-empty="false"
      >
        <template v-slot:noResult>{{ $t("content.selectCity") }}</template>
        <template v-slot:noOptions>{{ $t("content.selectCity") }}</template>
        <template v-slot:placeholder
          >{{ $t("content.selectCity") }}
          <Icon name="mdi:magnify" class="w-5 me-2 h-5 object-contain" />
        </template>
      </VueMultiselect>
    </div>
  </div>
</template>

<style>
.multiselect__placeholder {
  display: inline-block !important;
  margin-bottom: 0px !important;
  padding-top: 0px !important;
}

.multiselect__placeholder {
  margin-left: 10px;
  margin-top: 2px;
}

.multiselect__tag {
  border: 1px solid rgba(60, 60, 60, 0.26) !important;

  margin-bottom: 0px !important;
  margin-right: 5px !important;
}

.multiselect__tags {
  min-height: unset;
  display: block;
  padding: 8px 40px 0 8px;

  border: unset;
  background: unset;
  font-size: 14px;
}

.multiselect__placeholder {
  /* color: #000000;
    font-size: 14px;
    font-weight: 800; */
}

.multiselect__option--selected.multiselect__option--highlight {
  background: #ffc8e180;
  color: #000;
}

.multiselect__option--highlight {
  background: #755cf1;
  color: white;
}

.multiselect__input::placeholder {
  /* Adjust the color and font-size as needed */
  color: #999;
  font-size: 12px !important;
}
</style>
