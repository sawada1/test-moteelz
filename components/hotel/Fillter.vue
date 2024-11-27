<template>
  <div
    id="filter"
    ref="filter"
    class="relative filter_box w-full lg:max-w-[270px] h-fit z-30"
    :class="`${!events_completed ? 'opacity-[0.5] pointer-events-none' : ''}  `"

    >

    <div>
      <MapSection class="hidden md:block" @close="$emit('close')" />

      <div
        class="pt-[10px] lg:bg-[#FFFFFF] z-[5] p-4 rounded-lg transition-transform pb-[120px] md:pb-[0px]"
      >
      <div class="hidden md:block">

        <div class="flex justify-between items-center">
          <h1 class="text-[#312B72] text-[22px] font-[400] my-0">
            {{ $t("content.filter") }}
          </h1>
        </div>
        <Separator />
      </div>
        <div>
          <label for="">{{$t('content.hotel_name')}}</label>
          <input
            id="guestsAndRooms"
            type="text"
            class="w-full border focus:outline-none border-[#e2e2e2] rounded-xl mt-2 py-3 px-2"
            :placeholder="$t('content.enterHotel')"
            v-model="hotelName"
          />
        </div>
        <Separator />
        <PriceSection :price="filteredPrice" />

        <Separator />
        <div >
          <HotelRatingSection
            :visibleAccommodationTypes="hotelRatings"
            @updateHotelRatings="updateHotelRatings"
            :title="$t('fillter.Hotelrating')"

          />
          
          <Separator />
        </div>
        <div v-if="filteredTypes.length > 0">
      <AccommodationTypeSection
            @updateHotelTypes="updateHotelUnitType"
            :visibleAccommodationTypes="filteredTypes"
            filterType="unitType"
            :title="$t('content.estate_type')"
          />
          <Separator />
        </div>
        <div v-if="filteredFacilites.length > 0">
          <AccommodationTypeSection
            @updateHotelFacilities="updateHotelFacilities"
            :visibleAccommodationTypes="filteredFacilites"
            filterType="facility"
            :title="$t('content.facility')"
          />
          <Separator />
        </div>
        <div v-if="filteredBoard.length > 0">
          
          <HotelCheckedSection
            @updateHotelRatings="updateHotelBoard"
            :visibleAccommodationTypes="filteredBoard"
            filterType="filteredBoard"
            :title="$t('content.meals')"
          />
          <Separator />
        </div>
        <div v-if="filteredNonRefundable.length > 0">
          <HotelRadio
            @updateHotelRatings="updateHotelBoard"
            :visibleAccommodationTypes="filteredNonRefundable"
            filterType="filteredNonRefundable"
            :title="$t('content.rental_terms')"
          />
          <Separator />
        </div>
      </div>
      <div
        class="hidden md:grid fixed bottom-[0px] z-[999] bg-white py-2 px-2 border-[1px] gap-2 border-[#eee] rounded-tr-lg rounded-tl-lg  grid-cols-12"
        :style="{ width: width + 'px' }"
        v-if="show_filter_btn"
      >
        <button
          class="text-white w-full bg-primary p-[5px_50px] rounded-md block px-4 py-1 col-span-6"
          @click="handleFilter"
        >
          {{ $t("content.search") }}
        </button>
        <button
          class="  block px-4 py-1 text-nowrap  col-span-6 text-dark/90 text-[14px] border-primary text-primary border-2 rounded-md p-[5px_50px] bg-white"
          @click="resetFilters"
        >
          {{ $t("content.reset_all") }}
        </button>
      </div>
    </div>
    <!-- <div v-else>
       v-if="!filterStore.hotel_filter_loading"
      <LazySkeletonComp height="400" class="w-full block" />
      <LazySkeletonComp height="200" class="w-full mb-8" />
    </div> -->
  </div>
</template>
<script setup>
import { ref } from "vue";

import MapSection from "../sectionsFillter/MapSection.vue";
import PriceSection from "../sectionsFillter/PriceSection.vue";
import AccommodationTypeSection from "../sectionsFillter/AccommodationTypeSection.vue";
import HotelRatingSection from "../sectionsFillter/HotelRatingSection.vue";
import HotelCheckedSection from "../sectionsFillter/HotelCheckedSection.vue";
import HotelRadio from "../sectionsFillter/HotelRadio.vue";
import Separator from "../sectionsFillter/Separator.vue";
import { useFilter } from "@/stores/hotels/hotelsFilter";
import { useSearchStore } from "~/stores/hotels/search";
import { useWindowScroll, useElementSize,useWindowSize } from "@vueuse/core";
import { storeToRefs } from "pinia";

const emits = defineEmits(['closeFilter'])

const { active_stars, hotelName } = storeToRefs(useFilter());
const { events_completed } = storeToRefs(useSearchStore());
const useSearchStoreStore = useSearchStore();
const useFilterStore = useFilter();
const filter = ref(null);
const { height, width } = useElementSize(filter);
const { width:widthSize } = useWindowSize();
const { y } = useWindowScroll();
const show_filter_btn = ref(true);

watch(
  y,
  (val) => {
    // Update visibility based on height
    if (val > height.value - 375) {
      show_filter_btn.value = false;
    } else {
      show_filter_btn.value = true;
    }
  },
  {
    // Trigger the watch immediately
  }
);

const hotelRatings = ref([]);
const filteredTypes = ref([]);
const filteredFacilites = ref([]);
const filteredBoard = ref([]);
const filteredPrice = ref({});
const filteredNonRefundable = ref({});

const starHotel = ref([]);
const filteredbookingBenefits = ref([]);
const accommodationTypes = ref([]);
const sortBy = ref([]);
const guestsRooms = ref({ bedrooms: 1, beds: 1, persons: 1, bathrooms: 1 });
const priceRange = ref({ from: 0, to: 10000 });

watch(
  () => useSearchStoreStore.filter,
  (newValue) => {
    console.log(newValue);

    // bookingBenefits.value = newValue.featureBooking || [];
    // hotelRatings.value = newValue.stars || [];
    // accommodationTypes.value = newValue.hostingTypes || [];
    // featureCategories.value = newValue.featureCategories || [];
    hotelRatings.value = newValue.stars || [];
    filteredFacilites.value = newValue.facilities || [];
    filteredTypes.value = newValue.types || [];
    filteredNonRefundable.value = newValue.nonRefundable || [];
    
    filteredBoard.value = newValue.boardBasis || [];
    filteredPrice.value = newValue.priceRange || {};
  },
  { immediate: true }
);
const filters = ref({
  price: 5500,
  includeTaxes: false,
  sortBy: "",
  accommodationTypes: [],
  hotelRatings: [],
  bookingBenefits: [],
  featureCategories: [],
});
// const starHotel = ref([]);
//selected hotels

const selectedPriceRange = ref([144, 5500]);
const selectedBoardRange = ref([]);
const selectedHotelRatings = ref([]);
const selectedfilteredTypes = ref([]);
const selectedfilteredFacilites = ref([]);
const updateHotelRatings = (newCategories) => {
  if (
    selectedHotelRatings.value.indexOf(
      newCategories[newCategories.length - 1]
    ) !== -1
  ) {
    selectedHotelRatings.value.splice(
      selectedHotelRatings.value.indexOf(
        newCategories[newCategories.length - 1]
      ),
      1
    );
  } else {
    selectedHotelRatings.value.push(newCategories[newCategories.length - 1]);
  }
  starHotel.value = selectedHotelRatings.value;
  active_stars.value = selectedHotelRatings.value;
};
const updateHotelFacilities = (val) => {
  selectedfilteredFacilites.value = val;
};
const updateHotelUnitType = (val) => {
  selectedfilteredTypes.value = val;
};
const updatePrice = (val) => {
  selectedPriceRange.value = val[0];
};
const updateHotelBoard = (val) => {
  selectedBoardRange.value = val;
};
const handleFilter = async () => {
  await useFilterStore.handleFilterApi(false);
  if(widthSize.value < 768){
    emits('closeFilter')
  }
  
};
const resetFilters = async () => {
  await useFilterStore.resetFilters();
};
</script>

<style scoped>
#filter {
}

.dot {
  transition: transform 0.3s ease;
}
</style>
