<script lang="ts" setup>
import { ref } from "vue";
import { useFilterUnits } from "~/stores/hotels/filter";
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import FilterDistricts from "~/components/Filter/filterDistricts.vue";
import FilterDate from "~/components/Filter/filterDate.vue";
import FilterDateLabel from "~/components/Filter/filterDateLabel.vue";
import FilterCategory from "~/components/Filter/filterCategory.vue";
import FiltterUnitType from "~/components/Filter/filtterUnitType.vue";
import FiltterFeature from "~/components/Filter/filtterFeature.vue";
import FilterRooms from "~/components/Filter/filterRooms.vue";
import FilterCity from "~/components/Filter/filterCity.vue";
import Modal from "~/components/core/modal.vue";
import FiltterLocation from "~/components/Filter/filtterLocation.vue";

const store = useFilterUnits();
const token = useCookie("token");
const showModal = ref(false);
const activeUnit = ref({});
const searchBtn = ref(null);
// useListen('unit', async (unit) => {
//   activeUnit.value = unit
//   showModal.value = true
// })

/*use part*/
const { t, locale } = useI18n();
const config = useRuntimeConfig();
/*vars & props*/
const props = defineProps({
  city_id: { type: String, default: "0" },
  country_id: { type: String, default: "0" },
  from: { type: String, default: "city" },
});
const isLoadingFirst = ref(false);
const isLoadingFilter = ref(false);
const selectedCountry = ref(props.country_id);
const filterPackageId = useCookie("filterPackageId");

const myBottomSheet = ref<InstanceType<typeof VueBottomSheet>>();
const filterBottomSheet = ref<InstanceType<typeof VueBottomSheet>>();

const isSmailScreen = ref(false);
const openBottom = () => {
  myBottomSheet.value?.open();
};

const closeBottomFilter = () => {
  store.isOpenFilterModel = false;
  // store.filtering()
  filterBottomSheet.value?.close();
};

onMounted(() => {
  store.setOrderBySeed();
  isLoadingFirst.value = true;
  getDistrictCity();
  store.getFilterAssets({
    country_id: selectedCountry.value,
    city_id: props.city_id,
  });
  // getUnitsByCityId()
});

const getDistrictCity = async () => {
  store.getDistrictCity({
    country_id: selectedCountry.value,
    city_id: props.city_id,
  });
};
/* Methods */

const openModalMap = async (isMob: boolean) => {
  useEvent("openModalMap", isMob);

  // isMobile.value = isMob;
  // modalMap.value = true;
  disableScroll();
};
const disableScroll = async () => {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.documentElement.style.height = "100%";
  document.body.style.height = "100%";
};
</script>
<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col justify-center items-center p-2">
      <!--The search-->
      <div
        class="rounded-md max-w-6xl justify-center items-center w-[100%] md:w-full"
      >
        <!--The search desktop-->
        <div
          class="hidden md:grid grid-cols-12 shadow-lg shadow-indigo-500/70 rounded-2xl bg-light md:border border-dark/10 mx-1 border md:border-none"
        >
          <!--          <div-->

          <!--            class="relative md:col-span-4 col-span-full justify-center items-center bg-light border-2xl rounded-2xl"-->
          <!--          >-->
          <!--            <filter-city></filter-city>-->
          <!--          </div>-->

          <filtter-location></filtter-location>
          <div
            class="relative col-span-full flex justify-center items-center bg-light border-lg border border-dark/10 border-y md:mb-0 md:shadow-none"
            :class="{
              'md:col-span-3  ': from == 'city',
              'md:col-span-3': from != 'city',
            }"
          >
            <div class="grid grid-cols-2 h-full py-2 px-1 mt-1">
              <filter-date-label></filter-date-label>
              <div
                v-if="
                  store.activeMenu == 'check_in' ||
                  store.activeMenu == 'check_out'
                "
                class="hidden md:block fixed h-full pt-28 md:pt-1 md:h-max top-0 w-auto md:absolute z-40 shadow-lg md:top-[calc(100%+10px)] min-h-[200px] rounded-md left-0 ltr:left-0 rtl:right-0 max-h-max bg-light"
              >
                <div
                  class="relative col-span-6 flex justify-center items-center border-dark/10 mt-1 bg-light border-lg border"
                >
                  <filter-date></filter-date>
                </div>
              </div>
            </div>
          </div>

          <div
            class="relative col-span-3 flex justify-center items-center border-t md:rtl:border-r md:ltr:border-l md:rtl:rounded-bl-none md:ltr:rounded-br-none border-2xl border-lg border border-dark/10 border-y md:shadow-none bg-light"
            :class="{
              'md:col-span-3  ': from == 'city',
              'md:col-span-3 p-1': from != 'city',
            }"
          >
            <div
              class="flex items-center cursor-pointer p-2 w-full h-full hover:bg-desc rounded-lg"
            >
              <Icon
                name="mdi:sofa-outline"
                v-on:click="store.activeMenu = 'guestsAndRooms'"
                class="w-6 me-2 h-6 text-primary object-contain"
              />
              <div
                class="flex flex-col grow"
                v-on:click="store.activeMenu = 'guestsAndRooms'"
              >
                <label
                  for="guestsAndRooms"
                  class="text-xs cursor-pointer text-dark/50"
                  >{{ $t("content.guestsAndRooms") }}</label
                >
                <input
                  v-if="!!store.filter.guestsAndRoomsInput"
                  id="guestsAndRooms"
                  readonly
                  type="text"
                  v-model="store.filter.guestsAndRoomsInput"
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
              v-if="!isSmailScreen"
              :class="store.activeMenu == 'guestsAndRooms' ? '' : 'hidden'"
              class="fixed md:pt-1 md:h-max top-0 w-full md:absolute z-50 shadow-lg md:top-[calc(100%+10px)] min-h-[200px] rounded-lg rtl:left-0 ltr:right-0 md:w-[400px] max-h-max bg-light flex justify-between flex-col left-0 h-full overflow-y-auto overflow-x-hidden outline-none"
            >
              <div
                class="flex justify-between items-center shadow-sm flex-shrink-0 rounded-t-md border-b-1 border-dark/10 p-4 dark:border-opacity-50 min-[0px]:rounded-none"
              >
                <span>{{ $t("content.guestsAndRooms") }}</span>
                <Icon
                  v-on:click="store.activeMenu = ''"
                  name="mdi:close"
                  class="w-6 me-2 h-6 text-primary object-contain cursor-pointer"
                />
              </div>

              <div class="flex flex-col justify-center items-center py-10">
                <filter-rooms></filter-rooms>
              </div>
              <!-- Modal footer -->
              <div
                class="mt-auto flex flex-shrink-0 flex-wrap items-center justify-between rounded-b-md border-t-2 shadow-md border-dark/10 p-4 dark:border-opacity-50 min-[0px]:rounded-none"
              >
                <button
                  type="button"
                  class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  v-on:click="store.resetDataFilter('guestsAndRooms')"
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
          <div
            class="col-span-full w-full h-full bg-light md:ltr:rounded-r-2xl md:rtl:rounded-l-2xl rounded-b-2xl border-lg border-dark/10 border-t md:px-0 md:py-0 py-2"
            :class="{
              'md:col-span-2  ': from == 'city',
              'md:col-span-1 p-1 ': from != 'city',
            }"
          >
            <button
              ref="searchBtn"
              @click="store.handleSearch($t)"
              class="bg-primary text-light px-2 md:py-1 py-2 w-full h-full md:ltr:rounded-r-2xl md:rtl:rounded-l-2xl md:ltr:rounded-l-none md:rtl:rounded-r-none rounded-2xl"
            >
              {{ $t("content.search") }}
            </button>
          </div>
        </div>
        <!--The search Mobile-->
        <div class="md:hidden grid grid-cols-12 rounded-xl mx-3 p-2">
          <div class="flex items-center justify-between col-span-full">
            <filtter-location></filtter-location>
            <button
              @click="openBottom"
              class="h-[40px] w-auto bg-[#FFFFFF] border-[#DDDDDD] border-[1px] rounded-md flex justify-center items-center mx-2 shadow-xl"
            >
              <Icon
                name="mdi:tune"
                color="primary"
                class="w-11 h-8 text-primary object-contain"
              />
            </button>
          </div>
        </div>
        <vue-bottom-sheet ref="myBottomSheet">
          <div
            class="grid grid-cols-12 h-full shadow-sm shadow-indigo-500/70 rounded-2xl bg-light border-dark/10 mx-3 border p-2"
          >
            <div
              class="relative col-span-full flex justify-center items-center bg-light border-sm border border-y border-dark/10 rounded-md"
            >
              <div class="grid grid-cols-2 h-14 md:h-full">
                <filter-date-label></filter-date-label>
              </div>
            </div>
            <div
              v-if="
                store.activeMenu == 'check_in' ||
                store.activeMenu == 'check_out'
              "
              class="md:hidden relative col-span-12 flex justify-center items-center mt-1 bg-light border-sm border border-dark/10"
            >
              <filter-date></filter-date>
            </div>
            <div
              class="relative col-span-full flex flex-col my-1 justify-center items-center border-t border-md border border-light border-y h-full"
            >
              <div
                class="flex items-center w-full p-2 cursor-pointer hover:bg-desc rounded-lg"
                :class="{ 'h-full': !!!store.filter.guestsAndRoomsInput }"
              >
                <Icon
                  name="mdi:sofa-outline"
                  class="w-6 me-2 h-6 text-primary object-contain cursor-pointer"
                />
                <div class="flex flex-col grow cursor-pointer">
                  <label
                    for="guestsAndRooms"
                    class="text-xs text-dark/50 cursor-pointer"
                    >{{ $t("content.guestsAndRooms") }}</label
                  >
                  <input
                    v-if="store.filter.guestsAndRoomsInput"
                    id="guestsAndRooms"
                    readonly
                    type="text"
                    v-model="store.filter.guestsAndRoomsInput"
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
                class="md:pt-1 h-max w-full z-50 shadow-lg md:top-[calc(100%+10px)] min-h-[200px] rounded-lg rtl:left-0 ltr:right-0 md:w-[400px] max-h-max bg-light flex justify-between flex-col left-0 overflow-x-hidden outline-none"
              >
                <div class="flex flex-col justify-center items-center py-10">
                  <filter-rooms></filter-rooms>
                </div>
              </div>
            </div>
          </div>
          <template #footer>
            <div
              class="col-span-full w-full h-full bg-light rounded-b-2xl border-sm border-t-2 border-dark/10 py-1"
            >
              <button
                ref="searchBtn"
                @click="store.handleSearch($t)"
                class="bg-primary text-light px-2 py-2 w-full h-full rounded-2xl"
              >
                {{ $t("content.search") }}
              </button>
            </div>
          </template>
        </vue-bottom-sheet>
      </div>
      <div class="mt-10 grid grid-cols-11">
        <div class="col-span-full md:col-span-8">
          <filter-slider></filter-slider>
        </div>
        <div
          class="col-span-full md:col-span-3 flex flex-row justify-end mt-2 md:mt-0"
        >
          <button
            @click="showModal = true"
            class="h-[40px] w-auto bg-[#FFFFFF] border-[#DDDDDD] border-[1px] rounded-md flex justify-center items-center mx-2 hover:border-dark"
          >
            <Icon
              name="mdi:tune"
              color="primary"
              class="w-6 h-6 pb-1 text-primary object-contain"
            />
            <span class="px-1">{{ $t("content.filtering") }}</span>
            <span>( {{ store.filter.filterCount }} )</span>
          </button>

          <button
            class="h-[40px] w-auto bg-[#FFFFFF] border-[#DDDDDD] border-[1px] rounded-md flex justify-center items-center mx-2 hover:border-dark"
          >
            <span
              class="mx-3 text-center md:text-md text-md font-normal text-dark"
              >عرض الأسعار قبل الضرائب
            </span>

            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" checked />
              <div
                class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              ></div>
            </label>
          </button>
        </div>
      </div>
      <modal
        v-if="showModal"
        height="80%"
        width="70%"
        @close-modal="showModal = false"
      >
        <template v-slot:title>
          <div
            class="flex justify-between items-center shadow-md flex-shrink-0 rounded-t-md border-b-1 border-dark/10 p-2 dark:border-opacity-50 min-[0px]:rounded-none"
          >
            <button
              type="button"
              class="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-extrabold uppercase leading-normal text-burgundy transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
              v-on:click="store.clearAllFilters()"
            >
              {{ $t("filterSearch.btnReset") }}
            </button>
            <h4 class="text-center text-[14px] font-extrabold">
              {{ $t("content.filter") }}
            </h4>
            <Icon
              color="primary"
              v-on:click="closeBottomFilter"
              name="mdi:close"
              class="w-6 mr-2 h-6text-primary object-contain"
            />
          </div>
        </template>
        <template v-slot:content>
          <div
            class="text-start h-full pt-5 z-[1000] shadow-lg rounded-lg max-h-max bg-light flex justify-between flex-col overflow-y-auto overflow-x-hidden outline-none"
          >
            <div class="relative px-4 py-2 min-[0px] overflow-y-auto">
              <filter-price v-if="from == 'city'"></filter-price>
              <div class="px-3 py-2 border-t border-dark/10">
                <h4 class="text-[14px] font-extrabold my-2">
                  {{ $t("content.category") }}
                </h4>
                <filter-category></filter-category>
              </div>
              <div class="px-3 pt-1 min-w-[250px] border-t border-dark/10">
                <h4 class="text-[14px] font-extrabold text-dark my-2">
                  {{ $t("content.unit_type") }}
                </h4>
                <filtter-unit-type></filtter-unit-type>
              </div>
              <div class="px-3 py-2 min-w-[250px] border-t border-dark/20">
                <h4 class="text-[14px] font-extrabold text-dark my-2">
                  {{ $t("content.facilities_and_features") }}
                </h4>
                <filtter-feature></filtter-feature>
              </div>
            </div>
            <div
              class="mt-auto flex flex-shrink-0 flex-wrap items-center justify-center rounded-b-md border-t-2 shadow-md border-dark/10 p-4 dark:border-opacity-50 min-[0px]:rounded-none"
            >
              <button
                type="button"
                class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200 w-full p-1 truncate bg-primary hover:bg-opacity-70 text-light transition-all cursor-pointer"
                v-on:click="
                  () => {
                    store.filtering();
                    showModal = false;
                    closeBottomFilter();
                  }
                "
              >
                <span v-if="isLoadingFilter">
                  <Icon
                    name="mdi:loading"
                    class="w-6 mr-2 h-6 animate-spin text-primary"
                  />
                </span>
                <div v-else>
                  <span class="px-1"> {{ $t("filterSearch.apply") }}</span>
                </div>
              </button>
            </div>
          </div>
        </template>
      </modal>
    </div>
  </div>
</template>

<style lang="scss">
.gm-style .gm-style-iw-c {
  display: none;
}

.Vue-Toastification__container {
  z-index: 999999999 !important;
}

@media (max-width: 999px) {
  .parent-nav {
    position: inherit !important;
  }

  .parent-nav nav {
    position: inherit !important;
    z-index: 10;
  }
}

.data-picker-c .dp__menu_inner::before {
  display: none;
}

.vc-header {
  direction: ltr;
}

.data-picker-c .dp__range_between {
  background: rgb(118 92 241 / 51%);
  border-radius: 0;
  border: 1px solid rgb(118 92 241 / 0%);
}

.data-picker-c .dp__today {
  border: 1px solid rgb(118 92 241 / 1);
}

.data-picker-c .dp__range_end,
.dp__range_start,
.dp__active_date {
  background: rgb(118 92 241 / 1);
  color: var(--dp-primary-text-color);
}

.action-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

#filtering {
  .list_hover {
    .close {
      display: block;
    }

    .open {
      display: none;
    }

    .dropdown {
      display: block;
    }
  }

  @media (min-width: 480px) {
    .container {
      max-width: none;
      padding-right: 2rem;
      padding-left: 2rem;
    }
  }

  .slider-primary {
    --slider-connect-bg: #0075ff;
    --slider-tooltip-bg: #0075ff;
    --slider-handle-ring-color: #0077ff2c;
  }
}

.su-two-column-list {
  -webkit-columns: 2;
  /* For Safari, Chrome, and other WebKit-based browsers */
  -moz-columns: 2;
  /* For Firefox */
  columns: 2;
  width: 35vw;
  /* For other browsers with support for CSS columns */
}

.su-two-column-list-unit {
  columns: 1;
  width: 25vw;
  /* For other browsers with support for CSS columns */
}

.su-li:hover {
  background-color: #d3d3d359;
}

.su-mr {
  margin-right: -40px;
}
</style>
