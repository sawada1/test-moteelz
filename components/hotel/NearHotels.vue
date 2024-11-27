<template>
  <div :dir="locale === 'ar' ? 'rtl' : 'ltr'" class="md:mb-[64px] mb-[120px]">
    <div class="container relative product-cards mt-[24px]">
      <div class="header-container flex items-center justify-between mb-[16px]">
        <div class="flex items-center gap-2">
          <h3
            class="text-[20px] xl:text-[32px] lg:text-[32px] font-bold text-primary"
          >
            {{ $t("content.nearUnits") }}
          </h3>
          <div class="dot h-[9px] w-[9px] bg-burgundy rounded"></div>
        </div>
      </div>

      <button
        class="slider-icon top-[30%] xl:block lg:block absolute left-[-30px] slider-product-prev z-10"
      >
        <IconArrowPrev></IconArrowPrev>
      </button>
      <button
        class="slider-icon top-[30%] xl:block lg:block absolute right-[-30px] slider-product-next z-10"
      >
        <IconArrowNext></IconArrowNext>
      </button>
      <!-- data-aos="zoom-in-up" data-aos-duration="600" -->
      <swiper
        class="!px-[10px] z-[-1]"
        :slidesPerView="4"
        :spaceBetween="20"
        :dir="locale == 'ar' ? 'rtl' : 'ltr'"
        :navigation="{
          nextEl: '.slider-product-next',
          prevEl: '.slider-product-prev',
        }"
        :breakpoints="{
          '300': {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          '700': {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          '900': {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          '1024': {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          '1200': {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }"
        :modules="[SwiperNavigation, SwiperAutoplay]"
        v-if="near_hotels?.data?.length > 0"
      >
        <swiper-slide v-for="(item, index) in hotels" :key="i">
          <CardProduct2 :index="index" :product="item"></CardProduct2>
        </swiper-slide>
      </swiper>
      <div v-else class="mt-[24px] md:mb-[64px] mb-[120px]">
        <swiper
          class="!px-[10px] z-[-1]"
          :slidesPerView="4"
          :spaceBetween="20"
          :dir="locale == 'ar' ? 'rtl' : 'ltr'"
          :breakpoints="{
            '300': {
              slidesPerView: 1.2,
              spaceBetween: 20,
            },
            '700': {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            '900': {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            '1024': {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            '1200': {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }"
          :modules="[SwiperNavigation, SwiperAutoplay]"
        >
          <swiper-slide v-for="i in 4" class="flex flex-col space-y-3 py-2">
            <Skeleton
              class="h-[238px] rounded-[24px] shadow-custom-all-sides"
            />
            <div class="space-y-2">
              <Skeleton class="h-4 w-[250px] shadow-custom-all-sides" />
              <Skeleton class="h-4 w-[200px] shadow-custom-all-sides" />
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <!-- <div
        v-else
        class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2"
      >
        <div v-for="i in 4" :key="i" class="flex flex-col space-y-3 py-2">
          <Skeleton class="h-[238px] rounded-[24px] w-[300px]" />
          <div class="space-y-2">
            <Skeleton class="h-4 w-[250px] shadow-custom-all-sides" />
            <Skeleton class="h-4 w-[200px] shadow-custom-all-sides" />
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { homeStore } from "@/stores/home";
import { useI18n } from "vue-i18n";

const props = defineProps({
  hotels: {
    type: [],
  },
});
const { locale } = useI18n();
const pending = ref(false);
watch(
  () => props.hotels,
  (val) => {
    if (val?.length == 0) {
      pending.value = true;
    } else {
      pending.value = false;
    }
  },
  { immediate: true }
);
</script>
