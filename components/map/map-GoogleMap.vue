<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import {
    GoogleMap,
    MarkerCluster,
    CustomMarker,
    Marker,
    InfoWindow
  } from 'vue3-google-map'
  import { useFilterUnits } from '~/stores/hotels/filter'

  import Modal from '~/components/core/modal-map.vue'
  import modalFilter from '~/components/core/modal-filter.vue'
  const emits = defineEmits(['navigateToPage'])
  const storeState = useFilterUnits()
  const localePath = useLocalePath()
  const props = defineProps(['isMobile', 'assetsFilter', 'city_id'])
  const infoWindowOpened = ref(false)
  const filterOpened = ref(false)
  const selectedMarkerId = ref(0)
  const isMobile = ref(props.isMobile)
  const zoom = ref(14)
  const styleOption = ref([
    {
      featureType: 'administrative',
      elementType: 'geometry',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'poi',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off'
        }
      ]
    }
  ])
  const { t, locale } = useI18n()
  const filterCount = ref(0)
  const category = ref(0)

  const markerUnitOpen = ref(null)
  const infoWindowPosition = ref(storeState.center)

  function closeInfoWindow() {
    infoWindowOpened.value = false
    selectedMarkerId.value = 0
  }

  function showInfoWindow(marker: any) {
    console.log(marker,'marker');
    
    storeState.markerUnitOpen = marker
    selectedMarkerId.value = marker.id
    if (!storeState.unitsVisited.includes(marker.id.toString())) {
      storeState.unitsVisited.push(marker.id.toString())
    }
    infoWindowOpened.value = true
    storeState.infoWindowOpened = true
    infoWindowPosition.value = { lat: Number(marker.lat), lng: Number(marker.lng) }
    markerUnitOpen.value = marker
    // unitsVisited.value.push(marker.id)
  }
  const route = useRoute()
  const isWalletPath = computed(() => route.path.includes('/wallet'))
  watch(storeState, (newVal, oldVal) => {
    // if (!newVal.map_pending) {
    //   if (storeState.map_units.length && !selectedMarkerId.value) {
    //     const marker = storeState.map_units[0]
    //     marker.units = storeState.units
    //     showInfoWindow(marker)
    //   }
    // }
  })
  onMounted(() => {
    storeState.map_pending = false
    storeState.isMobile = props.isMobile
    // if (props.city_id != storeState.filter.city_id)
    storeState.map_units = []
    storeState.markerUnitOpen = null
    // storeState.markerUnitOpen = {} as MapUnit
    storeState.filter.city_id = props.city_id
    storeState.getUnitsFilterByMap()
  })

  const openBottomFilter = () => {
    storeState.isOpenFilterModel = true
    filterOpened.value = true
  }

  const showRusaluFilterBtn = async () => {
    // storeState.map_units = []
    storeState.map_pending = false
    storeState.getUnitsFilterByMap()

    closeBottomFilter()
  }

  const closeBottomFilter = () => {
    storeState.isOpenFilterModel = false
    filterOpened.value = false
  }
  const current_hotel = reactive({})
  const show_current_hotel = ref(false)
  const showHotelInfo = (val) => {
    current_hotel = val
    show_current_hotel.value = !show_current_hotel.value
  }
  const navigateToPage = (val)=>{
    emits('navigateToPage',val)
  }
</script>
<template>
  <div>

  <template v-if="isMobile">
    <div
      class="w-full md:hidden h-[100%] grid lg:grid-cols-8 grid-cols-6 overflow-x-hidden overflow-y-hidden relative"
    >
      <div
        v-if="storeState.markerUnitOpen"
        class="fixed left-[25%] bottom-[15%] z-50 flex justify-between flex-col overflow-y-auto overflow-x-hidden"
      >
        <client-only>
          <modal
            v-if="infoWindowOpened"
            height="30%"
            width="100%"
            @close-modal="closeInfoWindow"
          >
            <template v-slot:content>
              <div
                class="max-h-[250px] w-full min-h-[180px] flex justify-between flex-col overflow-y-auto overflow-x-hidden outline-none px-2"
              >
                <div class="relative px-4 py-4 bg-light min-[0px]:overflow-y-auto">
                  <template v-if="storeState.map_units != null">
                    <home-unit-card :units="storeState.map_units" class="col-span-1" />

                    <div class="h-10"></div>
                  </template>
                </div>
              </div>
            </template>
          </modal>
        </client-only>
      </div>

      <div class="col-span-8 h-full min-h-[80vh] border-2">
        <GoogleMap
          api-key="AIzaSyCOqEcYZhRD8oqvNxJtjrE9D-qVrXWwsDg"
          class="map h-full rounded-s-xl overflow-hidden"
          :center="storeState.center"
          :zoom="15"
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
          <template v-if="storeState.map_units.length > 0">
            <CustomMarker
              v-for="marker in storeState.map_units"
              :key="marker?.id"
              :options="{
                position: marker
                  ? { lat:  Number(marker.lat) , lng:Number( marker.lng) }
                  : { lat: 0, lng: 0 }
              }"
              @click="showInfoWindow(marker)"
            >
              <template v-if="!!marker">
                <div style="text-align: center">
                  <div>
                    <div role="link" tabindex="0">
                      <div class="">
                        <!-- <div :class="marker.id == selectedMarkerId ? 'bg-burgundy' : storeState.unitsVisited.includes(marker.id) ? 'bg-pink text-dark' : 'bg-primary '" -->

                        <div
                          :class="
                            marker.id == selectedMarkerId
                              ? 'bg-primary  text-light'
                              : storeState.unitsVisited.includes(marker.id.toString())
                              ? 'bg-pink text-dark'
                              : 'bg-light  text-dark '
                          "
                          class="px-2 py-1 relative h-full border-primary w-full text-dark bottom-1 border rounded-md  whitespace-nowrap e1cf39a0ae font-black text-md font-mono"
                          style="
                            font-family: 'Arial' !important;
                            font: 600 12px 'Arial' !important;
                          "
                        >
                          <template v-if="isWalletPath">
                            <Icon
                              name="mdi:map-marker-outline"
                              color="light"
                              class="w-6 h-6 object-contain"
                            />
                          </template>
                          <template v-else>
                            {{
                              marker?.ratePlan.totalAmountAfterTaxRate.toLocaleString(
                                $t('app.currency_local'),
                                {
                                  style: 'currency',
                                  maximumFractionDigits: 0,
                                  currency: marker?.ratePlan?.currency
                                    ? marker?.ratePlan?.currency
                                    : 'SAR'
                                }
                              )
                            }}
                          </template>
                          <!--                      style='font-family: var(&#45;&#45;font-family),"sans-serif"!important;-->
                          <!--                      font: 600 12px  var(&#45;&#45;font-family),"sans-serif"!important'>-->

                          <!--                      ( {{ marker?.parents_units_count }} + )-->
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </CustomMarker>
          </template>
        </GoogleMap>
      </div>
    </div>

    <div
      v-if="storeState.map_pending"
      class="absolute top-[7%] left-[35%] flex w-[120px] h-[40px] items-center justify-center border rounded-md shadow-xl border-b border-primary/20 text-center text-[16px] font-bold overflow-hidden"
    >
      <button
        class="py-1 px-2 rounded-lg w-full items-center justify-center text-center capitalize flex flex-row h-full bg-light text-primary"
      >
        <Icon name="mdi:loading" color="primary" class="w-6 mr-2 h-6 animate-spin" />
      </button>
    </div>

    <client-only>
      <modalFilter
        v-if="filterOpened"
        height="80%"
        width="50%"
        @close-modal="closeBottomFilter"
      >
        <template v-slot:content>
          <div
            class="w-100 shadow-lg rounded-lg rtl:left-0 ltr:right-0 bg-light flex justify-between flex-col left-0 h-full overflow-y-auto overflow-x-hidden outline-none"
          >
            <div
              class="w-[100%] h-[100%] z-[1000] shadow-lg min-h-[200px] rounded-lg bg-lightw flex justify-center flex-col overflow-y-auto overflow-x-hidden text-start outline-none"
            >
              <div
                class="flex justify-between items-center shadow-md flex-shrink-0 rounded-t-md border-b-1 border-dark/10 p-2 dark:border-opacity-50 min-[0px]:rounded-none"
              >
                <button
                  type="button"
                  class="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-extrabold uppercase leading-normal text-burgundy transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  v-on:click="storeState.clearAllFilters('map')"
                >
                  {{ $t('filterSearch.btnReset') }}
                </button>
                <h4 class="text-center text-[14px] font-extrabold">
                  {{ $t('content.filter') }}
                </h4>

                <Icon
                  color="primary"
                  v-on:click="closeBottomFilter"
                  name="mdi:close"
                  class="w-6 mr-2 h-6 object-contain"
                />
              </div>

              <div class="relative px-4 py-2 min-[0px]:overflow-y-auto">
                <filter-price></filter-price>
                <div class="px-3 py-2 border-t border-dark/10">
                  <h4 class="text-[14px] font-extrabold my-2">
                    {{ $t('content.guestsAndRooms') }}
                  </h4>
                  <div class="flex flex-col justify-center items-center py-2 mx-4">
                    <filter-rooms></filter-rooms>
                  </div>
                </div>

                <div class="px-3 py-2 border-t border-dark/10">
                  <h4 class="text-[14px] font-extrabold my-2">
                    {{ $t('content.category') }}
                  </h4>
                  <filter-category></filter-category>
                </div>

                <div class="px-3 pt-1 min-w-[250px] border-t border-dark/10">
                  <h4 class="text-[14px] font-extrabold text-dark my-2">
                    {{ $t('content.unit_type') }}
                  </h4>
                  <filter-filtter-unit-type></filter-filtter-unit-type>
                </div>

                <div class="px-3 py-2 min-w-[250px] border-t border-dark/20">
                  <h4 class="text-[14px] font-extrabold text-dark my-2">
                    {{ $t('content.facilities_and_features') }}
                  </h4>
                  <filter-filtter-feature></filter-filtter-feature>
                </div>
              </div>

              <div
                class="mt-auto flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-t-2 shadow-md border-dark/10 p-4 dark:border-opacity-50 min-[0px]:rounded-none"
              >
                <button
                  type="button"
                  class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200 w-full p-1 truncate bg-primary hover:bg-opacity-70 text-light transition-all cursor-pointer"
                  v-on:click="showRusaluFilterBtn"
                >
                  <span v-if="storeState.map_pending">
                    <Icon name="mdi:loading" class="w-6 mr-2 h-6 animate-spin" />
                  </span>
                  <div v-else>
                    <span class="px-1"> {{ $t('filterSearch.btnApply') }}</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </template>
      </modalFilter>
    </client-only>
  </template>

  <template v-if="!isMobile">
    <div class="w-full grid lg:grid-cols-10 grid-cols-10">
      <div class="col-span-10 md:h-[80vh] h-[80vh]">
        <GoogleMap
          api-key="AIzaSyCOqEcYZhRD8oqvNxJtjrE9D-qVrXWwsDg"
          class="map h-full rounded-s-xl overflow-hidden"
          :center="storeState.center"
          :zoom="10"
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
          <template v-if="storeState.map_units.length > 0">
            <CustomMarker
              v-for="marker in storeState.map_units"
              :key="marker?.id"
             :options="{
                position: marker
                  ? { lat:  Number(marker.lat) , lng:Number( marker.lng) }
                  : { lat: 0, lng: 0 }
              }"
              @click="showInfoWindow(marker)"
            >
              <template v-if="!!marker">
                <div style="text-align: center">
                  <div>
                    <div role="link" tabindex="0">
                      <div class="">
                        <!-- <div :class="marker.id == selectedMarkerId ? 'bg-burgundy' : storeState.unitsVisited.includes(marker.id) ? 'bg-pink text-dark' : 'bg-primary '" -->

                        <div
                          :class="
                            marker.id == selectedMarkerId
                              ? 'bg-primary  text-light'
                              : storeState.unitsVisited.includes(marker.id.toString())
                              ? 'bg-pink text-dark'
                              : 'bg-light  text-dark'
                          "
                          class="px-6 py-3 shadow-md relative h-full w-full text-dark bottom-1 border rounded-2xl border-primary whitespace-nowrap e1cf39a0ae font-black text-md font-mono"
                          style="
                            font-family: 'Arial' !important;
                            font: 600 12px 'Arial' !important;
                          "
                        >
                          <template v-if="isWalletPath">
                            <Icon
                              name="mdi:map-marker-outline"
                              color="light"
                              class="w-6 h-6 object-contain"
                            />
                          </template>
                          <template v-else>
                            {{
                              marker?.ratePlan.totalAmountAfterTaxRate.toLocaleString(
                                $t('app.currency_local'),
                                {
                                  style: 'currency',
                                  maximumFractionDigits: 0,
                                  currency: marker?.ratePlan?.currency
                                    ? marker?.ratePlan?.currency
                                    : 'SAR'
                                }
                              )
                            }}
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              
              <InfoWindow
                :options="{ position: infoWindowPosition, anchorPoint: 'TOP_CENTER' }"
                :opened="infoWindowOpened"
                v-model="infoWindowOpened"
                v-if="storeState.infoWindowOpened"
              >
                <MapUnit v-if="markerUnitOpen != null" :unit="markerUnitOpen" @navigateToPage="navigateToPage" />
              </InfoWindow>
            </CustomMarker>
          </template>
        </GoogleMap>
      </div>
      <div
        v-if="storeState.map_pending"
        class="absolute top-[50%] flex md:w-[120px] w-[120px] translate-x-1/2 translate-y-1/2 md:h-[70px] h-[40px] items-center justify-center border rounded-md shadow-xl border-b border-primary/20 text-center text-[16px] font-bold overflow-hidden"
        :class="locale === 'en' ? 'left-[50%] ' : 'right-[50%]'"
      >
        <button
          class="py-1 px-2 rounded-lg w-full items-center justify-center text-center capitalize flex flex-row h-full bg-light text-primary"
        >
          <Icon
            name="mdi:loading"
            color="primary"
            class="w-6 h-6 md:w-12 md:h-12 mr-2 animate-spin"
          />
        </button>
      </div>
    </div>


  </template>
  </div>

</template>

<style scoped type="text/scss">
  /* .map {
    position: relative;
    width: 100%;
    height: 800px;
} */

  .gm-style .gm-style-iw-c {
    display: none !important;
  }

  .Vue-Toastification__container {
    z-index: 999999999 !important;
  }

  .bg-pink {
    background-color: #ffc8e1;
    color: #000 !important;
    font-size: 12px;
    font-weight: bold;
  }

  .e1cf39a0ae:after {
    background-color: inherit;
    border-bottom: inherit;
    border-left: inherit;
    border-right: 1px solid transparent;
    border-top: 1px solid transparent;
    bottom: -4px;
    content: '';
    display: block;
    height: 6px;
    left: 0;
    margin: 0 auto;
    position: absolute;
    right: 0;
    transform: rotate(-45deg);
    width: 6px;
    z-index: 2;
  }

  .gm-style {
    font-family: var(--font-family), 'sans-serif' !important;
    font: 400 11px var(--font-family), 'sans-serif' !important;
    text-decoration: none;
  }
</style>
