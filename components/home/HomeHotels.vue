<template >
    <div>
      
        <div class="hotels-container relative container">
      <button class="slider-icon hidden xl:block lg:block absolute right-[-30px] slider-hotel-next z-10 ">
        <IconArrowNext></IconArrowNext>
      </button>
      <button class="slider-icon hidden xl:block lg:block absolute left-[-30px] slider-hotel-prev z-10 ">
        <IconArrowPrev></IconArrowPrev>
      </button>
      <swiper class="items !z-0" :dir="locale == 'ar' ? 'rtl' : 'ltr'" :navigation="{
        nextEl: '.slider-hotel-next',
        prevEl: '.slider-hotel-prev',
      }" :breakpoints="{
        '300': {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        '900': {
          slidesPerView: 5,
          spaceBetween: 30,
        },
        '1024': {
          slidesPerView: 7,
          spaceBetween: 0,
        },
        '1200': {
          slidesPerView: 9,
          spaceBetween: 30,
        },
      }" :modules="[SwiperNavigation, SwiperAutoplay]">
        <swiper-slide v-for="item, index in store.accommodations">
          <button v-if="pending" data-aos="zoom-in-up" :data-aos-duration="100 + index * 2"  class="item flex flex-col items-center gap-2">
            <div
              class="icon xl:w-[100px] xl:h-[100px] lg:w-[100px]  lg:h-[100px] w-[80px] h-[80px]  rounded-[50%] border-[1px] border-primary bg-white flex items-center justify-center">
              <!-- <IconHotel1></IconHotel1> -->
               <NuxtImg :src="item?.icon_url" class="w-[48px] h-[48px] object-cover"  />
            </div>
            <span class="text-[14px] xl:text-[18px] lg:text-[18px] font-semibold text-primary"> {{  item?.name }} </span>
          </button>
          <div v-else class="flex flex-col items-center gap-2 py-2">
            <Skeleton class="xl:w-[114px] lg:w-[114px] xl:h-[114px] lg:h-[114px] w-[80px] h-[80px] shadow-custom-all-sides  rounded-full" />
            <Skeleton class="h-4 w-[70px] shadow-custom-all-sides" />
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
store.getAccommodation(locale.value);
let pending = ref(false);
watch(()=>store.accommodations , (val)=>{
  if(val){
       pending.value = true;
  }

})
onMounted(() => {
  if(store.accommodations.length >= 1){
       pending.value = true;
  }
})
</script>
<style lang="">
    
</style>