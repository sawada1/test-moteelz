<template>
<div class="flex gap-4 my-6 flex-col">
          <div class="bg-white rounded-md py-6 px-4 order-2 md:order-1">
            <div class="flex justify-between items-center">
              <p class="text-2xl text-[#2D3263] font-bold">
                {{ hotelGeneralData.name }}
              </p>
              <div class="flex">
                <div class="shadow-1 rounded-full w-12 h-12 flex items-center justify-center">
                  <!-- @click.stop="addFav(hotelGeneralData?.key)" -->
                  <button
                  @click="addFav(hotelGeneralData?.key)"
                    class="AddFav flex items-center justify-center z-[3] w-[36px] h-[36px] rounded-[50%] bg-white">
                    <IconFavFill v-if="hotelGeneralData?.isFavorite"></IconFavFill>
                    <IconFavStroke v-else></IconFavStroke>
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-4 mb-3 flex items-center gap-3" v-if="hotelGeneralData?.stars > 0">
              <div class="bg-[#F5E0EA] text-[#AC0054] text-md px-4 py-1 rounded-3xl font-semibold">
                5 / {{ hotelGeneralData.stars }}
              </div>
              <div class="flex items-center gp-1">
                <svg v-for="star in hotelGeneralData?.stars" :key="star" xmlns="http://www.w3.org/2000/svg" width="24"
                  height="24" viewBox="0 0 12 12">
                  <path fill="#DDB163"
                    d="M5.283 1.546a.8.8 0 0 1 1.435 0L7.83 3.798l2.486.361a.8.8 0 0 1 .443 1.365L8.96 7.277l.425 2.476a.8.8 0 0 1-1.16.844L6 9.427l-2.224 1.17a.8.8 0 0 1-1.16-.844l.424-2.476l-1.799-1.753a.8.8 0 0 1 .444-1.365l2.486-.36z" />
                </svg>
                <svg v-for="star in 5 - hotelGeneralData?.stars" :key="star" xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 12 12">
                  <path fill="#909090"
                    d="M5.283 1.546a.8.8 0 0 1 1.435 0L7.83 3.798l2.486.361a.8.8 0 0 1 .443 1.365L8.96 7.277l.425 2.476a.8.8 0 0 1-1.16.844L6 9.427l-2.224 1.17a.8.8 0 0 1-1.16-.844l.424-2.476l-1.799-1.753a.8.8 0 0 1 .444-1.365l2.486-.36z" />
                </svg>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
                <path fill="none" stroke="#666" stroke-linecap="round" stroke-linejoin="round"
                  d="M12.886 22.647c-2.906-4.643-.813-12.473 3.618-15.691a12.47 12.47 0 0 1 14.862 0c4.733 3.622 6.612 10.908 3.706 15.55L23.935 40.302ZM17.111 43.5h13.8" />
                <circle cx="24.012" cy="17.947" r="5.531" fill="none" stroke="#666" stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
              <div class="text-[#909090] text-md">
                {{ hotelGeneralData.city?.name }}
              </div>
              <div class="underline text-primary cursor-pointer" @click="openLocation">
                , {{ $t("content.look_at_map") }}
              </div>
            </div>
          </div>
          <div class="order-1 md:order-2">
            <SharedImagesGalleryHotel :main_img="hotelGeneralData.image" :images="hotelGeneralData?.hotelImages" />
          </div>
        </div>
</template>
<script setup>
import { hotelDetails } from "@/stores/hotels/hotelDetails";
import { storeToRefs } from "pinia";
const { hotelGeneralData } = storeToRefs(hotelDetails());
const data = ref({});
watch(
  hotelGeneralData,
  (newVal) => {
    if (newVal) {
      data.value = newVal;
      console.log(data.value);
      
    }
  },
  { immediate: true }
);
const openLocation = () => {
  window.open(
    `https://www.google.com/maps?q=${data.value.latitude},${data.value.longitude}`,
    "_blank"
  );
};
</script>
