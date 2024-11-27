<script setup>
import { useEventBus } from "@vueuse/core"; // Import event bus
import { useSearchStore } from "@/stores/hotels/search";
import { useSearchById } from "@/composables/useSearchWithId";
import { useFilter } from "@/stores/hotels/hotelsFilter";

const useFilterStore = useFilter();
const useSearchStoreStore = useSearchStore();

import { storeToRefs } from "pinia";
const emits = defineEmits(["close"]);
const store = useSearchStore();
const showModal = ref(false);
const modalMap = ref(false);
const isMobile = ref(false);
onMounted(() => {
  modalMap.value = store.MAP;
  store.map_center.lat = 21.533052718009;
  store.map_center.lng = 39.191363306292;
});

const bus = useEventBus("map-event"); // Initialize the event bus

// Listen for the openMap event
bus.on("openMap", (isMob) => {
  openModalMap(isMob);
});

watch(store, (newVal, oldVal) => {
  modalMap.value = newVal.MAP;
});

const openModalMap = async (isMob) => {
    store.isOpenMap = true
  // modalMap = !modalMap
  isMobile.value = isMob
  modalMap.value = true
  store.MAP = true

  // connect = searchInstance.connect;
  // disconnect = searchInstance.disconnect;
  // connect();
  // emits("close");
};

const closeModalMap = async () => {
  store.isOpenMap = false;
  asyncGetFilterDataVal();

  modalMap.value = false;
  store.MAP = false;
  // enableScroll()
};
</script>

<template>
  <div class="mb-4 overflow-hidden border-[3px_solid_#FFFFFF]"
  :class="[
      useSearchStoreStore.hotels.length == 0 || store.MAP ? 'pointer-events-none opacity-50' : '',
    ]"
  >
    <div class="relative w-full rounded-[10px]">
      <NuxtImg
        src="/img/map2.png"
        class="w-[100%] h-[120px] rounded-lg logo object-cover"
      />
      <button
        @click="openModalMap(false)"
        class="p-[10px] border-[2px] whitespace-pre border-[#8b64ff] bg-[#8156ff] hover:bg-[#7c51fd] absolute top-[50%] left-[50%] rounded-xl font-bold text-[14px] text-[#fff] translate-y-[-50%] translate-x-[-50%]"
      >
        {{ $t("fillter.ShowOnMap") }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
