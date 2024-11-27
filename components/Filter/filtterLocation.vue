<script lang="ts" setup>
import { useFilterUnits } from "~/stores/hotels/filter";
import type { SuggestionLocation } from "~/stores/hotels/filter";
import FilterCity from "~/components/Filter/filterCity.vue";

const store = useFilterUnits();

const getLocations = () => {
  if (store.filter.location == "") isWrite.value = false;
  else {
    isWrite.value = true;
    store.getSuggestion({ location: store.filter.location });
  }
};
const filterLocation = (location: SuggestionLocation) => {
  store.filter.location = location.name;
  store.filter.city_id = "";
  store.filter.city = "";
  store.filter.country = "";
  store.filter.country_id = "";
  store.filter.locationAddress = location;
  // if (store.filter.location == '')
  //   isWrite.value = false
  // else {
  //   isWrite.value = true
  //   store.getSuggestion({ location: store.filter.location })
  // }
};
const isWrite = ref(false);
const { t, locale } = useI18n();
</script>

<template>
  <div
    class="relative col-span-full w-full md:w-auto cursor-pointer md:col-span-4 justify-center items-center bg-light border-2xl rounded-2xl shadow-xl md:shadow-none"
  >
    <div
      class="flex items-center cursor-pointer p-2 w-full h-full hover:bg-desc rounded-lg"
    >
      <Icon
        name="mdi:map-marker"
        v-on:click="store.activeMenu = 'location'"
        class="w-6 me-2 h-6 text-primary object-contain"
      />
      <div
        class="flex flex-col grow"
        v-on:click="store.activeMenu = 'location'"
      >
        <label
          for="guestsAndRooms"
          class="text-xs cursor-pointer text-dark/50"
          >{{ $t("content.location") }}</label
        >
        <input
          autocomplete="off"
          id="location"
          type="text"
          @keyup="getLocations"
          v-model="store.filter.location"
          class="w-full py-1 bg-[transparent] focus:outline-none"
        />
      </div>
      <Icon
        v-if="!!store.filter.guestsAndRoomsInput"
        name="mdi:close"
        v-on:click.stop="store.resetDataFilter('guestsAndRooms')"
        class="w-6 me-2 h-6 text-primary object-contain cursor-pointer"
      />
    </div>
    <div
      :class="store.activeMenu == 'location' ? '' : 'hidden'"
      class="fixed md:pt-1 md:h-max top-0 md:w-full md:absolute z-50 shadow-lg md:top-[calc(100%+10px)] min-h-[500px] rounded-lg rtl:left-0 ltr:right-0 max-h-max flex justify-between flex-col left-0 h-full overflow-y-auto overflow-x-hidden outline-none w-full px-4 py-8 backdrop-blur-sm md:px-0 md:py-0"
    >
      <div
        class="flex justify-between flex-col bg-light h-full shadow-xl md:min-h-[500px]"
      >
        <div
          class="flex justify-between items-center md:shadow-sm flex-shrink-0 md:rounded-t-md border-b border-dark/10 p-4 dark:border-opacity-50 md:min-[0px]:rounded-none shadow-md hover:bg-desc rounded-lg mt-4 mx-2 md:hover:bg-white md:rounded-none md:mx-0"
        >
          <span class="hidden md:block">{{ $t("content.location") }}</span>
          <div
            class="flex flex-col grow md:hidden"
            v-on:click="store.activeMenu = 'location'"
          >
            <label
              for="guestsAndRooms"
              class="text-xs cursor-pointer text-dark/50"
              >{{ $t("content.location") }}</label
            >
            <input
              autocomplete="off"
              id="location"
              type="text"
              @keyup="getLocations"
              v-model="store.filter.location"
              class="w-full py-1 bg-[transparent] focus:outline-none"
            />
          </div>
          <Icon
            v-on:click="store.activeMenu = ''"
            name="mdi:close"
            class="w-6 me-2 h-6 text-primary object-contain cursor-pointer"
          />
        </div>

        <div class="flex flex-col justify-center py-4 mx-2" v-if="isWrite">
          <ul>
            <li
              v-for="locaation in store.suggestionLocations"
              @click="filterLocation(locaation)"
              class="flex flex-row items-center"
            >
              <Icon
                name="mdi:map-marker"
                class="w-8 ms-2 h-8 me-5 text-primary object-contain"
              />
              <span>{{ locaation.name }} </span>
            </li>
          </ul>
        </div>
        <div class="flex flex-col justify-center py-4 mx-2" v-else>
          <filter-city></filter-city>
        </div>
        <!-- Modal footer -->
        <div
          class="mt-auto flex flex-shrink-0 flex-wrap items-center justify-between rounded-b-md border-t-2 shadow-md border-dark/10 p-4 dark:border-opacity-50 min-[0px]:rounded-none"
        >
          <button
            type="button"
            class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
            v-on:click="store.resetDataFilter('location')"
          >
            {{ $t("filterSearch.btnReset") }}
          </button>

          <button
            type="button"
            class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
            v-on:click="store.handleSearch(t)"
          >
            {{ $t("filterSearch.apply") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
