<template>
  <div>
    <div class="meter  top-0" v-if="!events_completed">
      <span :style="`width: ${progress}%`" >
      </span>
    </div>
    <div class="fixed md:top-[68px] top-[0px] left-[50%] z-[999]" v-if="!events_completed">
       <div class="flex flex-col items-center rounded-2xl text-white">
        <span class="text-md  font-bold" v-if="countHotels == 0">
          {{ $t("content.isLoaded", { count: progress }) }}%
        </span>
        <span class="text-sm font-bold" v-else>
          {{ $t("content.hotels_showing", { count: countHotels }) }}
        </span>
      </div>
    </div>
    <div
      class="fixed w-full h-full flex justify-center flex-col gap-3 items-center bg-[#f1f1f154] z-[9999]"
      v-if="countHotels == 0"
    >
    <div class="fixed md:top-[70%] top-[30%] md:left-[40%] left-[50%] translate-x-[-50%]">
      <div class="flex flex-col items-center rounded-2xl  text-white">
        <div class="loader mb-4"></div>
        <span class="text-md font-bold bg-primary p-4 block rounded-md text-center">
          
          {{ !MAP ?  $t("loadingText") : 'جاري تحميل الخريطه' }}
        </span>
      </div>
    </div>
    </div>
  </div>
</template>
<script setup>
import { useSearchStore } from "@/stores/hotels/search";
import { storeToRefs } from "pinia";
const searchStore = useSearchStore();
const { countHotels, events_completed, progress,MAP } = storeToRefs(
  useSearchStore()
);
</script>
