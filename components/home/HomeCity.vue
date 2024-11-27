<template >
    <div>
        <div class=" container relative mt-[70px] xl:mt-[100px] lg:mt-[100px] city-cards">
      <div class="header-container flex items-center justify-between mb-[32px]">
         <div class="flex items-center gap-2">
          <h3 class="text-[20px] xl:text-[32px] lg:text-[32px] font-semibold text-primary">  {{ $t('content.most_searching_cities') }} </h3>
          <div class="dot h-[9px] w-[9px] bg-burgundy rounded"></div>
         </div>
      </div>
      <button class="slider-icon top-[50%] hidden xl:block lg:block absolute right-[-30px] slider-city-next z-10 ">
        <IconArrowNext></IconArrowNext>
      </button>
      <button class="slider-icon top-[50%] hidden xl:block lg:block absolute left-[-30px] slider-city-prev z-10 ">
        <IconArrowPrev></IconArrowPrev>
      </button>
      <swiper v-if="pending"  class="!px-[10px]" :navigation="{
        nextEl: '.slider-city-next',
        prevEl: '.slider-city-prev',
      }" :breakpoints="{
        '300': {
          slidesPerView: 1.2,
          spaceBetween: 20,
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
        <swiper-slide v-for="item , index in store.cities" >
          <NuxtLink @click="getCity(item)" :to="localePath('/hotels')" class="h-[330px] block xl:h-[400px] lg:h-[400px] rounded-[24px] relative" data-aos="zoom-in-up" :data-aos-duration="100 + index * 2">
            <NuxtImg class="h-[100%] w-[100%] rounded-[24px] " width="100" height="60" style="background-size: cover"
              :src="item.image" placeholder="">
            </NuxtImg>

            <div
            style="background: linear-gradient(rgba(0, 0, 0, 0) 14.69%, rgb(44, 40, 52) 89.5%);"
              class=" absolute bottom-[0%] w-[100%] text-[20px] font-semibold flex  items-center text-white justify-center h-[100px] rounded-[24px] ">
               {{ item.name }}
            </div>

          </NuxtLink>
        </swiper-slide>

      </swiper>
      <div v-else class="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-5 md:grid-cols-2">
          <div v-for="i in 4"  class="flex flex-col space-y-3 py-2 ">
            <Skeleton class="h-[300px] xl:h-[400px] lg:h-[400px] rounded-[24px] shadow-customShadow" />
          </div>

        </div>
    </div>
    </div>
</template>
<script setup>
import { homeStore } from "@/stores/home";
let store  = homeStore();
const { locale } = useI18n();
const localePath = useLocalePath();
store.getCities(locale.value);
import { useDateSearchCity } from "~/composables/utilities/searchCity";
const { getCity } = useDateSearchCity();
let pending = ref(false);
watch(()=>store.cities , (val)=>{
  if(val){
       pending.value = true;
  }

})
onMounted(() => {
  if(store.cities.length >= 1){
       pending.value = true;
  }

})
</script>
<style lang="">

</style>