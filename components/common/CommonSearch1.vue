<template>
  <div
    class="fixed city-container-search rtl:text-right ltr:text-left sm:pt-1 sm:h-max top-0 w-full sm:absolute !z-[555555] sm:top-[calc(100%+10px)] rounded-lg lg:rtl:left-0 lg:ltr:right-0 rtl:right-0 ltr:left-0 sm:w-[470px]  bg-white"
  >
    <div
      class="relative flex justify-between ltr-item-custom items-center direction-rtl shadow-sm flex-shrink-0 px-2 rounded-t-md  ps-2 py-2 dark:border-opacity-50 min-[0px]:rounded-none"
    >
      <span> {{ $t("content.selectedLocation") }} </span>

      <button @click="store.check1 = false">
        <svg
          data-v-c3ad5561=""
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-hidden="true"
          role="img"
          class="icon w-6 me-2 h-6 text-primary object-contain cursor-pointer"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
          ></path>
        </svg>
      </button>
    </div>

    <div class="flex flex-col justify-center items-center">
      <div
        class="flex flex-col gap-2 w-full lg:divide-y-0 divide-y mb-0 md:p-0 p-1"
      >
        <div class="flex flex-col">
          <div class="max-h-60 overflow-scroll">
            <div
              v-if="store.pendingSearch"
              class="flex items-center flex-col gap-3 justify-center mt-10"
            >
            <span class="text-[14px] text-gray"> {{ $t('loadingText') }} </span>
              <div role="status">
                <IconLoader></IconLoader>
              </div>
            </div>
            <div v-for="item in store.cities" :key="item">
              <div
                @click="getCity(item), (store.check1 = false)"
                class="flex flex-row ltr-item-custom justify-between cursor-pointer border-[0.5px] border-[#ccc] items-center rounded-md md:m-2 m-1 px-2 py-2"
              >
                <div class="flex items-center gap-1 md:ms-1">
                  <div class="flex justify-center items-center">
                    <IconSearchCity></IconSearchCity>
                  </div>
                  <div class="">{{ item.name }}</div>
                </div>
                <div class="text-sm text-secondary-600">
                  {{ $t("content.city") }}
                </div>
              </div>
            </div>
            <div
              v-if="store.hotels.length >= 1"
              class="bg-primary p-2 px-5 my-4 text-white font-normal text-[18px]"
            >
              {{ $t("content.realestates") }}
            </div>
            <div v-for="item in store.hotels">
              <div
                @click="getHotel(item), (store.check1 = false)"
                class="flex flex-row ltr-item-custom justify-between border-[0.5px] border-[#ccc] cursor-pointer items-center rounded-md md:m-2 m-1 px-2 py-2"
              >
                <div class="flex items-center gap-1">
                 <IconSearchHotel></IconSearchHotel>
                  <div class="textt">
                    <div>
                      <span class="text-[13px] font-medium">
                        {{ item.name }}
                      </span>
                    </div>
                  </div>
                </div>
                <span> {{ $t("hosting.hotel") }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-10 p-2 px-4 border-t">
      <div>
        <button
          @click="store.check1 = false"
          type="button"
          class="bg-primary text-white w-[150px] h-full rounded-lg hover:border-primary hover:border hover:bg-white border hover:text-primary p-1"
        >
          {{ $t("content.apply") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDateSearchCity } from "~/composables/utilities/searchCity";
import { generalStore } from "@/stores/general";
let store = generalStore();
const { searchInput, filterdCities, getCity, debouncedSearch, getHotel } =
  useDateSearchCity();
  onMounted(() => {
    if(store.hotels.length == 0 || store.cities.length == 0){
      store.getDestinations();
    }
});
</script>

<style lang="scss">

</style>
