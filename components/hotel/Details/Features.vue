
<template>
  <div>
    <div
      class="hidden md:block"
      id="features"
      v-if="facilities?.length > 0"
    >
      <div class="my-6 py-5 px-4 bg-white rounded-lg">
        <p class="text-[#312B72] font-bold text-[22px]">
          {{ $t("content.features") }}
        </p>
        
        <ul class="grid grid-cols-12 mt-4 gap-2 max-h-[150px] overflow-y-scroll">
          <li
            class="md:col-span-4 col-span-12 flex gap-2 items-center"
            v-for="facility in facilities"
            :key="facility.id"
          >
            <NuxtImg :src="facility.icon" />
            
            <span class="text-[16px] font-light italic">{{ facility.name }}</span>
          </li>
        </ul>
        <span
          class="mt-4 block text-left w-fit mr-auto pe-4 underline cursor-pointer text-primary"
          @click="openMoreFacilities"
          v-if="facilities?.length > 5"
        >
          {{ !isOpenFacility ? $t("content.more") : "عرض اقل" }}
        </span>
      </div>
    </div>
    <div class="hidden md:block" v-else id="features">
      <div class="my-6 py-5 px-4 bg-white text-xl rounded-lg">
        {{ $t("content.no_feature") }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { hotelDetails } from "@/stores/hotels/hotelDetails";
import { storeToRefs } from "pinia";
import { watch, ref, onMounted } from "vue";

const { hotelGeneralData } = storeToRefs(hotelDetails());
const isOpenFacility = ref(false);
const facilities = ref([]);
const arr = ref([]);

// Watch hotelGeneralData for changes
const updateFacilities = (data) => {
  arr.value = [...data];
  if(arr.value.length > 6){
    facilities.value = arr.value.splice(0, 6);
  }else{
    facilities.value = arr.value;

  }
};
watch(hotelGeneralData, (newVal) => {
  if (newVal?.facilities?.length > 0) {
    updateFacilities(newVal.facilities);
  }
}, { immediate: true });


const openMoreFacilities = () => {
  isOpenFacility.value = !isOpenFacility.value;
  if (isOpenFacility.value) {
    facilities.value = hotelGeneralData.value.facilities;
  } else {
    updateFacilities(hotelGeneralData.value.facilities);
  }
};
</script>
