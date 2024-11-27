<script setup>
import { POSITION, useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { useSearchStore } from "@/stores/hotels/search";
import { hotelDetails } from "@/stores/hotels/hotelDetails";
import { storeToRefs } from "pinia";
import { useBookings } from "~/stores/hotels/booking";
import SideSheetUnit from "~/components/hotel/SideSheetUnit.vue";
// import { Carousel, Navigation, Slide } from 'vue3-carousel'

import {
  Tab as HeadlessTab,
  TabGroup as HeadlessTabGroup,
  TabList as HeadlessTabList,
} from "@headlessui/vue";
import { useAsyncData } from "nuxt/app";

const props = defineProps({
  type: {
    type: String,
    default: "show",
  },
});

// const useFilterStore = useFilter();
const hotelDetailStore = hotelDetails();
const useSearchStoreStore = useSearchStore();
const {
  hotelGeneralData,
  hotelRatePlans,
  selectedRatePlans,
  general_data_processing,
  rate_data_processing,
  near_hotels,
} = storeToRefs(hotelDetails());
const { t, locale } = useI18n();
const route = useRoute();
const showSideSheet = ref(false);
const selectedTab = ref("room_options");

const bookingSummary = ref({
  check_in: "",
  check_out: "",
});

const pending = ref(true);
const roomsSelections = ref([]);
const selectedUnit = ref({});
const handleCheckIn = () => {
  const { checkIn, checkOut } = route.query;
  if (!storeFilter.searchObj.checkOut) {
    storeFilter.searchObj.checkOut = checkOut;
    storeFilter.searchObj.checkIn = checkIn;
  }
  if (route.query.searchId) {
    storeFilter.searchObj.searchQueryId = route.query.searchId;
  }
};
const sideMenuBehavior = () => {
  if (window.innerWidth > 500) {
    var trigger = document.getElementById("trigger");

    var scrollPosition = window.scrollY;
    console.log(trigger.offsetTop + 400);

    if (!trigger) return;
    if (scrollPosition > trigger.offsetTop + 400) {
      trigger.classList.add("!fixed");
      trigger.classList.add("!top-[0px]");
      trigger.classList.add("!z-50");
      trigger.classList.add("!start-1");
      trigger.classList.remove("!mt-[0px]");
    } else {
      trigger.classList.remove("!fixed");
      trigger.classList.remove("!top-[0px]");
      trigger.classList.remove("!z-50");
      trigger.classList.remove("!start-1");
      trigger.classList.add("!mt-[60px]");
    }
  }
};
// const {searchId} = route.params
// try {
//   await hotelDetailStore.getHotelData(route.query.searchId);
// } catch (error) {
//   console.error('Error fetching hotel data:', error);
// }
const { data, status, error, refresh, clear } = await useAsyncData(
  "mountains",

  () => $fetch("https://dev-api-v2.moteelz.com/api/v1/hotels/1567647/details"),
  {
    server: true,
  }
);
console.log(data);
const room_processing = ref(false);

onMounted(async () => {
  room_processing.value = true;

  await hotelDetailStore.getHotelData(route.query.searchId).finally(() => {
    room_processing.value = false;
  });
  // window.addEventListener("scroll", sideMenuBehavior);
});
onUnmounted(() => {
  // window.removeEventListener("scroll", sideMenuBehavior);
});

const localePath = useLocalePath();
const toast = useToast();
if (route.query.error)
  toast.error(route.query.error, {
    timeout: 4000,
    position: POSITION.BOTTOM_CENTER,
  });

function formatDateToDashedString(date) {
  // Extract year, month, and day components

  const year = date.getFullYear();
  // Months are zero-based, so add 1 to get the correct month
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Add leading zeros if necessary
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDay = day < 10 ? "0" + day : day;

  // Concatenate components with dashes
  const dashedString = `${year}-${formattedMonth}-${formattedDay}`;

  return dashedString;
}
const router = useRouter();
const near_hotels_processing = ref(false);

const scrollToDiv = (divId) => {
  selectedTab.value = divId;
  var element = document.getElementById(divId);
  var top = 0;
  if (element) {
    top = element.offsetTop - 50;
  }

  window.scrollTo({
    top,
    behavior: "smooth", // Optional: Scroll with smooth animation
  });
};

const pricesFilter = ref(null);

const openSidebar = (unit) => {
  selectedUnit.value = unit;
  showSideSheet.value = true;
};
const storeBooking = useBookings();

const active_room_option = ref("room_only");

const confirmBookingHotel = (id, y) => {
  storeBooking.bookings.reateSelected = id;
  storeBooking.bookings.reateSelected2 = y;

  roomsSelections.value.forEach((item) => {
    if (item.id == id) {
      item.room_count = storeFilter.filter.room_count;
      item.rooms = storeFilter.filter.rooms;
    }
  });

  confirmBooking();
};
const isOpenFeatures = ref(false);
const isOpenFacility = ref(false);

const tabs = ref([
  {
    id: "about_estate",
    title: t("content.about_estate"),
  },
  {
    id: "room_select",
    title: t("content.room_select"),
  },
  {
    id: "features",
    title: t("content.features"),
  },

  {
    id: "similar_hotels",
    title: t("content.similar_hotels"),
  },
]);
const mobileTabs = ref([
  {
    id: "about_estate",
    title: t("content.about_estate"),
  },
  {
    id: "room",
    title: t("content.room_select"),
  },
  {
    id: "feature",
    title: t("content.features"),
  },
  {
    id: "similar_hotels",
    title: t("content.similar_hotels"),
  },
]);
const room_counts = ref(0);
const formatDate = (dateStr) => {
  const date = new Date(dateStr);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month} ${hours}:${minutes}`;
};

const ratePlanPolicies = ref({});
const showPlanPolicies = ref(false);

const showRatePlanPolicies = (ratePlan) => {
  ratePlanPolicies.value = ratePlan;
  showPlanPolicies.value = true;
};
const { unit_id } = route.params;

//handle long description
const desc = ref("");
watch(
  () => hotelGeneralData.value,
  (val) => {
    let str = "";
    str = val?.hotelDescriptions[0]?.description_full;
    if (str?.length > 350) {
      desc.value = str?.slice(0, 350);
    } else {
      desc.value = str;
    }
  }
);
const changeDesStatusLong = () => {
  desc.value = hotelGeneralData.value.hotelDescriptions[0]?.description_full;
};
const changeDesStatusLess = () => {
  desc.value = desc.value.slice(0, 350);
};
//submit room search
const submitSearch = () => {
  room_processing.value = true;
  hotelDetailStore.roomsSearch(unit_id).finally(() => {
    room_processing.value = false;
  });
};
const openLocation = () => {
  window.open(
    `https://www.google.com/maps?q=${data.value.latitude},${data.value.longitude}`,
    "_blank"
  );
};
</script>

<template>
  <div class="unit relative md:mt-8 mt-0">
    <div class="mx-auto max-w-7xl xl:px-0">
      <div
        v-if="general_data_processing"
        class="grid place-items-center fixed top-[50%] left-[50%] w-full h-full"
      >
        <div class="sk-folding-cube">
          <div class="sk-cube1 sk-cube"></div>
          <div class="sk-cube2 sk-cube"></div>
          <div class="sk-cube4 sk-cube"></div>
          <div class="sk-cube3 sk-cube"></div>
        </div>
      </div>

      <div class="!relative px-4 md:px-0">
        <!-- <lazy-hotel-Details-HotelHeaderDetails /> -->
        <div class="flex gap-4 my-6 flex-col">
          <div class="bg-white rounded-md py-6 px-4 order-2 md:order-1">
            <div class="flex justify-between items-center">
              <p class="text-2xl text-[#2D3263] font-bold">
                {{ hotelGeneralData.name }}
              </p>
              <div class="flex">
                <div
                  class="shadow-1 rounded-full w-12 h-12 flex items-center justify-center"
                >
                  <!-- @click.stop="addFav(hotelGeneralData?.key)" -->
                  <button
                    class="AddFav flex items-center justify-center z-[3] w-[36px] h-[36px] rounded-[50%] bg-white"
                  >
                    <IconFavFill
                      v-if="hotelGeneralData?.isFavorite"
                    ></IconFavFill>
                    <IconFavStroke v-else></IconFavStroke>
                  </button>
                </div>
              </div>
            </div>
            <div
              class="mt-4 mb-3 flex items-center gap-3"
              v-if="hotelGeneralData?.stars > 0"
            >
              <div
                class="bg-[#F5E0EA] text-[#AC0054] text-md px-4 py-1 rounded-3xl font-semibold"
              >
                5 / {{ hotelGeneralData.stars }}
              </div>
              <div class="flex items-center gp-1">
                <svg
                  v-for="star in hotelGeneralData?.stars"
                  :key="star"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 12 12"
                >
                  <path
                    fill="#DDB163"
                    d="M5.283 1.546a.8.8 0 0 1 1.435 0L7.83 3.798l2.486.361a.8.8 0 0 1 .443 1.365L8.96 7.277l.425 2.476a.8.8 0 0 1-1.16.844L6 9.427l-2.224 1.17a.8.8 0 0 1-1.16-.844l.424-2.476l-1.799-1.753a.8.8 0 0 1 .444-1.365l2.486-.36z"
                  />
                </svg>
                <svg
                  v-for="star in 5 - hotelGeneralData?.stars"
                  :key="star"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 12 12"
                >
                  <path
                    fill="#909090"
                    d="M5.283 1.546a.8.8 0 0 1 1.435 0L7.83 3.798l2.486.361a.8.8 0 0 1 .443 1.365L8.96 7.277l.425 2.476a.8.8 0 0 1-1.16.844L6 9.427l-2.224 1.17a.8.8 0 0 1-1.16-.844l.424-2.476l-1.799-1.753a.8.8 0 0 1 .444-1.365l2.486-.36z"
                  />
                </svg>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 48 48"
              >
                <path
                  fill="none"
                  stroke="#666"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12.886 22.647c-2.906-4.643-.813-12.473 3.618-15.691a12.47 12.47 0 0 1 14.862 0c4.733 3.622 6.612 10.908 3.706 15.55L23.935 40.302ZM17.111 43.5h13.8"
                />
                <circle
                  cx="24.012"
                  cy="17.947"
                  r="5.531"
                  fill="none"
                  stroke="#666"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <div class="text-[#909090] text-md">
                {{ hotelGeneralData.city?.name }}
              </div>
              <div
                class="underline text-primary cursor-pointer"
                @click="openLocation"
              >
                , {{ $t("content.look_at_map") }}
              </div>
            </div>
          </div>
          <div class="order-1 md:order-2">
            <SharedImagesGalleryHotel
              :main_img="hotelGeneralData.image"
              :images="hotelGeneralData?.hotelImages"
            />
          </div>
        </div>
        <div
          id="trigger"
          class="mx-auto justify-center items-center w-full hidden md:block mt-16"
        >
          <HeadlessTabGroup
            class="md:rounded-md overflow-hidden shadow-lg rounded-3xl"
          >
            <HeadlessTabList class="flex bg-white justify-center gap-8">
              <HeadlessTab
                v-for="tab in tabs"
                as="template"
                :key="tab.id"
                v-slot="{ selected }"
                @click="scrollToDiv(tab.id)"
              >
                <button
                  :class="[
                    'w-fit  py-4 px-4  font-medium tab-header relative ',
                    'focus:outline-none',
                    selected ? 'text-primary active font-semibold' : 'font',
                    tab.id === 'similar_hotels' &&
                    route.path.includes('wallet/wallet-hotels/')
                      ? 'hidden'
                      : '',
                  ]"
                  class="md:text-[16px] text-[11px]"
                >
                  {{ tab.title }}
                </button>
              </HeadlessTab>
            </HeadlessTabList>
          </HeadlessTabGroup>
        </div>
        <div
          id="trigger"
          class="mx-auto md:relative top-0 justify-center items-center w-full block md:hidden"
        >
          <HeadlessTabGroup
            class="md:rounded-md overflow-hidden w-7xl rounded-3xl"
          >
            <HeadlessTabList class="flex bg-white">
              <HeadlessTab
                v-for="tab in mobileTabs"
                as="template"
                :key="tab.id"
                v-slot="{ selected }"
                @click="scrollToDiv(tab.id)"
              >
                <button
                  :class="[
                    'w-[70%]  py-4   font-medium ',
                    'focus:outline-none',
                    selected ? 'text-primary' : 'font',
                    tab.id === 'similar_hotels' &&
                    route.path.includes('wallet/wallet-hotels/')
                      ? 'hidden'
                      : '',
                  ]"
                  class="md:text-[16px] text-[11px]"
                >
                  {{ tab.title }}
                </button>
              </HeadlessTab>
            </HeadlessTabList>
          </HeadlessTabGroup>
        </div>

        <div class="grid grid-cols-10 w-full gap-4 mt-4 md:mt-10">
          <div class="col-span-2 hidden md:block">
            <hotel-Details-HotelLeftSide  />
          </div>
          <div class="col-span-12 md:col-span-8">
            <div class="bg-white rounded-md py-6 px-8" id="about_estate">
              <p class="text-[#312B72] mb-4 font-semibold text-xl">
                {{ $t("content.about_estate") }}
              </p>
              <div
                class="text-[#7B7B7B]"
                v-if="hotelGeneralData?.hotelDescriptions?.length > 0"
              >
                {{ desc }}
                <span
                  class="text-primary font-bold cursor-pointer"
                  v-if="desc.length <= 350"
                  @click="changeDesStatusLong"
                  >عرض المزيد</span
                >
                <span
                  class="text-primary font-bold cursor-pointer"
                  v-else
                  @click="changeDesStatusLess"
                  >عرض أقل</span
                >
              </div>
              <div v-else>{{ $t("hotels.no_desc") }}</div>
            </div>
            <div class="md:mt-10 mt-6">
              <CommonMainSearch
                :changeStructure="true"
                @submitSearch="submitSearch"
                class="w-full relative !z-[4444]"
              ></CommonMainSearch>
            </div>
            <Client-only>
              <lazy-hotel-Details-HotelRoomsLargeScreen
                :processing="room_processing"
                class="hidden md:block col-sapn-12 mt-2 relative"
                id="room_select"
              />
              <lazy-hotel-Details-HotelRoomsSmallScreen
                class="block md:hidden mt-2"
                id="room"
              />
            </Client-only>

            <lazy-hotel-Details-Features />
          </div>
        </div>
        <hotel-NearHotels
          id="similar_hotels"
          v-if="near_hotels.length > 0"
          :hotels="near_hotels"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tab-header.active::after {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  width: 45px;
  height: 3px;
  @apply bg-primary;
}
</style>
