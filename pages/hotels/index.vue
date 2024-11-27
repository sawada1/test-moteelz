<script setup>
import { useWindowSize, useWindowScroll } from "@vueuse/core";
import { Button } from "@/components/ui/button";

import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import { useSSE } from "@/composables/useSSE";
import { useSearch } from "@/composables/useSearch";
import { useSearchStore } from "@/stores/hotels/search";
import { generalStore } from "@/stores/general";
import { useFilter } from "@/stores/hotels/hotelsFilter";
import { storeToRefs } from "pinia";
let store = generalStore();
const { t } = useI18n();
useHead({
  title: t('header.hotels'),
  meta: [
    { name: 'description', content: t('') }
  ],
  bodyAttrs: {
    class: ''
  },
  script: [ { innerHTML: '' } ]
}) 
const useFilterStore = useFilter();

const { searchObj } = storeToRefs(generalStore());
const { meta, filter, map_center, events_completed,MAP } = storeToRefs(
  useSearchStore()
);
const searchStore = useSearchStore();

const { page, perPage, current_pge, filter_processing } = storeToRefs(
  useFilter()
);
const nprogress = useNuxtApp().$nprogress;

const row = ref(false);
const changeDisplayData = (val) => {
  row.value = val;
};
//check the size of window to handle the showing of cards in hotels page

const { width } = useWindowSize();
watch(
  () => width.value,
  (val) => {
    if (val < 768) {
      row.value = true;
    }
  },
  {
    immediate: true,
  }
);
//handle paagination
const hotels = ref([]);
//get hotels

// await useSearch(params);

// Local refs for handling progress and hotels display
const progress = ref(null);

// Watch the store's progress and hotel data
watch(
  () => searchStore.progress,
  (newProgress) => {
    progress.value = newProgress;
    console.log(progress.value);
    nprogress.set(progress.value);
  }
);
const totalPages = ref(0);
watch(
  () => searchStore.hotels,
  (newHotels) => {
    hotels.value = newHotels;
    totalPages.value = hotels.value.length;
  },
  {
    immediate: true,
  }
);
const isConnected = ref(false);
nprogress.start();

let connect, disconnect;

// Connect to SSE
isConnected.value = true;
const handleHotels = async (payload = params) => {
  // filter_processing.value = true
  // hotels.value = []
  const searchInstance = await useSearch(searchObj.value);
  connect = searchInstance.connect;
  disconnect = searchInstance.disconnect;
  connect();
  filter_processing.value = false;
};
onMounted(async () => {
  handleHotels(searchObj.value);
  // nprogress.start()
});
// Ensure disconnection when component is destroyed
onUnmounted(() => {
  if (isConnected.value) disconnect();
});
// Go to the selected page
const { x, y } = useWindowScroll();

const goToPage = async (pageNum) => {
  console.log(pageNum);

  page.value = pageNum;
  if (pageNum >= 1 && pageNum <= meta.value.total) {
    await useFilter().handleFilterApi(true);
  }
  y.value = 150;
};
const submitSearch = () => {
  handleHotels(searchObj.value);
};

//handle filter sarch
const secondModelFlag = ref(false);
const submitSearchFilter = async () => {
  secondModelFlag.value = false;
  await useFilterStore.handleFilterApi(false);
};
const resetFilters = async () => {
  secondModelFlag.value = false;
  await useFilterStore.resetFilters();
};
const progress_bar = ref(0);
watch(
  () => searchStore.progress,
  (val) => {
    progress_bar.value = val;
  }
);

//open Map From Small Screen
const openMapFromSmallScreen = async () => {
  secondModelFlag.vaue = false;
  searchStore.isOpenMap = true;
  // modalMap = !modalMap
  searchStore.MAP = true;
  await useFilterStore.handleFilterApi(true, true);
};
</script>
<template>
  <div class="min-h-screen overflow-scroll px-4 md:px-0" id="filtering">
    <hotel-HotelsBar
      :count="searchStore.countHotels"
      :progress="progress_bar"
    />

    <div
      class="fixed w-full h-full flex justify-center flex-col gap-3 items-center bg-[#f1f1f154] z-[9999]"
      v-if="filter_processing && !MAP"
    >
      <div class="loader"></div>
      <div class="flex flex-col p-4 bg-white items-center rounded-2xl">
        <span class="text-md font-bold">
          {{ $t("content.hotels_loading") }}
        </span>
      </div>
    </div>
    <CommonMainSearch
      class="md:max-w-[75%] mx-auto mt-6 hidden xl:block lg:block"
      @submitSearch="submitSearch"
    ></CommonMainSearch>
    <CommonFilter class="mt-6 mb-5 block xl:hidden lg:hidden"></CommonFilter>
    <CommonMainFilter
      v-if="store.showModalFilter"
      @submitSearch="submitSearch"
    ></CommonMainFilter>

    <hotel-unit-types
      class="md:mt-6"
      :unitsType="searchStore.filter?.types"
      v-if="searchStore.filter?.types?.length > 0"
    />
    <div
      class="grid grid-cols-12 max-w-7xl mx-auto md:mt-8"
      :class="[searchStore.filter?.types?.length === 0 ? 'md:mt-8' : '']"
    >
      <div class="md:col-span-3 hidden md:block">
        <hotel-fillter />
      </div>
      <div class="col-span-12 md:col-span-9 mb-24" v-if="!searchStore.MAP">
        <div class="flex mb-4 gap-4">
          <div class="flex-1">
            <hotel-sort-by :hotelsNum="hotels.length" />
          </div>
          <div class="hidden md:flex items-center">
            <hotel-grid-show-data
              :row="row"
              @changeDisplayData="changeDisplayData"
            />
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <CardProduct2
            v-for="(item, index) in hotels"
            :key="index"
            :index="index"
            :product="item"
            :row="row"
            class="mb-4"
            :class="[!row ? 'col-span-4' : 'col-span-12']"
          ></CardProduct2>

          <!--      
          <vue-awesome-paginate
            :total-items="meta.total"
            :items-per-page="meta.per_page"
            :max-pages-shown="100"
            v-model="currentPage"
            @click="onClickHandler"
          /> -->
          <!-- <div class="col-span-12" v-if="searchStore.progress !== 100 && hotels.length === 0">
            جاري تحميل الفنادق
          </div> -->
        </div>
        <client-only>
          <!-- <core-noUnits v-if="searchStore.no_units" /> -->
        </client-only>  
        
        <div v-if="searchStore.meta && searchStore.meta.last_page > 1" class="">
          <Pagination
            v-slot="{ page }"
            :total="meta.total"
            :sibling-count="1"
            show-edges
            :default-page="current_pge"
            class="col-span-12"
            dir="ltr"
            :items-per-page="15"
          >
            <PaginationList
              v-slot="{ items }"
              class="flex items-center gap-1 mt-4 justify-center"
            >
              <PaginationFirst @click="goToPage(1)" />
              <PaginationPrev @click="goToPage(page - 1)" />

              <template v-for="(item, index) in items" :key="index">
                <PaginationListItem
                  v-if="item.type === 'page'"
                  :value="item.value"
                  as-child
                >
                  <Button
                    class="w-12 h-12 p-0"
                    :variant="
                      item.value === page
                        ? ' !text-white !bg-primary'
                        : 'outline'
                    "
                    @click="goToPage(item.value)"
                  >
                    {{ item.value }}
                  </Button>
                </PaginationListItem>
                <PaginationEllipsis v-else :index="index" />
              </template>

              <PaginationNext @click="goToPage(page + 1)" />
              <PaginationLast @click="goToPage(meta.last_page)" />
            </PaginationList>
          </Pagination>
        </div>
      </div>
      <div v-else-if="searchStore.MAP" class="col-span-12 md:col-span-9">
        <hotel-map :hotels="hotels" :center="map_center"></hotel-map>
      </div>

      <shared-Modal
        v-model="secondModelFlag"
        class="pt-20 mx-[-20px]"
        :title="''"
        icon="mdi:tune"
      >
        <div class="flex flex-row w-full h-screen px-4">
          <div class="flex flex-col w-full h-[80%] overflow-y-scroll">
            <hotel-fillter />
          </div>
        </div>
        <div
          class="flex flex-row w-full absolute bottom-0 p-[10px_20px] bg-white"
          style="z-index: 999"
        >
          <div class="flex flex-col items-center w-full">
            <div class="flex flex-row gap-2 justify-between mt-2 w-full">
              <div class="flex-1">
                <button
                  class="text-white w-full bg-primary p-[5px_50px] rounded-md"
                  @click="submitSearchFilter"
                >
                  {{ $t("content.search") }}
                </button>
              </div>
              <div class="flex-1">
                <button
                  class="text-dark/90 text-[14px] text-nowrap border-primary text-primary border-2 rounded-md p-[5px_50px] bg-white"
                  @click="resetFilters()"
                >
                  {{ $t("content.reset_all") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </shared-Modal>
      <hotel-FiltersModal
        @updateModalFilterStatus="secondModelFlag = true"
        @closeFilter="secondModelFlag = false"
        @openMap="openMapFromSmallScreen"
        v-if="!secondModelFlag"
      />
    </div>
  </div>
</template>
<style lang="scss">
.pagination-container {
  display: flex;

  column-gap: 10px;
}

.paginate-buttons {
  height: 40px;

  width: 40px;

  border-radius: 20px;

  cursor: pointer;

  background-color: rgb(242, 242, 242);

  border: 1px solid rgb(217, 217, 217);

  color: black;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.active-page {
  background-color: #3498db;

  border: 1px solid #3498db;

  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}
</style>
