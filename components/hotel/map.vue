<template>
  <div class="w-full relative">
    <button
      class="absolute md:block top-2 z-10 start-2 m-2 p-2 bg-red-500 rounded-full cursor-pointer hover:opacity-100 transition-colors hover:shadow-4-strong border border-white"
      @click="closeModalMap"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="#fff"
          d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z"
        />
      </svg>
    </button>
    <div
      class="h-[50px] absolute top-2 z-10 ltr:right-[10px] rounded-e-md rtl:left-[10px] w-[150px]"
      :class="`${hotelsNum === 0 ? 'opacity-[0.5] pointer-events-none' : ''}  `"
    >
      <Select
        v-model="selectedValue"
        class="h-[100%]"
        dir="ltr text-right"
        style="height: 100%"
      >
        <SelectTrigger class="py-[25px]">
          <SelectValue :placeholder="$t('content.hotels_view')" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              :value="item"
              @select="selectSortBy"
              v-for="item in [10, 20, 30, 50, 100]"
              :key="item"
            >
              {{ item }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div
      class="h-[100px] absolute flex-col items-center top-[50%] z-10 ltr:right-[50%] bg-white rtl:right-[50%] translate-x-[50%] flex justify-center rounded-e-md rtl:left-[10px] w-[250px]"
      v-if="map_loading"
    >
      <div class="loader"></div>
      <span class="mt-2">
        {{$t('content.map_is_loading')}}
      </span>
    </div>
    <div class="w-full grid lg:grid-cols-10 grid-cols-10" v-if="show_map">
      <!-- {{ center }} -->
      <div class="col-span-10 md:h-[80vh] h-[80vh]">
        <GoogleMap
          api-key="AIzaSyCOqEcYZhRD8oqvNxJtjrE9D-qVrXWwsDg"
          class="map h-full rounded-s-xl overflow-hidden w-full"
          :center="center_map"
          :zoom="11"
          mapTypeId="roadmap"
          zoomControlPosition="LEFT_CENTER"
          :zoomControl="true"
          :panControl="false"
          :mapTypeControl="false"
          :scaleControl="false"
          :streetViewControl="false"
          :rotateControl="false"
          :fullscreenControl="false"
          :disableDefaultUi="true"
          gestureHandling="greedy"
          :libraries="['places']"
          :styles="styleOption"
        >
          <template v-if="map_hotels.length > 0">
            <CustomMarker
              v-for="marker in map_hotels"
              :key="marker?.key"
              :options="{
                position: marker
                  ? {
                      lat: Number(marker.latitude),
                      lng: Number(marker.longitude),
                    }
                  : { lat: 0, lng: 0 },
              }"
              @click="showInfoWindow(marker)"
            >
              <template v-if="!!marker">
                <div style="text-align: center">
                  <div>
                    <div role="link" tabindex="0">
                      <div class="">
                        <div
                          :class="
                            marker.key == selectedMarkerId
                              ? 'bg-primary  text-light'
                              : searchStore.unitsVisited.includes(
                                  marker.key.toString()
                                )
                              ? 'bg-pink text-primary'
                              : 'bg-light  text-primary'
                          "
                          class="px-6 py-3 shadow-md relative h-full w-full text-dark bottom-1 border rounded-2xl border-primary whitespace-nowrap e1cf39a0ae font-black text-md font-mono"
                          style="
                            font-family: 'Arial' !important;
                            font: 600 12px 'Arial' !important;
                          "
                        >
                          {{ marker.minPrice?.value }}
                          {{ $t(`content.${marker.minPrice.currency}`) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>

              <InfoWindow
                :options="{
                  position: infoWindowPosition,
                  anchorPoint: 'TOP_CENTER',
                }"
                :opened="infoWindowOpened"
                v-model="infoWindowOpened"
                v-if="searchStore.infoWindowOpened"
              >
                <section
                  class="grid-cols-12 overflow-hidden bg-light hover:bg-[#e1e1e115] hidden md:grid"
                  style="
                    max-width: 300px;
                    min-height: 250px;
                    font-family: 'El Messiri', sans-serif;
                  "
                  v-if="markerUnitOpen !== null"
                >
                  <div
                    class="relative md:h-[150px] h-[125px] mt-8 col-span-12 overflow-hidden"
                  >
                    <div class="image-container relative md:w-[100%]">
                      <swiper
                        :dir="locale == 'ar' ? 'rtl' : 'ltr'"
                        :slidesPerView="1"
                        spaceBetween="10"
                        :pagination="{
                          clickable: true,
                        }"
                        :navigation="{
                          nextEl: `.slider-product-image-next-0`,
                          prevEl: `.slider-product-image-prev-0`,
                        }"
                        :modules="[
                          SwiperNavigation,
                          SwiperAutoplay,
                          SwiperPagination,
                        ]"
                        v-if="markerUnitOpen.hotelImages?.length > 0"
                      >
                        <swiper-slide
                          v-for="i in markerUnitOpen.hotelImages"
                          :key="i"
                        >
                          <div class="w-full h-full rounded-[24px]">
                            <NuxtImg
                              :src="i.url"
                              class="xl:h-[100%] lg:h-[100%] !h-[125px] w-full object-cover rounded-[24px]"
                              placeholder="/icons/loading.svg"
                              alt=""
                              loading="lazy"
                            />
                          </div>
                        </swiper-slide>
                      </swiper>
                      <buttonF
                        @click="addFav()"
                        class="AddFav absolute flex items-center justify-center z-[3] top-[15px] left-[10px] w-[36px] h-[36px] rounded-[50%] bg-white"
                      >
                        <IconFavFill
                          v-if="markerUnitOpen.favIcon"
                        ></IconFavFill>
                        <IconFavStroke v-else></IconFavStroke>
                      </buttonF>
                      <div
                        v-if="markerUnitOpen.specialDeal"
                        class="absolute flex items-center bg-burgundy border-[1px] px-[6px] py-[3px] border-white rounded-[49px] text-white justify-center z-[3] top-[15px] right-[10px]"
                      >
                        <span class="text-[12px]"> خصم 10% </span>
                      </div>
                    </div>
                  </div>

                  <div class="relative col-span-12 h-full">
                    <div class="grid grid-cols-12 h-full">
                      <div
                        class="md:col-span-12 col-span-12 flex justify-between flex-col"
                      >
                        <div class="flex-row">
                          <div
                            class="row flex items-center justify-between text-sm text-start"
                            v-if="markerUnitOpen?.key"
                          >
                            <span
                              class="text-gray-800 font-semibold text-sm md:text-lg"
                            >
                              {{ markerUnitOpen?.name }}
                            </span>
                            <span>
                              <div
                                class="bg-[#F5E0EA] text-[#AC0054] gap-1 flex items-center text-md px-2 rounded-3xl font-semibold"
                              >
                                <svgz
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 12 12"
                                >
                                  <path
                                    fill="#AC0054"
                                    d="M5.283 1.546a.8.8 0 0 1 1.435 0L7.83 3.798l2.486.361a.8.8 0 0 1 .443 1.365L8.96 7.277l.425 2.476a.8.8 0 0 1-1.16.844L6 9.427l-2.224 1.17a.8.8 0 0 1-1.16-.844l.424-2.476l-1.799-1.753a.8.8 0 0 1 .444-1.365l2.486-.36z"
                                  />
                                </svgz>
                                <span class="text-lg font-bold">
                                  {{ markerUnitOpen?.stars }}
                                </span>
                              </div>
                            </span>
                          </div>
                        </div>
                        <div class="flex items-center justify-between mt-2">
                          <div class="flex-row text-right">
                            <div class="flex gap-2 items-center">
                              <div class="">
                                <h5
                                  class="text-primary flex items-center gap-1 font-bold text-[18px]"
                                >
                                  {{ markerUnitOpen.pricePerDay.value }}
                                  {{
                                    $t(
                                      `content.${markerUnitOpen.minPrice.currency}`
                                    )
                                  }}
                                  <span class="text-[#909090]">
                                    / {{ $t("content.night") }}
                                  </span>
                                </h5>
                                <h6
                                  class="text-[14px] text-[#909090] font-semibold underline"
                                >
                                  {{
                                    $t("content.hotel_package", {
                                      price: markerUnitOpen.minPrice.value,
                                      days: markerUnitOpen.search.stay,
                                    })
                                  }}
                                  <span class="">
                                    {{
                                      $t(
                                        `content.${markerUnitOpen.minPrice.currency}`
                                      )
                                    }}
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </div>
                          <!-- @click="navigateToPage(markerUnitOpen)" -->
                          <button
                            class="bg-primary text-sm text-white px-4 py-2 rounded-md w-fit hover:underline"
                            @click="goToHotel(markerUnitOpen?.key)"
                          >
                            {{ $t("content.details") }}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section
                  class="grid md:hidden grid-cols-12 gap-2 overflow-hidden bg-light hover:bg-[#e1e1e115]"
                  style="font-family: 'El Messiri', sans-serif"
                  v-if="markerUnitOpen !== null"
                >
                  <div class="relative col-span-5 overflow-hidden">
                    <div
                      class="image-container relative md:w-[100%] top-[50%] translate-y-[-50%]"
                    >
                      <swiper
                        :dir="locale == 'ar' ? 'rtl' : 'ltr'"
                        :slidesPerView="1"
                        spaceBetween="10"
                        :pagination="{
                          clickable: true,
                        }"
                        :navigation="{
                          nextEl: `.slider-product-image-next-0`,
                          prevEl: `.slider-product-image-prev-0`,
                        }"
                        :modules="[
                          SwiperNavigation,
                          SwiperAutoplay,
                          SwiperPagination,
                        ]"
                        v-if="markerUnitOpen.hotelImages?.length > 0"
                      >
                        <swiper-slide
                          v-for="i in markerUnitOpen.hotelImages"
                          :key="i"
                        >
                          <div class="w-full h-full rounded-[10px]">
                            <NuxtImg
                              :src="i.url"
                              class="!h-[125px] w-full object-cover rounded-[10px]"
                              alt=""
                              loading="lazy"
                            />
                          </div>
                        </swiper-slide>
                      </swiper>
                      <buttonF
                        @click="addFav()"
                        class="AddFav absolute flex items-center justify-center z-[3] top-[5px] left-[5px] w-[36px] h-[36px] rounded-[50%] bg-white"
                      >
                        <IconFavFill
                          v-if="markerUnitOpen.favIcon"
                        ></IconFavFill>
                        <IconFavStroke v-else></IconFavStroke>
                      </buttonF>
                      <div
                        v-if="markerUnitOpen.specialDeal"
                        class="absolute flex items-center bg-burgundy border-[1px] px-[6px] py-[3px] border-white rounded-[49px] text-white justify-center z-[3] top-[15px] right-[10px]"
                      >
                        <span class="text-[12px]"> خصم 10% </span>
                      </div>
                    </div>
                  </div>

                  <div class="relative col-span-7 h-full pt-4">
                    <div class="grid grid-cols-12 h-full">
                      <div class="md:col-span-12 col-span-12 flex flex-col">
                        <div class="flex-row">
                          <div
                            class="row flex items-center justify-between text-sm text-start pt-4"
                            v-if="markerUnitOpen?.key"
                          >
                            <span
                              class="text-gray-800 font-semibold text-sm md:text-lg"
                            >
                              <span class="text-wrap w-[150px]">
                                {{ markerUnitOpen?.name }}
                              </span>
                              <span
                                class="bg-[#F5E0EA] w-fit text-[#AC0054] gap-1 flex items-center mt-1 text-md px-2 rounded-3xl font-semibold"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="10"
                                  height="10"
                                  viewBox="0 0 12 12"
                                >
                                  <path
                                    fill="#AC0054"
                                    d="M5.283 1.546a.8.8 0 0 1 1.435 0L7.83 3.798l2.486.361a.8.8 0 0 1 .443 1.365L8.96 7.277l.425 2.476a.8.8 0 0 1-1.16.844L6 9.427l-2.224 1.17a.8.8 0 0 1-1.16-.844l.424-2.476l-1.799-1.753a.8.8 0 0 1 .444-1.365l2.486-.36z"
                                  />
                                </svg>
                                <span class="text-md font-bold">
                                  {{ markerUnitOpen?.stars }}
                                </span>
                              </span>
                            </span>
                          </div>
                        </div>
                        <div class="flex items-center justify-between mt-2">
                          <div class="flex-row text-right">
                            <div class="flex gap-2 items-center">
                              <div class="">
                                <h5
                                  class="text-primary flex items-center gap-1 font-bold text-[18px]"
                                >
                                  {{ markerUnitOpen.pricePerDay.value }}
                                  {{
                                    $t(
                                      `content.${markerUnitOpen.pricePerDay.currency}`
                                    )
                                  }}

                                  <span class="text-[#909090]">
                                    / {{ $t("night") }}
                                  </span>
                                </h5>
                                <h6
                                  class="text-[14px] text-[#909090] text-left font-semibold underline"
                                >
                                  {{
                                    $t("content.hotel_package", {
                                      price: markerUnitOpen.minPrice.value,
                                      days: markerUnitOpen.search.stay,
                                    })
                                  }}
                                  <span class="">
                                    {{
                                      $t(
                                        `content.${markerUnitOpen.minPrice.currency}`
                                      )
                                    }}
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </div>
                          <!-- @click="navigateToPage(markerUnitOpen)" -->
                        </div>
                        <button
                          class="bg-primary text-sm text-white px-4 py-1 mt-1 rounded-md w-fit hover:underline ml-auto"
                          @click="goToHotel(markerUnitOpen?.key)"
                        >
                          {{ $t("content.details") }}
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </InfoWindow>
            </CustomMarker>
          </template>
        </GoogleMap>
      </div>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/stores/hotels/search"; // Pinia store for managing search data
import { useFilter } from "@/stores/hotels/hotelsFilter";

import {
  GoogleMap,
  MarkerCluster,
  CustomMarker,
  Marker,
  InfoWindow,
} from "vue3-google-map";
import { generalStore } from "@/stores/general";
import { tryOnUnmounted } from "@vueuse/core";

const props = defineProps({
  hotels: {
    type: Array,
    default: () => [],
  },
  center: {
    type: Object,
    default: () => ({ lat: 0, lng: 0 }),
  },
});
const center_map = ref({});
watch(
  () => props.center,
  (val) => {
    center_map.value = val;
  }
);
const emits = defineEmits(["navigateToPage"]);
const useFilterStore = useFilter();
const { perPage } = storeToRefs(useFilter());

const searchStore = useSearchStore();
const localePath = useLocalePath();
const { searchObj } = storeToRefs(generalStore());
const { map_hotels, MAP } = storeToRefs(useSearchStore());

const styleOption = ref([
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
]);
const show_map = ref(false);
const map_loading = ref(false);
watch(
  () => MAP.value,
  async (val) => {
    if (val) {
      setTimeout(async () => {
        show_map.value = true;
        map_loading.value = true;
        await useFilterStore.handleFilterApi(true, true).finally(() => {
          console.log(show_map.value);
          map_loading.value = false;
        });
      }, 1000);
    }
  },
  { immediate: true }
);

const infoWindowPosition = ref(searchStore.center);

const infoWindowOpened = ref(false);
const markerUnitOpen = ref(null);

const selectedMarkerId = ref(0);
function showInfoWindow(marker) {
  console.log(marker);

  searchStore.markerUnitOpen = marker;
  selectedMarkerId.value = marker.key;
  if (!searchStore.unitsVisited.includes(marker.key.toString())) {
    searchStore.unitsVisited.push(marker.key.toString());
  }
  infoWindowOpened.value = true;
  searchStore.infoWindowOpened = true;
  infoWindowPosition.value = {
    lat: Number(marker.latitude),
    lng: Number(marker.longitude),
  };
  markerUnitOpen.value = marker;
  console.log(markerUnitOpen.value);

  // unitsVisited.value.push(marker.id)
}
function closeInfoWindow() {
  infoWindowOpened.value = false;
  selectedMarkerId.value = 0;
}

const closeModalMap = async () => {
  searchStore.isOpenMap = false;
  //   asyncGetFilterDataVal()

  //   modalMap.value = false
  searchStore.MAP = false;
  // enableScroll()
};

const navigateToPage = (val) => {
  emits("navigateToPage", val);
};
let router = useRouter();

const goToHotel = (id) => {
  const url = `/hotels/${id}-book`;
  const queryParams = {
    searchId: id,
    checkIn: searchObj.value.checkIn,
    checkOut: searchObj.value.checkOut,
  };
  const updatedRoute = {
    path: url,
    query: {
      ...queryParams,
    },
    replace: false,
  };

  const fullLocalePath = localePath(updatedRoute);
  router.push(fullLocalePath);
};

//handle show hotels in map
const selectedValue = ref("");
watch(
  () => selectedValue.value,
  async (val) => {
    // console.log(val);
    perPage.value = val;
    await useFilterStore.handleFilterApi(true, true);
  }
);
// const selectSortBy = ()=>{

// }
onUnmounted(() => {
  markerUnitOpen.value = {};
  infoWindowOpened.value = false;
  searchStore.infoWindowOpened = false;
  perPage.value = 15;
});
</script>
<style lang="scss">
.gm-style .gm-style-iw-c {
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
.gm-style-iw-ch {
  display: none;
}
@media (max-width: 767px) {
  .gm-ui-hover-effect {
    position: absolute !important;
    top: -8px !important;
    right: -6px;
    width: 48px !important;
    z-index: 999;
    height: 48px;
  }
  .gm-style .gm-style-iw-c {
    box-shadow: none !important;
    -webkit-box-shadow: none !important;
    border: 1px dotted;
    max-width: 350px !important;
    @apply border-primary border-dashed border-[.5px]  !important;
  }
}
.gm-ui-hover-effect > span {
  background: rgba(255, 0, 0, 0.548) !important;
}
@media (min-width: 768px) {
  .gm-ui-hover-effect {
    position: absolute !important;
    top: 0px !important;
    right: 0px !important;
  }
}
</style>