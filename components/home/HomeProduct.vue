<template>
  <div v-if="store.hotels?.length > 0">
    <div class="container relative product-cards mt-[70px] xl:mt-[100px] lg:mt-[100px]">
      <div class="header-container flex items-center justify-between mb-[32px]">
        <div class="flex items-center gap-2">
          <h3 class="text-[20px] xl:text-[32px] lg:text-[32px] font-semibold text-primary"> {{ $t('content.specialHotels') }} </h3>
          <div class="dot h-[9px] w-[9px] bg-burgundy rounded"></div>
        </div>
        <!-- <NuxtLink :to="localePath('/hotels')" class="bg-[#875FFF1C] hidden xl:flex lg:flex w-[135px] h-[41px] rounded-[38px] text-primary items-center justify-center">
          {{ $t('content.show_more') }}
        </NuxtLink> -->
      </div>
      
      <button class="slider-icon top-[30%] hidden xl:block lg:block absolute right-[-30px] slider-product-next z-10 ">
        <IconArrowNext></IconArrowNext>
      </button>
      <button class="slider-icon top-[30%] hidden xl:block lg:block absolute left-[-30px] slider-product-prev z-10 ">
        <IconArrowPrev></IconArrowPrev>
      </button>
      <!-- data-aos="zoom-in-up" data-aos-duration="600" -->
        <swiper v-if="pending"  class="!px-[10px] z-[-1]" :slidesPerView="4" :spaceBetween="20" :dir="locale == 'ar' ? 'rtl' : 'ltr'"
          :navigation="{
            nextEl: '.slider-product-next',
            prevEl: '.slider-product-prev',
          }" :breakpoints="{
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
        }" :modules="[SwiperNavigation, SwiperAutoplay]">
          <swiper-slide  v-for="item, index in store.hotels" :key="i">
            <CardProduct2 data-aos="zoom-in-up" :data-aos-duration="100 + index * 2"  :index="index" :product="item"></CardProduct2>
          </swiper-slide>
          
        </swiper>
        <swiper v-else class="!px-[10px] z-[-1]" :slidesPerView="4" :spaceBetween="20" :dir="locale == 'ar' ? 'rtl' : 'ltr'"
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
        }" :modules="[SwiperNavigation, SwiperAutoplay]">
           <swiper-slide v-for="i in 4"  class="flex flex-col space-y-3 py-2 ">
            <Skeleton class="h-[238px] rounded-[24px]  shadow-custom-all-sides " />
            <div class="space-y-2">
              <Skeleton class="h-4 w-[250px] shadow-custom-all-sides" />
              <Skeleton class="h-4 w-[200px] shadow-custom-all-sides" />
            </div>
          </swiper-slide>
          
        </swiper>
  
     
    </div>
  </div>
</template>

<script setup lang="ts">
import { homeStore } from "@/stores/home";
let store  = homeStore();
const { locale } = useI18n();
store.getHotels(locale.value);
let pending = ref(false);
watch(()=>store.hotels , (val)=>{
  if(val){
       pending.value = true;
  }

})
onMounted(() => {
  if(store.hotels.length >= 1){
       pending.value = true;
  }
})
</script>