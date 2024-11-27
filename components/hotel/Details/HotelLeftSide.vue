<template>
  <div class="">
    <div
      class="bg-white rounded-md py-6 px-5 max-h-[350px] overflow-y-auto"
      v-if="hotelGeneralData?.categories?.length > 0"
    >
      <p class="text-[#312B72] text-[22px] font-semibold">
        {{ $t("content.facility") }}
      </p>
      <ul class="flex flex-wrap mt-4 gap-5">
        <li
          class="flex align-items-center justify-center text-[14px] gap-2 border-[1px] border-[#E9E9E9] rounded-md py-2 px-2 bg-[#FDFDFD]"
          v-for="facility in hotelGeneralData?.categories"
          :key="facility.id"
        >
          <NuxtImg class="w-4 h-4" :src="facility.icon" />
          <span>{{ facility.name }}</span>
        </li>
      </ul>
      <span
        class="mt-4 block text-left w-fit mr-auto pe-4 underline cursor-pointer text-primary"
        @click="openMoreFacilities"
        v-if="facilities.length > 5"
      >
        {{ !isOpenFacility ? $t("content.more") : "عرض اقل" }}
      </span>
    </div>
    <!-- <div
      v-if="data.terminals?.length > 0"
      class="bg-white rounded-md py-6 px-5"
    >
      <p class="text-[#312B72] text-[22px] font-semibold">
        {{ $t("content.landmarks") }}
      </p>
      <ul class="grid grid-cols-12 flex-wrap mt-4 gap-5">
        <li
          v-for="terminal in data.terminals"
          :key="terminal.id"
          class="flex align-items-center col-span-12 text-[14px] gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000"
              d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
            />
          </svg>
          <span>{{ terminal.name }}</span>
          -
          <span>{{ terminal.distance }} كجم</span>
        </li>
      </ul>
    </div> -->
  </div>
</template>
<script setup>
import { hotelDetails } from "@/stores/hotels/hotelDetails";
import { storeToRefs } from "pinia";
const { hotelGeneralData } = storeToRefs(hotelDetails());
const isOpenFacility = ref(false);
const facilities = ref([]);
let arr = ref([])
const updateFacilities = (data) => {
  arr.value = [...data];
    if(arr.value.length > 6){
    facilities.value = arr.value.splice(0, 6);
  }else{
    facilities.value = arr.value;

  }
};
watch(hotelGeneralData, (newVal) => {
  if (newVal?.categories?.length > 0) {
    updateFacilities(newVal.categories);
  }
}, { immediate: true });



const openMoreFacilities = () => {
  isOpenFacility.value = !isOpenFacility.value;
  if (isOpenFacility.value) {
    facilities.value = hotelGeneralData.value.categories;
  } else {
    updateFacilities(hotelGeneralData.value.categories);
  }
};
</script>
