<template>
  <div class="w-full flex justify-center">
    <div class="flex items-start justify-center w-full md:w-1/2">
      <!-- Step 1 -->
      <div class="flex items-center w-full">
        <div class="flex flex-col items-center justify-center gap-2 w-24">
          <div
            class="w-6 h-6 md:w-10 md:h-10 text-xs md:text-base rounded-full flex items-center justify-center bg-primary text-light font-bold"
          >
            1
          </div>
          <div class="text-textColor text-xs md:text-base w-max">
            {{ $t("content.choose_room") }}
          </div>
        </div>
        <span
          class="flex-grow h-1 bg-primary mx-1 rounded-2xl w-full sm:w-24 mb-[30px]"
        ></span>
      </div>

      <!-- Step 2 (Active) -->
      <div class="flex items-center w-full">
        <div class="flex flex-col items-center gap-2 justify-center w-24">
          <div
            class="w-6 h-6 md:w-10 md:h-10 text-xs md:text-base rounded-full flex items-center justify-center bg-primary text-light font-bold"
          >
            2
          </div>
          <span class="text-textColor text-xs md:text-base w-max">{{
            $t("content.enter_data")
          }}</span>
        </div>

        <span
          :class="['flex-grow h-1 mx-1 rounded-2xl w-full sm:w-24 mb-[30px]', step ? 'bg-primary' : 'bg-primaryLight']"
        ></span>
      </div>

      <!-- Step 3 -->
      <div class="flex items-center">
        <div class="flex flex-col items-center gap-2 justify-center w-24">
          <div
            :class="['w-6 h-6 md:w-10 md:h-10 text-xs md:text-base rounded-full flex items-center justify-center text-light font-bold', step ? 'bg-primary' : 'bg-bg_lightgray' ]"
          >
            3
          </div>
          <span class="text-textColor text-xs md:text-base w-max">{{
            $t("content.pay_now")
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { boolean } from "zod";

const props = defineProps({
  step: {
    type: boolean,
    default: false,
  },

});

</script>

<style scoped></style>
