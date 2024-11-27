<script setup>
// import { POSITION, useToast } from "vue-toastification";
import { useSearchStore } from "@/stores/hotels/search";
import { hotelDetails } from "@/stores/hotels/hotelDetails";
import { storeToRefs } from "pinia";
import { Method, useApi } from "@/composables/api";
import { useAuthStore } from "@/stores/auth";
import SideSheetUnit from "~/components/hotel/SideSheetUnit.vue";
// import { Carousel, Navigation, Slide } from 'vue3-carousel'
import { generalStore } from "@/stores/general";
import { useToast } from "@/components/ui/toast/use-toast";

let store = generalStore();

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
const authStore = useAuthStore();
const { t, locale } = useI18n();


const isAuthenticated = computed(() => authStore.isAuthenticated);


const { toast } = useToast();

// const useFilterStore = useFilter();
const hotelDetailStore = hotelDetails();
const useSearchStoreStore = useSearchStore();
const {
  hotelGeneralData,
  general_data_processing,
  rate_data_processing,
  near_hotels,
} = storeToRefs(hotelDetails());
const route = useRoute();
const showSideSheet = ref(false);
const selectedTab = ref("room_options");
const addFav = async (id) => {
  if (!isAuthenticated.value) {
    authStore.showModal = true; // Show the login modal
  } else {
    try {
      const response = await useApi(
        "/api/v1/account/favorites/toggle",
        Method.POST,
        undefined,
        { id: id },
        locale.value
      );

      if (response.error) {
        console.error(`Error ${response.statusCode}: ${response.error}`);
      } else if (response.data) {
        toast({
          title: response.data?.message,
          duration: 3000,
          class: "p-3 bg-primary text-white",
        });
    
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
    }
    
    hotelGeneralData.value.isFavorite = !hotelGeneralData.value.isFavorite
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
  } else {
    var trigger = document.getElementById("trigger_mobile");

    var scrollPosition = window.scrollY;
    console.log(trigger.offsetTop + 400);

    if (!trigger) return;
    if (scrollPosition > trigger.offsetTop + 350) {
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
      trigger.classList.add("!mt-[1px]");
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
  window.addEventListener("scroll", sideMenuBehavior);
});
onUnmounted(() => {
  window.removeEventListener("scroll", sideMenuBehavior);
});

const localePath = useLocalePath();
// const toast = useToast();
if (route.query.error)
toast({
          title: route.query.error,
          duration: 3000,
          class: "p-3 bg-primary text-white",
        });
  // toast.error(route.query.error, {
  //   timeout: 4000,
  //   position: POSITION.BOTTOM_CENTER,
  // });

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
    id: "room_select_sm",
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

const ratePlanPolicies = ref({});
const showPlanPolicies = ref(false);
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
      <div v-if="general_data_processing" class="grid place-items-center fixed top-[50%] left-[50%] w-full h-full">
        <div class="sk-folding-cube">
          <div class="sk-cube1 sk-cube"></div>
          <div class="sk-cube2 sk-cube"></div>
          <div class="sk-cube4 sk-cube"></div>
          <div class="sk-cube3 sk-cube"></div>
        </div>
      </div>

      <div class="!relative px-4 md:px-0">
        <lazy-hotel-Details-HotelHeaderDetails />
        
        <div id="trigger" class="mx-auto justify-center items-center w-full hidden md:block mt-16">
          <HeadlessTabGroup class="md:rounded-md overflow-hidden shadow-lg rounded-3xl">
            <HeadlessTabList class="flex bg-white justify-center gap-8">
              <HeadlessTab v-for="tab in tabs" as="template" :key="tab.id" v-slot="{ selected }"
                @click="scrollToDiv(tab.id)">
                <button :class="[
                  'w-fit  py-4 px-4  font-medium tab-header relative ',
                  'focus:outline-none',
                  selected ? 'text-primary active font-semibold' : 'font',
                  tab.id === 'similar_hotels' &&
                    route.path.includes('wallet/wallet-hotels/')
                    ? 'hidden'
                    : '',
                ]" class="md:text-[16px] text-[11px]">
                  {{ tab.title }}
                </button>
              </HeadlessTab>
            </HeadlessTabList>
          </HeadlessTabGroup>
        </div>
        <div id="trigger_mobile" class="mx-auto md:relative top-0 justify-center items-center w-full block md:hidden">
          <HeadlessTabGroup class="md:rounded-md overflow-hidden w-7xl rounded-3xl">
            <HeadlessTabList class="flex bg-white">
              <HeadlessTab v-for="tab in mobileTabs" as="template" :key="tab.id" v-slot="{ selected }"
                @click="scrollToDiv(tab.id)">
                <button :class="[
                  'w-[70%]  py-4   font-medium ',
                  'focus:outline-none',
                  selected ? 'text-primary' : 'font',
                  tab.id === 'similar_hotels' &&
                    route.path.includes('wallet/wallet-hotels/')
                    ? 'hidden'
                    : '',
                ]" class="md:text-[16px] text-[11px]">
                  {{ tab.title }}
                </button>
              </HeadlessTab>
            </HeadlessTabList>
          </HeadlessTabGroup>
        </div>

        <div class="grid grid-cols-10 w-full gap-4 mt-4 md:mt-10">
          <div class="col-span-2 hidden md:block">
            <hotel-Details-HotelLeftSide />
          </div>
          <div class="col-span-12 md:col-span-8">
            <div class="bg-white rounded-md py-6 px-8" id="about_estate">
              <p class="text-[#312B72] mb-4 font-semibold text-xl">
                {{ $t("content.about_estate") }}
              </p>
              <div class="text-[#7B7B7B]" v-if="hotelGeneralData?.hotelDescriptions?.length > 0">
                {{ desc }}
                <span class="text-primary font-bold cursor-pointer" v-if="desc.length <= 350"
                  @click="changeDesStatusLong">{{$t('content.load_more_text')}}</span>
                <span class="text-primary font-bold cursor-pointer" v-else @click="changeDesStatusLess">{{$t('fillter.showLess')}}</span>
              </div>
              <div v-else>{{ $t("hotels.no_desc") }}</div>
            </div>
            <div class="md:mt-10 mt-6">
              <CommonMainSearch :changeStructure="true" @submitSearch="submitSearch" class="w-full relative !z-[4444]">
              </CommonMainSearch>
              <CommonMainFilter v-if="store.showModalFilter" @submitSearch="submitSearch" :changeStructure="true">
              </CommonMainFilter>
            </div>
            <Client-only>
              <lazy-hotel-Details-HotelRoomsLargeScreen :processing="room_processing"
                class="hidden md:block col-sapn-12 mt-2 relative" id="room_select" />
              <div class="block md:hidden mt-2">
                <lazy-hotel-Details-HotelRoomsSmallScreen id="room_select_sm" />
                <div class="md:mb-[100px] mb-[24px] mt-12 flex flex-col gap-3" >
                  <hotel-Details-Accordion id="" :header="$t('content.facility')">
                    <template #default>
                      <ul class="flex flex-wrap mt-4 gap-5" v-if="hotelGeneralData?.categories?.length > 0">
                        <li
                          class="flex align-items-center justify-center text-[14px] gap-2 border-2 rounded-md border-[#88888831] py-3 px-2 bg-[#FDFDFD]"
                          v-for="facility in hotelGeneralData?.categories" :key="facility.id">
                          <NuxtImg class="w-4 h-4" :src="facility.icon" />
                          <span>{{ facility?.name }}</span>
                        </li>
                      </ul>
                      <div v-else class="text-lg">{{$t('content.no_categories')}}</div>
                    </template>
                  </hotel-Details-Accordion>
                  <hotel-Details-Accordion id="feature" :header="$t('content.features')">
                    <template #default>
                      <ul class="grid grid-cols-12 mt-4 gap-2" v-if="hotelGeneralData?.facilities?.length > 0">
                        <li class="md:col-span-4 col-span-12 flex gap-2 items-center"
                          v-for="facility in hotelGeneralData?.facilities" :key="facility?.id">
                          <NuxtImg :src="facility?.icon" class="w-4 h-4" />
                          <span class="text-[16px] font-light italic">{{
                            facility.name
                          }}</span>
                        </li>
                      </ul>
                      <div v-else class="text-lg">
                        {{ $t("content.no_feature") }}
                      </div>
                    </template>
                  </hotel-Details-Accordion>
                </div>
              </div>
            </Client-only>

            <lazy-hotel-Details-Features />
          </div>
        </div>

        <hotel-NearHotels id="similar_hotels"  :hotels="near_hotels?.data" />
        
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
