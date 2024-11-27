<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";
import FilterDistricts from "~/components/Filter/filterDistricts.vue";

const { t, locale } = useI18n();
const store = useFilterUnits();
const props = defineProps({
  city_id: { type: String, default: "0" },
  country_id: { type: String, default: "0" },
  from: { type: String, default: "city" },
});
const applyFilterDistract = async () => {
  if (store.filter.districts.length > 0) {
    store.filtersCounter();
    store.handleSearch(t);
  } else {
    store.filter.districtSelectedName = "";
    store.filter.districts = [];
    store.filtersCounter();
  }
  // destination.value = false
  // closeBottomDistract()
};
</script>

<template>
  <div
    class="grid grid-cols-1 px-1 mx-1"
    :class="{ list_hover: store.activeMenu == 'destination' }"
  >
    <div
      :class="
        ({
          'border border-dark/10 py-3 focus:outline-none focus:ring-0 hover:bg-desc/20 w-[90%] py-1 px-2 rounded-full bg-light text-sm font-bold leading-none text-burgundy flex items-center justify-between cursor-pointer   ':
            from != 'city',
        },
        {
          'flex w-full items-center hover:bg-desc  mt-1   rounded-lg text-dark/50 ':
            from == 'city',
        })
      "
    >
      <div
        class="flex flex-col grow"
        @mouseleave="store.activeMenu == ''"
        @mouseenter="store.activeMenu = 'destination'"
      >
        <div
          class=""
          :class="({ ' ': from != 'city' }, { 'mt-2 ': from == 'city' })"
        >
          <Icon
            v-if="from == 'city'"
            name="mdi:magnify"
            class="w-7 me-2 h-7 object-contain"
            :class="{ 'w-0 h-7 ': store.activeMenu != '' && from != 'city' }"
          />
          <label
            v-if="store.activeMenu != 'destination' || from == 'city'"
            for="destination"
            class="text-xs"
            :class="
              ({ 'text-burgundy ': from != 'city' },
              { 'text-dark/50 ': from == 'city' })
            "
            >{{ $t("content.destination") }}</label
          >
        </div>

        <input
          :class="store.activeMenu == 'destination' ? '' : 'hidden'"
          id="destination"
          @keyup="store.filteredListDistract"
          v-model="store.filter.inputDistrictName"
          type="text"
          class="w-full py-1 bg-[transparent] focus:outline-none"
          :placeholder="$t('content.destination')"
        />
        <input
          :class="!store.activeMenu == 'destination' ? '' : 'hidden'"
          readonly
          v-model="store.filter.districtSelectedName"
          type="text"
          class="w-full bg-[transparent] px-2 py- text-dark focus:outline-none"
          :placeholder="$t('content.destination')"
        />
      </div>
    </div>
    <div
      @mouseleave="store.activeMenu = ''"
      @mouseenter="store.activeMenu = 'destination'"
      :class="store.activeMenu == 'destination' ? '' : 'hidden'"
      class="fixed dropdown h-full pt-1 md:pt-1 md:h-max top-0 w-full md:absolute p-1 z-40 shadow-lg md:top-[calc(100%+10px)] min-h-[200px] rounded-md ltr:left-0 rtl:right-0 md:w-[400px] max-h-max bg-light"
    >
      <div
        class="flex justify-between items-center shadow-sm flex-shrink-0 rounded-t-md border-b-1 border-dark/10 p-2 dark:border-opacity-50 min-[0px]:rounded-none"
      >
        <span>{{ $t("content.destination") }}</span>
        <button
          type="button"
          class="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-extrabold uppercase leading-normal text-burgundy transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
          v-on:click="store.clearSelectDistract"
        >
          {{ $t("filterSearch.btnReset") }}
        </button>
      </div>
      <div class="h-[300px] p-1 overflow-y-auto overflow-x-hidden">
        <filter-districts></filter-districts>
      </div>
      <!-- Modal footer -->
      <div
        class="mt-auto flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-t-1 shadow-sm border-dark/10 p-4 min-[0px]:rounded-none"
      >
        <button
          type="button"
          class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200 p-1 truncate bg-primary hover:bg-opacity-70 text-light transition-all cursor-pointer w-full"
          v-on:click="applyFilterDistract"
        >
          <span class="px-1"> {{ $t("filterSearch.btnApply") }}</span>
          <span v-if="store.filter.districts.length > 0"
            >( {{ store.filter.districts.length }} )</span
          >
        </button>
      </div>
    </div>
  </div>
</template>
