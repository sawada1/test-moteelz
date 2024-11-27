<script lang="ts" setup>
import { type Unit, useFilterUnits } from "~/stores/hotels/filter";
import MapImagePath from "assets/img/map.png";
import Modal from "~/components/core/modal.vue";
import UnitGoogleMap from "~/components/map/unit-GoogleMap.vue";
import { useScreenUtilities } from "~/composables/utilities/useScreenUtilities";

import { ref } from "vue";
const props = defineProps({
  city_id: { type: String, default: "1" },
  country_id: { type: String, default: "0" },
});

const store = useFilterUnits();
const { isMd, isSm } = useScreenUtilities();
const showModal = ref(false);
const activeUnit = ref<Unit>();
const modalMap = ref(false);
const filterAssets = ref(null);
const isMobile = ref(false);
onMounted(() => {
  modalMap.value = store.MAP;
});
watch(store, (newVal, oldVal) => {
  modalMap.value = newVal.MAP;
});
// useListen("openModalMap", async (isMob: boolean) => {
//   store.isOpenMap = true;
//   // console.log('openModalMap')
//   isMobile.value = isMob;
//   modalMap.value = true;
//   store.MAP = true;
//   disableScroll();
// });
// open Desktop
const openModalMap = async (isMob: boolean) => {
  store.isOpenMap = true;
  // modalMap = !modalMap
  isMobile.value = isMob;
  modalMap.value = true;
  store.MAP = true;

  // disableScroll()
};

const closeModalMap = async () => {
  store.isOpenMap = false;
  asyncGetFilterDataVal();

  modalMap.value = false;
  store.MAP = false;
  // enableScroll()
};

const asyncGetFilterDataVal = async () => {
  store.filter.features = [];
  store.filter.districts = [];
  store.filter.unitTypes = [];
  store.filtersCounter();
  store.filtering();
};
const disableScroll = async () => {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  document.documentElement.style.height = "100%";
  document.body.style.height = "100%";
};

const enableScroll = async () => {
  document.documentElement.style.overflow = "auto";
  document.body.style.overflow = "auto";
  document.documentElement.style.height = "auto";
  document.body.style.height = "auto";
};

watch(isMd, (newWidth) => {
  if (newWidth) {
    isMobile.value = false;
    store.isMobile = false;
  } else if (isSm) {
    isMobile.value = true;
    store.isMobile = true;
  }
});
</script>

<template>
  <!--Units-->
  <div>

    <div
    v-if="modalMap"
    class="w-full relative max-h-[80vh] justify-center items-center animated faster mt-4"
    :class="modalMap ? 'fadeIn flex' : 'fadeOut hidden'"
    style="background: rgba(0, 0, 0, 0.7)"
    >
    <div class="shadow-lg bg-light h-full w-full mx-auto overflow-y-auto">
      <div class="h-[100%] text-left">
        <MapGoogleMap
          :city_id="city_id"
          :isMobile="isMobile"
          :assetsFilter="filterAssets"
        />
      </div>

      <button
        class="absolute md:block top-2 z-10 start-2 m-2 p-2 bg-[#F4F4F4] rounded-full cursor-pointer hover:opacity-100 transition-colors hover:shadow-4-strong border"
        @click="closeModalMap"
      >
        <!-- <Icon name="mdi:close" class="w-8 h-8 object-contain text-primary" /> -->
                 <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#333" d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"/></svg>
      </button>
    </div>
  </div>

  <modal
    v-if="showModal"
    height="80%"
    width="80%"
    @close-modal="showModal = false"
  >
    <template v-slot:title>
      <h3 class="truncate w-full text-primary text-2xl font-black text-[14px]">
        {{ activeUnit?.unit_title }} {{ activeUnit?.unit_code }}
      </h3>
    </template>
    <template v-slot:content>
      <unit-google-map :unit="activeUnit"></unit-google-map>
    </template>
  </modal>
</div>
</template>
