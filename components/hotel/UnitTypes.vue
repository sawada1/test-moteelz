<template>
  <div class="units_type">
    <div class="relative z-9 page country max-w-7xl mx-auto">
      <div class="py-4 md:my-5 rounded-lg units">
        <div
          class="hotels-container relative container"
          v-if="unitsType.length > 5"
        >
          <button
            class="slider-icon hidden xl:block absolute right-[-30px] top-[-25px] slider-hotel-next z-[9999]"
          >
            <IconArrowNext width="100" height="100"></IconArrowNext>
          </button>
          <button
            class="slider-icon hidden xl:block lg:block absolute left-[-30px] top-[-25px] slider-hotel-prev z-10"
          >
            <IconArrowPrev width="100" height="100" />
          </button>
          <swiper
            class="items"
            :navigation="{
              nextEl: '.slider-hotel-next',
              prevEl: '.slider-hotel-prev',
            }"
            :breakpoints="{
              '300': {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              '900': {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              '1024': {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              '1200': {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }"
            :modules="[SwiperNavigation, SwiperAutoplay]"
            :autoplay="{
              delay: 8000,
              disableOnInteraction: true,
            }"
          >
            <swiper-slide v-for="(item, index) in unitsType" :key="item.key">
              <div
                class="item flex flex-col items-center gap-2 cursor-pointer rounded-md bg-[#f6f6f6]"
                @click="selectType(item, index)"
                :class="[
                  active_unit_types.indexOf(item.key) !== -1
                    ? 'active-type bg-[#875fff]'
                    : '',
                ]"
              >
                <div
                  class="flex items-center gap-3 rounded-lg py-2 px-1 justify-between"
                >
                  <NuxtImg
                    src="https://placehold.co/60x35"
                    class="rounded-md"
                  />
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
        <div
          v-else
          class="hotels-container relative container"
        >
           <button
            class="slider-icon hidden xl:block absolute right-[-30px] top-[-25px] slider-hotel-next z-[9999]"
          >
            <IconArrowNext width="100" height="100"></IconArrowNext>
          </button>
          <button
            class="slider-icon hidden xl:block lg:block absolute left-[-30px] top-[-25px] slider-hotel-prev z-10"
          >
            <IconArrowPrev width="100" height="100" />
          </button>
          <swiper
            class="items"
            :navigation="{
              nextEl: '.slider-hotel-next',
              prevEl: '.slider-hotel-prev',
            }"
            :breakpoints="{
              '300': {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              '900': {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              '1024': {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              '1200': {
                slidesPerView: 2,
                spaceBetween: 30,
              },
            }"
            :modules="[SwiperNavigation, SwiperAutoplay]"
            :autoplay="{
              delay: 8000,
              disableOnInteraction: true,
            }"
          >
            <swiper-slide v-for="(item, index) in unitsType" :key="item.key">
              <div
                class="item flex flex-col items-center gap-2 cursor-pointer rounded-md bg-[#f6f6f6]"
                @click="selectType(item, index)"
                :class="[
                  active_unit_types.indexOf(item.key) !== -1
                    ? 'active-type bg-[#875fff]'
                    : '',
                ]"
              >
                <div
                  class="flex items-center gap-3 rounded-lg py-2 px-1 justify-between"
                >
                  <NuxtImg
                    :src="item.icon"
                    class="rounded-md w-6 h-6"
                  />
                  <span>{{ item.name }}</span>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useFilter } from "@/stores/hotels/hotelsFilter";
import { useSearchStore } from "@/stores/hotels/search";

const props = defineProps({
  unitsType: {
    type: Object,
  },
});
const useFilterStore = useFilter();
const { active_unit_types } = storeToRefs(useFilter());

const selectType = async (item, idx) => {
  console.log(item);
  console.log(active_unit_types.value.indexOf(item.key));

  if (active_unit_types.value.indexOf(item.key) == -1) {
    active_unit_types.value.push(item.key);
  } else {
    active_unit_types.value = active_unit_types.value.filter(
      (el) => el !== item.key
    );
    console.log(active_unit_types.value);
  }
  await useFilterStore.handleFilterApi(false);
};
</script>
<style lang="scss">
.units_type {
  background: linear-gradient(to right, #ffffff4d, #fff 70%, #ffffff4d);
}
.active-type {
  @apply bg-[#F1EDFF]  border text-[#875FFF] !important;
  border: 1px dashed;
}
</style>
