<template lang="">
    <div>
        <div class=" container relative  mt-[70px] xl:mt-[100px] lg:mt-[100px] banners-container">
      <div class="header-container flex items-center justify-between mb-[32px]">
         <div class="flex items-center gap-2">
          <h3 class="text-[20px] xl:text-[32px] lg:text-[32px] font-semibold text-primary"> {{$t('content.offers_for_you')}} </h3>
          <div class="dot h-[9px] w-[9px] bg-burgundy rounded"></div>
         </div>
      
      </div>
      <swiper class="!px-[10px]" :slidesPerView="1" :spaceBetween="10" :pagination="{
                clickable: true,
              }" :modules="[SwiperPagination, SwiperAutoplay]">
        <swiper-slide v-for="item in store.offers">
          <div class="banner-list w-full flex items-center justify-center h-[250px] xl:h-[355px] lg:h-[355px] rounded-[40px] " >
             <div class="text-container z-[10]">
              <h3 class="text-white text-center font-semibold text-[20px] xl:text-[40px] lg:text-[40px]">  
                 <!-- {{$t('content.todayOnly')}} -->
                  {{item?.title}}
                <br>
                {{item?.description}}
                 <!-- {{$t('content.offersTill')}} <span class="text-[30px] xl:text-[60px] lg:text-[60px]"> 40% </span>   -->
              </h3>
               <!-- <div class="btn-shape flex flex-row w-[150px] xl:w-[270px] lg:w-[270px] h-[40px] mt-4 xl:mt-0 lg:mt-0 xl:h-[50px] bg-primary">
                 <div class="bg-white w-[50%] flex items-center text-[16px] xl:text-[22px] lg:text-[22px] text-primary font-semibold justify-center code"> {{$t('content.code')}} </div>
                 <div @click="copyToClipboard('NS526')" class="w-[50%] cursor-pointer items-center flex text-[16px] xl:text-[22px] lg:text-[22px] text-white font-semibold justify-center">
                  NS526
                 </div>
               </div> -->

             </div>
            <NuxtImg class=" rounded-[40px] absolute z-[-1] w-full h-[100%] " width="100" height="100"
                  style="background-size: cover" :src="item.image" placeholder="">
                </NuxtImg>
            <NuxtImg class=" rounded-[40px] absolute top-0 z-[4] w-full h-[100%] " width="100" height="100"
                  style="background-size: cover" src="/img/overlay-banner.svg" placeholder="">
                </NuxtImg>
                <div class="overlay absolute rounded-[40px]  top-0 w-full h-full z-[5]" style="background: linear-gradient(270deg, rgba(135, 95, 255, 0.84) 0%, rgba(81, 57, 153, 0.84) 100%);"></div>
          </div>
        </swiper-slide>

      </swiper>
    </div>

    </div>
</template>
<script setup>
import { homeStore } from "@/stores/home";
let store  = homeStore();
const { locale } = useI18n();
store.getOffers(locale.value);
let pending = ref(false);
function copyToClipboard(val) {
    const clipBoard = navigator.clipboard;
    clipBoard.writeText(val);
    
}

onMounted(() => {
  if(store.cities.length >= 1){
       pending.value = true;
  }
})
</script>
<style lang="scss">
.btn-shape{
   border-radius: 10px;
  .code{
    clip-path: polygon(28% 0%, 100% 0%, 100% 100%, 0% 100%);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-top-left-radius: 60px;
    border-bottom-left-radius: 10px;
  }
}
</style>