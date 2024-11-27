<template>
  <div>
    <div class="fixed w-[100vw] left-0 right-0 z-[9999999] h-[100vh] bg-white top-0"
      :class="{ 'hidden': !store.checkMobileCitySearch }">
      <div class="head bg-primary p-3 flex items-center justify-between text-white">
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" fill="none" stroke="white" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" class="-scale-x-100 transform">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <input type="text" :placeholder="$t('content.search')"  v-model="store.searchText" @keyup="debouncedSearch" class="bg-transparent placeholder:text-white text-white outline-none" name="" id="">
        </div>
        <IconClose @click="store.checkMobileCitySearch = false" color="#fff"></IconClose>
        <!-- <span class="font-bold text-[18px]"> {{ $t('content.selectedLocation') }} </span> -->
      </div>
      <!-- <div class="input-container flex flex-col gap-3 px-3 mt-5">
        <span> {{ $t('content.where_do_you_want_to_live') }} </span>
        <div class="input  border-[#000] rounded-[8px] border-[1px] p">
          <input type="text" v-model="store.searchText" @keyup="debouncedSearch"
            class="outline-none w-full  rounded-[8px] bg-[#fafafa] py-2 px-3">
        </div>
      </div> -->
      <div class="max-h-[500px] overflow-y-auto px-3 mt-5">

        <div class="flex flex-col gap-2">
          <div
              v-if="store.pendingSearch"
              class="flex items-center flex-col gap-3 justify-center mt-10"
            >
            <span class="text-[14px] text-gray"> {{ $t('loadingText') }} </span>
              <div role="status">
                <IconLoader></IconLoader>
              </div>
            </div>
          <div v-for="item in store.cities" @click="getCity(item), store.checkMobileCitySearch = false"
            class="flex flex-row justify-between cursor-pointer bg-secondary  items-center rounded-md md:m-2 m-1 px-2 py-4">

            <div class="flex items-center  gap-1 md:ms-1 ">
              <div class="flex justify-center items-center">
                <IconSearchCity></IconSearchCity>

              </div>
              <div class=""> {{ item.name }} </div>
            </div>
            <div class="text-[12px] text-[#808080]"> {{ $t('content.city') }} </div>

          </div>
          <div v-if="store.hotels.length >= 1" class="bg-primary p-2 px-5 text-white font-normal text-[18px]"> {{
            $t('content.realestates') }} </div>
          <div v-for="item in store.hotels" @click="getHotel(item), store.checkMobileCitySearch = false"
            class="flex flex-row ltr-item-custom justify-between cursor-pointer bg-secondary items-center rounded-md md:m-2 m-1 px-2 py-4">

            <div class="flex items-center gap-1">
              <IconSearchHotel></IconSearchHotel>
              <div class="textt">
                <div>
                  <span class="text-[13px] font-medium"> {{ item.name }} </span>
                </div>
              </div>

            </div>
            <span class="text-[12px] text-[#808080]"> {{ $t('hosting.hotel') }} </span>

          </div>
        </div>
      </div>
      <div @click="store.checkMobileCitySearch = false" class="flex items-center px-3 justify-center mt-3">
        <button class="bg-primary w-[90%] py-2 rounded-md text-white font-bold"> {{ $t('content.apply') }} </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { generalStore } from '@/stores/general'
let store = generalStore();
import { useDateSearchCity } from '~/composables/utilities/searchCity'
const { searchInput, filterdCities, getCity, debouncedSearch, getHotel } = useDateSearchCity();

</script>
<style lang="">

</style>