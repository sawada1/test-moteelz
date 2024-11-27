<script setup>
import { useWindowSize } from "@vueuse/core";
import { storeToRefs } from "pinia";
import { useFilterUnits } from "~/stores/hotels/filter";
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
import { useSearchStore } from "@/stores/hotels/search"; // Pinia store for managing search data
const nprogress = useNuxtApp().$nprogress;

const store = useFilterUnits();

const row = ref(true);
const changeDisplayData = (val) => {
  row.value = val;
};
const { width, height } = useWindowSize();
watch(
  () => width.value,
  (val) => {
    if (val < 768) {
      row.value = false;
    }
  }
);

//handle paagination
const hotels = ref([]); // Store all hotels
const currentPage = ref(1); // Track the current page
const hotelsPerPage = 30; // Number of hotels per page
const loading = ref(false);

//get hotels
const params = {
  destination: { city: { id: 1 } },
  // "accommodation":[1005],
  checkIn: "2025-01-01",
  checkOut: "2025-01-10",
  occupancy: {
    leaderNationality: 4,
    rooms: [
      {
        adults: 1,
      },
    ],
  },
};
// await useSearch(params);

const searchStore = useSearchStore(); // Access Pinia store for tracking state

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
const hotelPerPage = ref([]);
const totalPages = ref(0);
watch(
  () => searchStore.hotels,
  (newHotels) => {
    hotels.value = newHotels;
    // hotelPerPage.value = newHotels.slice(0,20)
  }
);
watch(
  () => searchStore.totalPages,
  (val) => {
    totalPages.value = val;
    // hotelPerPage.value = newHotels.slice(0,20)
  }
);
// Function to initiate search and connect to SSE

const isConnected = ref(false);
nprogress.start();

let connect, disconnect;

// Connect to SSE
isConnected.value = true;
const startSearch = async () => {};
const stopSearch = () => {
  // Disconnect from SSE
  disconnect();
  isConnected.value = false;
};
onMounted(async () => {
  // nprogress.start()
  const searchInstance = await useSearch(params);
  connect = searchInstance.connect;
  disconnect = searchInstance.disconnect;
  connect();
});
// Ensure disconnection when component is destroyed
onUnmounted(() => {
  if (isConnected.value) disconnect();
});

// Calculate paginated hotels based on the current page

const showPagination = ref(false);
// Paginate hotels based on the current page
const paginatedHotels = computed(() => {
  const startIndex = (currentPage.value - 1) * hotelsPerPage;
  const endIndex = startIndex + hotelsPerPage;
  return hotels.value.slice(startIndex, endIndex);
});

// Go to the selected page
const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
setTimeout(() => {
  showPagination.value = true;
}, 5000);
</script>
<template>
  <div class="min-h-screen overflow-scroll px-4 md:px-0" id="filtering">
    <CommonMainSearch class="md:max-w-[75%] mx-auto mt-6"></CommonMainSearch>
    <hotel-unit-types />
    <div class="grid grid-cols-12 max-w-7xl mx-auto">
      <div class="md:col-span-3 hidden md:block">
        <hotel-fillter />
      </div>
      <div class="col-span-12 md:col-span-9 mb-24" v-if="!store.MAP">
        <div class="flex mb-4 gap-4">
          <div class="flex-1">
            <hotel-sort-by />
          </div>
          <div class="hidden md:flex items-center">
            <hotel-grid-show-data
              :row="row"
              @changeDisplayData="changeDisplayData"
            />
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4">
          <CardProduct
            v-for="(item, index) in paginatedHotels"
            :key="index"
            :index="index"
            :product="item"
            :row="row"
            class="mb-4"
            :class="[row ? 'col-span-4' : 'col-span-12']"
          ></CardProduct>
          <Pagination
            v-slot="{ page }"
            :total="totalPages"
            :sibling-count="1"
            show-edges
            :default-page="currentPage"
            class="col-span-12"
            dir="ltr"
          >
            <PaginationList
              v-slot="{ items }"
              class="flex items-center gap-1 mt-4 justify-center"
              v-if="showPagination"
            >
              <PaginationFirst @click="goToPage(1)" />
              <PaginationPrev @click="goToPage(page.value - 1)" />

              <template v-for="(item, index) in items">
                <PaginationListItem
                  v-if="item.type === 'page'"
                  :key="index"
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
                <PaginationEllipsis v-else :key="item.type" :index="index" />
              </template>

              <PaginationNext @click="goToPage(page.value + 1)" />
              <PaginationLast @click="goToPage(page.last)" />
            </PaginationList>
          </Pagination>
        </div>
      </div>
      <filter-filtter-map
        class="col-span-12 md:col-span-9"
        v-else
        :city_id="store.filter?.city_id ?? '1'"
      ></filter-filtter-map>
    </div>
  </div>
</template>